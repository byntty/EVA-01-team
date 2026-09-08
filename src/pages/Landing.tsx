import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, Compass } from 'lucide-react'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { useLanguage } from '../lib/language'
import { peaksData, type Peak } from '../data/peaksData'

const categoryColors: Record<number, { color: string; bg: string; label: string }> = {
  1: { color: '#5a6e3c', bg: '#5a6e3c20', label: 'categoryEasy' },
  2: { color: '#d4a520', bg: '#d4a52020', label: 'categoryMedium' },
  3: { color: '#c44d2c', bg: '#c44d2c20', label: 'categoryHard' },
  4: { color: '#7b2d8e', bg: '#7b2d8e20', label: 'categoryExtreme' },
}

export default function Landing() {
  const { t, lang } = useLanguage()
  const navigate = useNavigate()
  const [filterLevel, setFilterLevel] = useState<number | null>(null)
  const [hoveredPeak, setHoveredPeak] = useState<string | null>(null)


  function displayName(peak: Peak): string {
    if (lang === 'en') return peak.nameEn
    if (lang === 'kz') return peak.nameKz
    return peak.name
  }

  function toggleFilter(level: number) {
    setFilterLevel(filterLevel === level ? null : level)
  }

  const routesCountByLevel = (level: number) =>
    peaksData.filter((p) => p.category === 'peak' && p.difficultyLevel === level).length



  return (
    <div style={{ minHeight: '100vh', background: '#fdf6e3' }}>
      <Navbar />

      {/* Map Section */}
      <main className="pt-24 pb-8 px-4 max-w-7xl mx-auto">
        {/* Vintage title banner */}
        <div className="text-center mb-4">
          <div className="retro-divider">
            <span>✦ {t.mapTitle} ✦</span>
          </div>
        </div>        <div
          className="retro-card overflow-hidden relative"
          style={{ aspectRatio: '1500 / 517' }}
        >
          {/* Panorama image */}
          <img
            src="/alataupeaks/map-panorama.jpg"
            alt="Заилийский Алатау — интерактивная карта"
            className="w-full h-full object-cover"
            style={{ display: 'block' }}
          />

          {/* Noise overlay */}
          <div className="retro-noise absolute inset-0 pointer-events-none" />

          {/* Peak markers overlay — SVG aligned to image aspect ratio */}
          <svg
            viewBox="0 0 1500 517"
            className="absolute inset-0 w-full h-full"
            style={{ pointerEvents: 'none' }}
          >
            {peaksData.filter((p) => p.category === 'peak').map((peak) => {
              const isVisible = filterLevel === null || peak.difficultyLevel === filterLevel
              const top = (parseFloat(peak.mapPosition.top) / 100) * 517
              const left = (parseFloat(peak.mapPosition.left) / 100) * 1500
              const isHovered = hoveredPeak === peak.id

              const markerColors: Record<number, string> = {
                1: '#5a6e3c',
                2: '#d4a520',
                3: '#c44d2c',
                4: '#7b2d8e',
              }
              const mColor = markerColors[peak.difficultyLevel]

              return (
                <g
                  key={peak.id}
                  style={{
                    cursor: 'pointer',
                    opacity: isVisible ? 1 : 0.12,
                    transition: 'opacity 0.3s ease',
                    pointerEvents: 'all',
                  }}
                  onClick={() => navigate(`/peak/${peak.id}`)}
                  onMouseEnter={() => setHoveredPeak(peak.id)}
                  onMouseLeave={() => setHoveredPeak(null)}
                >
                  {/* Pulse ring */}
                  <circle
                    cx={left}
                    cy={top}
                    r={isHovered ? 28 : 18}
                    fill="none"
                    stroke={mColor}
                    strokeWidth={2}
                    opacity={isHovered ? 0.6 : 0.3}
                    strokeDasharray="5 3"
                  >
                    <animate attributeName="r" values="18;28;18" dur="2.5s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.3;0.08;0.3" dur="2.5s" repeatCount="indefinite" />
                  </circle>

                  {/* Main marker */}
                  <circle
                    cx={left}
                    cy={top}
                    r={isHovered ? 12 : 8}
                    fill={mColor}
                    stroke="#3d2b1f"
                    strokeWidth={3}
                    style={{ transition: 'r 0.2s ease' }}
                  />

                  {/* Inner dot */}
                  <circle
                    cx={left}
                    cy={top}
                    r={isHovered ? 5 : 3}
                    fill="#fdf6e3"
                  />

                  {/* Tooltip on hover */}
                  {isHovered && (
                    <>
                      <rect
                        x={left - 120}
                        y={top - 75}
                        width={240}
                        height={55}
                        rx={4}
                        fill="#f5e6c8"
                        stroke="#3d2b1f"
                        strokeWidth={2.5}
                      />
                      <text
                        x={left}
                        y={top - 50}
                        textAnchor="middle"
                        fill="#3d2b1f"
                        fontSize={13}
                        fontWeight={700}
                        fontFamily="'Playfair Display', Georgia, serif"
                      >
                        {displayName(peak)}
                      </text>
                      <text
                        x={left}
                        y={top - 30}
                        textAnchor="middle"
                        fill="#8b7355"
                        fontSize={10}
                        fontFamily="'Special Elite', monospace"
                      >
                        {peak.elevation}м · {peak.difficulty}
                      </text>
                    </>
                  )}
                </g>
              )
            })}
          </svg>

          {/* Map hint badge */}
          <div
            className="absolute bottom-4 right-4 retro-badge text-xs flex items-center gap-1"
            style={{ color: '#8b7355', borderColor: '#8b7355', background: 'rgba(245,230,200,0.85)' }}
          >
            <Compass className="w-3 h-3" />
            {t.mapHint}
          </div>
        </div>

        {/* Category filters — vintage button style */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {([1, 2, 3, 4] as const).map((level) => {
            const cat = categoryColors[level]
            const isActive = filterLevel === level
            return (
              <motion.button
                key={level}
                whileTap={{ scale: 0.97 }}
                onClick={() => toggleFilter(level)}
                className="p-4 text-left transition-all"
                style={{
                  background: isActive ? cat.bg : '#f5e6c8',
                  border: `3px solid ${isActive ? cat.color : '#8b7355'}`,
                  borderRadius: '6px',
                  boxShadow: isActive ? `3px 3px 0px ${cat.color}` : '3px 3px 0px #3d2b1f',
                }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <div
                    className="w-3 h-3"
                    style={{
                      background: cat.color,
                      border: '1.5px solid #3d2b1f',
                      borderRadius: '2px',
                    }}
                  />
                  <span
                    className="font-bold text-sm"
                    style={{
                      color: '#3d2b1f',
                      fontFamily: "'Special Elite', Georgia, serif",
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {t[cat.label as keyof typeof t] as string}
                  </span>
                </div>
                <span className="text-xs" style={{ color: '#8b7355' }}>
                  {t.routesCount(routesCountByLevel(level))}
                </span>
              </motion.button>
            )
          })}
        </div>
      </main>

      <Footer />
    </div>
  )
}
