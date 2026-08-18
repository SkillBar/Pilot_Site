"use client";

import * as THREE from "three";

import {
  CityDrivingScene,
  type CityDrivingVehicleId,
} from "./scenes/city-driving-scene";

import { WebGLCanvas } from "./webgl-canvas";

type CityDrivingCanvasProps = {
  className?: string;
  vehicleId?: CityDrivingVehicleId;
};

/**
 * Изометрия — полный кадр; компактный PiP сзади машины — только WebGL (hood-pip), без HTML-«рамки».
 */
export function CityDrivingCanvas({
  className,
  vehicleId = "taxi",
}: CityDrivingCanvasProps) {
  return (
    <div className={`relative size-full min-h-[inherit] ${className ?? ""}`}>
      <WebGLCanvas
        className="absolute inset-0 size-full min-h-[inherit]"
        pointerEventsNone={false}
        shadows
        orthographic
        camera={{
          position: [34, 28, 34],
          zoom: 22,
          near: 0.1,
          far: 400,
        }}
        gl={{
          alpha: false,
          antialias: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1,
        }}
        dpr={[1, 2]}
        suspenseFallback={null}
      >
        <CityDrivingScene vehicleId={vehicleId} />
      </WebGLCanvas>
    </div>
  );
}
