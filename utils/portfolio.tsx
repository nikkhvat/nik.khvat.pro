




export interface PortfolioItem {
  categories: number[]
  id: string
  url: any
  title: string
  sub_title: string
  sub_title_ru?: string
  description: string
  description_ru?: string
  cards?: {
    title: string
    sub_title: string
  }[],
  main_features_ru?: string[],
  main_features?: string[],
  photos?: any[]
}

export const portfolioData: PortfolioItem[] = [{
    categories: [ 4 ],
    id: "81ee526d-beb0-4a71-a192-e2b5a9886146",
    url: "EWYS.jpg",
    title: "Ewys",
    sub_title: "On-screen menu with augmented reality for a restaurant",
    sub_title_ru: "Меню с дополненной реальностью для ресторанов",
    description: "An application for an electronic menu with augmented reality elements for restaurants.",
    description_ru: "Приложение для электронного меню с элементами дополненной реальности для ресторанов.",
    cards: [{
      title: "Front-end",
      sub_title: "Vue.js, Three.js"
    },
    {
      title: "Back-end",
      sub_title: "NodeJs, Express, MySql"
    }],
    main_features: [
      "View restaurant menu by QR code", 
      "View individual dishes, their description, photo, ingredients etc", 
      "Viewing a 3d model of a dish in augmented reality"
      ],
    main_features_ru: [
        "Просмотр меню ресторана по QR коду", 
        "Просмотр отдельных блюд и их описание, фото, время готовки, ингридиенты", 
        "Просмотр 3d модели блюда в дополненной реальности"
      ],
    photos: [
      "ewys/1.jpg",
      "ewys/2.jpg",
      "ewys/3.jpg"
    ]
  },
  {
    categories: [ 2, 4 ],
    id: "0b1dc4ba-541c-49e2-8d67-46875a85ad9f",
    url: "BISUP.jpg",
    title: "BUSINESS UP",
    sub_title: "The platform forms entrepreneurial skills by using online gaming solutions, building development, supporting the business community and participating in cyber championships.",
    sub_title_ru: "Платформа формирует навыки предпринимателя с помощью игровых онлайн решений.",
    description: "The platform forms entrepreneurial skills by using online gaming solutions, building development, supporting the business community and participating in cyber championships.",
    description_ru: "Платформа формирует навыки предпринимателя с помощью игровых онлайн решений, выстраивая траектории развития, поддержки бизнес-комьюнити и участия в киберчемпионатах.",
    cards: [{
      title: "Front-end",
      sub_title: "Vue.js, VueRouter"
    },
    {
      title: "Back-end",
      sub_title: "Python, Flask, MySql"
    },
    {
      title: "Mobile",
      sub_title: "ReactNative"
    }],
    main_features: [
      "Personal Account with rating and reputation",
      "Business games and championships",
      "Distance learning",
      "Digital business community",
      "Social Project"
    ],
    main_features_ru: [
      "Личный кабинет с рейтингом и репутацией", 
      "Бизнес-игры и чемпионаты", 
      "Дистанционное обучение",
      "Цифровое бизнес-коммьюнити",
      "Социальный проект"
    ],
    photos: [
      "business-up/1.jpg",
      "business-up/2.jpg",
      "business-up/3.jpg"
    ]
  },
  {
    categories: [ 2 ],
    id: "8cbad396-598e-435a-a225-822ec541531a",
    url: "OWSUP.jpg",
    title: "OWSUP",
    sub_title: "Service for selis for Ozon and Wildberries",
    sub_title_ru: "Сервис помощник продовцов на Ozon и Wildberries",
    description: "Service for Ozon and Wildberries that helps to optimize sales",
    description_ru: "Сервис для Ozon и Wildberries, который помогает оптимизировать продажи.",
    cards: [{
      title: "Front-end",
      sub_title: "React, Redux Toolkit, Ant.d"
    },
    {
      title: "Back-end",
      sub_title: "GoLang, Gin, Gorm, PostgreSQL"
    }],
    main_features: [
      "Copying cards", 
      "General analytics of all accounts in one Dashboard", 
      "Analytics of orders from all accounts", 
      "Calculator of surcharge / commission of goods for delivery",
    ],
    main_features_ru: [
      "Копирование карточек", 
      "Общая аналитика всех кабинетов в одном Dashboard", 
      "Аналитика заказов со всех кабинетов", 
      "Калькулятор прибыли и комиссии товара за доставку",
    ],
    photos: [
      "owsup/1.jpg",
      "owsup/2.jpg",
      "owsup/3.jpg",
    ]
  },
  {
    categories: [ 3 ],
    id: "aec0435f-9ffe-4eed-9f09-2922b70cae16",
    url: "EPICHERISION.jpg",
    title: "EPICHERISION",
    sub_title: "Bot for Discord server",
    sub_title_ru: "Бот для Discrod сервера.",
    description: "The main focus of the bot is to provide the fastest and most complete information about new arrivals in a number of stores selected by the customer for certain categories of goods.",
    description_ru: `Discord bot, задача которого предоставлять информацию о поступлении новых товаров.`,
    cards: [{
      title: "Bot",
      sub_title: "NodeJs, node-html-parser"
    }],
    main_features: [
      "In the process of implementation, a large number of parsers were written, both ordinary data and meta, necessary for generating ATK links",
      "Implemented the ability to edit keywords and categories for selecting products to send to users",
      "Shipping is appropriately divided into channels, and shipping for each store occurs in a separate channel. And it happens instantly, after the appearance of new products in the store's feed",
      "Separately, the generation of atk links for Nike is implemented, upon activation by the administrator."
    ],
    main_features_ru: [
      "В процессе реализации было написано большое количество парсеров, как обычных данных так и мета, необходимых для генерации АТК ссылок",
      "Реализованная возможность редактирования ключевых слов и категорий для выборки товаров для отправки пользователям",
      "Отправка соответствующе разделена на каналы, и отправка по каждому магазину происходит в отдельный канал.",
      "Отдельно реализована генерация атк ссылок для Nike, по активации администратором."
    ],
    photos: [
      "epicherision/1.jpg",
      "epicherision/2.jpg",
      "epicherision/3.jpg",
    ]
  },
  {
    categories: [ 2 ],
    id: "57fe52eb-04d2-4d09-8d9d-29af4f916ef7",
    url: "just-portfolio.jpg",
    title: "Just Portfolio",
    sub_title: "A highly focused portfolio content management system",
    sub_title_ru: "Узкоспециализированная CMS для портфолио",
    description: "A highly focused portfolio content management system on GoLang",
    description_ru: "Узкоспециализированная CMS для портфолио, написанная на GoLang.",
    cards: [{
      title: "Front-end",
      sub_title: "React, Redux ToolKit"
    },
    {
      title: "Back-end",
      sub_title: "GoLang, Gin, Gorm, PostgreSQL"
    }],
    main_features: [
      "Allows you to store images for projects in good quality",
      "Allows you to use the service as an admin panel for your site"
    ],
    main_features_ru: [
      "Позволяет хранить изображения для проектов в хорошем качестве",
      "Возможность использовать сервис как админ панель к вашему сайту"
    ],
    photos: [
      "just-portfolio/1.jpg",
      "just-portfolio/2.jpg",
      "just-portfolio/3.jpg"
    ]
  },
  {
    categories: [ 2 ],
    id: "f259e99b-4722-4646-9c48-0de63e6beed4",
    url: "EMIAS.jpg",
    title: "EMIAS ",
    sub_title: "web platform for EMIAS emploees",
    sub_title_ru: "Веб платформа для сотрудников компании EMIAS",
    description: "Web platform for EMIAS emploees.",
    description_ru: "Веб-платформа сотрудников компании EMIAS, которая предоставляет возможность удобно выполнять задачи и смотреть актуальный статус задач.",
    cards: [{
      title: "Front-end",
      sub_title: "Vue, Vue Router"
    },
    {
      title: "Back-end",
      sub_title: "NodeJs, Express, MySQL"
    }],
    main_features: [
      "Personal account for employees",
      "Opportunity for participants to submit their ideas",
      "Ability to view team progress",
      "Ability to give badges to users who deserve them"
    ],
    main_features_ru: [
      "Личный кабинет для сотрудников",
      "Возможность участникам предлогать свои идеи",
      "Возможность просматривать прогресс команды",
      "Возможность дать значки пользователям которые их заслуживают"
    ],
    photos: [
      "emias/1.jpg",
      "emias/2.jpg",
      "emias/3.jpg"
    ]
  },
  {
    categories: [ 2 ],
    id: "cde03dbb-30ff-4704-91d7-20d8466159c1",
    url: "UBusiness.jpg",
    title: "U.Business",
    sub_title: "UBusiness lending with multilang",
    sub_title_ru: "UBusiness сайт с мультиязычностью",
    description: "Lending created on next.js for a company. With admin panel for text editing",
    description_ru: "Сайт созданный на next.js для компании. С админкой для редактирования текста",
    main_features: [
      "Text editing directly on the site if you are an admin",
    ],
    main_features_ru: [
      "Админ панель, позволяющая редактировать текст",
      "Реализована мультиязычность с помощью i18n",
    ],
    cards: [{
      title: "Front-end",
      sub_title: "NextJs, i18n"
    }],
    photos: [
      "u-business/1.jpg",
      "u-business/2.jpg",
      "u-business/3.jpg",
    ]
  },
  {
    categories: [ 2 ],
    id: "214d486e-0b5c-4f19-8a25-7399cf7bc18c",
    url: "secret-santa/3.jpg",
    title: "Secret Santa",
    sub_title: "Secret Santa for company croc",
    sub_title_ru: 'Игра "Тайный Санта" для компании croc',
    description: "Secret Santa for company croc",
    description_ru: 'Игра "Тайный Санта" для компании croc. Традиционная рождественская игра, целью которой является анонимный обмен подарками в группе играющих людей',
    cards: [{
      title: "Front-end",
      sub_title: "Vue, VueRouter"
    }, 
    {
      title: "Back-end",
      sub_title: "Python, Flask"
    }],
    main_features: [
      "An algorithm that creates pairs with different specializations and departments",
      "Sending emails to mail",
      "All features in your account"
    ],
    main_features_ru: [
      "Алгоритм который создаёт пары, с разними специализациями и отделами",
      "Рассылка писем на почту",
      "Все функции в личном кабинете"
    ],
    photos: [
      "secret-santa/1.jpg",
      "secret-santa/2.jpg",
      "secret-santa/3.jpg"
    ]
  }
]

export const getProjectById = (id: string) => {
  for (let i = 0; i < portfolioData.length; i++) {
    const element = portfolioData[i];
    if (element.id === id) 
      return element
  }

  return null
}