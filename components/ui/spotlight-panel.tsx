import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SpotlightPanelProps = {
  children: ReactNode;
  className?: string;
  lift?: boolean;
  /** Opt in to the pointer-tracked glow. Reserved for the hero and the
   * featured-project cards; every other panel keeps the hover lift only. */
  spotlight?: boolean;
};

export function SpotlightPanel({
  children,
  className,
  lift = true,
  spotlight = false,
}: SpotlightPanelProps) {
  return (
    <div
      data-spotlight={spotlight ? "" : undefined}
      className={cn(
        "group relative",
        lift &&
          "transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1",
        className,
      )}
    >
      {spotlight ? (
        <span aria-hidden="true" className="spotlight-layer" />
      ) : null}
      <div className="pointer-events-none absolute inset-0 rounded-[inherit] border border-white/[0.06] opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-within:opacity-100" />
      {children}
    </div>
  );
}
