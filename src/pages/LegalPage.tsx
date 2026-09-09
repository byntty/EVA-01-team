import { Link } from 'react-router-dom'
import { FileText } from 'lucide-react'
import { useLanguage } from '../lib/language'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'

/**
 * Shared trilingual text for the three legal pages.
 * Sections are plain string arrays so they flow through the existing
 * LanguageProvider — no extra translation layer needed.
 */
function legalContent(lang: 'ru' | 'en' | 'kz') {
  if (lang === 'en') {
    return {
      privacy: {
        intro: 'This Privacy Policy explains what information AlatauPeaks collects when you use the site and how it is used.',
        sections: [
          ['What we collect', 'Almost nothing. The site does not require registration, does not ask for your name, e-mail or phone number, and does not send your data to a server. All content is available without an account.'],
          ['Local storage (cookies)', 'We store two things in your browser localStorage: your chosen interface language (RU/EN/KZ) and a daily cache of OpenWeatherMap weather responses for the peaks you view. Both stay on your device and never leave it. You can clear them at any time in your browser settings.'],
          ['Third parties', 'Weather data is requested from OpenWeatherMap (api.openweathermap.org) and map links open maps.me. These services receive your IP address as part of a normal HTTPS request. We use no analytics, no advertising, no social widgets and no other trackers.'],
          ['Business contact', 'The site is maintained by the Nis Climbers hiking community, Almaty, Kazakhstan. Contact (Telegram/phone): +7 705 410 2502.'],
          ['Your rights', 'Since we do not collect personal data, there is nothing to export or delete on our side. Clearing your browser storage removes everything the site has saved.'],
        ],
      },
      cookies: {
        intro: 'This site does not use tracking or advertising cookies. Below is the complete list of what it stores in your browser and why.',
        sections: [
          ['Language preference', 'A single localStorage entry keeps the interface in the language you selected, so you do not have to choose it again on every visit.'],
          ['Weather cache', 'Weather responses from OpenWeatherMap are cached in localStorage for up to 24 hours. This saves API calls and makes the site faster. It contains no personal data — only coordinates and forecast values.'],
          ['No consent banner needed', 'Because we only use this strictly necessary, non-personal storage, no cookie-consent banner is required. If analytics or advertising is ever added, a consent banner will appear first.'],
          ['How to opt out', 'Clear site data for alataupeaks in your browser settings, or browse in private mode. Everything works without stored data — you will simply get the default language and uncached weather.'],
        ],
      },
      terms: {
        intro: 'Welcome to AlatauPeaks. By using the site you agree to these terms. Please read them — mountains are not a theme park.',
        sections: [
          ['Informational purpose only', 'AlatauPeaks is an informational guide to the Zailiysky Alatau. Route descriptions, distances, durations and difficulty ratings are community estimates and may be outdated, incomplete or wrong for your skill level and conditions.'],
          ['You are responsible for your safety', 'Mountain hiking involves real risks: falls, rockfall, weather changes, altitude. Do not rely on this site for navigation or safety decisions. Check current forecasts yourself, tell someone your plan, carry proper equipment and consider going with an experienced group (for example, Nis Climbers).'],
          ['Weather data disclaimer', 'Weather and UV information is provided by OpenWeatherMap and may differ from actual mountain conditions, which can change within minutes.'],
          ['No warranty', 'The site is provided "as is", without warranties of any kind. The maintainers are not liable for any outcomes of using the published information.'],
          ['Third-party links', 'Links to MAPS.ME, FriendHike, Guru Maps, Windy and Telegram lead to independent services with their own terms and privacy policies. We are not responsible for their content.'],
          ['Feedback', 'Found an error in a route description or elevation? Tell us in the Nis Climbers Telegram chat or at +7 705 410 2502 — the community keeps the guide accurate.'],
        ],
      },
    }
  }
  if (lang === 'kz') {
    return {
      privacy: {
        intro: 'Осы Құпиялық саясаты AlatauPeaks сайтын пайдаланған кезде қандай ақпарат жиналатынын және оның қалай қолданылатынын түсіндіреді.',
        sections: [
          ['Не жинаймыз', 'Ештеңе дерлік. Сайт тіркелуді қажет етпейді, атыңызды, электрондық поштаңызды немесе телефон нөіріңізді сұрамайды және деректеріңізді серверге жіберемейді. Барлық мазмұн тіркелгісіз қолжетімді.'],
          ['Локальды сақтау (cookie)', 'Браузерде екі нәрсе сақталады: таңдаған тіліңіз (RU/EN/KZ) және көрген шыңдарыңыз бойынша OpenWeatherMap ауа-райы жауаптарының тәуліктік кэші. Екеуі де құрылғыңызда қалады. Кез келген уақытта браузер параметрлерінен өшіре аласыз.'],
          ['Үшінші тараптар', 'Ауа-райы деректері OpenWeatherMap (api.openweathermap.org) сұранысы арқылы алынады, карта сілтемелері maps.me сайтында ашылады. Қалыпты HTTPS сұранысы барысында бұл қызметтер IP мекенжайыңызды көреді. Біз аналитика, жарнама, әлеуметтік виджеттер немесе басқа трекерлерді қолданамаймыз.'],
          ['Байланыс', 'Сайтты Nis Climbers туристік қауымдастығы (Алматы, Қазақстан) ұстайды. Байланыс (Telegram/телефон): +7 705 410 2502.'],
          ['Құқықтарыңыз', 'Жеке деректерді жинамайтындықтан, бізден экспорттауға немесе өшіруге ештеңе жоқ. Браузер сақтауын тазарту сайт сақтаған барлық нәрсені жояды.'],
        ],
      },
      cookies: {
        intro: 'Бұл сайт бақылау немесе жарнама cookie-лерін қолданбайды. Төменде браузерде сақталатын нәрселердің толық тізімі және олардың мақсаты берілген.',
        sections: [
          ['Тіл параметрі', 'Бір localStorage жазбасы интерфейсті таңдаған тіліңізде ұстайды, әр кіргенде таңдамайсыз.'],
          ['Ауа-райы кэші', 'OpenWeatherMap жауаптары 24 сағатқа дейін localStorage-де кэштеледі. Бұл API сұраныстарын үнемдейді және сайтты жылдамдатады. Онда жеке деректер жоқ — тек координаттар мен болжам мәндері.'],
          ['Келісім баннері қажет емес', 'Біз тек қатаң қажетті, жеке емес сақтауды қолданатындықтан, cookie-келісім баннері қажет емес. Егер аналитика немесе жарнама қосылса, алдымен келісім баннері пайда болады.'],
          ['Қалай өшіруге болады', 'Браузер параметрлерінде сайт деректерін тазартыңыз немесе жеке режимде шолыңыз. Барлығы сақталған дерексіз жұмыс істейді — жай әдепкі тіл мен кэштелмеген ауа-райы болады.'],
        ],
      },
      terms: {
        intro: 'AlatauPeaks-ке қош келдіңіз. Сайтты пайдалану арқылы осы шарттарға келесізіңіз. Оқып шығыңыз — таулар парк емес.',
        sections: [
          ['Тек ақпараттық мақсат', 'AlatauPeaks — Заилийский Алатау бойынша ақпараттық нұсқаулық. Бағыт сипаттамалары, қашықтықтар, ұзақтықтар мен қиындық бағалары — қауымдастық бағалаулары, ескірген, толық емес немесе сіздің дағдыларыңыз бен жағдайға сай емес болуы мүмкін.'],
          ['Қауіпсіздікке өзіңіз жауапсыз', 'Тауға шығу нақты қауіптермен байланысты: құлау, тас көшкіні, ауа-райы өзгеруі, биіктік. Навигация мен қауіпсіздік шешімдері үшін оған сенбеңіз. Өзіңіз болжамды тексеріңіз, жоспарыңызды біреуге айтыңыз, дұрыс жабдық алыңыз және тәжірибелі топпен (мысалы, Nis Climbers) шығуды қарастырыңыз.'],
          ['Ауа-райы туралы ескерту', 'Ауа-райы мен УФ деректерін OpenWeatherMap береді және олар минут ішінде өзгеретін нақты тау жағдайларынан ерекшеленуі мүмкін.'],
          ['Кепілдік жоқ', 'Сайт «қалай бар, солай» беріледі, ешқандай кепілдіксеміз. Қолдаушылар жарияланған ақпаратты қолдану салдарына жауап бермейді.'],
          ['Үшінші тарап сілтемелері', 'MAPS.ME, FriendHike, Guru Maps, Windy және Telegram сілтемелері өз шарттары мен құпиялық саясаты бар тәуелсіз қызметтерге апарады. Олардың мазмұнына жауап бермейміз.'],
          ['Кері байланыс', 'Бағыт сипаттамасында немесе биіктікте қате таптыңыз ба? Nis Climbers Telegram чатында немесе +7 705 410 2502 арқылы айтыңыз — қауымдастық нұсқаулықты дәл ұстайды.'],
        ],
      },
    }
  }
  return {
    privacy: {
      intro: 'Настоящая Политика конфиденциальности объясняет, какую информацию собирает AlatauPeaks при использовании сайта и как она используется.',
      sections: [
        ['Что мы собираем', 'Практически ничего. Сайт не требует регистрации, не спрашивает имя, e-mail или номер телефона и не передаёт ваши данные на сервер. Весь контент доступен без аккаунта.'],
        ['Локальное хранилище (cookie)', 'В браузере хранятся две вещи: выбранный язык интерфейса (RU/EN/KZ) и суточный кэш ответов OpenWeatherMap по просмотренным пикам. Оба остаются на вашем устройстве. Очистить можно в любой момент в настройках браузера.'],
        ['Сторонние сервисы', 'Данные о погоде запрашиваются с OpenWeatherMap (api.openweathermap.org), ссылки на карты открывают maps.me. При обычном HTTPS-запросе эти сервисы видят ваш IP-адрес. Мы не используем аналитику, рекламу, соцвиджеты и другие трекеры.'],
        ['Контакты', 'Сайт поддерживает туристическое сообщество Nis Climbers (Алматы, Казахстан). Связь (Telegram/телефон): +7 705 410 2502.'],
        ['Ваши права', 'Поскольку персональные данные не собираются, нам нечего удалять или выгружать. Очистка хранилища браузера удаляет всё, что сохранил сайт.'],
      ],
    },
    cookies: {
      intro: 'Сайт не использует отслеживающие и рекламные cookie. Ниже — полный список того, что хранится в вашем браузере и зачем.',
      sections: [
        ['Языковые настройки', 'Одна запись в localStorage сохраняет выбранный язык интерфейса, чтобы не выбирать его при каждом визите.'],
        ['Кэш погоды', 'Ответы OpenWeatherMap кэшируются в localStorage до 24 часов. Это экономит API-запросы и ускоряет сайт. Персональных данных нет — только координаты и значения прогноза.'],
        ['Баннер согласия не требуется', 'Поскольку используется только строго необходимое неперсональное хранилище, баннер согласия на cookie не требуется. Если когда-нибудь добавится аналитика или реклама, сначала появится баннер согласия.'],
        ['Как отключить', 'Очистите данные сайта в настройках браузера или используйте режим инкогнито. Всё работает и без сохранённых данных — будет просто язык по умолчанию и некэшированная погода.'],
      ],
    },
    terms: {
      intro: 'Добро пожаловать в AlatauPeaks. Используя сайт, вы соглашаетесь с этими условиями. Прочитайте их — горы не парк аттракционов.',
      sections: [
        ['Только информационная цель', 'AlatauPeaks — информационный путеводитель по Заилийскому Алатау. Описания маршрутов, расстояния, длительности и оценки сложности являются оценками сообщества и могут быть устаревшими, неполными или неподходящими для вашего опыта и условий.'],
        ['Ответственность за безопасность — на вас', 'Горные походы связаны с реальными рисками: падения, камнепады, смена погоды, высота. Не полагайтесь на сайт для навигации и решений о безопасности. Проверяйте актуальный прогноз, сообщайте кому-то о плане, берите подходящее снаряжение и рассмотрите выход с опытной группой (например, Nis Climbers).'],
        ['Отказ от ответственности по погоде', 'Данные о погоде и УФ предоставляет OpenWeatherMap; они могут отличаться от реальных условий в горах, которые меняются за минуты.'],
        ['Без гарантий', 'Сайт предоставляется «как есть», без гарантий любого рода. Поддерживающие не несут ответственности за последствия использования опубликованной информации.'],
        ['Ссылки на сторонние сервисы', 'Ссылки на MAPS.ME, FriendHike, Guru Maps, Windy и Telegram ведут на независимые сервисы со своими условиями и политиками конфиденциальности. Мы не отвечаем за их содержимое.'],
        ['Обратная связь', 'Нашли ошибку в описании маршрута или высоте? Напишите в Telegram-чат Nis Climbers или на +7 705 410 2502 — сообщество поддерживает точность путеводителя.'],
      ],
    },
  }
}

