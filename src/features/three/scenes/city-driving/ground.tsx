import { GROUND_COLOR, GROUND_SIZE_FACTOR } from "./constants";

type Props = { mapHalf: number };

/** Одна плоскость, без текстур — быстрый первый кадр. */
export function Ground({ mapHalf }: Props) {
  const size = mapHalf * GROUND_SIZE_FACTOR;
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, 0, 0]}>
      <planeGeometry args={[size, size]} />
      <meshStandardMaterial
        color={GROUND_COLOR}
        metalness={0.04}
        roughness={0.93}
      />
    </mesh>
  );
}
