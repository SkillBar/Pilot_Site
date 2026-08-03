"use client";

import { SectionHeader } from "@/components/SectionHeader";
import { useTranslations } from "@/i18n/client";
import type { MessageKey } from "@/i18n/getMessage";

const PROJECTS: {
  id: string;
  name: string;
  textKey: MessageKey;
  tags?: MessageKey[];
}[] = [
  {
    id: "pilot",
    name: "Pilot",
    textKey: "orgStructure.nodes.pilot",
    tags: ["orgStructure.tags.racing", "orgStructure.tags.venues"],
  },
  {
    id: "launcher",
    name: "Pilot Launcher",
    textKey: "orgStructure.nodes.launcher",
    tags: ["orgStructure.tags.software", "orgStructure.tags.telemetry"],
  },
  {
    id: "unior",
    name: "Pilot Unior",
    textKey: "orgStructure.nodes.unior",
    tags: ["orgStructure.tags.education", "orgStructure.tags.kids"],
  },
];

export function OrgStructureSection() {
  const t = useTranslations();

  return (
    <section
      id="org-structure"
      className="org-section relative overflow-hidden border-t border-black/10 px-5 py-16 md:px-8 md:py-24"
    >
      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionHeader
          eyebrow={t("orgStructure.eyebrow")}
          title={t("orgStructure.title")}
          description={t("orgStructure.description")}
          eyebrowClassName="font-bold tracking-[0.32em] text-[#ef5a16]"
          descriptionClassName="max-w-xl text-black/55"
        />

        <div className="org-frame mt-12 md:mt-16">
          <span className="org-badge">{t("orgStructure.badge")}</span>

          <div className="org-tier">
            <p className="org-tier-label">{t("orgStructure.tierTop")}</p>
            <article className="org-card org-card--company">
              <div className="org-card-top">
                <h3>PILOT</h3>
                <span className="org-chip">{t("orgStructure.companyTag")}</span>
              </div>
              <p>{t("orgStructure.nodes.company")}</p>
            </article>
          </div>

          <div className="org-bridge org-bridge--3" aria-hidden>
            <span />
            <span />
            <span />
          </div>

          <div className="org-tier">
            <p className="org-tier-label">{t("orgStructure.tierBranch")}</p>
            <div className="org-grid org-grid--projects">
              {PROJECTS.map((project) => (
                <article key={project.id} className="org-card org-card--target">
                  <div className="org-card-top">
                    <h3>{project.name}</h3>
                  </div>
                  <p>{t(project.textKey)}</p>
                  {project.tags?.length ? (
                    <ul className="org-acts">
                      {project.tags.map((tag) => (
                        <li key={tag}>{t(tag)}</li>
                      ))}
                    </ul>
                  ) : null}
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
