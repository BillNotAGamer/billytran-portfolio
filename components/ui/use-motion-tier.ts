"use client";

import { useSyncExternalStore } from "react";
import { type MotionTier, resolveMotionTier } from "@/lib/motion/tier";

const WATCHED_QUERIES = [
  "(prefers-reduced-motion: reduce)",
  "(hover: hover) and (pointer: fine)",
  "(prefers-reduced-data: reduce)",
];

function subscribe(onStoreChange: () => void) {
  const mediaQueries = WATCHED_QUERIES.map((query) => window.matchMedia(query));

  for (const mediaQuery of mediaQueries) {
    mediaQuery.addEventListener("change", onStoreChange);
  }

  window.addEventListener("resize", onStoreChange);

  return () => {
    for (const mediaQuery of mediaQueries) {
      mediaQuery.removeEventListener("change", onStoreChange);
    }

    window.removeEventListener("resize", onStoreChange);
  };
}

// useSyncExternalStore compares snapshots by identity, and MotionTier is a
// string, so resolving on every call is safe and stays current.
const getSnapshot = () => resolveMotionTier();

// Nothing is tier-dependent during SSR; components render their resting state.
const getServerSnapshot = (): MotionTier => "reduced";

const subscribeToMount = () => () => {};

export function useMotionTier() {
  const tier = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const hasMounted = useSyncExternalStore(
    subscribeToMount,
    () => true,
    () => false,
  );

  return {
    hasMounted,
    tier: hasMounted ? tier : ("reduced" as MotionTier),
    /** Looping decoration is fine on every tier except "off". */
    motionEnabled: hasMounted && tier !== "off",
    /** Pointer-driven effects: capable desktop only. */
    pointerMotionEnabled: hasMounted && tier === "full",
  };
}
