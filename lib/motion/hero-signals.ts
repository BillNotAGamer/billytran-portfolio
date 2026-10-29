/**
 * Three numbers shared between the hero's DOM layer and its 3D layer.
 *
 * Why a module rather than props or context: the two writers and the reader all
 * run on different schedules. Hero scroll progress is written by the Phase 2
 * ScrollTrigger scene inside the async motion chunk, the pointer is written by
 * HeroOrbit's existing pointermove handler, and the 3D scene reads all of it
 * once per frame inside a different async chunk. Passing these through React
 * would mean a re-render per frame; a module read is free.
 *
 * It also keeps the promise made in Phase 2 that ScrollTrigger - driven by
 * Lenis, driven by gsap.ticker - stays the only thing watching the scroll
 * position. The 3D scene adds no scroll listener.
 *
 * components/ui/hero-orbit.tsx imports this module and is part of the initial
 * bundle, so both async chunks resolve to this one instance instead of each
 * getting a private copy of the state.
 */

let scrollProgress = 0;
let pointerX = 0;
let pointerY = 0;

function clamp(value: number, min: number, max: number) {
  return value < min ? min : value > max ? max : value;
}

/** 0 while the hero fills the viewport, 1 once it has scrolled fully past. */
export function setHeroScrollProgress(progress: number) {
  scrollProgress = clamp(progress, 0, 1);
}

export function getHeroScrollProgress() {
  return scrollProgress;
}

/**
 * Pointer position over the hero orbit box, as a fraction of the box either
 * side of its centre, so -0.5 is the left/top edge and 0.5 the right/bottom.
 * Both are 0 when the pointer is elsewhere.
 */
export function setHeroPointer(x: number, y: number) {
  pointerX = clamp(x, -0.5, 0.5);
  pointerY = clamp(y, -0.5, 0.5);
}

export function clearHeroPointer() {
  pointerX = 0;
  pointerY = 0;
}

export function getHeroPointerX() {
  return pointerX;
}

export function getHeroPointerY() {
  return pointerY;
}
