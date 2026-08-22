"use client";

import React, { useRef, useMemo, useEffect, useState, useSyncExternalStore } from "react";
import { Canvas, useFrame, extend } from "@react-three/fiber";
import { OrbitControls, Effects } from "@react-three/drei";
import { UnrealBloomPass } from "three-stdlib";
import * as THREE from "three";

// Register custom Three.js pass for React Three Fiber
extend({ UnrealBloomPass });

interface ParticleSwarmProps {
  count?: number;
  active?: boolean;
}

function createParticleBuffers(count: number) {
  const cur = new Float32Array(count * 3);
  const tar = new Float32Array(count * 3);
  let seed = 12345;
  const pseudoRandom = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    const px = (pseudoRandom() - 0.5) * 80;
    const py = (pseudoRandom() - 0.5) * 80;
    const pz = (pseudoRandom() - 0.5) * 80;
    cur[i3] = px;
    cur[i3 + 1] = py;
    cur[i3 + 2] = pz;
    tar[i3] = px;
    tar[i3 + 1] = py;
    tar[i3 + 2] = pz;
  }
  return { currentPos: cur, targetPos: tar };
}

const ParticleSwarm: React.FC<ParticleSwarmProps> = ({ count = 8000, active = true }) => {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const pColor = useMemo(() => new THREE.Color(), []);

  const buffersRef = useRef<{ currentPos: Float32Array; targetPos: Float32Array } | null>(null);
  if (buffersRef.current == null) {
    buffersRef.current = createParticleBuffers(count);
  }

  // Shared geometry & material
  const geometry = useMemo(() => new THREE.TetrahedronGeometry(0.22), []);
  const material = useMemo(() => new THREE.MeshBasicMaterial({ color: 0xffffff }), []);

  useEffect(() => {
    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, [geometry, material]);

  // Pre-calculated mathematical constants
  const mathConstants = useMemo(() => {
    const N = count;
    const nCurves = Math.floor(N * 0.75);
    const nRings = Math.floor(N * 0.12);
    const nCore = Math.floor(N * 0.05);
    const sheetDepth = 14;
    const halfTotal = Math.max(1, nCurves >> 1);
    const alongTotal = Math.max(1, Math.floor(halfTotal / sheetDepth));
    const ringPart = Math.floor(nRings * 0.7);
    const spokeTotal = Math.max(1, nRings - ringPart);
    const jetCount = Math.max(1, N - nCurves - nRings - nCore);
    const jetMax = Math.max(1, jetCount >> 1);
    const GOLDEN = Math.PI * (3 - Math.sqrt(5));

    return {
      nCurves,
      nRings,
      nCore,
      sheetDepth,
      alongTotal,
      ringPart,
      spokeTotal,
      jetMax,
      GOLDEN,
    };
  }, [count]);

  const spread = 60;
  const duality = 12;
  const breath = 1.0;
  const colorScale = spread * 0.5 + 0.0001;
  const jetExtent = spread * 1.8;

  useFrame((state) => {
    if (!meshRef.current || !active || !buffersRef.current) return;
    const time = state.clock.getElapsedTime();
    const { currentPos, targetPos } = buffersRef.current;

    const {
      nCurves,
      nRings,
      nCore,
      sheetDepth,
      alongTotal,
      ringPart,
      spokeTotal,
      jetMax,
      GOLDEN,
    } = mathConstants;

    const breathFactor = 1 + 0.07 * Math.sin(time * breath * 0.7);
    const corePulse = 1 + 0.3 * Math.sin(time * breath * 1.6);
    const coreR = spread * 0.04 * corePulse;
    const nCurvesAndRings = nCurves + nRings;
    const nCurvesRingsAndCore = nCurvesAndRings + nCore;

    for (let i = 0; i < count; i++) {
      let px = 0,
        py = 0,
        pz = 0;

      if (i < nCurves) {
        const sideSign = (i & 1) === 0 ? -1 : 1;
        const halfIdx = i >> 1;
        const layer = halfIdx % sheetDepth;
        const along = Math.floor(halfIdx / sheetDepth);
        const t = along / alongTotal;

        py = (1 - 2 * t) * spread * 0.95;

        const lobe = Math.abs(Math.sin(t * Math.PI * 2));
        const shimmer = 1 + 0.04 * Math.sin(t * Math.PI * 8 + time * 0.7);
        const radial = lobe * spread * 0.55 * breathFactor * shimmer;

        const u = (layer / (sheetDepth - 1)) * 2 - 1;
        const phi = u * Math.PI * 0.6;

        px = sideSign * (duality * 0.5 + radial * Math.cos(phi));
        pz = radial * Math.sin(phi);
      } else if (i < nCurvesAndRings) {
        const j = i - nCurves;
        if (j < ringPart) {
          const numRings = 5;
          const perRing = Math.max(1, Math.floor(ringPart / numRings));
          const ringIdx = Math.floor(j / perRing) % numRings;
          const onRing = j % perRing;
          const ringR = ((ringIdx + 1) / numRings) * spread * 0.4;
          const angR = (onRing / perRing) * Math.PI * 2 + time * 0.02;
          px = Math.cos(angR) * ringR;
          py = Math.sin(angR) * ringR;
          pz = 0;
        } else {
          const k = j - ringPart;
          const numSpokes = 4;
          const perSpoke = Math.max(1, Math.floor(spokeTotal / numSpokes));
          const spokeIdx = Math.floor(k / perSpoke) % numSpokes;
          const onSpoke = k % perSpoke;
          const spokeAng = (spokeIdx * Math.PI) / 4;
          const ts = (onSpoke / perSpoke) * 2 - 1;
          const dist = ts * spread * 0.42;
          px = Math.cos(spokeAng) * dist;
          py = Math.sin(spokeAng) * dist;
          pz = 0;
        }
      } else if (i < nCurvesRingsAndCore) {
        const j = i - nCurvesAndRings;
        const f = (j + 0.5) / Math.max(1, nCore);
        const yy = 1 - 2 * f;
        const rr = Math.sqrt(Math.max(0, 1 - yy * yy));
        const ang = j * GOLDEN + time * 0.3;
        px = Math.cos(ang) * rr * coreR;
        py = yy * coreR;
        pz = Math.sin(ang) * rr * coreR;
      } else {
        const j = i - nCurvesRingsAndCore;
        const sideSign = (j & 1) === 0 ? -1 : 1;
        const lidx = j >> 1;
        const baseT = lidx / jetMax;
        const yOff = (((lidx * 31) % 7) - 3) * 0.35;
        const zOff = (((lidx * 17) % 5) - 2) * 0.25;
        const phase = (((baseT + time * 0.45) % 1) + 1) % 1;
        px = sideSign * phase * jetExtent;
        py = yOff;
        pz = zOff;
      }

      const i3 = i * 3;
      targetPos[i3] = px;
      targetPos[i3 + 1] = py;
      targetPos[i3 + 2] = pz;

      // Inlined flat lerp
      currentPos[i3] += (targetPos[i3] - currentPos[i3]) * 0.1;
      currentPos[i3 + 1] += (targetPos[i3 + 1] - currentPos[i3 + 1]) * 0.1;
      currentPos[i3 + 2] += (targetPos[i3 + 2] - currentPos[i3 + 2]) * 0.1;

      const xNorm = Math.max(-1, Math.min(1, px / colorScale));
      const t01 = (xNorm + 1) * 0.5;
      const hue = 0.52 + 0.2 * t01;
      const absX = Math.min(1, Math.abs(xNorm));
      const proximity = 1 - absX;
      const prox2 = proximity * proximity;
      const lightness = 0.5 + 0.45 * prox2;
      const saturation = 1 - 0.85 * prox2;
      pColor.setHSL(hue, saturation, lightness);

      dummy.position.set(currentPos[i3], currentPos[i3 + 1], currentPos[i3 + 2]);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
      meshRef.current.setColorAt(i, pColor);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
  });

  return <instancedMesh ref={meshRef} args={[geometry, material, count]} />;
};

const emptySubscribe = () => () => {};

export const GlowingParticleField3D: React.FC<{ className?: string }> = ({ className = "" }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  if (!mounted) return null;

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const particleCount = isMobile ? 4500 : 8500;

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden ${className}`}
    >
      <Canvas
        camera={{ position: [0, 0, 100], fov: 60 }}
        gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }}
        dpr={[1, isMobile ? 1 : 1.5]}
        frameloop={isVisible ? "always" : "never"}
        className="w-full h-full"
      >
        <fog attach="fog" args={["#060608", 40, 200]} />
        <ParticleSwarm count={particleCount} active={isVisible} />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
        <Effects disableGamma>
          {/* @ts-expect-error UnrealBloomPass is extended into JSX elements */}
          <unrealBloomPass threshold={0} strength={isMobile ? 1.0 : 1.4} radius={0.35} />
        </Effects>
      </Canvas>
    </div>
  );
};
