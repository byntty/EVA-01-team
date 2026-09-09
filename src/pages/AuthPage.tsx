import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useLanguage } from '../lib/language'

interface Props {
  redirectAfterAuth?: string
}

const NOT_READY = {
  ru: 'Авторизация пока не реализована. Все данные доступны без входа.',
  en: 'Sign-in is not available yet. All content is accessible without an account.',
  kz: 'Авторизация әзірленуде. Барлық ақпаратті тіркелмей-ақ көруге болады.',
}

const CONTINUE = { ru: 'Продолжить', en: 'Continue', kz: 'Жалғастыру' }

const CONSENT = {
  ru: 'Продолжая, вы соглашаетесь с обработкой минимальных данных: выбранный язык и кэш погоды хранятся только в вашем браузере.',
  en: 'By continuing you agree to minimal data handling: your chosen language and the weather cache are stored only in your browser.',
  kz: 'Жалғастыра отырып, минималды деректерді өңдеуге келісесіз: таңдалған тіл және ауа райы кэші тек сіздің браузеріңізде сақталады.',
}

export default function AuthPage({ redirectAfterAuth = '/' }: Props) {
  const navigate = useNavigate()
  const { lang, t } = useLanguage()

  return (
    <div className="flex items-center justify-center min-h-screen" style={{ background: '#fdf6e3' }}>
      <div className="retro-card p-8 max-w-md w-full text-center">
        <div className="text-4xl mb-4" aria-hidden="true">🔐</div>
        <h1
          className="text-2xl font-bold mb-4"
          style={{ color: '#3d2b1f', fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          AlatauPeaks
        </h1>
        <p className="text-sm mb-6" style={{ color: '#6b5a3e', fontFamily: "'Special Elite', Georgia, serif" }}>
          {NOT_READY[lang]}
        </p>
        <button className="retro-button w-full" onClick={() => navigate(redirectAfterAuth)}>
          {CONTINUE[lang]}
        </button>
        <p className="text-xs mt-4" style={{ color: '#6b5a3e', fontFamily: "'Special Elite', Georgia, serif" }}>
          {CONSENT[lang]}{' '}
          <Link to="/privacy" className="underline" style={{ color: '#ad3e1a' }}>
            {t.legalPrivacy}
          </Link>
        </p>
      </div>
    </div>
  )
}
