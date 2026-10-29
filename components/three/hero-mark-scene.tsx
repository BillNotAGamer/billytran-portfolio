"use client";

import { PerformanceMonitor } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import type { RefObject } from "react";
import {
  AdditiveBlending,
  Color,
  type Group,
  MeshPhysicalMaterial,
  type Texture,
} from "three";

import {
  getHeroPointerX,
  getHeroPointerY,
  getHeroScrollProgress,
} from "@/lib/motion/hero-signals";
import { HERO_MARK_CONFIG } from "@/lib/three/hero-mark-config";
import {
  createGlowTexture,
  createHeroEnvironment,
  createParticleField,
  createParticleTexture,
} from "@/lib/three/hero-mark-textures";
import { buildHeroMarkGeometry } from "@/lib/three/signature-geometry";

/**
 * The 3D signature mark. This module is the whole async 3D chunk: it is only
 * ever reached through the dynamic import in components/three/hero-mark.tsx,
 * which loads it after hydration, at idle, and only when the motion tier is
 * "full" and WebGL is actually available.
 *
 * Everything it draws is procedural (see lib/three/signature-geometry.ts and
 * lib/three/hero-mark-textures.ts) and every look-and-feel number lives in
 * lib/three/hero-mark-config.ts.
 */

const DEGREES = Math.PI / 180;

type HeroMarkSceneProps = {
  /**
   * False while the hero is off screen or the tab is hidden. It switches the
   * render loop off entirely rather than throttling it, so an unseen hero costs
   * nothing at all.
   */
  active: boolean;
  /**
   * The element the scroll fade is written to. The crossfade from the static
   * SVG lives on its parent, so the two opacities multiply instead of fighting
   * over one property.
   */
  fadeRef: RefObject<HTMLDivElement | null>;
  onFirstFrame: () => void;
  onContextLost: () => void;
  onPerformanceFallback: () => void;
};

/**
 * Builds the environment map from a canvas painted at runtime and hangs it on
 * the scene. It needs the renderer to prefilter, so it has to live inside the
 * Canvas; `attach` lets R3F own putting it on and taking it off the scene, and
 * `dispose={null}` keeps the render target's lifetime here, where it is created.
 */
function ProceduralEnvironment() {
  const renderer = useThree((state) => state.gl);
  const environment = useMemo(
    () => createHeroEnvironment(renderer),
    [renderer],
  );

  useEffect(() => () => environment.dispose(), [environment]);

  return (
    <primitive
      object={environment.texture}
      attach="environment"
      dispose={null}
    />
  );
}

