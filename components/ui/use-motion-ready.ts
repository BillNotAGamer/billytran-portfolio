"use client";

import { useReducedMotion } from "framer-motion";
import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

export function useMotionReady() {
  const prefersReducedMotion = useReducedMotion();
  const hasMounted = useSyncExternalStore(subscribe, () => true, () => false);

  return {
    hasMounted,
    motionEnabled: hasMounted && !prefersReducedMotion,
    prefersReducedMotion: hasMounted ? prefersReducedMotion : false,
  };
}
