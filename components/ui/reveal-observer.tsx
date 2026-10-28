"use client";

import { useEffect } from "react";

const REVEAL_SELECTOR = "[data-reveal]:not([data-reveal-shown])";
const REVEAL_THRESHOLD = 0.25;
const SWEEP_DEBOUNCE_MS = 150;
const SWEEP_TRIGGER_RATIO = 0.75;

/**
 * One IntersectionObserver for every [data-reveal] element on the page, mounted
 * once from the locale layout. Replaces the per-element Framer Motion
 * whileInView wrappers.
 */
export function RevealObserver() {
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") {
      // Without an observer nothing would ever reveal, so drop the `js` class
      // and let the CSS fall back to showing everything.
      document.documentElement.classList.remove("js");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) {
            continue;
          }

          // An element taller than the viewport can never reach a 0.25 ratio,
          // so for those any intersection counts.
          const tallerThanViewport =
            entry.rootBounds !== null &&
            entry.boundingClientRect.height >= entry.rootBounds.height;

          if (
            entry.intersectionRatio >= REVEAL_THRESHOLD ||
            tallerThanViewport
          ) {
            reveal(entry.target);
          }
        }
      },
      { threshold: [0, REVEAL_THRESHOLD] },
    );

    function reveal(element: Element) {
      element.setAttribute("data-reveal-shown", "");
      observer.unobserve(element);
    }

    const observePending = () => {
      for (const element of document.querySelectorAll(REVEAL_SELECTOR)) {
        observer.observe(element);
      }
    };

    observePending();

    // An instant jump - a nav anchor, Ctrl+End, a restored scroll position -
    // can carry a whole section past the viewport between two observer
    // samples, and a once-only reveal would then leave it hidden for good.
    // Once scrolling settles, reveal anything still pending that has already
    // passed the trigger line. Debounced, so this is one pass per gesture
    // rather than one per frame, and it does nothing once all are revealed.
    let sweepTimer = 0;

    const sweep = () => {
      const triggerLine = window.innerHeight * SWEEP_TRIGGER_RATIO;

      for (const element of document.querySelectorAll(REVEAL_SELECTOR)) {
        if (element.getBoundingClientRect().top <= triggerLine) {
          reveal(element);
        }
      }
    };

    const scheduleSweep = () => {
      window.clearTimeout(sweepTimer);
      sweepTimer = window.setTimeout(sweep, SWEEP_DEBOUNCE_MS);
    };

    window.addEventListener("scroll", scheduleSweep, { passive: true });

    // Client-side navigation swaps in new [data-reveal] nodes under this same
    // layout, so they have to be picked up after the initial pass. Coalesced to
    // one pass per frame because unrelated re-renders also mutate the tree.
    let pendingFrame = 0;
    const mutationObserver = new MutationObserver(() => {
      if (pendingFrame !== 0) {
        return;
      }

      pendingFrame = requestAnimationFrame(() => {
        pendingFrame = 0;
        observePending();
      });
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      if (pendingFrame !== 0) {
        cancelAnimationFrame(pendingFrame);
      }

      window.clearTimeout(sweepTimer);
      window.removeEventListener("scroll", scheduleSweep);
      mutationObserver.disconnect();
      observer.disconnect();
    };
  }, []);

  return null;
}
