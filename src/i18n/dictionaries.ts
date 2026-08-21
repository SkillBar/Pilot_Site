import type { Locale } from "./config";

export type Dictionary = {
  meta: {
    title: string;
    description: string;
  };
  common: {
    download: string;
    login: string;
    openMenu: string;
    language: string;
    chooseLanguage: string;
    lightTheme: string;
    darkTheme: string;
  };
  header: {
    vectorAria: string;
    eduPlatform: string;
    utilityNavAria: string;
    primaryNavAria: string;
    mobileNavAria: string;
    pilotHomeAria: string;
    fpvOnline: string;
    games: string;
    apps: string;
    navProject: string;
    navProduct: string;
    navPricing: string;
    navStructure: string;
    navInvestors: string;
  };
  hero: {
    eyebrow: string;
    headline: string;
    description: string;
    ctaDownload: string;
    ctaInvestors: string;
    scalesAria: string;
    platformsAria: string;
    platformApple: string;
    platformWindows: string;
    platformSteam: string;
  };
  partners: {
    aria: string;
    official: string;
    partners: string;
  };
  companies: {
    eyebrow: string;
    title: string;
    description: string;
    logoSlot: string;
    partnerLabel: string;
  };
  arenaPanel: {
    eyebrow: string;
    title: string;
    description: string;
    captions: {
      hero: string;
      plan: string;
      cut: string;
      moduleTrack: string;
      moduleDyn: string;
      feedNote: string;
      carsScale: string;
      carsSlot: string;
    };
    kickers: {
      params: string;
      feed: string;
      zones: string;
      kit: string;
    };
    specs: {
      formatK: string;
      formatV: string;
      fpvK: string;
      fpvV: string;
      controlK: string;
      controlV: string;
      viewersK: string;
      viewersV: string;
    };
    kit: {
      frame: string;
      cover: string;
      barriers: string;
      light: string;
      cameras: string;
      radio: string;
    };
    zones: {
      z1: string;
      z2: string;
      z3: string;
      z4: string;
      z5: string;
      z6: string;
    };
  };
  orgStructure: {
    eyebrow: string;
    title: string;
    description: string;
    badge: string;
    companyTag: string;
    tierTop: string;
    tierBranch: string;
    nodes: {
      company: string;
      pilot: string;
      launcher: string;
      unior: string;
    };
    people: {
      ceo: { name: string; role: string; description: string };
      coo: { name: string; role: string; description: string };
    };
    tags: {
      racing: string;
      venues: string;
      software: string;
      telemetry: string;
      education: string;
      kids: string;
    };
  };
  orgDepartments: {
    eyebrow: string;
    title: string;
    description: string;
    label: string;
    items: {
      alpha: string;
      betta: string;
      gamma: string;
      delta: string;
      epsilon: string;
      omega: string;
      mega: string;
    };
  };
  phygital: {
    eyebrow: string;
    title: string;
    description: string;
    physical: string;
    digital: string;
    merge: string;
  };
  bento: {
    eyebrow: string;
    title: string;
    description: string;
    modes: {
      drift: string;
      formula: string;
      city: string;
      free: string;
    };
    platforms: {
      pc: string;
      mobile: string;
      vr: string;
      kiosk: string;
    };
    cards: {
      universe: { title: string; text: string };
      modes: { title: string };
      physics: { title: string; text: string };
      platforms: { title: string };
      build: { title: string; text: string };
      friends: { title: string; text: string };
      raceControl: {
        title: string;
        leaderboard: string;
        circuit: string;
      };
      tracks: { title: string; text: string };
      tech: { title: string; text: string };
    };
    advantages: {
      eyebrow: string;
      title: string;
      media: string;
      unique: { title: string; text: string };
      ar: { title: string; text: string };
      map: { title: string; text: string };
      app: { title: string; text: string };
      boards: { title: string; text: string };
      production: { title: string; text: string };
    };
  };
  audience: {
    eyebrow: string;
    title: string;
    description: string;
    segments: {
      kids: { title: string; text: string; tag: string };
      gamers: { title: string; text: string };
      teens: { title: string; text: string };
      growth: { title: string; text: string };
      thinkers: { title: string; text: string };
      racing: { title: string; text: string };
      cars: { title: string; text: string };
    };
    everyone: { title: string; text: string };
  };
  subscription: {
    eyebrow: string;
    title: string;
    description: string;
    popular: string;
    cta: string;
    pilotBoard: {
      kicker: string;
      colTime: string;
      colSolo: string;
      colPerMin: string;
      colDuo: string;
      colSave: string;
      minutes: string;
      hit: string;
    };
    uniorBoard: {
      kicker: string;
      minutes: string;
      solo: string;
      withParent: string;
    };
    plans: {
      unior: {
        name: string;
        info: string;
      };
      pilot: {
        name: string;
        info: string;
      };
      launcher: {
        name: string;
        info: string;
        period: string;
        f1: string;
        f2: string;
        f3: string;
        f4: string;
      };
    };
  };
  anatomy: {
    eyebrow: string;
    title: string;
    description: string;
    parts: {
      camera: { title: string; text: string };
      video: { title: string; text: string };
      radio: { title: string; text: string };
      battery: { title: string; text: string };
      drive: { title: string; text: string };
    };
  };
  tracks: {
    eyebrow: string;
    title: string;
    description: string;
    pilot: {
      label: string;
      tag: string;
      text: string;
      point1: string;
      point2: string;
      point3: string;
    };
    unior: {
      label: string;
      tag: string;
      text: string;
      point1: string;
      point2: string;
      point3: string;
    };
    launcher: {
      label: string;
      tag: string;
      text: string;
      point1: string;
      point2: string;
      point3: string;
    };
  };
  stack: {
    eyebrow: string;
    title: string;
    description: string;
    flowFrom: string;
    flowLive: string;
    flowTo: string;
    steps: {
      car: { title: string; text: string };
      link: { title: string; text: string };
      vision: { title: string; text: string };
      pilot: { title: string; text: string };
      launcher: { title: string; text: string };
      grid: { title: string; text: string };
    };
  };
  download: {
    eyebrow: string;
    title: string;
    description: string;
    get: string;
    build: string;
    file: string;
    ctaFor: string;
    alsoAvailable: string;
    platformWindows: string;
    platformMac: string;
    platformSteam: string;
  };
  team: {
    eyebrow: string;
    title: string;
    description: string;
    footer: string;
    roles: {
      hardware: string;
      founder: string;
      game: string;
      race: string;
      design: string;
      backend: string;
      education: string;
      operations: string;
    };
  };
  market: {
    eyebrow: string;
    title: string;
    description: string;
    ram: { title: string; text: string; value: string };
    tam: { title: string; text: string; value: string };
    sam: { title: string; text: string; value: string };
    som: { title: string; text: string; value: string; share: string };
  };
  worldMap: {
    eyebrow: string;
    title: string;
    description: string;
  };
  distribution: {
    eyebrow: string;
    title: string;
    description: string;
    colCountry: string;
    colPilot: string;
    colUnior: string;
    total: string;
    pending: string;
    regions: {
      cis: string;
      latam: string;
      mena: string;
      na: string;
      asia: string;
    };
    cities: {
      la: string;
    };
    countries: {
      ru: string;
      by: string;
      kz: string;
      am: string;
      kg: string;
      uz: string;
      br: string;
      sv: string;
      ar: string;
      uy: string;
      ae: string;
      tr: string;
      us: string;
      cn: string;
    };
  };
  businessModel: {
    eyebrow: string;
    title: string;
    description: string;
    streams: {
      hardware: { title: string; text: string; tag: string };
      unior: { title: string; text: string; tag: string };
      software: { title: string; text: string; tag: string };
      media: { title: string; text: string; tag: string };
    };
  };
  capTable: {
    eyebrow: string;
    title: string;
    description: string;
    colHolder: string;
    colRole: string;
    colShare: string;
    total: string;
    pending: string;
    note: string;
    holders: {
      esop: string;
      reserve: string;
    };
    roles: {
      founder: string;
      hardware: string;
      game: string;
      esop: string;
      reserve: string;
    };
  };
  roadmap: {
    eyebrow: string;
    title: string;
    description: string;
    phases: {
      now: {
        title: string;
        text: string;
        item1: string;
        item2: string;
        item3: string;
        item4: string;
      };
      scale: {
        title: string;
        text: string;
        item1: string;
        item2: string;
        item3: string;
        item4: string;
      };
      global: {
        title: string;
        text: string;
        item1: string;
        item2: string;
        item3: string;
        item4: string;
      };
      network: {
        title: string;
        text: string;
        item1: string;
        item2: string;
        item3: string;
        item4: string;
      };
    };
  };
  investors: {
    eyebrow: string;
    title: string;
    description: string;
    launcherFirst: string;
    fineprint: string;
    formEyebrow: string;
  };
  form: {
    firstName: string;
    lastName: string;
    middleName: string;
    email: string;
    phone: string;
    emailOrPhone: string;
    submit: string;
    submitting: string;
    successEyebrow: string;
    success: string;
    checkFields: string;
    errors: {
      firstName: string;
      lastName: string;
      middleName: string;
      contactRequired: string;
      emailInvalid: string;
      phoneInvalid: string;
    };
  };
  footer: {
    rights: string;
    status: string;
  };
};

