"use client";

import {
  Environment,
  Lightformer,
  OrthographicCamera as DreiOrthographicCamera,
  useGLTF,
  useProgress,
} from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type MutableRefObject,
  type PointerEvent,
} from "react";
import { Box3, Group, MathUtils, Mesh, MeshStandardMaterial, Vector3 } from "three";

type FleetModel = {
  modelUrl: string;
  motionModelUrl: string;
  label: string;
  displayName: string;
  visualYOffset: number;
};

type FleetShowcaseCanvasProps = {
  models: readonly FleetModel[];
  activeIndex: number;
  activeOnly?: boolean;
};

export function preloadFleetModels(models: readonly FleetModel[]) {
  for (const model of models) {
    useGLTF.preload(model.modelUrl);
  }
}

type FleetInteraction = {
  drag: {
    pointerId: number;
    clientX: number;
    clientY: number;
  } | null;
  targetRotation: number;
  targetTilt: number;
  velocity: { x: number; y: number };
  setMotionMode?: (enabled: boolean) => void;
};

const rotations = [-0.48, -0.32, -0.4, -0.28] as const;

function createInteraction(index: number): FleetInteraction {
  return {
    drag: null,
    targetRotation: rotations[index] ?? -0.35,
    targetTilt: 0.04,
    velocity: { x: 0, y: 0 },
  };
}

