import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useEffect, useMemo, useRef, type RefObject } from "react";
import type { Group } from "three";
import {
  AnimationMixer,
  Box3,
  Vector3,
  type AnimationAction,
} from "three";

import {
  destroyWheelInput,
  getWheelInput,
  initWheelInput,
} from "../../input/WheelInputRaw.js";
import {
  CITY_DRIVING_VEHICLE_PRESETS,
  MESHY_GENTLEMAN_WALK_CLIP_NAME,
  type CityDrivingVehicleId,
} from "./constants";
import {
  prepareMeshyCharacterScene,
  updateSkinnedBoundsHints,
} from "./meshy-character-gltf";
import { useCityDrivingPlayerSpeedRef } from "./player-speed-context";

/** Горизонтальный «вперёд» машины; для Meshy Taxi при yaw меша π/2 нужна инверсия относительно (−sin, −cos). */
function horizontalForwardFromYaw(yaw: number, out: Vector3) {
  return out.set(Math.sin(yaw), 0, Math.cos(yaw));
}

function steeringCurve(x: number) {
  return Math.sign(x) * Math.pow(Math.abs(x), 1.5);
}

/** Ниже — «стоит»; пауза на первом кадре ходьбы. */
const STANDSTILL_SPEED_EPS = 0.12;

export function PlayerVehicle({ vehicleId }: { vehicleId: CityDrivingVehicleId }) {
  const preset = CITY_DRIVING_VEHICLE_PRESETS[vehicleId];
  const { scene, animations } = useGLTF(preset.glb);
  const cloned = useMemo(() => {
    const c = scene.clone(true);
    if (vehicleId === "gentleman") {
      prepareMeshyCharacterScene(c);
      updateSkinnedBoundsHints(c);
    }
    return c;
  }, [scene, vehicleId]);

  const speedRef = useCityDrivingPlayerSpeedRef();

  const liftY = useMemo(() => {
    cloned.updateWorldMatrix(false, true);
    if (vehicleId === "gentleman") updateSkinnedBoundsHints(cloned);
    const box = new Box3().setFromObject(cloned);
    const bottom = box.min.y * preset.scale;
    return Number.isFinite(bottom) ? -bottom + preset.groundClear : preset.groundClear;
  }, [cloned, preset.groundClear, preset.scale, vehicleId]);

  const mixerRef = useRef<AnimationMixer | null>(null);
  const actionRef = useRef<AnimationAction | null>(null);

  useEffect(() => {
    if (vehicleId !== "gentleman" || animations.length === 0) return;
    const mixer = new AnimationMixer(cloned);
    mixerRef.current = mixer;
    const clip =
      animations.find((c) => c.name === MESHY_GENTLEMAN_WALK_CLIP_NAME) ??
      animations[0]!;
    const action = mixer.clipAction(clip);
    action.play();
    actionRef.current = action;
    return () => {
      action.stop();
      mixer.stopAllAction();
      mixerRef.current = null;
      actionRef.current = null;
    };
  }, [vehicleId, cloned, animations]);

  useFrame((_, delta) => {
    mixerRef.current?.update(delta);
    if (vehicleId !== "gentleman") return;
    const action = actionRef.current;
    if (!action) return;
    const speed = Math.abs(speedRef?.current ?? 0);
    if (speed < STANDSTILL_SPEED_EPS) {
      action.paused = false;
      action.setEffectiveTimeScale(0);
    } else {
      action.paused = false;
      action.setEffectiveTimeScale(Math.max(0.2, Math.min(1.75, speed / 12)));
    }
  });

  return (
    <group position={[0, liftY, 0]}>
      <group rotation={[0, preset.meshYaw, 0]}>
        <primitive object={cloned} scale={preset.scale} />
      </group>
    </group>
  );
}

export function KenneySedan() {
  return <PlayerVehicle vehicleId="taxi" />;
}

