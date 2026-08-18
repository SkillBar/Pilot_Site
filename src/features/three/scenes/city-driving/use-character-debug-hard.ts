"use client";

import { useEffect, useState } from "react";

import {
  parseCharacterDebugHard,
  type CharacterDebugHardMode,
} from "./character-debug-hard";

export function useCharacterDebugHard(): CharacterDebugHardMode {
  const [mode, setMode] = useState<CharacterDebugHardMode>(() =>
    typeof window !== "undefined"
      ? parseCharacterDebugHard(window.location.search)
      : "off",
  );

  useEffect(() => {
    setMode(parseCharacterDebugHard(window.location.search));
  }, []);

  return mode;
}
