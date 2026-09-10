// OpenWeatherMap One Call 3.0 — hourly + daily forecast with a daily localStorage cache.
// Spec:
//   • Endpoint: /data/3.0/onecall?exclude=current,minutely,alerts (daily is KEPT), units=metric, lang=ru
//   • One fetch per location per calendar day: the cache stores the fetch date + full
//     hourly (48h) and daily (8d) arrays. A new fetch happens ONLY when the calendar
//     date changes or the cache is empty.
//   • Smart rendering from cache:
//       – hourly: past hours filtered by dt vs Date.now(), show the nearest 6–8 hours
//       – daily: indexes [1] (tomorrow) and [2] (day after tomorrow)
//   • An hourly setInterval re-renders from the cache (no network) so the hour window slides.
//   • Cold start: prefetchWeatherAll() loads all locations in parallel via Promise.all.

import { useEffect, useState } from 'react'

const API_KEY = '9bc0cd38df2c1d14737e6bb82f3f941a'
const CACHE_PREFIX = 'owm-oncall-'
const WINDOW_HOURS = 8 // display the nearest 6–8 hours

export interface CurrentWeather {
  icon: string
  temp: number
  feelsLike: number
  humidity: number
  windSpeed: number
  windDeg: number
  tempMax: number // max over the next 24h of hourly points
  tempMin: number // min over the next 24h of hourly points
  description: string
  descriptionKey: string // normalized RU condition term, e.g. "Ясно"
  conditionCode: string
  uvi: number // current-hour UV index
}

export interface HourlyPoint {
  dt: number
  hour: string
  temp: number
  icon: string
  humidity: number
  wind: number
  windDeg: number
  feelsLike: number
  uvi: number
  description: string
  descriptionKey: string
  precipitation: number // pop, %
  precipitationMm: number // rain.1h + snow.1h, mm
}

export interface DailyPoint {
  dt: number
  dateLabel: string // localized 'dd MMM' (ru-RU)
  tempMax: number
  tempMin: number
  icon: string
  pop: number // precipitation probability, %
  uvi: number
  description: string
  descriptionKey: string
  temp?: number // current temp, set for daily[0] (today) only
}

export interface WeatherView {
  current: CurrentWeather
  hourly: HourlyPoint[] // next WINDOW_HOURS hours, past removed
  daily: DailyPoint[] // [tomorrow, day after tomorrow]
}

interface CacheEntry {
  day: string // local calendar date of the fetch, 'YYYY-MM-DD'
  fetchedAt: number
  hourly: HourlyPoint[] // full 48h payload
  daily: RawDaily[] // full 8d payload
}

interface RawDaily {
  dt: number
  temp: { max?: number; min?: number }
  pop?: number
  uvi?: number
  weather?: { icon?: string; description?: string }[]
}

function weatherIconFromCode(code: string): string {
  if (code.startsWith('01')) return '☀️'
  if (code.startsWith('02')) return '⛅'
  if (code.startsWith('03')) return '☁️'
  if (code.startsWith('04')) return '☁️'
  if (code.startsWith('09')) return '🌧️'
  if (code.startsWith('10')) return '🌦️'
  if (code.startsWith('11')) return '⛈️'
  if (code.startsWith('13')) return '❄️'
  if (code.startsWith('50')) return '🌫️'
  return '🌤️'
}

/** Map any OWM condition description to one of the app's RU weather terms (for trData) */
export function normalizeConditionKey(description: string): string {
  const d = description.toLowerCase()
  if (d.includes('гроза') || d.includes('thunder')) return 'Гроза'
  if (d.includes('морос') || d.includes('drizzle')) return 'Дождь'
  if (d.includes('дожд') || d.includes('rain')) return 'Дождь'
  if (d.includes('снег') || d.includes('snow') || d.includes('sleet')) return 'Снег'
  if (d.includes('пасмурно') || d.includes('overcast')) return 'Пасмурно'
  if (d.includes('облачн') || d.includes('cloud')) return 'Облачно'
  if (d.includes('туман') || d.includes('mist') || d.includes('fog') || d.includes('haze')) return 'Пасмурно'
  if (d.includes('ясно') || d.includes('clear')) return 'Ясно'
  return 'Облачно'
}

/** deg → С/СВ/В/... (RU) */
export function windDirection(deg: number): string {
  const dirs = ['С', 'СВ', 'В', 'ЮВ', 'Ю', 'ЮЗ', 'З', 'СЗ']
  return dirs[Math.round(deg / 45) % 8]
}

