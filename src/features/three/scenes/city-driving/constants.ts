import { Vector3 } from "three";

/** Игрок — Meshy Taxi SUV (textures embedded). Было: Kenney sedan.glb. */
export const KENNEY_SEDAN_GLB = "/three/models/meshy-taxi-suv.glb";

/** Meshy AI Jeep (камера на крыше, текстуры в GLB). */
export const MESHY_AI_JEEP_GLB = "/three/models/meshy-ai-jeep.glb";

/** Meshy AI Gentleman: один GLB (сцена + скин + анимация ходьбы). */
export const MESHY_GENTLEMAN_GLB = "/three/models/meshy-gentleman-walking.glb";

/** Предпочитаемый клип в glTF (если нет совпадения — первый из файла). */
export const MESHY_GENTLEMAN_WALK_CLIP_NAME =
  "Meshy_AI_Gentleman_in_a_Brown__biped_Animation_Walking_withSkin" as const;

export type CityDrivingVehicleId = "taxi" | "jeep" | "gentleman";

export type CityDrivingVehiclePreset = {
  label: string;
  glb: string;
  scale: number;
  meshYaw: number;
  groundClear: number;
};

export const CITY_DRIVING_VEHICLE_PRESETS: Record<
  CityDrivingVehicleId,
  CityDrivingVehiclePreset
> = {
  taxi: {
    label: "SUV",
    glb: KENNEY_SEDAN_GLB,
    scale: 1.5,
    meshYaw: Math.PI / 2,
    groundClear: 0.038,
  },
  jeep: {
    label: "Jeep",
    glb: MESHY_AI_JEEP_GLB,
    scale: 1.5,
    meshYaw: Math.PI / 2,
    groundClear: 0.038,
  },
  gentleman: {
    label: "Герой",
    glb: MESHY_GENTLEMAN_GLB,
    scale: 10,
    meshYaw: Math.PI,
    groundClear: 0.02,
  },
};

/** Godot GridMap cell (Starter Kit Racing). */
export const CELL_SIZE = { x: 9.99, y: 1, z: 9.99 } as const;
export const CELL_SCALE = 1;
export const GRID_MAP_SCALE = 0.75;
export const GRID_MAP_POS = { x: 0, y: -0.5, z: 0 } as const;
export const CENTER = { x: true, y: true, z: true } as const;

export const ROAD_Y = 0.02;

/**
 * Плитки Kenney часто дают дорогу выше y=0; без сдвига персонаж оказывается внутри меша дороги.
 * Только пресет «Герой».
 */
export const PLAYER_GENTLEMAN_CAR_ROOT_Y = 0.55;

/** Визуал игрока по умолчанию (taxi preset); для выбора машины см. CITY_DRIVING_VEHICLE_PRESETS. */
export const PLAYER_VEHICLE_SCALE =
  CITY_DRIVING_VEHICLE_PRESETS.taxi.scale;
/**
 * Доп. поворот GLB вокруг Y: при π нос совпадал с ходом, но кузов смотрел «боком».
 * π/2 выравнивает корпус по дороге; вектор движения подправлен в vehicle.tsx.
 */
export const PLAYER_VEHICLE_MESH_YAW = CITY_DRIVING_VEHICLE_PRESETS.taxi.meshYaw;
export const PLAYER_VEHICLE_GROUND_CLEAR =
  CITY_DRIVING_VEHICLE_PRESETS.taxi.groundClear;

/** Физика машины */
export const MOVE_SPEED = 17;
export const TURN_SPEED = 2.65;
export const ACCEL = 42;
export const DECEL = 28;

/** Изометрическая камера */
export const ISO_OFFSET = new Vector3(1, 0.78, 1).normalize();
export const ISO_DISTANCE = 36;

/**
 * PiP: вид сзади по ходу машины.
 * Движение (sin(yaw), cos(yaw)): при yaw 0 «вперёд» = +локальный Z; камера с −Z, Y = π.
 * Высота Y на ~30% ниже прежней 2.25 — ниже горизонт в маленьком худе.
 */
export const PIP_CAM_LOCAL_POS: [number, number, number] = [0, 1.575, -4.05];
export const PIP_CAM_LOCAL_ROT: [number, number, number] = [-0.24, Math.PI, 0];
export const PIP_CAM_FOV = 50;
export const PIP_CAM_NEAR = 0.35;
export const PIP_CAM_FAR = 260;

/** Компактное окно PiP (~в 6 раз уже прежней полосы по доле ширины экрана). */
export const HOOD_PIP_WIDTH_FRAC = 0.13;
export const HOOD_PIP_ASPECT = 16 / 9;
export const HOOD_PIP_PADDING_CSS_PX = 14;
/** Радиус скругления PiP в UV-квадрате [0–1] (углы quad). */
export const HOOD_PIP_CORNER_UV = 0.082;
/** Положение окна худ по вертикали: снизу области карты (не по центру экрана — иначе перекрывает изометрию / «ездит» с кадром). */
export type HoodPipVerticalAlign = "bottom" | "center";
export const HOOD_PIP_VERTICAL_ALIGN: HoodPipVerticalAlign = "bottom";

/** Земля под трассой — без текстур, один вызов draw */
export const GROUND_COLOR = "#b8a38a";
/** Множитель размера плоскости относительно радиуса карты */
export const GROUND_SIZE_FACTOR = 2.65;

/** Фон и туман (согласованы с небом) */
export const SCENE_BG = "#c5d2e3";
export const SCENE_FOG = "#aabbd0";
