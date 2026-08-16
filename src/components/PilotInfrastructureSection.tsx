"use client";

import Image from "next/image";
import {
  ArrowDownLeft,
  ArrowDownRight,
  ArrowUpLeft,
  ArrowUpRight,
  BrainCircuit,
  ChevronDown,
  Cpu,
  Database,
  Download,
  FlaskConical,
  Gamepad2,
  GraduationCap,
  Handshake,
  Lightbulb,
  MapPin,
  Network,
  PackageOpen,
  Plane,
  RadioTower,
  ShipWheel,
  Sparkles,
  Store,
  Trophy,
  Users,
  Waves,
  Waypoints,
  type LucideIcon,
} from "lucide-react";
import {
  Fragment,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from "react";
import { useLocale } from "@/i18n/client";
import {
  localize,
  pilotInfrastructureContent as content,
  type InfrastructureDomain,
  type InfrastructureFlowId,
  type InfrastructureNode,
  type PilotDomainId,
} from "./PilotInfrastructureSection.content";
import styles from "./PilotInfrastructureSection.module.css";

const domainIcons: Record<PilotDomainId, LucideIcon> = {
  engage: Sparkles,
  train: GraduationCap,
  operate: Gamepad2,
  scale: Network,
  learn: Lightbulb,
};

const nodeIcons: Record<string, LucideIcon> = {
  launcher: Download,
  games: Gamepad2,
  marketplace: Store,
  community: Users,
  simulators: Gamepad2,
  specializedTrainers: Cpu,
  academy: GraduationCap,
  air: Plane,
  land: RadioTower,
  surface: ShipWheel,
  underwater: Waves,
  points: MapPin,
  partners: Handshake,
  competitions: Trophy,
  franchise: Waypoints,
  vector: PackageOpen,
  neuroGaming: BrainCircuit,
  aiData: Database,
  research: FlaskConical,
};

const diagramDomainLabels: Record<PilotDomainId, Record<"ru" | "en" | "de", string>> = {
  engage: { ru: "Вовлечение", en: "Engage", de: "Aktivierung" },
  train: { ru: "Тренировка", en: "Training", de: "Training" },
  operate: { ru: "Эксплуатация", en: "Operation", de: "Betrieb" },
  scale: { ru: "Масштабирование", en: "Scaling", de: "Skalierung" },
  learn: { ru: "Обучение системы", en: "System learning", de: "Systemlernen" },
};

const diagramFlowLabels: Record<
  InfrastructureFlowId,
  Record<"ru" | "en" | "de", string>
> = {
  audience: { ru: "Аудитория", en: "Audience", de: "Publikum" },
  talent: { ru: "Талант", en: "Talent", de: "Talente" },
  capitalNetwork: {
    ru: "Капитал и сеть",
    en: "Capital & network",
    de: "Kapital & Netzwerk",
  },
  dataIp: { ru: "Данные и ИС", en: "Data & IP", de: "Daten & IP" },
};

const diagramDomainOrder: PilotDomainId[] = [
  "engage",
  "train",
  "operate",
  "scale",
  "learn",
];

const diagramDomainPositions = {
  engage: { left: 499, top: 129, width: 257, height: 94 },
  train: { left: 836, top: 385, width: 258, height: 94 },
  operate: { left: 860, top: 591, width: 359, height: 101 },
  scale: { left: 743, top: 874, width: 360, height: 94 },
  learn: { left: 138, top: 734, width: 367, height: 94 },
} satisfies Record<PilotDomainId, DiagramPosition>;

const diagramFlowPositions = {
  audience: { left: 45, top: 222, width: 239, height: 59 },
  talent: { left: 860, top: 222, width: 187, height: 59 },
  capitalNetwork: { left: 813, top: 1036, width: 292, height: 60 },
  dataIp: { left: 69, top: 1036, width: 266, height: 60 },
} satisfies Record<InfrastructureFlowId, DiagramPosition>;

interface DiagramPosition {
  left: number;
  top: number;
  width: number;
  height: number;
}

type DiagramStyle = CSSProperties &
  Record<
    | "--diagram-left"
    | "--diagram-top"
    | "--diagram-width"
    | "--diagram-height"
    | "--diagram-mobile-left"
    | "--diagram-mobile-width",
    string
  >;

function diagramStyle(
  position: DiagramPosition,
  widthBoost = 0,
  mobileWidthBoost = widthBoost,
): DiagramStyle {
  const canvasWidth = 1368;
  const canvasHeight = 1220;

  return {
    "--diagram-left": `${((position.left - widthBoost / 2) / canvasWidth) * 100}%`,
    "--diagram-top": `${(position.top / canvasHeight) * 100}%`,
    "--diagram-width": `${((position.width + widthBoost) / canvasWidth) * 100}%`,
    "--diagram-height": `${(position.height / canvasHeight) * 100}%`,
    "--diagram-mobile-left": `${((position.left - mobileWidthBoost / 2) / canvasWidth) * 100}%`,
    "--diagram-mobile-width": `${((position.width + mobileWidthBoost) / canvasWidth) * 100}%`,
  };
}

function NodeIcon({ node, size = 24 }: { node: InfrastructureNode; size?: number }) {
  const Icon = nodeIcons[node.id] ?? PackageOpen;
  return <Icon aria-hidden="true" size={size} strokeWidth={1.8} />;
}

function FlowArrow({ id }: { id: InfrastructureFlowId }) {
  const Icon = {
    audience: ArrowUpLeft,
    talent: ArrowUpRight,
    capitalNetwork: ArrowDownRight,
    dataIp: ArrowDownLeft,
  }[id];

  return <Icon aria-hidden="true" size={15} strokeWidth={1.8} />;
}

interface SystemDiagramProps {
  activeDomain: PilotDomainId;
  interactive: boolean;
  onSelect: (domain: PilotDomainId) => void;
}

function SystemDiagram({ activeDomain, interactive, onSelect }: SystemDiagramProps) {
  const { locale } = useLocale();
  const availableDomains = new Set(content.domains.map((domain) => domain.id));

  return (
    <div
      className={styles.diagramCanvas}
      role="group"
      aria-label={
        locale === "ru"
          ? "Обзор системы Pilot"
          : locale === "de"
            ? "Übersicht des Pilot-Systems"
            : "Pilot system overview"
      }
    >
      <svg
        className={styles.systemLines}
        viewBox="0 0 1368 1220"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <ellipse className={styles.systemRing} cx="627" cy="641" rx="394" ry="394" />
        <path className={styles.systemFlowConnector} d="M 267 313 L 370 417" />
        <path className={styles.systemFlowConnector} d="M 860 313 L 760 418" />
        <path className={styles.systemFlowConnector} d="M 304 943 L 203 1036" />
        <path className={styles.systemFlowConnector} d="M 823 944 L 925 1036" />
      </svg>

      <div className={styles.systemCore} aria-label="Pilot">
        PILOT
      </div>

      {diagramDomainOrder.map((domainId) => {
        if (!availableDomains.has(domainId)) return null;
        const active = domainId === activeDomain;
        const sourcePosition = diagramDomainPositions[domainId];
        const normalizedPosition =
          active && sourcePosition.height < 101
            ? {
                ...sourcePosition,
                top: sourcePosition.top - (101 - sourcePosition.height) / 2,
                height: 101,
              }
            : sourcePosition;
        const style = diagramStyle(
          normalizedPosition,
          active ? 72 : 48,
          active ? 120 : 80,
        );
        const label = diagramDomainLabels[domainId][locale];
        const children = (
          <>
            {active ? <span className={styles.activeDot} aria-hidden="true" /> : null}
            <span>{label}</span>
          </>
        );

        return interactive ? (
          <button
            type="button"
            className={styles.systemDomain}
            style={style}
            data-active={active || undefined}
            aria-pressed={active}
            onClick={() => onSelect(domainId)}
            key={domainId}
          >
            {children}
          </button>
        ) : (
          <div
            className={styles.systemDomain}
            style={style}
            data-active={active || undefined}
            aria-current={active ? "true" : undefined}
            key={domainId}
          >
            {children}
          </div>
        );
      })}

      {content.flows.map((flow) => (
        <div
          className={styles.systemFlow}
          style={diagramStyle(diagramFlowPositions[flow.id], 32, 120)}
          key={flow.id}
        >
          <FlowArrow id={flow.id} />
          <span>{diagramFlowLabels[flow.id][locale]}</span>
        </div>
      ))}
    </div>
  );
}

function FlowLegend({ activeFlowIds }: { activeFlowIds: InfrastructureFlowId[] }) {
  const { locale } = useLocale();

  return (
    <div
      className={styles.flowLegend}
      aria-label={locale === "ru" ? "Потоки системы" : "System flows"}
    >
      {content.flows.map((flow) => (
        <div
          className={styles.flowItem}
          data-active={activeFlowIds.includes(flow.id) || undefined}
          key={flow.id}
        >
          <span className={styles.flowLine} aria-hidden="true" />
          <span>{localize(flow.label, locale)}</span>
        </div>
      ))}
    </div>
  );
}

interface DomainPanelProps {
  domain: InfrastructureDomain;
  id: string;
  labelledBy?: string;
  detailsOpen: boolean;
  mobile?: boolean;
  onDetailsToggle: () => void;
}

function DomainPanel({
  domain,
  id,
  labelledBy,
  detailsOpen,
  mobile = false,
  onDetailsToggle,
}: DomainPanelProps) {
  const { locale } = useLocale();
  const isOperate = domain.id === "operate";
  const detailsLabel = detailsOpen
    ? locale === "ru"
      ? "Скрыть детали"
      : locale === "de"
        ? "Details ausblenden"
        : "Hide details"
    : localize(content.detailLabel, locale);

  return (
    <div
      className={styles.contentCard}
      id={id}
      role={mobile ? "region" : "tabpanel"}
      aria-label={labelledBy ? undefined : localize(domain.label, locale)}
      aria-labelledby={labelledBy}
    >
      <div className={styles.contentHeading}>
        <div>
          <h3>{localize(domain.title, locale)}</h3>
          <p>{localize(domain.description, locale)}</p>
        </div>
      </div>

      {isOperate ? (
        <div className={styles.mediaGrid}>
          {domain.nodes.map((node) => (
            <figure className={styles.mediaTile} key={node.id}>
              <div className={styles.mediaVisual}>
                {node.media ? (
                  mobile ? (
                    <Image
                      src={node.media.poster}
                      alt=""
                      fill
                      sizes="136px"
                    />
                  ) : (
                    <video
                      poster={node.media.poster}
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="metadata"
                      disablePictureInPicture
                      disableRemotePlayback
                      tabIndex={-1}
                      aria-hidden="true"
                    >
                      <source src={node.media.video} type="video/mp4" />
                    </video>
                  )
                ) : (
                  <span className={styles.mediaFallback}>
                    <NodeIcon node={node} size={32} />
                  </span>
                )}
              </div>
              <figcaption>{localize(node.title, locale)}</figcaption>
            </figure>
          ))}
        </div>
      ) : (
        <div className={styles.nodeGrid} data-count={domain.nodes.length}>
          {domain.nodes.map((node) => (
            <article className={styles.nodeItem} key={node.id}>
              <span className={styles.nodeIcon}>
                <NodeIcon node={node} />
              </span>
              <strong>{localize(node.title, locale)}</strong>
              <span>{localize(node.description, locale)}</span>
            </article>
          ))}
        </div>
      )}

      <FlowLegend activeFlowIds={domain.flowIds} />

      <button
        type="button"
        className={styles.detailToggle}
        aria-expanded={detailsOpen}
        aria-controls={`${id}-detail`}
        onClick={onDetailsToggle}
      >
        <span>{detailsLabel}</span>
        <ChevronDown aria-hidden="true" size={20} />
      </button>

      <div className={styles.detail} id={`${id}-detail`} hidden={!detailsOpen}>
        <ul>
          {domain.detail.map((item, index) => (
            <li key={`${domain.id}-detail-${index}`}>{localize(item, locale)}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function PilotInfrastructureSection() {
  const { locale } = useLocale();
  const instanceId = useId().replaceAll(":", "");
  const [activeDomain, setActiveDomain] = useState<PilotDomainId>("engage");
  const [expandedDomain, setExpandedDomain] = useState<PilotDomainId | null>(
    "engage",
  );
  const [detailsOpen, setDetailsOpen] = useState(false);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const active =
    content.domains.find((domain) => domain.id === activeDomain) ??
    content.domains[0];

  function selectDomain(domainId: PilotDomainId) {
    setActiveDomain(domainId);
    setDetailsOpen(false);
  }

  function handleTabKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
    currentIndex: number,
  ) {
    let nextIndex = currentIndex;

    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      nextIndex = (currentIndex + 1) % content.domains.length;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      nextIndex =
        (currentIndex - 1 + content.domains.length) % content.domains.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = content.domains.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    const nextDomain = content.domains[nextIndex];
    if (!nextDomain) return;

    selectDomain(nextDomain.id);
    tabRefs.current[nextIndex]?.focus();
  }

  function toggleAccordion(domainId: PilotDomainId) {
    setDetailsOpen(false);
    setActiveDomain(domainId);
    setExpandedDomain((current) => (current === domainId ? null : domainId));
  }

  if (!active) return null;

  return (
    <section
      id="infrastructure"
      className={styles.section}
      aria-labelledby={`pilot-infrastructure-title-${instanceId}`}
    >
      <div className={styles.board}>
        <div className={styles.desktopExperience}>
          <header className={styles.intro}>
            <h2 id={`pilot-infrastructure-title-${instanceId}`}>
              {localize(content.headline, locale)}
            </h2>
          </header>

          <div
            className={styles.tabList}
            role="tablist"
            aria-label={localize(content.tabsLabel, locale)}
          >
            {content.domains.map((domain, index) => {
              const Icon = domainIcons[domain.id];
              const selected = domain.id === activeDomain;
              const tabId = `pilot-infrastructure-tab-${instanceId}-${domain.id}`;
              const panelId = `pilot-infrastructure-panel-${instanceId}-${domain.id}`;

              return (
                <button
                  ref={(element) => {
                    tabRefs.current[index] = element;
                  }}
                  id={tabId}
                  className={styles.tab}
                  data-active={selected || undefined}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls={panelId}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => selectDomain(domain.id)}
                  onKeyDown={(event) => handleTabKeyDown(event, index)}
                  key={domain.id}
                >
                  <span className={styles.tabIcon} aria-hidden="true">
                    <Icon size={18} strokeWidth={1.8} />
                  </span>
                  <span>{localize(domain.label, locale)}</span>
                </button>
              );
            })}
          </div>

          <div className={styles.diagram}>
            <SystemDiagram
              activeDomain={activeDomain}
              interactive
              onSelect={selectDomain}
            />
          </div>

          <div className={styles.desktopPanels}>
            {content.domains.map((domain) => {
              const selected = domain.id === activeDomain;
              const tabId = `pilot-infrastructure-tab-${instanceId}-${domain.id}`;
              const panelId = `pilot-infrastructure-panel-${instanceId}-${domain.id}`;

              return (
                <div hidden={!selected} key={domain.id}>
                  <DomainPanel
                    domain={domain}
                    id={panelId}
                    labelledBy={tabId}
                    detailsOpen={detailsOpen}
                    onDetailsToggle={() => setDetailsOpen((current) => !current)}
                  />
                </div>
              );
            })}
          </div>
        </div>

        <div className={styles.mobileExperience}>
          <header className={styles.intro}>
            <h2 id={`pilot-infrastructure-mobile-title-${instanceId}`}>
              {localize(content.headline, locale)}
            </h2>
          </header>

          <div className={styles.diagram}>
            <SystemDiagram
              activeDomain={activeDomain}
              interactive={false}
              onSelect={selectDomain}
            />
          </div>

          <div className={styles.mobileDomains}>
            {content.domains.map((domain) => {
              const Icon = domainIcons[domain.id];
              const expanded = domain.id === expandedDomain;
              const triggerId = `pilot-infrastructure-accordion-${instanceId}-${domain.id}`;
              const panelId = `pilot-infrastructure-accordion-panel-${instanceId}-${domain.id}`;

              return (
                <Fragment key={domain.id}>
                  <div
                    className={styles.mobileDomain}
                    data-active={expanded || undefined}
                  >
                    <button
                      id={triggerId}
                      type="button"
                      className={styles.mobileTrigger}
                      aria-expanded={expanded}
                      aria-controls={panelId}
                      onClick={() => toggleAccordion(domain.id)}
                    >
                      <span className={styles.mobileTriggerIcon} aria-hidden="true">
                        <Icon size={24} strokeWidth={1.8} />
                      </span>
                      <span className={styles.mobileTriggerCopy}>
                        <strong>{localize(domain.label, locale)}</strong>
                        <small>{localize(domain.outcome, locale)}</small>
                      </span>
                      <ChevronDown aria-hidden="true" size={20} />
                    </button>

                    <div hidden={!expanded}>
                      <DomainPanel
                        domain={domain}
                        id={panelId}
                        labelledBy={triggerId}
                        detailsOpen={detailsOpen}
                        mobile
                        onDetailsToggle={() =>
                          setDetailsOpen((current) => !current)
                        }
                      />
                    </div>
                  </div>
                </Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
