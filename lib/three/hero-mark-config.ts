/**
 * Every look-and-feel value for the 3D hero mark, in one place.
 *
 * Nothing here affects whether the scene loads, how it is torn down, or any of
 * the tier and fallback logic - only how it looks and moves. Edit freely.
 *
 * COORDINATE SPACE
 * The geometry is derived from the same path data as the SignatureBlueprint SVG
 * (components/ui/signature-sprite.tsx), whose viewBox is 640x640. That square is
 * mapped onto a 2x2 world square centred on the origin, so one SVG user unit is
 * 1/320 of a world unit, and the mark spans roughly 1.34 x 1.42 world units
 * before `markScale` is applied.
 */

/** One SVG user unit, expressed in world units. */
export const SVG_UNIT = 1 / 320;

export const HERO_MARK_CONFIG = {
  /**
   * Brand palette, mirrored from the --accent* custom properties in
   * app/globals.css. Keep the two in sync by hand.
   */
  colors: {
    /** --accent. Primary stroke and node sphere. */
    accent: "#8de0ff",
    /** --accent-secondary. The trailing stroke. */
    accentSecondary: "#79a1ff",
    /** --accent-warm. The small ring and the warmest particles. */
    accentWarm: "#dcb47b",
  },

  camera: {
    /** Vertical field of view in degrees. Lower is flatter, more product-shot. */
    fov: 30,
    /** Distance from the origin. Larger means a smaller mark and less perspective. */
    distance: 4.2,
  },

  geometry: {
    /**
     * Overall size multiplier. 1.32 makes the mark slightly wider than the glass
     * card in front of it, so its arms and nodes read in the frame margin rather
     * than sitting entirely behind the card.
     */
    markScale: 1.32,
    /** Nudge the whole mark, in world units, after it is centred on itself. */
    offsetX: 0,
    offsetY: 0,
    /**
     * Tube radius in world units. The SVG stroke is 18 units wide, i.e. radius
     * 0.028; a little chunkier reads better with a specular highlight running
     * along it.
     */
    tubeRadius: 0.036,
    /** Lengthwise tube resolution. Below about 90 the corner bezier facets. */
    tubeSegments: 150,
    /** Radial tube resolution. 10 to 12 is plenty at this scale. */
    tubeRadialSegments: 12,
    /**
     * The two strokes are pushed apart in z so the mark has real depth. The SVG
     * fakes the same hierarchy with stroke-opacity 0.7 and 0.34.
     */
    primaryDepth: 0.085,
    secondaryDepth: -0.1,
    /** Primary node. The SVG circle is r=24, scaled a little for presence. */
    nodeSphereRadius: 24 * SVG_UNIT * 1.15,
    /** Secondary node. The SVG's fainter circle, r=16. */
    nodeSecondaryRadius: 16 * SVG_UNIT * 1.1,
    /**
     * A warm ring around the primary node, as a multiple of its radius. It sits
     * on the primary node rather than the secondary one because at desktop the
     * secondary node falls behind the top-right floating badge, and this is the
     * only place --accent-warm appears in the geometry.
     */
    nodeRingScale: 1.75,
    nodeRingThickness: 0.012,
    /** Tilt of the ring, in degrees, so it reads as a ring and not a circle. */
    nodeRingTiltXDeg: 24,
    nodeRingTiltYDeg: -18,
  },

  materials: {
    /** Primary stroke and node sphere: polished, lightly metallic glass. */
    primary: {
      metalness: 0.55,
      roughness: 0.16,
      clearcoat: 1,
      clearcoatRoughness: 0.12,
      /** Reflection strength. Raise for more chrome, lower for more matte. */
      envMapIntensity: 1.45,
      /** Self-lit floor, so the mark never goes black when turned away. */
      emissiveIntensity: 0.52,
      opacity: 1,
    },
    /** Trailing stroke: dimmer and softer, the SVG 0.34 layer. */
    secondary: {
      metalness: 0.4,
      roughness: 0.3,
      clearcoat: 0.6,
      clearcoatRoughness: 0.25,
      envMapIntensity: 1,
      emissiveIntensity: 0.32,
      /**
       * Below 1 the stroke becomes translucent. The two strokes never overlap on
       * screen - that is why the flat SVG reads cleanly - so this needs no depth
       * sorting care.
       */
      opacity: 0.78,
    },
    /** The warm ring around the second node. */
    ring: {
      metalness: 0.75,
      roughness: 0.22,
      envMapIntensity: 1.3,
      emissiveIntensity: 0.55,
      opacity: 0.9,
    },
  },

  lighting: {
    /** Overall environment reflection strength. */
    environmentIntensity: 1.0,
    /** Top and bottom of the background gradient painted into the env map. */
    environmentTopColor: "#1b2740",
    environmentBottomColor: "#05070c",
    /**
     * The soft light shapes painted into the environment, in equirectangular UV
     * space (u runs 0 to 1 around the sphere, v runs 0 to 1 top to bottom). The
     * env map is a small canvas gradient prefiltered with three's
     * PMREMGenerator, so nothing is fetched over the network.
     */
    lightformers: [
      /** Cool key light, high and slightly left of camera. */
      { u: 0.3, v: 0.2, radiusU: 0.26, radiusV: 0.3, color: "#8de0ff", strength: 1 },
      /** Soft blue fill on the opposite side. */
      { u: 0.74, v: 0.38, radiusU: 0.22, radiusV: 0.26, color: "#79a1ff", strength: 0.6 },
      /** Low warm bounce, for the rim along the bottom of the tubes. */
      { u: 0.52, v: 0.84, radiusU: 0.3, radiusV: 0.22, color: "#dcb47b", strength: 0.42 },
    ],
    /** Real lights on top of the environment, for crisper highlights. */
    ambientIntensity: 0.5,
    keyLight: {
      position: [1.6, 2.1, 2.4] as [number, number, number],
      intensity: 2.1,
      color: "#cfefff",
    },
    rimLight: {
      position: [-2.2, -1.1, -1.6] as [number, number, number],
      intensity: 1.3,
      color: "#79a1ff",
    },
    /**
     * Overall exposure. The single most useful knob if the mark looks washed out
     * or too dim.
     */
    toneMappingExposure: 1.18,
  },

  glow: {
    /**
     * One additive radial-gradient plane behind the mark. This stands in for a
     * bloom pass, so no postprocessing library is loaded.
     */
    enabled: true,
    /** 0 is off, 1 is as painted. Above about 0.6 it washes out the card text. */
    strength: 0.5,
    /** Diameter of the plane in world units. */
    size: 3.1,
    /** How far behind the mark it sits. */
    depth: -0.55,
    color: "#8de0ff",
  },

  particles: {
    /**
     * Sparse drifting field around the mark. `count` is the full-quality number;
     * PerformanceMonitor scales it down towards `minCountRatio` of it when the
     * frame rate drops.
     */
    count: 150,
    minCountRatio: 0.35,
    /** Spherical shell the field is scattered through, in world units. */
    innerRadius: 0.95,
    outerRadius: 1.95,
    /**
     * The field is drawn as two Points layers, so sizes vary without a custom
     * shader: `fineSize` for the majority and `boldSize` for the few given by
     * `boldRatio`. Sizes are world units and attenuate with distance.
     */
    fineSize: 0.009,
    boldSize: 0.026,
    boldRatio: 0.26,
    opacity: 0.6,
    /** Radians per second around y. Deliberately slow - this is a drift. */
    driftSpeedY: 0.045,
    /** Amplitude in radians, and speed, of the slow x-axis sway. */
    driftSwayX: 0.22,
    driftSpeedX: 0.07,
  },

  idle: {
    /**
     * The resting float. Amplitudes are peak degrees either side of neutral and
     * the three periods are deliberately non-harmonic, so the loop never reads
     * as a cycle. This is a breath, not a spin - no axis accumulates rotation.
     */
    amplitudeXDeg: 3.4,
    amplitudeYDeg: 5.6,
    amplitudeZDeg: 1.6,
    /** Radians per second of phase, i.e. 2*pi/period. 0.13 is about 48 s. */
    speedX: 0.17,
    speedY: 0.13,
    speedZ: 0.09,
    /** Scale breathing, plus and minus this fraction. */
    breatheAmplitude: 0.016,
    breatheSpeed: 0.3,
  },

  pointer: {
    /**
     * Pointer tilt. Mouse only, "full" tier only. Matched to the HeroOrbit card
     * tilt it sits behind, using the same mapping and the same easing factor so
     * the card and the mark move together rather than fighting.
     *
     * This is the full edge-to-edge sweep, so the mark reaches half of it -
     * 3.5 degrees - with the pointer at an edge. That is exactly what
     * HeroOrbit's MAX_TILT_DEGREES already produces.
     */
    maxTiltDeg: 7,
    /** Per-frame approach fraction. Lower is heavier and laggier. */
    damping: 0.14,
  },

  scroll: {
    /**
     * Driven by hero scroll progress: 0 at the top of the hero, 1 once the hero
     * has scrolled past. The value is published by the Phase 2 ScrollTrigger
     * scene, so the 3D adds no scroll listener of its own.
     */
    /** Extra degrees of y rotation eased in across the exit. */
    rotationDeg: 12,
    /** Fraction of scale shed across the exit. */
    scaleDown: 0.14,
    /** Fraction of opacity shed across the exit. 0.85 leaves a faint ghost. */
    fade: 0.85,
  },

  quality: {
    /** Device pixel ratio clamp. The renderer never leaves this range. */
    minDpr: 1,
    maxDpr: 1.75,
    /**
     * PerformanceMonitor sampling. One quality decision is taken every
     * sampleMs * iterations, so these give a decision about once a second.
     */
    sampleMs: 200,
    iterations: 5,
    /**
     * How much quality moves per decision. At 0.25 the scene can go from full
     * to minimum in four steps, i.e. about four seconds.
     */
    step: 0.25,
    /**
     * How many quality adjustments to allow before giving up and handing back
     * to the static SVG. Note this counts every adjustment, not just reversals,
     * so it has to be comfortably more than the number of steps from full to
     * minimum - otherwise a machine that merely stutters during page load would
     * lose the scene permanently.
     */
    flipflops: 8,
    /**
     * The other half of giving up. A device that is simply always too slow
     * never oscillates: it declines to the floor and stays there, which the
     * flipflop count alone reads as stability. This many further declines once
     * quality is already at its minimum means the scene is not worth keeping.
     */
    floorDeclinesBeforeFallback: 3,
  },

  /**
   * Crossfade from the static SVG to the canvas, in milliseconds. Must match the
   * .hero-mark-canvas transition duration in app/globals.css.
   */
  revealFadeMs: 520,
};

export type HeroMarkConfig = typeof HERO_MARK_CONFIG;
