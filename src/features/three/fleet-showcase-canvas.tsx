"use client";

import {
  Environment,
  Lightformer,
  OrthographicCamera as DreiOrthographicCamera,
  useCursor,
  useGLTF,
  useProgress,
} from "@react-three/drei";
import { Canvas, useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import { Suspense, useMemo, useRef, useState } from "react";
import { Box3, Group, MathUtils, Mesh, MeshStandardMaterial, Vector3 } from "three";

type FleetModel = {
  modelUrl: string;
  motionModelUrl: string;
};

type FleetShowcaseCanvasProps = {
  models: readonly FleetModel[];
  activeIndex: number;
};

const positions = [-5.25, -1.75, 1.75, 5.25] as const;
const rotations = [-0.48, -0.32, -0.4, -0.28] as const;

function ResponsiveCamera({ single = false }: { single?: boolean }) {
  const { size } = useThree();
  const zoom = single
    ? Math.min(108, Math.max(24, size.width / 3.45))
    : Math.min(105, Math.max(25, size.width / 13.8));

  return (
    <DreiOrthographicCamera
      makeDefault
      position={[0, 4.4, 11]}
      rotation={[-0.482, 0, 0]}
      zoom={zoom}
      near={0.1}
      far={100}
    />
  );
}

function FleetCar({
  modelUrl,
  motionModelUrl,
  index,
  active,
  standalone = false,
}: {
  modelUrl: string;
  motionModelUrl: string;
  index: number;
  active: boolean;
  standalone?: boolean;
}) {
  const { scene: hqScene } = useGLTF(modelUrl);
  const { scene: motionScene } = useGLTF(motionModelUrl);
  const { invalidate } = useThree();
  const groupRef = useRef<Group>(null);
  const dragRef = useRef<{ pointerId: number; clientX: number; clientY: number } | null>(null);
  const targetRotationRef = useRef(rotations[index] ?? -0.35);
  const targetTiltRef = useRef(0.04);
  const velocityRef = useRef({ x: 0, y: 0 });
  const motionModeRef = useRef(false);
  const [hovered, setHovered] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [motionMode, setMotionMode] = useState(false);
  useCursor(hovered, dragging ? "grabbing" : "grab");

  const hqModel = useMemo(() => {
    const clone = hqScene.clone(true);
    const bounds = new Box3().setFromObject(clone);
    const size = bounds.getSize(new Vector3());
    const center = bounds.getCenter(new Vector3());
    const maxAxis = Math.max(size.x, size.y, size.z) || 1;
    const scale = 2.65 / maxAxis;

    clone.position.set(-center.x * scale, -bounds.min.y * scale, -center.z * scale);
    clone.scale.setScalar(scale);
    clone.traverse((object) => {
      if (!(object instanceof Mesh)) return;
      const materials = Array.isArray(object.material) ? object.material : [object.material];
      for (const material of materials) {
        if (!(material instanceof MeshStandardMaterial)) continue;
        material.roughness = Math.min(material.roughness, 0.58);
        material.metalness = Math.max(material.metalness, 0.08);
        material.envMapIntensity = 1.35;
        material.needsUpdate = true;
      }
    });
    return clone;
  }, [hqScene]);

  const motionModel = useMemo(() => {
    const clone = motionScene.clone(true);
    const bounds = new Box3().setFromObject(clone);
    const size = bounds.getSize(new Vector3());
    const center = bounds.getCenter(new Vector3());
    const maxAxis = Math.max(size.x, size.y, size.z) || 1;
    const scale = 2.65 / maxAxis;
    let hqMaterial: MeshStandardMaterial | null = null;

    hqModel.traverse((object) => {
      if (hqMaterial || !(object instanceof Mesh)) return;
      const candidate = Array.isArray(object.material) ? object.material[0] : object.material;
      if (candidate instanceof MeshStandardMaterial) hqMaterial = candidate;
    });

    clone.position.set(-center.x * scale, -bounds.min.y * scale, -center.z * scale);
    clone.scale.setScalar(scale);
    clone.traverse((object) => {
      if (!(object instanceof Mesh) || !hqMaterial) return;
      object.material = hqMaterial;
    });
    return clone;
  }, [hqModel, motionScene]);

  const changeMotionMode = (nextMode: boolean) => {
    if (motionModeRef.current === nextMode) return;
    motionModeRef.current = nextMode;
    setMotionMode(nextMode);
  };

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (!group) return;
    if (!dragRef.current) {
      targetRotationRef.current += velocityRef.current.y * delta * 60;
      targetTiltRef.current = MathUtils.clamp(
        targetTiltRef.current + velocityRef.current.x * delta * 60,
        -0.18,
        0.32,
      );
      const friction = Math.pow(0.94, delta * 60);
      velocityRef.current.x *= friction;
      velocityRef.current.y *= friction;
    }
    group.rotation.y = MathUtils.damp(group.rotation.y, targetRotationRef.current, 24, delta);
    group.rotation.x = MathUtils.damp(group.rotation.x, targetTiltRef.current, 20, delta);

    const isMoving =
      Boolean(dragRef.current) ||
      Math.abs(velocityRef.current.x) > 0.0001 ||
      Math.abs(velocityRef.current.y) > 0.0001 ||
      Math.abs(group.rotation.y - targetRotationRef.current) > 0.0005 ||
      Math.abs(group.rotation.x - targetTiltRef.current) > 0.0005;
    if (isMoving) {
      invalidate();
    } else if (motionModeRef.current) {
      changeMotionMode(false);
      invalidate();
    }
  });

  const handlePointerDown = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    (event.target as Element | null)?.setPointerCapture(event.pointerId);
    dragRef.current = {
      pointerId: event.pointerId,
      clientX: event.clientX,
      clientY: event.clientY,
    };
    velocityRef.current = { x: 0, y: 0 };
    changeMotionMode(true);
    setDragging(true);
    invalidate();
    setHovered(true);
  };

  const handlePointerMove = (event: ThreeEvent<PointerEvent>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    event.stopPropagation();
    const deltaX = event.clientX - drag.clientX;
    const deltaY = event.clientY - drag.clientY;
    drag.clientX = event.clientX;
    drag.clientY = event.clientY;
    targetRotationRef.current += deltaX * 0.014;
    targetTiltRef.current = MathUtils.clamp(
      targetTiltRef.current + deltaY * 0.0045,
      -0.18,
      0.32,
    );
    velocityRef.current = { x: deltaY * 0.0008, y: deltaX * 0.0028 };
    invalidate();
  };

  const handlePointerUp = (event: ThreeEvent<PointerEvent>) => {
    if (dragRef.current?.pointerId !== event.pointerId) return;
    event.stopPropagation();
    (event.target as Element | null)?.releasePointerCapture(event.pointerId);
    dragRef.current = null;
    setDragging(false);
    invalidate();
  };

  return (
    <group
      ref={groupRef}
      position={[standalone ? 0 : positions[index] ?? 0, active ? -3.05 : -3.18, 0]}
      rotation={[0.04, rotations[index] ?? -0.35, 0]}
      scale={active ? 1.08 : 1}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onPointerOver={(event) => {
        event.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => {
        if (!dragRef.current) setHovered(false);
      }}
    >
      <primitive object={hqModel} visible={!motionMode} />
      <primitive object={motionModel} visible={motionMode} />
    </group>
  );
}