export const dictionaries: Record<Locale, Dictionary> = {
  ru: {
    meta: {
      title: "PILOT — Real Life FPV",
      description:
        "FPV-гонки в реальной жизни на мини-тачках. Скачай лаунчер Pilot под Windows, macOS и Linux.",
    },
    common: {
      download: "Скачать",
      login: "Войти",
      openMenu: "Открыть меню",
      language: "Язык",
      chooseLanguage: "Выбор языка",
      lightTheme: "Включить светлую тему",
      darkTheme: "Включить тёмную тему",
    },
    header: {
      vectorAria: "Vector — образовательная платформа",
      eduPlatform: "Образовательная платформа",
      utilityNavAria: "Дополнительная навигация",
      primaryNavAria: "Основная навигация",
      mobileNavAria: "Мобильная навигация",
      pilotHomeAria: "PILOT — на главную",
      fpvOnline: "FPV link online",
      games: "Игры",
      apps: "Приложения",
      navProject: "Проект",
      navProduct: "Продукт",
      navPricing: "Цены",
      navStructure: "Структура",
      navInvestors: "Инвесторам",
    },
    hero: {
      eyebrow: "Pitch Deck",
      headline: "Гонки на реальных машинах в масштабе",
      description:
        "FPV-гонки в реальном мире на мини-тачках. Один лаунчер — вход в трассу, телеметрию и сеть пилотов.",
      ctaDownload: "Скачать лаунчер",
      ctaInvestors: "Для инвесторов",
      scalesAria: "Масштабы машин",
      platformsAria: "Доступные платформы",
      platformApple: "Apple",
      platformWindows: "Windows",
      platformSteam: "Steam",
    },
    partners: {
      aria: "Партнёры проекта",
      official: "Official",
      partners: "Partners",
    },
    companies: {
      eyebrow: "// PARTNERS",
      title: "Компании, с которыми мы работаем",
      description:
        "Экосистема вокруг Pilot: продуктовые, технологические и операционные партнёры.",
      logoSlot: "Логотип",
      partnerLabel: "Партнёр экосистемы",
    },
    arenaPanel: {
      eyebrow: "// ARENA_PANEL",
      title: "Арена на панели",
      description: "Общий вид, схемы, параметры и зоны арены.",
      captions: {
        hero: "Ключевой ракурс · арена в сборе",
        plan: "План · траектория / зоны",
        cut: "Разрез · уровни FPV",
        moduleTrack: "Модуль траектории",
        moduleDyn: "Модуль динамики",
        feedNote: "Отдельный кадр: свет, ночь, графика на трассе.",
        carsScale: "Масштаб машин",
        carsSlot: "Слот на треке",
      },
      kickers: {
        params: "Параметры",
        feed: "Подача картинки",
        zones: "Зоны трека",
        kit: "Состав комплекта",
      },
      specs: {
        formatK: "Формат",
        formatV: "слот / заезд",
        fpvK: "FPV-линк",
        fpvV: "целевая задержка",
        controlK: "Управление",
        controlV: "руль · интерфейс",
        viewersK: "Зрители",
        viewersV: "экран · шлем",
      },
      kit: {
        frame: "Каркас",
        cover: "Покрытие",
        barriers: "Ограждения",
        light: "Свет",
        cameras: "Камеры",
        radio: "Радиоконтур",
      },
      zones: {
        z1: "Зона 1",
        z2: "Зона 2",
        z3: "Зона 3",
        z4: "Зона 4",
        z5: "Зона 5",
        z6: "Зона 6",
      },
    },
    orgStructure: {
      eyebrow: "// STRUCTURE",
      title: "Структура группы компаний",
      description: "Компания PILOT, лидерство и проекты внутри продуктовой линейки.",
      badge: "Структура компаний",
      companyTag: "Company",
      tierTop: "Компания",
      tierBranch: "Проекты и направления",
      nodes: {
        company: "Фиджитал-гоночная компания: трассы, софт и образовательные форматы.",
        pilot: "Основной продукт: реальные FPV-гонки и арены.",
        launcher: "Цифровой слой: лаунчер, телеметрия, рейтинги и сеть игроков.",
        unior: "Образовательное направление для детей и школ.",
      },
      people: {
        ceo: {
          name: "Денис Зарубин",
          role: "CEO",
          description: "Стратегия, продукт и развитие компании Pilot.",
        },
        coo: {
          name: "Антон Чикуров",
          role: "COO",
          description: "Операции, процессы, стандарты и эффективность команд.",
        },
      },
      tags: {
        racing: "Racing",
        venues: "Arenas",
        software: "Software",
        telemetry: "Telemetry",
        education: "Education",
        kids: "Kids 3–10",
      },
    },
    orgDepartments: {
      eyebrow: "// ORG_CHART",
      title: "Организационная структура компании Pilot",
      description:
        "Отделы платформы: от администрации и коммуникаций до техники, производства и масштабирования.",
      label: "Отделы",
      items: {
        alpha: "Административный центр",
        betta: "Центр персонала и коммуникации",
        gamma: "Маркетинговый центр",
        delta: "Финансовый центр",
        epsilon: "Технический центр",
        omega: "Центр производства",
        mega: "Отдел масштабирования",
      },
    },
    phygital: {
      eyebrow: "// PHYGITAL",
      title: "Два мира сходятся в одной точке",
      description:
        "Реальные машины и цифровая система соединяются в одной гонке — с телеметрией, рейтингами и живыми эмоциями.",
      physical: "Physical",
      digital: "Digital",
      merge: "Phygital",
    },
    bento: {
      eyebrow: "// PILOT_UNIVERSE",
      title: "Фиджитал гоночная вселенная",
      description:
        "Режимы, платформы, кастомизация и реальные трассы — в одном bento-обзоре продукта.",
      modes: {
        drift: "Drift",
        formula: "Formula",
        city: "City",
        free: "Free Ride",
      },
      platforms: {
        pc: "PC",
        mobile: "Mobile",
        vr: "VR",
        kiosk: "Kiosk",
      },
      cards: {
        universe: {
          title: "Фиджитал гоночная вселенная",
          text: "Реальные FPV-гонки на мини-машинах — спорт, игра и сеть пилотов.",
        },
        modes: {
          title: "Выбирай свой режим",
        },
        physics: {
          title: "Физика, которая впечатляет",
          text: "Телеметрия, сцепление и отклик — ощущение настоящей трассы.",
        },
        platforms: {
          title: "Cross-platform play",
        },
        build: {
          title: "Создавай уникальный болид",
          text: "Настройка внешнего вида и характера машины под свой стиль пилота.",
        },
        friends: {
          title: "Гоняй вместе с друзьями",
          text: "Общие заезды, рейтинги и сетка пилотов в одном лаунчере.",
        },
        raceControl: {
          title: "Race control",
          leaderboard: "Лидерборд",
          circuit: "Карта трассы",
        },
        tracks: {
          title: "Реальные трассы по всему миру",
          text: "От СНГ до США и Китая — площадки, где гонки происходят live.",
        },
        tech: {
          title: "Технологии сегодня — победы завтра",
          text: "Computer Vision, link и grid — стек, который держит матч.",
        },
      },
      advantages: {
        eyebrow: "// ADVANTAGES",
        title: "Преимущества",
        media: "Место под изображение",
        unique: {
          title: "Нет аналогов в СНГ",
          text: "Офлайн-формат с полным FPV-погружением — редкость для региона.",
        },
        ar: {
          title: "AR в игре",
          text: "Дополненная реальность усиливает заезд и восприятие трассы.",
        },
        map: {
          title: "Бесконечная карта",
          text: "Масштабируемое пространство без ощущения потолка контента.",
        },
        app: {
          title: "Приложение",
          text: "Клиент для расписания, прогресса, команды и сети пилотов.",
        },
        boards: {
          title: "VR",
          text: "Соревнование и командные сценарии держат вовлечение.",
        },
        production: {
          title: "Своё производство",
          text: "Полный цикл: от прототипа машинки до шоу на площадке.",
        },
      },
    },
    audience: {
      eyebrow: "// TARGET_AUDIENCE",
      title: "Целевая аудитория",
      description:
        "Pilot объединяет людей с разными интересами вокруг одного сильного опыта — управлять настоящей машиной как в игре.",
      segments: {
        kids: {
          title: "Дети 3–10 лет",
          text: "Безопасные мини-гонки для развития реакции и внимания.",
          tag: "Pilot Unior",
        },
        gamers: {
          title: "Те, кто играл в VR",
          text: "Игроки VR переходят к управлению настоящей машиной.",
        },
        teens: {
          title: "Подростки",
          text: "Соревнование, технологии и сообщество в игровом формате.",
        },
        growth: {
          title: "Саморазвитие",
          text: "Концентрация, реакция и инженерное мышление в движении.",
        },
        thinkers: {
          title: "Интеллектуалы",
          text: "Стратегия, телеметрия и поиск лучшей траектории.",
        },
        racing: {
          title: "Любители гонок",
          text: "Азарт старта, борьба за позицию и гоночный драйв.",
        },
        cars: {
          title: "Любители тачек",
          text: "Техника, кастомизация и характер собственного болида.",
        },
      },
      everyone: {
        title: "И всем, кому это интересно",
        text: "Pilot открыт каждому, кто хочет попробовать новый спорт на стыке реального и цифрового миров.",
      },
    },
    subscription: {
      eyebrow: "// ARENA",
      title: "Подписка Arena",
      description:
        "Тарифы на линейки Pilot, Pilot Unior и доступ к Launcher.",
      popular: "Популярный",
      cta: "Оставить заявку",
      pilotBoard: {
        kicker: "Раздел Pilot",
        colTime: "Время",
        colSolo: "Одиночная игра, ₽",
        colPerMin: "Цена за минуту, ₽",
        colDuo: "Игра вдвоём, ₽",
        colSave: "Выгода, ₽",
        minutes: "{n} минут",
        hit: "Хит!",
      },
      uniorBoard: {
        kicker: "Раздел Pilot Unior",
        minutes: "{n} мин",
        solo: "Одиночная игра",
        withParent: "С родителем",
      },
      plans: {
        unior: {
          name: "Pilot Unior",
          info: "Детский формат: 12 минут на трассе.",
        },
        pilot: {
          name: "Pilot",
          info: "Цены на заезды: одиночная игра и игра вдвоём.",
        },
        launcher: {
          name: "Launcher",
          info: "Цифровой клиент · ежемесячно",
          period: "в месяц",
          f1: "Клиент входа на трассу",
          f2: "Телеметрия матчей",
          f3: "Сеть пилотов и матчмейкинг",
          f4: "Обновления и новые режимы",
        },
      },
    },
    anatomy: {
      eyebrow: "// CUTAWAY_VIEW",
      title: "Что внутри машинки",
      description:
        "Нажми на узлы — разберём FPV-стек: от камеры до привода.",
      parts: {
        camera: {
          title: "FPV-камера",
          text: "Снимает трассу от первого лица и отдаёт картинку в видеолинк пилота.",
        },
        video: {
          title: "Видеопередатчик",
          text: "Шлёт видео в очки по 5.8 GHz — низкая задержка, прямой эфир с трассы.",
        },
        radio: {
          title: "Радиоприёмник",
          text: "Принимает команды с пульта: газ, руль, режим — без лишней задержки.",
        },
        battery: {
          title: "Батарея",
          text: "Питает камеру, линк, приёмник и моторы на всю гоночную сессию.",
        },
        drive: {
          title: "Привод AWD",
          text: "Моторы и шасси держат мини-тачку на траектории в реальном мире.",
        },
      },
    },
    tracks: {
      eyebrow: "// BUSINESS_TRACKS",
      title: "Три точки бизнеса",
      description:
        "Pilot — гонки. Pilot Unior — образование. Pilot Launcher — клиент входа на трассу.",
      pilot: {
        label: "Pilot",
        tag: "Racing",
        text: "Реальные FPV-гонки на мини-тачках: трасса, телеметрия и сеть пилотов.",
        point1: "Соревновательный формат и ивенты",
        point2: "Телеметрия в реальном времени",
        point3: "Для пилотов, клубов и организаторов",
      },
      unior: {
        label: "Pilot Unior",
        tag: "Education",
        text: "Мягкий вход в FPV через Vector: обучение, безопасность и первые километры за рулём.",
        point1: "Образовательный трек для школ и кружков",
        point2: "Безопасный онбординг без гоночного стресса",
        point3: "Тот же FPV-DNA, другой уровень входа",
      },
      launcher: {
        label: "Pilot Launcher",
        tag: "Software",
        text: "Клиент входа в экосистему: билды под ОС, обновления и быстрый старт сессии.",
        point1: "Windows, macOS и Linux в одном потоке",
        point2: "Подключение к трассе и телеметрии",
        point3: "Точка входа для Pilot и Pilot Unior",
      },
    },
    stack: {
      eyebrow: "// TECH_SUM",
      title: "Сумма технологий",
      description:
        "От мини-тачки до сети пилотов — как слои складываются в одну рабочую систему.",
      flowFrom: "Track side",
      flowLive: "Signal live",
      flowTo: "Pilot side",
      steps: {
        car: {
          title: "Mini car",
          text: "Железо на трассе: шасси, привод, камера и бортовой стек, который собирает гонку в реальном мире.",
        },
        link: {
          title: "FPV link",
          text: "Видеолинк 5.8 GHz и радиоканал управления — низкая задержка между машинкой и пилотом.",
        },
        vision: {
          title: "Computer Vision",
          text: "Компьютерное зрение разбирает видеопоток: разметка трассы, детект объектов и телеметрия для гонки и обучения.",
        },
        pilot: {
          title: "Pilot view",
          text: "Очки и пульт: пилот видит трассу от первого лица и ведёт тачку как в симе, только по-настоящему.",
        },
        launcher: {
          title: "Launcher",
          text: "Клиент синхронизирует сессию, обновления и телеметрию — вход в экосистему Pilot.",
        },
        grid: {
          title: "Pilot grid",
          text: "Сеть пилотов, ивенты и Unior-трек через Vector — вся сумма технологий в одном контуре.",
        },
      },
    },
    download: {
      eyebrow: "// MODULE_UPDATE",
      title: "Скачивайте лаунчер Pilot",
      description:
        "Один клик — клиент Pilot под вашу систему. Остальные платформы доступны ниже.",
      get: "GET →",
      build: "BUILD",
      file: "FILE",
      ctaFor: "Скачать для {os}",
      alsoAvailable: "Также доступно",
      platformWindows: "Windows",
      platformMac: "macOS",
      platformSteam: "Steam",
    },
    team: {
      eyebrow: "Vector platform // Pilot game",
      title: "Команда Pilot",
      description:
        "Инженеры, разработчики и пилоты, которые превращают FPV-гонки в реальный технологический спорт.",
      footer: "Build together · Race together · Learn together",
      roles: {
        hardware: "Hardware lead",
        founder: "Founder / CEO",
        game: "Game director",
        race: "Race systems",
        design: "Product design",
        backend: "Backend",
        education: "Education",
        operations: "Operations",
      },
    },
    market: {
      eyebrow: "// MARKET_SCOPE",
      title: "От рынка к доле Pilot",
      description:
        "Инвестиционная воронка: от глобального потенциала категории до достижимой доли Pilot.",
      ram: {
        title: "Потенциальный объём рынка",
        text: "Максимально возможный спрос в глобальном масштабе.",
        value: "~120 млрд $",
      },
      tam: {
        title: "Общий объём рынка",
        text: "Реальный рынок в наших категориях и сегментах.",
        value: "~38 млрд $",
      },
      sam: {
        title: "Доступный объём рынка",
        text: "Сегменты, доступные для охвата с текущей моделью.",
        value: "~9,5 млрд $",
      },
      som: {
        title: "Достижимая доля Pilot",
        text: "Наша реалистичная доля при фокусе и преимуществах.",
        value: "~2,1 млрд $",
        share: "2,2%",
      },
    },
    worldMap: {
      eyebrow: "// GLOBAL_GRID",
      title: "ТЦ и серверы",
      description:
        "Маршруты для медиа, матчей и телеметрии — условная схема связности ключевых точек Pilot.",
    },
    distribution: {
      eyebrow: "// MARKET_FOOTPRINT",
      title: "Рынок распространения",
      description:
        "Потенциал точек Pilot и Pilot Unior по странам. Разбивка уточняется.",
      colCountry: "Страна",
      colPilot: "Pilot",
      colUnior: "Unior",
      total: "Итого",
      pending: "—",
      regions: {
        cis: "СНГ",
        latam: "Латинская Америка",
        mena: "Ближний Восток",
        na: "Северная Америка",
        asia: "Азия",
      },
      cities: {
        la: "Los Angeles",
      },
      countries: {
        ru: "Россия",
        by: "Беларусь",
        kz: "Казахстан",
        am: "Армения",
        kg: "Киргизия",
        uz: "Узбекистан",
        br: "Бразилия",
        sv: "Сальвадор",
        ar: "Аргентина",
        uy: "Уругвай",
        ae: "ОАЭ",
        tr: "Турция",
        us: "США",
        cn: "Китай",
      },
    },
    businessModel: {
      eyebrow: "// BUSINESS_MODEL",
      title: "Бизнес-модель",
      description:
        "Четыре потока выручки вокруг реальных FPV-гонок: железо, образование, софт и медиа.",
      streams: {
        hardware: {
          title: "Железо и трассы",
          text: "Продажа машин, трасс и комплектов площадкам, клубам и партнёрам. Разовый CAPEX с повторяемыми апгрейдами.",
          tag: "Hardware",
        },
        unior: {
          title: "Pilot Unior",
          text: "Лицензии и программы для школ и вузов: образование как масштабируемый B2B/B2G канал.",
          tag: "Education",
        },
        software: {
          title: "Launcher и сеть",
          text: "Клиент входа, телеметрия, матчи и доступ к сети пилотов — подписки и комиссия с активности.",
          tag: "Software",
        },
        media: {
          title: "Медиа и ивенты",
          text: "Трансляции, спонсорство и турниры: внимание аудитории конвертируется в партнёрский revenue.",
          tag: "Media",
        },
      },
    },
    capTable: {
      eyebrow: "// CAP_TABLE",
      title: "Cap table",
      description:
        "Предварительная структура долей команды и резервов. Финальный сплит уточняется перед раундом.",
      colHolder: "Держатель",
      colRole: "Роль",
      colShare: "Доля",
      total: "Итого",
      pending: "—",
      note: "Illustrative · pre-round · subject to term sheet",
      holders: {
        esop: "Team ESOP",
        reserve: "Reserve",
      },
      roles: {
        founder: "Founder / CEO",
        hardware: "Hardware Lead",
        game: "Game Lead",
        esop: "Опционный пул команды",
        reserve: "Резерв под раунд",
      },
    },
    roadmap: {
      eyebrow: "// ROADMAP",
      title: "Roadmap",
      description:
        "От первых трасс и лаунчера — к глобальной сети пилотов, образованию и медиа.",
      phases: {
        now: {
          title: "Now",
          text: "Запуск продукта и первые живые площадки.",
          item1: "Pilot Launcher для Windows / macOS / Linux",
          item2: "Пилотные трассы в СНГ",
          item3: "Телеметрия матчей и базовая сетка пилотов",
          item4: "Инвест-дек и партнёрский канал",
        },
        scale: {
          title: "2026 H1",
          text: "Масштабирование железа и образовательного трека.",
          item1: "Серийное производство машин и комплектов трасс",
          item2: "Pilot Unior: пилоты со школами и вузами",
          item3: "Выход в LatAm (Бразилия и хабы)",
          item4: "Партнёрская сеть операторов площадок",
        },
        global: {
          title: "2026 H2",
          text: "Крупные рынки и медиа-слой вокруг гонок.",
          item1: "США / Los Angeles — флагманский хаб",
          item2: "Китай: локальный партнёр и поставки",
          item3: "Трансляции, спонсорства и турнирный календарь",
          item4: "Подписки и комиссия в Launcher-сети",
        },
        network: {
          title: "2027+",
          text: "Глобальная лига и экосистема вокруг Pilot.",
          item1: "Международный чемпионат и сезонный рейтинг",
          item2: "Franchise-модель площадок",
          item3: "Полный стек: CV / link / grid в проде",
          item4: "Сетевой эффект: пилоты ↔ площадки ↔ медиа",
        },
      },
    },
    investors: {
      eyebrow: "// INVESTOR_CHANNEL",
      title: "Заявка инвестора",
      description:
        "Реальные FPV-гонки на мини-машинах — новый формат спорта и развлечения. Оставьте контакты — вернёмся с deck и следующим шагом.",
      launcherFirst: "Сначала лаунчер",
      fineprint: "DECK · TERM_SHEET · DEMO — по запросу · NO PUBLIC FILING",
      formEyebrow: "// SUBMIT_APPLICATION",
    },
    form: {
      firstName: "Имя",
      lastName: "Фамилия",
      middleName: "Отчество",
      email: "Почта",
      phone: "Телефон",
      emailOrPhone: "Достаточно указать почту или телефон.",
      submit: "Оставить заявку",
      submitting: "Отправка...",
      successEyebrow: "// APPLICATION_LOCKED",
      success: "Заявка принята. Мы свяжемся с вами.",
      checkFields: "Проверьте поля формы",
      errors: {
        firstName: "Укажите имя",
        lastName: "Укажите фамилию",
        middleName: "Укажите отчество",
        contactRequired: "Укажите почту или телефон",
        emailInvalid: "Некорректный email",
        phoneInvalid: "Некорректный телефон",
      },
    },
    footer: {
      rights: "© {year} PILOT · REAL LIFE FPV",
      status: "GRID LOCKED · TELEMETRY IDLE · BUILD FRONTEND-ONLY",
    },
  },
  en: {
    meta: {
      title: "PILOT — Real Life FPV",
      description:
        "Real-life FPV racing on mini cars. Download the Pilot launcher for Windows, macOS, and Linux.",
    },
    common: {
      download: "Download",
      login: "Sign in",
      openMenu: "Open menu",
      language: "Language",
      chooseLanguage: "Choose language",
      lightTheme: "Switch to light theme",
      darkTheme: "Switch to dark theme",
    },
    header: {
      vectorAria: "Vector — education platform",
      eduPlatform: "Education platform",
      utilityNavAria: "Utility navigation",
      primaryNavAria: "Primary navigation",
      mobileNavAria: "Mobile navigation",
      pilotHomeAria: "PILOT — home",
      fpvOnline: "FPV link online",
      games: "Games",
      apps: "Apps",
      navProject: "Project",
      navProduct: "Product",
      navPricing: "Pricing",
      navStructure: "Structure",
      navInvestors: "Investors",
    },
    hero: {
      eyebrow: "Pitch Deck",
      headline: "Racing on real cars at scale",
      description:
        "FPV racing in the real world on mini cars. One launcher — entry to the track, telemetry, and the pilot network.",
      ctaDownload: "Download launcher",
      ctaInvestors: "For investors",
      scalesAria: "Car scales",
      platformsAria: "Available platforms",
      platformApple: "Apple",
      platformWindows: "Windows",
      platformSteam: "Steam",
    },
    partners: {
      aria: "Project partners",
      official: "Official",
      partners: "Partners",
    },
    companies: {
      eyebrow: "// PARTNERS",
      title: "Companies we work with",
      description:
        "The Pilot ecosystem: product, technology, and operations partners.",
      logoSlot: "Logo",
      partnerLabel: "Ecosystem partner",
    },
    arenaPanel: {
      eyebrow: "// ARENA_PANEL",
      title: "Arena on the board",
      description: "Overview, schematics, specs, and track zones.",
      captions: {
        hero: "Hero angle · full arena",
        plan: "Plan · trajectory / zones",
        cut: "Section · FPV levels",
        moduleTrack: "Trajectory module",
        moduleDyn: "Dynamics module",
        feedNote: "Separate frame: light, night, track graphics.",
        carsScale: "Car scale",
        carsSlot: "Track slot",
      },
      kickers: {
        params: "Specs",
        feed: "Picture feed",
        zones: "Track zones",
        kit: "Kit contents",
      },
      specs: {
        formatK: "Format",
        formatV: "slot / heat",
        fpvK: "FPV link",
        fpvV: "target latency",
        controlK: "Controls",
        controlV: "wheel · UI",
        viewersK: "Spectators",
        viewersV: "screen · headset",
      },
      kit: {
        frame: "Frame",
        cover: "Surface",
        barriers: "Barriers",
        light: "Lighting",
        cameras: "Cameras",
        radio: "Radio loop",
      },
      zones: {
        z1: "Zone 1",
        z2: "Zone 2",
        z3: "Zone 3",
        z4: "Zone 4",
        z5: "Zone 5",
        z6: "Zone 6",
      },
    },
    orgStructure: {
      eyebrow: "// STRUCTURE",
      title: "Group company structure",
      description: "PILOT company, leadership, and projects inside the product line.",
      badge: "Company structure",
      companyTag: "Company",
      tierTop: "Company",
      tierBranch: "Projects & directions",
      nodes: {
        company: "Phygital racing company: tracks, software, and education formats.",
        pilot: "Core product: real FPV racing and arenas.",
        launcher: "Digital layer: launcher, telemetry, rankings, and player network.",
        unior: "Education vertical for kids and schools.",
      },
      people: {
        ceo: {
          name: "Denis Zarubin",
          role: "CEO",
          description: "Strategy, product vision, and company growth at Pilot.",
        },
        coo: {
          name: "Anton Chikurov",
          role: "COO",
          description: "Operations, processes, quality standards, and team efficiency.",
        },
      },
      tags: {
        racing: "Racing",
        venues: "Arenas",
        software: "Software",
        telemetry: "Telemetry",
        education: "Education",
        kids: "Kids 3–10",
      },
    },
    orgDepartments: {
      eyebrow: "// ORG_CHART",
      title: "Pilot company org structure",
      description:
        "Platform departments: from admin and communications to tech, production, and scaling.",
      label: "Departments",
      items: {
        alpha: "Administrative center",
        betta: "People & communications center",
        gamma: "Marketing center",
        delta: "Finance center",
        epsilon: "Technical center",
        omega: "Production center",
        mega: "Scaling department",
      },
    },
    phygital: {
      eyebrow: "// PHYGITAL",
      title: "Two worlds meet at one point",
      description:
        "Real cars and the digital system meet in one race — with telemetry, rankings, and genuine emotion.",
      physical: "Physical",
      digital: "Digital",
      merge: "Phygital",
    },
    bento: {
      eyebrow: "// PILOT_UNIVERSE",
      title: "Phygital racing universe",
      description:
        "Modes, platforms, customization, and real tracks — a bento overview of Pilot.",
      modes: {
        drift: "Drift",
        formula: "Formula",
        city: "City",
        free: "Free Ride",
      },
      platforms: {
        pc: "PC",
        mobile: "Mobile",
        vr: "VR",
        kiosk: "Kiosk",
      },
      cards: {
        universe: {
          title: "Phygital racing universe",
          text: "Real-life FPV racing on mini cars — sport, play, and a pilot network.",
        },
        modes: {
          title: "Choose your mode",
        },
        physics: {
          title: "Physics that impress",
          text: "Telemetry, grip, and response — the feel of a real track.",
        },
        platforms: {
          title: "Cross-platform play",
        },
        build: {
          title: "Build a unique car",
          text: "Tune look and handling to match your pilot style.",
        },
        friends: {
          title: "Race with friends",
          text: "Shared races, rankings, and the pilot grid in one launcher.",
        },
        raceControl: {
          title: "Race control",
          leaderboard: "Leaderboard",
          circuit: "Circuit map",
        },
        tracks: {
          title: "Real tracks worldwide",
          text: "From CIS to the USA and China — venues where races go live.",
        },
        tech: {
          title: "Tech today — wins tomorrow",
          text: "Computer Vision, link, and grid — the stack that holds the match.",
        },
      },
      advantages: {
        eyebrow: "// ADVANTAGES",
        title: "Advantages",
        media: "Image placeholder",
        unique: {
          title: "No CIS offline peers",
          text: "An offline FPV immersion format that is rare for the region.",
        },
        ar: {
          title: "In-game AR",
          text: "Augmented reality elevates the race and track perception.",
        },
        map: {
          title: "Endless map",
          text: "Scalable play space without a content ceiling feel.",
        },
        app: {
          title: "App layer",
          text: "Client for schedule, progress, teams, and the pilot network.",
        },
        boards: {
          title: "VR",
          text: "Competition and team modes that keep retention high.",
        },
        production: {
          title: "Own production",
          text: "Full cycle — from car prototype to a live venue show.",
        },
      },
    },
    audience: {
      eyebrow: "// TARGET_AUDIENCE",
      title: "Target audience",
      description:
        "Pilot brings different interests together around one powerful experience — driving a real car like a game.",
      segments: {
        kids: {
          title: "Kids 3–10",
          text: "A safe first driving experience — play and reaction skills through real mini racing.",
          tag: "Pilot Unior",
        },
        gamers: {
          title: "VR players",
          text: "Players looking for the next level of immersion — now in the real world.",
        },
        teens: {
          title: "Teenagers",
          text: "Competition, technology, and community in a familiar game format.",
        },
        growth: {
          title: "Self-development",
          text: "Control skills, focus, reaction, and engineering thinking.",
        },
        thinkers: {
          title: "Thinkers",
          text: "Strategy, telemetry, and the search for the best line on every lap.",
        },
        racing: {
          title: "Racing fans",
          text: "Start-line tension, position battles, and real competitive drive.",
        },
        cars: {
          title: "Car enthusiasts",
          text: "Technology, customization, and the character of your own race car.",
        },
      },
      everyone: {
        title: "And everyone curious",
        text: "Pilot is open to anyone who wants to try a new sport where physical and digital worlds meet.",
      },
    },
    subscription: {
      eyebrow: "// ARENA",
      title: "Arena subscription",
      description: "Plans for Pilot, Pilot Unior, and Launcher access.",
      popular: "Popular",
      cta: "Apply now",
      pilotBoard: {
        kicker: "Pilot section",
        colTime: "Time",
        colSolo: "Single play, ₽",
        colPerMin: "Per minute, ₽",
        colDuo: "Two players, ₽",
        colSave: "Savings, ₽",
        minutes: "{n} minutes",
        hit: "Hit!",
      },
      uniorBoard: {
        kicker: "Pilot Unior section",
        minutes: "{n} min",
        solo: "Single play",
        withParent: "With a parent",
      },
      plans: {
        unior: {
          name: "Pilot Unior",
          info: "Kids format: 12 minutes on track.",
        },
        pilot: {
          name: "Pilot",
          info: "Session prices: solo and duo races.",
        },
        launcher: {
          name: "Launcher",
          info: "Digital client · monthly",
          period: "per month",
          f1: "Track entry client",
          f2: "Match telemetry",
          f3: "Pilot network and matchmaking",
          f4: "Updates and new modes",
        },
      },
    },
    anatomy: {
      eyebrow: "// CUTAWAY_VIEW",
      title: "Inside the mini car",
      description:
        "Tap the modules — we break down the FPV stack from camera to drivetrain.",
      parts: {
        camera: {
          title: "FPV camera",
          text: "Captures the track in first person and feeds the pilot video link.",
        },
        video: {
          title: "Video transmitter",
          text: "Sends the feed to the goggles on 5.8 GHz — low latency, live from the grid.",
        },
        radio: {
          title: "Radio receiver",
          text: "Takes throttle, steering, and mode commands from the controller.",
        },
        battery: {
          title: "Battery",
          text: "Powers camera, link, receiver, and motors through the race session.",
        },
        drive: {
          title: "AWD drive",
          text: "Motors and chassis keep the mini car locked to the real-world line.",
        },
      },
    },
    tracks: {
      eyebrow: "// BUSINESS_TRACKS",
      title: "Three business tracks",
      description:
        "Pilot is racing. Pilot Unior is education. Pilot Launcher is the entry client.",
      pilot: {
        label: "Pilot",
        tag: "Racing",
        text: "Real-life FPV racing on mini cars: track, telemetry, and the pilot network.",
        point1: "Competitive format and live events",
        point2: "Real-time telemetry",
        point3: "For pilots, clubs, and organizers",
      },
      unior: {
        label: "Pilot Unior",
        tag: "Education",
        text: "A softer FPV entry through Vector: learning, safety, and first kilometers behind the wheel.",
        point1: "Education track for schools and clubs",
        point2: "Safe onboarding without race pressure",
        point3: "Same FPV DNA, different entry level",
      },
      launcher: {
        label: "Pilot Launcher",
        tag: "Software",
        text: "The entry client for the ecosystem: OS builds, updates, and a fast session start.",
        point1: "Windows, macOS, and Linux in one flow",
        point2: "Connects to track and telemetry",
        point3: "Entry point for Pilot and Pilot Unior",
      },
    },
    stack: {
      eyebrow: "// TECH_SUM",
      title: "Technology sum",
      description:
        "From the mini car to the pilot network — how the layers lock into one working system.",
      flowFrom: "Track side",
      flowLive: "Signal live",
      flowTo: "Pilot side",
      steps: {
        car: {
          title: "Mini car",
          text: "Track-side hardware: chassis, drive, camera, and onboard stack that turns racing into the real world.",
        },
        link: {
          title: "FPV link",
          text: "5.8 GHz video link and radio control — low latency between the car and the pilot.",
        },
        vision: {
          title: "Computer Vision",
          text: "Computer vision parses the video feed: track marking, object detection, and telemetry for racing and training.",
        },
        pilot: {
          title: "Pilot view",
          text: "Goggles and controller: first-person track vision with real-world steering feel.",
        },
        launcher: {
          title: "Launcher",
          text: "The client syncs sessions, updates, and telemetry — entry into the Pilot ecosystem.",
        },
        grid: {
          title: "Pilot grid",
          text: "Pilot network, events, and the Unior track via Vector — the full tech sum in one loop.",
        },
      },
    },
    download: {
      eyebrow: "// MODULE_UPDATE",
      title: "Download launcher",
      description:
        "One click — the Pilot client for your system. Other platforms are listed below.",
      get: "GET →",
      build: "BUILD",
      file: "FILE",
      ctaFor: "Download for {os}",
      alsoAvailable: "Also available",
      platformWindows: "Windows",
      platformMac: "macOS",
      platformSteam: "Steam",
    },
    team: {
      eyebrow: "Vector platform // Pilot game",
      title: "Pilot team",
      description:
        "Engineers, developers, and pilots turning FPV racing into a real technology sport.",
      footer: "Build together · Race together · Learn together",
      roles: {
        hardware: "Hardware lead",
        founder: "Founder / CEO",
        game: "Game director",
        race: "Race systems",
        design: "Product design",
        backend: "Backend",
        education: "Education",
        operations: "Operations",
      },
    },
    market: {
      eyebrow: "// MARKET_SCOPE",
      title: "From market to Pilot share",
      description:
        "The investment funnel: from global category potential to Pilot's obtainable market share.",
      ram: {
        title: "Potential market volume",
        text: "The maximum possible demand at global scale.",
        value: "~$120B",
      },
      tam: {
        title: "Total addressable market",
        text: "The real market across our categories and segments.",
        value: "~$38B",
      },
      sam: {
        title: "Serviceable available market",
        text: "Segments addressable with the current model.",
        value: "~$9.5B",
      },
      som: {
        title: "Pilot obtainable share",
        text: "Our realistic share with focused execution and advantages.",
        value: "~$2.1B",
        share: "2.2%",
      },
    },
    worldMap: {
      eyebrow: "// GLOBAL_GRID",
      title: "DCs and servers",
      description:
        "Routes for media, matches, and telemetry — a schematic of Pilot connectivity across key hubs.",
    },
    distribution: {
      eyebrow: "// MARKET_FOOTPRINT",
      title: "Market footprint",
      description:
        "Potential Pilot and Pilot Unior points by country. Split TBD.",
      colCountry: "Country",
      colPilot: "Pilot",
      colUnior: "Unior",
      total: "Total",
      pending: "—",
      regions: {
        cis: "CIS",
        latam: "Latin America",
        mena: "Middle East",
        na: "North America",
        asia: "Asia",
      },
      cities: {
        la: "Los Angeles",
      },
      countries: {
        ru: "Russia",
        by: "Belarus",
        kz: "Kazakhstan",
        am: "Armenia",
        kg: "Kyrgyzstan",
        uz: "Uzbekistan",
        br: "Brazil",
        sv: "El Salvador",
        ar: "Argentina",
        uy: "Uruguay",
        ae: "UAE",
        tr: "Turkey",
        us: "USA",
        cn: "China",
      },
    },
    businessModel: {
      eyebrow: "// BUSINESS_MODEL",
      title: "Business model",
      description:
        "Four revenue streams around real-life FPV racing: hardware, education, software, and media.",
      streams: {
        hardware: {
          title: "Hardware & tracks",
          text: "Cars, tracks, and kits sold to venues, clubs, and partners. One-time CAPEX with recurring upgrades.",
          tag: "Hardware",
        },
        unior: {
          title: "Pilot Unior",
          text: "Licenses and programs for schools and universities — education as a scalable B2B/B2G channel.",
          tag: "Education",
        },
        software: {
          title: "Launcher & network",
          text: "Entry client, telemetry, matches, and pilot network access — subscriptions and activity fees.",
          tag: "Software",
        },
        media: {
          title: "Media & events",
          text: "Broadcasts, sponsorships, and tournaments: audience attention converted into partner revenue.",
          tag: "Media",
        },
      },
    },
    capTable: {
      eyebrow: "// CAP_TABLE",
      title: "Cap table",
      description:
        "Preliminary ownership for the team and reserves. Final split locks before the round.",
      colHolder: "Holder",
      colRole: "Role",
      colShare: "Share",
      total: "Total",
      pending: "—",
      note: "Illustrative · pre-round · subject to term sheet",
      holders: {
        esop: "Team ESOP",
        reserve: "Reserve",
      },
      roles: {
        founder: "Founder / CEO",
        hardware: "Hardware Lead",
        game: "Game Lead",
        esop: "Team option pool",
        reserve: "Round reserve",
      },
    },
    roadmap: {
      eyebrow: "// ROADMAP",
      title: "Roadmap",
      description:
        "From first tracks and the launcher to a global pilot network, education, and media.",
      phases: {
        now: {
          title: "Now",
          text: "Product launch and the first live venues.",
          item1: "Pilot Launcher for Windows / macOS / Linux",
          item2: "Pilot tracks across the CIS",
          item3: "Match telemetry and a basic pilot grid",
          item4: "Investor deck and partner channel",
        },
        scale: {
          title: "2026 H1",
          text: "Scale hardware and the education track.",
          item1: "Serial production of cars and track kits",
          item2: "Pilot Unior pilots with schools and universities",
          item3: "LatAm expansion (Brazil and hubs)",
          item4: "Partner network of venue operators",
        },
        global: {
          title: "2026 H2",
          text: "Major markets and a media layer around racing.",
          item1: "USA / Los Angeles flagship hub",
          item2: "China: local partner and supply",
          item3: "Broadcasts, sponsorships, and tournament calendar",
          item4: "Subscriptions and fees in the Launcher network",
        },
        network: {
          title: "2027+",
          text: "A global league and ecosystem around Pilot.",
          item1: "International championship and seasonal ranking",
          item2: "Venue franchise model",
          item3: "Full stack live: CV / link / grid",
          item4: "Network effects: pilots ↔ venues ↔ media",
        },
      },
    },
    investors: {
      eyebrow: "// INVESTOR_CHANNEL",
      title: "Investor application",
      description:
        "Real FPV racing on mini cars — a new format of sport and entertainment. Leave your contacts and we’ll follow up with the deck and next steps.",
      launcherFirst: "Try the launcher first",
      fineprint: "DECK · TERM_SHEET · DEMO — on request · NO PUBLIC FILING",
      formEyebrow: "// SUBMIT_APPLICATION",
    },
    form: {
      firstName: "First name",
      lastName: "Last name",
      middleName: "Middle name",
      email: "Email",
      phone: "Phone",
      emailOrPhone: "Provide an email or a phone number.",
      submit: "Submit application",
      submitting: "Sending...",
      successEyebrow: "// APPLICATION_LOCKED",
      success: "Application received. We’ll get back to you.",
      checkFields: "Please check the form fields",
      errors: {
        firstName: "Enter your first name",
        lastName: "Enter your last name",
        middleName: "Enter your middle name",
        contactRequired: "Provide an email or phone number",
        emailInvalid: "Invalid email",
        phoneInvalid: "Invalid phone number",
      },
    },
    footer: {
      rights: "© {year} PILOT · REAL LIFE FPV",
      status: "GRID LOCKED · TELEMETRY IDLE · BUILD FRONTEND-ONLY",
    },
  },
  de: {
    meta: {
      title: "PILOT — Real Life FPV",
      description:
        "Echtes FPV-Racing mit Mini-Autos. Lade den Pilot-Launcher für Windows, macOS und Linux herunter.",
    },
    common: {
      download: "Download",
      login: "Anmelden",
      openMenu: "Menü öffnen",
      language: "Sprache",
      chooseLanguage: "Sprache wählen",
      lightTheme: "Hellmodus aktivieren",
      darkTheme: "Dunkelmodus aktivieren",
    },
    header: {
      vectorAria: "Vector — Bildungsplattform",
      eduPlatform: "Bildungsplattform",
      utilityNavAria: "Zusätzliche Navigation",
      primaryNavAria: "Hauptnavigation",
      mobileNavAria: "Mobile Navigation",
      pilotHomeAria: "PILOT — Startseite",
      fpvOnline: "FPV link online",
      games: "Spiele",
      apps: "Apps",
      navProject: "Projekt",
      navProduct: "Produkt",
      navPricing: "Preise",
      navStructure: "Struktur",
      navInvestors: "Investoren",
    },
    hero: {
      eyebrow: "Pitch Deck",
      headline: "Rennen mit echten Autos im Maßstab",
      description:
        "FPV-Rennen in der realen Welt mit Mini-Autos. Ein Launcher — Zugang zur Strecke, Telemetrie und dem Pilotennetzwerk.",
      ctaDownload: "Launcher laden",
      ctaInvestors: "Für Investoren",
      scalesAria: "Auto-Maßstäbe",
      platformsAria: "Verfügbare Plattformen",
      platformApple: "Apple",
      platformWindows: "Windows",
      platformSteam: "Steam",
    },
    partners: {
      aria: "Projektpartner",
      official: "Official",
      partners: "Partners",
    },
    companies: {
      eyebrow: "// PARTNERS",
      title: "Unternehmen, mit denen wir arbeiten",
      description:
        "Das Pilot-Ökosystem: Produkt-, Technologie- und Operations-Partner.",
      logoSlot: "Logo",
      partnerLabel: "Ökosystem-Partner",
    },
    arenaPanel: {
      eyebrow: "// ARENA_PANEL",
      title: "Arena auf dem Board",
      description: "Gesamtansicht, Schemata, Parameter und Streckenzonen.",
      captions: {
        hero: "Hauptansicht · Arena komplett",
        plan: "Plan · Trajektorie / Zonen",
        cut: "Schnitt · FPV-Ebenen",
        moduleTrack: "Trajektorie-Modul",
        moduleDyn: "Dynamik-Modul",
        feedNote: "Separater Frame: Licht, Nacht, Streckengrafik.",
        carsScale: "Auto-Maßstab",
        carsSlot: "Slot auf der Strecke",
      },
      kickers: {
        params: "Parameter",
        feed: "Bildzufuhr",
        zones: "Streckenzonen",
        kit: "Kit-Inhalt",
      },
      specs: {
        formatK: "Format",
        formatV: "Slot / Heat",
        fpvK: "FPV-Link",
        fpvV: "Ziel-Latenz",
        controlK: "Steuerung",
        controlV: "Lenkrad · UI",
        viewersK: "Zuschauer",
        viewersV: "Screen · Headset",
      },
      kit: {
        frame: "Rahmen",
        cover: "Belag",
        barriers: "Barrieren",
        light: "Licht",
        cameras: "Kameras",
        radio: "Funkkreis",
      },
      zones: {
        z1: "Zone 1",
        z2: "Zone 2",
        z3: "Zone 3",
        z4: "Zone 4",
        z5: "Zone 5",
        z6: "Zone 6",
      },
    },
    orgStructure: {
      eyebrow: "// STRUCTURE",
      title: "Struktur der Unternehmensgruppe",
      description: "Unternehmen PILOT, Führung und Projekte in der Produktlinie.",
      badge: "Unternehmensstruktur",
      companyTag: "Company",
      tierTop: "Unternehmen",
      tierBranch: "Projekte & Richtungen",
      nodes: {
        company: "Phygital-Racing-Unternehmen: Strecken, Software und Bildungsformate.",
        pilot: "Kernprodukt: echtes FPV-Racing und Arenen.",
        launcher: "Digitale Schicht: Launcher, Telemetrie, Rankings und Spielernetzwerk.",
        unior: "Bildungsrichtung für Kinder und Schulen.",
      },
      people: {
        ceo: {
          name: "Denis Zarubin",
          role: "CEO",
          description: "Strategie, Produktvision und Wachstum von Pilot.",
        },
        coo: {
          name: "Anton Chikurov",
          role: "COO",
          description: "Operationen, Prozesse, Qualitätsstandards und Team-Effizienz.",
        },
      },
      tags: {
        racing: "Racing",
        venues: "Arenas",
        software: "Software",
        telemetry: "Telemetry",
        education: "Education",
        kids: "Kids 3–10",
      },
    },
    orgDepartments: {
      eyebrow: "// ORG_CHART",
      title: "Organisationsstruktur von Pilot",
      description:
        "Plattform-Abteilungen: von Admin und Kommunikation bis Technik, Produktion und Skalierung.",
      label: "Abteilungen",
      items: {
        alpha: "Administratives Zentrum",
        betta: "Personal- und Kommunikationszentrum",
        gamma: "Marketingzentrum",
        delta: "Finanzzentrum",
        epsilon: "Technisches Zentrum",
        omega: "Produktionszentrum",
        mega: "Skalierungsabteilung",
      },
    },
    phygital: {
      eyebrow: "// PHYGITAL",
      title: "Zwei Welten treffen sich in einem Punkt",
      description:
        "Echte Fahrzeuge und das digitale System treffen in einem Rennen aufeinander — mit Telemetrie, Rankings und echten Emotionen.",
      physical: "Physical",
      digital: "Digital",
      merge: "Phygital",
    },
    bento: {
      eyebrow: "// PILOT_UNIVERSE",
      title: "Phygital Racing-Universum",
      description:
        "Modi, Plattformen, Customizing und echte Strecken — Bento-Überblick zu Pilot.",
      modes: {
        drift: "Drift",
        formula: "Formula",
        city: "City",
        free: "Free Ride",
      },
      platforms: {
        pc: "PC",
        mobile: "Mobile",
        vr: "VR",
        kiosk: "Kiosk",
      },
      cards: {
        universe: {
          title: "Phygital Racing-Universum",
          text: "Echtes FPV-Racing mit Mini-Autos — Sport, Play und Pilot-Netzwerk.",
        },
        modes: {
          title: "Wähle deinen Modus",
        },
        physics: {
          title: "Physik, die beeindruckt",
          text: "Telemetrie, Grip und Response — das Gefühl einer echten Strecke.",
        },
        platforms: {
          title: "Cross-platform play",
        },
        build: {
          title: "Bau deinen Unique Bolide",
          text: "Optik und Handling an deinen Pilot-Stil anpassen.",
        },
        friends: {
          title: "Rase mit Freunden",
          text: "Shared Races, Rankings und Pilot-Grid in einem Launcher.",
        },
        raceControl: {
          title: "Race control",
          leaderboard: "Leaderboard",
          circuit: "Streckenkarte",
        },
        tracks: {
          title: "Echte Strecken weltweit",
          text: "Von der GUS bis USA und China — Locations mit Live-Racing.",
        },
        tech: {
          title: "Tech heute — Siege morgen",
          text: "Computer Vision, Link und Grid — der Stack fürs Match.",
        },
      },
      advantages: {
        eyebrow: "// ADVANTAGES",
        title: "Vorteile",
        media: "Bildplatzhalter",
        unique: {
          title: "Keine Offline-Pendants in der GUS",
          text: "Offline-FPV-Immersion — selten in der Region.",
        },
        ar: {
          title: "AR im Game",
          text: "Augmented Reality steigert Rennen und Streckenwahrnehmung.",
        },
        map: {
          title: "Endlose Map",
          text: "Skalierbarer Playspace ohne Content-Decke.",
        },
        app: {
          title: "App-Layer",
          text: "Client für Schedule, Progress, Teams und Pilot-Netzwerk.",
        },
        boards: {
          title: "VR",
          text: "Wettbewerb und Team-Szenarien halten Engagement hoch.",
        },
        production: {
          title: "Eigene Produktion",
          text: "Full Cycle — vom Auto-Prototyp bis zur Live-Show.",
        },
      },
    },
    audience: {
      eyebrow: "// TARGET_AUDIENCE",
      title: "Zielgruppe",
      description:
        "Pilot verbindet unterschiedliche Interessen durch ein starkes Erlebnis — ein echtes Auto wie im Game zu steuern.",
      segments: {
        kids: {
          title: "Kinder 3–10",
          text: "Sicherer Ersteinstieg: Spiel und Reaktionstraining durch echte Mini-Rennen.",
          tag: "Pilot Unior",
        },
        gamers: {
          title: "VR-Spieler",
          text: "Spieler auf der Suche nach dem nächsten Immersionslevel — jetzt in der realen Welt.",
        },
        teens: {
          title: "Teenager",
          text: "Wettbewerb, Technologie und Community in einem vertrauten Game-Format.",
        },
        growth: {
          title: "Weiterentwicklung",
          text: "Steuerung, Fokus, Reaktion und technisches Denken.",
        },
        thinkers: {
          title: "Denker",
          text: "Strategie, Telemetrie und die beste Linie in jeder Runde.",
        },
        racing: {
          title: "Racing-Fans",
          text: "Startspannung, Positionskämpfe und echter Wettbewerbs-Drive.",
        },
        cars: {
          title: "Auto-Enthusiasten",
          text: "Technik, Customizing und der Charakter des eigenen Boliden.",
        },
      },
      everyone: {
        title: "Und alle Neugierigen",
        text: "Pilot ist für alle offen, die einen neuen Sport zwischen physischer und digitaler Welt erleben wollen.",
      },
    },
    subscription: {
      eyebrow: "// ARENA",
      title: "Arena-Abo",
      description: "Tarife für Pilot, Pilot Unior und Launcher-Zugang.",
      popular: "Beliebt",
      cta: "Anfrage senden",
      pilotBoard: {
        kicker: "Pilot-Bereich",
        colTime: "Zeit",
        colSolo: "Einzelspiel, ₽",
        colPerMin: "Preis / Minute, ₽",
        colDuo: "Zu zweit, ₽",
        colSave: "Vorteil, ₽",
        minutes: "{n} Minuten",
        hit: "Hit!",
      },
      uniorBoard: {
        kicker: "Pilot-Unior-Bereich",
        minutes: "{n} Min",
        solo: "Einzelspiel",
        withParent: "Mit Elternteil",
      },
      plans: {
        unior: {
          name: "Pilot Unior",
          info: "Kinderformat: 12 Minuten auf der Strecke.",
        },
        pilot: {
          name: "Pilot",
          info: "Sessionpreise: Solo und Duo.",
        },
        launcher: {
          name: "Launcher",
          info: "Digital Client · monatlich",
          period: "pro Monat",
          f1: "Einstiegs-Client zur Strecke",
          f2: "Match-Telemetrie",
          f3: "Pilot-Netzwerk und Matchmaking",
          f4: "Updates und neue Modi",
        },
      },
    },
    anatomy: {
      eyebrow: "// CUTAWAY_VIEW",
      title: "Was steckt in der Mini-Car",
      description:
        "Tippe die Module an — wir zeigen den FPV-Stack von Kamera bis Antrieb.",
      parts: {
        camera: {
          title: "FPV-Kamera",
          text: "Filmt die Strecke in der Ich-Perspektive und speist den Video-Link des Piloten.",
        },
        video: {
          title: "Videosender",
          text: "Sendet das Bild auf 5.8 GHz in die Brille — geringe Latenz, live von der Strecke.",
        },
        radio: {
          title: "Empfänger",
          text: "Nimmt Gas, Lenkung und Modus-Befehle vom Sender entgegen.",
        },
        battery: {
          title: "Akku",
          text: "Versorgt Kamera, Link, Empfänger und Motoren über die gesamte Session.",
        },
        drive: {
          title: "AWD-Antrieb",
          text: "Motoren und Chassis halten die Mini-Car auf der realen Linie.",
        },
      },
    },
    tracks: {
      eyebrow: "// BUSINESS_TRACKS",
      title: "Drei Business-Linien",
      description:
        "Pilot ist Racing. Pilot Unior ist Education. Pilot Launcher ist der Einstiegs-Client.",
      pilot: {
        label: "Pilot",
        tag: "Racing",
        text: "Echtes FPV-Racing mit Mini-Autos: Strecke, Telemetrie und Pilotennetzwerk.",
        point1: "Wettkampfformat und Live-Events",
        point2: "Echtzeit-Telemetrie",
        point3: "Für Piloten, Clubs und Veranstalter",
      },
      unior: {
        label: "Pilot Unior",
        tag: "Education",
        text: "Sanfter FPV-Einstieg über Vector: Lernen, Sicherheit und erste Kilometer am Steuer.",
        point1: "Education-Track für Schulen und Clubs",
        point2: "Sicheres Onboarding ohne Rennstress",
        point3: "Gleiche FPV-DNA, anderes Einstiegsniveau",
      },
      launcher: {
        label: "Pilot Launcher",
        tag: "Software",
        text: "Der Einstiegs-Client fürs Ökosystem: OS-Builds, Updates und schneller Session-Start.",
        point1: "Windows, macOS und Linux in einem Flow",
        point2: "Verbindung zu Strecke und Telemetrie",
        point3: "Einstiegspunkt für Pilot und Pilot Unior",
      },
    },
    stack: {
      eyebrow: "// TECH_SUM",
      title: "Technologiesumme",
      description:
        "Von der Mini-Car bis zum Pilotennetz — so greifen die Schichten zu einem System ineinander.",
      flowFrom: "Track side",
      flowLive: "Signal live",
      flowTo: "Pilot side",
      steps: {
        car: {
          title: "Mini car",
          text: "Hardware auf der Strecke: Chassis, Antrieb, Kamera und Onboard-Stack für echtes Racing.",
        },
        link: {
          title: "FPV link",
          text: "5.8-GHz-Videolink und Funksteuerung — geringe Latenz zwischen Auto und Pilot.",
        },
        vision: {
          title: "Computer Vision",
          text: "Computer Vision analysiert den Videostream: Streckenmarkierung, Objekterkennung und Telemetrie für Rennen und Training.",
        },
        pilot: {
          title: "Pilot view",
          text: "Brille und Sender: Ich-Perspektive auf die Strecke mit echtem Fahrgefühl.",
        },
        launcher: {
          title: "Launcher",
          text: "Der Client synchronisiert Session, Updates und Telemetrie — Einstieg ins Pilot-Ökosystem.",
        },
        grid: {
          title: "Pilot grid",
          text: "Pilotennetz, Events und Unior-Track über Vector — die volle Technologiesumme in einem Loop.",
        },
      },
    },
    download: {
      eyebrow: "// MODULE_UPDATE",
      title: "Launcher herunterladen",
      description:
        "Ein Klick — der Pilot-Client für dein System. Weitere Plattformen findest du darunter.",
      get: "GET →",
      build: "BUILD",
      file: "FILE",
      ctaFor: "Für {os} laden",
      alsoAvailable: "Auch verfügbar",
      platformWindows: "Windows",
      platformMac: "macOS",
      platformSteam: "Steam",
    },
    team: {
      eyebrow: "Vector platform // Pilot game",
      title: "Pilot Team",
      description:
        "Ingenieure, Entwickler und Piloten, die FPV-Racing in echten Technologiesport verwandeln.",
      footer: "Build together · Race together · Learn together",
      roles: {
        hardware: "Hardware lead",
        founder: "Founder / CEO",
        game: "Game director",
        race: "Race systems",
        design: "Product design",
        backend: "Backend",
        education: "Education",
        operations: "Operations",
      },
    },
    market: {
      eyebrow: "// MARKET_SCOPE",
      title: "Vom Markt zum Pilot-Anteil",
      description:
        "Der Investment-Funnel: vom globalen Potenzial bis zum erreichbaren Marktanteil von Pilot.",
      ram: {
        title: "Potenzielles Marktvolumen",
        text: "Die maximal mögliche Nachfrage im globalen Maßstab.",
        value: "~120 Mrd. $",
      },
      tam: {
        title: "Gesamter Markt",
        text: "Der reale Markt in unseren Kategorien und Segmenten.",
        value: "~38 Mrd. $",
      },
      sam: {
        title: "Erreichbarer Markt",
        text: "Segmente, die mit dem aktuellen Modell adressierbar sind.",
        value: "~9,5 Mrd. $",
      },
      som: {
        title: "Erreichbarer Pilot-Anteil",
        text: "Unser realistischer Anteil mit klarem Fokus und Vorteilen.",
        value: "~2,1 Mrd. $",
        share: "2,2%",
      },
    },
    worldMap: {
      eyebrow: "// GLOBAL_GRID",
      title: "Rechenzentren und Server",
      description:
        "Routen für Medien, Matches und Telemetrie — eine schematische Pilot-Vernetzung über Schlüsselknoten.",
    },
    distribution: {
      eyebrow: "// MARKET_FOOTPRINT",
      title: "Marktpräsenz",
      description:
        "Potenzial der Pilot- und Pilot-Unior-Punkte nach Ländern. Split folgt.",
      colCountry: "Land",
      colPilot: "Pilot",
      colUnior: "Unior",
      total: "Summe",
      pending: "—",
      regions: {
        cis: "GUS",
        latam: "Lateinamerika",
        mena: "Naher Osten",
        na: "Nordamerika",
        asia: "Asien",
      },
      cities: {
        la: "Los Angeles",
      },
      countries: {
        ru: "Russland",
        by: "Belarus",
        kz: "Kasachstan",
        am: "Armenien",
        kg: "Kirgisistan",
        uz: "Usbekistan",
        br: "Brasilien",
        sv: "El Salvador",
        ar: "Argentinien",
        uy: "Uruguay",
        ae: "VAE",
        tr: "Türkei",
        us: "USA",
        cn: "China",
      },
    },
    businessModel: {
      eyebrow: "// BUSINESS_MODEL",
      title: "Geschäftsmodell",
      description:
        "Vier Umsatzströme rund um echtes FPV-Racing: Hardware, Bildung, Software und Media.",
      streams: {
        hardware: {
          title: "Hardware & Strecken",
          text: "Autos, Strecken und Kits für Locations, Clubs und Partner. CAPEX mit wiederkehrenden Upgrades.",
          tag: "Hardware",
        },
        unior: {
          title: "Pilot Unior",
          text: "Lizenzen und Programme für Schulen und Unis — Bildung als skalierbarer B2B/B2G-Kanal.",
          tag: "Education",
        },
        software: {
          title: "Launcher & Netzwerk",
          text: "Einstiegs-Client, Telemetrie, Matches und Pilot-Netzwerk — Abos und Aktivitätsgebühren.",
          tag: "Software",
        },
        media: {
          title: "Media & Events",
          text: "Broadcasts, Sponsoring und Turniere: Reichweite wird zu Partner-Revenue.",
          tag: "Media",
        },
      },
    },
    capTable: {
      eyebrow: "// CAP_TABLE",
      title: "Cap table",
      description:
        "Vorläufige Anteilsstruktur für Team und Reserven. Finaler Split vor der Runde.",
      colHolder: "Inhaber",
      colRole: "Rolle",
      colShare: "Anteil",
      total: "Summe",
      pending: "—",
      note: "Illustrative · pre-round · subject to term sheet",
      holders: {
        esop: "Team ESOP",
        reserve: "Reserve",
      },
      roles: {
        founder: "Founder / CEO",
        hardware: "Hardware Lead",
        game: "Game Lead",
        esop: "Team-Optionspool",
        reserve: "Runden-Reserve",
      },
    },
    roadmap: {
      eyebrow: "// ROADMAP",
      title: "Roadmap",
      description:
        "Von ersten Strecken und dem Launcher zu einem globalen Pilot-Netzwerk, Bildung und Media.",
      phases: {
        now: {
          title: "Now",
          text: "Produktlaunch und erste Live-Locations.",
          item1: "Pilot Launcher für Windows / macOS / Linux",
          item2: "Pilot-Strecken in der GUS",
          item3: "Match-Telemetrie und Basis-Pilot-Grid",
          item4: "Investor-Deck und Partnerkanal",
        },
        scale: {
          title: "2026 H1",
          text: "Hardware und Education-Track skalieren.",
          item1: "Serienproduktion von Autos und Strecken-Kits",
          item2: "Pilot Unior mit Schulen und Unis",
          item3: "LatAm-Expansion (Brasilien und Hubs)",
          item4: "Partnernetzwerk für Location-Betreiber",
        },
        global: {
          title: "2026 H2",
          text: "Große Märkte und Media-Layer rund um Racing.",
          item1: "USA / Los Angeles Flagship-Hub",
          item2: "China: lokaler Partner und Supply",
          item3: "Broadcasts, Sponsoring und Turnierkalender",
          item4: "Abos und Gebühren im Launcher-Netzwerk",
        },
        network: {
          title: "2027+",
          text: "Globale Liga und Ökosystem um Pilot.",
          item1: "Internationales Championship und Saison-Ranking",
          item2: "Franchise-Modell für Locations",
          item3: "Full Stack live: CV / Link / Grid",
          item4: "Netzwerkeffekt: Piloten ↔ Locations ↔ Media",
        },
      },
    },
    investors: {
      eyebrow: "// INVESTOR_CHANNEL",
      title: "Investorenanfrage",
      description:
        "Echtes FPV-Racing mit Mini-Autos — ein neues Format für Sport und Entertainment. Hinterlasse Kontakte, wir melden uns mit Deck und nächsten Schritten.",
      launcherFirst: "Zuerst den Launcher",
      fineprint: "DECK · TERM_SHEET · DEMO — auf Anfrage · NO PUBLIC FILING",
      formEyebrow: "// SUBMIT_APPLICATION",
    },
    form: {
      firstName: "Vorname",
      lastName: "Nachname",
      middleName: "Vatersname",
      email: "E-Mail",
      phone: "Telefon",
      emailOrPhone: "Bitte E-Mail oder Telefon angeben.",
      submit: "Anfrage senden",
      submitting: "Senden...",
      successEyebrow: "// APPLICATION_LOCKED",
      success: "Anfrage erhalten. Wir melden uns bei dir.",
      checkFields: "Bitte Formularfelder prüfen",
      errors: {
        firstName: "Bitte Vornamen angeben",
        lastName: "Bitte Nachnamen angeben",
        middleName: "Bitte Vatersnamen angeben",
        contactRequired: "Bitte E-Mail oder Telefon angeben",
        emailInvalid: "Ungültige E-Mail",
        phoneInvalid: "Ungültige Telefonnummer",
      },
    },
    footer: {
      rights: "© {year} PILOT · REAL LIFE FPV",
      status: "GRID LOCKED · TELEMETRY IDLE · BUILD FRONTEND-ONLY",
    },
  },
};