type LegalKind = 'privacy' | 'cookies' | 'terms'

export default function LegalPage({ kind }: { kind: LegalKind }) {
  const { lang, t } = useLanguage()
  const content = legalContent(lang)

  const titles = { privacy: t.privacyTitle, cookies: t.cookiesTitle, terms: t.termsTitle } as const
  const updated = { privacy: t.privacyUpdated, cookies: t.cookiesUpdated, terms: t.termsUpdated } as const
  const sections = content[kind].sections

  return (
    <div className="min-h-screen" style={{ background: '#fdf6e3' }}>
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 pt-28 pb-16">
        <div className="retro-card p-6 md:p-10">
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-10 h-10 flex items-center justify-center shrink-0"
              style={{
                background: '#c44d2c',
                border: '2px solid #3d2b1f',
                borderRadius: '4px',
                boxShadow: '2px 2px 0px #3d2b1f',
              }}
            >
              <FileText className="w-5 h-5" style={{ color: '#fdf6e3' }} />
            </div>
            <h1
              className="text-2xl md:text-3xl font-bold"
              style={{ color: '#3d2b1f', fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              {titles[kind]}
            </h1>
          </div>
          <p className="text-xs mb-2" style={{ color: '#6b5a3e', fontFamily: "'Special Elite', Georgia, serif" }}>
            {updated[kind]}
          </p>
          <p className="text-sm mb-6" style={{ color: '#3d2b1f' }}>
            {content[kind].intro}
          </p>

          <div className="retro-divider mb-6">✦</div>

          <div className="space-y-5">
            {sections.map(([heading, body]) => (
              <section key={heading}>
                <h2
                  className="text-xs font-bold uppercase tracking-wider mb-2"
                  style={{
                    color: '#ad3e1a',
                    fontFamily: "'Special Elite', Georgia, serif",
                    letterSpacing: '0.12em',
                    borderBottom: '2px solid #c44d2c',
                    paddingBottom: '4px',
                    display: 'inline-block',
                  }}
                >
                  {heading}
                </h2>
                <p className="text-sm" style={{ color: '#3d2b1f', lineHeight: 1.6 }}>
                  {body}
                </p>
              </section>
            ))}
          </div>

          <div className="retro-divider mt-8 mb-6">✦</div>

          <Link
            to="/"
            className="inline-flex items-center gap-1 text-sm no-underline"
            style={{ color: '#6b5a3e' }}
          >
            ← {t.backToCatalog}
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  )
}
