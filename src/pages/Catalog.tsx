import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { useLanguage, type Lang } from '../lib/language'
import { trData } from '../lib/dataTranslations'
import { useWeather, normalizeConditionKey, prefetchWeatherAll } from '../lib/weather'
import { peaksData, type Peak, type PeakCategory } from '../data/peaksData'

/** Small live-weather chip on catalog cards (shared daily cache) */
function CatalogWeatherChip({ lang, peak }: { lang: Lang; peak: Peak }) {
  const { data } = useWeather(peak.coordinates.lat, peak.coordinates.lng)
  if (!data) {
    return (
      <div
        className="mt-3 flex items-center justify-between"
        style={{ borderTop: '1px dashed #8b7355', paddingTop: '10px' }}
      >
        <span className="text-lg">🌤️</span>
        <span className="text-xs" style={{ color: '#6b5a3e', fontFamily: "'Special Elite', serif" }}>
          …
        </span>
      </div>
    )
  }
  const condition = normalizeConditionKey(data.current.descriptionKey || data.current.description)
  return (
    <div
      className="mt-3 flex items-center justify-between"
      style={{ borderTop: '1px dashed #8b7355', paddingTop: '10px' }}
    >
      <span className="text-lg">{data.current.icon}</span>
      <span className="text-sm font-bold" style={{ color: '#3d2b1f' }}>
        {data.current.temp}°C
      </span>
      <span
        className="text-xs"
        style={{
          color: '#6b5a3e',
          fontFamily: "'Special Elite', Georgia, serif",
        }}
      >
        {trData(lang, 'weather', condition)}
      </span>
    </div>
  )
}
import { Mountain, TrendingUp, ArrowUpRight } from 'lucide-react'
import { Footer } from '../components/Footer'

