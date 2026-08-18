"use client";

import { OrbitControls, useGLTF, useProgress } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Component, Suspense, useMemo, type ReactNode } from "react";
import { Box3, Group, Vector3 } from "three";

type ModelShowcaseCanvasProps = {
  modelUrl: string;
  label: string;
};

class ModelErrorBoundary extends Component<
  { children: ReactNode; label: string },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (this.state.failed) {
      return (
        <div className="absolute inset-0 z-20 grid place-items-center bg-[#ecece8] px-6 text-center">
          <p className="font-mono text-xs font-bold tracking-[0.16em] text-black/55 uppercase">
            Не удалось загрузить {this.props.label}
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}

function LoadingState() {
  const { active, progress } = useProgress();
  if (!active) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-10 grid place-items-center bg-[#f7f7f5]/85 backdrop-blur-sm">
      <div className="w-40 text-center">
        <div className="h-px overflow-hidden bg-black/15">
          <div
            className="h-full bg-[#ef5a16] transition-[width] duration-200"
            style={{ width: `${Math.max(4, progress)}%` }}
          />
        </div>
        <p className="mt-3 font-mono text-[9px] font-bold tracking-[0.18em] text-black/45 uppercase">
          Загрузка 3D · {Math.round(progress)}%
        </p>
      </div>
    </div>
  );
}

function NormalizedModel({ modelUrl }: { modelUrl: string }) {
  const { scene } = useGLTF(modelUrl);
  const model = useMemo(() => {
    const clone = scene.clone(true);
    const bounds = new Box3().setFromObject(clone);
    const size = bounds.getSize(new Vector3());
    const center = bounds.getCenter(new Vector3());
    const maxAxis = Math.max(size.x, size.y, size.z) || 1;
    const scale = 3.4 / maxAxis;

    clone.position.set(-center.x * scale, -bounds.min.y * scale - 0.72, -center.z * scale);
    clone.scale.setScalar(scale);
    clone.traverse((object) => {
      if ("castShadow" in object) object.castShadow = true;
      if ("receiveShadow" in object) object.receiveShadow = true;
    });

    return clone;
  }, [scene]);

  return (
    <group rotation={[0.04, -0.58, 0]}>
      <primitive object={model as Group} />
    </group>
  );
}

export function ModelShowcaseCanvas({ modelUrl, label }: ModelShowcaseCanvasProps) {
  return (
    <ModelErrorBoundary label={label}>
    <div className="relative h-full min-h-[300px] w-full" aria-label={label}>
      <LoadingState />
      <div className="absolute inset-x-[18%] bottom-[12%] h-[14%] rounded-[50%] bg-black/20 blur-xl" />
      <Canvas
        frameloop="demand"
        dpr={[1, 1.35]}
        camera={{ position: [4.5, 2.4, 5.8], fov: 31, near: 0.1, far: 100 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        performance={{ min: 0.6 }}
      >
        <ambientLight intensity={1.9} />
        <directionalLight position={[4, 7, 5]} intensity={3.5} />
        <directionalLight position={[-4, 3, -2]} intensity={1.6} />
        <Suspense fallback={null}>
          <NormalizedModel modelUrl={modelUrl} />
        </Suspense>
        <OrbitControls
          makeDefault
          enablePan={false}
          enableZoom={false}
          minPolarAngle={Math.PI / 3.2}
          maxPolarAngle={Math.PI / 2.15}
          target={[0, 0.15, 0]}
        />
      </Canvas>
    </div>
    </ModelErrorBoundary>
  );
}
