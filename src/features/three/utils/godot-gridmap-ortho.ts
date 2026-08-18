import { Matrix3, Matrix4, Quaternion } from "three";

/** Godot GridMap `_ortho_bases[24]` → Three quaternion (Y-up). */
const BASIS_ROWS: readonly (readonly number[])[] = [
  [1, 0, 0, 0, 1, 0, 0, 0, 1],
  [0, -1, 0, 1, 0, 0, 0, 0, 1],
  [-1, 0, 0, 0, -1, 0, 0, 0, 1],
  [0, 1, 0, -1, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, -1, 0, 1, 0],
  [0, 0, 1, 1, 0, 0, 0, 1, 0],
  [-1, 0, 0, 0, 0, 1, 0, 1, 0],
  [0, 0, -1, -1, 0, 0, 0, 1, 0],
  [1, 0, 0, 0, -1, 0, 0, 0, -1],
  [0, 1, 0, 1, 0, 0, 0, 0, -1],
  [-1, 0, 0, 0, 1, 0, 0, 0, -1],
  [0, -1, 0, -1, 0, 0, 0, 0, -1],
  [1, 0, 0, 0, 0, 1, 0, -1, 0],
  [0, 0, -1, 1, 0, 0, 0, -1, 0],
  [-1, 0, 0, 0, 0, -1, 0, -1, 0],
  [0, 0, 1, -1, 0, 0, 0, -1, 0],
  [0, 0, 1, 0, 1, 0, -1, 0, 0],
  [0, -1, 0, 0, 0, 1, -1, 0, 0],
  [0, 0, -1, 0, -1, 0, -1, 0, 0],
  [0, 1, 0, 0, 0, -1, -1, 0, 0],
  [0, 0, 1, 0, -1, 0, 1, 0, 0],
  [0, 1, 0, 0, 0, 1, 1, 0, 0],
  [0, 0, -1, 0, 1, 0, 1, 0, 0],
  [0, -1, 0, 0, 0, -1, 1, 0, 0],
];

const MAT4: Matrix4[] = BASIS_ROWS.map((r) => {
  const m3 = new Matrix3().set(r[0]!, r[1]!, r[2]!, r[3]!, r[4]!, r[5]!, r[6]!, r[7]!, r[8]!);
  return new Matrix4().setFromMatrix3(m3);
});

const QUAT_CACHE: Quaternion[] = MAT4.map((m) => {
  const q = new Quaternion();
  q.setFromRotationMatrix(m);
  return q;
});

export function orthoIndexToQuaternion(index: number): Quaternion {
  const i = Math.max(0, Math.min(23, index | 0));
  return QUAT_CACHE[i]!.clone();
}
