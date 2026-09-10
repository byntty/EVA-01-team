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
  /** Alternative names — searchable but not shown in UI */
  altNames?: string[]
  elevation: number
  coordinates: { lat: number; lng: number }
  mapPosition: { top: string; left: string }
  difficulty: string
  difficultyLevel: 1 | 2 | 3 | 4
  description: string
  routeStats: RouteStats
  routes: Route[]
  equipment: EquipmentCategory[]
  safety: Safety
  photos: string[]
  /** Фото таблички вершины в блоке маршрута (путь вида /alataupeaks/photos/<id>/sign.jpg) */
  signPhoto?: string
  /** Скрыть маркер с интерактивной карты (пик остаётся в поиске и каталоге) */
  hiddenOnMap?: boolean
  /** Показать страницу «В разработке» вместо деталей */
  inDevelopment?: boolean
  /** Пики траверса в порядке прохождения (для страницы траверса) */
  traversePeaks?: string[]
  category: PeakCategory
}

export function getPeakById(id: string): Peak | undefined {
  return peaksData.find((p) => p.id === id)
}

export function searchPeaks(query: string): Peak[] {
  const q = query.toLowerCase().trim()
  if (!q) return []
  return peaksData.filter((p) => {
    if (
      p.name.toLowerCase().includes(q) ||
      p.nameKz.toLowerCase().includes(q) ||
      p.nameEn.toLowerCase().includes(q)
    )
      return true
    return (p.altNames ?? []).some((alt) => alt.toLowerCase().includes(q))
  })
}

