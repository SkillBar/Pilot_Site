"use client";

import { createContext, useContext, type RefObject } from "react";

export const CityDrivingPlayerSpeedRefContext = createContext<RefObject<number> | null>(
  null,
);

export function useCityDrivingPlayerSpeedRef() {
  return useContext(CityDrivingPlayerSpeedRefContext);
}
