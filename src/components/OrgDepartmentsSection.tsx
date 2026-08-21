"use client";

import { useMemo } from "react";
import { SectionHeader } from "@/components/SectionHeader";
import { OrgFlowCanvas } from "@/components/org-flow/OrgFlowCanvas";
import { createDepartmentsFlow } from "@/components/org-flow/departments-flow-data";
import { useTranslations } from "@/i18n/client";
import { useCompactOrgLayout } from "@/lib/useCompactOrgLayout";

export function OrgDepartmentsSection() {
  const t = useTranslations();
  const compact = useCompactOrgLayout();

  const { nodes, edges, bounds } = useMemo(
    () =>
      createDepartmentsFlow({
        company: t("orgStructure.nodes.company"),
        items: {
          alpha: t("orgDepartments.items.alpha"),
          betta: t("orgDepartments.items.betta"),
          gamma: t("orgDepartments.items.gamma"),
          delta: t("orgDepartments.items.delta"),
          epsilon: t("orgDepartments.items.epsilon"),
          omega: t("orgDepartments.items.omega"),
          mega: t("orgDepartments.items.mega"),
        },
      }, compact),
    [compact, t],
  );

  return (
    <section
      id="org-departments"
      className="org-depts-section relative overflow-hidden border-t border-black/10 px-5 py-16 md:px-8 md:py-24"
    >
      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionHeader
          title={t("orgDepartments.title")}
          description={t("orgDepartments.description")}
          descriptionClassName="max-w-xl text-black/55"
        />

        <div className="org-frame org-frame--flow mt-12 md:mt-16">
          <span className="org-badge">{t("orgDepartments.label")}</span>
          <OrgFlowCanvas
            nodes={nodes}
            edges={edges}
            bounds={bounds}
            compact={compact}
            flowId="departments-flow"
            ariaLabel={t("orgDepartments.title")}
            className="org-flow-canvas--depts"
          />
        </div>
      </div>
    </section>
  );
}
