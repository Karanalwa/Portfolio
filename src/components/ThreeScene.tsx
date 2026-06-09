import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

// 3D Particle Nebula
function ParticleNebula() {
  const count = 2000;
  const meshRef = useRef<THREE.Points>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, []);

  const colors = useMemo(() => {
    const cols = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const t = Math.random();
      // Copper/warm palette: mix of orange, gold, amber
      cols[i * 3] = 0.75 + t * 0.2;     // R: warm
      cols[i * 3 + 1] = 0.4 + t * 0.3;  // G: medium
      cols[i * 3 + 2] = 0.15 + t * 0.15; // B: low
    }
    return cols;
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.y = t * 0.02;
    meshRef.current.rotation.x = Math.sin(t * 0.01) * 0.1;

    // Subtle mouse follow
    const targetX = (state.mouse.x * 0.5);
    const targetY = (state.mouse.y * 0.5);
    mouseRef.current.x += (targetX - mouseRef.current.x) * 0.02;
    mouseRef.current.y += (targetY - mouseRef.current.y) * 0.02;
    meshRef.current.position.x = mouseRef.current.x;
    meshRef.current.position.y = mouseRef.current.y;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

// Floating geometric shapes
function FloatingShapes() {
  const groupRef = useRef<THREE.Group>(null);
  const shapes = useMemo(() => {
    return Array.from({ length: 15 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 6 - 3,
      ] as [number, number, number],
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0] as [number, number, number],
      scale: 0.1 + Math.random() * 0.3,
      speed: 0.2 + Math.random() * 0.5,
      type: i % 3, // 0: box, 1: sphere, 2: torus
    }));
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.children.forEach((child, i) => {
      child.rotation.x += 0.005 * shapes[i].speed;
      child.rotation.y += 0.008 * shapes[i].speed;
      child.position.y += Math.sin(t * shapes[i].speed + i) * 0.002;
    });
  });

  return (
    <group ref={groupRef}>
      {shapes.map((shape, i) => (
        <mesh key={i} position={shape.position} rotation={shape.rotation} scale={shape.scale}>
          {shape.type === 0 ? (
            <boxGeometry args={[1, 1, 1]} />
          ) : shape.type === 1 ? (
            <octahedronGeometry args={[0.6, 0]} />
          ) : (
            <torusGeometry args={[0.4, 0.15, 8, 20]} />
          )}
          <meshStandardMaterial
            color="#c17f4e"
            transparent
            opacity={0.15}
            wireframe
            emissive="#c17f4e"
            emissiveIntensity={0.3}
          />
        </mesh>
      ))}
    </group>
  );
}

// Connection lines between particles
function ConnectionLines() {
  const lineRef = useRef<THREE.LineSegments>(null);

  const linePositions = useMemo(() => {
    const points: number[] = [];
    const numPoints = 30;
    const positions: [number, number, number][] = [];

    for (let i = 0; i < numPoints; i++) {
      positions.push([
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 8 - 2,
      ]);
    }

    // Connect nearby points
    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        const dist = Math.sqrt(
          Math.pow(positions[i][0] - positions[j][0], 2) +
          Math.pow(positions[i][1] - positions[j][1], 2) +
          Math.pow(positions[i][2] - positions[j][2], 2)
        );
        if (dist < 5) {
          points.push(...positions[i], ...positions[j]);
        }
      }
    }

    return new Float32Array(points);
  }, []);

  useFrame((state) => {
    if (!lineRef.current) return;
    const t = state.clock.getElapsedTime();
    lineRef.current.rotation.y = t * 0.005;
  });

  return (
    <lineSegments ref={lineRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
      </bufferGeometry>
      <lineBasicMaterial color="#c17f4e" transparent opacity={0.06} />
    </lineSegments>
  );
}

// Main Scene
function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#c17f4e" />
      <pointLight position={[-10, -10, -5]} intensity={0.3} color="#4682B4" />
      <ParticleNebula />
      <FloatingShapes />
      <ConnectionLines />
    </>
  );
}

export default function ThreeScene() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
