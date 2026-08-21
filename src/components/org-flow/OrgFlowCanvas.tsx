"use client";

import { useCallback, useEffect, useRef } from "react";
import {
  Background,
  BackgroundVariant,
  Controls,
  ReactFlow,
  ReactFlowProvider,
  type DefaultEdgeOptions,
  type CoordinateExtent,
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
  bounds,
  compact,
  flowId,
}: {
  nodes: OrgFlowCardNodeType[];
  edges: Edge[];
  ariaLabel: string;
  className?: string;
  dark?: boolean;
  bounds: CoordinateExtent;
  compact: boolean;
  flowId: string;
}) {
  const flowRef = useRef<FlowInstance | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const fitCanvas = useCallback((duration = 0) => {
    flowRef.current?.fitView({
      padding: compact ? 0.08 : 0.12,
      duration,
      minZoom: compact ? 0.55 : 0.3,
      maxZoom: 1.15,
    });
  }, [compact]);

  const onInit = useCallback((instance: FlowInstance) => {
    flowRef.current = instance;
    requestAnimationFrame(() => fitCanvas());
  }, [fitCanvas]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => fitCanvas());
    return () => cancelAnimationFrame(frame);
  }, [bounds, fitCanvas, nodes]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !("ResizeObserver" in window)) return;
    let frame = 0;
    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => fitCanvas());
    });
    observer.observe(container);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [fitCanvas]);

  return (
    <div
      ref={containerRef}
      className={`org-flow-canvas${dark ? " org-flow-canvas--dark" : ""} ${className}`}
      aria-label={ariaLabel}
    >
      <ReactFlow<OrgFlowCardNodeType, Edge>
        id={flowId}
        nodes={nodes}
        edges={edges}
        nodeTypes={ORG_FLOW_NODE_TYPES}
        defaultEdgeOptions={EDGE_OPTIONS}
        onInit={onInit}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        nodesFocusable={false}
        edgesFocusable={false}
        panOnDrag
        panOnScroll={false}
        preventScrolling={false}
        zoomOnScroll={false}
        zoomOnPinch
        zoomOnDoubleClick={false}
        selectNodesOnDrag={false}
        fitView
        minZoom={compact ? 0.55 : 0.3}
        maxZoom={1.15}
        nodeExtent={bounds}
        translateExtent={bounds}
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
  bounds: CoordinateExtent;
  compact: boolean;
  flowId: string;
}) {
  return (
    <ReactFlowProvider>
      <OrgFlowCanvasInner {...props} />
    </ReactFlowProvider>
  );
}
