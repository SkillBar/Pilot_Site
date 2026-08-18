/**
 * HDR Environment + Sky — качество отражений на машине и трассе (preset «city» из drei).
 */

import { Environment, Sky } from "@react-three/drei";

export function DayLighting() {
  return (
    <>
      <Sky
        distance={450000}
        mieCoefficient={0.0048}
        rayleigh={0.55}
        turbidity={4}
        sunPosition={[140, 62, 85]}
      />

      <Environment preset="city" environmentIntensity={0.48} />

      <hemisphereLight color="#cfe3ff" groundColor="#6b5c4d" intensity={0.52} />
      <ambientLight intensity={0.22} color="#eef4ff" />

      <directionalLight
        castShadow
        position={[85, 112, 48]}
        intensity={1.68}
        color="#fff7ed"
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={260}
        shadow-camera-near={3}
        shadow-camera-left={-95}
        shadow-camera-right={95}
        shadow-camera-top={95}
        shadow-camera-bottom={-95}
        shadow-bias={-0.00028}
        shadow-normalBias={0.028}
      />
    </>
  );
}
