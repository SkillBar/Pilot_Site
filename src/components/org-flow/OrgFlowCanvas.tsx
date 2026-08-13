"use client";

import { useCallback, useRef } from "react";
import {
  Background,
  BackgroundVariant,
  Controls,
  PanOnScrollMode,
  ReactFlow,
  ReactFlowProvider,
  type DefaultEdgeOptions,
  type Edge,
  type ReactFlowInstance,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import {
  ORG_FLOW_NODE_TYPES,
  type OrgFlowCardNodeType,
} from "@/components/org-flow/OrgFlowCardNode";

type FlowInstance = ReactFlowInstance<OrgFlowCardNodeType, Edge>;

const EDGE_OPTIONS: DefaultEdgeOptions = {
  type: "smoothstep",
  animated: true,
  style: {
    stroke: "rgba(239, 90, 22, 0.55)",
    strokeWidth: 1.6,
  },
};

function OrgFlowCanvasInner({
  nodes,
  edges,
  ariaLabel,
  className = "",
  dark = false,
}: {
  nodes: OrgFlowCardNodeType[];
  edges: Edge[];
  ariaLabel: string;
  className?: string;
  dark?: boolean;
}) {
  const flowRef = useRef<FlowInstance | null>(null);

  const onInit = useCallback((instance: FlowInstance) => {
    flowRef.current = instance;
    requestAnimationFrame(() => {
      instance.fitView({
        padding: 0.12,
        duration: 0,
        minZoom: 0.35,
        maxZoom: 1.15,
      });
    });
  }, []);

  return (
    <div
      className={`org-flow-canvas${dark ? " org-flow-canvas--dark" : ""} ${className}`}
      aria-label={ariaLabel}
    >
      <ReactFlow<OrgFlowCardNodeType, Edge>
        nodes={nodes}
        edges={edges}
        nodeTypes={ORG_FLOW_NODE_TYPES}
        defaultEdgeOptions={EDGE_OPTIONS}
        onInit={onInit}
        nodesDraggable
        nodesConnectable={false}
        elementsSelectable
        nodesFocusable={false}
        edgesFocusable={false}
        disableKeyboardA11y
        panOnDrag
        panOnScroll
        panOnScrollMode={PanOnScrollMode.Free}
        preventScrolling
        zoomOnScroll={false}
        zoomOnPinch
        zoomOnDoubleClick={false}
        selectNodesOnDrag={false}
        fitView
        minZoom={0.25}
        maxZoom={1.4}
        proOptions={{ hideAttribution: true }}
        style={{ width: "100%", height: "100%" }}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={20}
          size={1.1}
          color={
            dark ? "rgba(255, 255, 255, 0.08)" : "rgba(17, 19, 24, 0.12)"
          }
        />
        <Controls
          className="org-flow-controls"
          showInteractive={false}
          position="bottom-right"
        />
      </ReactFlow>
    </div>
  );
}

export function OrgFlowCanvas(props: {
  nodes: OrgFlowCardNodeType[];
  edges: Edge[];
  ariaLabel: string;
  className?: string;
  dark?: boolean;
}) {
  return (
    <ReactFlowProvider>
      <OrgFlowCanvasInner {...props} />
    </ReactFlowProvider>
  );
}
