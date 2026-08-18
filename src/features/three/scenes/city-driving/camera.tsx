import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, type RefObject } from "react";
import type { Group } from "three";
import { Vector3 } from "three";
import { ISO_DISTANCE, ISO_OFFSET } from "./constants";

export function IsometricFollowCamera({ target }: { target: RefObject<Group | null> }) {
  const { camera } = useThree();
  const focus = useMemo(() => new Vector3(), []);
  const desired = useMemo(() => new Vector3(), []);

  useFrame(() => {
    const t = target.current;
    if (!t) return;
    t.getWorldPosition(focus);
    desired.copy(focus).addScaledVector(ISO_OFFSET, ISO_DISTANCE);
    camera.position.lerp(desired, 0.14);
    camera.lookAt(focus.x, focus.y + 0.45, focus.z);
  });

  return null;
}
