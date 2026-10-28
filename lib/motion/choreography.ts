import type { gsap as GsapType } from "gsap";
import type { ScrollTrigger as ScrollTriggerType } from "gsap/ScrollTrigger";
import type { SplitText as SplitTextType } from "gsap/SplitText";

import { DURATION, REVEAL_DISTANCE_PX, STAGGER } from "@/lib/motion/tokens";

type Gsap = typeof GsapType;
type ScrollTriggerStatic = typeof ScrollTriggerType;
type SplitTextStatic = typeof SplitTextType;

const EASE = "power3.out";

/**
 * Hand an element over from the Phase 1 CSS reveal system to GSAP. Removing
 * data-reveal means the stylesheet no longer has any opinion about it and
 * RevealObserver skips it, so exactly one system owns it at a time. Until this
 * runs - no JS, GSAP failing to load, or a non-"full" tier - the CSS reveal
 * keeps working.
 */
function claim<T extends HTMLElement>(selector: string): T[] {
  const elements = Array.from(document.querySelectorAll<T>(selector));

  for (const element of elements) {
    element.removeAttribute("data-reveal");
  }

  return elements;
}

export function scrollProgress(gsap: Gsap) {
  const bar = document.querySelector<HTMLElement>("[data-scroll-progress]");

  if (!bar) {
    return;
  }

  gsap.to(bar, {
    scaleX: 1,
    ease: "none",
    scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
  });
}

export function headingLines(gsap: Gsap, SplitText: SplitTextStatic) {
  for (const wrapper of claim<HTMLElement>("[data-gsap='heading-title']")) {
    // Split the heading itself, never the Reveal wrapper: SplitText rebuilds
    // its target's children, so pointing it at the wrapper would dismantle the
    // <h2> and lose everything after the first line.
    const heading = wrapper.querySelector<HTMLElement>("h2");

    if (!heading) {
      continue;
    }

    // aria: "auto" copies the original text onto an aria-label, so the heading
    // keeps one accessible name and screen readers never read the split lines.
    // autoSplit re-splits on resize and re-runs onSplit.
    SplitText.create(heading, {
      type: "lines",
      mask: "lines",
      aria: "auto",
      autoSplit: true,
      onSplit: (self) =>
        gsap.from(self.lines, {
          yPercent: 115,
          duration: DURATION.slow,
          ease: EASE,
          stagger: STAGGER.base,
          scrollTrigger: {
            trigger: heading,
            start: "top 85%",
            once: true,
          },
        }),
    });
  }

  // The pill and the body copy keep the same rise, just driven by GSAP so the
  // whole heading group shares one timeline feel.
  const supporting = claim<HTMLElement>(
    "[data-gsap='heading-pill'], [data-gsap='heading-copy']",
  );

  for (const element of supporting) {
    gsap.from(element, {
      y: REVEAL_DISTANCE_PX,
      opacity: 0,
      duration: DURATION.base,
      ease: EASE,
      scrollTrigger: { trigger: element, start: "top 90%", once: true },
    });
  }
}

export function journey(gsap: Gsap, ScrollTrigger: ScrollTriggerStatic) {
  const line = document.querySelector<HTMLElement>("[data-journey-line]");
  const items = Array.from(
    document.querySelectorAll<HTMLElement>("[data-journey-item]"),
  );
  const list = document.querySelector<HTMLElement>("[data-journey-list]");

  if (line && list) {
    gsap.set(line, { scaleY: 0, transformOrigin: "top center" });
    gsap.to(line, {
      scaleY: 1,
      ease: "none",
      scrollTrigger: {
        trigger: list,
        start: "top 70%",
        end: "bottom 85%",
        scrub: true,
      },
    });
  }

  items.forEach((item, index) => {
    gsap.from(item, {
      y: REVEAL_DISTANCE_PX,
      opacity: 0,
      duration: DURATION.base,
      ease: EASE,
      delay: index * STAGGER.base,
      scrollTrigger: { trigger: item, start: "top 88%", once: true },
    });

    // Marks the phase as reached once the drawn line gets there; CSS lifts the
    // card's border and number colour.
    ScrollTrigger.create({
      trigger: item,
      start: "top 70%",
      onEnter: () => item.setAttribute("data-journey-active", ""),
      onLeaveBack: () => item.removeAttribute("data-journey-active"),
    });
  });
}

export function featuredProjects(gsap: Gsap) {
  for (const card of claim<HTMLElement>("[data-gsap='project-card']")) {
    gsap.from(card, {
      opacity: 0,
      scale: 0.97,
      clipPath: "inset(14% 0% 0% 0% round 32px)",
      duration: DURATION.slow,
      ease: EASE,
      scrollTrigger: { trigger: card, start: "top 82%", once: true },
    });

    const media = card.querySelector<HTMLElement>("[data-project-media]");

    if (media) {
      gsap.fromTo(
        media,
        { yPercent: 6 },
        {
          yPercent: -6,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    }
  }
}

export function techStack(gsap: Gsap, ScrollTrigger: ScrollTriggerStatic) {
  const cards = claim<HTMLElement>("[data-gsap='tech-card']");

  if (cards.length === 0) {
    return;
  }

  gsap.set(cards, { opacity: 0, y: REVEAL_DISTANCE_PX });

  ScrollTrigger.batch(cards, {
    start: "top 88%",
    once: true,
    onEnter: (batch) => {
      gsap.to(batch, {
        opacity: 1,
        y: 0,
        duration: DURATION.base,
        ease: EASE,
        stagger: STAGGER.loose,
      });

      for (const card of batch) {
        const items = card.querySelectorAll<HTMLElement>("[data-tech-item]");

        gsap.from(items, {
          opacity: 0,
          y: 10,
          duration: DURATION.fast,
          ease: EASE,
          stagger: STAGGER.tight,
          delay: DURATION.fast,
        });
      }
    },
  });
}

export function backdropParallax(gsap: Gsap) {
  const layers = document.querySelectorAll<HTMLElement>("[data-parallax]");

  for (const layer of layers) {
    const amount = Number(layer.dataset.parallax) || 0;

    if (amount === 0) {
      continue;
    }

    // The backdrop is position: fixed, so the page itself is the trigger.
    gsap.to(layer, {
      yPercent: amount,
      ease: "none",
      scrollTrigger: { start: 0, end: "max", scrub: 0.6 },
    });
  }
}
