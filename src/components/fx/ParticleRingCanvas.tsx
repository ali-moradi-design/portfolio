"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useIsMobile, usePageVisible } from "@/hooks/useMedia";
import { bindSceneScroll, sceneState } from "@/lib/sceneState";

const TEAL = new THREE.Color("#3FD0B8");
const WHITE = new THREE.Color("#f5f8f7");

type RingBand = {
  R: number;
  tube: number;
  y: number;
  tiltX: number;
  tiltZ: number;
  weight: number;
  teal: number;
};

const BANDS: RingBand[] = [
  { R: 2.42, tube: 0.07, y: 0.02, tiltX: 0.08, tiltZ: 0.02, weight: 1.05, teal: 0.58 },
  { R: 2.56, tube: 0.055, y: -0.015, tiltX: -0.05, tiltZ: 0.03, weight: 0.82, teal: 0.28 },
  { R: 2.7, tube: 0.08, y: 0.03, tiltX: 0.04, tiltZ: -0.025, weight: 1.2, teal: 0.62 },
  { R: 2.86, tube: 0.05, y: -0.02, tiltX: -0.07, tiltZ: 0.015, weight: 0.88, teal: 0.22 },
  { R: 3.0, tube: 0.075, y: 0.018, tiltX: 0.055, tiltZ: -0.03, weight: 1.15, teal: 0.48 },
  { R: 3.14, tube: 0.06, y: -0.028, tiltX: -0.03, tiltZ: 0.04, weight: 0.74, teal: 0.7 },
];

