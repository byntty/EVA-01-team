import { createContext, useContext, useState, type ReactNode } from 'react'

export type Lang = 'ru' | 'en' | 'kz'

interface Translations {
  // Nav
  searchPlaceholder: string
  catalog: string
  weather: string
  equipment: string
  safety: string

  // Map
  mapTitle: string
  mapHint: string
  routesCount: (n: number) => string

  // Categories
  categoryEasy: string
  categoryMedium: string
  categoryHard: string
  categoryExtreme: string

  // Peak detail
  backToCatalog: string
  route: string
  distance: string
  elevationGain: string
  duration: string
  difficulty: string
  viewOnMapsMe: string
  appsTitle: string
  appFriendHike: string
  appGuruMaps: string
  appMapsMe: string
  appWindy: string

  // Difficulty levels
  level1: string
  level2: string
  level3: string
  level4: string

  // Weather
  weatherTitle: string
  weatherSubtitle: string
  temperature: string
  feelsLike: string
  humidity: string
  wind: string
  uvIndex: string
  uvLow: string
  uvModerate: string
  uvHigh: string
  uvVeryHigh: string
  uvExtreme: string
  precipitationChance: string
  windDirection: string
  tempMax: string
  tempMin: string
  hourlyForecast: string
  showDetails: string
  hideDetails: string
  night: string
  morning: string
  day: string
  evening: string

  // Equipment
  equipmentTitle: string
  essential: string

  // Safety
  safetyTitle: string
  rules: string
  emergencyContacts: string
  tips: string

  // Footer
  footerText: string
  madeWith: string

  // Weather extras
  bestHikingDay: string

  // Photos
  photosTitle: string
  photosAttribution: string
  photosEmpty: string
  signPhotoEmpty: string

  // Route selector
  routeInfo: string
  terrain: string
  highlights: string

  // Map upload
  replaceMap: string
  resetMap: string

  // 404
  notFoundTitle: string
  notFoundBack: string

  // Catalog page
  catalogPeaks: string
  catalogTraverses: string
  catalogMountains: string
  catalogNoItems: string
  catalogElevation: string

  // Legal pages
  privacyTitle: string
  privacyUpdated: string
  cookiesTitle: string
  cookiesUpdated: string
  termsTitle: string
  termsUpdated: string
  legalPrivacy: string
  legalCookies: string
  legalTerms: string
  consentText: string
  consentAccept: string
  inDevelopmentTitle: string
  inDevelopmentText: string
  chainPeaks: string
  signPhotoTitle: string
  precipWarning: string
  consentDecline: string
  consentReadMore: string
}

