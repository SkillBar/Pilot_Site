"use client";

import { useMemo } from "react";
import { SectionHeader } from "@/components/SectionHeader";
import { OrgFlowCanvas } from "@/components/org-flow/OrgFlowCanvas";
import { createDepartmentsFlow } from "@/components/org-flow/departments-flow-data";
import { useTranslations } from "@/i18n/client";

export function OrgDepartmentsSection() {
  const t = useTranslations();

  const { nodes, edges } = useMemo(
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
      }),
    [t],
  );

  return (
    <section
      id="org-departments"
      className="org-depts-section relative overflow-hidden border-t border-black/10 px-5 py-16 md:px-8 md:py-24"
    >
      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionHeader
          align="left"
          eyebrow={t("orgDepartments.eyebrow")}
          title={t("orgDepartments.title")}
          description={t("orgDepartments.description")}
          eyebrowClassName="font-bold tracking-[0.32em] text-[#ef5a16]"
          descriptionClassName="max-w-xl text-black/55"
        />

        <div className="org-frame org-frame--flow mt-10 md:mt-14">
          <span className="org-badge">{t("orgDepartments.label")}</span>
          <OrgFlowCanvas
            nodes={nodes}
            edges={edges}
            ariaLabel={t("orgDepartments.title")}
            className="org-flow-canvas--depts"
          />
        </div>
      </div>
    </section>
  );
}
