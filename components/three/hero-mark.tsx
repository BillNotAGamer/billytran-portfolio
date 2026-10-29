"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";

import { SignatureBlueprint } from "@/components/ui/signature-blueprint";
import { useMotionTier } from "@/components/ui/use-motion-tier";
import { hasWebGLSupport } from "@/lib/motion/tier";

/**
 * The gate in front of the 3D hero mark.
 *
 * This file is in the initial bundle; the scene is not. Everything the scene
 * needs - three, @react-three/fiber, drei's PerformanceMonitor, the geometry and
 * the textures - sits behind the dynamic import below, which is only reached
 * when all of this holds:
 *
 *   - the motion tier resolved to "full" (capable desktop, fine pointer, no
 *     reduced-motion or reduced-data preference), and
 *   - a WebGL context can actually be created, and
 *   - the browser has gone idle after hydration.
 *
 * Until then - and on every other tier, with JavaScript off, and after a lost
 * context or a sustained frame-rate collapse - what renders is the static
 * SignatureBlueprint SVG. That SVG is in the server HTML and needs no
 * JavaScript at all. The canvas only replaces it, with a short crossfade, once
 * its first frame has reached the screen.
 *
 * ssr: false is legal here because this file is a Client Component. It could not
 * be done from the hero section, which is a Server Component - see
 * node_modules/next/dist/docs/01-app/02-guides/lazy-loading.md.
 */
const HeroMarkScene = dynamic(
  () => import("@/components/three/hero-mark-scene"),
  { ssr: false },
);

const IDLE_TIMEOUT_MS = 2500;
const FALLBACK_DELAY_MS = 400;

/** Start rendering a little before the box scrolls into view. */
const VIEWPORT_MARGIN = "240px";

/**
 * Owns `ready`, so that remounting this layer - after the tier changes, or on a
 * client-side navigation - starts the crossfade again from the beginning rather
 * than revealing a canvas that has not drawn anything yet.
 */
/** Why the scene gave up, if it did. Surfaced on the DOM for review. */
type BailReason = "context-lost" | "performance";

function HeroMarkCanvas({
  active,
  onContextLost,
  onPerformanceFallback,
}: {
  active: boolean;
  onContextLost: () => void;
  onPerformanceFallback: () => void;
}) {
  const fadeRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const handleFirstFrame = useCallback(() => setReady(true), []);

  return (
    <div
      className="hero-mark-canvas absolute inset-0"
      data-ready={ready ? "" : undefined}
    >
      {/* Its own element, because the scene writes the scroll fade here every
          frame while the crossfade is a CSS transition on the static SVG. One
          opacity each, so the two never fight. */}
      <div ref={fadeRef} className="absolute inset-0">
        <HeroMarkScene
          active={active}
          fadeRef={fadeRef}
          onFirstFrame={handleFirstFrame}
          onContextLost={onContextLost}
          onPerformanceFallback={onPerformanceFallback}
        />
      </div>
    </div>
  );
}

export function HeroMark() {
  const { tier } = useMotionTier();
  const rootRef = useRef<HTMLDivElement>(null);

  const [sceneAllowed, setSceneAllowed] = useState(false);
  /** Set once and never cleared: from here the static mark is the right answer. */
  const [bailed, setBailed] = useState<BailReason | null>(null);
  const [active, setActive] = useState(true);

  // Derived rather than stored, so the tier changing under us - a window
  // dragged below 1024px, reduced motion switched on, a lost context - gives
  // the GPU context back on the next render with no effect round-trip.
  const mounted = sceneAllowed && bailed === null && tier === "full";

  useEffect(() => {
    if (bailed !== null || tier !== "full") {
      return;
    }

    let cancelled = false;
    let handle = 0;
    let usedIdleCallback = false;

    const start = () => {
      // Probed at idle rather than during render: the probe has to create a real
      // context to be honest about it.
      if (!cancelled && hasWebGLSupport()) {
        setSceneAllowed(true);
      }
    };

    if (typeof window.requestIdleCallback === "function") {
      usedIdleCallback = true;
      handle = window.requestIdleCallback(start, { timeout: IDLE_TIMEOUT_MS });
    } else {
      handle = window.setTimeout(start, FALLBACK_DELAY_MS);
    }

    return () => {
      cancelled = true;

      if (handle !== 0) {
        if (usedIdleCallback) {
          window.cancelIdleCallback(handle);
        } else {
          window.clearTimeout(handle);
        }
      }
    };
  }, [bailed, tier]);

  // Render only while the box is on screen and the tab is in front. Both feed
  // one flag, which switches the render loop off rather than slowing it down.
  useEffect(() => {
    if (!mounted) {
      return;
    }

    const node = rootRef.current;
    let onScreen = true;
    let foreground = !document.hidden;

    const apply = () => setActive(onScreen && foreground);

    const observer =
      node && typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(
            ([entry]) => {
              onScreen = entry.isIntersecting;
              apply();
            },
            { rootMargin: VIEWPORT_MARGIN },
          )
        : null;

    if (observer && node) {
      observer.observe(node);
    }

    const handleVisibility = () => {
      foreground = !document.hidden;
      apply();
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      observer?.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [mounted]);

  const handleContextLost = useCallback(() => setBailed("context-lost"), []);
  const handlePerformanceFallback = useCallback(
    () => setBailed("performance"),
    [],
  );

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
      // Decorative, and aria-hidden, so these are purely for the owner and for
      // the verification harness: which mark is on screen, and why.
      data-hero-mark={mounted ? "canvas" : "svg"}
      data-hero-mark-bail={bailed ?? undefined}
    >
      {mounted ? (
        <HeroMarkCanvas
          active={active}
          onContextLost={handleContextLost}
          onPerformanceFallback={handlePerformanceFallback}
        />
      ) : null}

      {/* After the canvas, so the crossfade is one transition: this fades out
          on top of a canvas that is already drawing. CSS does the hiding from
          the adjacent-sibling state, which also means it fades back in by
          itself if the canvas layer ever goes away. */}
      <div className="hero-mark-fallback absolute inset-[9%]">
        <SignatureBlueprint className="text-accent/45" />
      </div>
    </div>
  );
}
