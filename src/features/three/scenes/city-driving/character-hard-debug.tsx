"use client";

import { PerspectiveCamera, useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import type { Group, Object3D } from "three";
import {
  AxesHelper,
  Bone,
  Box3,
  Box3Helper,
  BoxHelper,
  DoubleSide,
  Mesh,
  MeshBasicMaterial,
  SkeletonHelper,
  SkinnedMesh,
  Vector3,
  type WebGLRenderer,
} from "three";
import * as SkeletonUtils from "three/addons/utils/SkeletonUtils.js";

import { MESHY_GENTLEMAN_GLB } from "./constants";

const ROOT_POS: [number, number, number] = [0, 2, 0];
const CAM_POS: [number, number, number] = [0, 2.5, 5];
const LOOK = new Vector3(0, 2, 0);

/** Порог: root bbox считаем «почти нулевым». */
const BBOX_SIZE_EPS = 1e-4;

function applyHotpinkBasic(root: Object3D) {
  root.traverse((obj) => {
    if (obj instanceof Mesh) {
      obj.visible = true;
      obj.frustumCulled = false;
      const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
      const next = mats.map(
        () =>
          new MeshBasicMaterial({
            color: "hotpink",
            wireframe: false,
            side: DoubleSide,
          }),
      );
      obj.material = next.length === 1 ? next[0]! : next;
    }
  });
}

function matrixWorldBrief(m: Object3D): string {
  const e = m.matrixWorld.elements;
  return `[${e[0].toFixed(3)},${e[1].toFixed(3)},${e[2].toFixed(3)},… ${e[12].toFixed(3)},${e[13].toFixed(3)},${e[14].toFixed(3)}]`;
}

function logPerMeshWorldBboxes(root: Group) {
  const box = new Box3();
  const size = new Vector3();
  const center = new Vector3();

  console.groupCollapsed(
    "[characterdebug=hard] F.3 per-mesh world bbox (fallback — root пустой/микроскопический)",
  );
  root.updateWorldMatrix(true, true);
  root.traverse((obj) => {
    if (!(obj instanceof Mesh)) return;
    obj.updateWorldMatrix(true, false);
    box.setFromObject(obj);
    box.getSize(size);
    box.getCenter(center);
    const ok = !box.isEmpty() && size.length() > BBOX_SIZE_EPS;
    if (ok) {
      console.log({
        name: obj.name || "(unnamed)",
        uuid: obj.uuid,
        type: obj.type,
        meshWorldBboxMin: box.min.toArray(),
        meshWorldBboxMax: box.max.toArray(),
        meshWorldBboxSize: size.toArray(),
        meshWorldBboxCenter: center.toArray(),
      });
    }
  });
  console.groupEnd();
}

function findFirstSkinnedMesh(root: Group): SkinnedMesh | null {
  let found: SkinnedMesh | null = null;
  root.traverse((o) => {
    if (!found && o instanceof SkinnedMesh) found = o;
  });
  return found;
}

function findFirstPlainMesh(root: Group): Mesh | null {
  let found: Mesh | null = null;
  root.traverse((o) => {
    if (!found && o instanceof Mesh && !(o instanceof SkinnedMesh)) found = o;
  });
  return found;
}

function logUltraHard(root: Group) {
  root.updateWorldMatrix(true, true);

  let object3dCount = 0;
  let meshCount = 0;
  let skinnedMeshCount = 0;
  let boneCount = 0;

  root.traverse((o) => {
    object3dCount++;
    if (o instanceof Bone) boneCount++;
    if (o instanceof SkinnedMesh) skinnedMeshCount++;
    else if (o instanceof Mesh) meshCount++;
  });

  console.groupCollapsed("[characterdebug=hard] F.0 ultra-hard counts");
  console.log("total Object3D count:", object3dCount);
  console.log("Mesh count (только не-SkinnedMesh):", meshCount);
  console.log("SkinnedMesh count:", skinnedMeshCount);
  console.log(
    "Mesh всего (SkinnedMesh + не-скин):",
    meshCount + skinnedMeshCount,
  );
  console.log("Bone count (traverse Bone):", boneCount);
  console.groupEnd();

  const wp = new Vector3();
  const ws = new Vector3();
  const firstSkinned = findFirstSkinnedMesh(root);
  const firstPlainMesh = findFirstPlainMesh(root);

  console.groupCollapsed("[characterdebug=hard] F.1 each Mesh / SkinnedMesh");
  root.traverse((obj) => {
    if (!(obj instanceof Mesh)) return;

    obj.updateWorldMatrix(true, false);
    obj.getWorldPosition(wp);
    obj.getWorldScale(ws);
    const geom = obj.geometry;
    if (!geom.boundingBox) geom.computeBoundingBox();
    const posCount = geom.attributes.position?.count ?? 0;
    const idxCount = geom.index?.count ?? 0;

    console.log({
      name: obj.name || "(unnamed)",
      uuid: obj.uuid,
      parentName: obj.parent?.name ?? "(null)",
      type: obj.type,
      visible: obj.visible,
      positionCount: posCount,
      indexCount: idxCount,
      boundingBox: geom.boundingBox
        ? {
            min: geom.boundingBox.min.toArray(),
            max: geom.boundingBox.max.toArray(),
          }
        : null,
      matrixWorldBrief: matrixWorldBrief(obj),
      matrixWorldElements: [...obj.matrixWorld.elements],
      worldPosition: wp.toArray(),
      worldScale: ws.toArray(),
    });
  });
  console.groupEnd();

  console.groupCollapsed("[characterdebug=hard] F.2 first SkinnedMesh / first Mesh");
  if (firstSkinned) {
    const sk = firstSkinned;
    const skel = sk.skeleton;
    console.log("FIRST SkinnedMesh:", sk.name || "(unnamed)", sk.uuid);
    console.log("skeleton.bones.length:", skel.bones.length);
    const rootBone = skel.bones[0];
    console.log("skeleton.bones[0] (root candidate) name:", rootBone?.name ?? "(none)");
    console.log("bindMatrix:", sk.bindMatrix.elements.slice());
    console.log("bindMatrixInverse:", sk.bindMatrixInverse.elements.slice());
    console.log("(pose() не вызывался)");
  } else {
    console.log("FIRST SkinnedMesh: не найден");
  }
  if (firstPlainMesh) {
    console.log(
      "FIRST обычный Mesh:",
      firstPlainMesh.name || "(unnamed)",
      firstPlainMesh.uuid,
    );
  } else {
    console.log("FIRST обычный Mesh: не найден");
  }
  console.groupEnd();

  const worldBox = new Box3().setFromObject(root);
  const wsize = new Vector3();
  worldBox.getSize(wsize);
  const rootBboxBad =
    worldBox.isEmpty() || wsize.length() < BBOX_SIZE_EPS;

  if (rootBboxBad) {
    logPerMeshWorldBboxes(root);
  } else {
    console.log(
      "[characterdebug=hard] F.3 skip per-mesh bbox fallback — root world bbox не пустой (size OK)",
    );
  }
}

function logHardDebug(root: Group, gl: WebGLRenderer) {
  const wp = new Vector3();
  const ws = new Vector3();

  console.groupCollapsed("[characterdebug=hard] A. root");
  console.log("name:", root.name);
  console.log("uuid:", root.uuid);
  console.log("position:", root.position.toArray());
  console.log("scale:", root.scale.toArray());
  console.log("rotation (euler):", root.rotation.toArray());
  console.log("children.length:", root.children.length);
  console.groupEnd();

  console.groupCollapsed("[characterdebug=hard] B. Mesh / SkinnedMesh (кратко)");
  root.updateWorldMatrix(true, true);
  root.traverse((obj) => {
    if (!(obj instanceof Mesh)) return;
    obj.updateWorldMatrix(true, false);
    obj.getWorldPosition(wp);
    obj.getWorldScale(ws);
    const geom = obj.geometry;
    if (!geom.boundingBox) geom.computeBoundingBox();
    const skinned = obj instanceof SkinnedMesh;
    console.log({
      type: obj.type,
      name: obj.name || "(unnamed)",
      parentName: obj.parent?.name ?? "(null)",
      visible: obj.visible,
      geometryUuid: geom.uuid,
      boundingBox: geom.boundingBox
        ? {
            min: geom.boundingBox.min.toArray(),
            max: geom.boundingBox.max.toArray(),
          }
        : null,
      worldPosition: wp.toArray(),
      worldScale: ws.toArray(),
      materialType: Array.isArray(obj.material)
        ? obj.material.map((m) => m.type)
        : obj.material.type,
      skeletonBones: skinned ? obj.skeleton.bones.length : undefined,
    });
    if (skinned) {
      const chainLog: Array<{
        name: string;
        type: string;
        pos: number[];
        scale: number[];
      }> = [];
      let chain: Object3D | null = obj;
      while (chain) {
        chainLog.push({
          name: chain.name || "(unnamed)",
          type: chain.type,
          pos: chain.position.toArray(),
          scale: chain.scale.toArray(),
        });
        if (chain === root) break;
        chain = chain.parent;
      }
      console.log(
        "[characterdebug=hard] D. parent chain (SkinnedMesh → root):",
        obj.name || "(unnamed)",
        chainLog,
      );
    }
  });
  console.groupEnd();

  const box = new Box3().setFromObject(root);
  const size = new Vector3();
  const center = new Vector3();
  box.getSize(size);
  box.getCenter(center);

  console.groupCollapsed("[characterdebug=hard] C. bounds");
  console.log("world bbox min:", box.min.toArray());
  console.log("world bbox max:", box.max.toArray());
  console.log("size:", size.toArray());
  console.log("center:", center.toArray());
  console.log("isEmpty:", box.isEmpty());
  console.groupEnd();
}

function logChecklist(root: Group) {
  let meshCount = 0;
  root.traverse((o) => {
    if (o instanceof Mesh) meshCount++;
  });
  const box = new Box3().setFromObject(root);
  const size = new Vector3();
  box.getSize(size);

  console.groupCollapsed("[characterdebug=hard] E. binary checklist");
  console.log("Mesh/SkinnedMesh count:", meshCount);
  console.log("world bbox.isEmpty:", box.isEmpty());
  console.log("world bbox size:", size.toArray());
  console.log(
    "Подсказка: если meshCount > 0, но size ≈ 0 — возможен «схлопнутый» скин без анимации или неверный clone.",
  );
  console.groupEnd();

  console.info(
    "[characterdebug=hard] Дальнейшие слои при НЕвидимости меша: проверить оси/helpers; затем по одному включать дорогу, анимацию, auto-fit/scaling, root offsets.",
  );
}

export function HardDebugCameraRig() {
  const camera = useThree((s) => s.camera);
  useFrame(() => {
    camera.position.set(CAM_POS[0], CAM_POS[1], CAM_POS[2]);
    camera.lookAt(LOOK);
  });
  return null;
}

export function CharacterHardDebugRig() {
  const rootRef = useRef<Group>(null);
  const worldBoxRef = useRef(new Box3());
  const blueCenterRef = useRef(new Vector3(0, 2, 0));
  const blueSphereRef = useRef<Mesh>(null);
  const { gl, scene } = useThree();
  const boxHelperRef = useRef<BoxHelper | null>(null);
  const { scene: gltfScene } = useGLTF(MESHY_GENTLEMAN_GLB);

  const cloned = useMemo(() => {
    const c = SkeletonUtils.clone(gltfScene) as Group;
    applyHotpinkBasic(c);
    return c;
  }, [gltfScene]);

  const allMeshes = useMemo(() => {
    const list: Mesh[] = [];
    cloned.traverse((o) => {
      if (o instanceof Mesh) list.push(o);
    });
    return list;
  }, [cloned]);

  const skinnedMeshes = useMemo(() => {
    const list: SkinnedMesh[] = [];
    cloned.traverse((o) => {
      if (o instanceof SkinnedMesh) list.push(o);
    });
    return list;
  }, [cloned]);

  const axes = useMemo(() => new AxesHelper(2), []);
  const skeletonHelpers = useMemo(
    () => skinnedMeshes.map((sm) => new SkeletonHelper(sm)),
    [skinnedMeshes],
  );

  const bbox3Helper = useMemo(
    () => new Box3Helper(worldBoxRef.current, 0x00ffff),
    [],
  );

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const bh = new BoxHelper(root, 0xffff00);
    boxHelperRef.current = bh;
    scene.add(bh);
    return () => {
      scene.remove(bh);
      boxHelperRef.current = null;
    };
  }, [scene, cloned]);

  useFrame(() => {
    boxHelperRef.current?.update();
    const root = rootRef.current;
    if (root) {
      worldBoxRef.current.setFromObject(root);
      bbox3Helper.box.copy(worldBoxRef.current);
      bbox3Helper.updateMatrixWorld(true);
      if (!worldBoxRef.current.isEmpty()) {
        worldBoxRef.current.getCenter(blueCenterRef.current);
        blueSphereRef.current?.position.copy(blueCenterRef.current);
      }
    }
  });

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    cloned.updateWorldMatrix(true, true);
    logHardDebug(root, gl);
    logUltraHard(root);
    logChecklist(root);
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        console.log("[characterdebug=hard] renderer.info (delayed frame)", {
          calls: gl.info.render.calls,
          triangles: gl.info.render.triangles,
          points: gl.info.render.points,
          lines: gl.info.render.lines,
          geometries: gl.info.memory.geometries,
          textures: gl.info.memory.textures,
        });
      });
    });
    return () => cancelAnimationFrame(id);
  }, [cloned, gl]);

  return (
    <>
      <PerspectiveCamera makeDefault position={CAM_POS} near={0.05} far={260} fov={52} />
      <HardDebugCameraRig />
      <ambientLight intensity={1} />
      <group ref={rootRef} position={ROOT_POS} rotation={[0, 0, 0]} scale={[1, 1, 1]}>
        <primitive object={cloned} />
        <primitive object={axes} />
        {skeletonHelpers.map((h, i) => (
          <primitive key={i} object={h} />
        ))}
      </group>
      <mesh ref={blueSphereRef} renderOrder={1000}>
        <sphereGeometry args={[0.11, 18, 18]} />
        <meshBasicMaterial color="#0066ff" depthTest={false} depthWrite={false} />
      </mesh>
      <mesh position={[0, 2, 0]} renderOrder={1000}>
        <sphereGeometry args={[0.11, 18, 18]} />
        <meshBasicMaterial color="#00ff00" depthTest={false} depthWrite={false} />
      </mesh>
      {allMeshes.map((meshObj) => (
        <WhiteSphereMarker key={meshObj.uuid} sourceMesh={meshObj} />
      ))}
      <primitive object={bbox3Helper} />
    </>
  );
}

function WhiteSphereMarker({ sourceMesh }: { sourceMesh: Mesh }) {
  const ref = useRef<Mesh>(null);
  const tmp = useMemo(() => new Vector3(), []);
  useFrame(() => {
    if (!ref.current) return;
    sourceMesh.getWorldPosition(tmp);
    ref.current.position.copy(tmp);
  });
  return (
    <mesh ref={ref} renderOrder={1000}>
      <sphereGeometry args={[0.065, 12, 12]} />
      <meshBasicMaterial color="#ffffff" depthTest={false} depthWrite={false} />
    </mesh>
  );
}
