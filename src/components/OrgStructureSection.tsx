"use client";

import { useMemo } from "react";
import { SectionHeader } from "@/components/SectionHeader";
import { OrgFlowCanvas } from "@/components/org-flow/OrgFlowCanvas";
import { createGroupStructureFlow } from "@/components/org-flow/group-structure-data";
import { useTranslations } from "@/i18n/client";
import { useCompactOrgLayout } from "@/lib/useCompactOrgLayout";

export function OrgStructureSection() {
  const t = useTranslations();
  const compact = useCompactOrgLayout();

  const { nodes, edges, bounds } = useMemo(
    () =>
      createGroupStructureFlow({
        company: t("orgStructure.nodes.company"),
        pilot: t("orgStructure.nodes.pilot"),
        launcher: t("orgStructure.nodes.launcher"),
        unior: t("orgStructure.nodes.unior"),
        people: {
          ceo: {
            name: t("orgStructure.people.ceo.name"),
            role: t("orgStructure.people.ceo.role"),
            description: t("orgStructure.people.ceo.description"),
          },
          coo: {
            name: t("orgStructure.people.coo.name"),
            role: t("orgStructure.people.coo.role"),
            description: t("orgStructure.people.coo.description"),
          },
        },
        tags: {
          racing: t("orgStructure.tags.racing"),
          venues: t("orgStructure.tags.venues"),
          software: t("orgStructure.tags.software"),
          telemetry: t("orgStructure.tags.telemetry"),
          education: t("orgStructure.tags.education"),
          kids: t("orgStructure.tags.kids"),
        },
      }, compact),
    [compact, t],
  );

  return (
    <section
      id="org-structure"
      className="org-section relative overflow-hidden border-t border-black/10 px-5 py-16 md:px-8 md:py-24"
    >
      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionHeader
          title={t("orgStructure.title")}
          description={t("orgStructure.description")}
          descriptionClassName="max-w-xl text-black/55"
        />

        <div className="org-frame org-frame--flow mt-12 md:mt-16">
          <span className="org-badge">{t("orgStructure.badge")}</span>
          <OrgFlowCanvas
            nodes={nodes}
            edges={edges}
            bounds={bounds}
            compact={compact}
            flowId="group-structure-flow"
            ariaLabel={t("orgStructure.title")}
            className="org-flow-canvas--group"
          />
        </div>
      </div>
    </section>
  );
}