function hash(i: number) {
  const x = Math.sin(i * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

type HaloData = {
  dustGeo: THREE.BufferGeometry;
  nodeGeo: THREE.BufferGeometry;
  rest: Float32Array;
  theta: Float32Array;
  phase: Float32Array;
  kind: Float32Array;
  nodeRest: Float32Array;
  nodeTheta: Float32Array;
  nodePhase: Float32Array;
  count: number;
  nodeCount: number;
};

function pickBand(h: number): RingBand {
  const total = BANDS.reduce((s, b) => s + b.weight, 0);
  let t = h * total;
  for (const b of BANDS) {
    t -= b.weight;
    if (t <= 0) return b;
  }
  return BANDS[BANDS.length - 1];
}

function torusPoint(
  band: RingBand,
  u: number,
  v: number,
  jitter: number,
  out: THREE.Vector3,
) {
  const R = band.R + (jitter - 0.5) * band.tube * 1.8;
  const r = band.tube * (0.18 + jitter * 0.82);
  const x = (R + r * Math.cos(v)) * Math.cos(u);
  const y = r * Math.sin(v) * 0.42 + band.y;
  const z = (R + r * Math.cos(v)) * Math.sin(u);
  out.set(x, y, z);
  out.applyEuler(new THREE.Euler(band.tiltX, 0, band.tiltZ, "XYZ"));
}

function buildHalo(mobile: boolean): HaloData {
  const count = mobile ? 8800 : 12800;
  const nodeCount = mobile ? 90 : 150;
  const rest = new Float32Array(count * 3);
  const pos = new Float32Array(count * 3);
  const col = new Float32Array(count * 3);
  const theta = new Float32Array(count);
  const phase = new Float32Array(count);
  const kind = new Float32Array(count);
  const tmp = new THREE.Vector3();

  for (let i = 0; i < count; i++) {
    const h0 = hash(i);
    const h1 = hash(i + 19.17);
    const h2 = hash(i + 41.73);
    const h3 = hash(i + 73.31);
    const h4 = hash(i + 101.9);
    const band = pickBand(h0);
    const u = h1 * Math.PI * 2;
    const v = h2 * Math.PI * 2;
    torusPoint(band, u, v, h3, tmp);
    tmp.x += (hash(i + 3.1) - 0.5) * 0.11;
    tmp.y += (hash(i + 7.7) - 0.5) * 0.055;
    tmp.z += (hash(i + 11.3) - 0.5) * 0.11;
    const i3 = i * 3;
    rest[i3] = tmp.x;
    rest[i3 + 1] = tmp.y;
    rest[i3 + 2] = tmp.z;
    pos[i3] = tmp.x;
    pos[i3 + 1] = tmp.y;
    pos[i3 + 2] = tmp.z;
    theta[i] = u;
    phase[i] = h4;
    const tealMix = h4 < band.teal ? 0.92 : h4 < band.teal + 0.18 ? 0.45 : 0.06;
    kind[i] = tealMix;
    const c = WHITE.clone().lerp(TEAL, tealMix);
    const dim = 0.42 + h3 * 0.58;
    col[i3] = c.r * dim;
    col[i3 + 1] = c.g * dim;
    col[i3 + 2] = c.b * dim;
  }

  const nodeRest = new Float32Array(nodeCount * 3);
  const nodePos = new Float32Array(nodeCount * 3);
  const nodeCol = new Float32Array(nodeCount * 3);
  const nodeTheta = new Float32Array(nodeCount);
  const nodePhase = new Float32Array(nodeCount);

  for (let i = 0; i < nodeCount; i++) {
    const h0 = hash(i + 900);
    const h1 = hash(i + 917.4);
    const h2 = hash(i + 933.1);
    const band = pickBand(h0);
    const u = h1 * Math.PI * 2;
    const v = h2 * Math.PI * 2;
    torusPoint(band, u, v, 0.35, tmp);
    const i3 = i * 3;
    nodeRest[i3] = tmp.x;
    nodeRest[i3 + 1] = tmp.y;
    nodeRest[i3 + 2] = tmp.z;
    nodePos[i3] = tmp.x;
    nodePos[i3 + 1] = tmp.y;
    nodePos[i3 + 2] = tmp.z;
    nodeTheta[i] = u;
    nodePhase[i] = hash(i + 950);
    const tealMix = i % 3 === 0 ? 0.15 : 0.82;
    const c = WHITE.clone().lerp(TEAL, tealMix);
    nodeCol[i3] = c.r;
    nodeCol[i3 + 1] = c.g;
    nodeCol[i3 + 2] = c.b;
  }

  const dustGeo = new THREE.BufferGeometry();
  dustGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  dustGeo.setAttribute("color", new THREE.BufferAttribute(col, 3));
  dustGeo.computeBoundingSphere();
  if (dustGeo.boundingSphere) dustGeo.boundingSphere.radius = 10;

  const nodeGeo = new THREE.BufferGeometry();
  nodeGeo.setAttribute("position", new THREE.BufferAttribute(nodePos, 3));
  nodeGeo.setAttribute("color", new THREE.BufferAttribute(nodeCol, 3));
  nodeGeo.computeBoundingSphere();

  return {
    dustGeo,
    nodeGeo,
    rest,
    theta,
    phase,
    kind,
    nodeRest,
    nodeTheta,
    nodePhase,
    count,
    nodeCount,
  };
}

function Halo() {
  const group = useRef<THREE.Group>(null);
  const mobile = useIsMobile();
  const data = useMemo(() => buildHalo(mobile), [mobile]);

  useEffect(() => {
    bindSceneScroll();
    return () => {
      data.dustGeo.dispose();
      data.nodeGeo.dispose();
    };
  }, [data]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const scroll = sceneState.scroll;
    const pos = data.dustGeo.getAttribute("position") as THREE.BufferAttribute;
    const col = data.dustGeo.getAttribute("color") as THREE.BufferAttribute;
    const pa = pos.array as Float32Array;
    const ca = col.array as Float32Array;
    const { rest, theta, phase, kind, count } = data;

    for (let i = 0; i < count; i++) {
      const u = theta[i];
      const ph = phase[i];
      const breath = Math.sin(t * 0.32 + u * 3 + ph * 6) * 0.028;
      const lift = Math.cos(t * 0.24 + u * 2 + ph * 4) * 0.018;
      const swirl = Math.sin(t * 0.18 + u + ph * 2) * 0.022;
      const sMorph = scroll * (0.06 + ph * 0.05);
      const i3 = i * 3;
      const rx = rest[i3];
      const ry = rest[i3 + 1];
      const rz = rest[i3 + 2];
      const nx = rx / (Math.hypot(rx, rz) + 1e-5);
      const nz = rz / (Math.hypot(rx, rz) + 1e-5);
      pa[i3] = rx + nx * (breath + sMorph);
      pa[i3 + 1] = ry + lift + scroll * 0.04 * Math.sin(ph * 8);
      pa[i3 + 2] = rz + nz * (swirl + sMorph * 0.7);

      const shimmer = 0.55 + 0.45 * (0.5 + 0.5 * Math.sin(u * 9 - t * 1.4 + ph * 7));
      const pulse = Math.pow(Math.max(0, Math.sin(u * 5 - t * 0.9 + ph * 5)), 10);
      const mixW = 1 - kind[i];
      const boost = shimmer + pulse * 0.85;
      ca[i3] = (TEAL.r * (1 - mixW) + WHITE.r * mixW) * boost;
      ca[i3 + 1] = (TEAL.g * (1 - mixW) + WHITE.g * mixW) * boost;
      ca[i3 + 2] = (TEAL.b * (1 - mixW) + WHITE.b * mixW) * boost;
    }
    pos.needsUpdate = true;
    col.needsUpdate = true;

    const nPos = data.nodeGeo.getAttribute("position") as THREE.BufferAttribute;
    const nCol = data.nodeGeo.getAttribute("color") as THREE.BufferAttribute;
    const np = nPos.array as Float32Array;
    const nc = nCol.array as Float32Array;
    for (let i = 0; i < data.nodeCount; i++) {
      const u = data.nodeTheta[i];
      const ph = data.nodePhase[i];
      const i3 = i * 3;
      const breath = Math.sin(t * 0.28 + u * 2 + ph) * 0.02;
      np[i3] = data.nodeRest[i3] * (1 + breath * 0.15);
      np[i3 + 1] = data.nodeRest[i3 + 1] + Math.cos(t * 0.33 + ph) * 0.012;
      np[i3 + 2] = data.nodeRest[i3 + 2] * (1 + breath * 0.15);
      const hot = 0.7 + 0.3 * (0.5 + 0.5 * Math.sin(t * 3.2 + ph * 9));
      const w = i % 3 === 0 ? 0.82 : 0.18;
      nc[i3] = (TEAL.r * (1 - w) + WHITE.r * w) * hot;
      nc[i3 + 1] = (TEAL.g * (1 - w) + WHITE.g * w) * hot;
      nc[i3 + 2] = (TEAL.b * (1 - w) + WHITE.b * w) * hot;
    }
    nPos.needsUpdate = true;
    nCol.needsUpdate = true;

    const g = group.current;
    if (g) {
      g.rotation.y = t * 0.038 + scroll * 0.4;
      g.rotation.x = 0.42 + Math.sin(t * 0.07) * 0.035;
      g.rotation.z = Math.sin(t * 0.05) * 0.02;
    }
  });

  return (
    <group ref={group} scale={mobile ? 0.64 : 0.84}>
      <points geometry={data.dustGeo} frustumCulled={false}>
        <pointsMaterial
          vertexColors
          size={0.038}
          sizeAttenuation
          transparent
          opacity={0.88}
          depthWrite={false}
          depthTest={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
      <points geometry={data.nodeGeo} frustumCulled={false}>
        <pointsMaterial
          vertexColors
          size={0.072}
          sizeAttenuation
          transparent
          opacity={0.95}
          depthWrite={false}
          depthTest={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

export function ParticleRingCanvas() {
  const visible = usePageVisible();
  const mobile = useIsMobile();

  return (
    <Canvas
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      camera={{ position: [0, 1.5, 7.7], fov: 43 }}
      dpr={mobile ? 1 : [1, 1.5]}
      frameloop={visible ? "always" : "never"}
      style={{ width: "100%", height: "100%", pointerEvents: "none" }}
      onCreated={({ gl, camera }) => {
        gl.setClearColor(0x000000, 0);
        gl.outputColorSpace = THREE.SRGBColorSpace;
        gl.toneMapping = THREE.NoToneMapping;
        camera.lookAt(0, 0, 0);
      }}
    >
      <Halo />
    </Canvas>
  );
}