export const peaksData: Peak[] = [
  {
    id: 'khreshchatyj', hiddenOnMap: true,
    name: 'Пик Хрищатого',
    nameKz: 'Хрищатого шыңы',
    nameEn: 'Khrishchatogo Peak',
    altNames: ['Пик Хрещатий', 'Хрещатий', 'Khrishchatogo', 'Khreshchaty'],
    elevation: 3950,
    coordinates: { lat: 43.08761, lng: 77.09589 },
    mapPosition: { top: '28%', left: '42%' },
    difficulty: 'Средний',
    difficultyLevel: 2,
    description:
      'Пик Хрищатого (3950 м) — один из самых красивых пиков Заилийского Алатау. Маршрут проходит через живописные альпийские луга и каменистые осыпи с потрясающими видами на окрестные горы и ледники.',
    routeStats: {
      distance: '18 км',
      elevationGain: '1600 м',
      duration: '14 ч',
    },
    
    
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
    signPhoto: '/alataupeaks/photos/hrichatogo/sign.jpg', photos: ['/alataupeaks/photos/hrichatogo/1.jpg','/alataupeaks/photos/hrichatogo/2.jpg','/alataupeaks/photos/hrichatogo/3.jpg','/alataupeaks/photos/hrichatogo/4.jpg','/alataupeaks/photos/hrichatogo/5.jpg'],
  },
  {
    id: 'turist', hiddenOnMap: true,
    name: 'Пик Туристов',
    nameKz: 'Туристер шыңы',
    nameEn: 'Pik Turistov',
    elevation: 3974,
    coordinates: { lat: 43.028767, lng: 76.952073 },
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
    signPhoto: '/alataupeaks/photos/tourist/sign.jpg', photos: [],
  }, 
{
      id: 'Kumbel',
    name: 'Пик Кумбель',
    nameKz: 'Құмбел шыңы',
    nameEn: 'Peak Kumbel',
    altNames: ['Kumbel', 'Кумбельтау', 'Кумбелтау'],
    elevation: 3180,
    coordinates: { lat: 43.118277, lng: 77.032442 },
    mapPosition: { top: '31.72%', left: '75%' },
    difficulty: 'Лёгкий',
    difficultyLevel: 1,
    description:
      'Панорамный пик (3180 м) в гребне Кумбель. Доступный маршрут с широким видом на Заилийский Алатау и Алматы — отличный вариант для первого опыта.', 
    routeStats: {
      distance: '20 км',
      elevationGain: '1030 м',
      duration: '7 ч',
    },
    
    
    routes: [
      {
        name: 'Маршрут через плато Кок-Жайляу',
        duration: '7 ч',
        distance: '20 км',
        elevationGain: '1839 м',
        difficulty: 'Легкий',
        terrain: 'Тропа → гребень',
        description:
          'Доступный маршрут для любителей пешего туризма и треккинга. Включает подъем по грунтовым тропам и выположенным травянисто-осыпным склонам без технического снаряжения.',
        highlights: [
          'Вершина — высшая точка маршрута',
          'Вершинный гребень',
        ],

        guruMapsFile: '/guru/manas-sw.guru',
      },
    ],
    equipment: [
      {
        category: 'Одежда',
        items: [  
          { name: 'Термобелье', essential: true },
          { name: 'Ветровка', essential: true },
         { name: 'Штаны', essential: true },
         { name: 'Трекинговые ботинки', essential: true },
        ],
      },
       {
        category: 'Экипировка',
        items: [  
          { name: 'Рюкзак 30-40 л', essential: true },
         { name: 'Трекинговые палки', essential: true },
        ],
      },
      {
        category: 'Навигация',
        items: [
          { name: 'Установленный GPS-навигатор', essential: true },
          { name: 'Power bank', essential: true },
        ],
      },
      {
        category: 'Питание',
        items: [
          { name: 'Вода (минимум 2 л)', essential: true },
          { name: 'Углеводные закуски(фрукты, батончики, конфетки)', essential: true },
          { name: 'Источники электролитов(при высокой потливости, например регидрон)', essential: false },
          { name: 'Термос с чаем', essential: false },
        ],
      },
      {
        category: 'Безопасность',
        items: [
          { name: 'Аптечка', essential: true },
          { name: 'Солнцезащитный крем SPF 50+', essential: true },
        ],
      },
    ],
    safety: {
      rules: [
 'Следуйте лишь по тропе и не сходите с маршрута',
        'Ориентируйтесь по GPS или ориентирам на маршруте',
        'Желательно не ходить в одиночку, особенно в плохую погоду',
        'Заранее проверяйте прогноз погоды',
      ],
      emergencyContacts: [
        { label: 'МЧС Казахстана', number: '112' },
        { label: 'Служба спасения Алматы', number: '+7-727-250-39-39' },
        { label: 'Горная служба спасения', number: '+7-727-272-25-45' },
        { label: 'Центр управления полётами', number: '+7-727-258-38-00' },
      ],
      tips: [
 'Оптимальное время начала маршрута: до 7:30',
        'Разворот: не позже 14:00 в любом случае',
      ],
    },
      category: 'peak',
    signPhoto: '/alataupeaks/photos/kumbel/sign.jpg', photos: [],
  },

  {
    id: 'bukreev',
    name: 'Пик Букреева',
    nameKz: 'Букреев шыңы',
    nameEn: 'Bukreev Peak',
    elevation: 3010,
    coordinates: { lat: 43.166713, lng: 77.134642 },
    mapPosition: { top: '36.75%', left: '22.6%' },
    difficulty: 'Лёгкий',
    difficultyLevel: 1,
    description:
      'Один из самых высоких и технически сложных пиков Заилийского Алатау. Требует серьёзной альпинистской подготовки, хорошей акклиматизации и опыта высотных восхождений. Длинный маршрут с техническими участками.',
    routeStats: {
      distance: '24 км',
      elevationGain: '1529 м',
      duration: '9 ч',
    },
    
    
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
    photos: [],
  },
  {
    id: 'titov', hiddenOnMap: true,
    name: 'Пик Титова',
    nameKz: 'Титов шыңы',
    nameEn: 'Titov Peak',
    elevation: 3871,
    coordinates: { lat: 43.075026, lng: 77.048696 },
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
    photos: [],
  },

  {
    id: 'Amangeldy', hiddenOnMap: true,
    name: 'Пик Амангельды',
    nameKz: 'Амангельді шыңы',
    nameEn: 'Amangeldy Peak',
    elevation: 3999,
    coordinates: { lat: 43.089722, lng: 77.096944 },
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
    signPhoto: '/alataupeaks/photos/amangeldy/sign.jpg', photos: [],
  },
  {
    id: 'Nursultan',
    name: 'Пик Нурсултан',
    nameKz: 'Нұрсұлтан шыңы',
    nameEn: 'Nursultan Peak',
    elevation: 4376,
    coordinates: { lat: 43.085556, lng: 77.120556 },
    mapPosition: { top: '25.91%', left: '61.73%' },
    difficulty: 'Очень сложный',
    difficultyLevel: 4,
    description:
      'Один из самых высоких и технически сложных пиков Заилийского Алатау. Требует серьёзной альпинистской подготовки, хорошей акклиматизации и опыта высотных восхождений. Длинный маршрут с техническими участками.',
    routeStats: {
      distance: '14 км',
      elevationGain: '1176 м', //начиная с 3200 м(талгарского перевала) до 4376 м
      duration: '9 ч',
    },
    
    
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
    photos: [],
  },
  {
    id: 'Abai',
    name: 'Пик Абай',
    nameKz: 'Абай шыңы',
    nameEn: 'Abai Peak',
    elevation: 4010,
    coordinates: { lat: 43.09139, lng: 77.09722 },
    mapPosition: { top: '28.23%', left: '63.93%' },
    difficulty: 'Сложный',
    difficultyLevel: 3,
    description:
      'Один из самых высоких и технически сложных пиков Заилийского Алатау. Требует серьёзной альпинистской подготовки, хорошей акклиматизации и опыта высотных восхождений. Длинный маршрут с техническими участками.',
    routeStats: {
      distance: '18 км',
      elevationGain: '1810 м', //начиная с 2200 м(шымбулака) до 4010 м
      duration: '8 ч',
    },
    
    
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
    photos: [],
  },
   {
    id: 'Malysh', hiddenOnMap: true,
    name: 'Пик Малыш',
    nameKz: 'Малыш шыңы',
    nameEn: 'Malysh Peak',
    elevation: 3820,
    coordinates: { lat: 43.06586, lng: 77.05686 },
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
    photos: [],
  },
   {
    id: 'Pogrebeskiy', hiddenOnMap: true, //двухднека, есть другой альтернативный маршрут с юга
    name: 'Пик Погребецкого',
    nameKz: 'Погребецкий шыңы',
    nameEn: 'Pogrebetsky Peak',
    elevation: 4231,
    coordinates: { lat: 43.033963, lng: 77.07195 },
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
    photos: [],
  },
    // ========== PEAKS FROM PANORAMA PHOTO ==========
    { id: 'talgar', inDevelopment: true, name: 'Пик Талгар', nameKz: 'Талғар шыңы', nameEn: 'Talgar Peak', elevation: 5017, coordinates: { lat: 43.117778, lng: 77.341389 }, mapPosition: { top: '30.75%', left: '11.46%' }, difficulty: 'Очень сложный', difficultyLevel: 4, description: 'Пик Талгар — высочайший пик Заилийского Алатау (5017 м). Альпинистское восхождение.', routeStats: { distance: '26 км', elevationGain: '2817 м', duration: '18 ч' },    routes: [{ name: 'Южный маршрут', duration: '18 ч', distance: '26 км', elevationGain: '2817 м', difficulty: 'Очень сложный', terrain: 'Ледник, скалы, снег', description: 'Альпинистский маршрут через ледник Талгар.', highlights: ['Ледник Талгар', 'Вершина 5017 м'], }], equipment: [{ category: 'АЛЬПИНИСТСКОЕ', items: [{ name: 'Каска', essential: true }, { name: 'Верёвка', essential: true }, { name: 'Ледоруб', essential: true }, { name: 'Кошки', essential: true }] }, { category: 'ОДЕЖДА', items: [{ name: 'Альпинистские ботинки', essential: true }, { name: 'Утеплённая куртка', essential: true }, { name: 'Балаклава', essential: true }] }, { category: 'СНАРЯЖЕНИЕ', items: [{ name: 'Рюкзак 60-70 л', essential: true }, { name: 'Навигатор', essential: true }, { name: 'Термос', essential: true }] }, { category: 'МЕДИЦИНА', items: [{ name: 'Аптечка', essential: true }] }], safety: { rules: ['Только для опытных альпинистов', 'Обязательно верёвка и кошки'], emergencyContacts: [{ label: 'МЧС', number: '112' }], tips: ['Берите термос'] }, photos: [], category: 'peak' },
    { id: 'furmanova', name: 'Пик Фурманова', nameKz: 'Фурманов шыңы', nameEn: 'Furmanov Peak', elevation: 3053, coordinates: { lat: 43.149454, lng: 77.116494 }, mapPosition: { top: '36.75%', left: '35.46%' }, difficulty: 'Лёгкий', difficultyLevel: 1, description: 'Пик Фурманова — доступный пик для начинающих. Высота 3053 м.', routeStats: { distance: '14 км', elevationGain: '853 м', duration: '6 ч' },    routes: [{ name: 'Основной маршрут', duration: '6 ч', distance: '14 км', elevationGain: '853 м', difficulty: 'Лёгкий', terrain: 'Тропа, лес', description: 'Маршрут от Шымбулака через лес и луга.', highlights: ['Лесная зона', 'Альпийские луга'], }], equipment: [{ category: 'ОДЕЖДА', items: [{ name: 'Ветровка', essential: true }, { name: 'Куртка', essential: true }, { name: 'Штаны', essential: true }, { name: 'Ботинки', essential: true }] }, { category: 'СНАРЯЖЕНИЕ', items: [{ name: 'Рюкзак 30-40 л', essential: true }, { name: 'Навигатор', essential: true }] }, { category: 'ПРОДУКТЫ', items: [{ name: 'Вода 1.5 л', essential: true }] }, { category: 'МЕДИЦИНА', items: [{ name: 'Аптечка', essential: true }] }], safety: { rules: ['Изучите маршрут', 'Возьмите телефон'], emergencyContacts: [{ label: 'МЧС', number: '112' }], tips: ['Возьмите воду'] }, signPhoto: '/alataupeaks/photos/furmanov/sign.jpg', photos: [], category: 'peak' },
    { id: 'panorama', name: 'Пик Панорама', nameKz: 'Панорама шыңы', nameEn: 'Panorama Peak', elevation: 3053, coordinates: { lat: 43.135, lng: 76.990 }, mapPosition: { top: '34.42%', left: '39.13%' }, difficulty: 'Лёгкий', difficultyLevel: 1, description: 'Пик Панорама — панорамные виды на Алмату.', routeStats: { distance: '14 км', elevationGain: '853 м', duration: '6 ч' },    routes: [{ name: 'Основной маршрут', duration: '6 ч', distance: '14 км', elevationGain: '853 м', difficulty: 'Лёгкий', terrain: 'Тропа, лес', description: 'Маршрут от Шымбулака через лес.', highlights: ['Панорамный вид', 'Альпийские луга'], }], equipment: [{ category: 'ОДЕЖДА', items: [{ name: 'Ветровка', essential: true }, { name: 'Куртка', essential: true }, { name: 'Штаны', essential: true }, { name: 'Ботинки', essential: true }] }, { category: 'СНАРЯЖЕНИЕ', items: [{ name: 'Рюкзак 30-40 л', essential: true }, { name: 'Навигатор', essential: true }] }, { category: 'ПРОДУКТЫ', items: [{ name: 'Вода 1.5 л', essential: true }] }, { category: 'МЕДИЦИНА', items: [{ name: 'Аптечка', essential: true }] }], safety: { rules: ['Изучите маршрут', 'Возьмите телефон'], emergencyContacts: [{ label: 'МЧС', number: '112' }], tips: ['Возьмите воду'] }, signPhoto: '/alataupeaks/photos/panorama/sign.jpg', photos: [], category: 'peak' },
    { id: 'bashuta', name: 'Пик Башута', nameKz: 'Башута шыңы', nameEn: 'Bashuta Peak', elevation: 3355, coordinates: { lat: 43.135769, lng: 77.115951 }, mapPosition: { top: '34.04255319148936%', left: '43%' }, difficulty: 'Лёгкий', difficultyLevel: 1, description: 'Пик Башута — лёгкий маршрут, высота 3355 м.', routeStats: { distance: '16 км', elevationGain: '1155 м', duration: '8 ч' },    routes: [{ name: 'Основной маршрут', duration: '8 ч', distance: '16 км', elevationGain: '1155 м', difficulty: 'Лёгкий', terrain: 'Тропа, осыпь', description: 'Маршрут от Шымбулака через лес и осыпь.', highlights: ['Лесная зона', 'Осыпь'], }], equipment: [{ category: 'ОДЕЖДА', items: [{ name: 'Ботинки', essential: true }, { name: 'Штаны', essential: true }, { name: 'Куртка', essential: true }, { name: 'Утеплённая куртка', essential: true }] }, { category: 'СНАРЯЖЕНИЕ', items: [{ name: 'Рюкзак 40-50 л', essential: true }, { name: 'Палки', essential: true }, { name: 'Навигатор', essential: true }, { name: 'Фонарик', essential: true }] }, { category: 'ПРОДУКТЫ', items: [{ name: 'Вода 2 л', essential: true }, { name: 'Батончики', essential: true }] }, { category: 'МЕДИЦИНА', items: [{ name: 'Аптечка', essential: true }] }], safety: { rules: ['Изучите маршрут', 'Возьмите телефон', 'Начинайте рано'], emergencyContacts: [{ label: 'МЧС', number: '112' }], tips: ['Возьмите воду'] }, signPhoto: '/alataupeaks/photos/bashut/sign.jpg', photos: [], category: 'peak' },
    { id: 'chimbulaka', name: 'Пик Чимбулачка', nameKz: 'Шымбулақ шыңы', nameEn: 'Chimbulachka Peak', elevation: 3458, coordinates: { lat: 43.124041, lng: 77.115827 }, mapPosition: { top: '33.84%', left: '47.46%' }, difficulty: 'Лёгкий', difficultyLevel: 1, description: 'Пик Чимбулачка — лёгкий маршрут высотой 3458 м.', routeStats: { distance: '16 км', elevationGain: '1258 м', duration: '8 ч' },    routes: [{ name: 'Основной маршрут', duration: '8 ч', distance: '16 км', elevationGain: '1258 м', difficulty: 'Лёгкий', terrain: 'Тропа, осыпь', description: 'Маршрут от Чимбулака.', highlights: ['Курорт', 'Лес'], }], equipment: [{ category: 'ОДЕЖДА', items: [{ name: 'Ботинки', essential: true }, { name: 'Штаны', essential: true }, { name: 'Куртка', essential: true }] }, { category: 'СНАРЯЖЕНИЕ', items: [{ name: 'Рюкзак 40-50 л', essential: true }, { name: 'Палки', essential: true }, { name: 'Навигатор', essential: true }] }, { category: 'ПРОДУКТЫ', items: [{ name: 'Вода 2 л', essential: true }] }, { category: 'МЕДИЦИНА', items: [{ name: 'Аптечка', essential: true }] }], safety: { rules: ['Изучите маршрут', 'Возьмите телефон'], emergencyContacts: [{ label: 'МЧС', number: '112' }], tips: ['Возьмите воду'] }, signPhoto: '/alataupeaks/photos/chimbulak/sign.jpg', photos: ['/alataupeaks/photos/chimbulaka/1.jpg','/alataupeaks/photos/chimbulaka/2.jpg','/alataupeaks/photos/chimbulaka/3.jpg','/alataupeaks/photos/chimbulaka/4.jpg'], category: 'peak' },
    { id: 'chkalova', name: 'Пик Чкалова', nameKz: 'Чкалов шыңы', nameEn: 'Chkalov Peak', elevation: 3892, coordinates: { lat: 43.104686, lng: 77.126508 }, mapPosition: { top: '30.56%', left: '53.13%' }, difficulty: 'Средний', difficultyLevel: 2, description: 'Пик Чкалова высотой 3892 м.', routeStats: { distance: '18 км', elevationGain: '1692 м', duration: '10 ч' },    routes: [{ name: 'Основной маршрут', duration: '10 ч', distance: '18 км', elevationGain: '1692 м', difficulty: 'Средний', terrain: 'Тропа, осыпь, снег', description: 'Маршрут от Шымбулака.', highlights: ['Луга', 'Осыпи'], }], equipment: [{ category: 'ОДЕЖДА', items: [{ name: 'Ботинки', essential: true }, { name: 'Штаны', essential: true }, { name: 'Куртка', essential: true }, { name: 'Утеплённая куртка', essential: true }] }, { category: 'СНАРЯЖЕНИЕ', items: [{ name: 'Рюкзак 40-50 л', essential: true }, { name: 'Палки', essential: true }, { name: 'Навигатор', essential: true }, { name: 'Фонарик', essential: true }] }, { category: 'ПРОДУКТЫ', items: [{ name: 'Вода 2 л', essential: true }, { name: 'Батончики', essential: true }] }, { category: 'МЕДИЦИНА', items: [{ name: 'Аптечка', essential: true }] }], safety: { rules: ['Изучите маршрут', 'Возьмите телефон', 'Начинайте рано'], emergencyContacts: [{ label: 'МЧС', number: '112' }], tips: ['Возьмите воду'] }, photos: [], category: 'peak' },
    { id: 'fizkulturnik', name: 'Пик Физкультурник', nameKz: 'Физкультурник шыңы', nameEn: 'Fizkulturnik Peak', elevation: 4068, coordinates: { lat: 43.092588, lng: 77.115702 }, mapPosition: { top: '28.43%', left: '60.46%' }, difficulty: 'Сложный', difficultyLevel: 3, description: 'Пик Физкультурник высотой 4068 м.', routeStats: { distance: '20 км', elevationGain: '1868 м', duration: '12 ч' },    routes: [{ name: 'Основной маршрут', duration: '12 ч', distance: '20 км', elevationGain: '1868 м', difficulty: 'Сложный', terrain: 'Тропа, осыпь, снег', description: 'Маршрут от Шымбулака.', highlights: ['Осыпи', 'Снежные поля'], }], equipment: [{ category: 'ОДЕЖДА', items: [{ name: 'Ботинки', essential: true }, { name: 'Штаны', essential: true }, { name: 'Куртка', essential: true }, { name: 'Утеплённая куртка', essential: true }, { name: 'Балаклава', essential: true }, { name: 'Перчатки', essential: true }] }, { category: 'СНАРЯЖЕНИЕ', items: [{ name: 'Рюкзак 50-60 л', essential: true }, { name: 'Палки', essential: true }, { name: 'Навигатор', essential: true }, { name: 'Термос', essential: true }] }, { category: 'ПРОДУКТЫ', items: [{ name: 'Вода 2 л', essential: true }, { name: 'Батончики', essential: true }] }, { category: 'МЕДИЦИНА', items: [{ name: 'Аптечка', essential: true }] }], safety: { rules: ['Изучите маршрут', 'Возьмите телефон', 'Начинайте рано', 'Следите за погодой'], emergencyContacts: [{ label: 'МЧС', number: '112' }], tips: ['Возьмите воду', 'Берите термос'] }, photos: [], category: 'peak' },
    { id: 'tri-brata', name: 'Три Брата', nameKz: 'Үш Ағайын', nameEn: 'Three Brothers', elevation: 2655, coordinates: { lat: 43.170, lng: 77.070 }, mapPosition: { top: '35.58%', left: '79.4%' }, difficulty: 'Лёгкий', difficultyLevel: 1, description: 'Три Брата — группа пиков 2655 м. Маршрут для начинающих.', routeStats: { distance: '10 км', elevationGain: '455 м', duration: '4 ч' },    routes: [{ name: 'Основной маршрут', duration: '4 ч', distance: '10 км', elevationGain: '455 м', difficulty: 'Лёгкий', terrain: 'Тропа, лес', description: 'Маршрут от Шымбулака через лес.', highlights: ['Лес', 'Три вершины'], }], equipment: [{ category: 'ОДЕЖДА', items: [{ name: 'Ветровка', essential: true }, { name: 'Куртка', essential: true }, { name: 'Штаны', essential: true }, { name: 'Ботинки', essential: true }] }, { category: 'СНАРЯЖЕНИЕ', items: [{ name: 'Рюкзак 30-40 л', essential: true }, { name: 'Навигатор', essential: true }] }, { category: 'ПРОДУКТЫ', items: [{ name: 'Вода 1.5 л', essential: true }] }, { category: 'МЕДИЦИНА', items: [{ name: 'Аптечка', essential: true }] }], safety: { rules: ['Изучите маршрут', 'Возьмите телефон'], emergencyContacts: [{ label: 'МЧС', number: '112' }], tips: ['Возьмите воду'] }, photos: [], category: 'mountain' },
    { id: 'kos-kainu', name: 'Кок-Жайляу', nameKz: 'Көкжайлау', nameEn: 'Kok-Zhailyau', elevation: 2200, coordinates: { lat: 43.175, lng: 77.080 }, mapPosition: { top: '50.48%', left: '78%' }, difficulty: 'Лёгкий', difficultyLevel: 1, description: 'Кок-Жайляу — вершина 2200 м. Самый доступный маршрут.', routeStats: { distance: '8 км', elevationGain: '400 м', duration: '3 ч' },    routes: [{ name: 'Основной маршрут', duration: '3 ч', distance: '8 км', elevationGain: '400 м', difficulty: 'Лёгкий', terrain: 'Тропа, лес', description: 'Маршрут от Шымбулака через лес.', highlights: ['Лес', 'Семейный'], }], equipment: [{ category: 'ОДЕЖДА', items: [{ name: 'Удобная обувь', essential: true }, { name: 'Куртка', essential: true }] }, { category: 'СНАРЯЖЕНИЕ', items: [{ name: 'Рюкзак 20-30 л', essential: true }] }, { category: 'ПРОДУКТЫ', items: [{ name: 'Вода 1 л', essential: true }] }, { category: 'МЕДИЦИНА', items: [{ name: 'Аптечка', essential: true }] }], safety: { rules: ['Изучите маршрут', 'Возьмите телефон'], emergencyContacts: [{ label: 'МЧС', number: '112' }], tips: ['Возьмите воду'] }, photos: [], category: 'mountain' },
    { id: 'bao', name: 'Большое Алматинское Озеро (БАО)', nameKz: 'Үлкен Алматы көлі', nameEn: 'Big Almaty Lake (BAL)', elevation: 2511, coordinates: { lat: 43.0625, lng: 76.9775 }, mapPosition: { top: '58%', left: '8%' }, difficulty: 'Лёгкий', difficultyLevel: 1, description: 'Большое Алматинское Озеро (2511 м) — горное озеро в одноимённом ущелье, одна из самых популярных точек Заилийского Алатау. Дорога идёт вдоль реки Большая Алматинка через лес к бирюзовой воде у подножия пиков.', routeStats: { distance: '18 км', elevationGain: '850 м', duration: '6 ч' }, routes: [{ name: 'Основной маршрут', duration: '6 ч', distance: '18 км', elevationGain: '850 м', difficulty: 'Лёгкий', terrain: 'Тропа, лес', description: 'Большое Алматинское Озеро (2511 м) — горное озеро в одноимённом ущелье, одна из самых популярных точек Заилийского Алатау. Дорога идёт вдоль реки Большая Алматинка через лес к бирюзовой воде у подножия пиков.', highlights: ['Панорама', 'Лес'] }], equipment: [{ category: 'ОДЕЖДА', items: [{ name: 'Ветровка', essential: true }, { name: 'Куртка', essential: true }, { name: 'Штаны', essential: true }, { name: 'Ботинки', essential: true }] }, { category: 'СНАРЯЖЕНИЕ', items: [{ name: 'Рюкзак 20-30 л', essential: true }, { name: 'Навигатор', essential: true }] }, { category: 'ПРОДУКТЫ', items: [{ name: 'Вода 1.5 л', essential: true }, { name: 'Перекусы', essential: true }] }, { category: 'МЕДИЦИНА', items: [{ name: 'Аптечка', essential: true }] }], safety: { rules: ['Изучите маршрут', 'Возьмите телефон'], emergencyContacts: [{ label: 'МЧС', number: '112' }], tips: ['Возьмите воду'] }, photos: ['/alataupeaks/photos/bao/1.jpg','/alataupeaks/photos/bao/2.jpg','/alataupeaks/photos/bao/3.jpg','/alataupeaks/photos/bao/4.jpg','/alataupeaks/photos/bao/5.jpg'], category: 'mountain' },
    { id: 'mynzhylky', name: 'Урочище Мынжылкы', nameKz: 'Мынжылқы', nameEn: 'Mynzhylky', elevation: 2511, coordinates: { lat: 43.0736, lng: 77.0297 }, mapPosition: { top: '62%', left: '12%' }, difficulty: 'Лёгкий', difficultyLevel: 1, description: 'Урочище Мынжылкы — конечная точка Малого Алматинского ущелья с гидропостом и метеостанцией, откуда открывается вид на ледники и пики главного хребта. Классический маршрут выходного дня.', routeStats: { distance: '22 км', elevationGain: '900 м', duration: '7 ч' }, routes: [{ name: 'Основной маршрут', duration: '7 ч', distance: '22 км', elevationGain: '900 м', difficulty: 'Лёгкий', terrain: 'Тропа, лес', description: 'Урочище Мынжылкы — конечная точка Малого Алматинского ущелья с гидропостом и метеостанцией, откуда открывается вид на ледники и пики главного хребта. Классический маршрут выходного дня.', highlights: ['Панорама', 'Лес'] }], equipment: [{ category: 'ОДЕЖДА', items: [{ name: 'Ветровка', essential: true }, { name: 'Куртка', essential: true }, { name: 'Штаны', essential: true }, { name: 'Ботинки', essential: true }] }, { category: 'СНАРЯЖЕНИЕ', items: [{ name: 'Рюкзак 20-30 л', essential: true }, { name: 'Навигатор', essential: true }] }, { category: 'ПРОДУКТЫ', items: [{ name: 'Вода 1.5 л', essential: true }, { name: 'Перекусы', essential: true }] }, { category: 'МЕДИЦИНА', items: [{ name: 'Аптечка', essential: true }] }], safety: { rules: ['Изучите маршрут', 'Возьмите телефон'], emergencyContacts: [{ label: 'МЧС', number: '112' }], tips: ['Возьмите воду'] }, photos: ['/alataupeaks/photos/mynzhylky/1.jpg','/alataupeaks/photos/mynzhylky/2.jpg','/alataupeaks/photos/mynzhylky/3.jpg','/alataupeaks/photos/mynzhylky/4.jpg',], category: 'mountain' },

    // ─── Новые пики с фотографии ───

    { id: 'geroi-28', hiddenOnMap: true, name: '28 Героев Панфиловцев', nameKz: 'Пәнфиловтың 28 қаһарманы', nameEn: '28 Panfilov Heroes', altNames: ['Geroev-Panfilovtsev', 'Пик Героев-Панфиловцев'], elevation: 4120, coordinates: { lat: 43.079649, lng: 77.114407 }, mapPosition: { top: '27%', left: '40%' }, difficulty: 'Средний', difficultyLevel: 2, description: 'Пик 28 Героев Панфиловцев (4120 м) — маршрут с красивым видом на Алма-Ату с открытого склона.', routeStats: { distance: '12 км', elevationGain: '1153 м', duration: '5 ч' },    routes: [{ name: 'Основной маршрут', duration: '5 ч', distance: '12 км', elevationGain: '1153 м', difficulty: 'Средний', terrain: 'Тропа, лес', description: 'Маршрут от Шымбулака через лес.', highlights: ['Лес', 'Открытый склон', 'Вид на город'], }], equipment: [{ category: 'ОДЕЖДА', items: [{ name: 'Куртка', essential: true }, { name: 'Штаны', essential: true }, { name: 'Лёгкие ботинки', essential: true }] }, { category: 'СНАРЯЖЕНИЕ', items: [{ name: 'Рюкзак 30-35 л', essential: true }, { name: 'Навигатор или телефон', essential: true }] }, { category: 'ПРОДУКТЫ', items: [{ name: 'Вода 1.5 л', essential: true }, { name: 'Перекусы', essential: true }] }, { category: 'МЕДИЦИНА', items: [{ name: 'Аптечка', essential: true }] }], safety: { rules: ['Изучите маршрут', 'Возьмите телефон', 'Оставьте слово'], emergencyContacts: [{ label: 'МЧС', number: '112' }], tips: ['Возьмите воду'] }, signPhoto: '/alataupeaks/photos/geroi-28/sign.jpg', photos: ['/alataupeaks/photos/geroi-28/1.jpg','/alataupeaks/photos/geroi-28/2.jpg'], category: 'peak' },

    { id: 'karinznij', hiddenOnMap: true, name: 'Пик Карнизный', nameKz: 'Карнизный шыңы', nameEn: 'Karnizny Peak', altNames: ['Карнизный (Бауыржан Момышулы)', 'Бауыржан Момышулы', 'Baurzhan Momyshuly'], elevation: 4075, coordinates: { lat: 43.011832, lng: 76.945988 }, mapPosition: { top: '18%', left: '46%' }, difficulty: 'Средний', difficultyLevel: 2, description: 'Карнизный (Бауыржан Момышулы) — средний пик с хорошим обзором хребта. Доступен при хорошей погоде.', routeStats: { distance: '16 км', elevationGain: '1688 м', duration: '7 ч' },    routes: [{ name: 'Основной маршрут', duration: '7 ч', distance: '16 км', elevationGain: '1688 м', difficulty: 'Средний', terrain: 'Тропа, осыпь, ледник', description: 'Маршрут от Шымбулака через ледник.', highlights: ['Ледник', 'Конус карниза', 'Вид на Алма-Ату'], }], equipment: [{ category: 'ОДЕЖДА', items: [{ name: 'Тренировочные ботинки', essential: true }, { name: 'Штаны', essential: true }, { name: 'Куртка', essential: true }, { name: 'Утеплённая куртка', essential: true }] }, { category: 'СНАРЯЖЕНИЕ', items: [{ name: 'Рюкзак 40-50 л', essential: true }, { name: 'Палки', essential: true }, { name: 'Навигатор', essential: true }, { name: 'Фонарик', essential: true }] }, { category: 'ПРОДУКТЫ', items: [{ name: 'Вода 2 л', essential: true }, { name: 'Батончики и сухарики', essential: true }] }, { category: 'МЕДИЦИНА', items: [{ name: 'Аптечка', essential: true }, { name: 'Пластырь для лезвий', essential: false }] }], safety: { rules: ['Изучите маршрут', 'Возьмите телефон', 'Оцените погоду', 'Оствьтесь с группой'], emergencyContacts: [{ label: 'МЧС', number: '112' }], tips: ['Возьмите воду и термос', 'Не спускайтесь в одиночку'] }, signPhoto: '/alataupeaks/photos/karinznij/sign.jpg', photos: ['/alataupeaks/photos/karinznij/1.jpg','/alataupeaks/photos/karinznij/2.jpg','/alataupeaks/photos/karinznij/3.jpg','/alataupeaks/photos/karinznij/4.jpg','/alataupeaks/photos/karinznij/5.jpg'], category: 'peak' },

        // ─── Пики Каргалинского отрога (данные friendhike.com) ───

    { id: 'Kamensky', name: 'Пик Каменский', nameKz: 'Каменский шыңы', nameEn: 'Kamensky Peak', altNames: ['Пик Каменского', 'Kamenskiy'], elevation: 3674, coordinates: { lat: 43.0518, lng: 76.8306 }, mapPosition: { top: '56%', left: '23%' }, difficulty: 'Сложный', difficultyLevel: 3, description: 'Пик Каменский (3674 м) — вершина Каргалинского отрога между ущельями Проходное и Каргалинское. Похожая на «близнеца» Каргалинского, с крутой, но пешеходной тропой и мощной панорамой хребта.', routeStats: { distance: '16 км', elevationGain: '1674 м', duration: '9 ч' }, routes: [{ name: 'Через Каскабас', duration: '9 ч', distance: '16 км', elevationGain: '1674 м', difficulty: 'Сложный', terrain: 'Тропа, крутая осыпь', description: 'Подъём по тропе через урочище Каскабас к вершине. Верхний участок — крутая осыпь, с вершины открывается одна из лучших панорам Заилийского Алатау.', highlights: ['Панорама Заилийского Алатау', 'Ущелья Проходное и Каргалинское', 'Тропа Каскабас'] }], equipment: [{ category: 'ОДЕЖДА', items: [{ name: 'Тренировочные ботинки', essential: true }, { name: 'Штаны', essential: true }, { name: 'Куртка', essential: true }, { name: 'Утеплённая куртка', essential: true }] }, { category: 'СНАРЯЖЕНИЕ', items: [{ name: 'Рюкзак 40-50 л', essential: true }, { name: 'Палки', essential: true }, { name: 'Навигатор', essential: true }, { name: 'Фонарик', essential: true }] }, { category: 'ПРОДУКТЫ', items: [{ name: 'Вода 2 л', essential: true }, { name: 'Батончики и сухарики', essential: true }] }, { category: 'МЕДИЦИНА', items: [{ name: 'Аптечка', essential: true }] }], safety: { rules: ['Изучите маршрут', 'Возьмите телефон', 'Начинайте рано', 'Следите за погодой'], emergencyContacts: [{ label: 'МЧС', number: '112' }], tips: ['Возьмите воду и термос', 'Не спускайтесь в одиночку'] }, signPhoto: '/alataupeaks/photos/kamensky/sign.jpg', photos: [], category: 'peak' },

    { id: 'Kargalinsky', name: 'Пик Каргалинский', nameKz: 'Қарғалы шыңы', nameEn: 'Kargalinsky Peak', altNames: ['Kargalinskiy', 'Пик Каргалинский 3675'], elevation: 3675, coordinates: { lat: 43.0548, lng: 76.8392 }, mapPosition: { top: '53%', left: '26%' }, difficulty: 'Сложный', difficultyLevel: 3, description: 'Пик Каргалинский (3675 м) — вершина-«близнец» Каменского в Каргалинском отроге. Самая мощная панорама района: от города до ледников главного хребта.', routeStats: { distance: '16 км', elevationGain: '1675 м', duration: '9 ч' }, routes: [{ name: 'Через Каскабас', duration: '9 ч', distance: '16 км', elevationGain: '1675 м', difficulty: 'Сложный', terrain: 'Тропа, крутая осыпь', description: 'Подъём по тропе через урочище Каскабас. Крутые, но пешеходные тропы выводят на вершину с круговой панорамой.', highlights: ['Панорама Заилийского Алатау', 'Вершина-«близнец» Каменского', 'Ущелье Каргалинское'] }], equipment: [{ category: 'ОДЕЖДА', items: [{ name: 'Тренировочные ботинки', essential: true }, { name: 'Штаны', essential: true }, { name: 'Куртка', essential: true }, { name: 'Утеплённая куртка', essential: true }] }, { category: 'СНАРЯЖЕНИЕ', items: [{ name: 'Рюкзак 40-50 л', essential: true }, { name: 'Палки', essential: true }, { name: 'Навигатор', essential: true }, { name: 'Фонарик', essential: true }] }, { category: 'ПРОДУКТЫ', items: [{ name: 'Вода 2 л', essential: true }, { name: 'Батончики и сухарики', essential: true }] }, { category: 'МЕДИЦИНА', items: [{ name: 'Аптечка', essential: true }] }], safety: { rules: ['Изучите маршрут', 'Возьмите телефон', 'Начинайте рано', 'Следите за погодой'], emergencyContacts: [{ label: 'МЧС', number: '112' }], tips: ['Возьмите воду и термос', 'Не спускайтесь в одиночку'] }, signPhoto: '/alataupeaks/photos/kargalinsky/sign.jpg', photos: [], category: 'peak' },

    // ─── Траверсы ───

    { id: 'kamenskiy-kargaly', name: 'Траверс Каменский-Каргалинский (КК)', nameKz: 'Каменский-Қарғалы траверсі', nameEn: 'Kamenskiy-Kargalinsky Traverse (KK)', altNames: ['КК', 'Каменский Каргалы', 'Kamenskiy-Kargaly'], elevation: 3675, coordinates: { lat: 43.0533, lng: 76.8349 }, mapPosition: { top: '55%', left: '24%' }, difficulty: 'Сложный', difficultyLevel: 3, description: 'Траверс двух вершин-«близнецов» — Каменского (3674 м) и Каргалинского (3675 м) — за один выход через урочище Каскабас. Крутые тропы, осыпи и переход по седловине между вершинами.', routeStats: { distance: '20 км', elevationGain: '1900 м', duration: '15 ч' }, routes: [{ name: 'Каскабас → обе вершины', duration: '15 ч', distance: '20 км', elevationGain: '1900 м', difficulty: 'Сложный', terrain: 'Тропа, крутая осыпь, траверс седловины', description: 'Подъём через Каскабас на одну из вершин, переход по седловине на вторую, спуск в сторону Теры. Часто проходится в два дня с ночёвкой.', highlights: ['Две вершины за один выход', 'Седловина между «близнецами»', 'Панорама на Алматы и главный хребет'] }], equipment: [{ category: 'ОДЕЖДА', items: [{ name: 'Тренировочные ботинки', essential: true }, { name: 'Штаны', essential: true }, { name: 'Куртка', essential: true }, { name: 'Утеплённая куртка', essential: true }] }, { category: 'СНАРЯЖЕНИЕ', items: [{ name: 'Рюкзак 40-50 л', essential: true }, { name: 'Палки', essential: true }, { name: 'Навигатор', essential: true }, { name: 'Фонарик', essential: true }] }, { category: 'ПРОДУКТЫ', items: [{ name: 'Вода 2 л', essential: true }, { name: 'Батончики и сухарики', essential: true }] }, { category: 'МЕДИЦИНА', items: [{ name: 'Аптечка', essential: true }] }], safety: { rules: ['Изучите маршрут', 'Возьмите телефон', 'Начинайте рано', 'Следите за погодой'], emergencyContacts: [{ label: 'МЧС', number: '112' }], tips: ['Возьмите воду и термос', 'Не спускайтесь в одиночку'] }, photos: [], category: 'traverse', traversePeaks: ['Kamensky', 'Kargalinsky'] },

    { id: 'mak', name: 'Траверс Малая Алматинская Кругосветка (МАК)', nameKz: 'Кіші Алматы айналма жорығы (МАҚ)', nameEn: 'Small Almaty Round-the-World Traverse (MAK)', altNames: ['МАК', 'Малая Кругосветка', 'MAK', 'Malaya Almatinskaya Krugosvetka'], elevation: 3458, coordinates: { lat: 43.1375, lng: 76.9975 }, mapPosition: { top: '33%', left: '38%' }, difficulty: 'Лёгкий', difficultyLevel: 1, description: 'Кольцевой траверс хребта над Шымбулаком: Пик Фурманова (3053 м) → Пик Панорама (3053 м) → Пик Башута (3355 м) → Пик Чимбулачка (3458 м). Длинный живописный маршрут с постоянной сменой видов на город, Кунгей и ледники.', routeStats: { distance: '24 км', elevationGain: '2100 м', duration: '14 ч' }, routes: [{ name: 'Кольцо: Фурманова → Панорама → Башута → Чимбулачка', duration: '14 ч', distance: '24 км', elevationGain: '2100 м', difficulty: 'Лёгкий', terrain: 'Тропа, осыпь, траверс склонов', description: 'Старт от Шымбулака, подъём на Фурманова, далее по хребту через Панораму и Башуту на Чимбулачку и спуск к курорту. Ранний старт обязателен — маршрут на полный день.', highlights: ['Четыре вершины за один день', 'Виды на Кунгей-Алатау и Талгар', 'Кольцевая логистика от Шымбулака'] }], equipment: [{ category: 'ОДЕЖДА', items: [{ name: 'Тренировочные ботинки', essential: true }, { name: 'Штаны', essential: true }, { name: 'Куртка', essential: true }, { name: 'Утеплённая куртка', essential: true }] }, { category: 'СНАРЯЖЕНИЕ', items: [{ name: 'Рюкзак 40-50 л', essential: true }, { name: 'Палки', essential: true }, { name: 'Навигатор', essential: true }, { name: 'Фонарик', essential: true }] }, { category: 'ПРОДУКТЫ', items: [{ name: 'Вода 2 л', essential: true }, { name: 'Батончики и сухарики', essential: true }] }, { category: 'МЕДИЦИНА', items: [{ name: 'Аптечка', essential: true }] }], safety: { rules: ['Изучите маршрут', 'Возьмите телефон', 'Начинайте рано', 'Следите за погодой'], emergencyContacts: [{ label: 'МЧС', number: '112' }], tips: ['Возьмите воду и термос', 'Не спускайтесь в одиночку'] }, photos: [], category: 'traverse', traversePeaks: ['furmanova', 'panorama', 'bashuta', 'chimbulaka'] },
    { id: 'satpayev', name: 'Пик Советов (Сатпаева)', nameKz: 'Сәтбаев шыңы', nameEn: 'Satpayev Peak (Sovietov)', altNames: ['Советов', 'Пик Советов', 'Sovietov', 'Сатпаев', 'Satpaev'], elevation: 4317, coordinates: { lat: 43.0241413, lng: 77.03703403 }, mapPosition: { top: '70%', left: '52%' }, difficulty: 'Очень сложный', difficultyLevel: 4, description: 'Пик Советов (Сатпаева, 4317 м) — одна из доминант верховьев Малого Алматинского ущелья над ледником Туюксу. Категорийный альпинистский маршрут, требует снаряжения и опыта.', routeStats: { distance: '18 км', elevationGain: '2600 м', duration: '14 ч' }, routes: [{ name: 'Через ледник Туюксу', duration: '14 ч', distance: '18 км', elevationGain: '2600 м', difficulty: 'Очень сложный', terrain: 'Ледник, морена, скалы', description: 'Подход по леднику Туюксу с последующим подъёмом по скально-ледовому склону. Только для подготовленных групп с альпинистским снаряжением.', highlights: ['Ледник Туюксу', 'Вершина 4317 м', 'Панорама главного хребта'] }], equipment: [{ category: 'АЛЬПИНИСТСКОЕ', items: [{ name: 'Каска', essential: true }, { name: 'Верёвка', essential: true }, { name: 'Ледоруб', essential: true }, { name: 'Кошки', essential: true }] }, { category: 'ОДЕЖДА', items: [{ name: 'Альпинистские ботинки', essential: true }, { name: 'Утеплённая куртка', essential: true }, { name: 'Балаклава', essential: true }, { name: 'Перчатки', essential: true }] }, { category: 'СНАРЯЖЕНИЕ', items: [{ name: 'Рюкзак 50-60 л', essential: true }, { name: 'Навигатор', essential: true }, { name: 'Термос', essential: true }] }, { category: 'МЕДИЦИНА', items: [{ name: 'Аптечка', essential: true }] }], safety: { rules: ['Только для опытных альпинистов', 'Обязательна связка и кошки', 'Проверьте прогноз лавин'], emergencyContacts: [{ label: 'МЧС', number: '112' }], tips: ['Берите термос', 'Выход затемно'] }, photos: [], signPhoto: '/alataupeaks/photos/satpayev/sign.jpg', category: 'peak' },
    { id: 'bap', name: 'Большой Алматинский Пик (БАП)', nameKz: 'Үлкен Алматы шыңы', nameEn: 'Big Almaty Peak (BAP)', altNames: ['БАП', 'Большой Алматинский', 'Big Almaty Peak', 'BAP'], elevation: 3681, coordinates: { lat: 43.0551623, lng: 76.9335866 }, mapPosition: { top: '64%', left: '14%' }, difficulty: 'Средний', difficultyLevel: 2, description: 'Большой Алматинский Пик (3681 м) — классическое восхождение над Большим Алматинским озером. Крутая тропа и осыпи выводят на вершину с одной из лучших панорам района.', routeStats: { distance: '20 км', elevationGain: '2400 м', duration: '12 ч' }, routes: [{ name: 'От БАО через обсерваторию', duration: '12 ч', distance: '20 км', elevationGain: '2400 м', difficulty: 'Средний', terrain: 'Тропа, крутая осыпь, скалы', description: 'Старт от Большого Алматинского озера, подъём мимо обсерватории по крутым тропам и осыпям на вершину. Ранний выход обязателен.', highlights: ['Вид на БАО сверху', 'Панорама Заилийского Алатау', 'Классический маршрут района'] }], equipment: [{ category: 'ОДЕЖДА', items: [{ name: 'Тренировочные ботинки', essential: true }, { name: 'Штаны', essential: true }, { name: 'Куртка', essential: true }, { name: 'Утеплённая куртка', essential: true }] }, { category: 'СНАРЯЖЕНИЕ', items: [{ name: 'Рюкзак 40-50 л', essential: true }, { name: 'Палки', essential: true }, { name: 'Навигатор', essential: true }, { name: 'Фонарик', essential: true }] }, { category: 'ПРОДУКТЫ', items: [{ name: 'Вода 2 л', essential: true }, { name: 'Батончики и сухарики', essential: true }] }, { category: 'МЕДИЦИНА', items: [{ name: 'Аптечка', essential: true }] }], safety: { rules: ['Изучите маршрут', 'Возьмите телефон', 'Начинайте рано', 'Следите за погодой'], emergencyContacts: [{ label: 'МЧС', number: '112' }], tips: ['Возьмите воду и термос', 'Не спускайтесь в одиночку'] }, photos: [], signPhoto: '/alataupeaks/photos/bap/sign.jpg', category: 'peak' },
    { id: 'qotyrbulaq', name: 'Пик Котырбулак', nameKz: 'Қотырбұлақ шыңы', nameEn: 'Kotyrbulak Peak', altNames: ['Котырбулак', 'Kotyrbulak', 'Горный Садовод'], elevation: 3030, coordinates: { lat: 43.0765, lng: 76.9853 }, mapPosition: { top: '52%', left: '22%' }, difficulty: 'Средний', difficultyLevel: 2, description: 'Пик Котырбулак (3030 м) возвышается над ущельем Котырбулак (бывший «Горный Садовод»). Живописный маршрут через поляну Энтузиастов и Бутаковский перевал.', routeStats: { distance: '14 км', elevationGain: '1400 м', duration: '7 ч' }, routes: [{ name: 'Через Бутаковский перевал', duration: '7 ч', distance: '14 км', elevationGain: '1400 м', difficulty: 'Средний', terrain: 'Тропа, травянистые склоны, осыпь', description: 'Подъём через поляну Энтузиастов и Бутаковский перевал к вершине с открытыми видами на город и хребет.', highlights: ['Поляна Энтузиастов', 'Бутаковский перевал', 'Вид на Кумбель'] }], equipment: [{ category: 'ОДЕЖДА', items: [{ name: 'Ветровка', essential: true }, { name: 'Куртка', essential: true }, { name: 'Штаны', essential: true }, { name: 'Ботинки', essential: true }] }, { category: 'СНАРЯЖЕНИЕ', items: [{ name: 'Рюкзак 30-40 л', essential: true }, { name: 'Палки', essential: true }, { name: 'Навигатор', essential: true }] }, { category: 'ПРОДУКТЫ', items: [{ name: 'Вода 1.5 л', essential: true }, { name: 'Перекусы', essential: true }] }, { category: 'МЕДИЦИНА', items: [{ name: 'Аптечка', essential: true }] }], safety: { rules: ['Изучите маршрут', 'Возьмите телефон', 'Начинайте рано'], emergencyContacts: [{ label: 'МЧС', number: '112' }], tips: ['Возьмите воду'] }, photos: [], signPhoto: '/alataupeaks/photos/qotyrbulaq/sign.jpg', category: 'peak' },
    { id: 'skai', name: 'Пик Скай (СКАИ)', nameKz: 'Скай шыңы', nameEn: 'Sky Peak (SKAI)', altNames: ['СКАИ', 'Скай', 'Sky', 'Sky Peak'], elevation: 3137, coordinates: { lat: 43.1456555, lng: 77.1291979 }, mapPosition: { top: '30%', left: '58%' }, difficulty: 'Средний', difficultyLevel: 2, description: 'Пик Скай (3137 м) над Бутаковкой — популярная вершина с панорамой Медеу и Кимасара. Маршрут идёт через поляну Энтузиастов и Бутаковский перевал.', routeStats: { distance: '16 км', elevationGain: '1300 м', duration: '8 ч' }, routes: [{ name: 'Медеу → Бутаковский перевал', duration: '8 ч', distance: '16 км', elevationGain: '1300 м', difficulty: 'Средний', terrain: 'Тропа, лес, осыпь', description: 'От Медеу через поляну Энтузиастов на Бутаковский перевал и далее на вершину Скай. Живописно и умеренно нагрузочно.', highlights: ['Вид на Медеу', 'Бутаковский перевал', 'Панорама города'] }], equipment: [{ category: 'ОДЕЖДА', items: [{ name: 'Ветровка', essential: true }, { name: 'Куртка', essential: true }, { name: 'Штаны', essential: true }, { name: 'Ботинки', essential: true }] }, { category: 'СНАРЯЖЕНИЕ', items: [{ name: 'Рюкзак 30-40 л', essential: true }, { name: 'Палки', essential: true }, { name: 'Навигатор', essential: true }] }, { category: 'ПРОДУКТЫ', items: [{ name: 'Вода 1.5 л', essential: true }, { name: 'Перекусы', essential: true }] }, { category: 'МЕДИЦИНА', items: [{ name: 'Аптечка', essential: true }] }], safety: { rules: ['Изучите маршрут', 'Возьмите телефон', 'Начинайте рано'], emergencyContacts: [{ label: 'МЧС', number: '112' }], tips: ['Возьмите воду'] }, photos: [], signPhoto: '/alataupeaks/photos/skai/sign.jpg', category: 'peak' },
]