function ResponsiveCamera() {
  const { size } = useThree();
  const zoom = Math.min(108, Math.max(24, size.width / 3.45));

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

function normalizeModel(scene: Group) {
  const clone = scene.clone(true);
  const bounds = new Box3().setFromObject(clone);
  const size = bounds.getSize(new Vector3());
  const center = bounds.getCenter(new Vector3());
  const maxAxis = Math.max(size.x, size.y, size.z) || 1;
  const scale = 2.65 / maxAxis;

  clone.position.set(-center.x * scale, -bounds.min.y * scale, -center.z * scale);
  clone.scale.setScalar(scale);
  return clone;
}

function MotionModel({
  modelUrl,
  material,
  visible,
  onReady,
}: {
  modelUrl: string;
  material: MeshStandardMaterial | null;
  visible: boolean;
  onReady: () => void;
}) {
  const { scene } = useGLTF(modelUrl);
  const model = useMemo(() => {
    const clone = normalizeModel(scene);
    if (material) {
      clone.traverse((object) => {
        if (object instanceof Mesh) object.material = material;
      });
    }
    return clone;
  }, [material, scene]);

  useEffect(() => onReady(), [onReady]);
  return <primitive object={model} visible={visible} />;
}

function FleetCar({
  modelUrl,
  motionModelUrl,
  index,
  active,
  interactionRef,
  requestRenderRef,
  loadMotion,
  visualYOffset,
}: {
  modelUrl: string;
  motionModelUrl: string;
  index: number;
  active: boolean;
  interactionRef: MutableRefObject<FleetInteraction>;
  requestRenderRef: MutableRefObject<() => void>;
  loadMotion: boolean;
  visualYOffset: number;
}) {
  const { scene } = useGLTF(modelUrl);
  const { invalidate } = useThree();
  const groupRef = useRef<Group>(null);
  const [motionReady, setMotionReady] = useState(false);
  const [motionMode, setMotionMode] = useState(false);

  const idleModel = useMemo(() => {
    const clone = normalizeModel(scene);
    clone.traverse((object) => {
      if (!(object instanceof Mesh)) return;
      const materials = Array.isArray(object.material)
        ? object.material
        : [object.material];
      for (const material of materials) {
        if (!(material instanceof MeshStandardMaterial)) continue;
        material.roughness = Math.min(material.roughness, 0.58);
        material.metalness = Math.max(material.metalness, 0.08);
        material.envMapIntensity = 1.35;
        material.needsUpdate = true;
      }
    });
    return clone;
  }, [scene]);

  const sharedMaterial = useMemo(() => {
    let material: MeshStandardMaterial | null = null;
    idleModel.traverse((object) => {
      if (material || !(object instanceof Mesh)) return;
      const candidate = Array.isArray(object.material)
        ? object.material[0]
        : object.material;
      if (candidate instanceof MeshStandardMaterial) material = candidate;
    });
    return material;
  }, [idleModel]);

  useEffect(() => {
    const interaction = interactionRef.current;
    requestRenderRef.current = invalidate;
    interaction.setMotionMode = (enabled) => {
      setMotionMode(enabled && motionReady);
      invalidate();
    };
    return () => {
      requestRenderRef.current = () => undefined;
      interaction.setMotionMode = undefined;
    };
  }, [interactionRef, invalidate, motionReady, requestRenderRef]);

  useFrame((_, delta) => {
    const group = groupRef.current;
    const interaction = interactionRef.current;
    if (!group) return;

    if (!interaction.drag) {
      interaction.targetRotation += interaction.velocity.y * delta * 60;
      interaction.targetTilt = MathUtils.clamp(
        interaction.targetTilt + interaction.velocity.x * delta * 60,
        -0.18,
        0.32,
      );
      const friction = Math.pow(0.94, delta * 60);
      interaction.velocity.x *= friction;
      interaction.velocity.y *= friction;
    }

    group.rotation.y = MathUtils.damp(
      group.rotation.y,
      interaction.targetRotation,
      24,
      delta,
    );
    group.rotation.x = MathUtils.damp(
      group.rotation.x,
      interaction.targetTilt,
      20,
      delta,
    );

    const isMoving =
      Boolean(interaction.drag) ||
      Math.abs(interaction.velocity.x) > 0.0001 ||
      Math.abs(interaction.velocity.y) > 0.0001 ||
      Math.abs(group.rotation.y - interaction.targetRotation) > 0.0005 ||
      Math.abs(group.rotation.x - interaction.targetTilt) > 0.0005;

    if (isMoving) {
      invalidate();
    } else if (motionMode) {
      setMotionMode(false);
      invalidate();
    }
  });

  const showMotion = motionMode && motionReady;

  return (
    <group
      ref={groupRef}
      position={[
        0,
        (active ? -3.05 : -3.18) + visualYOffset,
        0,
      ]}
      rotation={[0.04, rotations[index] ?? -0.35, 0]}
      scale={active ? 1.08 : 1}
    >
      <primitive object={idleModel} visible={!showMotion} />
      {loadMotion ? (
        <Suspense fallback={null}>
          <MotionModel
            modelUrl={motionModelUrl}
            material={sharedMaterial}
            visible={showMotion}
            onReady={() => setMotionReady(true)}
          />
        </Suspense>
      ) : null}
    </group>
  );
}

function FleetLoadingState() {
  const { active, progress } = useProgress();
  if (!active) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-30 grid place-items-center bg-[#f7f7f5]/90 backdrop-blur-sm">
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
  compact,
}: {
  model: FleetModel;
  index: number;
  active: boolean;
  compact: boolean;
}) {
  const interactionRef = useRef<FleetInteraction>(createInteraction(index));
  const requestRenderRef = useRef<() => void>(() => undefined);
  const [dragging, setDragging] = useState(false);
  const [loadMotion, setLoadMotion] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoadMotion(true), 1200);
    return () => window.clearTimeout(timer);
  }, []);

  const handlePointerDown = (event: PointerEvent<HTMLButtonElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    const interaction = interactionRef.current;
    interaction.drag = {
      pointerId: event.pointerId,
      clientX: event.clientX,
      clientY: event.clientY,
    };
    interaction.velocity = { x: 0, y: 0 };
    setLoadMotion(true);
    interaction.setMotionMode?.(true);
    setDragging(true);
    requestRenderRef.current();
  };

  const handlePointerMove = (event: PointerEvent<HTMLButtonElement>) => {
    const interaction = interactionRef.current;
    const drag = interaction.drag;
    if (!drag || drag.pointerId !== event.pointerId) return;

    const deltaX = event.clientX - drag.clientX;
    const deltaY = event.clientY - drag.clientY;
    drag.clientX = event.clientX;
    drag.clientY = event.clientY;
    interaction.targetRotation += deltaX * 0.014;
    interaction.targetTilt = MathUtils.clamp(
      interaction.targetTilt + deltaY * 0.0045,
      -0.18,
      0.32,
    );
    interaction.velocity = { x: deltaY * 0.0008, y: deltaX * 0.0028 };
    requestRenderRef.current();
  };

  const handlePointerEnd = (event: PointerEvent<HTMLButtonElement>) => {
    const interaction = interactionRef.current;
    if (interaction.drag?.pointerId !== event.pointerId) return;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    interaction.drag = null;
    setDragging(false);
    requestRenderRef.current();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    interactionRef.current.targetRotation +=
      event.key === "ArrowLeft" ? -0.2 : 0.2;
    requestRenderRef.current();
  };

  return (
    <div className="relative min-w-0 border-r border-black/10 last:border-r-0">
      <Canvas
        orthographic
        frameloop="demand"
        dpr={compact ? 1 : [1, 1.5]}
        gl={{
          antialias: !compact,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <ResponsiveCamera />
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
            interactionRef={interactionRef}
            requestRenderRef={requestRenderRef}
            loadMotion={loadMotion}
            visualYOffset={model.visualYOffset}
          />
        </Suspense>
      </Canvas>
      <button
        type="button"
        aria-label={`Вращать модель ${model.displayName}: ${model.label}`}
        className={`absolute inset-0 z-20 touch-none bg-transparent focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#ef5a16] ${dragging ? "cursor-grabbing" : "cursor-grab"}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}

export function FleetShowcaseCanvas({
  models,
  activeIndex,
  activeOnly = false,
}: FleetShowcaseCanvasProps) {
  const visibleModels = activeOnly
    ? [[models[activeIndex], activeIndex] as const]
    : models.map((model, index) => [model, index] as const);

  return (
    <div className="absolute inset-0 h-full w-full" aria-label="Интерактивная коллекция моделей Pilot">
      <FleetLoadingState />
      <div className="pointer-events-none absolute inset-x-[5%] bottom-[18%] h-[12%] rounded-[50%] bg-black/15 blur-2xl" />
      <div className={`absolute inset-0 grid ${activeOnly ? "grid-cols-1" : "grid-cols-4"}`}>
        {visibleModels.map(([model, index]) =>
          model ? (
            <CarViewport
              key={`${model.modelUrl}-${activeOnly ? "single" : "grid"}`}
              model={model}
              index={index}
              active={index === activeIndex}
              compact={activeOnly}
            />
          ) : null,
        )}
      </div>
    </div>
  );
}
