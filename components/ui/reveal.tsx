"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useMotionReady } from "@/components/ui/use-motion-ready";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
  y?: number;
};

const revealEase = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  className,
  delay = 0,
  once = true,
  y = 28,
}: RevealProps) {
  const { hasMounted, motionEnabled, prefersReducedMotion } = useMotionReady();
  const hiddenState = { opacity: 0, y };
  const visibleState = { opacity: 1, y: 0 };

  const motionProps = !hasMounted
    ? {
        initial: hiddenState,
      }
    : motionEnabled
      ? {
          initial: hiddenState,
          whileInView: visibleState,
          transition: {
            delay,
            duration: 0.7,
            ease: revealEase,
          },
          viewport: { once, amount: 0.25 },
        }
      : {
          initial: false,
          animate: visibleState,
          transition: {
            duration: prefersReducedMotion ? 0.01 : 0.2,
          },
        };

  return (
    <motion.div className={cn(className)} {...motionProps}>
      {children}
    </motion.div>
  );
}
