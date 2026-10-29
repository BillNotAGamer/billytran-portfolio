import {
  Box3,
  type BufferGeometry,
  Color,
  CubicBezierCurve3,
  CurvePath,
  Float32BufferAttribute,
  LineCurve3,
  SphereGeometry,
  TorusGeometry,
  TubeGeometry,
  Vector3,
} from "three";

import { HERO_MARK_CONFIG } from "@/lib/three/hero-mark-config";

/**
 * Procedural geometry for the 3D signature mark.
 *
 * The numbers below are transcribed from the `signature-blueprint` symbol in
 * components/ui/signature-sprite.tsx, so the 3D mark and the static SVG
 * fallback are the same drawing. Nothing is loaded from a file.
 */

const SVG_HALF = 640 / 2;

type Point = readonly [number, number];

/** SVG user units to world units. y flips, because SVG counts downwards. */
function toWorld([x, y]: Point, z: number) {
  return new Vector3((x - SVG_HALF) / SVG_HALF, (SVG_HALF - y) / SVG_HALF, z);
}

/**
 * One signature stroke: a horizontal run, a cubic corner, then a vertical run up
 * to its node. The primary stroke is the SVG path
 * "M118 438H262C382 438 440 380 440 260V94".
 */
type StrokeSpec = {
  start: Point;
  corner: Point;
  control1: Point;
  control2: Point;
  cornerEnd: Point;
  end: Point;
};

const PRIMARY_STROKE: StrokeSpec = {
  start: [118, 438],
  corner: [262, 438],
  control1: [382, 438],
  control2: [440, 380],
  cornerEnd: [440, 260],
  end: [440, 94],
};

/** "M206 546H354C484 546 546 484 546 354V94". */
const SECONDARY_STROKE: StrokeSpec = {
  start: [206, 546],
  corner: [354, 546],
  control1: [484, 546],
  control2: [546, 484],
  cornerEnd: [546, 354],
  end: [546, 94],
};

/** The two circles: r=24 at (440, 94) and r=16 at (546, 94). */
const PRIMARY_NODE: Point = [440, 94];
const SECONDARY_NODE: Point = [546, 94];

function buildStroke(spec: StrokeSpec, z: number) {
  const { tubeRadius, tubeSegments, tubeRadialSegments } =
    HERO_MARK_CONFIG.geometry;

  const corner = toWorld(spec.corner, z);
  const cornerEnd = toWorld(spec.cornerEnd, z);

  // CurvePath.getPoint walks the segments by arc length, so TubeGeometry spaces
  // its rings evenly along the whole stroke rather than per segment.
  const path = new CurvePath<Vector3>();
  path.add(new LineCurve3(toWorld(spec.start, z), corner));
  path.add(
    new CubicBezierCurve3(
      corner,
      toWorld(spec.control1, z),
      toWorld(spec.control2, z),
      cornerEnd,
    ),
  );
  path.add(new LineCurve3(cornerEnd, toWorld(spec.end, z)));

  return new TubeGeometry(
    path,
    tubeSegments,
    tubeRadius,
    tubeRadialSegments,
    false,
  );
}

/**
 * Per-vertex colour running along a tube's length, read from the u coordinate
 * TubeGeometry already writes. The material carries white and multiplies by
 * this, so one material draws a gradient with no custom shader and nothing new
 * to install.
 */
function applyLengthGradient(geometry: BufferGeometry, from: string, to: string) {
  const uv = geometry.getAttribute("uv");
  const start = new Color(from);
  const end = new Color(to);
  const mixed = new Color();
  const colors = new Float32Array(uv.count * 3);

  for (let index = 0; index < uv.count; index += 1) {
    mixed.copy(start).lerp(end, uv.getX(index));
    colors[index * 3] = mixed.r;
    colors[index * 3 + 1] = mixed.g;
    colors[index * 3 + 2] = mixed.b;
  }

  geometry.setAttribute("color", new Float32BufferAttribute(colors, 3));
}

/**
 * The same attribute with one colour throughout, so the caps and the nodes can
 * share a vertexColors material with the tube they belong to. A geometry with
 * no colour attribute under such a material would render undefined.
 */
function applyFlatColor(geometry: BufferGeometry, hex: string) {
  const count = geometry.getAttribute("position").count;
  const color = new Color(hex);
  const colors = new Float32Array(count * 3);

  for (let index = 0; index < count; index += 1) {
    colors[index * 3] = color.r;
    colors[index * 3 + 1] = color.g;
    colors[index * 3 + 2] = color.b;
  }

  geometry.setAttribute("color", new Float32BufferAttribute(colors, 3));
}

