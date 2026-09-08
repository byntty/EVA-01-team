export interface RouteHighlight {
  text: string
}

export interface Route {
  name: string
  duration: string
  distance: string
  elevationGain: string
  difficulty: string
  terrain: string
  description: string
  highlights: string[]
  friendHikeUrl: string
  guruMapsFile?: string
}

export interface EquipmentItem {
  name: string
  essential: boolean
  note?: string
}

export interface EquipmentCategory {
  category: string
  items: EquipmentItem[]
}

export interface WeatherCondition {
  temp: number
  feelsLike: number
  humidity: number
  windSpeed: number
  windDirection: string
  tempMax: number
  tempMin: number
  description: string
  icon: string
}

export interface WeatherForecastItem {
  time: string
  temp: number
  icon: string
}

export interface HourlyForecastItem {
  hour: string
  temp: number
  icon: string
  humidity: number
  wind: number
}

export interface EmergencyContact {
  label: string
  number: string
}

export interface Safety {
  rules: string[]
  emergencyContacts: EmergencyContact[]
  tips: string[]
}

export interface RouteStats {
  distance: string
  elevationGain: string
  duration: string
}

export type PeakCategory = "peak" | "traverse" | "mountain"

export interface Peak {
  id: string
  name: string
  nameKz: string
  nameEn: string
  elevation: number
  coordinates: { lat: number; lng: number }
  mapPosition: { top: string; left: string }
  difficulty: string
  difficultyLevel: 1 | 2 | 3 | 4
  description: string
  routeStats: RouteStats
  weather: WeatherCondition
  weatherForecast: WeatherForecastItem[]
  hourlyForecast: HourlyForecastItem[]
  routes: Route[]
  equipment: EquipmentCategory[]
  safety: Safety
  photos: string[]
  category: PeakCategory
}

export function getPeakById(id: string): Peak | undefined {
  return peaksData.find((p) => p.id === id)
}

export function searchPeaks(query: string): Peak[] {
  const q = query.toLowerCase().trim()
  if (!q) return []
  return peaksData.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.nameKz.toLowerCase().includes(q) ||
      p.nameEn.toLowerCase().includes(q)
  )
}

