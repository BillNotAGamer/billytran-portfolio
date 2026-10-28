import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

import { setActiveLenis } from "@/lib/motion/scroll-to";

export type MotionTeardown = () => void;

let pluginsRegistered = false;

/**
 * Everything in this module and its imports lands in one async chunk that is
 * only ever requested on the "full" tier.
 */
export function initMotion(): MotionTeardown {
  if (!pluginsRegistered) {
    gsap.registerPlugin(ScrollTrigger);
    pluginsRegistered = true;
  }

  const lenis = new Lenis({ autoRaf: false });
  setActiveLenis(lenis);
  document.documentElement.classList.add("lenis", "lenis-smooth");

  lenis.on("scroll", ScrollTrigger.update);

  // One clock for both: gsap.ticker drives Lenis, so the scroll position and
  // every tween are resolved in the same frame.
  const tick = (time: number) => lenis.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);

  ScrollTrigger.refresh();

  return () => {
    for (const trigger of ScrollTrigger.getAll()) {
      trigger.kill();
    }

    gsap.ticker.remove(tick);
    lenis.destroy();
    setActiveLenis(null);
    document.documentElement.classList.remove("lenis", "lenis-smooth");
  };
}
