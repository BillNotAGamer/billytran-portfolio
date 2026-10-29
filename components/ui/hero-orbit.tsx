"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties, PointerEvent } from "react";
import type { PortfolioData } from "@/data/portfolio";
import { HeroMark } from "@/components/three/hero-mark";
import { SignatureGlyph } from "@/components/ui/signature-glyph";
import { useMotionTier } from "@/components/ui/use-motion-tier";
import { clearHeroPointer, setHeroPointer } from "@/lib/motion/hero-signals";

/**
 * The badges only appear from xl up, and only in the mark's band.
 *
 * They are 160px wide, and from 1024 to 1279 there is nowhere in the box that
 * wide which is clear of both the card's text and the mark: the box is 416 to
 * 534px across, the card fills its width, and the mark sits in the middle of
 * the band. Rather than overlap something, they are hidden below xl - the
 * trade-off the composition brief asks for.
 *
 * From xl they straddle the box's left and right edges inside the band, which
 * carries no text, so they keep the "floating in front" reading without ever
 * covering card copy, the node sphere or the warm ring.
 */
const floatingCards = [
  {
    className: "-left-8 top-[4%] w-40",
    title: "Architecture",
    copy: "Systems that stay readable as product scope expands.",
    duration: 12,
    delay: 0,
    visibilityClass: "hidden xl:block",
  },
  {
    className: "-right-10 top-[17%] w-40",
    title: "Interface Craft",
    copy: "Strong visual restraint with clearer interaction rhythm.",
    duration: 14,
    delay: 0.6,
    visibilityClass: "hidden xl:block",
  },
  {
    className: "-left-8 top-[32%] w-40",
    title: "Mobile Delivery",
    copy: "Product continuity carried cleanly into the app surface.",
    duration: 15,
    delay: 0.3,
    visibilityClass: "hidden xl:block",
  },
] as const;

const MAX_TILT_DEGREES = 7;

// Approximates the previous spring (stiffness 140, damping 18, mass 0.45),
// which was slightly overdamped and so settled without overshoot.
const TILT_EASING = 0.14;
const TILT_SETTLED_DEGREES = 0.01;

