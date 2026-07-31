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
    navSystem: string;
    navTracks: string;
    navLauncher: string;
    navStack: string;
    navTeam: string;
    navInvestors: string;
  };
  hero: {
    eyebrow: string;
    headline: string;
    description: string;
    ctaDownload: string;
    ctaInvestors: string;
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
      navSystem: "Система",
      navTracks: "Линейки",
      navLauncher: "Лаунчер",
      navStack: "Стек",
      navTeam: "Команда",
      navInvestors: "Инвесторам",
    },
    hero: {
      eyebrow: "Pitch Deck",
      headline: "Гонки на реальных машинах в уменьшенном масштабе",
      description:
        "FPV-гонки в реальном мире на мини-тачках. Один лаунчер — вход в трассу, телеметрию и сеть пилотов.",
      ctaDownload: "Скачать лаунчер",
      ctaInvestors: "Для инвесторов",
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
      title: "СКАЧАТЬ ЛАУНЧЕР",
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
    investors: {
      eyebrow: "// INVESTOR_CHANNEL",
      title: "ЗАЯВКА ИНВЕСТОРА",
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
      navSystem: "System",
      navTracks: "Lines",
      navLauncher: "Launcher",
      navStack: "Stack",
      navTeam: "Team",
      navInvestors: "Investors",
    },
    hero: {
      eyebrow: "Pitch Deck",
      headline: "Racing on real cars at a reduced scale",
      description:
        "FPV racing in the real world on mini cars. One launcher — entry to the track, telemetry, and the pilot network.",
      ctaDownload: "Download launcher",
      ctaInvestors: "For investors",
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
      title: "DOWNLOAD LAUNCHER",
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
      title: "Pilot Team",
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
    investors: {
      eyebrow: "// INVESTOR_CHANNEL",
      title: "INVESTOR APPLICATION",
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
      navSystem: "System",
      navTracks: "Linien",
      navLauncher: "Launcher",
      navStack: "Stack",
      navTeam: "Team",
      navInvestors: "Investoren",
    },
    hero: {
      eyebrow: "Pitch Deck",
      headline: "Rennen mit echten Autos im verkleinerten Maßstab",
      description:
        "FPV-Rennen in der realen Welt mit Mini-Autos. Ein Launcher — Zugang zur Strecke, Telemetrie und dem Pilotennetzwerk.",
      ctaDownload: "Launcher laden",
      ctaInvestors: "Für Investoren",
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
      title: "LAUNCHER HERUNTERLADEN",
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
    investors: {
      eyebrow: "// INVESTOR_CHANNEL",
      title: "INVESTORENANFRAGE",
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
