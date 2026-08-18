import { KENNEY_STARTER_RACING_GLB } from "../../config/kenney-starter-racing";
import { STARTER_RACING_GRID_CELLS } from "../../config/starter-racing-track-data";
import { orthoIndexToQuaternion } from "../../utils/godot-gridmap-ortho";
import type { Quaternion } from "three";
import {
  CELL_SCALE,
  CELL_SIZE,
  CENTER,
  GRID_MAP_POS,
  GRID_MAP_SCALE,
  ROAD_Y,
} from "./constants";

export function cellOffset(axis: "x" | "y" | "z") {
  const c = CENTER[axis] ? 0.5 : 0;
  return CELL_SIZE[axis] * c;
}

export function mapToLocal(gx: number, gy: number, gz: number): [number, number, number] {
  return [
    gx * CELL_SIZE.x + cellOffset("x"),
    gy * CELL_SIZE.y + cellOffset("y"),
    gz * CELL_SIZE.z + cellOffset("z"),
  ];
}

export function gridMapToWorld(lx: number, ly: number, lz: number): [number, number, number] {
  return [
    lx * GRID_MAP_SCALE + GRID_MAP_POS.x,
    ly * GRID_MAP_SCALE + GRID_MAP_POS.y,
    lz * GRID_MAP_SCALE + GRID_MAP_POS.z,
  ];
}

export function computeMapHalf(): number {
  let ext = 0;
  for (const c of STARTER_RACING_GRID_CELLS) {
    const [lx, ly, lz] = mapToLocal(c.gx, c.gy, c.gz);
    const [wx, , wz] = gridMapToWorld(lx, ly, lz);
    ext = Math.max(ext, Math.hypot(wx, wz));
  }
  const cellPad = (Math.max(CELL_SIZE.x, CELL_SIZE.z) * 0.5) * GRID_MAP_SCALE;
  return ext + cellPad + 10;
}

export type TrackTile = {
  key: string;
  url: string;
  position: [number, number, number];
  quat: Quaternion;
  scale: number;
};

/** Собирает список плиток под <RacingTrack /> (мемоизировать в сцене). */
export function buildTrackTiles(): TrackTile[] {
  const out: TrackTile[] = [];
  for (let i = 0; i < STARTER_RACING_GRID_CELLS.length; i++) {
    const c = STARTER_RACING_GRID_CELLS[i]!;
    const url = KENNEY_STARTER_RACING_GLB[c.item];
    if (!url) continue;

    const [lx, ly, lz] = mapToLocal(c.gx, c.gy, c.gz);
    const [wx, wy, wz] = gridMapToWorld(lx, ly, lz);
    const quat = orthoIndexToQuaternion(c.ortho);
    out.push({
      key: `t-${c.gx}-${c.gy}-${c.gz}-${c.item}-${i}`,
      url,
      position: [wx, wy + ROAD_Y, wz],
      quat,
      scale: CELL_SCALE,
    });
  }
  return out;
}