export function HeroOrbit({ data: portfolioData }: { data: PortfolioData }) {
  const { pointerMotionEnabled } = useMotionTier();
  const rootRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const targetTilt = useRef({ x: 0, y: 0 });
  const currentTilt = useRef({ x: 0, y: 0 });
  const tiltFrame = useRef(0);

  // Pause the looping animations while the orbit is scrolled out of view.
  useEffect(() => {
    const root = rootRef.current;

    if (!root || typeof IntersectionObserver === "undefined") {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          root.removeAttribute("data-orbit-paused");
        } else {
          root.setAttribute("data-orbit-paused", "");
        }
      },
      { threshold: 0 },
    );

    observer.observe(root);

    return () => observer.disconnect();
  }, []);

  useEffect(
    () => () => {
      if (tiltFrame.current !== 0) {
        cancelAnimationFrame(tiltFrame.current);
      }

      clearHeroPointer();
    },
    [],
  );

  const runTiltFrame = () => {
    tiltFrame.current = 0;

    const element = tiltRef.current;

    if (!element) {
      return;
    }

    const target = targetTilt.current;
    const current = currentTilt.current;

    current.x += (target.x - current.x) * TILT_EASING;
    current.y += (target.y - current.y) * TILT_EASING;

    element.style.setProperty("--orbit-rotate-x", `${current.x}deg`);
    element.style.setProperty("--orbit-rotate-y", `${current.y}deg`);

    if (
      Math.abs(target.x - current.x) > TILT_SETTLED_DEGREES ||
      Math.abs(target.y - current.y) > TILT_SETTLED_DEGREES
    ) {
      tiltFrame.current = requestAnimationFrame(runTiltFrame);
    }
  };

  const scheduleTiltFrame = () => {
    if (tiltFrame.current === 0) {
      tiltFrame.current = requestAnimationFrame(runTiltFrame);
    }
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!pointerMotionEnabled || event.pointerType !== "mouse") {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const relativeX = (event.clientX - rect.left) / rect.width - 0.5;
    const relativeY = (event.clientY - rect.top) / rect.height - 0.5;

    targetTilt.current = {
      x: relativeY * -MAX_TILT_DEGREES,
      y: relativeX * MAX_TILT_DEGREES,
    };

    // The 3D mark behind the card reads the pointer from here, so one listener
    // drives both and the two tilt together rather than drifting apart.
    setHeroPointer(relativeX, relativeY);

    scheduleTiltFrame();
  };

  const handlePointerLeave = () => {
    targetTilt.current = { x: 0, y: 0 };
    clearHeroPointer();
    scheduleTiltFrame();
  };

  return (
    /*
     * The box is no longer a fixed aspect box with the card floated inside it.
     * It is a stage for the mark with the card stacked underneath, both in
     * normal flow, so the box grows to whatever the card needs. That is what
     * stops the card clipping its own description and tags below lg, and it is
     * what gives the mark a band of its own that no text ever crosses.
     */
    <div
      ref={rootRef}
      className="relative mx-auto w-full max-w-[540px] p-[6%] lg:p-[5%]"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div
        aria-hidden="true"
        className="hero-orbit-glow absolute inset-[14%] rounded-full bg-accent/18 blur-[120px]"
      />

      <div className="absolute inset-0 rounded-[2.25rem] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))]" />
      <div className="absolute inset-[3%] rounded-[2rem] border border-white/[0.06] [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:82px_82px] opacity-40" />

      {/*
        The mark's own band. Wider and shorter below lg so a phone does not get
        an enormous hero; at lg the ratio is set by what is left over once the
        card and the fold are accounted for.
      */}
      <div className="relative aspect-[1.62] lg:aspect-[1.5]">
        <HeroMark />
      </div>

      <div className="hero-orbit-card-float relative mt-[5%] lg:mt-[3%]">
        <div
          ref={tiltRef}
          className="hero-orbit-tilt overflow-hidden rounded-[1.75rem] border border-white/10 bg-[linear-gradient(160deg,rgba(14,19,30,0.97),rgba(9,12,20,0.95))] p-6 shadow-[0_32px_90px_-36px_rgba(0,0,0,0.85)] sm:p-7 lg:p-5"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(121,161,255,0.18),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(220,180,123,0.08),transparent_22%)]" />

          <div className="relative flex flex-col">
            {/*
              The eyebrow and the glyph share a row and the rule sits under
              them, instead of the rule being pinned 40px down the card where a
              wrapped eyebrow ran straight through it.
            */}
            <div className="flex items-center justify-between gap-4">
              <p className="whitespace-nowrap text-xs uppercase tracking-[0.2em] text-accent/80 sm:text-sm sm:tracking-[0.24em]">
                {portfolioData.hero.orbitEyebrow}
              </p>
              <SignatureGlyph
                size="sm"
                className="shrink-0 text-accent-warm/85"
              />
            </div>

            <div className="mt-3 h-px bg-[linear-gradient(90deg,transparent,rgba(141,224,255,0.35),transparent)]" />

            <h3 className="mt-3.5 font-display text-2xl font-semibold tracking-[-0.035em] text-foreground sm:text-[1.75rem] lg:text-[1.5rem]">
              {portfolioData.hero.orbitTitle}
            </h3>

            <p className="mt-3 text-sm leading-6 text-muted-strong">
              {portfolioData.hero.orbitDescription}
            </p>

            {/*
              Chips rather than a 2x2 grid of bordered boxes. Same four labels,
              122px of card height down to about 60, which is most of what buys
              the mark its band.
            */}
            <ul className="mt-4 flex flex-wrap gap-2">
              {portfolioData.heroOrbitTags.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-muted-strong"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {floatingCards.map((card) => (
        <div
          key={card.title}
          aria-hidden="true"
          className={`${card.visibilityClass} hero-orbit-badge-float pointer-events-none absolute rounded-[22px] border border-white/10 bg-[linear-gradient(180deg,rgba(17,22,33,0.95),rgba(12,16,25,0.9))] p-3.5 shadow-[0_22px_60px_-32px_rgba(0,0,0,0.9)] ${card.className}`}
          style={
            {
              "--orbit-duration": `${card.duration}s`,
              "--orbit-delay": `${card.delay}s`,
            } as CSSProperties
          }
        >
          {/* Tracking trimmed from 0.22em so the two-word titles stay on one
              line inside the narrower badge. */}
          <p className="whitespace-nowrap text-xs uppercase tracking-[0.16em] text-accent-warm/85">
            {card.title}
          </p>
          <p className="mt-2.5 text-[0.8rem] leading-5 text-muted-strong">
            {card.copy}
          </p>
        </div>
      ))}
    </div>
  );
}
