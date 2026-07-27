"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function ParticleField() {
  const ref = useRef<THREE.Points>(null!);
  const count = 2000;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 2.5 + Math.random() * 2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.05;
      ref.current.rotation.y = state.clock.elapsedTime * 0.08;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#6c63ff"
        size={0.015}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

function WireframeSphere() {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.15;
      ref.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1.8, 1]} />
      <meshBasicMaterial
        color="#00d9ff"
        wireframe
        transparent
        opacity={0.08}
      />
    </mesh>
  );
}

function FloatingRings() {
  const rings = useMemo(() => {
    const items = [];
    for (let i = 0; i < 4; i++) {
      const radius = 2.2 + i * 0.6;
      const rotation = (i * Math.PI) / 3;
      items.push({ radius, rotation, speed: 0.1 + i * 0.05 });
    }
    return items;
  }, []);

  return (
    <>
      {rings.map((ring, i) => (
        <Ring
          key={i}
          radius={ring.radius}
          initialRotation={ring.rotation}
          speed={ring.speed}
        />
      ))}
    </>
  );
}

function Ring({
  radius,
  initialRotation,
  speed,
}: {
  radius: number;
  initialRotation: number;
  speed: number;
}) {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x =
        initialRotation + state.clock.elapsedTime * speed;
      ref.current.rotation.z =
        initialRotation * 0.5 + state.clock.elapsedTime * speed * 0.7;
    }
  });

  return (
    <mesh ref={ref}>
      <torusGeometry args={[radius, 0.004, 16, 100]} />
      <meshBasicMaterial
        color={new THREE.Color().setHSL(0.7 + initialRotation * 0.1, 0.8, 0.6)}
        transparent
        opacity={0.15}
      />
    </mesh>
  );
}

export default function ThreeBackground() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.3} />
        <ParticleField />
        <WireframeSphere />
        <FloatingRings />
      </Canvas>
    </div>
  );
}
