import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /**
   * For content that is above the fold on load. Runs the same entrance from a
   * CSS animation as soon as the element is parsed, rather than waiting for
   * hydration to start the observer, which otherwise holds LCP back.
   */
  immediate?: boolean;
  /**
   * Marks the wrapper for GSAP to claim on the "full" tier. GSAP removes
   * data-reveal from it, so the two systems never animate the same element.
   */
  gsapKey?: string;
  /** Accepted for API compatibility; reveals are always once-only. */
  once?: boolean;
  y?: number;
};

const DEFAULT_REVEAL_Y = 28;

/**
 * Server-rendered wrapper. The element is visible in the server HTML; the
 * hidden-before-reveal state lives in globals.css and only applies once the
 * inline bootstrap script has added `js` to <html> and the visitor has not
 * asked for reduced motion. RevealObserver then marks elements as shown.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  gsapKey,
  immediate = false,
  y = DEFAULT_REVEAL_Y,
}: RevealProps) {
  const customProperties: Record<string, string> = {};

  if (delay > 0) {
    customProperties["--reveal-delay"] = `${delay}s`;
  }

  if (y !== DEFAULT_REVEAL_Y) {
    customProperties["--reveal-y"] = `${y}px`;
  }

  const hasCustomProperties = Object.keys(customProperties).length > 0;

  return (
    <div
      data-reveal={immediate ? "immediate" : ""}
      data-gsap={gsapKey}
      className={cn(className)}
      style={
        hasCustomProperties ? (customProperties as CSSProperties) : undefined
      }
    >
      {children}
    </div>
  );
}