export function VehicleController({
  carRef,
  mapHalf,
  playerSpeedRef,
}: {
  carRef: RefObject<Group | null>;
  mapHalf: number;
  /** Скорость для анимации персонажа (|v| по миру). */
  playerSpeedRef?: RefObject<number>;
}) {
  const fwd = useMemo(() => new Vector3(), []);
  const right = useMemo(() => new Vector3(), []);
  const tempForward = useMemo(() => new Vector3(), []);
  const tempRight = useMemo(() => new Vector3(), []);
  const velocityRef = useRef(new Vector3());
  const speedRef = useRef(0);
  const headingRef = useRef(0);
  const steerAngleRef = useRef(0);
  const throttleSmoothedRef = useRef(0);
  const initializedRef = useRef(false);
  const forwardSign = 1;

  useEffect(() => {
    const debug =
      typeof window !== "undefined" &&
      new URLSearchParams(window.location.search).has("wheeldebug");

    initWheelInput({
      deadzone: 0.08,
      steerAxis: 0,
      throttleAxis: 2,
      brakeAxis: 5,
      clutchAxis: 2,
      autoMapAxes: false,
      debug,
    });
    return () => destroyWheelInput();
  }, []);

  useFrame((_, delta) => {
    const car = carRef.current;
    if (!car) return;
    if (!initializedRef.current) {
      headingRef.current = car.rotation.y;
      initializedRef.current = true;
    }

    const dt = Math.min(Math.max(delta, 0), 0.033);
    const input = getWheelInput();
    const maxSteer = 1.0;
    /** ×2: меньше физического поворота руля до того же эффекта; clamp ниже держит tan(steer) в безопасном диапазоне. */
    const steerScale = 2.0;
    const steerInput = steeringCurve(-input.steer) * steerScale;
    const speedFactor = 1 - Math.min(Math.abs(speedRef.current) / 20, 0.7);
    const targetSteer = Math.max(
      -maxSteer,
      Math.min(maxSteer, steerInput * maxSteer * speedFactor),
    );
    steerAngleRef.current += (targetSteer - steerAngleRef.current) * 0.3;
    if (Math.abs(input.steer) < 0.01) {
      steerAngleRef.current *= 0.9;
    }

    const throttle = input.throttle ?? 0;
    throttleSmoothedRef.current += (throttle - throttleSmoothedRef.current) * 0.1;

    let v = speedRef.current;
    const enginePower = 1 - Math.min(Math.abs(v) / 30, 0.7);
    v += throttleSmoothedRef.current * 18 * enginePower * dt;
    const brakePowerFactor = 1 + Math.abs(v) * 0.3;
    v -= input.brake * 20 * brakePowerFactor * dt;
    const rolling = 0.5;
    if (throttleSmoothedRef.current === 0) {
      v -= Math.sign(v) * rolling * dt;
    }
    if (Math.abs(v) < 1 && throttleSmoothedRef.current > 0) {
      v += 6 * dt;
    }
    v -= v * 1.4 * dt;
    if (Math.abs(v) < 0.12 && throttleSmoothedRef.current === 0 && (input.brake ?? 0) === 0) {
      v = 0;
    }
    const maxSpeed = 45;
    const maxReverseSpeed = -2;
    v = Math.max(maxReverseSpeed, Math.min(maxSpeed, v));
    if (Math.abs(v) < 0.01) v = 0;
    speedRef.current = v;
    if (playerSpeedRef) {
      playerSpeedRef.current = Math.abs(v);
    }

    const wheelBase = 2.5;
    const grip = 1 - Math.min(Math.abs(v) / 25, 0.6);
    let yawRate = v !== 0 ? (v / wheelBase) * Math.tan(steerAngleRef.current) * grip : 0;
    if (Math.abs(v) < 0.12) {
      yawRate = 0;
    }
    headingRef.current += yawRate * dt;
    car.rotation.y = headingRef.current;

    horizontalForwardFromYaw(headingRef.current, fwd);
    right.set(Math.cos(headingRef.current), 0, -Math.sin(headingRef.current));
    const targetVelocity = fwd.clone().multiplyScalar(v * forwardSign);
    const t = 1 - Math.exp(-dt * 8);
    velocityRef.current.lerp(targetVelocity, t);

    const forwardVel = fwd.dot(velocityRef.current);
    const sideVel = right.dot(velocityRef.current);
    const sideFriction = 0.85;
    tempForward.copy(fwd).multiplyScalar(forwardVel);
    tempRight.copy(right).multiplyScalar(sideVel * sideFriction);
    velocityRef.current.copy(tempForward).add(tempRight);

    car.position.addScaledVector(velocityRef.current, dt);

    car.position.x = Math.max(-mapHalf, Math.min(mapHalf, car.position.x));
    car.position.z = Math.max(-mapHalf, Math.min(mapHalf, car.position.z));
  });

  return null;
}
