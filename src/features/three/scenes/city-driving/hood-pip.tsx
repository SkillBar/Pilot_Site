"use client";

/**
 * Компактный PiP снизу области карты (холста), по центру по горизонтали: FBO + quad со скруглением.
 * Перехват `gl.render` — только для основного pass (worldScene / mainCamera).
 */

import { useFBO } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useLayoutEffect, useMemo, type RefObject } from "react";
import {
  DataTexture,
  Mesh,
  MeshBasicMaterial,
  OrthographicCamera,
  PlaneGeometry,
  Scene,
  SRGBColorSpace,
  UnsignedByteType,
  Vector2,
  type Camera,
  type Object3D,
  type PerspectiveCamera,
  type WebGLRenderer,
} from "three";

import {
  HOOD_PIP_ASPECT,
  HOOD_PIP_CORNER_UV,
  HOOD_PIP_PADDING_CSS_PX,
  HOOD_PIP_VERTICAL_ALIGN,
  HOOD_PIP_WIDTH_FRAC,
} from "./constants";

type Props = {
  pipCameraRef: RefObject<PerspectiveCamera | null>;
};

const _buf = new Vector2();

function layoutHudQuad(mesh: Mesh, gl: WebGLRenderer) {
  gl.getDrawingBufferSize(_buf);
  const fullW = _buf.x;
  const fullH = _buf.y;
  const dpr = gl.getPixelRatio();
  const pipW = Math.max(72, Math.floor(fullW * HOOD_PIP_WIDTH_FRAC));
  const pipH = Math.floor(pipW / HOOD_PIP_ASPECT);
  const pad = HOOD_PIP_PADDING_CSS_PX * dpr;

  const leftPx = Math.floor((fullW - pipW) / 2);
  const bottomPx =
    HOOD_PIP_VERTICAL_ALIGN === "center"
      ? Math.floor((fullH - pipH) / 2)
      : Math.floor(pad);

  const ndcW = (pipW / fullW) * 2;
  const ndcH = (pipH / fullH) * 2;
  const cx = ((leftPx + pipW / 2) / fullW) * 2 - 1;
  const cy = ((bottomPx + pipH / 2) / fullH) * 2 - 1;

  mesh.scale.set(ndcW, ndcH, 1);
  mesh.position.set(cx, cy, 0);
}

export function HoodViewportPass({ pipCameraRef }: Props) {
  const { gl, scene: worldScene, camera: mainCamera } = useThree();

  /** 1×1 — чтобы с первой компиляции был USE_MAP и в шейдере был `vMapUv` (r184 не даёт `vUv` только при карте). */
  const mapPlaceholder = useMemo(() => {
    const tex = new DataTexture(new Uint8Array([255, 255, 255, 255]), 1, 1);
    tex.needsUpdate = true;
    return tex;
  }, []);

  const fboW = 1920;
  const fbo = useFBO(fboW, Math.round(fboW / HOOD_PIP_ASPECT), {
    depthBuffer: true,
    type: UnsignedByteType,
  });

  const hud = useMemo(() => {
    const hudScene = new Scene();
    const geo = new PlaneGeometry(1, 1);
    const mat = new MeshBasicMaterial({
      map: mapPlaceholder,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      toneMapped: false,
    });
    mat.onBeforeCompile = (shader) => {
      shader.uniforms.uPipCornerRadius = { value: HOOD_PIP_CORNER_UV };
      shader.fragmentShader = `uniform float uPipCornerRadius;\n${shader.fragmentShader}`;
      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <map_fragment>",
        `#include <map_fragment>
        #ifdef USE_MAP
        {
          vec2 _q = abs(vMapUv - 0.5) * 2.0;
          vec2 _h = vec2(1.0 - uPipCornerRadius * 2.0);
          float _d = length(max(_q - _h, vec2(0.0))) - uPipCornerRadius;
          diffuseColor.a *= 1.0 - smoothstep(-0.004, 0.005, _d);
        }
        #endif`,
      );
    };
    const mesh = new Mesh(geo, mat);
    hudScene.add(mesh);

    const hudCam = new OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    hudCam.position.set(0, 0, 2);
    hudCam.lookAt(0, 0, 0);

    return { hudScene, mesh, mat, hudCam };
  }, [mapPlaceholder]);

  useLayoutEffect(() => {
    const renderer = gl;
    const orig = renderer.render.bind(renderer);
    const { hudScene, mesh, hudCam, mat } = hud;

    renderer.render = (scene: Object3D, camera: Camera) => {
      orig(scene, camera);

      /**
       * ContactShadows и др. вызывают `gl.render` с другими камерами / не корневой сценой.
       * Иначе после их прохода в замыкании остаётся чужой `scene` и FBO рисуется мусором / чёрным.
       */
      if (scene !== worldScene || camera !== mainCamera) return;

      const pip = pipCameraRef.current;
      if (!pip) return;

      mat.map = fbo.texture;
      if ("colorSpace" in fbo.texture) {
        fbo.texture.colorSpace = SRGBColorSpace;
      }

      layoutHudQuad(mesh, renderer);

      pip.aspect = fbo.width / fbo.height;
      pip.updateProjectionMatrix();

      const prevTarget = renderer.getRenderTarget();
      const prevSize = new Vector2();
      renderer.getDrawingBufferSize(prevSize);

      renderer.setRenderTarget(fbo);
      renderer.setViewport(0, 0, fbo.width, fbo.height);
      renderer.clear(true, true, true);
      orig(scene, pip);

      renderer.setRenderTarget(prevTarget);
      renderer.setViewport(0, 0, prevSize.x, prevSize.y);

      const prevAuto = renderer.autoClear;
      renderer.autoClear = false;
      renderer.clearDepth();
      renderer.setViewport(0, 0, prevSize.x, prevSize.y);
      renderer.setScissorTest(false);

      orig(hudScene, hudCam);

      renderer.autoClear = prevAuto;
    };

    return () => {
      renderer.render = orig;
      mat.map = null;
      mat.dispose();
      mesh.geometry.dispose();
      mapPlaceholder.dispose();
    };
  }, [gl, worldScene, mainCamera, pipCameraRef, fbo, hud, mapPlaceholder]);

  return null;
}
