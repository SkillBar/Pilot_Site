import type { Object3D } from "three";
import {
  DoubleSide,
  Material,
  Mesh,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  SkinnedMesh,
} from "three";

type AnyMat = Material & {
  map?: unknown;
  normalMap?: unknown;
  roughnessMap?: unknown;
  metalnessMap?: unknown;
  aoMap?: unknown;
  emissiveMap?: unknown;
  color?: { clone: () => unknown };
  emissive?: { clone: () => unknown };
  metalness?: number;
  roughness?: number;
  emissiveIntensity?: number;
  vertexColors?: boolean;
  alphaMap?: unknown;
  alphaTest?: number;
};

/**
 * Meshy glTF: ShaderMaterial / transmission / BLEND часто дают полностью прозрачный пиксель в WebGL.
 * Приводим к предсказуемому PBR и DoubleSide (скин часто с обратными нормалями в кадре).
 */
export function prepareMeshyCharacterScene(root: Object3D): void {
  root.traverse((obj) => {
    if (obj instanceof Mesh) {
      obj.visible = true;
      obj.frustumCulled = false;
      const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
      const out = mats.map((m) => sanitizeMeshyMaterial(m as AnyMat));
      obj.material = out.length === 1 ? out[0]! : out;
    }
  });
}

function sanitizeMeshyMaterial(m: AnyMat): MeshStandardMaterial | MeshPhysicalMaterial {
  if (m instanceof MeshPhysicalMaterial) {
    const mat = m.clone();
    mat.transmission = 0;
    mat.thickness = 0;
    mat.ior = 1.5;
    mat.transparent = false;
    mat.opacity = 1;
    mat.depthWrite = true;
    mat.depthTest = true;
    mat.side = DoubleSide;
    mat.alphaTest = 0;
    return mat;
  }
  if (m instanceof MeshStandardMaterial) {
    const mat = m.clone();
    mat.transparent = false;
    mat.opacity = 1;
    mat.depthWrite = true;
    mat.depthTest = true;
    mat.side = DoubleSide;
    mat.alphaTest = 0;
    return mat;
  }

  const std = new MeshStandardMaterial();
  if (m.map) std.map = m.map as MeshStandardMaterial["map"];
  if (m.normalMap) std.normalMap = m.normalMap as MeshStandardMaterial["normalMap"];
  if (m.roughnessMap)
    std.roughnessMap = m.roughnessMap as MeshStandardMaterial["roughnessMap"];
  if (m.metalnessMap)
    std.metalnessMap = m.metalnessMap as MeshStandardMaterial["metalnessMap"];
  if (m.aoMap) std.aoMap = m.aoMap as MeshStandardMaterial["aoMap"];
  if (m.emissiveMap) std.emissiveMap = m.emissiveMap as MeshStandardMaterial["emissiveMap"];
  if (m.color && typeof (m.color as { clone?: () => unknown }).clone === "function") {
    std.color.copy(m.color as MeshStandardMaterial["color"]);
  } else if (
    m.emissive &&
    typeof (m.emissive as { clone?: () => unknown }).clone === "function"
  ) {
    std.color.copy(m.emissive as MeshStandardMaterial["color"]);
  } else {
    std.color.setHex(0xc4a882);
  }
  if (typeof m.metalness === "number") std.metalness = m.metalness;
  else std.metalness = 0.15;
  if (typeof m.roughness === "number") std.roughness = m.roughness;
  else std.roughness = 0.75;
  if (typeof m.emissiveIntensity === "number")
    std.emissiveIntensity = m.emissiveIntensity;
  if (m.vertexColors) std.vertexColors = true;
  std.transparent = false;
  std.opacity = 1;
  std.depthWrite = true;
  std.depthTest = true;
  std.side = DoubleSide;
  return std;
}

export function updateSkinnedBoundsHints(root: Object3D): void {
  root.traverse((o) => {
    if (o instanceof SkinnedMesh && o.skeleton) {
      o.skeleton.update();
    }
  });
}
