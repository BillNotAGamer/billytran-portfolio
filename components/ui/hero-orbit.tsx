"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import type { PointerEvent } from "react";
import { getPortfolioData, type PortfolioData } from "@/data/portfolio";
import { SignatureGlyph } from "@/components/ui/signature-glyph";
import { useMotionReady } from "@/components/ui/use-motion-ready";

const floatingCards = [
  {
    className: "left-0 top-[15%] w-44 md:-left-4 md:w-48",
    title: "Architecture",
    copy: "Systems that stay readable as product scope expands.",
    duration: 12,
    delay: 0,
    visibilityClass: "hidden md:block",
  },
  {
    className: "right-0 top-[5%] w-44 lg:-right-6 lg:w-48",
    title: "Interface Craft",
    copy: "Strong visual restraint with clearer interaction rhythm.",
    duration: 14,
    delay: 0.6,
    visibilityClass: "hidden lg:block",
  },
  {
    className: "bottom-[10%] left-[10%] w-44 sm:w-48 lg:bottom-[5%] lg:w-52",
    title: "Mobile Delivery",
    copy: "Product continuity carried cleanly into the app surface.",
    duration: 15,
    delay: 0.3,
    visibilityClass: "hidden sm:block",
  },
] as const;

const cardEase = [0.22, 1, 0.36, 1] as const;
const orbitSpring = {
  stiffness: 140,
  damping: 18,
  mass: 0.45,
} as const;

export function HeroOrbit({ data }: { data?: PortfolioData }) {
  const portfolioData = data ?? getPortfolioData("en");
  const { motionEnabled } = useMotionReady();
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const smoothRotateX = useSpring(rotateX, orbitSpring);
  const smoothRotateY = useSpring(rotateY, orbitSpring);
  const transform = useMotionTemplate`perspective(1200px) rotateX(${smoothRotateX}deg) rotateY(${smoothRotateY}deg)`;

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!motionEnabled || event.pointerType !== "mouse") {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const relativeX = (event.clientX - rect.left) / rect.width - 0.5;
    const relativeY = (event.clientY - rect.top) / rect.height - 0.5;

    rotateY.set(relativeX * 7);
    rotateX.set(relativeY * -7);
  };

  const handlePointerLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <div className="relative mx-auto aspect-[0.92] w-full max-w-[540px]">
      <motion.div
        aria-hidden="true"
        className="absolute inset-[14%] rounded-full bg-accent/18 blur-[120px]"
        animate={
          motionEnabled
            ? {
                scale: [1, 1.08, 1],
                opacity: [0.5, 0.72, 0.5],
              }
            : undefined
        }
        transition={
          motionEnabled
            ? {
                duration: 12,
                ease: "easeInOut",
                repeat: Number.POSITIVE_INFINITY,
              }
            : undefined
        }
      />

      <div className="absolute inset-0 rounded-[2.25rem] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))]" />
      <div className="absolute inset-[7%] rounded-[2rem] border border-white/[0.06] [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:82px_82px] opacity-40" />

      <motion.div
        className="absolute inset-[10%] overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(160deg,rgba(15,20,31,0.96),rgba(10,13,21,0.9))] p-7 shadow-[0_32px_90px_-36px_rgba(0,0,0,0.85)] sm:p-8"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        style={
          motionEnabled
            ? {
                transform,
                transformStyle: "preserve-3d",
              }
            : undefined
        }
        animate={motionEnabled ? { y: [0, -8, 0] } : undefined}
        transition={
          motionEnabled
            ? {
                duration: 8,
                ease: cardEase,
                repeat: Number.POSITIVE_INFINITY,
              }
            : undefined
        }
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(121,161,255,0.18),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(220,180,123,0.08),transparent_22%)]" />
        <div className="absolute inset-x-0 top-10 h-px bg-[linear-gradient(90deg,transparent,rgba(141,224,255,0.35),transparent)]" />

        <div className="relative flex h-full flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-accent/80">
                  {portfolioData.hero.orbitEyebrow}
                </p>
                <h3 className="mt-4 max-w-xs font-display text-3xl font-semibold tracking-[-0.04em] text-foreground sm:text-[2.1rem]">
                  {portfolioData.hero.orbitTitle}
                </h3>
              </div>
              <SignatureGlyph size="md" className="text-accent-warm/85" />
            </div>
            <p className="mt-5 text-sm leading-7 text-muted-strong sm:text-base">
              {portfolioData.hero.orbitDescription}
            </p>
          </div>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {portfolioData.heroOrbitTags.map((item) => (
              <li
                key={item}
                className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-muted-strong"
              >
                <div className="mb-2 h-px w-10 bg-[linear-gradient(90deg,rgba(141,224,255,0.6),transparent)]" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      {floatingCards.map((card) => (
        <motion.div
          key={card.title}
          aria-hidden="true"
          className={`${card.visibilityClass} pointer-events-none absolute rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(17,22,33,0.92),rgba(12,16,25,0.84))] p-4 shadow-[0_22px_60px_-32px_rgba(0,0,0,0.9)] ${card.className}`}
          animate={motionEnabled ? { y: [0, -12, 0] } : undefined}
          transition={
            motionEnabled
              ? {
                  duration: card.duration,
                  delay: card.delay,
                  ease: "easeInOut",
                  repeat: Number.POSITIVE_INFINITY,
                }
              : undefined
          }
        >
          <p className="text-xs uppercase tracking-[0.22em] text-accent-warm/85">
            {card.title}
          </p>
          <p className="mt-3 text-sm leading-6 text-muted-strong">
            {card.copy}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
