import type { Edge } from "@xyflow/react";
import type { OrgFlowCardNodeType } from "@/components/org-flow/OrgFlowCardNode";

const CARD_W = 220;
const GAP = 24;
const STEP = CARD_W + GAP;

const DEPTS = [
  { id: "alpha", code: "Alpha", key: "alpha" as const },
  { id: "betta", code: "Betta", key: "betta" as const },
  { id: "gamma", code: "Gamma", key: "gamma" as const },
  { id: "delta", code: "Delta", key: "delta" as const },
  { id: "epsilon", code: "Epsilon", key: "epsilon" as const },
  { id: "omega", code: "Omega", key: "omega" as const },
  { id: "mega", code: "Mega", key: "mega" as const },
] as const;

export function createDepartmentsFlow(copy: {
  company: string;
  items: Record<(typeof DEPTS)[number]["key"], string>;
}): { nodes: OrgFlowCardNodeType[]; edges: Edge[] } {
  const rowWidth = DEPTS.length * STEP - GAP;
  const companyX = Math.max(0, (rowWidth - CARD_W) / 2);

  const nodes: OrgFlowCardNodeType[] = [
    {
      id: "pilot-core",
      type: "orgCard",
      position: { x: companyX, y: 0 },
      data: {
        title: "PILOT",
        description: copy.company,
        kind: "company",
        emphasis: true,
        source: true,
      },
      draggable: true,
    },
    ...DEPTS.map((dept, index) => ({
      id: dept.id,
      type: "orgCard" as const,
      position: {
        x: index * STEP,
        y: 240,
      },
      data: {
        title: dept.code,
        description: copy.items[dept.key],
        kind: "department" as const,
        target: true,
      },
      style: { width: CARD_W },
      draggable: true,
    })),
  ];

  const edges: Edge[] = DEPTS.map((dept) => ({
    id: `e-core-${dept.id}`,
    source: "pilot-core",
    target: dept.id,
    animated: true,
  }));

  return { nodes, edges };
}
