import type { gsap as GsapType } from "gsap";

type Gsap = typeof GsapType;

const MAX_PULL_PX = 6;
const SETTLE_DURATION = 0.4;

/**
 * Magnetic primary CTAs. One delegated pointermove for the whole page, mouse
 * only, matching how the spotlight is driven. Translation is capped small
 * enough that the button never leaves its own hit area.
 */
export function magneticButtons(gsap: Gsap) {
  const quickSetters = new WeakMap<
    HTMLElement,
    { x: (value: number) => void; y: (value: number) => void }
  >();

  let activeButton: HTMLElement | null = null;
  let activeRect: DOMRect | null = null;

  const settersFor = (element: HTMLElement) => {
    let setters = quickSetters.get(element);

    if (!setters) {
      setters = {
        x: gsap.quickTo(element, "x", {
          duration: SETTLE_DURATION,
          ease: "power3.out",
        }),
        y: gsap.quickTo(element, "y", {
          duration: SETTLE_DURATION,
          ease: "power3.out",
        }),
      };
      quickSetters.set(element, setters);
    }

    return setters;
  };

  const release = (element: HTMLElement) => {
    const setters = settersFor(element);
    setters.x(0);
    setters.y(0);
  };

  const handlePointerMove = (event: PointerEvent) => {
    if (event.pointerType !== "mouse") {
      return;
    }

    const target = event.target;
    const button =
      target instanceof Element
        ? target.closest<HTMLElement>("[data-magnetic]")
        : null;

    if (button !== activeButton) {
      if (activeButton) {
        release(activeButton);
      }

      activeButton = button;
      activeRect = null;
    }

    if (!button) {
      return;
    }

    if (!activeRect) {
      activeRect = button.getBoundingClientRect();
    }

    const offsetX = event.clientX - (activeRect.left + activeRect.width / 2);
    const offsetY = event.clientY - (activeRect.top + activeRect.height / 2);
    const setters = settersFor(button);

    setters.x(gsap.utils.clamp(-MAX_PULL_PX, MAX_PULL_PX, offsetX * 0.3));
    setters.y(gsap.utils.clamp(-MAX_PULL_PX, MAX_PULL_PX, offsetY * 0.3));
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
    document.removeEventListener("pointermove", handlePointerMove);
    window.removeEventListener("scroll", invalidateRect);
    window.removeEventListener("resize", invalidateRect);

    if (activeButton) {
      gsap.set(activeButton, { x: 0, y: 0 });
    }
  };
}
