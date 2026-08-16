import type { Locale } from "@/i18n";

export type PilotDomainId = "engage" | "train" | "operate" | "scale" | "learn";
export type InfrastructureFlowId =
  | "audience"
  | "talent"
  | "capitalNetwork"
  | "dataIp";

type LocalizedCopy = Pick<Record<Locale, string>, "en" | "ru"> &
  Partial<Pick<Record<Locale, string>, "de">>;

type ReviewStatus =
  | "preserved"
  | "needsClarification"
  | "intentionallyExcluded";

export interface InfrastructureMedia {
  video: string;
  poster: string;
}

export interface InfrastructureNode {
  id: string;
  sourceLabel: string;
  title: LocalizedCopy;
  description: LocalizedCopy;
  reviewStatus: ReviewStatus;
  visibility: "public" | "detail" | "hidden";
  hiddenReason?: LocalizedCopy;
  media?: InfrastructureMedia;
}

export interface InfrastructureFlow {
  id: InfrastructureFlowId;
  label: LocalizedCopy;
  description: LocalizedCopy;
}

export interface InfrastructureDomain {
  id: PilotDomainId;
  label: LocalizedCopy;
  title: LocalizedCopy;
  description: LocalizedCopy;
  outcome: LocalizedCopy;
  flowIds: InfrastructureFlowId[];
  nodes: InfrastructureNode[];
  detail: LocalizedCopy[];
}

export interface SourceConnection {
  id: string;
  from: string;
  to: string;
  flowIds: InfrastructureFlowId[];
  reviewStatus: ReviewStatus;
  publicCopy: LocalizedCopy;
}

export interface PilotInfrastructureContent {
  sectionLabel: LocalizedCopy;
  eyebrow: LocalizedCopy;
  headline: LocalizedCopy;
  introduction: LocalizedCopy;
  targetStateNote: LocalizedCopy;
  detailLabel: LocalizedCopy;
  outcomeLabel: LocalizedCopy;
  flowsLabel: LocalizedCopy;
  simulationLabel: LocalizedCopy;
  simulationBridge: LocalizedCopy;
  tabsLabel: LocalizedCopy;
  domains: InfrastructureDomain[];
  flows: InfrastructureFlow[];
  hiddenNodes: InfrastructureNode[];
  sourceConnections: SourceConnection[];
}

const text = (en: string, ru: string, de?: string): LocalizedCopy => ({
  en,
  ru,
  ...(de ? { de } : {}),
});

const node = (
  id: string,
  sourceLabel: string,
  title: LocalizedCopy,
  description: LocalizedCopy,
  options: Partial<
    Pick<
      InfrastructureNode,
      "reviewStatus" | "visibility" | "hiddenReason" | "media"
    >
  > = {},
): InfrastructureNode => ({
  id,
  sourceLabel,
  title,
  description,
  reviewStatus: options.reviewStatus ?? "preserved",
  visibility: options.visibility ?? "public",
  hiddenReason: options.hiddenReason,
  media: options.media,
});

const mediaPath = (filename: string) =>
  `/pilot-infrastructure/media/${filename}`;

export function localize(copy: LocalizedCopy, locale: Locale): string {
  return copy[locale] ?? copy.en;
}

