"use client";

/**
 * Пайплайн загрузки сцены «город»:
 * 1. constants / grid-map — без React, считаются один раз (useMemo в CityDrivingScene).
 * 2. preload (внизу файла): машина игрока → уникальные GLB трека (параллельно через кэш drei).
 * 3. Suspense уже в WebGLCanvas — GLB доезжают асинхронно; земля без текстур даёт первый кадр сразу.
 * 4. Lighting без HDR Environment — экономия запросов и декодирования env-map.
 * 5. HoodViewportPass: второй проход — камера сзади (3-е лицо) в компактном PiP (см. hood-pip.tsx).
 */

import { useMemo, useRef } from "react";

import { CityDrivingPlayerSpeedRefContext } from "./city-driving/player-speed-context";
import type { Group, PerspectiveCamera } from "three";
import { ContactShadows, Grid, useGLTF } from "@react-three/drei";

import { CharacterHardDebugRig } from "./city-driving/character-hard-debug";
import { useCharacterDebugHard } from "./city-driving/use-character-debug-hard";

import {
  KENNEY_STARTER_RACING_PRELOAD_URLS,
} from "../config/kenney-starter-racing";

import { IsometricFollowCamera } from "./city-driving/camera";
import {
  KENNEY_SEDAN_GLB,
  MESHY_AI_JEEP_GLB,
  MESHY_GENTLEMAN_GLB,
  PLAYER_GENTLEMAN_CAR_ROOT_Y,
  type CityDrivingVehicleId,
  PIP_CAM_FAR,
  PIP_CAM_FOV,
  PIP_CAM_LOCAL_POS,
  PIP_CAM_LOCAL_ROT,
  PIP_CAM_NEAR,
  SCENE_BG,
  SCENE_FOG,
} from "./city-driving/constants";
import { HoodViewportPass } from "./city-driving/hood-pip";
import { Ground } from "./city-driving/ground";
import { buildTrackTiles, computeMapHalf } from "./city-driving/grid-map";
import { DayLighting } from "./city-driving/lighting";
import { RacingTrack } from "./city-driving/track";
import { PlayerVehicle, VehicleController } from "./city-driving/vehicle";

export {
  CITY_DRIVING_VEHICLE_PRESETS,
  KENNEY_SEDAN_GLB,
  MESHY_AI_JEEP_GLB,
  MESHY_GENTLEMAN_GLB,
  type CityDrivingVehicleId,
} from "./city-driving/constants";

type CityDrivingSceneProps = {
  vehicleId?: CityDrivingVehicleId;
};

export function CityDrivingScene({ vehicleId = "taxi" }: CityDrivingSceneProps) {
  const characterDebugHard = useCharacterDebugHard();
  const carRef = useRef<Group>(null);
  const pipCamRef = useRef<PerspectiveCamera | null>(null);
  const playerSpeedRef = useRef(0);
  const carRootY = vehicleId !== "gentleman" ? 0 : PLAYER_GENTLEMAN_CAR_ROOT_Y;

  const mapHalf = useMemo(() => computeMapHalf(), []);
  const trackTiles = useMemo(() => buildTrackTiles(), []);

  if (characterDebugHard === "hard") {
    return (
      <CityDrivingPlayerSpeedRefContext.Provider value={playerSpeedRef}>
        <color attach="background" args={["#ececec"]} />
        <CharacterHardDebugRig />
      </CityDrivingPlayerSpeedRefContext.Provider>
    );
  }

  return (
    <CityDrivingPlayerSpeedRefContext.Provider value={playerSpeedRef}>
      <color attach="background" args={[SCENE_BG]} />
      <fog attach="fog" args={[SCENE_FOG, 55, 165]} />

      <DayLighting />

      <Ground mapHalf={mapHalf} />

      <RacingTrack tiles={trackTiles} />

      <Grid
        infiniteGrid
        fadeDistance={70}
        fadeStrength={3}
        sectionColor="rgba(30,58,138,0.06)"
        cellColor="rgba(148,163,184,0.03)"
        position={[0, 0.015, 0]}
        sectionSize={1}
        sectionThickness={0.85}
        cellSize={1}
      />

      <ContactShadows
        position={[0, 0.018, 0]}
        opacity={0.42}
        scale={mapHalf * 3.2}
        blur={2.4}
        far={26}
        color="#1e293b"
      />

      <group ref={carRef} position={[3.5, carRootY, 5]}>
        <PlayerVehicle key={vehicleId} vehicleId={vehicleId} />
        <perspectiveCamera
          ref={pipCamRef}
          position={PIP_CAM_LOCAL_POS}
          rotation={PIP_CAM_LOCAL_ROT}
          fov={PIP_CAM_FOV}
          near={PIP_CAM_NEAR}
          far={PIP_CAM_FAR}
        />
      </group>
      <VehicleController
        carRef={carRef}
        mapHalf={mapHalf}
        playerSpeedRef={playerSpeedRef}
      />
      <IsometricFollowCamera target={carRef} />
      <HoodViewportPass pipCameraRef={pipCamRef} />
    </CityDrivingPlayerSpeedRefContext.Provider>
  );
}

useGLTF.preload(KENNEY_SEDAN_GLB);
useGLTF.preload(MESHY_AI_JEEP_GLB);
useGLTF.preload(MESHY_GENTLEMAN_GLB);
for (const u of KENNEY_STARTER_RACING_PRELOAD_URLS) {
  useGLTF.preload(u);
}
