import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Cookie } from 'lucide-react'
import { useLanguage } from '../lib/language'

const CONSENT_KEY = 'ap-cookie-consent'

/**
 * Minimal cookie/localStorage notice.
 * The site only stores strictly necessary, non-personal data (language +
 * weather cache), so a blocking banner is not legally required — this
 * informs the user once and links to the Cookies Policy.
 */
export function CookieConsent() {
  const { t } = useLanguage()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      if (!localStorage.getItem(CONSENT_KEY)) setVisible(true)
    } catch {
      // storage unavailable — just don't show the banner
    }
  }, [])

  if (!visible) return null

  const dismiss = (value: 'accepted' | 'declined') => {
    try {
      localStorage.setItem(CONSENT_KEY, value)
    } catch {
      // ignore
    }
    setVisible(false)
  }

  return (
    <div
      className="fixed bottom-4 left-4 right-4 z-[90] mx-auto max-w-xl retro-card p-4"
      role="dialog"
      aria-live="polite"
      aria-label={t.cookiesTitle}
    >
      <div className="flex items-start gap-3">
        <div
          className="w-8 h-8 flex items-center justify-center shrink-0"
          style={{
            background: '#c44d2c',
            border: '2px solid #3d2b1f',
            borderRadius: '4px',
            boxShadow: '2px 2px 0px #3d2b1f',
          }}
        >
          <Cookie className="w-4 h-4" style={{ color: '#fdf6e3' }} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs" style={{ color: '#3d2b1f', lineHeight: 1.5 }}>
            {t.consentText}{' '}
            <Link to="/cookies" className="underline font-bold" style={{ color: '#ad3e1a' }}>
              {t.consentReadMore}
            </Link>
          </p>
          <div className="flex gap-2 mt-2">
            <button
              className="px-3 py-1.5 text-xs font-bold uppercase transition-colors"
              style={{
                fontFamily: "'Special Elite', Georgia, serif",
                letterSpacing: '0.08em',
                background: '#c44d2c',
                color: '#fdf6e3',
                border: '2px solid #3d2b1f',
                borderRadius: '3px',
                boxShadow: '2px 2px 0px #3d2b1f',
                cursor: 'pointer',
              }}
              onClick={() => dismiss('accepted')}
            >
              {t.consentAccept}
            </button>
            <button
              className="px-3 py-1.5 text-xs font-bold uppercase transition-colors"
              style={{
                fontFamily: "'Special Elite', Georgia, serif",
                letterSpacing: '0.08em',
                background: 'transparent',
                color: '#6b5a3e',
                border: '2px solid #8b7355',
                borderRadius: '3px',
                cursor: 'pointer',
              }}
              onClick={() => dismiss('declined')}
            >
              {t.consentDecline}
              { /* declining keeps only essential function; there is nothing else to disable */}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