export const peaksData: Peak[] = [
  {
    id: 'khreshchatyj',
    name: 'Пик Хрещатий',
    nameKz: 'Хрещатий шыңы',
    nameEn: 'Khreshchaty Peak',
    elevation: 4308,
    coordinates: { lat: 43.0950, lng: 77.0650 },
    mapPosition: { top: '28%', left: '42%' },
    difficulty: 'Средний',
    difficultyLevel: 2,
    description:
      'Один из самых красивых пиков Заилийского Алатау, расположенный в верховьях реки Хрещатик. Маршрут проходит через живописные альпийские луга и каменистые осыпи с потрясающими видами на окрестные горы и ледники.',
    routeStats: {
      distance: '18 км',
      elevationGain: '1600 м',
      duration: '14 ч',
    },
    weather: {
      temp: -2,
      feelsLike: -7,
      humidity: 65,
      windSpeed: 15,
      windDirection: 'СЗ',
      tempMax: 3,
      tempMin: -8,
      description: 'Облачно, местами снег',
      icon: '🌨️',
    },
    weatherForecast: [
      { time: 'Ночь', temp: -6, icon: '🌙' },
      { time: 'Утро', temp: -2, icon: '⛅' },
      { time: 'День', temp: 3, icon: '☀️' },
      { time: 'Вечер', temp: -1, icon: '🌤️' },
    ],
    hourlyForecast: [
      { hour: '00:00', temp: -6, icon: '🌙', humidity: 70, wind: 12 },
      { hour: '03:00', temp: -7, icon: '🌙', humidity: 72, wind: 10 },
      { hour: '06:00', temp: -4, icon: '🌅', humidity: 68, wind: 11 },
      { hour: '09:00', temp: -1, icon: '⛅', humidity: 63, wind: 14 },
      { hour: '12:00', temp: 3, icon: '☀️', humidity: 55, wind: 18 },
      { hour: '15:00', temp: 2, icon: '⛅', humidity: 58, wind: 16 },
      { hour: '18:00', temp: -1, icon: '🌤️', humidity: 62, wind: 13 },
      { hour: '21:00', temp: -4, icon: '🌙', humidity: 67, wind: 11 },
    ],
    routes: [
      {
        name: 'Южный маршрут',
        duration: '14 ч',
        distance: '18 км',
        elevationGain: '1600 м',
        difficulty: 'Средний',
        terrain: 'Тропа → каменистая осыпь → скалы',
        description:
          'Классический маршрут от приюта до вершины. Проходит через альпийские луга, пересекает реку Хрещатик и поднимается по восточному гребню.',
        highlights: [
          'Вид на ледник Хрещатик',
          'Альпийские луга до 3200 м',
          'Восхождение по гребню',
        ],
        friendHikeUrl: 'https://friendhike.com/mountains/kazakhstan/pik-valeriya-hrishchatogo/',
        guruMapsFile: '/guru/khreshchatyj-south.guru',
      },
      {
        name: 'Северный маршрут',
        duration: '16 ч',
        distance: '20 км',
        elevationGain: '1750 м',
        difficulty: 'Средний+',
        terrain: 'Тропа → камни → снежные поля',
        description:
          'Более техничный маршрут с северной стороны. Включает прохождение по ледниковому полю и скальному участку перед вершиной.',
        highlights: [
          'Вид на северную стену',
          'Ледниковое поле',
          'Скальный участок IV категории',
        ],
        friendHikeUrl: 'https://friendhike.com/mountains/kazakhstan/pik-valeriya-hrishchatogo/',
      },
    ],
    equipment: [
      {
        category: 'Одежда',
        items: [
          { name: 'Мембранная куртка', essential: true },
          { name: 'Тёплая куртка (пуховик)', essential: true },
          { name: 'Трекинговые штаны', essential: true },
          { name: 'Термобельё', essential: true, note: 'Синтетика или шерсть' },
          { name: 'Шапка и перчатки', essential: true },
          { name: 'Балаклава', essential: false, note: 'Для ветреной погоды' },
          { name: 'Гетры', essential: true },
        ],
      },
      {
        category: 'Обувь',
        items: [
          { name: 'Трекинговые ботинки', essential: true, note: 'Жёсткая подошва' },
          { name: 'Тrekking poles', essential: true },
          { name: 'Колодки (кроссовки)', essential: false, note: 'Для подхода' },
        ],
      },
      {
        category: 'Навигация',
        items: [
          { name: 'GPS-навигатор', essential: true },
          { name: 'Компас', essential: true },
          { name: 'Топографическая карта', essential: true },
          { name: 'Power bank', essential: true },
        ],
      },
      {
        category: 'Питание',
        items: [
          { name: 'Вода (2-3 л)', essential: true },
          { name: 'Энергетические батончики', essential: true },
          { name: 'Термос с горячим напитком', essential: true },
          { name: 'Сухой паёк', essential: true },
        ],
      },
      {
        category: 'Безопасность',
        items: [
          { name: 'Аптечка первой помощи', essential: true },
          { name: 'Солнцезащитный крем SPF 50', essential: true },
          { name: 'Альпинистская каска', essential: true, note: 'Для скальных участков' },
          { name: 'Страховочная система', essential: false, note: 'Для опытных' },
        ],
      },
    ],
    safety: {
      rules: [
        'Не отправляйтесь в горы один — группа минимум 3 человека',
        'Зарегистрируйтесь в спасательной службе перед выходом',
        'Следите за прогнозом погоды — штормы возникают быстро',
        'Всегда берите запасное время — не планируйте спуск на закат',
        'Не приближайтесь к краю ледника без опыта',
      ],
      emergencyContacts: [
        { label: 'МЧС Казахстана', number: '112' },
        { label: 'Служба спасения Алматы', number: '+7-727-250-39-39' },
        { label: 'Горная служба спасения', number: '+7-727-272-25-45' },
        { label: 'Полиция', number: '102' },
      ],
      tips: [
        'Начинайте маршрут рано утром (5:00-6:00), чтобы избежать afternoon storms',
        'При первых признаках ухудшения погоды — спускайтесь',
        'Соблюдайте правило разворота — не позже 14:00',
        'Носите свисток для экстренной сигнализации',
      ],
    },
      category: 'peak',
    photos: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=800&h=500&fit=crop',
    ],
  },
  {
    id: 'turist',
    name: 'Пик Туристов',
    nameKz: 'Туристер шыңы',
    nameEn: 'Pik Turistov',
    elevation: 3974,
    coordinates: { lat: 43.0800, lng: 77.0500 },
    mapPosition: { top: '32%', left: '30%' },
    difficulty: 'Средний',
    difficultyLevel: 2,
    description:
      'Идеальный пик для первого высотного маршрута. Хорошая тропа, красивые виды и относительно простой подъём делают его популярным среди начинающих туристов.',
    routeStats: {
      distance: '12 км',
      elevationGain: '900 м',
      duration: '6 ч',
    },
    weather: {
      temp: 2,
      feelsLike: -2,
      humidity: 55,
      windSpeed: 10,
      windDirection: 'З',
      tempMax: 7,
      tempMin: -3,
      description: 'Ясно',
      icon: '☀️',
    },
    weatherForecast: [
      { time: 'Ночь', temp: -2, icon: '🌙' },
      { time: 'Утро', temp: 2, icon: '☀️' },
      { time: 'День', temp: 7, icon: '☀️' },
      { time: 'Вечер', temp: 3, icon: '🌤️' },
    ],
    hourlyForecast: [
      { hour: '00:00', temp: -2, icon: '🌙', humidity: 58, wind: 8 },
      { hour: '03:00', temp: -3, icon: '🌙', humidity: 60, wind: 7 },
      { hour: '06:00', temp: 0, icon: '🌅', humidity: 55, wind: 8 },
      { hour: '09:00', temp: 4, icon: '☀️', humidity: 48, wind: 10 },
      { hour: '12:00', temp: 7, icon: '☀️', humidity: 42, wind: 12 },
      { hour: '15:00', temp: 6, icon: '☀️', humidity: 44, wind: 11 },
      { hour: '18:00', temp: 3, icon: '🌤️', humidity: 50, wind: 9 },
      { hour: '21:00', temp: 1, icon: '🌙', humidity: 54, wind: 8 },
    ],
    routes: [
      {
        name: 'Тропа туриста',
        duration: '6 ч',
        distance: '12 км',
        elevationGain: '900 м',
        difficulty: 'Средний',
        terrain: 'Хорошая тропа → каменистый участок',
        description:
          'Простой маршрут для начинающих. Чёткая тропа от стоянки до вершины с небольшим каменистым участком в финале.',
        highlights: [
          'Панорамный вид с вершины',
          'Альпийские луга',
          'Доступен для семейного отдыха',
        ],
        friendHikeUrl: 'https://friendhike.com/mountains/kazakhstan/pik-turist/',
        guruMapsFile: '/guru/turistov-trail.guru',
      },
    ],
    equipment: [
      {
        category: 'Одежда',
        items: [
          { name: 'Ветровка', essential: true },
          { name: 'Флиска', essential: true },
          { name: 'Удобные штаны', essential: true },
        ],
      },
      {
        category: 'Обувь',
        items: [
          { name: 'Трекинговые кроссовки', essential: true },
        ],
      },
      {
        category: 'Питание',
        items: [
          { name: 'Вода (1.5 л)', essential: true },
          { name: 'Перекусы', essential: true },
        ],
      },
      {
        category: 'Безопасность',
        items: [
          { name: 'Солнцезащитный крем', essential: true },
          { name: 'Аптечка', essential: false },
        ],
      },
    ],
    safety: {
      rules: [
        'Не ходите один',
        'Берите достаточно воды',
        'Следите за погодой',
      ],
      emergencyContacts: [
        { label: 'МЧС', number: '112' },
      ],
      tips: [
        'Отличный маршрут для первого опыта',
        'Начинайте до 9:00 утра',
        'Вернитесь до 16:00',
      ],
    },
      category: 'peak',
    photos: [
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&h=500&fit=crop',
    ],
  },
{
    id: 'Kumbel',
    name: 'Пик Кумбель',
    nameKz: 'Құмбел шыңы',
    nameEn: 'Peak Kumbel',
    elevation: 4482,
    coordinates: { lat: 43.1222, lng: 77.0269 },
    mapPosition: { top: '22%', left: '82%' },
    difficulty: 'Лёгкий',
    difficultyLevel: 1,
    description:
      'Один из самых высоких и технически сложных пиков Заилийского Алатау. Требует серьёзной альпинистской подготовки, хорошей акклиматизации и опыта высотных восхождений. Длинный маршрут с техническими участками.', 
    routeStats: {
      distance: '20 км',
      elevationGain: '1839 м',
      duration: '7 ч',
    },
    weather: { 
      temp: -8,
      feelsLike: -18,
      humidity: 80,
      windSpeed: 25,
      windDirection: 'С',
      tempMax: -2,
      tempMin: -15,
      description: 'Сильный ветер, снег',
      icon: '🌨️',
    },
    weatherForecast: [
      { time: 'Ночь', temp: -13, icon: '🌙' },
      { time: 'Утро', temp: -8, icon: '🌨️' },
      { time: 'День', temp: -2, icon: '❄️' },
      { time: 'Вечер', temp: -6, icon: '🌨️' },
    ],
    hourlyForecast: [
      { hour: '00:00', temp: -13, icon: '🌙', humidity: 82, wind: 22 },
      { hour: '03:00', temp: -14, icon: '🌙', humidity: 84, wind: 20 },
      { hour: '06:00', temp: -11, icon: '🌨️', humidity: 80, wind: 21 },
      { hour: '09:00', temp: -7, icon: '🌨️', humidity: 76, wind: 24 },
      { hour: '12:00', temp: -2, icon: '❄️', humidity: 70, wind: 28 },
      { hour: '15:00', temp: -3, icon: '❄️', humidity: 72, wind: 26 },
      { hour: '18:00', temp: -6, icon: '🌨️', humidity: 75, wind: 23 },
      { hour: '21:00', temp: -10, icon: '🌙', humidity: 79, wind: 21 },
    ],
    routes: [
      {
        name: 'Юго-западный маршрут',
        duration: '30 ч',
        distance: '28 км',
        elevationGain: '2400 м',
        difficulty: 'Экспертный',
        terrain: 'Тропа → морена → ледник → скалы → гребень',
        description:
          'Экспертный маршрут для опытных альпинистов. Включает прохождение ледника, скального участка VI категории и выход по🔪ножу к вершине. Требуется двухдневное восхождение с промежуточным лагерем.',
        highlights: [
          'Вершина — высшая точка маршрута',
          'Ледниковое поле длиной 1.5 км',
          'Скальный участок VI категории',
          'Вершинный гребень',
        ],
        friendHikeUrl: 'https://friendhike.com/mountains/kazakhstan/kumbel/',
        guruMapsFile: '/guru/manas-sw.guru',
      },
    ],
    equipment: [
      {
        category: 'Одежда',
        items: [
          { name: 'Экспедиционная куртка', essential: true },
          { name: 'Пуховик (800+)', essential: true },
          { name: 'Альпинистские штаны', essential: true },
          { name: 'Термобельё (3 слоя)', essential: true },
          { name: 'Балаклава', essential: true },
          { name: 'Альпинистские перчатки (2 пары)', essential: true },
          { name: 'Гетры', essential: true },
        ],
      },
      {
        category: 'Обувь',
        items: [
          { name: 'Экспедиционные ботинки', essential: true },
          { name: 'Кошки (12-зубые)', essential: true },
          { name: 'Гамаши', essential: true },
        ],
      },
      {
        category: 'Навигация',
        items: [
          { name: 'GPS-навигатор', essential: true },
          { name: 'Компас', essential: true },
          { name: 'Топографическая карта', essential: true },
          { name: 'Power bank (3 шт)', essential: true },
          { name: 'Солнечная зарядка', essential: false },
        ],
      },
      {
        category: 'Альпинистское снаряжение',
        items: [
          { name: 'Каска', essential: true },
          { name: 'Страховочная система', essential: true },
          { name: 'Верёвка (60 м, 2 шт)', essential: true },
          { name: 'Гропрессоры', essential: true },
          { name: 'Жумар', essential: true },
          { name: 'Карабины (8 шт)', essential: true },
          { name: 'Петли (6 шт)', essential: true },
          { name: 'Ледоруб', essential: true },
        ],
      },
      {
        category: 'Лагерь',
        items: [
          { name: 'Палатка (4-сезонная)', essential: true },
          { name: 'Спальный мешок (-15°C)', essential: true },
          { name: 'Коврик (R-value 5+)', essential: true },
          { name: 'Горелка + топливо', essential: true },
        ],
      },
      {
        category: 'Питание',
        items: [
          { name: 'Вода (4 л)', essential: true },
          { name: 'Высококалорийная еда (2 дня)', essential: true },
          { name: 'Энергетические гели', essential: true },
          { name: 'Термос', essential: true },
        ],
      },
      {
        category: 'Безопасность',
        items: [
          { name: 'Аптечка (альпинистская)', essential: true },
          { name: 'Солнцезащитный крем SPF 50+', essential: true },
          { name: 'Спасательное одеяло', essential: true },
          { name: 'Свисток', essential: true },
          { name: 'Сигнальные ракеты', essential: false },
          { name: 'Кислород (опционально)', essential: false, note: 'Для экстренных случаев' },
        ],
      },
    ],
    safety: {
      rules: [
        'Минимальный опыт: 5 высотных маршрутов (включая технические)',
        'Группа минимум 4 человека с опытным проводником',
        'Обязательная регистрация в спасательной службе (24 ч)',
        'Полное альпинистское снаряжение обязательно',
        'Двухдневное восхождение с промежуточным лагерем',
        'Мониторинг погоды каждые 3 часа',
        'Немедленный спуск при ухудшении погоды',
      ],
      emergencyContacts: [
        { label: 'МЧС Казахстана', number: '112' },
        { label: 'Служба спасения Алматы', number: '+7-727-250-39-39' },
        { label: 'Горная служба спасения', number: '+7-727-272-25-45' },
        { label: 'Центр управления полётами', number: '+7-727-258-38-00' },
      ],
      tips: [
        'Акклиматизация: минимум 3 дня на высоте 3000+ м перед восхождением',
        'Выход из промежуточного лагеря: 3:00-4:00',
        'Разворот: не позже 11:00 в любом случае',
        'Двигайтесь медленно — высота требует адаптации',
        'Всегда имейте план Б — худший сценарий',
      ],
    },
      category: 'peak',
    photos: [
      'https://images.unsplash.com/photo-1529914304583-74a0f15d0e1e?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1485236715568-ddc5ee6ca227?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1513415756790-2ac1db1297d0?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=800&h=500&fit=crop',
    ],
  },
  {
    id: 'bukreev',
    name: 'Пик Букреева',
    nameKz: 'Букреев шыңы',
    nameEn: 'Bukreev Peak',
    elevation: 3010,
    coordinates: { lat: 43.0400, lng: 77.1200 },
    mapPosition: { top: '35%', left: '18%' },
    difficulty: 'Лёгкий',
    difficultyLevel: 1,
    description:
      'Один из самых высоких и технически сложных пиков Заилийского Алатау. Требует серьёзной альпинистской подготовки, хорошей акклиматизации и опыта высотных восхождений. Длинный маршрут с техническими участками.',
    routeStats: {
      distance: '24 км',
      elevationGain: '1529 м',
      duration: '9 ч',
    },
    weather: {
      temp: -8,
      feelsLike: -18,
      humidity: 80,
      windSpeed: 25,
      windDirection: 'С',
      tempMax: -2,
      tempMin: -15,
      description: 'Сильный ветер, снег',
      icon: '🌨️',
    },
    weatherForecast: [
      { time: 'Ночь', temp: -13, icon: '🌙' },
      { time: 'Утро', temp: -8, icon: '🌨️' },
      { time: 'День', temp: -2, icon: '❄️' },
      { time: 'Вечер', temp: -6, icon: '🌨️' },
    ],
    hourlyForecast: [
      { hour: '00:00', temp: -13, icon: '🌙', humidity: 82, wind: 22 },
      { hour: '03:00', temp: -14, icon: '🌙', humidity: 84, wind: 20 },
      { hour: '06:00', temp: -11, icon: '🌨️', humidity: 80, wind: 21 },
      { hour: '09:00', temp: -7, icon: '🌨️', humidity: 76, wind: 24 },
      { hour: '12:00', temp: -2, icon: '❄️', humidity: 70, wind: 28 },
      { hour: '15:00', temp: -3, icon: '❄️', humidity: 72, wind: 26 },
      { hour: '18:00', temp: -6, icon: '🌨️', humidity: 75, wind: 23 },
      { hour: '21:00', temp: -10, icon: '🌙', humidity: 79, wind: 21 },
    ],
    routes: [
      {
        name: 'Юго-западный маршрут',
        duration: '9 ч',
        distance: '24 км',
        elevationGain: '1529 м',
        difficulty: 'Экспертный',
        terrain: 'Тропа → морена → ледник → скалы → гребень',
        description:
          'Экспертный маршрут для опытных альпинистов. Включает прохождение ледника, скального участка VI категории и выход по🔪ножу к вершине. Требуется двухдневное восхождение с промежуточным лагерем.',
        highlights: [
          'Вершина — высшая точка маршрута',
          'Ледниковое поле длиной 1.5 км',
          'Скальный участок VI категории',
          'Вершинный гребень',
        ],
        friendHikeUrl: 'https://friendhike.com/mountains/kazakhstan/pik-bukreeva/',
        guruMapsFile: '/guru/manas-sw.guru',
      },
    ],
    equipment: [
      {
        category: 'Одежда',
        items: [
          { name: 'Экспедиционная куртка', essential: true },
          { name: 'Пуховик (800+)', essential: true },
          { name: 'Альпинистские штаны', essential: true },
          { name: 'Термобельё (3 слоя)', essential: true },
          { name: 'Балаклава', essential: true },
          { name: 'Альпинистские перчатки (2 пары)', essential: true },
          { name: 'Гетры', essential: true },
        ],
      },
      {
        category: 'Обувь',
        items: [
          { name: 'Экспедиционные ботинки', essential: true },
          { name: 'Кошки (12-зубые)', essential: true },
          { name: 'Гамаши', essential: true },
        ],
      },
      {
        category: 'Навигация',
        items: [
          { name: 'GPS-навигатор', essential: true },
          { name: 'Компас', essential: true },
          { name: 'Топографическая карта', essential: true },
          { name: 'Power bank (3 шт)', essential: true },
          { name: 'Солнечная зарядка', essential: false },
        ],
      },
      {
        category: 'Альпинистское снаряжение',
        items: [
          { name: 'Каска', essential: true },
          { name: 'Страховочная система', essential: true },
          { name: 'Верёвка (60 м, 2 шт)', essential: true },
          { name: 'Гропрессоры', essential: true },
          { name: 'Жумар', essential: true },
          { name: 'Карабины (8 шт)', essential: true },
          { name: 'Петли (6 шт)', essential: true },
          { name: 'Ледоруб', essential: true },
        ],
      },
      {
        category: 'Лагерь',
        items: [
          { name: 'Палатка (4-сезонная)', essential: true },
          { name: 'Спальный мешок (-15°C)', essential: true },
          { name: 'Коврик (R-value 5+)', essential: true },
          { name: 'Горелка + топливо', essential: true },
        ],
      },
      {
        category: 'Питание',
        items: [
          { name: 'Вода (4 л)', essential: true },
          { name: 'Высококалорийная еда (2 дня)', essential: true },
          { name: 'Энергетические гели', essential: true },
          { name: 'Термос', essential: true },
        ],
      },
      {
        category: 'Безопасность',
        items: [
          { name: 'Аптечка (альпинистская)', essential: true },
          { name: 'Солнцезащитный крем SPF 50+', essential: true },
          { name: 'Спасательное одеяло', essential: true },
          { name: 'Свисток', essential: true },
          { name: 'Сигнальные ракеты', essential: false },
          { name: 'Кислород (опционально)', essential: false, note: 'Для экстренных случаев' },
        ],
      },
    ],
    safety: {
      rules: [
        'Минимальный опыт: 5 высотных маршрутов (включая технические)',
        'Группа минимум 4 человека с опытным проводником',
        'Обязательная регистрация в спасательной службе (24 ч)',
        'Полное альпинистское снаряжение обязательно',
        'Двухдневное восхождение с промежуточным лагерем',
        'Мониторинг погоды каждые 3 часа',
        'Немедленный спуск при ухудшении погоды',
      ],
      emergencyContacts: [
        { label: 'МЧС Казахстана', number: '112' },
        { label: 'Служба спасения Алматы', number: '+7-727-250-39-39' },
        { label: 'Горная служба спасения', number: '+7-727-272-25-45' },
        { label: 'Центр управления полётами', number: '+7-727-258-38-00' },
      ],
      tips: [
        'Акклиматизация: минимум 3 дня на высоте 3000+ м перед восхождением',
        'Выход из промежуточного лагеря: 3:00-4:00',
        'Разворот: не позже 11:00 в любом случае',
        'Двигайтесь медленно — высота требует адаптации',
        'Всегда имейте план Б — худший сценарий',
      ],
    },
      category: 'peak',
    photos: [
      'https://images.unsplash.com/photo-1529914304583-74a0f15d0e1e?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1485236715568-ddc5ee6ca227?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1513415756790-2ac1db1297d0?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=800&h=500&fit=crop',
    ],
  },
  {
    id: 'titov',
    name: 'Пик Титова',
    nameKz: 'Титов шыңы',
    nameEn: 'Titov Peak',
    elevation: 3871,
    coordinates: { lat: 43.0400, lng: 77.1200 },
    mapPosition: { top: '30%', left: '55%' },
    difficulty: 'Средний',
    difficultyLevel: 2,
    description:
      'Один из самых высоких и технически сложных пиков Заилийского Алатау. Требует серьёзной альпинистской подготовки, хорошей акклиматизации и опыта высотных восхождений. Длинный маршрут с техническими участками.',
    routeStats: {
      distance: '22 км',
      elevationGain: '1882 м',
      duration: '8 ч',
    },
    weather: {
      temp: -8,
      feelsLike: -18,
      humidity: 80,
      windSpeed: 25,
      windDirection: 'С',
      tempMax: -2,
      tempMin: -15,
      description: 'Сильный ветер, снег',
      icon: '🌨️',
    },
    weatherForecast: [
      { time: 'Ночь', temp: -13, icon: '🌙' },
      { time: 'Утро', temp: -8, icon: '🌨️' },
      { time: 'День', temp: -2, icon: '❄️' },
      { time: 'Вечер', temp: -6, icon: '🌨️' },
    ],
    hourlyForecast: [
      { hour: '00:00', temp: -13, icon: '🌙', humidity: 82, wind: 22 },
      { hour: '03:00', temp: -14, icon: '🌙', humidity: 84, wind: 20 },
      { hour: '06:00', temp: -11, icon: '🌨️', humidity: 80, wind: 21 },
      { hour: '09:00', temp: -7, icon: '🌨️', humidity: 76, wind: 24 },
      { hour: '12:00', temp: -2, icon: '❄️', humidity: 70, wind: 28 },
      { hour: '15:00', temp: -3, icon: '❄️', humidity: 72, wind: 26 },
      { hour: '18:00', temp: -6, icon: '🌨️', humidity: 75, wind: 23 },
      { hour: '21:00', temp: -10, icon: '🌙', humidity: 79, wind: 21 },
    ],
    routes: [
      {
        name: 'Юго-западный маршрут',
        duration: '8 ч',
        distance: '22 км',
        elevationGain: '1882 м',
        difficulty: 'Средний',
        terrain: 'Тропа → морена → ледник → скалы → гребень',
        description:
          'Экспертный маршрут для опытных альпинистов. Включает прохождение ледника, скального участка VI категории и выход по🔪ножу к вершине. Требуется двухдневное восхождение с промежуточным лагерем.',
        highlights: [
          'Вершина — высшая точка маршрута',
          'Ледниковое поле длиной 1.5 км',
          'Скальный участок VI категории',
          'Вершинный гребень',
        ],
        friendHikeUrl: 'https://friendhike.com/mountains/kazakhstan/pik-titova/',
        guruMapsFile: '/guru/manas-sw.guru',
      },
    ],
    equipment: [
      {
        category: 'Одежда',
        items: [
          { name: 'Экспедиционная куртка', essential: true },
          { name: 'Пуховик (800+)', essential: true },
          { name: 'Альпинистские штаны', essential: true },
          { name: 'Термобельё (3 слоя)', essential: true },
          { name: 'Балаклава', essential: true },
          { name: 'Альпинистские перчатки (2 пары)', essential: true },
          { name: 'Гетры', essential: true },
        ],
      },
      {
        category: 'Обувь',
        items: [
          { name: 'Экспедиционные ботинки', essential: true },
          { name: 'Кошки (12-зубые)', essential: true },
          { name: 'Гамаши', essential: true },
        ],
      },
      {
        category: 'Навигация',
        items: [
          { name: 'GPS-навигатор', essential: true },
          { name: 'Компас', essential: true },
          { name: 'Топографическая карта', essential: true },
          { name: 'Power bank (3 шт)', essential: true },
          { name: 'Солнечная зарядка', essential: false },
        ],
      },
      {
        category: 'Альпинистское снаряжение',
        items: [
          { name: 'Каска', essential: true },
          { name: 'Страховочная система', essential: true },
          { name: 'Верёвка (60 м, 2 шт)', essential: true },
          { name: 'Гропрессоры', essential: true },
          { name: 'Жумар', essential: true },
          { name: 'Карабины (8 шт)', essential: true },
          { name: 'Петли (6 шт)', essential: true },
          { name: 'Ледоруб', essential: true },
        ],
      },
      {
        category: 'Лагерь',
        items: [
          { name: 'Палатка (4-сезонная)', essential: true },
          { name: 'Спальный мешок (-15°C)', essential: true },
          { name: 'Коврик (R-value 5+)', essential: true },
          { name: 'Горелка + топливо', essential: true },
        ],
      },
      {
        category: 'Питание',
        items: [
          { name: 'Вода (4 л)', essential: true },
          { name: 'Высококалорийная еда (2 дня)', essential: true },
          { name: 'Энергетические гели', essential: true },
          { name: 'Термос', essential: true },
        ],
      },
      {
        category: 'Безопасность',
        items: [
          { name: 'Аптечка (альпинистская)', essential: true },
          { name: 'Солнцезащитный крем SPF 50+', essential: true },
          { name: 'Спасательное одеяло', essential: true },
          { name: 'Свисток', essential: true },
          { name: 'Сигнальные ракеты', essential: false },
          { name: 'Кислород (опционально)', essential: false, note: 'Для экстренных случаев' },
        ],
      },
    ],
    safety: {
      rules: [
        'Минимальный опыт: 5 высотных маршрутов (включая технические)',
        'Группа минимум 4 человека с опытным проводником',
        'Обязательная регистрация в спасательной службе (24 ч)',
        'Полное альпинистское снаряжение обязательно',
        'Двухдневное восхождение с промежуточным лагерем',
        'Мониторинг погоды каждые 3 часа',
        'Немедленный спуск при ухудшении погоды',
      ],
      emergencyContacts: [
        { label: 'МЧС Казахстана', number: '112' },
        { label: 'Служба спасения Алматы', number: '+7-727-250-39-39' },
        { label: 'Горная служба спасения', number: '+7-727-272-25-45' },
        { label: 'Центр управления полётами', number: '+7-727-258-38-00' },
      ],
      tips: [
        'Акклиматизация: минимум 3 дня на высоте 3000+ м перед восхождением',
        'Выход из промежуточного лагеря: 3:00-4:00',
        'Разворот: не позже 11:00 в любом случае',
        'Двигайтесь медленно — высота требует адаптации',
        'Всегда имейте план Б — худший сценарий',
      ],
    },
      category: 'peak',
    photos: [
      'https://images.unsplash.com/photo-1529914304583-74a0f15d0e1e?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1485236715568-ddc5ee6ca227?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1513415756790-2ac1db1297d0?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=800&h=500&fit=crop',
    ],
  },
  //{ //траверс каменский каргалы, не закончил длительность и набор 
  //   id: 'kamenskiy-kargaly', 
  //   name: 'Траверс Каменский-Каргалы',
  //   nameKz: 'Каменский-Карғалы траверсі',
  //   nameEn: 'Kamenskiy-Kargaly Traverse',
  //   elevation: 3675,      //высота каргалинского пика, каменского 3674, в зависимости от источника
  //   coordinates: { lat: 43.0400, lng: 77.1200 },
  //   mapPosition: { top: '', left: '' },
  //   difficulty: 'Средний',
  //   difficultyLevel: 2,
  //   description:
  //     'Один из самых высоких и технически сложных пиков Заилийского Алатау. Требует серьёзной альпинистской подготовки, хорошей акклиматизации и опыта высотных восхождений. Длинный маршрут с техническими участками.',
  //   routeStats: {
  //     distance: ' ',
  //     elevationGain: ' ',
  //     duration: ' ',
  //   },
  //   weather: {
  //     temp: -8,
  //     feelsLike: -18,
  //     humidity: 80,
  //     windSpeed: 25,
  //     windDirection: 'С',
  //     tempMax: -2,
  //     tempMin: -15,
  //     description: 'Сильный ветер, снег',
  //     icon: '🌨️',
  //   },
  //   weatherForecast: [
  //     { time: 'Ночь', temp: -13, icon: '🌙' },
  //     { time: 'Утро', temp: -8, icon: '🌨️' },
  //     { time: 'День', temp: -2, icon: '❄️' },
  //     { time: 'Вечер', temp: -6, icon: '🌨️' },
  //   ],
  //   hourlyForecast: [
  //     { hour: '00:00', temp: -13, icon: '🌙', humidity: 82, wind: 22 },
  //     { hour: '03:00', temp: -14, icon: '🌙', humidity: 84, wind: 20 },
  //     { hour: '06:00', temp: -11, icon: '🌨️', humidity: 80, wind: 21 },
  //     { hour: '09:00', temp: -7, icon: '🌨️', humidity: 76, wind: 24 },
  //     { hour: '12:00', temp: -2, icon: '❄️', humidity: 70, wind: 28 },
  //     { hour: '15:00', temp: -3, icon: '❄️', humidity: 72, wind: 26 },
  //     { hour: '18:00', temp: -6, icon: '🌨️', humidity: 75, wind: 23 },
  //     { hour: '21:00', temp: -10, icon: '🌙', humidity: 79, wind: 21 },
  //   ],
  //   routes: [
  //     {
  //       name: 'Юго-западный маршрут',
  //       duration: '30 ч',
  //       distance: '28 км',
  //       elevationGain: '2400 м',
  //       difficulty: 'Экспертный',
  //       terrain: 'Тропа → морена → ледник → скалы → гребень',
  //       description:
  //         'Экспертный маршрут для опытных альпинистов. Включает прохождение ледника, скального участка VI категории и выход по🔪ножу к вершине. Требуется двухдневное восхождение с промежуточным лагерем.',
  //       highlights: [
  //         'Вершина — высшая точка маршрута',
  //         'Ледниковое поле длиной 1.5 км',
  //         'Скальный участок VI категории',
  //         'Вершинный гребень',
  //       ],
  //       friendHikeUrl: 'https://friendhike.com/mountains/kazakhstan/pik-titova/',
  //       guruMapsFile: '/guru/manas-sw.guru',
  //     },
  //   ],
  //   equipment: [
  //     {
  //       category: 'Одежда',
  //       items: [
  //         { name: 'Экспедиционная куртка', essential: true },
  //         { name: 'Пуховик (800+)', essential: true },
  //         { name: 'Альпинистские штаны', essential: true },
  //         { name: 'Термобельё (3 слоя)', essential: true },
  //         { name: 'Балаклава', essential: true },
  //         { name: 'Альпинистские перчатки (2 пары)', essential: true },
  //         { name: 'Гетры', essential: true },
  //       ],
  //     },
  //     {
  //       category: 'Обувь',
  //       items: [
  //         { name: 'Экспедиционные ботинки', essential: true },
  //         { name: 'Кошки (12-зубые)', essential: true },
  //         { name: 'Гамаши', essential: true },
  //       ],
  //     },
  //     {
  //       category: 'Навигация',
  //       items: [
  //         { name: 'GPS-навигатор', essential: true },
  //         { name: 'Компас', essential: true },
  //         { name: 'Топографическая карта', essential: true },
  //         { name: 'Power bank (3 шт)', essential: true },
  //         { name: 'Солнечная зарядка', essential: false },
  //       ],
  //     },
  //     {
  //       category: 'Альпинистское снаряжение',
  //       items: [
  //         { name: 'Каска', essential: true },
  //         { name: 'Страховочная система', essential: true },
  //         { name: 'Верёвка (60 м, 2 шт)', essential: true },
  //         { name: 'Гропрессоры', essential: true },
  //         { name: 'Жумар', essential: true },
  //         { name: 'Карабины (8 шт)', essential: true },
  //         { name: 'Петли (6 шт)', essential: true },
  //         { name: 'Ледоруб', essential: true },
  //       ],
  //     },
  //     {
  //       category: 'Лагерь',
  //       items: [
  //         { name: 'Палатка (4-сезонная)', essential: true },
  //         { name: 'Спальный мешок (-15°C)', essential: true },
  //         { name: 'Коврик (R-value 5+)', essential: true },
  //         { name: 'Горелка + топливо', essential: true },
  //       ],
  //     },
  //     {
  //       category: 'Питание',
  //       items: [
  //         { name: 'Вода (4 л)', essential: true },
  //         { name: 'Высококалорийная еда (2 дня)', essential: true },
  //         { name: 'Энергетические гели', essential: true },
  //         { name: 'Термос', essential: true },
  //       ],
  //     },
  //     {
  //       category: 'Безопасность',
  //       items: [
  //         { name: 'Аптечка (альпинистская)', essential: true },
  //         { name: 'Солнцезащитный крем SPF 50+', essential: true },
  //         { name: 'Спасательное одеяло', essential: true },
  //         { name: 'Свисток', essential: true },
  //         { name: 'Сигнальные ракеты', essential: false },
  //         { name: 'Кислород (опционально)', essential: false, note: 'Для экстренных случаев' },
  //       ],
  //     },
  //   ],
  //   safety: {
  //     rules: [
  //       'Минимальный опыт: 5 высотных маршрутов (включая технические)',
  //       'Группа минимум 4 человека с опытным проводником',
  //       'Обязательная регистрация в спасательной службе (24 ч)',
  //       'Полное альпинистское снаряжение обязательно',
  //       'Двухдневное восхождение с промежуточным лагерем',
  //       'Мониторинг погоды каждые 3 часа',
  //       'Немедленный спуск при ухудшении погоды',
  //     ],
  //     emergencyContacts: [
  //       { label: 'МЧС Казахстана', number: '112' },
  //       { label: 'Служба спасения Алматы', number: '+7-727-250-39-39' },
  //       { label: 'Горная служба спасения', number: '+7-727-272-25-45' },
  //       { label: 'Центр управления полётами', number: '+7-727-258-38-00' },
  //     ],
  //     tips: [
  //       'Акклиматизация: минимум 3 дня на высоте 3000+ м перед восхождением',
  //       'Выход из промежуточного лагеря: 3:00-4:00',
  //       'Разворот: не позже 11:00 в любом случае',
  //       'Двигайтесь медленно — высота требует адаптации',
  //       'Всегда имейте план Б — худший сценарий',
  //     ],
  //   },
  //   photos: [
  //     'https://images.unsplash.com/photo-1529914304583-74a0f15d0e1e?w=800&h=500&fit=crop',
  //     'https://images.unsplash.com/photo-1485236715568-ddc5ee6ca227?w=800&h=500&fit=crop',
  //     'https://images.unsplash.com/photo-1513415756790-2ac1db1297d0?w=800&h=500&fit=crop',
  //     'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=800&h=500&fit=crop',
  //   ],
  // },
  {
    id: 'Amangeldy',
    name: 'Пик Амангельды',
    nameKz: 'Амангельді шыңы',
    nameEn: 'Amangeldy Peak',
    elevation: 3999,
    coordinates: { lat: 43.0400, lng: 77.1200 },
    mapPosition: { top: '26%', left: '60%' },
    difficulty: 'Сложный',
    difficultyLevel: 3,
    description:
      'Один из самых высоких и технически сложных пиков Заилийского Алатау. Требует серьёзной альпинистской подготовки, хорошей акклиматизации и опыта высотных восхождений. Длинный маршрут с техническими участками.',
    routeStats: {
      distance: '20 км',
      elevationGain: '1739 м', //начиная с 2260 м(шымбулака) до 3999 м
      duration: '10 ч',
    },
    weather: {
      temp: -8,
      feelsLike: -18,
      humidity: 80,
      windSpeed: 25,
      windDirection: 'С',
      tempMax: -2,
      tempMin: -15,
      description: 'Сильный ветер, снег',
      icon: '🌨️',
    },
    weatherForecast: [
      { time: 'Ночь', temp: -13, icon: '🌙' },
      { time: 'Утро', temp: -8, icon: '🌨️' },
      { time: 'День', temp: -2, icon: '❄️' },
      { time: 'Вечер', temp: -6, icon: '🌨️' },
    ],
    hourlyForecast: [
      { hour: '00:00', temp: -13, icon: '🌙', humidity: 82, wind: 22 },
      { hour: '03:00', temp: -14, icon: '🌙', humidity: 84, wind: 20 },
      { hour: '06:00', temp: -11, icon: '🌨️', humidity: 80, wind: 21 },
      { hour: '09:00', temp: -7, icon: '🌨️', humidity: 76, wind: 24 },
      { hour: '12:00', temp: -2, icon: '❄️', humidity: 70, wind: 28 },
      { hour: '15:00', temp: -3, icon: '❄️', humidity: 72, wind: 26 },
      { hour: '18:00', temp: -6, icon: '🌨️', humidity: 75, wind: 23 },
      { hour: '21:00', temp: -10, icon: '🌙', humidity: 79, wind: 21 },
    ],
    routes: [
      {
        name: 'Юго-западный маршрут',
        duration: '10 ч',
        distance: '20 км',
        elevationGain: '1739 м',
        difficulty: 'Сложный',
        terrain: 'Тропа → морена → ледник → скалы → гребень',
        description:
          'Экспертный маршрут для опытных альпинистов. Включает прохождение ледника, скального участка VI категории и выход по🔪ножу к вершине. Требуется двухдневное восхождение с промежуточным лагерем.',
        highlights: [
          'Вершина — высшая точка маршрута',
          'Ледниковое поле длиной 1.5 км',
          'Скальный участок VI категории',
          'Вершинный гребень',
        ],
        friendHikeUrl: 'https://friendhike.com/mountains/kazakhstan/peak-amangeldy/',
        guruMapsFile: '/guru/manas-sw.guru',
      },
    ],
    equipment: [
      {
        category: 'Одежда',
        items: [
          { name: 'Экспедиционная куртка', essential: true },
          { name: 'Пуховик (800+)', essential: true },
          { name: 'Альпинистские штаны', essential: true },
          { name: 'Термобельё (3 слоя)', essential: true },
          { name: 'Балаклава', essential: true },
          { name: 'Альпинистские перчатки (2 пары)', essential: true },
          { name: 'Гетры', essential: true },
        ],
      },
      {
        category: 'Обувь',
        items: [
          { name: 'Экспедиционные ботинки', essential: true },
          { name: 'Кошки (12-зубые)', essential: true },
          { name: 'Гамаши', essential: true },
        ],
      },
      {
        category: 'Навигация',
        items: [
          { name: 'GPS-навигатор', essential: true },
          { name: 'Компас', essential: true },
          { name: 'Топографическая карта', essential: true },
          { name: 'Power bank (3 шт)', essential: true },
          { name: 'Солнечная зарядка', essential: false },
        ],
      },
      {
        category: 'Альпинистское снаряжение',
        items: [
          { name: 'Каска', essential: true },
          { name: 'Страховочная система', essential: true },
          { name: 'Верёвка (60 м, 2 шт)', essential: true },
          { name: 'Гропрессоры', essential: true },
          { name: 'Жумар', essential: true },
          { name: 'Карабины (8 шт)', essential: true },
          { name: 'Петли (6 шт)', essential: true },
          { name: 'Ледоруб', essential: true },
        ],
      },
      {
        category: 'Лагерь',
        items: [
          { name: 'Палатка (4-сезонная)', essential: true },
          { name: 'Спальный мешок (-15°C)', essential: true },
          { name: 'Коврик (R-value 5+)', essential: true },
          { name: 'Горелка + топливо', essential: true },
        ],
      },
      {
        category: 'Питание',
        items: [
          { name: 'Вода (4 л)', essential: true },
          { name: 'Высококалорийная еда (2 дня)', essential: true },
          { name: 'Энергетические гели', essential: true },
          { name: 'Термос', essential: true },
        ],
      },
      {
        category: 'Безопасность',
        items: [
          { name: 'Аптечка (альпинистская)', essential: true },
          { name: 'Солнцезащитный крем SPF 50+', essential: true },
          { name: 'Спасательное одеяло', essential: true },
          { name: 'Свисток', essential: true },
          { name: 'Сигнальные ракеты', essential: false },
          { name: 'Кислород (опционально)', essential: false, note: 'Для экстренных случаев' },
        ],
      },
    ],
    safety: {
      rules: [
        'Минимальный опыт: 5 высотных маршрутов (включая технические)',
        'Группа минимум 4 человека с опытным проводником',
        'Обязательная регистрация в спасательной службе (24 ч)',
        'Полное альпинистское снаряжение обязательно',
        'Двухдневное восхождение с промежуточным лагерем',
        'Мониторинг погоды каждые 3 часа',
        'Немедленный спуск при ухудшении погоды',
      ],
      emergencyContacts: [
        { label: 'МЧС Казахстана', number: '112' },
        { label: 'Служба спасения Алматы', number: '+7-727-250-39-39' },
        { label: 'Горная служба спасения', number: '+7-727-272-25-45' },
        { label: 'Центр управления полётами', number: '+7-727-258-38-00' },
      ],
      tips: [
        'Акклиматизация: минимум 3 дня на высоте 3000+ м перед восхождением',
        'Выход из промежуточного лагеря: 3:00-4:00',
        'Разворот: не позже 11:00 в любом случае',
        'Двигайтесь медленно — высота требует адаптации',
        'Всегда имейте план Б — худший сценарий',
      ],
    },
      category: 'peak',
    photos: [
      'https://images.unsplash.com/photo-1529914304583-74a0f15d0e1e?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1485236715568-ddc5ee6ca227?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1513415756790-2ac1db1297d0?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=800&h=500&fit=crop',
    ],
  },
  {
    id: 'Nursultan',
    name: 'Пик Нурсултан',
    nameKz: 'Нұрсұлтан шыңы',
    nameEn: 'Nursultan Peak',
    elevation: 4376,
    coordinates: { lat: 43.0400, lng: 77.1200 },
    mapPosition: { top: '18%', left: '68%' },
    difficulty: 'Очень сложный',
    difficultyLevel: 4,
    description:
      'Один из самых высоких и технически сложных пиков Заилийского Алатау. Требует серьёзной альпинистской подготовки, хорошей акклиматизации и опыта высотных восхождений. Длинный маршрут с техническими участками.',
    routeStats: {
      distance: '14 км',
      elevationGain: '1176 м', //начиная с 3200 м(талгарского перевала) до 4376 м
      duration: '9 ч',
    },
    weather: {
      temp: -8,
      feelsLike: -18,
      humidity: 80,
      windSpeed: 25,
      windDirection: 'С',
      tempMax: -2,
      tempMin: -15,
      description: 'Сильный ветер, снег',
      icon: '🌨️',
    },
    weatherForecast: [
      { time: 'Ночь', temp: -13, icon: '🌙' },
      { time: 'Утро', temp: -8, icon: '🌨️' },
      { time: 'День', temp: -2, icon: '❄️' },
      { time: 'Вечер', temp: -6, icon: '🌨️' },
    ],
    hourlyForecast: [
      { hour: '00:00', temp: -13, icon: '🌙', humidity: 82, wind: 22 },
      { hour: '03:00', temp: -14, icon: '🌙', humidity: 84, wind: 20 },
      { hour: '06:00', temp: -11, icon: '🌨️', humidity: 80, wind: 21 },
      { hour: '09:00', temp: -7, icon: '🌨️', humidity: 76, wind: 24 },
      { hour: '12:00', temp: -2, icon: '❄️', humidity: 70, wind: 28 },
      { hour: '15:00', temp: -3, icon: '❄️', humidity: 72, wind: 26 },
      { hour: '18:00', temp: -6, icon: '🌨️', humidity: 75, wind: 23 },
      { hour: '21:00', temp: -10, icon: '🌙', humidity: 79, wind: 21 },
    ],
    routes: [
      {
        name: 'Юго-западный маршрут',
        duration: '9 ч',
        distance: '14 км',
        elevationGain: '1176 м',
        difficulty: 'Очень сложный',
        terrain: 'Тропа → морена → ледник → скалы → гребень',
        description:
          'Экспертный маршрут для опытных альпинистов. Включает прохождение ледника, скального участка VI категории и выход по🔪ножу к вершине. Требуется двухдневное восхождение с промежуточным лагерем.',
        highlights: [
          'Вершина — высшая точка маршрута',
          'Ледниковое поле длиной 1.5 км',
          'Скальный участок VI категории',
          'Вершинный гребень',
        ],
        friendHikeUrl: 'https://friendhike.com/mountains/kazakhstan/pik-abaya/',
        guruMapsFile: '/guru/manas-sw.guru',
      },
    ],
    equipment: [
      {
        category: 'Одежда',
        items: [
          { name: 'Экспедиционная куртка', essential: true },
          { name: 'Пуховик (800+)', essential: true },
          { name: 'Альпинистские штаны', essential: true },
          { name: 'Термобельё (3 слоя)', essential: true },
          { name: 'Балаклава', essential: true },
          { name: 'Альпинистские перчатки (2 пары)', essential: true },
          { name: 'Гетры', essential: true },
        ],
      },
      {
        category: 'Обувь',
        items: [
          { name: 'Экспедиционные ботинки', essential: true },
          { name: 'Кошки (12-зубые)', essential: true },
          { name: 'Гамаши', essential: true },
        ],
      },
      {
        category: 'Навигация',
        items: [
          { name: 'GPS-навигатор', essential: true },
          { name: 'Компас', essential: true },
          { name: 'Топографическая карта', essential: true },
          { name: 'Power bank (3 шт)', essential: true },
          { name: 'Солнечная зарядка', essential: false },
        ],
      },
      {
        category: 'Альпинистское снаряжение',
        items: [
          { name: 'Каска', essential: true },
          { name: 'Страховочная система', essential: true },
          { name: 'Верёвка (60 м, 2 шт)', essential: true },
          { name: 'Гропрессоры', essential: true },
          { name: 'Жумар', essential: true },
          { name: 'Карабины (8 шт)', essential: true },
          { name: 'Петли (6 шт)', essential: true },
          { name: 'Ледоруб', essential: true },
        ],
      },
      {
        category: 'Лагерь',
        items: [
          { name: 'Палатка (4-сезонная)', essential: true },
          { name: 'Спальный мешок (-15°C)', essential: true },
          { name: 'Коврик (R-value 5+)', essential: true },
          { name: 'Горелка + топливо', essential: true },
        ],
      },
      {
        category: 'Питание',
        items: [
          { name: 'Вода (4 л)', essential: true },
          { name: 'Высококалорийная еда (2 дня)', essential: true },
          { name: 'Энергетические гели', essential: true },
          { name: 'Термос', essential: true },
        ],
      },
      {
        category: 'Безопасность',
        items: [
          { name: 'Аптечка (альпинистская)', essential: true },
          { name: 'Солнцезащитный крем SPF 50+', essential: true },
          { name: 'Спасательное одеяло', essential: true },
          { name: 'Свисток', essential: true },
          { name: 'Сигнальные ракеты', essential: false },
          { name: 'Кислород (опционально)', essential: false, note: 'Для экстренных случаев' },
        ],
      },
    ],
    safety: {
      rules: [
        'Минимальный опыт: 5 высотных маршрутов (включая технические)',
        'Группа минимум 4 человека с опытным проводником',
        'Обязательная регистрация в спасательной службе (24 ч)',
        'Полное альпинистское снаряжение обязательно',
        'Двухдневное восхождение с промежуточным лагерем',
        'Мониторинг погоды каждые 3 часа',
        'Немедленный спуск при ухудшении погоды',
      ],
      emergencyContacts: [
        { label: 'МЧС Казахстана', number: '112' },
        { label: 'Служба спасения Алматы', number: '+7-727-250-39-39' },
        { label: 'Горная служба спасения', number: '+7-727-272-25-45' },
        { label: 'Центр управления полётами', number: '+7-727-258-38-00' },
      ],
      tips: [
        'Акклиматизация: минимум 3 дня на высоте 3000+ м перед восхождением',
        'Выход из промежуточного лагеря: 3:00-4:00',
        'Разворот: не позже 11:00 в любом случае',
        'Двигайтесь медленно — высота требует адаптации',
        'Всегда имейте план Б — худший сценарий',
      ],
    },
      category: 'peak',
    photos: [
      'https://images.unsplash.com/photo-1529914304583-74a0f15d0e1e?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1485236715568-ddc5ee6ca227?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1513415756790-2ac1db1297d0?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=800&h=500&fit=crop',
    ],
  },
  {
    id: 'Abai',
    name: 'Пик Абай',
    nameKz: 'Абай шыңы',
    nameEn: 'Abai Peak',
    elevation: 4010,
    coordinates: { lat: 43.0400, lng: 77.1200 },
    mapPosition: { top: '20%', left: '75%' },
    difficulty: 'Сложный',
    difficultyLevel: 3,
    description:
      'Один из самых высоких и технически сложных пиков Заилийского Алатау. Требует серьёзной альпинистской подготовки, хорошей акклиматизации и опыта высотных восхождений. Длинный маршрут с техническими участками.',
    routeStats: {
      distance: '18 км',
      elevationGain: '1810 м', //начиная с 2200 м(шымбулака) до 4010 м
      duration: '8 ч',
    },
    weather: {
      temp: -8,
      feelsLike: -18,
      humidity: 80,
      windSpeed: 25,
      windDirection: 'С',
      tempMax: -2,
      tempMin: -15,
      description: 'Сильный ветер, снег',
      icon: '🌨️',
    },
    weatherForecast: [
      { time: 'Ночь', temp: -13, icon: '🌙' },
      { time: 'Утро', temp: -8, icon: '🌨️' },
      { time: 'День', temp: -2, icon: '❄️' },
      { time: 'Вечер', temp: -6, icon: '🌨️' },
    ],
    hourlyForecast: [
      { hour: '00:00', temp: -13, icon: '🌙', humidity: 82, wind: 22 },
      { hour: '03:00', temp: -14, icon: '🌙', humidity: 84, wind: 20 },
      { hour: '06:00', temp: -11, icon: '🌨️', humidity: 80, wind: 21 },
      { hour: '09:00', temp: -7, icon: '🌨️', humidity: 76, wind: 24 },
      { hour: '12:00', temp: -2, icon: '❄️', humidity: 70, wind: 28 },
      { hour: '15:00', temp: -3, icon: '❄️', humidity: 72, wind: 26 },
      { hour: '18:00', temp: -6, icon: '🌨️', humidity: 75, wind: 23 },
      { hour: '21:00', temp: -10, icon: '🌙', humidity: 79, wind: 21 },
    ],
    routes: [
      {
        name: 'Юго-западный маршрут',
        duration: '8 ч',
        distance: '18 км',
        elevationGain: '1810 м',
        difficulty: 'Сложный',
        terrain: 'Тропа → морена → ледник → скалы → гребень',
        description:
          'Экспертный маршрут для опытных альпинистов. Включает прохождение ледника, скального участка VI категории и выход по🔪ножу к вершине. Требуется двухдневное восхождение с промежуточным лагерем.',
        highlights: [
          'Вершина — высшая точка маршрута',
          'Ледниковое поле длиной 1.5 км',
          'Скальный участок VI категории',
          'Вершинный гребень',
        ],
        friendHikeUrl: 'https://friendhike.com/mountains/kazakhstan/pik-abaya/',
        guruMapsFile: '/guru/manas-sw.guru',
      },
    ],
    equipment: [
      {
        category: 'Одежда',
        items: [
          { name: 'Экспедиционная куртка', essential: true },
          { name: 'Пуховик (800+)', essential: true },
          { name: 'Альпинистские штаны', essential: true },
          { name: 'Термобельё (3 слоя)', essential: true },
          { name: 'Балаклава', essential: true },
          { name: 'Альпинистские перчатки (2 пары)', essential: true },
          { name: 'Гетры', essential: true },
        ],
      },
      {
        category: 'Обувь',
        items: [
          { name: 'Экспедиционные ботинки', essential: true },
          { name: 'Кошки (12-зубые)', essential: true },
          { name: 'Гамаши', essential: true },
        ],
      },
      {
        category: 'Навигация',
        items: [
          { name: 'GPS-навигатор', essential: true },
          { name: 'Компас', essential: true },
          { name: 'Топографическая карта', essential: true },
          { name: 'Power bank (3 шт)', essential: true },
          { name: 'Солнечная зарядка', essential: false },
        ],
      },
      {
        category: 'Альпинистское снаряжение',
        items: [
          { name: 'Каска', essential: true },
          { name: 'Страховочная система', essential: true },
          { name: 'Верёвка (60 м, 2 шт)', essential: true },
          { name: 'Гропрессоры', essential: true },
          { name: 'Жумар', essential: true },
          { name: 'Карабины (8 шт)', essential: true },
          { name: 'Петли (6 шт)', essential: true },
          { name: 'Ледоруб', essential: true },
        ],
      },
      {
        category: 'Лагерь',
        items: [
          { name: 'Палатка (4-сезонная)', essential: true },
          { name: 'Спальный мешок (-15°C)', essential: true },
          { name: 'Коврик (R-value 5+)', essential: true },
          { name: 'Горелка + топливо', essential: true },
        ],
      },
      {
        category: 'Питание',
        items: [
          { name: 'Вода (4 л)', essential: true },
          { name: 'Высококалорийная еда (2 дня)', essential: true },
          { name: 'Энергетические гели', essential: true },
          { name: 'Термос', essential: true },
        ],
      },
      {
        category: 'Безопасность',
        items: [
          { name: 'Аптечка (альпинистская)', essential: true },
          { name: 'Солнцезащитный крем SPF 50+', essential: true },
          { name: 'Спасательное одеяло', essential: true },
          { name: 'Свисток', essential: true },
          { name: 'Сигнальные ракеты', essential: false },
          { name: 'Кислород (опционально)', essential: false, note: 'Для экстренных случаев' },
        ],
      },
    ],
    safety: {
      rules: [
        'Минимальный опыт: 5 высотных маршрутов (включая технические)',
        'Группа минимум 4 человека с опытным проводником',
        'Обязательная регистрация в спасательной службе (24 ч)',
        'Полное альпинистское снаряжение обязательно',
        'Двухдневное восхождение с промежуточным лагерем',
        'Мониторинг погоды каждые 3 часа',
        'Немедленный спуск при ухудшении погоды',
      ],
      emergencyContacts: [
        { label: 'МЧС Казахстана', number: '112' },
        { label: 'Служба спасения Алматы', number: '+7-727-250-39-39' },
        { label: 'Горная служба спасения', number: '+7-727-272-25-45' },
        { label: 'Центр управления полётами', number: '+7-727-258-38-00' },
      ],
      tips: [
        'Акклиматизация: минимум 3 дня на высоте 3000+ м перед восхождением',
        'Выход из промежуточного лагеря: 3:00-4:00',
        'Разворот: не позже 11:00 в любом случае',
        'Двигайтесь медленно — высота требует адаптации',
        'Всегда имейте план Б — худший сценарий',
      ],
    },
      category: 'peak',
    photos: [
      'https://images.unsplash.com/photo-1529914304583-74a0f15d0e1e?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1485236715568-ddc5ee6ca227?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1513415756790-2ac1db1297d0?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=800&h=500&fit=crop',
    ],
  },
   {
    id: 'Malysh',
    name: 'Пик Малыш',
    nameKz: 'Малыш шыңы',
    nameEn: 'Malysh Peak',
    elevation: 3820,
    coordinates: { lat: 43.0400, lng: 77.1200 },
    mapPosition: { top: '28%', left: '48%' },
    difficulty: 'Средний',
    difficultyLevel: 2,
    description:
      'Один из самых высоких и технически сложных пиков Заилийского Алатау. Требует серьёзной альпинистской подготовки, хорошей акклиматизации и опыта высотных восхождений. Длинный маршрут с техническими участками.',
    routeStats: {
      distance: '20 км',
      elevationGain: '1620 м', //начиная с 2200 м(шымбулака) до 3820 м
      duration: '9 ч',
    },
    weather: {
      temp: -8,
      feelsLike: -18,
      humidity: 80,
      windSpeed: 25,
      windDirection: 'С',
      tempMax: -2,
      tempMin: -15,
      description: 'Сильный ветер, снег',
      icon: '🌨️',
    },
    weatherForecast: [
      { time: 'Ночь', temp: -13, icon: '🌙' },
      { time: 'Утро', temp: -8, icon: '🌨️' },
      { time: 'День', temp: -2, icon: '❄️' },
      { time: 'Вечер', temp: -6, icon: '🌨️' },
    ],
    hourlyForecast: [
      { hour: '00:00', temp: -13, icon: '🌙', humidity: 82, wind: 22 },
      { hour: '03:00', temp: -14, icon: '🌙', humidity: 84, wind: 20 },
      { hour: '06:00', temp: -11, icon: '🌨️', humidity: 80, wind: 21 },
      { hour: '09:00', temp: -7, icon: '🌨️', humidity: 76, wind: 24 },
      { hour: '12:00', temp: -2, icon: '❄️', humidity: 70, wind: 28 },
      { hour: '15:00', temp: -3, icon: '❄️', humidity: 72, wind: 26 },
      { hour: '18:00', temp: -6, icon: '🌨️', humidity: 75, wind: 23 },
      { hour: '21:00', temp: -10, icon: '🌙', humidity: 79, wind: 21 },
    ],
    routes: [
      {
        name: 'Юго-западный маршрут',
        duration: '30 ч',
        distance: '28 км',
        elevationGain: '2400 м',
        difficulty: 'Экспертный',
        terrain: 'Тропа → морена → ледник → скалы → гребень',
        description:
          'Экспертный маршрут для опытных альпинистов. Включает прохождение ледника, скального участка VI категории и выход по🔪ножу к вершине. Требуется двухдневное восхождение с промежуточным лагерем.',
        highlights: [
          'Вершина — высшая точка маршрута',
          'Ледниковое поле длиной 1.5 км',
          'Скальный участок VI категории',
          'Вершинный гребень',
        ],
        friendHikeUrl: 'https://friendhike.com/mountains/kazakhstan/pik-malysh/',
        guruMapsFile: '/guru/manas-sw.guru',
      },
    ],
    equipment: [
      {
        category: 'Одежда',
        items: [
          { name: 'Экспедиционная куртка', essential: true },
          { name: 'Пуховик (800+)', essential: true },
          { name: 'Альпинистские штаны', essential: true },
          { name: 'Термобельё (3 слоя)', essential: true },
          { name: 'Балаклава', essential: true },
          { name: 'Альпинистские перчатки (2 пары)', essential: true },
          { name: 'Гетры', essential: true },
        ],
      },
      {
        category: 'Обувь',
        items: [
          { name: 'Экспедиционные ботинки', essential: true },
          { name: 'Кошки (12-зубые)', essential: true },
          { name: 'Гамаши', essential: true },
        ],
      },
      {
        category: 'Навигация',
        items: [
          { name: 'GPS-навигатор', essential: true },
          { name: 'Компас', essential: true },
          { name: 'Топографическая карта', essential: true },
          { name: 'Power bank (3 шт)', essential: true },
          { name: 'Солнечная зарядка', essential: false },
        ],
      },
      {
        category: 'Альпинистское снаряжение',
        items: [
          { name: 'Каска', essential: true },
          { name: 'Страховочная система', essential: true },
          { name: 'Верёвка (60 м, 2 шт)', essential: true },
          { name: 'Гропрессоры', essential: true },
          { name: 'Жумар', essential: true },
          { name: 'Карабины (8 шт)', essential: true },
          { name: 'Петли (6 шт)', essential: true },
          { name: 'Ледоруб', essential: true },
        ],
      },
      {
        category: 'Лагерь',
        items: [
          { name: 'Палатка (4-сезонная)', essential: true },
          { name: 'Спальный мешок (-15°C)', essential: true },
          { name: 'Коврик (R-value 5+)', essential: true },
          { name: 'Горелка + топливо', essential: true },
        ],
      },
      {
        category: 'Питание',
        items: [
          { name: 'Вода (4 л)', essential: true },
          { name: 'Высококалорийная еда (2 дня)', essential: true },
          { name: 'Энергетические гели', essential: true },
          { name: 'Термос', essential: true },
        ],
      },
      {
        category: 'Безопасность',
        items: [
          { name: 'Аптечка (альпинистская)', essential: true },
          { name: 'Солнцезащитный крем SPF 50+', essential: true },
          { name: 'Спасательное одеяло', essential: true },
          { name: 'Свисток', essential: true },
          { name: 'Сигнальные ракеты', essential: false },
          { name: 'Кислород (опционально)', essential: false, note: 'Для экстренных случаев' },
        ],
      },
    ],
    safety: {
      rules: [
        'Минимальный опыт: 5 высотных маршрутов (включая технические)',
        'Группа минимум 4 человека с опытным проводником',
        'Обязательная регистрация в спасательной службе (24 ч)',
        'Полное альпинистское снаряжение обязательно',
        'Двухдневное восхождение с промежуточным лагерем',
        'Мониторинг погоды каждые 3 часа',
        'Немедленный спуск при ухудшении погоды',
      ],
      emergencyContacts: [
        { label: 'МЧС Казахстана', number: '112' },
        { label: 'Служба спасения Алматы', number: '+7-727-250-39-39' },
        { label: 'Горная служба спасения', number: '+7-727-272-25-45' },
        { label: 'Центр управления полётами', number: '+7-727-258-38-00' },
      ],
      tips: [
        'Акклиматизация: минимум 3 дня на высоте 3000+ м перед восхождением',
        'Выход из промежуточного лагеря: 3:00-4:00',
        'Разворот: не позже 11:00 в любом случае',
        'Двигайтесь медленно — высота требует адаптации',
        'Всегда имейте план Б — худший сценарий',
      ],
    },
      category: 'peak',
    photos: [
      'https://images.unsplash.com/photo-1529914304583-74a0f15d0e1e?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1485236715568-ddc5ee6ca227?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1513415756790-2ac1db1297d0?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=800&h=500&fit=crop',
    ],
  },
   {
    id: 'Pogrebeskiy', //двухднека, есть другой альтернативный маршрут с юга
    name: 'Пик Погребецкого',
    nameKz: 'Погребецкий шыңы',
    nameEn: 'Pogrebetsky Peak',
    elevation: 4231,
    coordinates: { lat: 43.0400, lng: 77.1200 },
    mapPosition: { top: '22%', left: '38%' },
    difficulty: 'Очень сложный',
    difficultyLevel: 4,
    description:
      'Один из самых высоких и технически сложных пиков Заилийского Алатау. Требует серьёзной альпинистской подготовки, хорошей акклиматизации и опыта высотных восхождений. Длинный маршрут с техническими участками.',
    routeStats: {
      distance: '24 км',
      elevationGain: '2031 м', //начиная с 2200 м(шымбулака) до 4231 м
      duration: '30 ч',
    },
    weather: {
      temp: -8,
      feelsLike: -18,
      humidity: 80,
      windSpeed: 25,
      windDirection: 'С',
      tempMax: -2,
      tempMin: -15,
      description: 'Сильный ветер, снег',
      icon: '🌨️',
    },
    weatherForecast: [
      { time: 'Ночь', temp: -13, icon: '🌙' },
      { time: 'Утро', temp: -8, icon: '🌨️' },
      { time: 'День', temp: -2, icon: '❄️' },
      { time: 'Вечер', temp: -6, icon: '🌨️' },
    ],
    hourlyForecast: [
      { hour: '00:00', temp: -13, icon: '🌙', humidity: 82, wind: 22 },
      { hour: '03:00', temp: -14, icon: '🌙', humidity: 84, wind: 20 },
      { hour: '06:00', temp: -11, icon: '🌨️', humidity: 80, wind: 21 },
      { hour: '09:00', temp: -7, icon: '🌨️', humidity: 76, wind: 24 },
      { hour: '12:00', temp: -2, icon: '❄️', humidity: 70, wind: 28 },
      { hour: '15:00', temp: -3, icon: '❄️', humidity: 72, wind: 26 },
      { hour: '18:00', temp: -6, icon: '🌨️', humidity: 75, wind: 23 },
      { hour: '21:00', temp: -10, icon: '🌙', humidity: 79, wind: 21 },
    ],
    routes: [
      {
        name: 'Юго-западный маршрут',
        duration: '30 ч',
        distance: '28 км',
        elevationGain: '2400 м',
        difficulty: 'Экспертный',
        terrain: 'Тропа → морена → ледник → скалы → гребень',
        description:
          'Экспертный маршрут для опытных альпинистов. Включает прохождение ледника, скального участка VI категории и выход по🔪ножу к вершине. Требуется двухдневное восхождение с промежуточным лагерем.',
        highlights: [
          'Вершина — высшая точка маршрута',
          'Ледниковое поле длиной 1.5 км',
          'Скальный участок VI категории',
          'Вершинный гребень',
        ],
        friendHikeUrl: 'https://friendhike.com/mountains/kazakhstan/pogrebeckogo/',
        guruMapsFile: '/guru/manas-sw.guru',
      },
    ],
    equipment: [
      {
        category: 'Одежда',
        items: [
          { name: 'Экспедиционная куртка', essential: true },
          { name: 'Пуховик (800+)', essential: true },
          { name: 'Альпинистские штаны', essential: true },
          { name: 'Термобельё (3 слоя)', essential: true },
          { name: 'Балаклава', essential: true },
          { name: 'Альпинистские перчатки (2 пары)', essential: true },
          { name: 'Гетры', essential: true },
        ],
      },
      {
        category: 'Обувь',
        items: [
          { name: 'Экспедиционные ботинки', essential: true },
          { name: 'Кошки (12-зубые)', essential: true },
          { name: 'Гамаши', essential: true },
        ],
      },
      {
        category: 'Навигация',
        items: [
          { name: 'GPS-навигатор', essential: true },
          { name: 'Компас', essential: true },
          { name: 'Топографическая карта', essential: true },
          { name: 'Power bank (3 шт)', essential: true },
          { name: 'Солнечная зарядка', essential: false },
        ],
      },
      {
        category: 'Альпинистское снаряжение',
        items: [
          { name: 'Каска', essential: true },
          { name: 'Страховочная система', essential: true },
          { name: 'Верёвка (60 м, 2 шт)', essential: true },
          { name: 'Гропрессоры', essential: true },
          { name: 'Жумар', essential: true },
          { name: 'Карабины (8 шт)', essential: true },
          { name: 'Петли (6 шт)', essential: true },
          { name: 'Ледоруб', essential: true },
        ],
      },
      {
        category: 'Лагерь',
        items: [
          { name: 'Палатка (4-сезонная)', essential: true },
          { name: 'Спальный мешок (-15°C)', essential: true },
          { name: 'Коврик (R-value 5+)', essential: true },
          { name: 'Горелка + топливо', essential: true },
        ],
      },
      {
        category: 'Питание',
        items: [
          { name: 'Вода (4 л)', essential: true },
          { name: 'Высококалорийная еда (2 дня)', essential: true },
          { name: 'Энергетические гели', essential: true },
          { name: 'Термос', essential: true },
        ],
      },
      {
        category: 'Безопасность',
        items: [
          { name: 'Аптечка (альпинистская)', essential: true },
          { name: 'Солнцезащитный крем SPF 50+', essential: true },
          { name: 'Спасательное одеяло', essential: true },
          { name: 'Свисток', essential: true },
          { name: 'Сигнальные ракеты', essential: false },
          { name: 'Кислород (опционально)', essential: false, note: 'Для экстренных случаев' },
        ],
      },
    ],
    safety: {
      rules: [
        'Минимальный опыт: 5 высотных маршрутов (включая технические)',
        'Группа минимум 4 человека с опытным проводником',
        'Обязательная регистрация в спасательной службе (24 ч)',
        'Полное альпинистское снаряжение обязательно',
        'Двухдневное восхождение с промежуточным лагерем',
        'Мониторинг погоды каждые 3 часа',
        'Немедленный спуск при ухудшении погоды',
      ],
      emergencyContacts: [
        { label: 'МЧС Казахстана', number: '112' },
        { label: 'Служба спасения Алматы', number: '+7-727-250-39-39' },
        { label: 'Горная служба спасения', number: '+7-727-272-25-45' },
        { label: 'Центр управления полётами', number: '+7-727-258-38-00' },
      ],
      tips: [
        'Акклиматизация: минимум 3 дня на высоте 3000+ м перед восхождением',
        'Выход из промежуточного лагеря: 3:00-4:00',
        'Разворот: не позже 11:00 в любом случае',
        'Двигайтесь медленно — высота требует адаптации',
        'Всегда имейте план Б — худший сценарий',
      ],
    },
      category: 'peak',
    photos: [
      'https://images.unsplash.com/photo-1529914304583-74a0f15d0e1e?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1485236715568-ddc5ee6ca227?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1513415756790-2ac1db1297d0?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=800&h=500&fit=crop',
    ],
  },
    // ========== PEAKS FROM PANORAMA PHOTO ==========
    { id: 'yubileynaya', name: 'Пик Юбилейная', nameKz: 'Юбилейная шыңы', nameEn: 'Jubilee Peak', elevation: 3929, coordinates: { lat: 43.180, lng: 76.890 }, mapPosition: { top: '25%', left: '6%' }, difficulty: 'Сложный', difficultyLevel: 3, description: 'Пик Юбилейная — красивейший пик Заилийского Алатау на западной стороне хребта.', routeStats: { distance: '22 км', elevationGain: '1729 м', duration: '12 ч' }, weather: { temp: -2, feelsLike: -6, humidity: 55, windSpeed: 15, windDirection: 'СЗ', tempMax: 3, tempMin: -8, description: 'Облачно, без осадков', icon: '⛅' }, weatherForecast: [{ time: 'Ночь', temp: -8, icon: '🌙' }, { time: 'Утро', temp: -2, icon: '⛅' }, { time: 'День', temp: 3, icon: '🌤️' }, { time: 'Вечер', temp: -1, icon: '🌙' }], hourlyForecast: [{ hour: '06:00', temp: -5, icon: '🌙', humidity: 60, wind: 10 }, { hour: '09:00', temp: -2, icon: '⛅', humidity: 55, wind: 12 }, { hour: '12:00', temp: 2, icon: '🌤️', humidity: 50, wind: 15 }, { hour: '15:00', temp: 3, icon: '☀️', humidity: 45, wind: 15 }, { hour: '18:00', temp: 0, icon: '⛅', humidity: 55, wind: 12 }, { hour: '21:00', temp: -3, icon: '🌙', humidity: 60, wind: 10 }, { hour: '00:00', temp: -6, icon: '🌙', humidity: 65, wind: 8 }, { hour: '03:00', temp: -7, icon: '🌙', humidity: 65, wind: 8 }], routes: [{ name: 'Основной маршрут', duration: '12 ч', distance: '22 км', elevationGain: '1729 м', difficulty: 'Сложный', terrain: 'Тропа, осыпь, скалы', description: 'Маршрут от Шымбулака через альпийские луга.', highlights: ['Альпийские луга', 'Вид на Алмату'], friendHikeUrl: '' }], equipment: [{ category: 'ОДЕЖДА', items: [{ name: 'Ботинки', essential: true }, { name: 'Штаны', essential: true }, { name: 'Куртка', essential: true }, { name: 'Утеплённая куртка', essential: true }] }, { category: 'СНАРЯЖЕНИЕ', items: [{ name: 'Рюкзак 40-50 л', essential: true }, { name: 'Палки', essential: true }, { name: 'Навигатор', essential: true }, { name: 'Фонарик', essential: true }] }, { category: 'ПРОДУКТЫ', items: [{ name: 'Вода 2 л', essential: true }, { name: 'Батончики', essential: true }] }, { category: 'МЕДИЦИНА', items: [{ name: 'Аптечка', essential: true }] }], safety: { rules: ['Изучите маршрут', 'Возьмите телефон', 'Начинайте рано'], emergencyContacts: [{ label: 'МЧС', number: '112' }], tips: ['Возьмите воду'] }, photos: [], category: 'peak' },
    { id: 'talgar', name: 'Пик Талгар', nameKz: 'Талғар шыңы', nameEn: 'Talgar Peak', elevation: 5017, coordinates: { lat: 43.150, lng: 77.050 }, mapPosition: { top: '12%', left: '10%' }, difficulty: 'Очень сложный', difficultyLevel: 4, description: 'Пик Талгар — высочайший пик Заилийского Алатау (5017 м). Альпинистское восхождение.', routeStats: { distance: '26 км', elevationGain: '2817 м', duration: '18 ч' }, weather: { temp: -15, feelsLike: -25, humidity: 70, windSpeed: 25, windDirection: 'С', tempMax: -10, tempMin: -22, description: 'Снег, сильный ветер', icon: '❄️' }, weatherForecast: [{ time: 'Ночь', temp: -22, icon: '❄️' }, { time: 'Утро', temp: -18, icon: '🌨️' }, { time: 'День', temp: -10, icon: '⛅' }, { time: 'Вечер', temp: -15, icon: '❄️' }], hourlyForecast: [{ hour: '06:00', temp: -20, icon: '❄️', humidity: 75, wind: 20 }, { hour: '09:00', temp: -16, icon: '🌨️', humidity: 70, wind: 22 }, { hour: '12:00', temp: -12, icon: '⛅', humidity: 65, wind: 25 }, { hour: '15:00', temp: -10, icon: '☀️', humidity: 60, wind: 25 }, { hour: '18:00', temp: -14, icon: '🌨️', humidity: 70, wind: 20 }, { hour: '21:00', temp: -18, icon: '❄️', humidity: 75, wind: 18 }, { hour: '00:00', temp: -21, icon: '❄️', humidity: 78, wind: 15 }, { hour: '03:00', temp: -22, icon: '❄️', humidity: 80, wind: 15 }], routes: [{ name: 'Южный маршрут', duration: '18 ч', distance: '26 км', elevationGain: '2817 м', difficulty: 'Очень сложный', terrain: 'Ледник, скалы, снег', description: 'Альпинистский маршрут через ледник Талгар.', highlights: ['Ледник Талгар', 'Вершина 5017 м'], friendHikeUrl: 'https://friendhike.com/mountains/kazakhstan/pik-talgar/' }], equipment: [{ category: 'АЛЬПИНИСТСКОЕ', items: [{ name: 'Каска', essential: true }, { name: 'Верёвка', essential: true }, { name: 'Ледоруб', essential: true }, { name: 'Кошки', essential: true }] }, { category: 'ОДЕЖДА', items: [{ name: 'Альпинистские ботинки', essential: true }, { name: 'Утеплённая куртка', essential: true }, { name: 'Балаклава', essential: true }] }, { category: 'СНАРЯЖЕНИЕ', items: [{ name: 'Рюкзак 60-70 л', essential: true }, { name: 'Навигатор', essential: true }, { name: 'Термос', essential: true }] }, { category: 'МЕДИЦИНА', items: [{ name: 'Аптечка', essential: true }] }], safety: { rules: ['Только для опытных альпинистов', 'Обязательно верёвка и кошки'], emergencyContacts: [{ label: 'МЧС', number: '112' }], tips: ['Берите термос'] }, photos: [], category: 'peak' },
    { id: 'furmanova', name: 'Пик Фурманова', nameKz: 'Фурманов шыңы', nameEn: 'Furmanov Peak', elevation: 3053, coordinates: { lat: 43.130, lng: 76.980 }, mapPosition: { top: '30%', left: '24%' }, difficulty: 'Лёгкий', difficultyLevel: 1, description: 'Пик Фурманова — доступный пик для начинающих. Высота 3053 м.', routeStats: { distance: '14 км', elevationGain: '853 м', duration: '6 ч' }, weather: { temp: 2, feelsLike: -2, humidity: 50, windSpeed: 10, windDirection: 'ЮЗ', tempMax: 8, tempMin: -2, description: 'Облачно, без осадков', icon: '⛅' }, weatherForecast: [{ time: 'Ночь', temp: -2, icon: '🌙' }, { time: 'Утро', temp: 2, icon: '⛅' }, { time: 'День', temp: 8, icon: '🌤️' }, { time: 'Вечер', temp: 3, icon: '🌙' }], hourlyForecast: [{ hour: '06:00', temp: 0, icon: '🌙', humidity: 55, wind: 8 }, { hour: '09:00', temp: 3, icon: '⛅', humidity: 50, wind: 10 }, { hour: '12:00', temp: 7, icon: '🌤️', humidity: 45, wind: 10 }, { hour: '15:00', temp: 8, icon: '☀️', humidity: 40, wind: 10 }, { hour: '18:00', temp: 4, icon: '⛅', humidity: 50, wind: 8 }, { hour: '21:00', temp: 1, icon: '🌙', humidity: 55, wind: 6 }, { hour: '00:00', temp: -1, icon: '🌙', humidity: 60, wind: 5 }, { hour: '03:00', temp: -2, icon: '🌙', humidity: 60, wind: 5 }], routes: [{ name: 'Основной маршрут', duration: '6 ч', distance: '14 км', elevationGain: '853 м', difficulty: 'Лёгкий', terrain: 'Тропа, лес', description: 'Маршрут от Шымбулака через лес и луга.', highlights: ['Лесная зона', 'Альпийские луга'], friendHikeUrl: 'https://friendhike.com/mountains/kazakhstan/pik-furmanova/' }], equipment: [{ category: 'ОДЕЖДА', items: [{ name: 'Ветровка', essential: true }, { name: 'Куртка', essential: true }, { name: 'Штаны', essential: true }, { name: 'Ботинки', essential: true }] }, { category: 'СНАРЯЖЕНИЕ', items: [{ name: 'Рюкзак 30-40 л', essential: true }, { name: 'Навигатор', essential: true }] }, { category: 'ПРОДУКТЫ', items: [{ name: 'Вода 1.5 л', essential: true }] }, { category: 'МЕДИЦИНА', items: [{ name: 'Аптечка', essential: true }] }], safety: { rules: ['Изучите маршрут', 'Возьмите телефон'], emergencyContacts: [{ label: 'МЧС', number: '112' }], tips: ['Возьмите воду'] }, photos: [], category: 'peak' },
    { id: 'panorama', name: 'Пик Панорама', nameKz: 'Панорама шыңы', nameEn: 'Panorama Peak', elevation: 3053, coordinates: { lat: 43.135, lng: 76.990 }, mapPosition: { top: '28%', left: '32%' }, difficulty: 'Лёгкий', difficultyLevel: 1, description: 'Пик Панорама — панорамные виды на Алмату.', routeStats: { distance: '14 км', elevationGain: '853 м', duration: '6 ч' }, weather: { temp: 2, feelsLike: -2, humidity: 50, windSpeed: 10, windDirection: 'ЮЗ', tempMax: 8, tempMin: -2, description: 'Облачно', icon: '⛅' }, weatherForecast: [{ time: 'Ночь', temp: -2, icon: '🌙' }, { time: 'Утро', temp: 2, icon: '⛅' }, { time: 'День', temp: 8, icon: '🌤️' }, { time: 'Вечер', temp: 3, icon: '🌙' }], hourlyForecast: [{ hour: '06:00', temp: 0, icon: '🌙', humidity: 55, wind: 8 }, { hour: '09:00', temp: 3, icon: '⛅', humidity: 50, wind: 10 }, { hour: '12:00', temp: 7, icon: '🌤️', humidity: 45, wind: 10 }, { hour: '15:00', temp: 8, icon: '☀️', humidity: 40, wind: 10 }, { hour: '18:00', temp: 4, icon: '⛅', humidity: 50, wind: 8 }, { hour: '21:00', temp: 1, icon: '🌙', humidity: 55, wind: 6 }, { hour: '00:00', temp: -1, icon: '🌙', humidity: 60, wind: 5 }, { hour: '03:00', temp: -2, icon: '🌙', humidity: 60, wind: 5 }], routes: [{ name: 'Основной маршрут', duration: '6 ч', distance: '14 км', elevationGain: '853 м', difficulty: 'Лёгкий', terrain: 'Тропа, лес', description: 'Маршрут от Шымбулака через лес.', highlights: ['Панорамный вид', 'Альпийские луга'], friendHikeUrl: '' }], equipment: [{ category: 'ОДЕЖДА', items: [{ name: 'Ветровка', essential: true }, { name: 'Куртка', essential: true }, { name: 'Штаны', essential: true }, { name: 'Ботинки', essential: true }] }, { category: 'СНАРЯЖЕНИЕ', items: [{ name: 'Рюкзак 30-40 л', essential: true }, { name: 'Навигатор', essential: true }] }, { category: 'ПРОДУКТЫ', items: [{ name: 'Вода 1.5 л', essential: true }] }, { category: 'МЕДИЦИНА', items: [{ name: 'Аптечка', essential: true }] }], safety: { rules: ['Изучите маршрут', 'Возьмите телефон'], emergencyContacts: [{ label: 'МЧС', number: '112' }], tips: ['Возьмите воду'] }, photos: [], category: 'peak' },
    { id: 'bashuta', name: 'Пик Башута', nameKz: 'Башута шыңы', nameEn: 'Bashuta Peak', elevation: 3355, coordinates: { lat: 43.140, lng: 77.000 }, mapPosition: { top: '34.04255319148936%', left: '43%' }, difficulty: 'Лёгкий', difficultyLevel: 1, description: 'Пик Башута — лёгкий маршрут, высота 3355 м.', routeStats: { distance: '16 км', elevationGain: '1155 м', duration: '8 ч' }, weather: { temp: 0, feelsLike: -4, humidity: 55, windSpeed: 12, windDirection: 'С', tempMax: 5, tempMin: -5, description: 'Облачно, ветер', icon: '⛅' }, weatherForecast: [{ time: 'Ночь', temp: -5, icon: '🌙' }, { time: 'Утро', temp: 0, icon: '⛅' }, { time: 'День', temp: 5, icon: '🌤️' }, { time: 'Вечер', temp: 1, icon: '🌙' }], hourlyForecast: [{ hour: '06:00', temp: -3, icon: '🌙', humidity: 60, wind: 10 }, { hour: '09:00', temp: 1, icon: '⛅', humidity: 55, wind: 12 }, { hour: '12:00', temp: 4, icon: '🌤️', humidity: 50, wind: 12 }, { hour: '15:00', temp: 5, icon: '☀️', humidity: 45, wind: 12 }, { hour: '18:00', temp: 2, icon: '⛅', humidity: 55, wind: 10 }, { hour: '21:00', temp: -1, icon: '🌙', humidity: 60, wind: 8 }, { hour: '00:00', temp: -3, icon: '🌙', humidity: 65, wind: 6 }, { hour: '03:00', temp: -4, icon: '🌙', humidity: 65, wind: 6 }], routes: [{ name: 'Основной маршрут', duration: '8 ч', distance: '16 км', elevationGain: '1155 м', difficulty: 'Лёгкий', terrain: 'Тропа, осыпь', description: 'Маршрут от Шымбулака через лес и осыпь.', highlights: ['Лесная зона', 'Осыпь'], friendHikeUrl: 'https://friendhike.com/mountains/kazakhstan/pik-bashuta/' }], equipment: [{ category: 'ОДЕЖДА', items: [{ name: 'Ботинки', essential: true }, { name: 'Штаны', essential: true }, { name: 'Куртка', essential: true }, { name: 'Утеплённая куртка', essential: true }] }, { category: 'СНАРЯЖЕНИЕ', items: [{ name: 'Рюкзак 40-50 л', essential: true }, { name: 'Палки', essential: true }, { name: 'Навигатор', essential: true }, { name: 'Фонарик', essential: true }] }, { category: 'ПРОДУКТЫ', items: [{ name: 'Вода 2 л', essential: true }, { name: 'Батончики', essential: true }] }, { category: 'МЕДИЦИНА', items: [{ name: 'Аптечка', essential: true }] }], safety: { rules: ['Изучите маршрут', 'Возьмите телефон', 'Начинайте рано'], emergencyContacts: [{ label: 'МЧС', number: '112' }], tips: ['Возьмите воду'] }, photos: [], category: 'peak' },
    { id: 'chimbulaka', name: 'Пик Чимбулачка', nameKz: 'Шымбулақ шыңы', nameEn: 'Chimbulachka Peak', elevation: 3458, coordinates: { lat: 43.145, lng: 77.010 }, mapPosition: { top: '24%', left: '43%' }, difficulty: 'Лёгкий', difficultyLevel: 1, description: 'Пик Чимбулачка — лёгкий маршрут высотой 3458 м.', routeStats: { distance: '16 км', elevationGain: '1258 м', duration: '8 ч' }, weather: { temp: 0, feelsLike: -4, humidity: 55, windSpeed: 12, windDirection: 'С', tempMax: 5, tempMin: -5, description: 'Облачно', icon: '⛅' }, weatherForecast: [{ time: 'Ночь', temp: -5, icon: '🌙' }, { time: 'Утро', temp: 0, icon: '⛅' }, { time: 'День', temp: 5, icon: '🌤️' }, { time: 'Вечер', temp: 1, icon: '🌙' }], hourlyForecast: [{ hour: '06:00', temp: -3, icon: '🌙', humidity: 60, wind: 10 }, { hour: '09:00', temp: 1, icon: '⛅', humidity: 55, wind: 12 }, { hour: '12:00', temp: 4, icon: '🌤️', humidity: 50, wind: 12 }, { hour: '15:00', temp: 5, icon: '☀️', humidity: 45, wind: 12 }, { hour: '18:00', temp: 2, icon: '⛅', humidity: 55, wind: 10 }, { hour: '21:00', temp: -1, icon: '🌙', humidity: 60, wind: 8 }, { hour: '00:00', temp: -3, icon: '🌙', humidity: 65, wind: 6 }, { hour: '03:00', temp: -4, icon: '🌙', humidity: 65, wind: 6 }], routes: [{ name: 'Основной маршрут', duration: '8 ч', distance: '16 км', elevationGain: '1258 м', difficulty: 'Лёгкий', terrain: 'Тропа, осыпь', description: 'Маршрут от Чимбулака.', highlights: ['Курорт', 'Лес'], friendHikeUrl: 'https://friendhike.com/mountains/kazakhstan/gora-chimbulak/' }], equipment: [{ category: 'ОДЕЖДА', items: [{ name: 'Ботинки', essential: true }, { name: 'Штаны', essential: true }, { name: 'Куртка', essential: true }] }, { category: 'СНАРЯЖЕНИЕ', items: [{ name: 'Рюкзак 40-50 л', essential: true }, { name: 'Палки', essential: true }, { name: 'Навигатор', essential: true }] }, { category: 'ПРОДУКТЫ', items: [{ name: 'Вода 2 л', essential: true }] }, { category: 'МЕДИЦИНА', items: [{ name: 'Аптечка', essential: true }] }], safety: { rules: ['Изучите маршрут', 'Возьмите телефон'], emergencyContacts: [{ label: 'МЧС', number: '112' }], tips: ['Возьмите воду'] }, photos: [], category: 'peak' },
    { id: 'chkalova', name: 'Пик Чкалова', nameKz: 'Чкалов шыңы', nameEn: 'Chkalov Peak', elevation: 3892, coordinates: { lat: 43.155, lng: 77.030 }, mapPosition: { top: '20%', left: '50%' }, difficulty: 'Средний', difficultyLevel: 2, description: 'Пик Чкалова высотой 3892 м.', routeStats: { distance: '18 км', elevationGain: '1692 м', duration: '10 ч' }, weather: { temp: -3, feelsLike: -8, humidity: 55, windSpeed: 15, windDirection: 'С', tempMax: 2, tempMin: -10, description: 'Облачно, ветер', icon: '⛅' }, weatherForecast: [{ time: 'Ночь', temp: -10, icon: '❄️' }, { time: 'Утро', temp: -3, icon: '⛅' }, { time: 'День', temp: 2, icon: '🌤️' }, { time: 'Вечер', temp: -2, icon: '🌙' }], hourlyForecast: [{ hour: '06:00', temp: -7, icon: '🌙', humidity: 60, wind: 12 }, { hour: '09:00', temp: -2, icon: '⛅', humidity: 55, wind: 14 }, { hour: '12:00', temp: 1, icon: '🌤️', humidity: 50, wind: 15 }, { hour: '15:00', temp: 2, icon: '☀️', humidity: 45, wind: 15 }, { hour: '18:00', temp: -1, icon: '⛅', humidity: 55, wind: 12 }, { hour: '21:00', temp: -4, icon: '🌙', humidity: 60, wind: 10 }, { hour: '00:00', temp: -6, icon: '🌙', humidity: 65, wind: 8 }, { hour: '03:00', temp: -8, icon: '🌙', humidity: 68, wind: 8 }], routes: [{ name: 'Основной маршрут', duration: '10 ч', distance: '18 км', elevationGain: '1692 м', difficulty: 'Средний', terrain: 'Тропа, осыпь, снег', description: 'Маршрут от Шымбулака.', highlights: ['Луга', 'Осыпи'], friendHikeUrl: 'https://friendhike.com/mountains/kazakhstan/chkalov-w9xncw/' }], equipment: [{ category: 'ОДЕЖДА', items: [{ name: 'Ботинки', essential: true }, { name: 'Штаны', essential: true }, { name: 'Куртка', essential: true }, { name: 'Утеплённая куртка', essential: true }] }, { category: 'СНАРЯЖЕНИЕ', items: [{ name: 'Рюкзак 40-50 л', essential: true }, { name: 'Палки', essential: true }, { name: 'Навигатор', essential: true }, { name: 'Фонарик', essential: true }] }, { category: 'ПРОДУКТЫ', items: [{ name: 'Вода 2 л', essential: true }, { name: 'Батончики', essential: true }] }, { category: 'МЕДИЦИНА', items: [{ name: 'Аптечка', essential: true }] }], safety: { rules: ['Изучите маршрут', 'Возьмите телефон', 'Начинайте рано'], emergencyContacts: [{ label: 'МЧС', number: '112' }], tips: ['Возьмите воду'] }, photos: [], category: 'peak' },
    { id: 'fizkulturnik', name: 'Пик Физкультурник', nameKz: 'Физкультурник шыңы', nameEn: 'Fizkulturnik Peak', elevation: 4068, coordinates: { lat: 43.160, lng: 77.040 }, mapPosition: { top: '16%', left: '56%' }, difficulty: 'Сложный', difficultyLevel: 3, description: 'Пик Физкультурник высотой 4068 м.', routeStats: { distance: '20 км', elevationGain: '1868 м', duration: '12 ч' }, weather: { temp: -8, feelsLike: -15, humidity: 60, windSpeed: 18, windDirection: 'С', tempMax: -2, tempMin: -15, description: 'Снег, ветер', icon: '❄️' }, weatherForecast: [{ time: 'Ночь', temp: -15, icon: '❄️' }, { time: 'Утро', temp: -8, icon: '🌨️' }, { time: 'День', temp: -2, icon: '⛅' }, { time: 'Вечер', temp: -6, icon: '❄️' }], hourlyForecast: [{ hour: '06:00', temp: -12, icon: '❄️', humidity: 65, wind: 15 }, { hour: '09:00', temp: -7, icon: '🌨️', humidity: 60, wind: 17 }, { hour: '12:00', temp: -3, icon: '⛅', humidity: 55, wind: 18 }, { hour: '15:00', temp: -2, icon: '☀️', humidity: 50, wind: 18 }, { hour: '18:00', temp: -5, icon: '🌨️', humidity: 60, wind: 15 }, { hour: '21:00', temp: -9, icon: '❄️', humidity: 65, wind: 12 }, { hour: '00:00', temp: -12, icon: '❄️', humidity: 70, wind: 10 }, { hour: '03:00', temp: -14, icon: '❄️', humidity: 72, wind: 10 }], routes: [{ name: 'Основной маршрут', duration: '12 ч', distance: '20 км', elevationGain: '1868 м', difficulty: 'Сложный', terrain: 'Тропа, осыпь, снег', description: 'Маршрут от Шымбулака.', highlights: ['Осыпи', 'Снежные поля'], friendHikeUrl: 'https://friendhike.com/mountains/kazakhstan/pik-fizkulturnik/' }], equipment: [{ category: 'ОДЕЖДА', items: [{ name: 'Ботинки', essential: true }, { name: 'Штаны', essential: true }, { name: 'Куртка', essential: true }, { name: 'Утеплённая куртка', essential: true }, { name: 'Балаклава', essential: true }, { name: 'Перчатки', essential: true }] }, { category: 'СНАРЯЖЕНИЕ', items: [{ name: 'Рюкзак 50-60 л', essential: true }, { name: 'Палки', essential: true }, { name: 'Навигатор', essential: true }, { name: 'Термос', essential: true }] }, { category: 'ПРОДУКТЫ', items: [{ name: 'Вода 2 л', essential: true }, { name: 'Батончики', essential: true }] }, { category: 'МЕДИЦИНА', items: [{ name: 'Аптечка', essential: true }] }], safety: { rules: ['Изучите маршрут', 'Возьмите телефон', 'Начинайте рано', 'Следите за погодой'], emergencyContacts: [{ label: 'МЧС', number: '112' }], tips: ['Возьмите воду', 'Берите термос'] }, photos: [], category: 'peak' },
    { id: 'khalysau', name: 'Пик Халытау', nameKz: 'Халытау шыңы', nameEn: 'Khalysau Peak', elevation: 4150, coordinates: { lat: 43.165, lng: 77.055 }, mapPosition: { top: '15%', left: '62%' }, difficulty: 'Сложный', difficultyLevel: 3, description: 'Пик Халытау высотой 4150 м.', routeStats: { distance: '20 км', elevationGain: '1950 м', duration: '12 ч' }, weather: { temp: -10, feelsLike: -18, humidity: 60, windSpeed: 20, windDirection: 'С', tempMax: -4, tempMin: -18, description: 'Снег, сильный ветер', icon: '🌨️' }, weatherForecast: [{ time: 'Ночь', temp: -18, icon: '❄️' }, { time: 'Утро', temp: -10, icon: '🌨️' }, { time: 'День', temp: -4, icon: '⛅' }, { time: 'Вечер', temp: -8, icon: '❄️' }], hourlyForecast: [{ hour: '06:00', temp: -15, icon: '❄️', humidity: 65, wind: 17 }, { hour: '09:00', temp: -9, icon: '🌨️', humidity: 60, wind: 19 }, { hour: '12:00', temp: -5, icon: '⛅', humidity: 55, wind: 20 }, { hour: '15:00', temp: -4, icon: '☀️', humidity: 50, wind: 20 }, { hour: '18:00', temp: -7, icon: '🌨️', humidity: 60, wind: 17 }, { hour: '21:00', temp: -11, icon: '❄️', humidity: 65, wind: 14 }, { hour: '00:00', temp: -14, icon: '❄️', humidity: 70, wind: 12 }, { hour: '03:00', temp: -16, icon: '❄️', humidity: 72, wind: 12 }], routes: [{ name: 'Основной маршрут', duration: '12 ч', distance: '20 км', elevationGain: '1950 м', difficulty: 'Сложный', terrain: 'Тропа, осыпь, снег', description: 'Маршрут от Шымбулака.', highlights: ['Осыпи', 'Снежные поля'], friendHikeUrl: '' }], equipment: [{ category: 'ОДЕЖДА', items: [{ name: 'Ботинки', essential: true }, { name: 'Штаны', essential: true }, { name: 'Куртка', essential: true }, { name: 'Утеплённая куртка', essential: true }, { name: 'Балаклава', essential: true }, { name: 'Перчатки', essential: true }] }, { category: 'СНАРЯЖЕНИЕ', items: [{ name: 'Рюкзак 50-60 л', essential: true }, { name: 'Палки', essential: true }, { name: 'Навигатор', essential: true }, { name: 'Термос', essential: true }] }, { category: 'ПРОДУКТЫ', items: [{ name: 'Вода 2 л', essential: true }, { name: 'Батончики', essential: true }] }, { category: 'МЕДИЦИНА', items: [{ name: 'Аптечка', essential: true }] }], safety: { rules: ['Изучите маршрут', 'Возьмите телефон', 'Начинайте рано', 'Следите за погодой'], emergencyContacts: [{ label: 'МЧС', number: '112' }], tips: ['Возьмите воду', 'Берите термос'] }, photos: [], category: 'peak' },
    { id: 'tri-brata', name: 'Три Брата', nameKz: 'Үш Ағайын', nameEn: 'Three Brothers', elevation: 2655, coordinates: { lat: 43.170, lng: 77.070 }, mapPosition: { top: '28%', left: '90%' }, difficulty: 'Лёгкий', difficultyLevel: 1, description: 'Три Брата — группа пиков 2655 м. Маршрут для начинающих.', routeStats: { distance: '10 км', elevationGain: '455 м', duration: '4 ч' }, weather: { temp: 5, feelsLike: 0, humidity: 50, windSpeed: 8, windDirection: 'Ю', tempMax: 10, tempMin: 0, description: 'Облачно', icon: '⛅' }, weatherForecast: [{ time: 'Ночь', temp: 0, icon: '🌙' }, { time: 'Утро', temp: 5, icon: '⛅' }, { time: 'День', temp: 10, icon: '🌤️' }, { time: 'Вечер', temp: 6, icon: '🌙' }], hourlyForecast: [{ hour: '06:00', temp: 2, icon: '🌙', humidity: 55, wind: 6 }, { hour: '09:00', temp: 5, icon: '⛅', humidity: 50, wind: 8 }, { hour: '12:00', temp: 9, icon: '🌤️', humidity: 45, wind: 8 }, { hour: '15:00', temp: 10, icon: '☀️', humidity: 40, wind: 8 }, { hour: '18:00', temp: 7, icon: '⛅', humidity: 50, wind: 6 }, { hour: '21:00', temp: 3, icon: '🌙', humidity: 55, wind: 5 }, { hour: '00:00', temp: 1, icon: '🌙', humidity: 60, wind: 4 }, { hour: '03:00', temp: 0, icon: '🌙', humidity: 60, wind: 4 }], routes: [{ name: 'Основной маршрут', duration: '4 ч', distance: '10 км', elevationGain: '455 м', difficulty: 'Лёгкий', terrain: 'Тропа, лес', description: 'Маршрут от Шымбулака через лес.', highlights: ['Лес', 'Три вершины'], friendHikeUrl: '' }], equipment: [{ category: 'ОДЕЖДА', items: [{ name: 'Ветровка', essential: true }, { name: 'Куртка', essential: true }, { name: 'Штаны', essential: true }, { name: 'Ботинки', essential: true }] }, { category: 'СНАРЯЖЕНИЕ', items: [{ name: 'Рюкзак 30-40 л', essential: true }, { name: 'Навигатор', essential: true }] }, { category: 'ПРОДУКТЫ', items: [{ name: 'Вода 1.5 л', essential: true }] }, { category: 'МЕДИЦИНА', items: [{ name: 'Аптечка', essential: true }] }], safety: { rules: ['Изучите маршрут', 'Возьмите телефон'], emergencyContacts: [{ label: 'МЧС', number: '112' }], tips: ['Возьмите воду'] }, photos: [], category: 'mountain' },
    { id: 'kos-kainu', name: 'Кок-Жайляу', nameKz: 'Көкжайлау', nameEn: 'Kok-Zhailyau', elevation: 2200, coordinates: { lat: 43.175, lng: 77.080 }, mapPosition: { top: '45%', left: '88%' }, difficulty: 'Лёгкий', difficultyLevel: 1, description: 'Кок-Жайляу — вершина 2200 м. Самый доступный маршрут.', routeStats: { distance: '8 км', elevationGain: '400 м', duration: '3 ч' }, weather: { temp: 8, feelsLike: 3, humidity: 50, windSpeed: 6, windDirection: 'Ю', tempMax: 13, tempMin: 3, description: 'Облачно', icon: '⛅' }, weatherForecast: [{ time: 'Ночь', temp: 3, icon: '🌙' }, { time: 'Утро', temp: 8, icon: '⛅' }, { time: 'День', temp: 13, icon: '🌤️' }, { time: 'Вечер', temp: 9, icon: '🌙' }], hourlyForecast: [{ hour: '06:00', temp: 5, icon: '🌙', humidity: 55, wind: 5 }, { hour: '09:00', temp: 8, icon: '⛅', humidity: 50, wind: 6 }, { hour: '12:00', temp: 12, icon: '🌤️', humidity: 45, wind: 6 }, { hour: '15:00', temp: 13, icon: '☀️', humidity: 40, wind: 6 }, { hour: '18:00', temp: 10, icon: '⛅', humidity: 50, wind: 5 }, { hour: '21:00', temp: 6, icon: '🌙', humidity: 55, wind: 4 }, { hour: '00:00', temp: 4, icon: '🌙', humidity: 60, wind: 3 }, { hour: '03:00', temp: 3, icon: '🌙', humidity: 60, wind: 3 }], routes: [{ name: 'Основной маршрут', duration: '3 ч', distance: '8 км', elevationGain: '400 м', difficulty: 'Лёгкий', terrain: 'Тропа, лес', description: 'Маршрут от Шымбулака через лес.', highlights: ['Лес', 'Семейный'], friendHikeUrl: '' }], equipment: [{ category: 'ОДЕЖДА', items: [{ name: 'Удобная обувь', essential: true }, { name: 'Куртка', essential: true }] }, { category: 'СНАРЯЖЕНИЕ', items: [{ name: 'Рюкзак 20-30 л', essential: true }] }, { category: 'ПРОДУКТЫ', items: [{ name: 'Вода 1 л', essential: true }] }, { category: 'МЕДИЦИНА', items: [{ name: 'Аптечка', essential: true }] }], safety: { rules: ['Изучите маршрут', 'Возьмите телефон'], emergencyContacts: [{ label: 'МЧС', number: '112' }], tips: ['Возьмите воду'] }, photos: [], category: 'mountain' },


    // ─── Новые пики с фотографии ───

    { id: 'geroi-28', name: '28 Героев Панфиловцев', nameKz: 'Пәнфиловтың 28 қаһарманы', nameEn: '28 Panfilov Heroes', elevation: 3353, coordinates: { lat: 43.142, lng: 77.005 }, mapPosition: { top: '27%', left: '40%' }, difficulty: 'Лёгкий', difficultyLevel: 1, description: 'Пик 28 Героев Панфиловцев — легкий маршрут с красивым для фото взглядом на Алма-Ату.', routeStats: { distance: '12 км', elevationGain: '1153 м', duration: '5 ч' }, weather: { temp: 3, feelsLike: -2, humidity: 52, windSpeed: 10, windDirection: 'СЗ', tempMax: 9, tempMin: -3, description: 'Облачно, без осадков', icon: '⛅' }, weatherForecast: [{ time: 'Ночь', temp: -3, icon: '🌙' }, { time: 'Утро', temp: 3, icon: '⛅' }, { time: 'День', temp: 9, icon: '🌤️' }, { time: 'Вечер', temp: 4, icon: '🌙' }], hourlyForecast: [{ hour: '06:00', temp: 0, icon: '🌙', humidity: 58, wind: 8 }, { hour: '09:00', temp: 3, icon: '⛅', humidity: 52, wind: 9 }, { hour: '12:00', temp: 7, icon: '🌤️', humidity: 48, wind: 10 }, { hour: '15:00', temp: 9, icon: '☀️', humidity: 44, wind: 10 }, { hour: '18:00', temp: 5, icon: '⛅', humidity: 52, wind: 8 }, { hour: '21:00', temp: 2, icon: '🌙', humidity: 56, wind: 6 }, { hour: '00:00', temp: 0, icon: '🌙', humidity: 60, wind: 5 }, { hour: '03:00', temp: -1, icon: '🌙', humidity: 62, wind: 5 }], routes: [{ name: 'Основной маршрут', duration: '5 ч', distance: '12 км', elevationGain: '1153 м', difficulty: 'Лёгкий', terrain: 'Тропа, лес', description: 'Маршрут от Шымбулака через лес.', highlights: ['Лес', 'Открытый склон', 'Вид на город'], friendHikeUrl: 'https://friendhike.com/mountains/kazakhstan/geroev-panfilovcev/' }], equipment: [{ category: 'ОДЕЖДА', items: [{ name: 'Куртка', essential: true }, { name: 'Штаны', essential: true }, { name: 'Лёгкие ботинки', essential: true }] }, { category: 'СНАРЯЖЕНИЕ', items: [{ name: 'Рюкзак 30-35 л', essential: true }, { name: 'Навигатор или телефон', essential: true }] }, { category: 'ПРОДУКТЫ', items: [{ name: 'Вода 1.5 л', essential: true }, { name: 'Перекусы', essential: true }] }, { category: 'МЕДИЦИНА', items: [{ name: 'Аптечка', essential: true }] }], safety: { rules: ['Изучите маршрут', 'Возьмите телефон', 'Оставьте слово'], emergencyContacts: [{ label: 'МЧС', number: '112' }], tips: ['Возьмите воду'] }, photos: [], category: 'peak' },

    { id: 'karinznij', name: 'Карнизный', nameKz: 'Карниз төбесі', nameEn: 'Karnizny Peak', elevation: 3888, coordinates: { lat: 43.148, lng: 77.015 }, mapPosition: { top: '18%', left: '46%' }, difficulty: 'Средний', difficultyLevel: 2, description: 'Карнизный — средний пик с хорошим обзором хребта. Доступен при хорошей погоде.', routeStats: { distance: '16 км', elevationGain: '1688 м', duration: '7 ч' }, weather: { temp: -1, feelsLike: -5, humidity: 54, windSpeed: 12, windDirection: 'С', tempMax: 4, tempMin: -8, description: 'Облачно, ветер', icon: '⛅' }, weatherForecast: [{ time: 'Ночь', temp: -8, icon: '🌙' }, { time: 'Утро', temp: -1, icon: '⛅' }, { time: 'День', temp: 4, icon: '🌤️' }, { time: 'Вечер', temp: 0, icon: '🌙' }], hourlyForecast: [{ hour: '06:00', temp: -5, icon: '🌙', humidity: 60, wind: 10 }, { hour: '09:00', temp: -1, icon: '⛅', humidity: 54, wind: 12 }, { hour: '12:00', temp: 3, icon: '🌤️', humidity: 49, wind: 12 }, { hour: '15:00', temp: 4, icon: '☀️', humidity: 45, wind: 12 }, { hour: '18:00', temp: 1, icon: '⛅', humidity: 54, wind: 10 }, { hour: '21:00', temp: -2, icon: '🌙', humidity: 58, wind: 8 }, { hour: '00:00', temp: -4, icon: '🌙', humidity: 62, wind: 7 }, { hour: '03:00', temp: -6, icon: '🌙', humidity: 64, wind: 7 }], routes: [{ name: 'Основной маршрут', duration: '7 ч', distance: '16 км', elevationGain: '1688 м', difficulty: 'Средний', terrain: 'Тропа, осыпь, ледник', description: 'Маршрут от Шымбулака через ледник.', highlights: ['Ледник', 'Конус карниза', 'Вид на Алма-Ату'], friendHikeUrl: '' }], equipment: [{ category: 'ОДЕЖДА', items: [{ name: 'Тренировочные ботинки', essential: true }, { name: 'Штаны', essential: true }, { name: 'Куртка', essential: true }, { name: 'Утеплённая куртка', essential: true }] }, { category: 'СНАРЯЖЕНИЕ', items: [{ name: 'Рюкзак 40-50 л', essential: true }, { name: 'Палки', essential: true }, { name: 'Навигатор', essential: true }, { name: 'Фонарик', essential: true }] }, { category: 'ПРОДУКТЫ', items: [{ name: 'Вода 2 л', essential: true }, { name: 'Батончики и сухарики', essential: true }] }, { category: 'МЕДИЦИНА', items: [{ name: 'Аптечка', essential: true }, { name: 'Пластырь для лезвий', essential: false }] }], safety: { rules: ['Изучите маршрут', 'Возьмите телефон', 'Оцените погоду', 'Оствьтесь с группой'], emergencyContacts: [{ label: 'МЧС', number: '112' }], tips: ['Возьмите воду и термос', 'Не спускайтесь в одиночку'] }, photos: [], category: 'peak' },
]
