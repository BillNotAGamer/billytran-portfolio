import {
  CanvasTexture,
  EquirectangularReflectionMapping,
  PMREMGenerator,
  SRGBColorSpace,
  type Texture,
  type WebGLRenderer,
} from "three";

import { HERO_MARK_CONFIG } from "@/lib/three/hero-mark-config";

/**
 * Every texture the hero scene uses is painted here at runtime on a 2D canvas.
 * Nothing is fetched: no HDRI, no sprite sheet, no model. That keeps the 3D
 * chunk self-contained and means the scene has no network dependency at all
 * once its JavaScript has arrived.
 */

function withAlpha(hex: string, alpha: number) {
  const value = Number.parseInt(hex.slice(1), 16);

  return `rgba(${(value >> 16) & 255}, ${(value >> 8) & 255}, ${value & 255}, ${alpha})`;
}

function createCanvas(width: number, height: number) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  return canvas;
}

export type DisposableEnvironment = {
  texture: Texture;
  dispose: () => void;
};

/**
 * The environment map, as a small equirectangular gradient with a few soft
 * light shapes painted into it, prefiltered through three's PMREMGenerator.
 *
 * This is what gives the tubes their glass/metal reflections. It replaces
 * drei's <Environment><Lightformer/></Environment>: that component is built
 * around loading an .hdr or .exr, so it drags RGBELoader, EXRLoader and
 * useLoader into the chunk for machinery this scene never uses.
 */
export function createHeroEnvironment(
  renderer: WebGLRenderer,
): DisposableEnvironment {
  const { environmentTopColor, environmentBottomColor, lightformers } =
    HERO_MARK_CONFIG.lighting;

  const canvas = createCanvas(256, 128);
  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("2D canvas context unavailable for the hero environment");
  }

  const sky = context.createLinearGradient(0, 0, 0, canvas.height);
  sky.addColorStop(0, environmentTopColor);
  sky.addColorStop(1, environmentBottomColor);
  context.fillStyle = sky;
  context.fillRect(0, 0, canvas.width, canvas.height);

  // "lighter" so overlapping lights add up the way real ones would.
  context.globalCompositeOperation = "lighter";

  for (const light of lightformers) {
    const radiusY = light.radiusV * canvas.height;
    const radiusX = light.radiusU * canvas.width;

    context.save();
    context.translate(light.u * canvas.width, light.v * canvas.height);
    // Drawn as a circle in a stretched space, so the gradient is elliptical too.
    context.scale(radiusX / radiusY, 1);

    const falloff = context.createRadialGradient(0, 0, 0, 0, 0, radiusY);
    falloff.addColorStop(0, withAlpha(light.color, light.strength));
    falloff.addColorStop(0.55, withAlpha(light.color, light.strength * 0.35));
    falloff.addColorStop(1, withAlpha(light.color, 0));

    context.fillStyle = falloff;
    context.beginPath();
    context.arc(0, 0, radiusY, 0, Math.PI * 2);
    context.fill();
    context.restore();
  }

  const equirectangular = new CanvasTexture(canvas);
  equirectangular.mapping = EquirectangularReflectionMapping;
  equirectangular.colorSpace = SRGBColorSpace;

  const generator = new PMREMGenerator(renderer);
  const target = generator.fromEquirectangular(equirectangular);

  // The render target owns the prefiltered cubemap from here on.
  generator.dispose();
  equirectangular.dispose();

  return {
    texture: target.texture,
    dispose: () => target.dispose(),
  };
}

/**
 * White radial falloff, tinted by the material. One additive plane behind the
 * mark wearing this is what stands in for a bloom pass.
 */
export function createGlowTexture() {
  const canvas = createCanvas(256, 256);
  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("2D canvas context unavailable for the hero glow");
  }

  const half = canvas.width / 2;
  const falloff = context.createRadialGradient(half, half, 0, half, half, half);
  falloff.addColorStop(0, "rgba(255, 255, 255, 0.95)");
  falloff.addColorStop(0.22, "rgba(255, 255, 255, 0.42)");
  falloff.addColorStop(0.52, "rgba(255, 255, 255, 0.12)");
  falloff.addColorStop(1, "rgba(255, 255, 255, 0)");

  context.fillStyle = falloff;
  context.fillRect(0, 0, canvas.width, canvas.height);

  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;

  return texture;
}

/** A soft round dot, so the particles are not hard squares. */
export function createParticleTexture() {
  const canvas = createCanvas(64, 64);
  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("2D canvas context unavailable for the hero particles");
  }

  const half = canvas.width / 2;
  const falloff = context.createRadialGradient(half, half, 0, half, half, half);
  falloff.addColorStop(0, "rgba(255, 255, 255, 1)");
  falloff.addColorStop(0.35, "rgba(255, 255, 255, 0.55)");
  falloff.addColorStop(1, "rgba(255, 255, 255, 0)");

  context.fillStyle = falloff;
  context.fillRect(0, 0, canvas.width, canvas.height);

  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;

  return texture;
}

export type ParticleField = {
  positions: Float32Array;
  colors: Float32Array;
};

/**
 * Positions and per-point colours for the drifting field, scattered through a
 * spherical shell that is flattened in z so it hugs the plane of the mark
 * rather than forming an obvious ball.
 *
 * Deterministic for a given count is not required, so this uses Math.random;
 * it runs once per quality step, never per frame.
 */
export function createParticleField(count: number): ParticleField {
  const { innerRadius, outerRadius } = HERO_MARK_CONFIG.particles;
  const { accent, accentSecondary, accentWarm } = HERO_MARK_CONFIG.colors;

  const palette = [accent, accentSecondary, accentWarm].map((hex) => {
    const value = Number.parseInt(hex.slice(1), 16);

    return [
      ((value >> 16) & 255) / 255,
      ((value >> 8) & 255) / 255,
      (value & 255) / 255,
    ] as const;
  });

  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  for (let index = 0; index < count; index += 1) {
    // Uniform direction on the sphere, then a radius inside the shell.
    const theta = Math.random() * Math.PI * 2;
    const cosPhi = Math.random() * 2 - 1;
    const sinPhi = Math.sqrt(1 - cosPhi * cosPhi);
    const radius = innerRadius + Math.random() * (outerRadius - innerRadius);

    positions[index * 3] = radius * sinPhi * Math.cos(theta);
    positions[index * 3 + 1] = radius * sinPhi * Math.sin(theta);
    positions[index * 3 + 2] = radius * cosPhi * 0.55;

    // Mostly accent, a few secondary, the occasional warm spark.
    const roll = Math.random();
    const [r, g, b] = palette[roll < 0.6 ? 0 : roll < 0.88 ? 1 : 2];

    colors[index * 3] = r;
    colors[index * 3 + 1] = g;
    colors[index * 3 + 2] = b;
  }

  return { positions, colors };
}