export default function Catalog() {
  const { t, lang } = useLanguage()
  const [activeTab, setActiveTab] = useState<PeakCategory>('peak')

  // Cold-start warmup: fetch all peak locations in parallel (Promise.all),
  // honoring the 24h localStorage cache — one API day-load, instant tab switches.
  useEffect(() => {
    const seen = new Set<string>()
    const locations = peaksData
      .filter((p) => !p.inDevelopment)
      .map((p) => p.coordinates)
      .filter((c) => {
        const k = c.lat.toFixed(4) + ',' + c.lng.toFixed(4)
        if (seen.has(k)) return false
        seen.add(k)
        return true
      })
    prefetchWeatherAll(locations.map((c) => ({ lat: c.lat, lon: c.lng })))
  }, [])
  const [levelFilter, setLevelFilter] = useState<number | null>(null)

  const tabs: { key: PeakCategory; label: string; icon: React.ReactNode }[] = [
    { key: 'peak', label: t.catalogPeaks, icon: <Mountain className="w-4 h-4" /> },
    { key: 'traverse', label: t.catalogTraverses, icon: <TrendingUp className="w-4 h-4" /> },
    { key: 'mountain', label: t.catalogMountains, icon: <ArrowUpRight className="w-4 h-4" /> },
  ]

  const filteredPeaks = peaksData.filter(
    (p) => p.category === activeTab && (levelFilter === null || p.difficultyLevel === levelFilter)
  )

  function displayName(peak: Peak): string {
    if (lang === 'en') return peak.nameEn
    if (lang === 'kz') return peak.nameKz
    return peak.name
  }

  const difficultyColors: Record<number, string> = {
    1: '#5a6e3c',
    2: '#e07030',
    3: '#c44d2c',
    4: '#7b2d8e',
  }

  return (
    <div className="min-h-screen" style={{ background: '#fdf6e3' }}>
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 pt-24 pb-16">
        {/* Page title */}
        <div className="text-center mb-8">
          <h1
            className="text-3xl md:text-4xl font-bold mb-2"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              color: '#3d2b1f',
            }}
          >
            {t.catalog}
          </h1>
          <div className="flex items-center justify-center gap-3">
            <div
              style={{
                width: '60px',
                height: '3px',
                background: '#c44d2c',
                borderRadius: '2px',
              }}
            />
            <span style={{ color: '#6b5a3e', fontFamily: "'Special Elite', Georgia, serif", fontSize: '0.8rem' }}>
              Заилийский Алатау
            </span>
            <div
              style={{
                width: '60px',
                height: '3px',
                background: '#c44d2c',
                borderRadius: '2px',
              }}
            />
          </div>
        </div>

        {/* Tab buttons */}
        <div className="flex justify-center gap-3 mb-8">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.key
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className="flex items-center gap-2 px-6 py-3 text-sm font-bold uppercase transition-all"
                style={{
                  fontFamily: "'Special Elite', Georgia, serif",
                  letterSpacing: '0.1em',
                  background: isActive ? '#c44d2c' : '#f5e6c8',
                  color: isActive ? '#fdf6e3' : '#3d2b1f',
                  border: '3px solid #3d2b1f',
                  borderRadius: '6px',
                  boxShadow: isActive ? '3px 3px 0px #3d2b1f' : '2px 2px 0px #3d2b1f',
                  transform: isActive ? 'translate(-1px, -1px)' : 'none',
                }}
              >
                {tab.icon}
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Difficulty filter buttons */}
        <div className="flex justify-center gap-2 mb-8 flex-wrap">
          {([
            { level: null as number | null, label: lang === 'ru' ? 'Все' : lang === 'kz' ? 'Барлығы' : 'All', color: '#6b5a3e' },
            { level: 1 as number, label: t.level1, color: difficultyColors[1] },
            { level: 2 as number, label: t.level2, color: difficultyColors[2] },
            { level: 3 as number, label: t.level3, color: difficultyColors[3] },
            { level: 4 as number, label: t.level4, color: difficultyColors[4] },
          ]).map((f) => {
            const isActive = levelFilter === f.level
            return (
              <button
                key={String(f.level)}
                onClick={() => setLevelFilter(f.level)}
                aria-pressed={isActive}
                className="px-4 py-1.5 text-xs font-bold uppercase transition-all"
                style={{
                  fontFamily: "'Special Elite', Georgia, serif",
                  letterSpacing: '0.08em',
                  color: isActive ? '#fdf6e3' : f.color,
                  background: isActive ? f.color : 'transparent',
                  border: '2px solid ' + f.color,
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                {f.label}
              </button>
            )
          })}
        </div>

        {/* Cards grid */}
        {filteredPeaks.length === 0 ? (
          <div
            className="retro-card p-12 text-center max-w-lg mx-auto"
          >
            <div className="text-4xl mb-4">🏔️</div>
            <p
              style={{
                color: '#6b5a3e',
                fontFamily: "'Special Elite', Georgia, serif",
                fontSize: '1rem',
              }}
            >
              {t.catalogNoItems}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPeaks.map((peak) => (
              <Link
                key={peak.id}
                to={`/peak/${peak.id}`}
                className="no-underline block"
              >
                <div
                  className="h-full transition-transform"
                  style={{
                    background: '#f5e6c8',
                    border: '3px solid #3d2b1f',
                    borderRadius: '6px',
                    boxShadow: '4px 4px 0px #3d2b1f',
                    padding: '24px',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translate(-2px, -2px)'
                    e.currentTarget.style.boxShadow = '6px 6px 0px #3d2b1f'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'none'
                    e.currentTarget.style.boxShadow = '4px 4px 0px #3d2b1f'
                  }}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3
                        className="text-lg font-bold mb-1"
                        style={{
                          fontFamily: "'Playfair Display', Georgia, serif",
                          color: '#3d2b1f',
                        }}
                      >
                        {displayName(peak)}
                      </h3>
                      <div
                        className="text-xs"
                        style={{
                          color: '#6b5a3e',
                          fontFamily: "'Special Elite', Georgia, serif",
                        }}
                      >
                        {t.catalogElevation}: {peak.elevation} м
                      </div>
                    </div>
                    <span
                      className="retro-badge text-xs font-bold"
                      style={{
                        color: difficultyColors[peak.difficultyLevel],
                        borderColor: difficultyColors[peak.difficultyLevel],
                        fontFamily: "'Special Elite', Georgia, serif",
                      }}
                    >
                      {trData(lang, 'difficulty', peak.difficulty)}
                    </span>
                  </div>

                  {/* Route stats */}
                  <div
                    style={{
                      borderTop: '2px dashed #8b7355',
                      paddingTop: '12px',
                    }}
                  >
                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div>
                        <div
                          className="text-xs uppercase mb-1"
                          style={{
                            color: '#6b5a3e',
                            fontFamily: "'Special Elite', Georgia, serif",
                            letterSpacing: '0.1em',
                          }}
                        >
                          {t.distance}
                        </div>
                        <div
                          className="text-sm font-bold"
                          style={{ color: '#3d2b1f' }}
                        >
                          {peak.routeStats.distance}
                        </div>
                      </div>
                      <div>
                        <div
                          className="text-xs uppercase mb-1"
                          style={{
                            color: '#6b5a3e',
                            fontFamily: "'Special Elite', Georgia, serif",
                            letterSpacing: '0.1em',
                          }}
                        >
                          {t.elevationGain}
                        </div>
                        <div
                          className="text-sm font-bold"
                          style={{ color: '#3d2b1f' }}
                        >
                          {peak.routeStats.elevationGain}
                        </div>
                      </div>
                      <div>
                        <div
                          className="text-xs uppercase mb-1"
                          style={{
                            color: '#6b5a3e',
                            fontFamily: "'Special Elite', Georgia, serif",
                            letterSpacing: '0.1em',
                          }}
                        >
                          {t.duration}
                        </div>
                        <div
                          className="text-sm font-bold"
                          style={{ color: '#3d2b1f' }}
                        >
                          {peak.routeStats.duration}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Weather preview — live via shared hook */}
                  <CatalogWeatherChip lang={lang} peak={peak} />
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