function SignatureMark({ fadeRef }: { fadeRef: HeroMarkSceneProps["fadeRef"] }) {
  const outer = useRef<Group>(null);
  const lastOpacity = useRef(-1);
  const tilt = useRef({ x: 0, y: 0 });

  const geometry = useMemo(() => buildHeroMarkGeometry(), []);

  const materials = useMemo(() => {
    const { lighting, materials: settings } = HERO_MARK_CONFIG;

    /**
     * Every geometry carries a colour attribute (see signature-geometry.ts), so
     * the material itself stays white and the hue - flat on the solids, a
     * gradient along the tubes - comes from the mesh. environmentIntensity is
     * folded in here rather than set on the scene, so it stays a single global
     * multiplier over the per-material values.
     *
     * The fields are listed one by one rather than spread: the config also
     * carries gradient endpoints, and MeshPhysicalMaterial warns about every
     * property it does not recognise.
     */
    const build = (values: typeof settings.primary) =>
      new MeshPhysicalMaterial({
        color: new Color(0xffffff),
        vertexColors: true,
        emissive: new Color(values.emissive),
        emissiveIntensity: values.emissiveIntensity,
        metalness: values.metalness,
        roughness: values.roughness,
        clearcoat: values.clearcoat,
        clearcoatRoughness: values.clearcoatRoughness,
        envMapIntensity: values.envMapIntensity * lighting.environmentIntensity,
        opacity: values.opacity,
        transparent: values.opacity < 1,
      });

    return {
      primary: build(settings.primary),
      secondary: build(settings.secondary),
      ring: build(settings.ring),
    };
  }, []);

  useEffect(
    () => () => {
      geometry.dispose();
      materials.primary.dispose();
      materials.secondary.dispose();
      materials.ring.dispose();
    },
    [geometry, materials],
  );

  useFrame(({ clock }) => {
    const node = outer.current;

    if (!node) {
      return;
    }

    const elapsed = clock.elapsedTime;
    const { geometry: shape, idle, pointer, scroll } = HERO_MARK_CONFIG;

    // Pointer tilt, eased the same way HeroOrbit eases the card in front.
    const targetX = -getHeroPointerY() * pointer.maxTiltDeg * DEGREES;
    const targetY = getHeroPointerX() * pointer.maxTiltDeg * DEGREES;

    tilt.current.x += (targetX - tilt.current.x) * pointer.damping;
    tilt.current.y += (targetY - tilt.current.y) * pointer.damping;

    const progress = getHeroScrollProgress();

    // Driven off elapsed time rather than delta, so the float is identical at
    // any frame rate and nothing accumulates into a spin.
    node.rotation.x =
      tilt.current.x +
      Math.sin(elapsed * idle.speedX) * idle.amplitudeXDeg * DEGREES;
    node.rotation.y =
      tilt.current.y +
      Math.sin(elapsed * idle.speedY) * idle.amplitudeYDeg * DEGREES +
      progress * scroll.rotationDeg * DEGREES;
    node.rotation.z =
      Math.sin(elapsed * idle.speedZ) * idle.amplitudeZDeg * DEGREES;

    const breathe =
      1 + Math.sin(elapsed * idle.breatheSpeed) * idle.breatheAmplitude;

    node.scale.setScalar(
      shape.markScale * breathe * (1 - progress * scroll.scaleDown),
    );

    // Fading in CSS rather than in materials keeps the particles, the glow and
    // the tubes on one opacity and avoids any transparency sorting.
    const opacity = 1 - progress * scroll.fade;
    const fade = fadeRef.current;

    if (fade && Math.abs(opacity - lastOpacity.current) > 0.002) {
      lastOpacity.current = opacity;
      fade.style.opacity = opacity.toFixed(3);
    }
  });

  const { center } = geometry;

  return (
    <group
      ref={outer}
      position={[
        HERO_MARK_CONFIG.geometry.offsetX,
        HERO_MARK_CONFIG.geometry.offsetY,
        0,
      ]}
    >
      {/* Inner offset puts the mark's own centre on the origin, so the outer
          group rotates and scales about the middle of the drawing. */}
      <group position={[-center.x, -center.y, -center.z]}>
        <mesh
          geometry={geometry.primaryStroke}
          material={materials.primary}
          dispose={null}
        />
        <mesh
          geometry={geometry.secondaryStroke}
          material={materials.secondary}
          dispose={null}
        />

        {geometry.primaryCaps.map((position) => (
          <mesh
            key={`primary-cap-${position.x}-${position.y}`}
            geometry={geometry.primaryCap}
            material={materials.primary}
            position={position}
            dispose={null}
          />
        ))}
        {geometry.secondaryCaps.map((position) => (
          <mesh
            key={`secondary-cap-${position.x}-${position.y}`}
            geometry={geometry.secondaryCap}
            material={materials.secondary}
            position={position}
            dispose={null}
          />
        ))}

        <mesh
          geometry={geometry.nodeSphere}
          material={materials.primary}
          position={geometry.nodeSpherePosition}
          dispose={null}
        />
        <mesh
          geometry={geometry.nodeRing}
          material={materials.ring}
          position={geometry.nodeSpherePosition}
          rotation={[
            HERO_MARK_CONFIG.geometry.nodeRingTiltXDeg * DEGREES,
            HERO_MARK_CONFIG.geometry.nodeRingTiltYDeg * DEGREES,
            0,
          ]}
          dispose={null}
        />
        <mesh
          geometry={geometry.nodeSecondary}
          material={materials.secondary}
          position={geometry.nodeSecondaryPosition}
          dispose={null}
        />
      </group>
    </group>
  );
}

