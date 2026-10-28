"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

import type { MotionTeardown } from "@/lib/motion/init";
import { handleAnchorClick, scrollToHash } from "@/lib/motion/scroll-to";
import { MOTION_TIER_ATTRIBUTE, resolveMotionTier } from "@/lib/motion/tier";

const IDLE_TIMEOUT_MS = 2000;
const FALLBACK_DELAY_MS = 200;

/**
 * Mounted once from the locale layout.
 *
 * Anchor handling and the tier attribute apply on every tier. GSAP, ScrollTrigger
 * and Lenis are dynamically imported only on "full", and only once the browser
 * is idle, so they never touch the critical path.
 *
 * Keyed on pathname so a route change - including the locale switch - tears the
 * runtime down and rebuilds it against the new DOM.
 */
export function MotionRuntime() {
  const pathname = usePathname();
  const hasHandledInitialHash = useRef(false);

  useEffect(() => {
    const root = document.documentElement;
    const tier = resolveMotionTier();
    root.setAttribute(MOTION_TIER_ATTRIBUTE, tier);

    document.addEventListener("click", handleAnchorClick);

    // Landing on /en#journey: let the layout settle, then place the view with
    // the header offset applied. Only on first mount, never on route changes.
    if (!hasHandledInitialHash.current && window.location.hash) {
      hasHandledInitialHash.current = true;
      const hash = window.location.hash;
      requestAnimationFrame(() => scrollToHash(hash, { instant: true }));
    }

    let cancelled = false;
    let teardown: MotionTeardown | null = null;
    let idleHandle = 0;
    let usedIdleCallback = false;

    if (tier === "full") {
      const start = () => {
        import("@/lib/motion/init")
          .then(({ initMotion }) => {
            if (cancelled) {
              return;
            }

            teardown = initMotion();
          })
          .catch(() => {
            // Motion is an enhancement; the CSS reveals already cover the page.
          });
      };

      if (typeof window.requestIdleCallback === "function") {
        usedIdleCallback = true;
        idleHandle = window.requestIdleCallback(start, {
          timeout: IDLE_TIMEOUT_MS,
        });
      } else {
        idleHandle = window.setTimeout(start, FALLBACK_DELAY_MS);
      }
    }

    return () => {
      cancelled = true;

      if (idleHandle !== 0) {
        if (usedIdleCallback) {
          window.cancelIdleCallback(idleHandle);
        } else {
          window.clearTimeout(idleHandle);
        }
      }

      document.removeEventListener("click", handleAnchorClick);
      teardown?.();
      root.removeAttribute(MOTION_TIER_ATTRIBUTE);
    };
  }, [pathname]);

  return null;
}
