import type { CoordinateExtent, Edge } from "@xyflow/react";
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
}, compact = false): { nodes: OrgFlowCardNodeType[]; edges: Edge[]; bounds: CoordinateExtent } {
  const rowWidth = compact ? STEP + CARD_W : STEP * 2 + CARD_W;
  const companyX = (rowWidth - COMPANY_W) / 2;
  const projectPositions = compact
    ? [
        { x: 0, y: PROJECTS_Y },
        { x: STEP, y: PROJECTS_Y },
        { x: (rowWidth - CARD_W) / 2, y: PROJECTS_Y + 240 },
      ]
    : [
        { x: 0, y: PROJECTS_Y },
        { x: STEP, y: PROJECTS_Y },
        { x: STEP * 2, y: PROJECTS_Y },
      ];

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
      draggable: false,
    },
    {
      id: "pilot",
      type: "orgCard",
      position: projectPositions[0],
      data: {
        title: "Pilot",
        description: copy.pilot,
        kind: "project",
        tags: [copy.tags.racing, copy.tags.venues],
        target: true,
      },
      draggable: false,
    },
    {
      id: "launcher",
      type: "orgCard",
      position: projectPositions[1],
      data: {
        title: "Pilot Launcher",
        description: copy.launcher,
        kind: "project",
        tags: [copy.tags.software, copy.tags.telemetry],
        target: true,
      },
      draggable: false,
    },
    {
      id: "unior",
      type: "orgCard",
      position: projectPositions[2],
      data: {
        title: "Pilot Unior",
        description: copy.unior,
        kind: "project",
        tags: [copy.tags.education, copy.tags.kids],
        target: true,
      },
      draggable: false,
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

  const contentBottom = compact ? PROJECTS_Y + 440 : PROJECTS_Y + 200;
  return {
    nodes,
    edges,
    bounds: [[-64, -64], [rowWidth + 64, contentBottom + 64]],
  };
}
