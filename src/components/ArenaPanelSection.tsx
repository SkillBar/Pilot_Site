"use client";

import { SectionHeader } from "@/components/SectionHeader";
import { useTranslations } from "@/i18n/client";
import type { MessageKey } from "@/i18n/getMessage";

const SPECS: { k: MessageKey; v: MessageKey }[] = [
  { k: "arenaPanel.specs.formatK", v: "arenaPanel.specs.formatV" },
  { k: "arenaPanel.specs.fpvK", v: "arenaPanel.specs.fpvV" },
  { k: "arenaPanel.specs.controlK", v: "arenaPanel.specs.controlV" },
  { k: "arenaPanel.specs.viewersK", v: "arenaPanel.specs.viewersV" },
];

const KIT: MessageKey[] = [
  "arenaPanel.kit.frame",
  "arenaPanel.kit.cover",
  "arenaPanel.kit.barriers",
  "arenaPanel.kit.light",
  "arenaPanel.kit.cameras",
  "arenaPanel.kit.radio",
];

const ZONES: MessageKey[] = [
  "arenaPanel.zones.z1",
  "arenaPanel.zones.z2",
  "arenaPanel.zones.z3",
  "arenaPanel.zones.z4",
  "arenaPanel.zones.z5",
  "arenaPanel.zones.z6",
];

function PlusMarks() {
  return (
    <span className="dist-plus dist-plus--board" aria-hidden>
      <span />
      <span />
      <span />
      <span />
    </span>
  );
}

function MediaSlot({
  className = "",
  label,
}: {
  className?: string;
  label?: string;
}) {
  return (
    <div className={`arena-ph ${className}`} aria-hidden>
      {label ? <span>{label}</span> : null}
    </div>
  );
}

export function ArenaPanelSection() {
  const t = useTranslations();

  return (
    <section
      id="arena-panel"
      className="arena-panel-section relative overflow-hidden border-t border-black/10 px-5 py-16 md:px-8 md:py-24"
    >
      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionHeader
          title={t("arenaPanel.title")}
          description={t("arenaPanel.description")}
          descriptionClassName="max-w-xl text-black/55"
        />

        <div className="dist-board arena-board mt-12 md:mt-16">
          <PlusMarks />
          <div className="dist-board-inner arena-board-inner">
            <div className="arena-row arena-row--hero">
              <figure className="arena-cell arena-cell--hero">
                <figcaption>{t("arenaPanel.captions.hero")}</figcaption>
                <MediaSlot className="arena-ph--hero" />
              </figure>
              <div className="arena-col">
                <figure className="arena-cell">
                  <figcaption>{t("arenaPanel.captions.plan")}</figcaption>
                  <MediaSlot className="arena-ph--plan" />
                </figure>
                <figure className="arena-cell">
                  <figcaption>{t("arenaPanel.captions.cut")}</figcaption>
                  <MediaSlot className="arena-ph--cut" />
                </figure>
              </div>
            </div>

            <div className="arena-row arena-row--quad">
              <div className="arena-cell arena-cell--spec">
                <h3>{t("arenaPanel.kickers.params")}</h3>
                <ul>
                  {SPECS.map((spec) => (
                    <li key={spec.k}>
                      <span>{t(spec.k)}</span>
                      <span>{t(spec.v)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="arena-cell arena-cell--split">
                <div>
                  <span className="arena-mini-cap">
                    {t("arenaPanel.captions.moduleTrack")}
                  </span>
                  <MediaSlot className="arena-ph--mod" />
                </div>
                <div>
                  <span className="arena-mini-cap">
                    {t("arenaPanel.captions.moduleDyn")}
                  </span>
                  <MediaSlot className="arena-ph--mod" />
                </div>
              </div>

              <div className="arena-cell arena-cell--accent">
                <h3>{t("arenaPanel.kickers.feed")}</h3>
                <p>{t("arenaPanel.captions.feedNote")}</p>
                <MediaSlot className="arena-ph--fpv" />
              </div>

              <div className="arena-cell">
                <h3>{t("arenaPanel.kickers.zones")}</h3>
                <div className="arena-mosaic">
                  {ZONES.map((zone) => (
                    <div key={zone} className="arena-tile">
                      <MediaSlot className="arena-ph--tile" />
                      <span>{t(zone)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="arena-row arena-row--kit">
              <div className="arena-cell">
                <h3>{t("arenaPanel.kickers.kit")}</h3>
                <ul className="arena-kit">
                  {KIT.map((item) => (
                    <li key={item}>
                      <span className="arena-kit-dot" aria-hidden />
                      {t(item)}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="arena-cell arena-cell--cars">
                <div>
                  <span className="arena-mini-cap">
                    {t("arenaPanel.captions.carsScale")}
                  </span>
                  <MediaSlot className="arena-ph--car" />
                </div>
                <div>
                  <span className="arena-mini-cap">
                    {t("arenaPanel.captions.carsSlot")}
                  </span>
                  <MediaSlot className="arena-ph--car" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