const ru: Translations = {
  searchPlaceholder: 'Поиск пиков...',
  catalog: 'Каталог',
  weather: 'Погода',
  equipment: 'Снаряжение',
  safety: 'Безопасность',

  mapTitle: 'Заилийский Алатау · Интерактивная карта',
  mapHint: 'Нажмите на маркер для просмотра',
  routesCount: (n: number) => {
    if (n === 1) return '1 маршрут'
    if (n >= 2 && n <= 4) return `${n} маршрута`
    return `${n} маршрутов`
  },

  categoryEasy: 'Лёгкий',
  categoryMedium: 'Средний',
  categoryHard: 'Сложный',
  categoryExtreme: 'Очень сложный',

  backToCatalog: 'Каталог',
  route: 'Маршрут',
  distance: 'Расстояние',
  elevationGain: 'Набор высоты',
  duration: 'Длительность',
  difficulty: 'Сложность',
  viewOnMapsMe: 'Открыть маршрут в MAPS.ME',
  appsTitle: 'Приложения-путеводители',
  appFriendHike: 'FriendHike — маршруты, высоты и отчёты с гор',
  appGuruMaps: 'Guru Maps — офлайн-карты и GPS-треки',
  appMapsMe: 'MAPS.ME — офлайн-навигация по тропам',
  appWindy: 'Windy — детальный прогноз погоды и ветра',

  level1: 'Лёгкий',
  level2: 'Средний',
  level3: 'Сложный',
  level4: 'Очень сложный',

  weatherTitle: 'Погода',
  weatherSubtitle: 'Ожидаемые условия',
  temperature: 'Температура',
  feelsLike: 'Ощущается',
  humidity: 'Влажность',
  wind: 'Ветер',
  uvIndex: 'УФ-индекс',
  uvLow: 'Низкий',
  uvModerate: 'Умеренный',
  uvHigh: 'Высокий',
  uvVeryHigh: 'Очень высокий',
  uvExtreme: 'Экстремальный',
  precipitationChance: 'Вероятность осадков',
  windDirection: 'Направление',
  tempMax: 'Макс.',
  tempMin: 'Мин.',
  hourlyForecast: 'Почасовой прогноз',
  showDetails: 'Подробный прогноз',
  hideDetails: 'Свернуть',
  night: 'Ночь',
  morning: 'Утро',
  day: 'День',
  evening: 'Вечер',

  equipmentTitle: 'Снаряжение',
  essential: 'Обязательно',

  safetyTitle: 'Безопасность',
  rules: 'Правила',
  emergencyContacts: 'Экстренные контакты',
  tips: 'Советы',

  footerText: 'AlatauPeaks — Путеводитель по Заилийскому Алатау',
  madeWith: 'Сделано с любовью к горам',

  bestHikingDay: 'Лучший день для похода',

  photosTitle: 'Фотографии с маршрута',
  photosAttribution: 'Фото: сообщество Nis Climbers',
  photosEmpty: 'Здесь пока нет фотографий. Хотите добавить фото — напишите нам в Telegram (ссылка внизу страницы).',
  signPhotoEmpty: 'Фотография таблички вершины скоро появится. Хотите помочь — напишите нам в Telegram (ссылка внизу страницы).',

  routeInfo: 'О маршруте',
  terrain: 'Рельеф',
  highlights: 'Особенности',

  notFoundTitle: 'Маршрут не найден',
  replaceMap: 'Заменить фото',
  resetMap: 'Удалить фото',
  notFoundBack: 'На главную',

  catalogPeaks: 'Пики',
  catalogTraverses: 'Траверсы',
  catalogMountains: 'Горы',
  catalogNoItems: 'Пока нет маршрутов в этой категории',
  catalogElevation: 'Высота',

  privacyTitle: 'Политика конфиденциальности',
  privacyUpdated: 'Последнее обновление: 9 сентября 2026 г.',
  cookiesTitle: 'Политика использования файлов cookie',
  cookiesUpdated: 'Последнее обновление: 9 сентября 2026 г.',
  termsTitle: 'Условия использования',
  termsUpdated: 'Последнее обновление: 9 сентября 2026 г.',
  legalPrivacy: 'Конфиденциальность',
  legalCookies: 'Cookie',
  legalTerms: 'Условия',
  consentText: 'Мы храним только ваш выбранный язык и суточный кэш погоды в вашем браузере — без аналитики и трекеров.',
  consentAccept: 'Понятно',
  consentDecline: 'Отключить',
  inDevelopmentTitle: 'Страница в разработке',
  inDevelopmentText: 'Раздел для этого пика ещё готовится. Вся информация появится здесь в ближайшее время.',
  chainPeaks: 'Пики маршрута',
  signPhotoTitle: 'Табличка вершины',
  precipWarning: 'Если индекс осадков превышает значения в 0.2 мм, то лучше отложить поход',
  consentReadMore: 'Подробнее',
}

