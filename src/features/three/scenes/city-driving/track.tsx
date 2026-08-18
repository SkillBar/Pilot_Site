import { useGLTF } from "@react-three/drei";
import { useMemo } from "react";
import type { Mesh } from "three";
import type { TrackTile } from "./grid-map";

function KenneyGlbProp({
  url,
  position,
  quat,
  scale,
  yLift = 0,
}: {
  url: string;
  position: [number, number, number];
  quat: TrackTile["quat"];
  scale: number;
  yLift?: number;
}) {
  const { scene } = useGLTF(url);

  const root = useMemo(() => {
    const c = scene.clone(true);
    c.traverse((obj) => {
      const m = obj as Mesh;
      if (m.isMesh) {
        m.castShadow = true;
        m.receiveShadow = true;
      }
    });
    return c;
  }, [scene]);

  const pos: [number, number, number] = [
    position[0],
    position[1] + yLift,
    position[2],
  ];

  return (
    <group position={pos} quaternion={quat}>
      <primitive object={root} scale={scale} />
    </group>
  );
}

export function RacingTrack({ tiles }: { tiles: TrackTile[] }) {
  return (
    <>
      {tiles.map((t) => (
        <KenneyGlbProp
          key={t.key}
          url={t.url}
          position={t.position}
          quat={t.quat}
          scale={t.scale}
        />
      ))}
    </>
  );
}
