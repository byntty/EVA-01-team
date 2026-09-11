import React, { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Cloud,
  ChevronLeft,
  ChevronRight,
  Compass,
  Route,
  Clock,
  ArrowUpRight,
  Thermometer,
  Droplets,
  Wind,
  Heart,
  Backpack,
  Shield,
  AlertTriangle,
  Phone,
  CheckCircle2,
  MapPin,
  Loader2,
  AlertCircle,
  Camera,
  Sun,
  TrendingUp,
} from 'lucide-react'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { useLanguage, type Lang } from '../lib/language'
import { trData } from '../lib/dataTranslations'
import { getWeather, windDirection, type CurrentWeather, type HourlyPoint, type WeatherView } from '../lib/weather'
import { difficultyGuidance, getPeakById, peakTimings, routeDurationOverrides, type Peak, type PeakTiming } from '../data/peaksData'

function assetPath(path: string): string {
  if (/^(?:https?:)?\/\//.test(path)) return path
  return `${import.meta.env.BASE_URL}${path.replace(/^\/(?:alataupeaks\/)?/, '')}`
}

export default function PeakDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { t, lang } = useLanguage()
  const peak = id ? getPeakById(id) : undefined
  const [showTimings, setShowTimings] = useState(false)

  const [showHourly, setShowHourly] = useState(false)
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({})
  const [weather, setWeather] = useState<WeatherView | null>(null)
  const [weatherLoading, setWeatherLoading] = useState(false)
  const [weatherError, setWeatherError] = useState<string | null>(null)

  useEffect(() => {
    if (!peak) return
    let cancelled = false
    setWeatherLoading(true)
    setWeatherError(null)

    getWeather(peak.coordinates.lat, peak.coordinates.lng)
      .then((data) => {
        if (cancelled) return
        setWeather(data)
        setWeatherLoading(false)
      })
      .catch(() => {
        if (cancelled) return
        setWeatherError('weatherError')
        setWeatherLoading(false)
      })

    return () => { cancelled = true }
  }, [peak])

  function displayName(p: Peak): string {
    if (lang === 'en') return p.nameEn
    if (lang === 'kz') return p.nameKz
    return p.name
  }

  function toggleItem(key: string) {
    setCheckedItems((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  // Страница «В разработке» — данные пика ещё не готовы
  if (peak?.inDevelopment) {
    return (
      <div style={{ minHeight: '100vh', background: '#fdf6e3' }}>
        <Navbar />
        <main className="pt-24 px-4 flex items-center justify-center">
          <div className="retro-card p-8 max-w-md text-center">
            <div className="text-5xl mb-4 retro-float">🚧</div>
            <h1 className="text-xl font-bold mb-3" style={{ color: '#3d2b1f', fontFamily: "'Playfair Display', Georgia, serif" }}>
              {t.inDevelopmentTitle}
            </h1>
            <p className="text-sm mb-6" style={{ color: '#6b5a3e', fontFamily: "'Special Elite', Georgia, serif" }}>
              {t.inDevelopmentText}
            </p>
            <button className="retro-button" onClick={() => navigate('/')}>
              {t.backToCatalog}
            </button>
          </div>
        </main>
      </div>
    )
  }

  if (!peak) {
    return (
      <div style={{ minHeight: '100vh', background: '#fdf6e3' }}>
        <Navbar />
        <main className="pt-24 px-4 flex items-center justify-center">
          <div className="retro-card p-8 max-w-md text-center">
            <div className="text-5xl mb-4 retro-float">🏔️</div>
            <h1
              className="text-xl font-bold mb-4"
              style={{ color: '#3d2b1f', fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              {t.notFoundTitle}
            </h1>
            <button className="retro-button" onClick={() => navigate('/')}>
              {t.backToCatalog}
            </button>
          </div>
        </main>
      </div>
    )
  }

  // Цепочка пиков траверса
  const chainPeaks: Peak[] = (peak?.traversePeaks ?? [])
    .map((pid) => getPeakById(pid))
    .filter((p): p is Peak => Boolean(p))
  const displayedDuration = peak ? routeDurationOverrides[peak.id] ?? peak.routes[0]?.duration ?? peak.routeStats.duration : ''

  const difficultyColors: Record<number, string> = {
    1: '#5a6e3c',
    2: '#e07030',
    3: '#c44d2c',
    4: '#7b2d8e',
  }

  return (
    <div style={{ minHeight: '100vh', background: '#fdf6e3' }}>
      <Navbar />

      <main className="pt-24 pb-12 px-4 max-w-7xl mx-auto">
        {/* Back link */}
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-sm no-underline mb-6 transition-colors"
          style={{ color: '#6b5a3e' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#ad3e1a')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#6b5a3e')}
        >
          <ChevronLeft className="w-4 h-4" />
          {t.backToCatalog}
        </Link>

        {/* Top row: Route + Weather side by side */}
        <div className="flex flex-col lg:flex-row gap-6 mb-6">
          {/* Route Block — 65% */}
          <div className="lg:w-[65%]">
            <div className="retro-card-accent p-6 h-full">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1
                    className="text-2xl font-bold mb-1"
                    style={{ color: '#fdf6e3', fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    {displayName(peak)}
                  </h1>
                  <div className="flex items-center gap-2">
                    <span
                      className="retro-badge text-xs"
                      style={{ color: '#fdf6e3', borderColor: '#fdf6e3', background: 'rgba(61,43,31,0.5)' }}
                    >
                      {peak.elevation} м
                    </span>
                    <span
                      className="retro-badge text-xs"
                      style={{
                        color: '#fdf6e3',
                        borderColor: difficultyColors[peak.difficultyLevel],
                        background: difficultyColors[peak.difficultyLevel],
                      }}
                    >
                      {trData(lang, 'difficulty', peak.difficulty)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Route content */}
              <div className="retro-inset p-5" style={{ background: 'rgba(61,43,31,0.25)', borderColor: 'rgba(253,246,227,0.2)' }}>
                <div className="flex flex-col sm:flex-row gap-6 items-stretch">
                  {/* Summit sign photo — square, fills the full height of the route info column */}
                  <div className="sm:w-1/3 flex items-center justify-center">
                    {peak.signPhoto ? (
                      <img
                        src={assetPath(peak.signPhoto)}
                        alt={t.signPhotoTitle + ' — ' + displayName(peak)}
                        className="object-cover self-stretch"
                        style={{
                          height: '100%',
                          aspectRatio: '1 / 1',
                          width: 'auto',
                          maxWidth: '100%',
                          border: '2px solid rgba(253,246,227,0.4)',
                          borderRadius: '4px',
                        }}
                      />
                    ) : (
                      <div
                        className="flex flex-col items-center justify-center text-center self-stretch"
                        style={{
                          height: '100%',
                          minHeight: '160px',
                          aspectRatio: '1 / 1',
                          maxWidth: '100%',
                          border: '2px dashed rgba(253,246,227,0.45)',
                          borderRadius: '4px',
                          background: 'rgba(253,246,227,0.07)',
                          color: 'rgba(253,246,227,0.75)',
                          fontFamily: "'Special Elite', Georgia, serif",
                          fontSize: '11px',
                          padding: '8px',
                        }}
                      >
                        <Camera className="w-6 h-6 mb-1" aria-hidden="true" />
                        <span>{t.signPhotoEmpty}</span>
                      </div>
                    )}
                  </div>

                  {/* Stats — from selected route */}
                  <div className="sm:w-2/3 space-y-3">
                    <RouteStatRow
                      icon={<Compass className="w-4 h-4" />}
                      label={t.distance}
                      value={peak.routes[0]?.distance || peak.routeStats.distance}
                    />
                    <RouteStatRow
                      icon={<Route className="w-4 h-4" />}
                      label={t.difficulty}
                      value={trData(lang, 'difficulty', peak.routes[0]?.difficulty || peak.difficulty)}
                    />
                    <RouteStatRow
                      icon={<ArrowUpRight className="w-4 h-4" />}
                      label={t.elevationGain}
                      value={peak.routes[0]?.elevationGain || peak.routeStats.elevationGain}
                    />
                    <RouteStatRow
                      icon={<Clock className="w-4 h-4" />}
                      label={t.duration}
                      value={displayedDuration}
                    />
                    {peak.routes[0]?.terrain && (
                      <RouteStatRow
                        icon={<TrendingUp className="w-4 h-4" />}
                        label={t.terrain}
                        value={trData(lang, 'terrain', peak.routes[0].terrain)}
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* Traverse chain peaks */}
              {chainPeaks.length > 0 && (
                <div className="mt-4">
                  <div
                    className="text-xs font-bold uppercase mb-2"
                    style={{
                      color: '#fdf6e3',
                      fontFamily: "'Special Elite', Georgia, serif",
                      letterSpacing: '0.08em',
                    }}
                  >
                    {t.chainPeaks}:
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    {chainPeaks.map((p, i) => (
                      <React.Fragment key={p.id}>
                        {i > 0 && (
                          <span style={{ color: 'rgba(253,246,227,0.6)', fontFamily: "'Special Elite', serif" }}>
                            →
                          </span>
                        )}
                        <Link
                          to={'/peak/' + p.id}
                          className="px-3 py-1.5 text-xs font-bold no-underline transition-all"
                          style={{
                            background: 'rgba(253,246,227,0.12)',
                            border: '1px solid rgba(253,246,227,0.35)',
                            borderRadius: '4px',
                            color: '#fdf6e3',
                            fontFamily: "'Special Elite', Georgia, serif",
                            cursor: 'pointer',
                          }}
                        >
                          {p.name} · {p.elevation} м
                        </Link>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-wrap items-center gap-2 mt-4">
                <a
                  href={`https://maps.me/?sll=${peak.coordinates.lat},${peak.coordinates.lng}&z=15`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${t.viewOnMapsMe}: ${displayName(peak)}`}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-bold no-underline"
                  style={{
                    background: 'rgba(253,246,227,0.15)',
                    border: '2px solid rgba(253,246,227,0.4)',
                    borderRadius: '4px',
                    color: '#fdf6e3',
                    fontFamily: "'Special Elite', Georgia, serif",
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                  }}
                >
                  <MapPin className="w-4 h-4" />
                  {t.viewOnMapsMe}
                </a>
                <button
                  type="button"
                  onClick={() => setShowTimings((visible) => !visible)}
                  aria-expanded={showTimings}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-bold"
                  style={{
                    background: showTimings ? '#fdf6e3' : 'rgba(253,246,227,0.15)',
                    border: '2px solid rgba(253,246,227,0.4)',
                    borderRadius: '4px',
                    color: showTimings ? '#3d2b1f' : '#fdf6e3',
                    fontFamily: "'Special Elite', Georgia, serif",
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    cursor: 'pointer',
                  }}
                >
                  <Clock className="w-4 h-4" />
                  Тайминги
                </button>
              </div>
              {showTimings && (
                <TimingPanel timing={peakTimings[peak.id]} />
              )}
            </div>
          </div>

          {/* Weather Block — 35% */}
          <div className="lg:w-[35%]">
            <WeatherBlock
              weather={weather}
              t={t}
              lang={lang}
              showHourly={showHourly}
              setShowHourly={setShowHourly}
              loading={weatherLoading}
              error={weatherError}
            />
          </div>
        </div>

        {/* Equipment Block */}
        <EquipmentBlock
          peak={peak}
          t={t}
          lang={lang}
          checkedItems={checkedItems}
          toggleItem={toggleItem}
        />

        {/* Photo Gallery */}
        <PhotoGalleryBlock peak={peak} t={t} lang={lang} />

        {/* Safety Block */}
        <SafetyBlock peak={peak} t={t} lang={lang} />
      </main>

      <Footer />
    </div>
  )
}

/* ─── Best Hiking Day ─── */
// Factual label: the banner picks the day with the lowest forecast precipitation
// probability out of the 5-day OpenWeatherMap forecast — nothing else is claimed.
function bestDayReason(lang: string): string {
  if (lang === 'ru') return 'самая низкая вероятность осадков в прогнозе'
  if (lang === 'kz') return 'болжамдағы жауын-шашын ықтималдығы ең төмен'
  return 'lowest chance of precipitation in the forecast'
}

/* ─── RouteStatRow ─── */
function RouteStatRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="w-8 h-8 flex items-center justify-center"
        style={{
          background: 'rgba(253,246,227,0.12)',
          border: '1px solid rgba(253,246,227,0.2)',
          borderRadius: '3px',
          color: 'rgba(253,246,227,0.7)',
        }}
      >
        {icon}
      </div>
      <div>
        <div className="text-xs" style={{ color: 'rgba(253,246,227,0.55)', fontFamily: "'Special Elite', serif", textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          {label}
        </div>
        <div className="font-bold text-sm" style={{ color: '#fdf6e3' }}>
          {value}
        </div>
      </div>
    </div>
  )
}

/* ─── WeatherBlock ─── */
function WeatherBlock({
  weather,
  t,
  lang,
  showHourly,
  setShowHourly,
  loading,
  error,
}: {
  weather: WeatherView | null
  t: any
  lang: Lang
  showHourly: boolean
  setShowHourly: React.Dispatch<React.SetStateAction<boolean>>
  loading: boolean
  error: string | null
}) {
  const w = weather ? { ...weather.current, precipitation: weather.hourly[0]?.precipitation ?? 0 } : null

  return (
    <div className="retro-card p-6 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-10 h-10 flex items-center justify-center"
          style={{
            background: '#c44d2c',
            border: '2px solid #3d2b1f',
            borderRadius: '4px',
            boxShadow: '2px 2px 0px #3d2b1f',
          }}
        >
          <Cloud className="w-5 h-5" style={{ color: '#fdf6e3' }} />
        </div>
        <div>
          <h2
            className="text-lg font-bold"
            style={{ color: '#3d2b1f', fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            {t.weatherTitle}
          </h2>
          <p className="text-xs" style={{ color: '#6b5a3e', fontFamily: "'Special Elite', serif" }}>
            {weather
              ? lang === 'ru'
                ? 'Данные OpenWeatherMap'
                : lang === 'kz'
                ? 'OpenWeatherMap деректері'
                : 'OpenWeatherMap data'
              : t.weatherSubtitle}
          </p>
        </div>
      </div>

      {/* Best hiking day */}
      {!loading && weather && (
        <div className="mb-4 p-3 flex items-center gap-3" style={{ background: '#5a6e3c', border: '2px solid #3d2b1f', borderRadius: '4px', boxShadow: '2px 2px 0px #3d2b1f' }}>
          <Sun className="w-5 h-5 shrink-0" style={{ color: '#fdf6e3' }} />
          <div>
            <div className="text-xs font-bold uppercase" style={{ color: 'rgba(253,246,227,0.8)', fontFamily: "'Special Elite', serif", letterSpacing: '0.1em' }}>
              {t.bestHikingDay}
            </div>
            <div className="text-sm font-bold" style={{ color: '#fdf6e3', fontFamily: "'Playfair Display', Georgia, serif" }}>
              {(() => {
                // Nearest dry hours in the 48h hourly forecast (factual: lowest POP)
                const sorted = [...weather.hourly].sort((a, b) => a.precipitation - b.precipitation)
                const best = sorted[0]
                if (!best) return ''
                const locale = lang === 'ru' ? 'ru-RU' : lang === 'kz' ? 'kk-KZ' : 'en-US'
                const hm = best.hour
                const dry = weather.hourly.filter((h) => h.precipitation <= best.precipitation + 10).length
                const label = lang === 'ru' ? 'ближайшие сухие часы' : lang === 'kz' ? 'жақын құрғақ сағаттар' : 'nearest dry hours'
                return `${hm} — ${label} (${Math.round(best.precipitation)}% 💧, ${dry} ${lang === 'ru' ? 'ч. в окне 48 ч' : lang === 'kz' ? 'сағ 48 сағатта' : 'h in 48h window'})`
              })()}
            </div>
          </div>
        </div>
      )}

      {/* Loading state */}
      {loading && (
        <div className="retro-inset p-8 flex items-center justify-center">
          <Loader2 className="w-6 h-6 animate-spin mr-2" style={{ color: '#c44d2c' }} />
          <span className="text-sm" style={{ color: '#6b5a3e', fontFamily: "'Special Elite', serif" }}>
            {lang === 'ru' ? 'Загрузка...' : lang === 'kz' ? 'Жүктелуде...' : 'Loading...'}
          </span>
        </div>
      )}

      {/* Error state */}
      {error && !loading && (
        <div className="retro-inset p-4 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" style={{ color: '#d4a520' }} />
          <span className="text-xs" style={{ color: '#8b7355' }}>
            {lang === 'ru' ? 'Не удалось загрузить данные о погоде' : lang === 'kz' ? 'Ауа райы деректерін жүктеу мүмкін болмады' : 'Failed to load weather data'}
          </span>
        </div>
      )}

      {/* 2x2+UV current-conditions grid */}
      {!loading && w && (
        <div className="grid grid-cols-2 gap-3 mb-4">
                  <WeatherMiniBlock
                    icon={<Thermometer className="w-4 h-4" style={{ color: '#c44d2c' }} />}
                    label={t.temperature}
                    value={`${w.tempMax}° / ${w.tempMin}°`}
                  />
                  <WeatherMiniBlock
                    icon={<Droplets className="w-4 h-4" style={{ color: '#3a669d' }} />}
                    label={t.humidity}
                    value={`${w.humidity}%`}
                  />
                  <WeatherMiniBlock
                    icon={<Wind className="w-4 h-4" style={{ color: '#8b7355' }} />}
                    label={`${t.wind} ${windDirection(w.windDeg)}`}
                    value={`${w.windSpeed} км/ч`}
                  />
                  <WeatherMiniBlock
                    icon={<Heart className="w-4 h-4" style={{ color: '#c44d2c' }} />}
                    label={t.feelsLike}
                    value={`${w.feelsLike}°C`}
                  />
                  <WeatherMiniBlock
                    icon={<Droplets className="w-4 h-4" style={{ color: '#3a669d' }} />}
                    label={t.precipitationChance}
                    value={`${w.precipitation}%`}
                  />
                  <WeatherMiniBlock
                    icon={<Sun className="w-4 h-4" style={{ color: '#a63a18' }} />}
                    label={t.uvIndex}
                    value={`${w.uvi} — ${uvLabel(w.uvi, lang, t)}`}
                    valueColor={uvColor(w.uvi)}
                  />
                </div>
              )}

      {/* Unified 3-day forecast (today / tomorrow / day after) — one carousel block with side arrows */}
      {!loading && weather && weather?.daily && weather.daily.length > 0 && (
        <ForecastCarousel daily={weather.daily} lang={lang} t={t} />
      )}
      {/* Precipitation warning */}
      {!loading && w && (
        <p
          className="mt-3 text-xs text-center"
          role="note"
          style={{
            color: '#ad3e1a',
            fontFamily: "'Special Elite', Georgia, serif",
            borderTop: '1px dashed #ad3e1a',
            paddingTop: '8px',
          }}
        >
          ☔ {t.precipWarning}
        </p>
      )}

      {/* Hourly forecast toggle */}
      {!loading && weather && (
        <button
          className="w-full py-2 text-center text-sm font-bold transition-colors"
          style={{
            color: '#ad3e1a',
            fontFamily: "'Special Elite', Georgia, serif",
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            border: '2px solid #ad3e1a',
            borderRadius: '4px',
            background: 'transparent',
            cursor: 'pointer',
          }}
          onClick={() => setShowHourly(!showHourly)}
          aria-expanded={showHourly}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#c44d2c'
            e.currentTarget.style.color = '#fdf6e3'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.color = '#ad3e1a'
          }}
        >
          {showHourly ? t.hideDetails : t.showDetails}
        </button>
      )}

      <AnimatePresence>
        {showHourly && !loading && weather && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-3 space-y-1">
              {/* Header row */}
              <div
                className="flex items-center justify-between py-1 px-3 text-[10px] font-bold uppercase"
                style={{ color: '#6b5a3e', fontFamily: "'Special Elite', serif", letterSpacing: '0.08em' }}
              >
                <span className="w-14">{t.hourlyForecast.split(' ')[0]}</span>
                <span />
                <span className="w-10 text-right">°C</span>
                <span className="w-10 text-right" aria-label={t.precipitationChance}>💧%</span>
                <span className="w-10 text-right">{t.wind}</span>
              </div>
              {weather.hourly.map((item, i: number) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-1.5 px-3 text-xs"
                  style={{
                    background: i % 2 === 0 ? '#eddcbc' : 'transparent',
                    borderRadius: '2px',
                  }}
                >
                  <span className="w-14" style={{ color: '#6b5a3e', fontFamily: "'Special Elite', monospace" }}>
                    {item.hour}
                  </span>
                  <span className="text-base">{item.icon}</span>
                  <span className="font-bold w-10 text-right" style={{ color: '#3d2b1f' }}>
                    {item.temp}°
                  </span>
                  <span
                    className="w-10 text-right font-bold"
                    style={{
                      color:
                        item.precipitation >= 60
                          ? '#3a669d'
                          : item.precipitation >= 30
                          ? '#6b5a3e'
                          : '#8b7355',
                    }}
                  >
                    {item.precipitation}%
                  </span>
                  <span className="w-10 text-right" style={{ color: '#8b7355' }}>
                    {item.wind}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function WeatherMiniBlock({
  icon,
  label,
  value,
  valueColor,
}: {
  icon: React.ReactNode
  label: string
  value: string
  valueColor?: string
}) {
  return (
    <div className="retro-inset p-3">
      <div className="flex items-center gap-1.5 mb-1">
        {icon}
        <span className="text-xs" style={{ color: '#6b5a3e', fontFamily: "'Special Elite', serif" }}>
          {label}
        </span>
      </div>
      <div className="text-sm font-bold" style={{ color: valueColor ?? '#3d2b1f' }}>
        {value}
      </div>
    </div>
  )
}

function TimingPanel({ timing }: { timing?: PeakTiming }) {
  return (
    <div
      className="mt-3 p-4"
      style={{
        background: '#f5e6c8',
        border: '2px solid rgba(253,246,227,0.5)',
        borderRadius: '4px',
        color: '#3d2b1f',
      }}
    >
      {timing ? (
        <>
          <h3 className="text-sm font-bold mb-3" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Тайминги: {timing.title}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1">
            {timing.points.map((point, index) => (
              <div key={`${point.time}-${index}`} className="flex gap-3 text-xs py-1">
                <span className="font-bold min-w-[76px]" style={{ color: '#ad3e1a' }}>{point.time}</span>
                <span>{point.place}</span>
              </div>
            ))}
          </div>
          {timing.movingTime && (
            <p className="mt-3 pt-3 text-xs font-bold" style={{ borderTop: '1px dashed #8b7355' }}>
              Время без отдыха: {timing.movingTime}
            </p>
          )}
        </>
      ) : (
        <p className="text-xs">Тайминги для этого маршрута пока не добавлены.</p>
      )}
    </div>
  )
}

/** WHO UV category for an index value */
function uvLabel(uv: number, lang: Lang, t: any): string {
  if (uv < 3) return t.uvLow
  if (uv < 6) return t.uvModerate
  if (uv < 8) return t.uvHigh
  if (uv < 11) return t.uvVeryHigh
  return t.uvExtreme
}

/** Accessible color for the UV value (all ≥4.5:1 on the cream card background) */
function uvColor(uv: number): string {
  if (uv < 3) return '#5a6e3c' // low — olive
  if (uv < 6) return '#6e5700' // moderate — dark amber
  if (uv < 8) return '#ad3e1a' // high — dark orange
  if (uv < 11) return '#a63a18' // very high
  return '#7b2d8e' // extreme — purple
}


/* ─── ForecastCarousel: unified 3-day forecast (today / tomorrow / day after) ─── */
function ForecastCarousel({
  daily,
  lang,
  t,
}: {
  daily: { dateLabel: string; icon: string; tempMax: number; tempMin: number; pop: number; uvi: number; descriptionKey?: string; temp?: number }[]
  lang: Lang
  t: any
}) {
  const [dayIdx, setDayIdx] = useState(0)
  const dayCount = daily.length
  if (dayCount === 0) return null
  const day = daily[Math.min(dayIdx, dayCount - 1)]
  const isToday = dayIdx === 0

  const dayLabels =
    lang === 'ru'
      ? ['Сегодня', 'Завтра', 'Послезавтра']
      : lang === 'kz'
      ? ['Бүгін', 'Ертең', 'Арғы күні']
      : ['Today', 'Tomorrow', 'In 2 days']
  const dayLabel = dayLabels[Math.min(dayIdx, dayLabels.length - 1)]

  const arrowStyle: React.CSSProperties = {
    background: '#c44d2c',
    border: '2px solid #3d2b1f',
    borderRadius: '4px',
    color: '#fdf6e3',
    cursor: 'pointer',
    boxShadow: '2px 2px 0px #3d2b1f',
  }

  return (
    <div className="relative mb-4">
      {/* Side arrows — only rendered when there is more than one day */}
      {dayCount > 1 && (
        <>
          <button
            type="button"
            onClick={() => setDayIdx((dayIdx - 1 + dayCount) % dayCount)}
            aria-label={dayLabels[(dayIdx - 1 + dayCount) % dayCount]}
            className="absolute left-1 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center text-lg z-10"
            style={arrowStyle}
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => setDayIdx((dayIdx + 1) % dayCount)}
            aria-label={dayLabels[(dayIdx + 1) % dayCount]}
            className="absolute right-1 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center text-lg z-10"
            style={arrowStyle}
          >
            ›
          </button>
        </>
      )}

      <div
        className="p-4 flex flex-col items-center gap-1 mx-10"
        style={{
          background: '#eddcbc',
          border: '2px solid #3d2b1f',
          borderRadius: '4px',
          boxShadow: '2px 2px 0px #3d2b1f',
        }}
      >
        <div className="text-[10px] font-bold uppercase" style={{ color: '#6b5a3e', fontFamily: "'Special Elite', serif", letterSpacing: '0.08em' }}>
          {dayLabel}
        </div>
        <div className="text-xs" style={{ color: '#8b7355', fontFamily: "'Special Elite', serif" }}>{day.dateLabel}</div>
        <div className={isToday ? 'text-4xl mb-1' : 'text-2xl'}>{day.icon}</div>
        {isToday && day.temp !== undefined ? (
          <>
            <div className="text-3xl font-bold" style={{ color: '#3d2b1f', fontFamily: "'Playfair Display', Georgia, serif" }}>
              {day.temp}°C
            </div>
            {day.descriptionKey && (
              <div className="text-xs" style={{ color: '#6b5a3e', fontFamily: "'Special Elite', serif" }}>
                {trData(lang, 'weather', day.descriptionKey)}
              </div>
            )}
          </>
        ) : null}
        <div className="text-sm font-bold" style={{ color: '#3d2b1f', fontFamily: "'Playfair Display', Georgia, serif" }}>
          {day.tempMax}° / {day.tempMin}°
        </div>
        <div className="text-[10px] flex items-center gap-2" style={{ color: '#6b5a3e', fontFamily: "'Special Elite', serif" }}>
          <span title={t.precipitationChance}>💧{day.pop}%</span>
          <span title={t.uvIndex}>☀️{day.uvi}</span>
        </div>
        {dayCount > 1 && (
          <div className="flex items-center gap-1.5 mt-0.5" aria-hidden="true">
            {daily.map((_, i: number) => (
              <button
                key={i}
                type="button"
                tabIndex={-1}
                onClick={() => setDayIdx(i)}
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  background: i === dayIdx ? '#c44d2c' : '#8b7355',
                  cursor: 'pointer',
                  padding: 0,
                  border: 'none',
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}


/* ─── PhotoGalleryBlock ─── */
function PhotoGalleryBlock({ peak, t, lang }: { peak: Peak; t: any; lang: Lang }) {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null)
  const [overflowing, setOverflowing] = useState(false)
  const [galleryHover, setGalleryHover] = useState(false)
  const stripRef = useRef<HTMLDivElement | null>(null)

  // Track whether the photo strip actually overflows → show side arrows only then.
  // Re-checked on resize AND on each image load (width:auto = 0 until the image loads).
  const recheckOverflow = () => {
    const el = stripRef.current
    if (el) setOverflowing(el.scrollWidth > el.clientWidth + 1)
  }
  useEffect(() => {
    recheckOverflow()
    window.addEventListener('resize', recheckOverflow)
    return () => window.removeEventListener('resize', recheckOverflow)
  }, [peak.photos.length])

  function scrollStrip(dir: 1 | -1) {
    const el = stripRef.current
    if (!el) return
    // Instant scroll (no animation): rAF/CSS tweens freeze in background tabs,
    // and the arrow must always respond.
    el.scrollBy({ left: dir * Math.round(el.clientWidth * 0.8) })
  }

  function displayName(p: Peak): string {
    if (lang === 'en') return p.nameEn
    if (lang === 'kz') return p.nameKz
    return p.name
  }
  return (
    <div className="retro-card p-6 mb-6">
      <div className="flex items-center gap-3 mb-5">
        <div
          className="w-10 h-10 flex items-center justify-center"
          style={{
            background: '#c44d2c',
            border: '2px solid #3d2b1f',
            borderRadius: '4px',
            boxShadow: '2px 2px 0px #3d2b1f',
          }}
        >
          <Camera className="w-5 h-5" style={{ color: '#fdf6e3' }} />
        </div>
        <h2
          className="text-lg font-bold"
          style={{ color: '#3d2b1f', fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          {t.photosTitle}
        </h2>
      </div>

      <div className="retro-divider mb-5">✦</div>

      <p className="text-[11px] mb-4" style={{ color: '#6b5a3e', fontFamily: "'Special Elite', serif" }}>
        {t.photosAttribution}
      </p>

      {peak.photos.length === 0 ? (
        <div
          className="flex items-center justify-center text-center p-8"
          style={{
            border: '2px dashed #8b7355',
            borderRadius: '4px',
            background: '#f5e6c8',
            color: '#6b5a3e',
            fontFamily: "'Special Elite', Georgia, serif",
            fontSize: '13px',
          }}
        >
          <span>{t.photosEmpty}</span>
        </div>
      ) : (
      <div
        className="relative"
        onMouseEnter={() => setGalleryHover(true)}
        onMouseLeave={() => setGalleryHover(false)}
      >
        <div
          ref={stripRef}
          className="flex gap-3 overflow-x-auto pb-1"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
          onWheel={(e) => {
            // Vertical wheel scrolls the strip horizontally; keep page scroll when at the edge.
            if (stripRef.current) {
              const el = stripRef.current
              const goingLeft = e.deltaY < 0
              const atStart = el.scrollLeft <= 0
              const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1
              if ((goingLeft && atStart) || (!goingLeft && atEnd)) return
              e.preventDefault()
              el.scrollLeft += e.deltaY
            }
          }}
        >
          {peak.photos.map((photo, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedPhoto(selectedPhoto === idx ? null : idx)}
              aria-label={`${t.photosTitle}: ${displayName(peak)} — ${idx + 1}/${peak.photos.length}`}
              className="shrink-0 transition-all"
              style={{
                height: '280px',
                width: 'auto',
                border: selectedPhoto === idx ? '3px solid #c44d2c' : '3px solid #8b7355',
                borderRadius: '4px',
                boxShadow: selectedPhoto === idx ? '3px 3px 0px #c44d2c' : '2px 2px 0px #3d2b1f',
                background: '#f5e6c8',
                cursor: 'pointer',
                padding: 0,
              }}
            >
              <img
                src={assetPath(photo)}
                alt={`${displayName(peak)} — ${t.photosTitle} ${idx + 1}`}
                loading="lazy"
                onLoad={recheckOverflow}
                style={{
                  height: '274px',
                  width: 'auto',
                  maxWidth: '90vw',
                  display: 'block',
                  borderRadius: '2px',
                  objectFit: 'cover',
                }}
              />
            </button>
          ))}
        </div>

        {/* Side arrows — only when the strip overflows horizontally */}
        {overflowing && (
          <>
            <button
              onClick={() => scrollStrip(-1)}
              aria-label={`${t.photosTitle} — назад`}
              className="absolute left-1 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center transition-opacity"
              style={{
                background: '#c44d2c',
                border: '2px solid #3d2b1f',
                borderRadius: '4px',
                color: '#fdf6e3',
                cursor: 'pointer',
                boxShadow: '2px 2px 0px #3d2b1f',
                opacity: galleryHover || stripRef.current?.scrollLeft ? 1 : 0.85,
              }}
            >
              ‹
            </button>
            <button
              onClick={() => scrollStrip(1)}
                aria-label={`${t.photosTitle} — вперёд`}
              className="absolute right-1 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center transition-opacity"
              style={{
                background: '#c44d2c',
                border: '2px solid #3d2b1f',
                borderRadius: '4px',
                color: '#fdf6e3',
                cursor: 'pointer',
                boxShadow: '2px 2px 0px #3d2b1f',
                opacity: galleryHover || (stripRef.current && stripRef.current.scrollLeft + stripRef.current.clientWidth < stripRef.current.scrollWidth - 1) ? 1 : 0.85,
              }}
            >
              ›
            </button>
          </>
        )}
      </div>
      )}

      {/* Lightbox overlay — guarded: close if the current photo is missing (e.g. peak changed while open) */}
      {selectedPhoto !== null && (selectedPhoto < peak.photos.length ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ background: 'rgba(45,27,0,0.85)' }}
          onClick={() => setSelectedPhoto(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`${peak.name} — ${t.photosTitle}`}
        >
          <div className="relative max-w-4xl max-h-[80vh] w-full mx-4">
            <img
              src={assetPath(peak.photos[selectedPhoto])}
              alt={`${displayName(peak)} — ${t.photosTitle} ${selectedPhoto + 1}/${peak.photos.length}`}
              className="w-full h-full object-contain"
              style={{ border: '4px solid #f5e6c8', borderRadius: '4px', boxShadow: '4px 4px 0px #3d2b1f' }}
            />
            <button
              className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center"
              style={{ background: '#c44d2c', border: '2px solid #3d2b1f', borderRadius: '4px', color: '#fdf6e3', cursor: 'pointer' }}
              onClick={(e) => { e.stopPropagation(); setSelectedPhoto(null) }}
              aria-label="Close"
            >
              ✕
            </button>
            {/* Nav arrows */}
            <button
              className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center"
              style={{ background: '#c44d2c', border: '2px solid #3d2b1f', borderRadius: '4px', color: '#fdf6e3', cursor: 'pointer' }}
              onClick={(e) => { e.stopPropagation(); setSelectedPhoto((selectedPhoto - 1 + peak.photos.length) % peak.photos.length) }}
              aria-label="Previous photo"
            >
              ‹
            </button>
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center"
              style={{ background: '#c44d2c', border: '2px solid #3d2b1f', borderRadius: '4px', color: '#fdf6e3', cursor: 'pointer' }}
              onClick={(e) => { e.stopPropagation(); setSelectedPhoto((selectedPhoto + 1) % peak.photos.length) }}
              aria-label="Next photo"
            >
              ›
            </button>
          </div>
        </div>
      ) : null)}
    </div>
  )
}

/* ─── EquipmentBlock ─── */
function EquipmentBlock({
  peak,
  t,
  lang,
  checkedItems,
  toggleItem,
}: {
  peak: Peak
  t: any
  lang: Lang
  checkedItems: Record<string, boolean>
  toggleItem: (key: string) => void
}) {
  const guidance = difficultyGuidance[peak.difficultyLevel]
  const equipment = [{
    category: 'Рекомендации по уровню',
    items: guidance.equipment.map((name) => ({ name, essential: true, note: undefined })),
  }]

  return (
    <div className="retro-card p-6 mb-6">
      {/* Decorative stripe accent */}
      <div className="flex items-center gap-3 mb-5">
        <div
          className="w-10 h-10 flex items-center justify-center"
          style={{
            background: '#c44d2c',
            border: '2px solid #3d2b1f',
            borderRadius: '4px',
            boxShadow: '2px 2px 0px #3d2b1f',
          }}
        >
          <Backpack className="w-5 h-5" style={{ color: '#fdf6e3' }} />
        </div>
        <h2
          className="text-lg font-bold"
          style={{ color: '#3d2b1f', fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          {t.equipmentTitle}
        </h2>
      </div>

      <div className="retro-divider mb-5">✦</div>

      <div className="space-y-6">
        {equipment.map((cat, catIdx) => (
          <div key={catIdx}>
            <h3
              className="text-xs font-bold uppercase tracking-wider mb-3"
              style={{
                color: '#ad3e1a',
                fontFamily: "'Special Elite', Georgia, serif",
                letterSpacing: '0.12em',
                borderBottom: '2px solid #c44d2c',
                paddingBottom: '4px',
                display: 'inline-block',
              }}
            >
              {trData(lang, 'equipmentCategory', cat.category)}
            </h3>
            <div className="space-y-2">
              {cat.items.map((item, itemIdx) => {
                const itemKey = `${catIdx}-${itemIdx}`
                const isChecked = checkedItems[itemKey] || false
                return (
                  <button
                    key={itemIdx}
                    onClick={() => toggleItem(itemKey)}
                    role="checkbox"
                    aria-checked={isChecked}
                    className="w-full flex items-center gap-3 p-3 text-left transition-all"
                    style={{
                      background: isChecked ? '#eddcbc' : '#f5e6c8',
                      border: `2px solid ${isChecked ? '#6b5a3e' : '#8b7355'}`,
                      borderRadius: '4px',
                      boxShadow: isChecked ? 'inset 1px 1px 3px rgba(61,43,31,0.15)' : '2px 2px 0px rgba(61,43,31,0.08)',
                      cursor: 'pointer',
                    }}
                  >
                    <div
                      className="retro-checkbox"
                      style={isChecked ? { background: '#c44d2c', borderColor: '#3d2b1f' } : {}}
                    >
                      {isChecked && (
                        <CheckCircle2 className="w-3 h-3" style={{ color: '#fdf6e3' }} />
                      )}
                    </div>
                    <div className="flex-1">
                      <span
                        className="text-sm font-medium"
                        style={{
                          color: isChecked ? '#8b7355' : '#3d2b1f',
                          textDecoration: isChecked ? 'line-through' : 'none',
                        }}
                      >
                        {trData(lang, 'item', item.name)}
                      </span>
                      {item.note && (
                        <span className="text-xs ml-2" style={{ color: '#8b7355' }}>
                          ({trData(lang, 'note', item.note)})
                        </span>
                      )}
                    </div>
                    {item.essential && (
                      <span
                        className="retro-badge text-xs"
                        style={{ color: '#ad3e1a', borderColor: '#ad3e1a' }}
                      >
                        {t.essential}
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        ))}

        {/* Guide apps recommendation */}
        <div
          className="p-4"
          style={{
            background: '#eddcbc',
            border: '2px dashed #8b7355',
            borderRadius: '4px',
          }}
        >
          <h3
            className="text-xs font-bold uppercase tracking-wider mb-3"
            style={{
              color: '#3d2b1f',
              fontFamily: "'Special Elite', Georgia, serif",
              letterSpacing: '0.12em',
            }}
          >
            📱 {t.appsTitle}
          </h3>
          <div className="space-y-2">
            {[
              { icon: '🥾', text: t.appFriendHike, url: 'https://friendhike.com/' },
              { icon: '🗺️', text: t.appGuruMaps, url: 'https://www.gurumaps.app/' },
              { icon: '🧭', text: t.appMapsMe, url: 'https://maps.me/' },
              { icon: '🌬️', text: t.appWindy, url: 'https://www.windy.com/' },
            ].map((app) => (
              <a
                key={app.text}
                href={app.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 no-underline transition-all"
                style={{
                  background: '#f5e6c8',
                  border: '2px solid #8b7355',
                  borderRadius: '4px',
                  boxShadow: '2px 2px 0px rgba(61,43,31,0.08)',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#c44d2c')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#8b7355')}
              >
                <span className="text-lg">{app.icon}</span>
                <span className="text-sm" style={{ color: '#3d2b1f' }}>
                  {app.text}
                </span>
                <span className="ml-auto text-xs" style={{ color: '#6b5a3e' }} aria-hidden="true">
                  ↓
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── SafetyBlock ─── */
function SafetyBlock({ peak, t, lang }: { peak: Peak; t: any; lang: Lang }) {
  return (
    <div className="retro-card p-6 mb-6">
      <div className="flex items-center gap-3 mb-5">
        <div
          className="w-10 h-10 flex items-center justify-center"
          style={{
            background: '#c44d2c',
            border: '2px solid #3d2b1f',
            borderRadius: '4px',
            boxShadow: '2px 2px 0px #3d2b1f',
          }}
        >
          <Shield className="w-5 h-5" style={{ color: '#fdf6e3' }} />
        </div>
        <h2
          className="text-lg font-bold"
          style={{ color: '#3d2b1f', fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          {t.safetyTitle}
        </h2>
      </div>

      <div className="retro-divider mb-5">✦</div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Rules */}
        <div>
          <h3
            className="text-xs font-bold uppercase tracking-wider mb-3"
            style={{
              color: '#c44d2c',
              fontFamily: "'Special Elite', Georgia, serif",
              letterSpacing: '0.12em',
              borderBottom: '2px solid #c44d2c',
              paddingBottom: '4px',
              display: 'inline-block',
            }}
          >
            {t.rules}
          </h3>
          <div className="space-y-2">
            {difficultyGuidance[peak.difficultyLevel].rules.map((rule, i) => (
              <div
                key={i}
                className="flex items-start gap-2 text-sm p-2"
                style={{
                  background: i % 2 === 0 ? '#eddcbc' : 'transparent',
                  borderRadius: '3px',
                }}
              >
                <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" style={{ color: '#8b5a00' }} />
                <span style={{ color: '#3d2b1f' }}>{trData(lang, 'rule', rule)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency contacts */}
        <div>
          <h3
            className="text-xs font-bold uppercase tracking-wider mb-3"
            style={{
              color: '#c44d2c',
              fontFamily: "'Special Elite', Georgia, serif",
              letterSpacing: '0.12em',
              borderBottom: '2px solid #c44d2c',
              paddingBottom: '4px',
              display: 'inline-block',
            }}
          >
            {t.emergencyContacts}
          </h3>
          <div className="space-y-2">
            {peak.safety.emergencyContacts.map((contact, i) => (
              <a
                key={i}
                href={`tel:${contact.number}`}
                className="flex items-center gap-2 text-sm no-underline transition-colors p-2"
                style={{
                  border: '2px solid #8b7355',
                  borderRadius: '4px',
                  background: '#f5e6c8',
                  color: '#3d2b1f',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#c44d2c'
                  e.currentTarget.style.color = '#ad3e1a'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#8b7355'
                  e.currentTarget.style.color = '#3d2b1f'
                }}
              >
                <Phone className="w-4 h-4 shrink-0" style={{ color: '#ad3e1a' }} />
                <div>
                  <div className="font-bold">{trData(lang, 'contact', contact.label)}</div>
                  <div className="text-xs" style={{ color: '#6b5a3e' }}>{contact.number}</div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Tips */}
        <div>
          <h3
            className="text-xs font-bold uppercase tracking-wider mb-3"
            style={{
              color: '#c44d2c',
              fontFamily: "'Special Elite', Georgia, serif",
              letterSpacing: '0.12em',
              borderBottom: '2px solid #c44d2c',
              paddingBottom: '4px',
              display: 'inline-block',
            }}
          >
            {t.tips}
          </h3>
          <div className="space-y-2">
            {difficultyGuidance[peak.difficultyLevel].tips.map((tip, i) => (
              <div
                key={i}
                className="flex items-start gap-2 text-sm p-2"
                style={{
                  background: i % 2 === 0 ? '#eddcbc' : 'transparent',
                  borderRadius: '3px',
                }}
              >
                <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" style={{ color: '#5a6e3c' }} />
                <span style={{ color: '#3d2b1f' }}>{trData(lang, 'tip', tip)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
