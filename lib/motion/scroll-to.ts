import type Lenis from "lenis";

import { HEADER_OFFSET_PX } from "@/lib/motion/tokens";

// Set by the motion runtime on the "full" tier only. Everything here works
// without it; Lenis is used when present purely for a nicer glide.
let activeLenis: Lenis | null = null;

export function setActiveLenis(instance: Lenis | null) {
  activeLenis = instance;
}

export function getActiveLenis() {
  return activeLenis;
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Focus the target so keyboard scrolling (Space, PageDown, arrows, Home/End)
 * continues from where the user was sent, rather than from the nav.
 */
function focusTarget(target: HTMLElement) {
  if (!target.hasAttribute("tabindex")) {
    target.setAttribute("tabindex", "-1");
  }

  target.focus({ preventScroll: true });
}

export function scrollToHash(hash: string, options: { instant?: boolean } = {}) {
  const id = decodeURIComponent(hash.replace(/^#/, ""));
  const target = document.getElementById(id);

  if (!target) {
    return false;
  }

  const instant = options.instant === true || prefersReducedMotion();

  if (activeLenis && !instant) {
    activeLenis.scrollTo(target, { offset: -HEADER_OFFSET_PX });
  } else {
    window.scrollTo({
      top: target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET_PX,
      behavior: instant ? "auto" : "smooth",
    });
  }

  focusTarget(target);

  return true;
}

/**
 * One delegated handler for every in-page anchor: the desktop and mobile navs,
 * the footer nav, the hero CTAs, the contact links and the skip link.
 */
export function handleAnchorClick(event: MouseEvent) {
  if (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  ) {
    return;
  }

  const target = event.target;
  const anchor =
    target instanceof Element ? target.closest<HTMLAnchorElement>("a[href]") : null;

  if (!anchor || anchor.target === "_blank") {
    return;
  }

  const href = anchor.getAttribute("href");

  if (!href) {
    return;
  }

  // Either a bare "#section" or a same-page "/en#section".
  let hash = "";

  if (href.startsWith("#")) {
    hash = href;
  } else if (href.startsWith("/")) {
    const url = new URL(href, window.location.origin);

    if (url.pathname !== window.location.pathname || !url.hash) {
      return;
    }

    hash = url.hash;
  } else {
    return;
  }

  if (!scrollToHash(hash)) {
    return;
  }

  event.preventDefault();

  // Keep the URL in step without letting the browser jump to the target.
  if (window.location.hash !== hash) {
    window.history.pushState(null, "", hash);
  }
}
