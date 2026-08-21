"use client";

import { useSyncExternalStore } from "react";

const compactOrgQuery = "(max-width: 767px)";

function subscribe(callback: () => void) {
  const query = window.matchMedia(compactOrgQuery);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

function getSnapshot() {
  return window.matchMedia(compactOrgQuery).matches;
}

export function useCompactOrgLayout() {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
