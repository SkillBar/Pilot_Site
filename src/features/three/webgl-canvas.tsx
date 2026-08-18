"use client";

import { Canvas, type CanvasProps } from "@react-three/fiber";
import { Suspense, type ReactNode } from "react";

type WebGLCanvasProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  /** Отключает pointer events на canvas (оверлей кликабелен). */
  pointerEventsNone?: boolean;
  /** Включает shadow map для направленного света и кастомных теней. */
  shadows?: boolean;
  /** Пока дочерний React Three Fiber ждёт Suspense (GLTF и т.д.). */
  suspenseFallback?: ReactNode;
} & Omit<CanvasProps, "children" | "className">;

/**
 * Общая обёртка Canvas: один стиль GL, DPR, Suspend для lazy-компонентов drei.
 * Сцены подключаются как children — так легко комбинировать и тестировать.
 */
export function WebGLCanvas({
  children,
  className,
  id,
  pointerEventsNone = true,
  shadows = false,
  suspenseFallback = null,
  gl,
  dpr,
  ...rest
}: WebGLCanvasProps) {
  return (
    <div
      id={id}
      className={`relative size-full min-h-[12rem] ${pointerEventsNone ? "pointer-events-none" : ""} ${className ?? ""}`}
    >
      <Canvas
        {...rest}
        shadows={shadows}
        className="!absolute inset-0 size-full touch-none"
        dpr={dpr ?? [1, 2]}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
          ...gl,
        }}
      >
        <Suspense fallback={suspenseFallback}>{children}</Suspense>
      </Canvas>
    </div>
  );
}