function FleetLoadingState() {
  const { active, progress } = useProgress();
  if (!active) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-10 grid place-items-center bg-[#f7f7f5]/90 backdrop-blur-sm">
      <div className="w-44 text-center">
        <div className="h-px overflow-hidden bg-black/15">
          <div
            className="h-full bg-[#ef5a16] transition-[width] duration-200"
            style={{ width: `${Math.max(4, progress)}%` }}
          />
        </div>
        <p className="mt-3 font-mono text-[9px] font-bold tracking-[0.18em] text-black/45 uppercase">
          Загрузка коллекции · {Math.round(progress)}%
        </p>
      </div>
    </div>
  );
}

function CarViewport({
  model,
  index,
  active,
}: {
  model: FleetModel;
  index: number;
  active: boolean;
}) {
  return (
    <div className="relative min-w-0 border-r border-black/10 last:border-r-0">
      <Canvas
        orthographic
        frameloop="demand"
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ touchAction: "none" }}
      >
        <ResponsiveCamera single />
        <ambientLight intensity={2} />
        <directionalLight position={[3, 8, 6]} intensity={3.6} />
        <directionalLight position={[-5, 3, 2]} intensity={1.6} />
        <Environment resolution={64} frames={1}>
          <Lightformer form="rect" intensity={4.5} position={[0, 7, -5]} scale={[12, 3, 1]} />
          <Lightformer form="rect" intensity={3} position={[-7, 2, 2]} rotation={[0, Math.PI / 2, 0]} scale={[7, 2, 1]} />
          <Lightformer form="rect" intensity={2.5} position={[7, 1, 1]} rotation={[0, -Math.PI / 2, 0]} scale={[6, 2, 1]} />
        </Environment>
        <Suspense fallback={null}>
          <FleetCar
            modelUrl={model.modelUrl}
            motionModelUrl={model.motionModelUrl}
            index={index}
            active={active}
            standalone
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

export function FleetShowcaseCanvas({ models, activeIndex }: FleetShowcaseCanvasProps) {
  return (
    <div className="absolute inset-0 h-full w-full" aria-label="Коллекция из четырёх моделей Pilot">
      <FleetLoadingState />
      <div className="pointer-events-none absolute inset-x-[5%] bottom-[18%] h-[12%] rounded-[50%] bg-black/15 blur-2xl" />
      <div className="absolute inset-0 grid grid-cols-4">
        {models.map((model, index) => (
          <CarViewport
            key={model.modelUrl}
            model={model}
            index={index}
            active={index === activeIndex}
          />
        ))}
      </div>
    </div>
  );
}