/**
 * One additive plane carrying a painted radial falloff. This is the entire
 * "glow" budget - no postprocessing library is loaded, because a bloom pass
 * would cost more bytes and more fill rate than the look is worth here.
 */
function GlowPlane() {
  const texture = useMemo(() => createGlowTexture(), []);

  useEffect(() => () => texture.dispose(), [texture]);

  const { glow } = HERO_MARK_CONFIG;

  return (
    <mesh position={[0, 0, glow.depth]} renderOrder={-1}>
      <planeGeometry args={[glow.size, glow.size]} />
      <meshBasicMaterial
        map={texture}
        color={glow.color}
        transparent
        opacity={glow.strength}
        blending={AdditiveBlending}
        depthWrite={false}
        toneMapped={false}
      />
    </mesh>
  );
}

/**
 * The drifting field, as two Points layers so point size varies without a
 * custom shader. It drifts as a whole: rotating the container costs nothing per
 * frame, where moving every point would mean touching the position buffer and
 * re-uploading it 60 times a second for a motion nobody would read as different.
 */
function ParticleLayer({
  count,
  size,
  texture,
}: {
  count: number;
  size: number;
  texture: Texture;
}) {
  const field = useMemo(() => createParticleField(count), [count]);
  const { particles } = HERO_MARK_CONFIG;

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[field.positions, 3]}
        />
        <bufferAttribute attach="attributes-color" args={[field.colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        map={texture}
        size={size}
        sizeAttenuation
        vertexColors
        transparent
        opacity={particles.opacity}
        blending={AdditiveBlending}
        depthWrite={false}
        toneMapped={false}
      />
    </points>
  );
}

function ParticleField({ count }: { count: number }) {
  const container = useRef<Group>(null);
  const texture = useMemo(() => createParticleTexture(), []);

  useEffect(() => () => texture.dispose(), [texture]);

  const { particles } = HERO_MARK_CONFIG;
  const boldCount = Math.max(1, Math.round(count * particles.boldRatio));
  const fineCount = Math.max(1, count - boldCount);

  useFrame(({ clock }) => {
    const node = container.current;

    if (!node) {
      return;
    }

    const elapsed = clock.elapsedTime;

    node.rotation.y = elapsed * particles.driftSpeedY;
    node.rotation.x =
      Math.sin(elapsed * particles.driftSpeedX) * particles.driftSwayX;
  });

  return (
    <group ref={container}>
      {/* Keyed on the count so a quality step rebuilds the buffers cleanly
          instead of resizing an attribute in place. */}
      <ParticleLayer
        key={`fine-${fineCount}`}
        count={fineCount}
        size={particles.fineSize}
        texture={texture}
      />
      <ParticleLayer
        key={`bold-${boldCount}`}
        count={boldCount}
        size={particles.boldSize}
        texture={texture}
      />
    </group>
  );
}

/**
 * Reports the first frame that has actually reached the screen, so the wrapper
 * only starts the crossfade once there is something to cross-fade to. useFrame
 * runs before the render, hence the one-frame deferral.
 */
function FirstFrameSignal({ onFirstFrame }: { onFirstFrame: () => void }) {
  const reported = useRef(false);

  useFrame(() => {
    if (reported.current) {
      return;
    }

    reported.current = true;
    requestAnimationFrame(onFirstFrame);
  });

  return null;
}

/**
 * A lost context means the GPU is under pressure or the driver reset. The scene
 * hands back to the static SVG and stays there: preventDefault stops three
 * logging a draw error for every call, and no attempt is made to resume on
 * webglcontextrestored, because coming back only to lose it again is worse than
 * the static mark.
 */
