import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage, type Lang } from '../lib/language'
import { trData } from '../lib/dataTranslations'
import { searchPeaks, type Peak } from '../data/peaksData'

export function Navbar() {
  const { lang, setLang, t } = useLanguage()
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<Peak[]>([])
  const [showSearchDropdown, setShowSearchDropdown] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSearchDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function handleSearch(value: string) {
    setSearchQuery(value)
    if (value.trim()) {
      const results = searchPeaks(value)
      setSearchResults(results)
      setShowSearchDropdown(true)
    } else {
      setSearchResults([])
      setShowSearchDropdown(false)
    }
  }

  function handlePeakClick(id: string) {
    navigate(`/peak/${id}`)
    setSearchQuery('')
    setShowSearchDropdown(false)
    setMobileMenuOpen(false)
  }

  function displayName(peak: Peak): string {
    if (lang === 'en') return peak.nameEn
    if (lang === 'kz') return peak.nameKz
    return peak.name
  }

  const difficultyColors: Record<number, string> = {
    1: '#5a6e3c',
    2: '#7a6100',
    3: '#c44d2c',
    4: '#7b2d8e',
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-2">
      <div
        className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4"
        style={{
          background: '#f5e6c8',
          border: '3px solid #3d2b1f',
          borderRadius: '6px',
          boxShadow: '4px 4px 0px #3d2b1f',
        }}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 shrink-0 no-underline">
          <img
            src={`${import.meta.env.BASE_URL}logo.jpg`}
            alt="" aria-hidden="true"
            className="w-10 h-10"
            style={{
              border: '2px solid #3d2b1f',
              borderRadius: '4px',
              boxShadow: '2px 2px 0px #3d2b1f',
            }}
          />
          <span
            className="text-lg font-bold hidden sm:block"
            style={{
              color: '#3d2b1f',
              fontFamily: "'Playfair Display', Georgia, serif",
            }}
          >
            Alatau<span style={{ color: '#ad3e1a' }}>Peaks</span>
          </span>
        </Link>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Catalog link */}
        <Link
          to="/catalog"
          className="hidden md:flex items-center gap-1 px-4 py-1.5 text-xs font-bold uppercase no-underline transition-all"
          style={{
            fontFamily: "'Special Elite', Georgia, serif",
            letterSpacing: '0.1em',
            border: '2px solid #3d2b1f',
            borderRadius: '3px',
            background: '#f5e6c8',
            color: '#3d2b1f',
            boxShadow: '2px 2px 0px #3d2b1f',
          }}
        >
          {t.catalog}
        </Link>

        {/* Search — centered */}
        <div ref={searchRef} className="relative max-w-md mx-auto flex-shrink-0">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
              style={{ color: '#6b5a3e' }}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder={t.searchPlaceholder}
              aria-label={t.searchPlaceholder.replace('...', '')}
              className="retro-input w-full pl-10 pr-4 text-sm"
            />
          </div>

          <AnimatePresence>
            {showSearchDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.15 }}
                className="absolute top-full left-0 right-0 mt-2 p-2 z-50"
                style={{
                  background: '#f5e6c8',
                  border: '3px solid #3d2b1f',
                  borderRadius: '6px',
                  boxShadow: '4px 4px 0px #3d2b1f',
                }}
              >
                {searchResults.map((peak) => (
                  <button
                    key={peak.id}
                    onClick={() => handlePeakClick(peak.id)}
                    className="w-full flex items-center justify-between p-3 rounded text-left hover:bg-[#eddcbc] transition-colors"
                    style={{ borderBottom: '1px dashed #8b7355' }}
                  >
                    <div>
                      <div
                        className="font-bold text-sm"
                        style={{ color: '#3d2b1f' }}
                      >
                        {displayName(peak)}
                      </div>
                      <div className="text-xs" style={{ color: '#6b5a3e' }}>
                        {peak.elevation} м
                      </div>
                    </div>
                    <span
                      className="retro-badge text-xs"
                      style={{ color: difficultyColors[peak.difficultyLevel], borderColor: difficultyColors[peak.difficultyLevel] }}
                    >
                      {trData(lang, 'difficulty', peak.difficulty)}
                    </span>
                  </button>
                ))}
                {searchResults.length === 0 && (
                  <div
                    className="p-3 text-sm text-center"
                    style={{ color: '#6b5a3e', fontFamily: "'Special Elite', Georgia, serif" }}
                  >
                    {lang === 'ru'
                      ? 'Ничего не найдено. Попробуйте другое название.'
                      : lang === 'kz'
                      ? 'Ештеңе табылмады. Басқа атау көріңіз.'
                      : 'Nothing found. Try a different name.'}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Language switcher — inline on desktop, in hamburger menu on smaller screens */}
        <div className="hidden md:flex items-center gap-1 shrink-0">
          {(['ru', 'en', 'kz'] as Lang[]).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className="px-3 py-1.5 text-xs font-bold uppercase transition-all"
              style={{
                fontFamily: "'Special Elite', Georgia, serif",
                letterSpacing: '0.1em',
                border: lang === l ? '2px solid #3d2b1f' : '2px solid #8b7355',
                borderRadius: '3px',
                background: lang === l ? '#ad3e1a' : 'transparent',
                color: lang === l ? '#fdf6e3' : '#6b5a3e',
                boxShadow: lang === l ? '2px 2px 0px #3d2b1f' : 'none',
              }}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded transition-colors"
          style={{
            border: '2px solid #8b7355',
            background: 'transparent',
          }}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileMenuOpen ? (
            <X className="w-5 h-5" style={{ color: '#3d2b1f' }} />
          ) : (
            <Menu className="w-5 h-5" style={{ color: '#3d2b1f' }} />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="max-w-7xl mx-auto mt-2 p-4 md:hidden"
            style={{
              background: '#f5e6c8',
              border: '3px solid #3d2b1f',
              borderRadius: '6px',
              boxShadow: '4px 4px 0px #3d2b1f',
            }}
          >
            {/* Mobile search */}
            <div className="relative mb-4">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                style={{ color: '#6b5a3e' }}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder={t.searchPlaceholder}
                aria-label={t.searchPlaceholder.replace('...', '')}
                className="retro-input w-full pl-10 pr-4 text-sm"
              />
            </div>

            {/* Mobile catalog link */}
            <Link
              to="/catalog"
              onClick={() => setMobileMenuOpen(false)}
              className="block mb-3 px-4 py-3 text-center text-sm font-bold uppercase no-underline"
              style={{
                fontFamily: "'Special Elite', Georgia, serif",
                letterSpacing: '0.1em',
                border: '2px solid #3d2b1f',
                borderRadius: '3px',
                background: '#ad3e1a',
                color: '#fdf6e3',
                boxShadow: '2px 2px 0px #3d2b1f',
              }}
            >
              {t.catalog}
            </Link>

            {/* Mobile language switcher */}
            <div className="flex items-center gap-2">
              {(['ru', 'en', 'kz'] as Lang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => {
                    setLang(l)
                    setMobileMenuOpen(false)
                  }}
                  className="flex-1 px-3 py-2 text-sm font-bold uppercase transition-all"
                  style={{
                    fontFamily: "'Special Elite', Georgia, serif",
                    letterSpacing: '0.1em',
                    border: lang === l ? '2px solid #3d2b1f' : '2px solid #8b7355',
                    borderRadius: '3px',
                    background: lang === l ? '#ad3e1a' : 'transparent',
                    color: lang === l ? '#fdf6e3' : '#6b5a3e',
                    boxShadow: lang === l ? '2px 2px 0px #3d2b1f' : 'none',
                  }}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