function localDayKey(ts = Date.now()): string {
  const d = new Date(ts)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function hourLabel(dtMs: number): string {
  return new Date(dtMs).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
}

function dailyPointFromRaw(item: RawDaily): DailyPoint {
  return {
    dt: item.dt,
    dateLabel: new Date(item.dt * 1000).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' }),
    tempMax: Math.round(item.temp?.max ?? 0),
    tempMin: Math.round(item.temp?.min ?? 0),
    icon: weatherIconFromCode(item.weather?.[0]?.icon || '01d'),
    pop: Math.round((item.pop ?? 0) * 100),
    uvi: Math.round((item.uvi ?? 0) * 10) / 10,
    description: item.weather?.[0]?.description ?? '',
    descriptionKey: normalizeConditionKey(item.weather?.[0]?.description ?? ''),
  }
}

/** Filter out past hours and take the nearest window; project daily[0..2] (today, +1, +2) */
function viewFromCache(entry: CacheEntry): WeatherView {
  const nowSec = Date.now() / 1000
  const upcoming = entry.hourly.filter((h) => h.dt >= nowSec - 3600) // keep the running hour
  const window = upcoming.slice(0, WINDOW_HOURS)
  const nowHour = window[0]
  const next24 = upcoming.slice(0, 24)

  const current: CurrentWeather = {
    icon: nowHour?.icon ?? '🌤️',
    temp: Math.round(nowHour?.temp ?? 0),
    feelsLike: Math.round(nowHour?.feelsLike ?? 0),
    humidity: Math.round(nowHour?.humidity ?? 0),
    windSpeed: Math.round(nowHour?.wind ?? 0),
    windDeg: Math.round(nowHour?.windDeg ?? 0),
    tempMax: next24.length ? Math.round(Math.max(...next24.map((h) => h.temp))) : 0,
    tempMin: next24.length ? Math.round(Math.min(...next24.map((h) => h.temp))) : 0,
    description: nowHour ? String(nowHour.description ?? '') : '',
    descriptionKey: nowHour ? String(nowHour.descriptionKey ?? 'Облачно') : 'Облачно',
    conditionCode: '01',
    uvi: Math.round((nowHour?.uvi ?? 0) * 10) / 10,
  }

  // Unified 3-day forecast: [0] today (with current temp), [1] tomorrow, [2] day after
  const dailyList = entry.daily.slice(0, 3).filter(Boolean).map(dailyPointFromRaw)
  if (dailyList[0]) dailyList[0] = { ...dailyList[0], temp: current.temp }

  return {
    current,
    hourly: window.map((h) => ({ ...h, hour: hourLabel(h.dt * 1000) })),
    // Unified 3-day forecast: [0] today, [1] tomorrow, [2] day after tomorrow
    daily: dailyList,
  }
}

/** Cached view for today, or null if the cache is missing/stale (calendar date changed) */
function readCache(lat: number, lon: number): WeatherView | null {
  try {
    const raw = localStorage.getItem(`${CACHE_PREFIX}${lat.toFixed(4)},${lon.toFixed(4)}`)
    if (!raw) return null
    const entry: CacheEntry = JSON.parse(raw)
    if (entry.day !== localDayKey() || !Array.isArray(entry.hourly) || entry.hourly.length === 0) return null
    if (!Array.isArray(entry.daily) || entry.daily.length < 3) return null
    return viewFromCache(entry)
  } catch {
    return null
  }
}

async function fetchWeather(lat: number, lon: number): Promise<WeatherView> {
  const res = await fetch(
    `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,alerts&units=metric&lang=ru&appid=${API_KEY}`
  )
  if (!res.ok) throw new Error('onecall fetch failed: ' + res.status)
  const data = await res.json()
  const list: any[] = Array.isArray(data.hourly) ? data.hourly : []
  const daily: RawDaily[] = Array.isArray(data.daily) ? data.daily : []
  if (list.length === 0) throw new Error('onecall: empty hourly')

  const hourly: HourlyPoint[] = list.map((item) => ({
    dt: item.dt as number,
    hour: hourLabel(item.dt * 1000),
    temp: Math.round(item.temp ?? 0),
    icon: weatherIconFromCode(item.weather?.[0]?.icon || '01d'),
    humidity: Math.round(item.humidity ?? 0),
    wind: Math.round(item.wind_speed ?? 0),
    windDeg: Math.round(item.wind_deg ?? 0),
    feelsLike: Math.round(item.feels_like ?? 0),
    uvi: Math.round((item.uvi ?? 0) * 10) / 10,
    description: item.weather?.[0]?.description ?? '',
    descriptionKey: normalizeConditionKey(item.weather?.[0]?.description ?? ''),
    precipitation: Math.round((item.pop ?? 0) * 100),
    precipitationMm: Math.round(((item.rain?.['1h'] ?? 0) + (item.snow?.['1h'] ?? 0)) * 10) / 10,
  }))

  const entry: CacheEntry = {
    day: localDayKey(),
    fetchedAt: Date.now(),
    hourly,
    daily,
  }
  try {
    localStorage.setItem(`${CACHE_PREFIX}${lat.toFixed(4)},${lon.toFixed(4)}`, JSON.stringify(entry))
  } catch {
    // storage full — ignore
  }
  return viewFromCache(entry)
}

/** Public API: cached view if fetched today, otherwise a fresh One Call fetch.
 *  Concurrent calls for the same coords share one in-flight request. */
const inflight = new Map<string, Promise<WeatherView>>()

export async function getWeather(lat: number, lon: number): Promise<WeatherView> {
  const cached = readCache(lat, lon)
  if (cached) return cached
  const key = cacheKey(lat, lon)
  const running = inflight.get(key)
  if (running) return running
  const p = fetchWeather(lat, lon).finally(() => inflight.delete(key))
  inflight.set(key, p)
  return p
}

// ── Shared React hook (one fetch per coords per day across all components) ──

interface WeatherState {
  data: WeatherView | null
  loading: boolean
  error: boolean
}

const hookCache = new Map<string, WeatherState>()
const hookListeners = new Map<string, Set<() => void>>()
let refreshTimer: ReturnType<typeof setInterval> | null = null

function cacheKey(lat: number, lon: number): string {
  return `${lat.toFixed(4)},${lon.toFixed(4)}`
}

function notify(key: string) {
  hookListeners.get(key)?.forEach((fn) => fn())
}

/**
 * Hourly UI refresh: re-filter every cached location from localStorage and notify
 * subscribers — no network requests. Started once on the first useWeather call.
 */
function startHourlyRefresh() {
  if (refreshTimer) return
  refreshTimer = setInterval(
    () => {
      for (const key of hookCache.keys()) {
        const [lat, lon] = key.split(',').map(Number)
        const fresh = readCache(lat, lon)
        if (fresh) {
          hookCache.set(key, { data: fresh, loading: false, error: false })
          notify(key)
        }
      }
    },
    60 * 60 * 1000
  )
}

/**
 * Cold-start loader: fetch every location in parallel (Promise.all), seeding the
 * shared hook cache so subsequent useWeather hookups render instantly.
 */
export async function prefetchWeatherAll(locations: { lat: number; lon: number }[]): Promise<void> {
  await Promise.all(
    locations.map(({ lat, lon }) => {
      const key = cacheKey(lat, lon)
      if (hookCache.get(key)?.data) return Promise.resolve(null)
      return getWeather(lat, lon)
        .then((data) => {
          hookCache.set(key, { data, loading: false, error: false })
          notify(key)
          return null
        })
        .catch(() => {
          hookCache.set(key, { data: null, loading: false, error: true })
          notify(key)
          return null
        })
    })
  )
}

/** React hook: live hourly weather for coordinates, shared across all components */
export function useWeather(lat: number, lon: number): WeatherState {
  const key = cacheKey(lat, lon)
  const [, force] = useState(0)

  useEffect(() => {
    const listener = () => force((n) => n + 1)
    hookListeners.set(key, (hookListeners.get(key) ?? new Set()).add(listener))
    startHourlyRefresh()
    return () => {
      hookListeners.get(key)?.delete(listener)
    }
  }, [key])

  useEffect(() => {
    if (hookCache.get(key)?.data) return
    let cancelled = false
    getWeather(lat, lon)
      .then((data) => {
        if (cancelled) return
        hookCache.set(key, { data, loading: false, error: false })
        notify(key)
      })
      .catch(() => {
        if (cancelled) return
        hookCache.set(key, { data: null, loading: false, error: true })
        notify(key)
      })
    return () => {
      cancelled = true
    }
  }, [key, lat, lon])

  return hookCache.get(key) ?? { data: null, loading: true, error: false }
}
