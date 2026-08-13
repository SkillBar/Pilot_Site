"use client";

import { memo } from "react";
import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";
import type { OrgFlowCardData } from "@/components/org-flow/types";

export type OrgFlowCardNodeType = Node<OrgFlowCardData, "orgCard">;

function kindLabel(kind: OrgFlowCardData["kind"]) {
  if (kind === "company") return "Company";
  if (kind === "department") return "Department";
  if (kind === "leadership" || kind === "person") return "Leadership";
  return "Project";
}

function PersonBlock({
  name,
  role,
  avatarSrc,
  avatarAlt,
  avatarPosition,
}: {
  name: string;
  role: string;
  avatarSrc: string;
  avatarAlt?: string;
  avatarPosition?: string;
}) {
  return (
    <div className="org-flow-person">
      <div className="org-flow-person__role">{role}</div>
      <div className="org-flow-card__avatar-wrap">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="org-flow-card__avatar"
          src={avatarSrc}
          alt={avatarAlt ?? name}
          style={
            avatarPosition ? { objectPosition: avatarPosition } : undefined
          }
          draggable={false}
        />
      </div>
      <div className="org-flow-person__name">{name}</div>
    </div>
  );
}

function OrgFlowCardNodeComponent({ data }: NodeProps<OrgFlowCardNodeType>) {
  const isPerson = data.kind === "person";
  const isLeadership = data.kind === "leadership";
  const showPeopleInside =
    Boolean(data.people?.length) &&
    (data.kind === "company" || isLeadership);

  return (
    <div
      className={[
        "org-flow-card",
        data.kind ? `org-flow-card--${data.kind}` : "",
        data.emphasis ? "org-flow-card--emphasis" : "",
        showPeopleInside ? "org-flow-card--with-people" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {!isPerson && !isLeadership ? (
        <div className="org-flow-card__label">{kindLabel(data.kind)}</div>
      ) : null}

      {isPerson && data.avatarSrc && data.role ? (
        <PersonBlock
          name={data.title}
          role={data.role}
          avatarSrc={data.avatarSrc}
          avatarAlt={data.avatarAlt}
          avatarPosition={data.avatarPosition}
        />
      ) : null}

      {!isPerson && !isLeadership ? (
        <h3 className="org-flow-card__title">{data.title}</h3>
      ) : null}

      {showPeopleInside ? (
        <div className="org-flow-card__people">
          {data.people!.map((person) => (
            <PersonBlock key={`${person.role}-${person.name}`} {...person} />
          ))}
        </div>
      ) : null}

      {!isPerson && !isLeadership && data.description ? (
        <p className="org-flow-card__desc">{data.description}</p>
      ) : null}

      {!isPerson && !isLeadership && data.tags?.length ? (
        <ul className="org-flow-card__tags">
          {data.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      ) : null}

      {data.target ? (
        <Handle
          type="target"
          position={Position.Top}
          className="org-flow-card__handle"
        />
      ) : null}
      {data.source ? (
        <Handle
          type="source"
          position={Position.Bottom}
          className="org-flow-card__handle"
        />
      ) : null}
    </div>
  );
}

export const OrgFlowCardNode = memo(OrgFlowCardNodeComponent);

export const ORG_FLOW_NODE_TYPES = {
  orgCard: OrgFlowCardNode,
} as const;
