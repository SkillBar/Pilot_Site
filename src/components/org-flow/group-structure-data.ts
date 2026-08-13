import type { Edge } from "@xyflow/react";
import type { OrgFlowCardNodeType } from "@/components/org-flow/OrgFlowCardNode";

const CARD_W = 280;
const COMPANY_W = 420;
const GAP = 36;
const STEP = CARD_W + GAP;

const PROJECTS_Y = 320;

export function createGroupStructureFlow(copy: {
  company: string;
  pilot: string;
  launcher: string;
  unior: string;
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
}): { nodes: OrgFlowCardNodeType[]; edges: Edge[] } {
  const rowWidth = STEP * 2 + CARD_W;
  const companyX = (rowWidth - COMPANY_W) / 2;

  const nodes: OrgFlowCardNodeType[] = [
    {
      id: "company",
      type: "orgCard",
      position: { x: companyX, y: 0 },
      style: { width: COMPANY_W },
      data: {
        title: "PILOT",
        kind: "company",
        emphasis: true,
        source: true,
        people: [
          {
            name: copy.people.ceo.name,
            role: copy.people.ceo.role,
            avatarSrc: "/team/denis.png",
            avatarAlt: `${copy.people.ceo.role} ${copy.people.ceo.name}`,
            avatarPosition: "50% 14%",
          },
          {
            name: copy.people.coo.name,
            role: copy.people.coo.role,
            avatarSrc: "/team/anton.png",
            avatarAlt: `${copy.people.coo.role} ${copy.people.coo.name}`,
            avatarPosition: "50% 16%",
          },
        ],
      },
      draggable: true,
    },
    {
      id: "pilot",
      type: "orgCard",
      position: { x: 0, y: PROJECTS_Y },
      data: {
        title: "Pilot",
        description: copy.pilot,
        kind: "project",
        tags: [copy.tags.racing, copy.tags.venues],
        target: true,
      },
      draggable: true,
    },
    {
      id: "launcher",
      type: "orgCard",
      position: { x: STEP, y: PROJECTS_Y },
      data: {
        title: "Pilot Launcher",
        description: copy.launcher,
        kind: "project",
        tags: [copy.tags.software, copy.tags.telemetry],
        target: true,
      },
      draggable: true,
    },
    {
      id: "unior",
      type: "orgCard",
      position: { x: STEP * 2, y: PROJECTS_Y },
      data: {
        title: "Pilot Unior",
        description: copy.unior,
        kind: "project",
        tags: [copy.tags.education, copy.tags.kids],
        target: true,
      },
      draggable: true,
    },
  ];

  const edges: Edge[] = [
    {
      id: "e-company-pilot",
      source: "company",
      target: "pilot",
      animated: true,
    },
    {
      id: "e-company-launcher",
      source: "company",
      target: "launcher",
      animated: true,
    },
    {
      id: "e-company-unior",
      source: "company",
      target: "unior",
      animated: true,
    },
  ];

  return { nodes, edges };
}