const en: Translations = {
  searchPlaceholder: 'Search peaks...',
  catalog: 'Catalog',
  weather: 'Weather',
  equipment: 'Equipment',
  safety: 'Safety',

  mapTitle: 'Zailiysky Alatau · Interactive Map',
  mapHint: 'Click a marker to view details',
  routesCount: (n: number) => {
    if (n === 1) return '1 route'
    return `${n} routes`
  },

  categoryEasy: 'Easy',
  categoryMedium: 'Medium',
  categoryHard: 'Hard',
  categoryExtreme: 'Extreme',

  backToCatalog: 'Catalog',
  route: 'Route',
  distance: 'Distance',
  elevationGain: 'Elevation Gain',
  duration: 'Duration',
  difficulty: 'Difficulty',
  viewOnMapsMe: 'View route in MAPS.ME',
  appsTitle: 'Guide apps',
  appFriendHike: 'FriendHike — routes, elevations and trip reports',
  appGuruMaps: 'Guru Maps — offline maps and GPS tracks',
  appMapsMe: 'MAPS.ME — offline trail navigation',
  appWindy: 'Windy — detailed weather and wind forecast',

  level1: 'Easy',
  level2: 'Medium',
  level3: 'Hard',
  level4: 'Extreme',

  weatherTitle: 'Weather',
  weatherSubtitle: 'Expected Conditions',
  temperature: 'Temperature',
  feelsLike: 'Feels Like',
  humidity: 'Humidity',
  uvIndex: 'UV Index',
  uvLow: 'Low',
  uvModerate: 'Moderate',
  uvHigh: 'High',
  uvVeryHigh: 'Very High',
  uvExtreme: 'Extreme',
  precipitationChance: 'Chance of precipitation',
  wind: 'Wind',
  windDirection: 'Direction',
  tempMax: 'Max',
  tempMin: 'Min',
  hourlyForecast: 'Hourly Forecast',
  showDetails: 'Show Details...',
  hideDetails: 'Hide',
  night: 'Night',
  morning: 'Morning',
  day: 'Day',
  evening: 'Evening',

  equipmentTitle: 'Equipment',
  essential: 'Essential',

  safetyTitle: 'Safety',
  rules: 'Rules',
  emergencyContacts: 'Emergency Contacts',
  tips: 'Tips',

  footerText: 'AlatauPeaks — Guide to Zailiysky Alatau',
  madeWith: 'Made with love for mountains',

  bestHikingDay: 'Best Day for Hiking',

  photosTitle: 'Route Photos',
  photosAttribution: 'Photos: Nis Climbers community',
  photosEmpty: '"No photos here yet. If you want to add photos contact us in Telegram" (link in the footer).',
  signPhotoEmpty: 'Summit sign photo coming soon. Want to help? Contact us in Telegram (link in the footer).',

  routeInfo: 'Route Info',
  terrain: 'Terrain',
  highlights: 'Highlights',

  notFoundTitle: 'Route not found',
  replaceMap: 'Replace photo',
  resetMap: 'Remove photo',
  notFoundBack: 'Home',

  catalogPeaks: 'Peaks',
  catalogTraverses: 'Traverses',
  catalogMountains: 'Mountains',
  catalogNoItems: 'No routes in this category yet',
  catalogElevation: 'Elevation',

  privacyTitle: 'Privacy Policy',
  privacyUpdated: 'Last updated: September 9, 2026',
  cookiesTitle: 'Cookies Policy',
  cookiesUpdated: 'Last updated: September 9, 2026',
  termsTitle: 'Terms & Conditions',
  termsUpdated: 'Last updated: September 9, 2026',
  legalPrivacy: 'Privacy',
  legalCookies: 'Cookies',
  legalTerms: 'Terms',
  consentText: 'We store only your chosen language and a daily weather cache in your browser — no analytics, no trackers.',
  consentAccept: 'Got it',
  consentDecline: 'Disable',
  inDevelopmentTitle: 'Page under development',
  inDevelopmentText: 'The section for this peak is on its way. All the details will appear here soon.',
  chainPeaks: 'Route peaks',
  signPhotoTitle: 'Summit sign photo',
  precipWarning: 'If the precipitation index exceeds 0.2 mm, it is better to postpone the hike',
  consentReadMore: 'Learn more',
}