export const pilotInfrastructureContent: PilotInfrastructureContent = {
  sectionLabel: text(
    "Pilot infrastructure",
    "Инфраструктура Pilot",
    "Pilot Infrastruktur",
  ),
  eyebrow: text(
    "Pilot infrastructure",
    "Инфраструктура Pilot",
    "Pilot Infrastruktur",
  ),
  headline: text(
    "From engagement to real-world capability.",
    "От вовлечения — к возможностям в реальном мире.",
    "Von Engagement zu Fähigkeiten in der realen Welt.",
  ),
  introduction: text(
    "Pilot is designed to connect engagement, trained talent, multi-domain systems and a learning network.",
    "Pilot задуман как система, объединяющая вовлечение, подготовку специалистов, разные классы техники и развивающуюся сеть.",
    "Pilot verbindet Engagement, qualifizierte Fachkräfte, Systeme für unterschiedliche Einsatzbereiche und ein lernendes Netzwerk.",
  ),
  targetStateNote: text(
    "Illustrative target-state: connections describe the intended platform logic, not a claim that every link is live today.",
    "Иллюстрация целевой модели: связи показывают предполагаемую логику платформы, а не утверждают, что каждая из них уже работает.",
    "Illustratives Zielbild: Die Verbindungen zeigen die beabsichtigte Plattformlogik und bedeuten nicht, dass bereits jede Verbindung aktiv ist.",
  ),
  detailLabel: text("System detail", "Детали системы", "Systemdetails"),
  outcomeLabel: text("Outcome", "Результат", "Ergebnis"),
  flowsLabel: text("System flows", "Потоки системы", "Systemflüsse"),
  simulationLabel: text(
    "Simulation layer",
    "Слой симуляции",
    "Simulationsebene",
  ),
  simulationBridge: text(
    "trained skill → operational capability",
    "подготовленный навык → операционная возможность",
    "trainierte Fähigkeit → operative Kompetenz",
  ),
  tabsLabel: text(
    "Infrastructure domains",
    "Домены инфраструктуры",
    "Infrastrukturbereiche",
  ),
  flows: [
    {
      id: "audience",
      label: text("Audience", "Аудитория", "Publikum"),
      description: text(
        "Engagement and traffic",
        "Вовлечение и трафик",
        "Engagement und Reichweite",
      ),
    },
    {
      id: "talent",
      label: text("Talent", "Специалисты", "Fachkräfte"),
      description: text(
        "Skills and trained people",
        "Навыки и подготовленные люди",
        "Kompetenzen und qualifizierte Menschen",
      ),
    },
    {
      id: "capitalNetwork",
      label: text("Capital / Network", "Капитал / Сеть", "Kapital / Netzwerk"),
      description: text(
        "Commercial and partner reach",
        "Коммерческое и партнёрское расширение",
        "Kommerzielle Reichweite und Partnernetzwerk",
      ),
    },
    {
      id: "dataIp",
      label: text("Data / IP", "Данные / IP", "Daten / IP"),
      description: text(
        "Learning and reusable knowledge",
        "Обучение и повторно используемые знания",
        "Lernen und wiederverwendbares Wissen",
      ),
    },
  ],
  domains: [
    {
      id: "engage",
      label: text("Engage", "Вовлечение", "Aktivieren"),
      title: text(
        "Build audience and repeat engagement.",
        "Создавать аудиторию и возвращать её в систему.",
        "Publikum aufbauen und dauerhaft in das System einbinden.",
      ),
      description: text(
        "Digital entry points turn awareness into participation, play and community activity.",
        "Цифровые точки входа превращают интерес в участие, игру и активность сообщества.",
        "Digitale Einstiegspunkte verwandeln Interesse in Teilnahme, Spiel und Community-Aktivität.",
      ),
      outcome: text(
        "Engagement and demand",
        "Вовлечение и спрос",
        "Engagement und Nachfrage",
      ),
      flowIds: ["audience", "capitalNetwork"],
      nodes: [
        node(
          "launcher",
          "Pilot Launcher",
          text("Launcher", "Launcher", "Launcher"),
          text(
            "Bring new participants into Pilot",
            "Привлекать новых участников в Pilot",
            "Neue Teilnehmer zu Pilot bringen",
          ),
        ),
        node(
          "games",
          "Гонки / Новые игры",
          text("Games", "Игры", "Spiele"),
          text(
            "Bring people back through play",
            "Возвращать участников через игру",
            "Teilnehmer durch Spielen zurückbringen",
          ),
        ),
        node(
          "marketplace",
          "Маркет-плейс",
          text("Marketplace", "Маркетплейс", "Marktplatz"),
          text(
            "Connect participation with transactions",
            "Связывать участие и транзакции",
            "Teilnahme mit Transaktionen verbinden",
          ),
        ),
        node(
          "community",
          "Комьюнити",
          text("Community", "Сообщество", "Community"),
          text(
            "Connect people, feedback and growth",
            "Объединять людей, обратную связь и рост",
            "Menschen, Feedback und Wachstum verbinden",
          ),
        ),
      ],
      detail: [
        text(
          "Games include racing formats and potential new formats emerging from Vector.",
          "Игры включают гоночные форматы и потенциальные новые форматы, возникающие из Vector.",
          "Spiele umfassen Rennformate und mögliche neue Formate, die aus Vector entstehen.",
        ),
        text(
          "Launcher can route participants toward marketplace, simulation and trainer experiences.",
          "Launcher может направлять участников в маркетплейс, симуляторы и тренажёрные продукты.",
          "Der Launcher kann Teilnehmer zum Marktplatz, zu Simulationen und Trainingsprodukten führen.",
        ),
        text(
          "Community is the confirmed source concept; “Components” is not present in the FigJam source.",
          "Сообщество — подтверждённый узел источника; узла «Компоненты» в исходной FigJam нет.",
          "Community ist das bestätigte Quellkonzept; „Komponenten“ ist in der FigJam-Quelle nicht enthalten.",
        ),
      ],
    },
    {
      id: "train",
      label: text("Train", "Подготовка", "Qualifizieren"),
      title: text(
        "Turn participation into operational skill.",
        "Превращать участие в прикладной навык.",
        "Teilnahme in praktische Kompetenz verwandeln.",
      ),
      description: text(
        "Simulation, specialised trainers and Academy programmes can form a pipeline of capable operators.",
        "Симуляторы, специализированные тренажёры и программы Academy могут формировать поток подготовленных операторов.",
        "Simulationen, spezialisierte Trainingssysteme und Academy-Programme können qualifizierte Operatoren hervorbringen.",
      ),
      outcome: text(
        "Trained operators and specialists",
        "Подготовленные операторы и специалисты",
        "Qualifizierte Operatoren und Fachkräfte",
      ),
      flowIds: ["audience", "talent", "dataIp"],
      nodes: [
        node(
          "simulators",
          "Симулятор спасательный / Симуляторы спец-техника",
          text("Simulators", "Симуляторы", "Simulatoren"),
          text(
            "Practise rescue and equipment scenarios",
            "Отрабатывать спасательные и технические сценарии",
            "Rettungs- und Technikszenarien trainieren",
          ),
        ),
        node(
          "specializedTrainers",
          "Разработка специализированных тренажеров",
          text("Training systems", "Тренажёрные системы", "Trainingssysteme"),
          text(
            "Build products for validated use cases",
            "Создавать системы под подтверждённые сценарии",
            "Produkte für validierte Anwendungsfälle entwickeln",
          ),
        ),
        node(
          "academy",
          "Pilot Academy",
          text("Pilot Academy", "Pilot Academy", "Pilot Academy"),
          text(
            "Develop talent for partner needs",
            "Готовить специалистов к партнёрским задачам",
            "Fachkräfte für den Bedarf von Partnern qualifizieren",
          ),
        ),
      ],
      detail: [
        text(
          "The source explicitly includes rescue and specialised-equipment simulators.",
          "В источнике явно указаны спасательный симулятор и симуляторы спецтехники.",
          "Die Quelle nennt ausdrücklich Rettungs- und Spezialtechnik-Simulatoren.",
        ),
        text(
          "The intended chain connects Launcher, trainer development and Pilot Academy.",
          "Целевая цепочка связывает Launcher, разработку тренажёров и Pilot Academy.",
          "Die Zielkette verbindet Launcher, Trainingssystem-Entwicklung und Pilot Academy.",
        ),
        text(
          "Talent flow represents capable participants moving toward Academy and partner opportunities.",
          "Поток специалистов показывает переход подготовленных участников к Academy и партнёрским возможностям.",
          "Der Fachkräftefluss zeigt den Übergang qualifizierter Teilnehmer zu Academy- und Partnerchancen.",
        ),
      ],
    },
    {
      id: "operate",
      label: text("Operate", "Эксплуатация", "Anwenden"),
      title: text(
        "Connect training to multi-domain systems.",
        "Связывать подготовку с разными классами систем.",
        "Training mit Systemen verschiedener Einsatzbereiche verbinden.",
      ),
      description: text(
        "Simulation develops operator capability across air, land and surface-water systems, while underwater remains a fourth target domain.",
        "Симуляция развивает навыки управления воздушными, наземными и надводными системами; подводные системы остаются четвёртым целевым доменом.",
        "Simulation entwickelt Bedienkompetenz für Luft-, Land- und Überwassersysteme; Unterwasser bleibt der vierte Zielbereich.",
      ),
      outcome: text(
        "Multi-domain operating capability",
        "Возможность работать в нескольких средах",
        "Einsatzkompetenz in mehreren Bereichen",
      ),
      flowIds: ["talent", "dataIp"],
      nodes: [
        node(
          "air",
          "Воздушный транспорт / Дроны и самолеты",
          text("Air", "Воздух", "Luft"),
          text(
            "Drones and aircraft",
            "Дроны и самолёты",
            "Drohnen und Luftfahrzeuge",
          ),
          {
            media: {
              video: mediaPath("air-simulation-loop.mp4"),
              poster: mediaPath("air-simulation-poster.jpg"),
            },
          },
        ),
        node(
          "land",
          "Наземный транспорт / Автомобили спецтехника",
          text("Land", "Земля", "Land"),
          text(
            "Vehicles and specialised equipment",
            "Автомобили и специальная техника",
            "Fahrzeuge und Spezialtechnik",
          ),
          {
            media: {
              video: mediaPath("land-simulation-loop.mp4"),
              poster: mediaPath("land-simulation-poster.jpg"),
            },
          },
        ),
        node(
          "surface",
          "над-Водный транспорт",
          text("Surface water", "Над водой", "Überwasser"),
          text(
            "Surface-water systems",
            "Надводные системы",
            "Überwassersysteme",
          ),
          {
            media: {
              video: mediaPath("surface-simulation-loop.mp4"),
              poster: mediaPath("surface-simulation-poster.jpg"),
            },
          },
        ),
        node(
          "underwater",
          "под-Водный транспорт",
          text("Underwater", "Под водой", "Unterwasser"),
          text(
            "Underwater systems",
            "Подводные системы",
            "Unterwassersysteme",
          ),
        ),
      ],
      detail: [
        text(
          "The supplied video demonstrates drone simulation, not aircraft or live deployment.",
          "Приложенное видео показывает симуляцию дрона, а не самолёты или реальное развёртывание.",
          "Das bereitgestellte Video zeigt eine Drohnensimulation, nicht Luftfahrzeuge oder einen realen Einsatz.",
        ),
        text(
          "Land systems include both vehicles and specialised equipment in the source.",
          "Наземный домен включает в источнике автомобили и специальную технику.",
          "Der Landbereich umfasst laut Quelle Fahrzeuge und Spezialtechnik.",
        ),
        text(
          "No supplied media represents underwater systems, so that domain remains text-and-icon only.",
          "Ни один приложенный ролик не показывает подводные системы, поэтому этот домен остаётся текстово-иконным.",
          "Für Unterwassersysteme liegen keine Medien vor; dieser Bereich bleibt deshalb rein textlich dargestellt.",
        ),
      ],
    },
    {
      id: "scale",
      label: text("Scale", "Масштаб", "Skalieren"),
      title: text(
        "Expand access, partners and commercial reach.",
        "Расширять доступ, партнёрства и коммерческий охват.",
        "Zugang, Partnerschaften und kommerzielle Reichweite ausbauen.",
      ),
      description: text(
        "Pilot Points, partner activity, competitions and a repeatable location model can extend the network.",
        "Pilot Points, партнёрская активность, соревнования и повторяемая модель локаций могут расширять сеть.",
        "Pilot Points, Partneraktivitäten, Wettbewerbe und ein reproduzierbares Standortmodell können das Netzwerk erweitern.",
      ),
      outcome: text(
        "Distributed access and network effects",
        "Распределённый доступ и сетевые эффекты",
        "Dezentraler Zugang und Netzwerkeffekte",
      ),
      flowIds: ["talent", "capitalNetwork"],
      nodes: [
        node(
          "points",
          "Pilot точки",
          text("Pilot Points", "Pilot Points", "Pilot Points"),
          text(
            "Provide access and coordinate activity",
            "Обеспечивать доступ и координировать активность",
            "Zugang schaffen und Aktivitäten koordinieren",
          ),
        ),
        node(
          "partners",
          "Международные партнеры",
          text("Partners", "Партнёры", "Partner"),
          text(
            "Extend capability through partners",
            "Расширять возможности через партнёров",
            "Fähigkeiten durch Partner erweitern",
          ),
        ),
        node(
          "competitions",
          "соревнования",
          text("Competitions", "Соревнования", "Wettbewerbe"),
          text(
            "Repeat formats for talent and validation",
            "Создавать форматы развития и проверки навыков",
            "Wiederholbare Formate für Entwicklung und Validierung schaffen",
          ),
        ),
        node(
          "franchise",
          "Франчайзинг",
          text("Franchise", "Франшиза", "Franchise"),
          text(
            "A repeatable model for new locations",
            "Повторяемая модель для новых локаций",
            "Ein reproduzierbares Modell für neue Standorte",
          ),
          { reviewStatus: "needsClarification" },
        ),
      ],
      detail: [
        text(
          "Pilot Points are shown as the bridge between capital, partners and physical reach.",
          "Pilot Points показаны как мост между капиталом, партнёрами и физическим присутствием.",
          "Pilot Points bilden die Brücke zwischen Kapital, Partnern und physischer Präsenz.",
        ),
        text(
          "Franchise is preserved as target-state optionality, but its source node has no connector.",
          "Франшиза сохранена как возможность целевой модели, но её исходный узел не имеет связи.",
          "Franchise bleibt als Option des Zielbilds erhalten, der Quellknoten besitzt jedoch keine Verbindung.",
        ),
        text(
          "Universal control points and Infinite Map remain hidden until their roles are confirmed.",
          "Универсальные точки управления и Infinite Map скрыты до подтверждения их роли.",
          "Universelle Kontrollpunkte und Infinite Map bleiben verborgen, bis ihre Rollen bestätigt sind.",
        ),
      ],
    },
    {
      id: "learn",
      label: text("Learn", "Развитие", "Weiterentwickeln"),
      title: text(
        "Turn usage into better products and reusable IP.",
        "Превращать использование в лучшие продукты и повторно применимые знания.",
        "Nutzung in bessere Produkte und wiederverwendbares geistiges Eigentum überführen.",
      ),
      description: text(
        "Vector, neuro-gaming, applied AI and R&D can form a learning layer for the wider platform.",
        "Vector, нейро-гейминг, прикладной AI и R&D могут формировать обучающий слой для всей платформы.",
        "Vector, Neuro-Gaming, angewandte KI und F&E können eine Lernschicht für die gesamte Plattform bilden.",
      ),
      outcome: text(
        "Better products, data and intellectual property",
        "Лучшие продукты, данные и интеллектуальная собственность",
        "Bessere Produkte, Daten und geistiges Eigentum",
      ),
      flowIds: ["audience", "dataIp"],
      nodes: [
        node(
          "vector",
          "Vector",
          text("Vector", "Vector", "Vector"),
          text(
            "Turn learning into new formats",
            "Превращать знания в новые форматы",
            "Erkenntnisse in neue Formate überführen",
          ),
        ),
        node(
          "neuroGaming",
          "Нейро-гейминг",
          text("Neuro-gaming", "Нейро-гейминг", "Neuro-Gaming"),
          text(
            "Test new interaction models",
            "Проверять новые модели взаимодействия",
            "Neue Interaktionsmodelle erproben",
          ),
        ),
        node(
          "aiData",
          "AI модели / DATA библиотека",
          text("AI & Data", "AI и данные", "KI & Daten"),
          text(
            "Build insights and reusable knowledge",
            "Создавать аналитику и повторно используемые знания",
            "Erkenntnisse und wiederverwendbares Wissen aufbauen",
          ),
        ),
        node(
          "research",
          "тестирование и создание новых технологий",
          text("R&D", "R&D", "F&E"),
          text(
            "Test validated technology directions",
            "Проверять подтверждённые технологические направления",
            "Validierte Technologierichtungen erproben",
          ),
        ),
      ],
      detail: [
        text(
          "Vector branches toward new games, partnerships and community in the source.",
          "В источнике Vector ведёт к новым играм, партнёрствам и сообществу.",
          "In der Quelle verzweigt Vector zu neuen Spielen, Partnerschaften und Community.",
        ),
        text(
          "The data library is preserved inside AI & Data; its exact source connector needs repair or confirmation.",
          "Библиотека данных сохранена внутри AI и данных; её точная исходная связь требует исправления или подтверждения.",
          "Die Datenbibliothek bleibt in KI & Daten erhalten; ihre genaue Quellverbindung muss repariert oder bestätigt werden.",
        ),
        text(
          "Specific neurobiometric and thought-control claims are intentionally not published without evidence.",
          "Конкретные заявления о нейробиометрии и управлении силой мысли намеренно не публикуются без доказательств.",
          "Konkrete Aussagen zu Neurobiometrie und Gedankensteuerung werden ohne Nachweise bewusst nicht veröffentlicht.",
        ),
      ],
    },
  ],
  hiddenNodes: [
    node(
      "duplicateMarketplace",
      "Маркет-плейс (второй, без связи)",
      text("Second marketplace", "Второй маркетплейс"),
      text(
        "Duplicate or unresolved source node",
        "Дублирующий или неразрешённый исходный узел",
      ),
      {
        visibility: "hidden",
        reviewStatus: "intentionallyExcluded",
        hiddenReason: text(
          "Hidden until its difference from the connected marketplace is explained.",
          "Скрыт до объяснения отличий от связанного маркетплейса.",
        ),
      },
    ),
    node(
      "infiniteMap",
      "Бесконечная карта",
      text("Infinite Map", "Бесконечная карта"),
      text("Undefined product concept", "Неопределённая продуктовая концепция"),
      {
        visibility: "hidden",
        reviewStatus: "intentionallyExcluded",
        hiddenReason: text(
          "No defined role or source connection.",
          "Нет определённой роли или исходной связи.",
        ),
      },
    ),
    node(
      "universalControlPoints",
      "Универсальные точки — дистанционное управление",
      text("Universal control points", "Универсальные точки управления"),
      text(
        "Unconfirmed remote-control scope",
        "Неподтверждённый сценарий дистанционного управления",
      ),
      {
        visibility: "hidden",
        reviewStatus: "intentionallyExcluded",
        hiddenReason: text(
          "Requires product, safety and relationship confirmation.",
          "Требует подтверждения продукта, безопасности и связей.",
        ),
      },
    ),
    node(
      "thoughtControl",
      "Тренажеры и ПО с управлением силой мысли",
      text("Thought-control trainers", "Тренажёры с управлением силой мысли"),
      text("Unverified technical claim", "Неподтверждённое технологическое заявление"),
      {
        visibility: "hidden",
        reviewStatus: "intentionallyExcluded",
        hiddenReason: text(
          "Covered only by general R&D language until evidence exists.",
          "До появления доказательств покрывается только общей формулировкой R&D.",
        ),
      },
    ),
    node(
      "bobCat",
      "Bob-Cat",
      text("Bob-Cat", "Bob-Cat"),
      text("Unassigned source concept", "Нераспределённая исходная концепция"),
      {
        visibility: "hidden",
        reviewStatus: "intentionallyExcluded",
        hiddenReason: text(
          "Its role and relationship are not defined.",
          "Его роль и связи не определены.",
        ),
      },
    ),
  ],
  sourceConnections: [
    {
      id: "pilot-launcher",
      from: "pilot",
      to: "launcher",
      flowIds: ["audience", "capitalNetwork"],
      reviewStatus: "preserved",
      publicCopy: text(
        "Audience and commercial activity can move through Launcher.",
        "Аудитория и коммерческая активность могут проходить через Launcher.",
      ),
    },
    {
      id: "pilot-points",
      from: "pilot",
      to: "points",
      flowIds: ["capitalNetwork"],
      reviewStatus: "preserved",
      publicCopy: text(
        "Capital can support access points and network growth.",
        "Капитал может поддерживать точки доступа и рост сети.",
      ),
    },
    {
      id: "pilot-vector",
      from: "pilot",
      to: "vector",
      flowIds: ["audience"],
      reviewStatus: "preserved",
      publicCopy: text(
        "Engagement can feed discovery through Vector.",
        "Вовлечение может поддерживать развитие через Vector.",
      ),
    },
    {
      id: "pilot-neuro",
      from: "pilot",
      to: "neuroGaming",
      flowIds: ["dataIp"],
      reviewStatus: "preserved",
      publicCopy: text(
        "Experimental play can become an R&D surface.",
        "Экспериментальная игра может стать полигоном R&D.",
      ),
    },
    {
      id: "launcher-games",
      from: "launcher",
      to: "games",
      flowIds: ["audience"],
      reviewStatus: "preserved",
      publicCopy: text(
        "Launcher can activate racing and game formats.",
        "Launcher может активировать гоночные и игровые форматы.",
      ),
    },
    {
      id: "launcher-simulators",
      from: "launcher",
      to: "simulators",
      flowIds: ["audience", "talent"],
      reviewStatus: "preserved",
      publicCopy: text(
        "Launcher can route participants into simulation.",
        "Launcher может направлять участников в симуляцию.",
      ),
    },
    {
      id: "launcher-marketplace",
      from: "launcher",
      to: "marketplace",
      flowIds: ["audience", "capitalNetwork"],
      reviewStatus: "preserved",
      publicCopy: text(
        "Launcher can connect participation and transactions.",
        "Launcher может связывать участие и транзакции.",
      ),
    },
    {
      id: "launcher-trainers",
      from: "launcher",
      to: "specializedTrainers",
      flowIds: ["audience", "dataIp"],
      reviewStatus: "preserved",
      publicCopy: text(
        "Usage can reveal demand for training products.",
        "Использование может выявлять спрос на тренажёрные продукты.",
      ),
    },
    {
      id: "trainers-academy",
      from: "specializedTrainers",
      to: "academy",
      flowIds: ["talent"],
      reviewStatus: "preserved",
      publicCopy: text(
        "Academy can help develop and validate specialised training.",
        "Academy может помогать развивать и проверять специализированное обучение.",
      ),
    },
    {
      id: "pilot-academy",
      from: "pilot",
      to: "academy",
      flowIds: ["talent"],
      reviewStatus: "preserved",
      publicCopy: text(
        "Capable participants can move toward Academy programmes.",
        "Подготовленные участники могут переходить к программам Academy.",
      ),
    },
    {
      id: "points-partners",
      from: "points",
      to: "partners",
      flowIds: ["capitalNetwork"],
      reviewStatus: "preserved",
      publicCopy: text(
        "Points can connect local activity and partners.",
        "Точки могут связывать локальную активность и партнёров.",
      ),
    },
    {
      id: "points-competitions",
      from: "points",
      to: "competitions",
      flowIds: ["capitalNetwork", "talent"],
      reviewStatus: "preserved",
      publicCopy: text(
        "Points can connect activity and competitions.",
        "Точки могут связывать активность и соревнования.",
      ),
    },
    {
      id: "vector-games",
      from: "vector",
      to: "games",
      flowIds: ["audience", "dataIp"],
      reviewStatus: "preserved",
      publicCopy: text(
        "Learning can seed new game formats.",
        "Обучение системы может создавать новые игровые форматы.",
      ),
    },
    {
      id: "vector-partners",
      from: "vector",
      to: "partners",
      flowIds: ["capitalNetwork", "dataIp"],
      reviewStatus: "preserved",
      publicCopy: text(
        "Learning can open partnership opportunities.",
        "Обучение системы может открывать партнёрские возможности.",
      ),
    },
    {
      id: "vector-community",
      from: "vector",
      to: "community",
      flowIds: ["audience", "dataIp"],
      reviewStatus: "preserved",
      publicCopy: text(
        "Learning can strengthen community participation.",
        "Обучение системы может усиливать участие сообщества.",
      ),
    },
    {
      id: "neuro-ai",
      from: "neuroGaming",
      to: "aiData",
      flowIds: ["dataIp"],
      reviewStatus: "preserved",
      publicCopy: text(
        "Validated experimentation can inform applied AI.",
        "Подтверждённые эксперименты могут поддерживать прикладной AI.",
      ),
    },
    {
      id: "ai-library",
      from: "aiData",
      to: "dataLibrary",
      flowIds: ["dataIp"],
      reviewStatus: "needsClarification",
      publicCopy: text(
        "AI and validated data can contribute to reusable IP.",
        "AI и подтверждённые данные могут формировать повторно используемые знания.",
      ),
    },
    {
      id: "land-vehicles",
      from: "land",
      to: "vehiclesSpecialEquipment",
      flowIds: ["talent"],
      reviewStatus: "preserved",
      publicCopy: text(
        "Land systems include vehicles and specialised equipment.",
        "Наземные системы включают автомобили и специальную технику.",
      ),
    },
    {
      id: "games-land",
      from: "games",
      to: "land",
      flowIds: ["audience", "talent"],
      reviewStatus: "needsClarification",
      publicCopy: text(
        "Racing formats may extend into land systems.",
        "Гоночные форматы могут распространяться на наземные системы.",
      ),
    },
    {
      id: "games-air",
      from: "games",
      to: "air",
      flowIds: ["audience", "talent"],
      reviewStatus: "needsClarification",
      publicCopy: text(
        "Racing formats may extend into air systems.",
        "Гоночные форматы могут распространяться на воздушные системы.",
      ),
    },
    {
      id: "games-surface",
      from: "games",
      to: "surface",
      flowIds: ["audience", "talent"],
      reviewStatus: "needsClarification",
      publicCopy: text(
        "Racing formats may extend into surface-water systems.",
        "Гоночные форматы могут распространяться на надводные системы.",
      ),
    },
    {
      id: "games-underwater",
      from: "games",
      to: "underwater",
      flowIds: ["audience", "talent"],
      reviewStatus: "needsClarification",
      publicCopy: text(
        "Racing formats may extend into underwater systems.",
        "Гоночные форматы могут распространяться на подводные системы.",
      ),
    },
    {
      id: "points-universal",
      from: "points",
      to: "universalControlPoints",
      flowIds: ["capitalNetwork"],
      reviewStatus: "intentionallyExcluded",
      publicCopy: text(
        "Hidden pending definition and safety review.",
        "Скрыто до определения и проверки безопасности.",
      ),
    },
    {
      id: "neuro-thought-control",
      from: "neuroGaming",
      to: "thoughtControl",
      flowIds: ["dataIp"],
      reviewStatus: "intentionallyExcluded",
      publicCopy: text(
        "Specific technical causality is not published without evidence.",
        "Конкретная технологическая причинность не публикуется без доказательств.",
      ),
    },
  ],
};
