"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties, PointerEvent } from "react";
import type { PortfolioData } from "@/data/portfolio";
import { SignatureGlyph } from "@/components/ui/signature-glyph";
import { useMotionTier } from "@/components/ui/use-motion-tier";

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

    scheduleTiltFrame();
  };

  const handlePointerLeave = () => {
    targetTilt.current = { x: 0, y: 0 };
    scheduleTiltFrame();
  };

  return (
    <div
      ref={rootRef}
      className="relative mx-auto aspect-[0.92] w-full max-w-[540px]"
    >
      <div
        aria-hidden="true"
        className="hero-orbit-glow absolute inset-[14%] rounded-full bg-accent/18 blur-[120px]"
      />

      <div className="absolute inset-0 rounded-[2.25rem] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))]" />
      <div className="absolute inset-[7%] rounded-[2rem] border border-white/[0.06] [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:82px_82px] opacity-40" />

      <div className="hero-orbit-card-float absolute inset-[10%]">
        <div
          ref={tiltRef}
          className="hero-orbit-tilt h-full overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(160deg,rgba(15,20,31,0.96),rgba(10,13,21,0.9))] p-7 shadow-[0_32px_90px_-36px_rgba(0,0,0,0.85)] sm:p-8"
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
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
        </div>
      </div>

      {floatingCards.map((card) => (
        <div
          key={card.title}
          aria-hidden="true"
          className={`${card.visibilityClass} hero-orbit-badge-float pointer-events-none absolute rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(17,22,33,0.92),rgba(12,16,25,0.84))] p-4 shadow-[0_22px_60px_-32px_rgba(0,0,0,0.9)] ${card.className}`}
          style={
            {
              "--orbit-duration": `${card.duration}s`,
              "--orbit-delay": `${card.delay}s`,
            } as CSSProperties
          }
        >
          <p className="text-xs uppercase tracking-[0.22em] text-accent-warm/85">
            {card.title}
          </p>
          <p className="mt-3 text-sm leading-6 text-muted-strong">
            {card.copy}
          </p>
        </div>
      ))}
    </div>
  );
}
