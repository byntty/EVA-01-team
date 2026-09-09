import { Link } from 'react-router-dom'
import { Phone } from 'lucide-react'
import { useLanguage } from '../lib/language'

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer
      className="mt-12 py-8 px-4"
      style={{ background: '#2d1b00', borderTop: '4px solid #c44d2c' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Top row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <img
              src={`${import.meta.env.BASE_URL}logo.jpg`}
              alt="AlatauPeaks"
              className="w-8 h-8"
              style={{
                border: '2px solid #fdf6e3',
                borderRadius: '4px',
              }}
            />
            <span
              style={{
                color: '#fdf6e3',
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 700,
              }}
            >
              Alatau<span style={{ color: '#e8703c' }}>Peaks</span>
            </span>
          </div>
          <p
            className="text-sm text-center"
            style={{ color: '#a09078', fontFamily: "'Special Elite', Georgia, serif" }}
          >
            {t.footerText}
          </p>
          <p className="text-xs" style={{ color: '#a09078' }}>
            © {new Date().getFullYear()} AlatauPeaks
          </p>
        </div>

        {/* Divider */}
        <div className="retro-divider mb-6" style={{ color: '#a09078' }}>✦</div>

        {/* Contact row */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-6">
          {/* Telegram Nis Climbers */}
          <a
            href="https://t.me/+srzSUc-qx4oyOWYy"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 no-underline transition-colors"
            style={{ color: '#7ec3e6' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#54a9d4')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#7ec3e6')}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
            </svg>
            <span style={{ fontFamily: "'Special Elite', Georgia, serif", fontWeight: 700, fontSize: '0.9rem' }}>
              Nis Climbers
            </span>
          </a>

          {/* Phone contact */}
          <a
            href="tel:+77054102502"
            className="flex items-center gap-2 no-underline transition-colors"
            style={{ color: '#fdf6e3' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#c44d2c')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#fdf6e3')}
          >
            <Phone className="w-4 h-4" />
            <span style={{ fontFamily: "'Special Elite', Georgia, serif", fontWeight: 700, fontSize: '0.9rem' }}>
              +7 705 410 2502
            </span>
          </a>
        </div>

        {/* Divider */}
        <div className="retro-divider mb-4" style={{ color: '#a09078' }}>✦</div>

        {/* Legal row */}
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          <Link to="/privacy" className="text-xs no-underline transition-colors" style={{ color: '#a09078', fontFamily: "'Special Elite', Georgia, serif" }}>
            {t.legalPrivacy}
          </Link>
          <Link to="/cookies" className="text-xs no-underline transition-colors" style={{ color: '#a09078', fontFamily: "'Special Elite', Georgia, serif" }}>
            {t.legalCookies}
          </Link>
          <Link to="/terms" className="text-xs no-underline transition-colors" style={{ color: '#a09078', fontFamily: "'Special Elite', Georgia, serif" }}>
            {t.legalTerms}
          </Link>
          <span className="text-xs" style={{ color: '#a09078' }}>
            Nis Climbers · Almaty, Kazakhstan
          </span>
        </div>
      </div>
    </footer>
  )
}
