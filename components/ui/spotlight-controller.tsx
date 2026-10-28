"use client";

import { useEffect } from "react";

/**
 * One delegated pointermove listener for every [data-spotlight] panel, mounted
 * once from the locale layout. Replaces the per-panel listeners and springs.
 *
 * Only one panel can be hovered at a time, so a single cached rect is enough.
 * It is invalidated rather than recomputed on scroll and resize, so the layout
 * read happens on the next pointer move instead of on every scroll frame.
 */
export function SpotlightController() {
  useEffect(() => {
    const supportsHover = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    );

    if (!supportsHover.matches) {
      return;
    }

    let activePanel: HTMLElement | null = null;
    let activeRect: DOMRect | null = null;
    let offsetX = 0;
    let offsetY = 0;
    let pendingFrame = 0;

    const applyOffset = () => {
      pendingFrame = 0;

      if (!activePanel) {
        return;
      }

      activePanel.style.setProperty("--spotlight-x", `${offsetX}px`);
      activePanel.style.setProperty("--spotlight-y", `${offsetY}px`);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") {
        return;
      }

      const target = event.target;
      const panel =
        target instanceof Element
          ? target.closest<HTMLElement>("[data-spotlight]")
          : null;

      if (panel !== activePanel) {
        activePanel = panel;
        activeRect = null;
      }

      if (!panel) {
        return;
      }

      if (!activeRect) {
        activeRect = panel.getBoundingClientRect();
      }

      offsetX = event.clientX - (activeRect.left + activeRect.width / 2);
      offsetY = event.clientY - (activeRect.top + activeRect.height / 2);

      if (pendingFrame === 0) {
        pendingFrame = requestAnimationFrame(applyOffset);
      }
    };

    const invalidateRect = () => {
      activeRect = null;
    };

    document.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    window.addEventListener("scroll", invalidateRect, { passive: true });
    window.addEventListener("resize", invalidateRect, { passive: true });

    return () => {
      if (pendingFrame !== 0) {
        cancelAnimationFrame(pendingFrame);
      }

      document.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("scroll", invalidateRect);
      window.removeEventListener("resize", invalidateRect);
    };
  }, []);

  return null;
}