const kz: Translations = {
  searchPlaceholder: 'Шыңдарды іздеу...',
  catalog: 'Каталог',
  weather: 'Ауа-райы',
  equipment: 'Жабдық',
  safety: 'Қауіпсіздік',

  mapTitle: 'Заилийский Алатау · Интерактивті карта',
  mapHint: 'Маркерді басып көру үшін',
  routesCount: (n: number) => {
    if (n === 1) return '1 бағыт'
    return `${n} бағыт`
  },

  categoryEasy: 'Оңай',
  categoryMedium: 'Орташа',
  categoryHard: 'Қиын',
  categoryExtreme: 'Өте қиын',

  backToCatalog: 'Каталог',
  route: 'Бағыт',
  distance: 'Қашықтық',
  elevationGain: 'Биіктік өсу',
  duration: 'Ұзақтық',
  difficulty: 'Қиындық',
  viewOnMapsMe: 'Бағытты MAPS.ME-де көру',
  appsTitle: 'Навигация қосымшалары',
  appFriendHike: 'FriendHike — бағыттар, биіктіктер және әңгімелер',
  appGuruMaps: 'Guru Maps — офлайн карталар және GPS тректері',
  appMapsMe: 'MAPS.ME — жолдар бойынша офлайн навигация',
  appWindy: 'Windy — ауа райы мен желдің егжей-тегжейлі болжамы',

  level1: 'Оңай',
  level2: 'Орташа',
  level3: 'Қиын',
  level4: 'Өте қиын',

  weatherTitle: 'Ауа-райы',
  weatherSubtitle: 'Күтілетін жағдайлар',
  temperature: 'Температура',
  feelsLike: 'Сезіледі',
  humidity: 'Ылғалдылық',
  uvIndex: 'УФ индексі',
  uvLow: 'Төмен',
  uvModerate: 'Орташа',
  uvHigh: 'Жоғары',
  uvVeryHigh: 'Өте жоғары',
  uvExtreme: 'Аса жоғары',
  precipitationChance: 'Жауын-шашын ықтималдығы',
  wind: 'Жел',
  windDirection: 'Бағыт',
  tempMax: 'Макс.',
  tempMin: 'Мин.',
  hourlyForecast: 'Сағаттық болжам',
  showDetails: 'Толығырақ...',
  hideDetails: 'Жасыру',
  night: 'Түн',
  morning: 'Таң',
  day: 'Күн',
  evening: 'Кеш',

  equipmentTitle: 'Жабдық',
  essential: 'Міндетті',

  safetyTitle: 'Қауіпсіздік',
  rules: 'Ережелер',
  emergencyContacts: 'Төтенше байланыс',
  tips: 'Кеңестер',

  footerText: 'AlatauPeaks — Заилийский Алатау бойынша жетекші',
  madeWith: 'Тауларға деген махаббатпен жасалды',

  bestHikingDay: 'Серуенге ең жақсы күн',

  photosTitle: 'Бағыттағы фотосуреттер',
  photosAttribution: 'Фото: Nis Climbers қауымдастығы',
  photosEmpty: 'Мұнда әзірге фотосуреттер жоқ. Фото қосқыңыз келсе — Telegram-ға жазыңыз (сілтеме беттің төменгі жағында).',
  signPhotoEmpty: 'Шың тақтасының фотосы жақында пайда болады. Көмектескіңіз келсе — Telegram-ға жазыңыз (сілтеме беттің төменгі жағында).',
  routeInfo: 'Бағыт туралы',
  terrain: 'Жер бедері',
  highlights: 'Ерекшеліктер',

  notFoundTitle: 'Бағыт табылмады',
  replaceMap: 'Фотоны ауыстыру',
  resetMap: 'Фотоны өшіру',
  notFoundBack: 'Басты бет',

  catalogPeaks: 'Шыңдар',
  catalogTraverses: 'Траверстер',
  catalogMountains: 'Таулар',
  catalogNoItems: 'Бұл категорияда әлі бағыттар жоқ',
  catalogElevation: 'Биіктік',

  privacyTitle: 'Құпиялық саясаты',
  privacyUpdated: 'Соңғы жаңарту: 2026 ж. 9 қыркүйек',
  cookiesTitle: 'Cookie саясаты',
  cookiesUpdated: 'Соңғы жаңарту: 2026 ж. 9 қыркүйек',
  termsTitle: 'Қолдану шарттары',
  termsUpdated: 'Соңғы жаңарту: 2026 ж. 9 қыркүйек',
  legalPrivacy: 'Құпиялық',
  legalCookies: 'Cookie',
  legalTerms: 'Шарттар',
  consentText: 'Біз тек таңдаған тіліңіз бен тәуліктік ауа-райы кэшін браузеріңізде сақтаймыз — аналитика мен трекерлер жоқ.',
  consentAccept: 'Түсіндім',
  consentDecline: 'Өшіру',
  inDevelopmentTitle: 'Бет әзірленуде',
  inDevelopmentText: 'Бұл шыңға арналған бөлім әзірленуде. Барлық ақпарат жақын арада осында пайда болады.',
  chainPeaks: 'Бағыт шыңдары',
  signPhotoTitle: 'Шың тақтасының фотосы',
  precipWarning: 'Жауын-шашын индексі 0.2 мм-ден асса, жорықты кейінге қалдырған дұрыс',
  consentReadMore: 'Толығырақ',
}

const translations: Record<Lang, Translations> = { ru, en, kz }

interface LanguageContextValue {
  lang: Lang
  setLang: (lang: Lang) => void
  t: Translations
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: 'ru',
  setLang: () => {},
  t: ru,
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Persist the choice; default stays 'ru'
  const [lang, setLangState] = useState<Lang>(() => {
    try {
      const saved = localStorage.getItem('alataupeaks-lang')
      if (saved === 'ru' || saved === 'en' || saved === 'kz') return saved
    } catch {
      // storage unavailable — default
    }
    return 'ru'
  })

  const setLang = (l: Lang) => {
    setLangState(l)
    try {
      localStorage.setItem('alataupeaks-lang', l)
    } catch {
      // storage unavailable — keep in-memory only
    }
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
