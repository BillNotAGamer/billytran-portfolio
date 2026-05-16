"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import type { PointerEvent, ReactNode } from "react";
import { useMotionReady } from "@/components/ui/use-motion-ready";
import { cn } from "@/lib/utils";

type SpotlightPanelProps = {
  children: ReactNode;
  className?: string;
  lift?: boolean;
};

const panelTransition = {
  type: "spring",
  stiffness: 220,
  damping: 24,
  mass: 0.55,
} as const;

export function SpotlightPanel({
  children,
  className,
  lift = true,
}: SpotlightPanelProps) {
  const { motionEnabled } = useMotionReady();
  const pointerX = useMotionValue(50);
  const pointerY = useMotionValue(50);
  const smoothX = useSpring(pointerX, panelTransition);
  const smoothY = useSpring(pointerY, panelTransition);
  const background = useMotionTemplate`radial-gradient(380px circle at ${smoothX}% ${smoothY}%, rgba(141, 224, 255, 0.16), rgba(121, 161, 255, 0.08) 18%, transparent 62%)`;

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!motionEnabled || event.pointerType !== "mouse") {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - rect.left) / rect.width) * 100);
    pointerY.set(((event.clientY - rect.top) / rect.height) * 100);
  };

  const handlePointerLeave = () => {
    pointerX.set(50);
    pointerY.set(50);
  };

  return (
    <motion.div
      className={cn("group relative", className)}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      whileHover={motionEnabled && lift ? { y: -4 } : undefined}
      transition={panelTransition}
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[radial-gradient(circle_at_center,rgba(141,224,255,0.12),transparent_65%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-within:opacity-100"
        style={motionEnabled ? { background } : undefined}
      />
      <div className="pointer-events-none absolute inset-0 rounded-[inherit] border border-white/[0.06] opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-within:opacity-100" />
      {children}
    </motion.div>
  );
}
