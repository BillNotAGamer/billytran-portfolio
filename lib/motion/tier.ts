export type MotionTier = "off" | "reduced" | "full";

export const MOTION_TIER_ATTRIBUTE = "data-motion-tier";

/**
 * Thresholds. Deliberately conservative: the rich tier is opt-in by capability,
 * so anything unknown or borderline lands on "reduced" and keeps the cheap
 * CSS-only experience.
 *
 * - MIN_LOGICAL_CORES 4: below this, a scrub-driven timeline competes with the
 *   main thread badly enough to drop frames.
 * - MIN_DEVICE_MEMORY_GB 4: navigator.deviceMemory is coarse (0.25/0.5/1/2/4/8)
 *   and Safari/Firefox do not report it, so a missing value is not penalised.
 * - MIN_VIEWPORT_WIDTH 1024: matches the lg: breakpoint the layout already
 *   uses to switch to its desktop form.
 */
const MIN_LOGICAL_CORES = 4;
const MIN_DEVICE_MEMORY_GB = 4;
const MIN_VIEWPORT_WIDTH = 1024;

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const FINE_POINTER_QUERY = "(hover: hover) and (pointer: fine)";
const REDUCED_DATA_QUERY = "(prefers-reduced-data: reduce)";

type ConnectionLike = { saveData?: boolean };

function prefersReducedData() {
  // prefers-reduced-data is still unevenly supported, so the Save-Data header
  // hint is checked too.
  if (window.matchMedia(REDUCED_DATA_QUERY).matches) {
    return true;
  }

  const connection = (navigator as Navigator & { connection?: ConnectionLike })
    .connection;

  return connection?.saveData === true;
}

export function resolveMotionTier(): MotionTier {
  if (typeof window === "undefined") {
    return "reduced";
  }

  if (window.matchMedia(REDUCED_MOTION_QUERY).matches) {
    return "off";
  }

  if (!window.matchMedia(FINE_POINTER_QUERY).matches) {
    return "reduced";
  }

  if (window.innerWidth < MIN_VIEWPORT_WIDTH) {
    return "reduced";
  }

  const cores = navigator.hardwareConcurrency;

  if (typeof cores === "number" && cores > 0 && cores < MIN_LOGICAL_CORES) {
    return "reduced";
  }

  const deviceMemory = (navigator as Navigator & { deviceMemory?: number })
    .deviceMemory;

  if (typeof deviceMemory === "number" && deviceMemory < MIN_DEVICE_MEMORY_GB) {
    return "reduced";
  }

  if (prefersReducedData()) {
    return "reduced";
  }

  return "full";
}

let webGLSupport: boolean | null = null;

/**
 * Reported separately from the tier: the tier describes how much motion the
 * device and the visitor want, this describes whether a GPU context can be had
 * at all. The 3D hero needs both.
 *
 * The answer is cached because the probe has to create a real context to be
 * truthful, and a document only has a handful of those to give out.
 */
export function hasWebGLSupport() {
  if (typeof document === "undefined") {
    return false;
  }

  if (webGLSupport !== null) {
    return webGLSupport;
  }

  try {
    const canvas = document.createElement("canvas");
    const context =
      canvas.getContext("webgl2") ??
      canvas.getContext("webgl") ??
      (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);

    webGLSupport = context !== null;

    // Hand the probe's context straight back, so the scene is not competing
    // with it for the browser's per-document context budget.
    if (context) {
      context.getExtension("WEBGL_lose_context")?.loseContext();
    }
  } catch {
    webGLSupport = false;
  }

  return webGLSupport;
}