export type HeroMarkGeometry = {
  primaryStroke: TubeGeometry;
  secondaryStroke: TubeGeometry;
  /**
   * TubeGeometry is open at both ends. These spheres cap every free end to
   * reproduce the SVG stroke-linecap="round"; ends that a node covers do not
   * get one. There is one per stroke because each carries its stroke's colour
   * at the end of the gradient where it sits.
   */
  primaryCap: SphereGeometry;
  primaryCaps: Vector3[];
  secondaryCap: SphereGeometry;
  secondaryCaps: Vector3[];
  /** The bright node, where the primary stroke ends. */
  nodeSphere: SphereGeometry;
  nodeSpherePosition: Vector3;
  /** A warm ring around that same node. */
  nodeRing: TorusGeometry;
  /** The fainter node, where the secondary stroke ends. */
  nodeSecondary: SphereGeometry;
  nodeSecondaryPosition: Vector3;
  /** Offset for the group so the mark is centred on its own bounds. */
  center: Vector3;
  dispose: () => void;
};

export function buildHeroMarkGeometry(): HeroMarkGeometry {
  const {
    tubeRadius,
    primaryDepth,
    secondaryDepth,
    nodeSphereRadius,
    nodeSecondaryRadius,
    nodeRingScale,
    nodeRingThickness,
  } = HERO_MARK_CONFIG.geometry;

  const primaryStroke = buildStroke(PRIMARY_STROKE, primaryDepth);
  const secondaryStroke = buildStroke(SECONDARY_STROKE, secondaryDepth);

  const nodeRingRadius = nodeSphereRadius * nodeRingScale;

  const primaryCap = new SphereGeometry(tubeRadius, 16, 12);
  const secondaryCap = new SphereGeometry(tubeRadius, 16, 12);
  const nodeSphere = new SphereGeometry(nodeSphereRadius, 36, 24);
  const nodeSecondary = new SphereGeometry(nodeSecondaryRadius, 28, 20);
  const nodeRing = new TorusGeometry(nodeRingRadius, nodeRingThickness, 12, 48);

  // Each stroke fades along its length; the cap sits at the start of its
  // gradient and the node it runs into sits at the end, so the colour is
  // continuous across the join.
  const { primary, secondary, ring } = HERO_MARK_CONFIG.materials;

  applyLengthGradient(primaryStroke, primary.gradientFrom, primary.gradientTo);
  applyLengthGradient(
    secondaryStroke,
    secondary.gradientFrom,
    secondary.gradientTo,
  );
  applyFlatColor(primaryCap, primary.gradientFrom);
  applyFlatColor(secondaryCap, secondary.gradientFrom);
  applyFlatColor(nodeSphere, primary.gradientTo);
  applyFlatColor(nodeSecondary, secondary.gradientTo);
  applyFlatColor(nodeRing, ring.gradientFrom);

  const nodeSpherePosition = toWorld(PRIMARY_NODE, primaryDepth);
  const nodeSecondaryPosition = toWorld(SECONDARY_NODE, secondaryDepth);

  // Each node swallows the end of its own stroke, so only the two free ends
  // need the sphere cap that stands in for stroke-linecap="round".
  const primaryCaps = [toWorld(PRIMARY_STROKE.start, primaryDepth)];
  const secondaryCaps = [toWorld(SECONDARY_STROKE.start, secondaryDepth)];

  primaryStroke.computeBoundingBox();
  secondaryStroke.computeBoundingBox();

  const bounds = new Box3();

  if (primaryStroke.boundingBox) {
    bounds.union(primaryStroke.boundingBox);
  }

  if (secondaryStroke.boundingBox) {
    bounds.union(secondaryStroke.boundingBox);
  }

  for (const [position, radius] of [
    [nodeSpherePosition, Math.max(nodeSphereRadius, nodeRingRadius)],
    [nodeSecondaryPosition, nodeSecondaryRadius],
  ] as const) {
    bounds.expandByPoint(position.clone().addScalar(radius));
    bounds.expandByPoint(position.clone().addScalar(-radius));
  }

  const center = bounds.getCenter(new Vector3());

  return {
    primaryStroke,
    secondaryStroke,
    primaryCap,
    primaryCaps,
    secondaryCap,
    secondaryCaps,
    nodeSphere,
    nodeSpherePosition,
    nodeRing,
    nodeSecondary,
    nodeSecondaryPosition,
    center,
    dispose: () => {
      primaryStroke.dispose();
      secondaryStroke.dispose();
      primaryCap.dispose();
      secondaryCap.dispose();
      nodeSphere.dispose();
      nodeSecondary.dispose();
      nodeRing.dispose();
    },
  };
}
