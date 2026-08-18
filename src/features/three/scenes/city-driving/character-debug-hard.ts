/**
 * Жёсткий диагностический режим персонажа: `?characterdebug=hard`
 */
export type CharacterDebugHardMode = "off" | "hard";

export function parseCharacterDebugHard(search: string): CharacterDebugHardMode {
  const q = search.startsWith("?") ? search.slice(1) : search;
  const p = new URLSearchParams(q);
  const v = p.get("characterdebug");
  if (v === "hard") return "hard";
  return "off";
}
