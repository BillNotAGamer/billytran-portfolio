/**
 * Mirrors the --motion-* custom properties in app/globals.css. Keep the two in
 * sync: CSS drives the reveal system, these drive GSAP.
 */

/** The site's signature ease, shared by the CSS reveals and every GSAP tween. */
export const EASE_SIGNATURE = "cubic-bezier(0.22, 1, 0.36, 1)";

/** GSAP spelling of the same curve. */
export const GSAP_EASE_SIGNATURE = "power3.out";

export const DURATION = {
  fast: 0.3,
  base: 0.7,
  slow: 1.1,
} as const;

export const STAGGER = {
  tight: 0.04,
  base: 0.06,
  loose: 0.08,
} as const;

/** Distance a revealing block travels, matching --reveal-y. */
export const REVEAL_DISTANCE_PX = 28;

/** Sticky header height used as the scroll offset for in-page anchors. */
export const HEADER_OFFSET_PX = 88;