function ContextLossGuard({ onContextLost }: { onContextLost: () => void }) {
  const renderer = useThree((state) => state.gl);

  useEffect(() => {
    const canvas = renderer.domElement;

    const handleLoss = (event: Event) => {
      event.preventDefault();
      onContextLost();
    };

    canvas.addEventListener("webglcontextlost", handleLoss);

    return () => canvas.removeEventListener("webglcontextlost", handleLoss);
  }, [renderer, onContextLost]);

  return null;
}

export default function HeroMarkScene({
  active,
  fadeRef,
  onFirstFrame,
  onContextLost,
  onPerformanceFallback,
}: HeroMarkSceneProps) {
  const { camera, lighting, particles, quality } = HERO_MARK_CONFIG;

  // 1 is full quality. PerformanceMonitor steps this down, which lowers both
  // the device pixel ratio and the particle count.
  const [qualityFactor, setQualityFactor] = useState(1);
  const floorDeclines = useRef(0);

  /**
   * maxDpr is a ceiling, not a target. Passing R3F a bare number sets the pixel
   * ratio outright, so on an ordinary 1x monitor the scene was rendering 1.75x
   * in each direction - about three times the pixels the display can show, for
   * no visible gain. Read once, because a window that moves between monitors is
   * rarer than a render.
   */
  const [deviceDpr] = useState(() =>
    typeof window === "undefined" ? 1 : window.devicePixelRatio || 1,
  );

  const ceiling = Math.min(
    quality.maxDpr,
    Math.max(quality.minDpr, deviceDpr),
  );
  const dpr = quality.minDpr + (ceiling - quality.minDpr) * qualityFactor;

  const particleCount = Math.round(
    particles.count *
      (particles.minCountRatio +
        (1 - particles.minCountRatio) * qualityFactor),
  );

  return (
    <Canvas
      aria-hidden="true"
      frameloop={active ? "always" : "never"}
      dpr={dpr}
      camera={{ position: [0, 0, camera.distance], fov: camera.fov }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      onCreated={({ gl }) => {
        gl.toneMappingExposure = lighting.toneMappingExposure;
      }}
      style={{ pointerEvents: "none" }}
    >
      <PerformanceMonitor
        ms={quality.sampleMs}
        iterations={quality.iterations}
        step={quality.step}
        flipflops={quality.flipflops}
        onChange={({ factor }) =>
          setQualityFactor((previous) =>
            previous === factor ? previous : factor,
          )
        }
        onIncline={() => {
          floorDeclines.current = 0;
        }}
        onDecline={({ factor }) => {
          // The flipflop counter cannot tell "oscillating" from "pinned at the
          // floor", and a device that is simply always too slow only ever does
          // the latter. Catch that case explicitly.
          if (factor > 0) {
            floorDeclines.current = 0;

            return;
          }

          floorDeclines.current += 1;

          if (floorDeclines.current >= quality.floorDeclinesBeforeFallback) {
            onPerformanceFallback();
          }
        }}
        onFallback={onPerformanceFallback}
      />

      <ProceduralEnvironment />
      <ambientLight intensity={lighting.ambientIntensity} />
      <directionalLight
        position={lighting.keyLight.position}
        intensity={lighting.keyLight.intensity}
        color={lighting.keyLight.color}
      />
      <directionalLight
        position={lighting.rimLight.position}
        intensity={lighting.rimLight.intensity}
        color={lighting.rimLight.color}
      />

      {HERO_MARK_CONFIG.glow.enabled ? <GlowPlane /> : null}
      <SignatureMark fadeRef={fadeRef} />
      <ParticleField count={particleCount} />

      <FirstFrameSignal onFirstFrame={onFirstFrame} />
      <ContextLossGuard onContextLost={onContextLost} />
    </Canvas>
  );
}
