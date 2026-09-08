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
  friendHike: string
  appsTitle: string
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

  // Route selector
  routeInfo: string
  terrain: string
  highlights: string

  // Map upload
  uploadMapPhoto: string
  uploadMapHint: string
  uploadMapButton: string
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
  friendHike: 'FriendHike',
  appsTitle: 'Приложения-путеводители',
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

  routeInfo: 'О маршруте',
  terrain: 'Рельеф',
  highlights: 'Особенности',

  notFoundTitle: 'Маршрут не найден',
  uploadMapPhoto: 'Загрузить фото карты',
  uploadMapHint: 'Загрузите фотографию горной карты, которая заменит текущую SVG-карту',
  uploadMapButton: 'Выбрать файл',
  replaceMap: 'Заменить фото',
  resetMap: 'Удалить фото',
  notFoundBack: 'На главную',

  catalogPeaks: 'Пики',
  catalogTraverses: 'Траверсы',
  catalogMountains: 'Горы',
  catalogNoItems: 'Пока нет маршрутов в этой категории',
  catalogElevation: 'Высота',
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
  friendHike: 'FriendHike',
  appsTitle: 'Guide apps',
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

  routeInfo: 'Route Info',
  terrain: 'Terrain',
  highlights: 'Highlights',

  notFoundTitle: 'Route not found',
  uploadMapPhoto: 'Upload Map Photo',
  uploadMapHint: 'Upload a mountain map photo to replace the current SVG map',
  uploadMapButton: 'Choose file',
  replaceMap: 'Replace photo',
  resetMap: 'Remove photo',
  notFoundBack: 'Home',

  catalogPeaks: 'Peaks',
  catalogTraverses: 'Traverses',
  catalogMountains: 'Mountains',
  catalogNoItems: 'No routes in this category yet',
  catalogElevation: 'Elevation',
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
  friendHike: 'FriendHike',
  appsTitle: 'Навигация қосымшалары',
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

  routeInfo: 'Бағыт туралы',
  terrain: 'Жер бедері',
  highlights: 'Ерекшеліктер',

  notFoundTitle: 'Бағыт табылмады',
  uploadMapPhoto: 'Карта фотоны жүктеу',
  uploadMapHint: 'SVG картаны ауыстыру үшін тау картасының фотосын жүктеңіз',
  uploadMapButton: 'Файлды таңдаңыз',
  replaceMap: 'Фотоны ауыстыру',
  resetMap: 'Фотоны өшіру',
  notFoundBack: 'Басты бет',

  catalogPeaks: 'Шыңдар',
  catalogTraverses: 'Траверстер',
  catalogMountains: 'Таулар',
  catalogNoItems: 'Бұл категорияда әлі бағыттар жоқ',
  catalogElevation: 'Биіктік',
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
  const [lang, setLang] = useState<Lang>('ru')

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
