import React, { useRef, useState, useEffect, Suspense } from "react";
import styled from "styled-components";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Text, OrbitControls, Stars } from "@react-three/drei";
import { motion, useScroll, useTransform } from "framer-motion";
import * as THREE from "three";

// Styled container for the 3D scene
const ThreeContainer = styled(motion.div)`
  width: 100%;
  height: 60vh;
  min-height: 400px;
  position: relative;
  background: linear-gradient(135deg, #1a0505 0%, #3d0c0c 100%);
  overflow: hidden;
  margin: 40px 0;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    height: 50vh;
    min-height: 300px;
    margin: 20px 0;
  }
`;

const Fallback = styled.div`
  width: 100%;
  height: 60vh;
  min-height: 400px;
  background: linear-gradient(135deg, #1a0505 0%, #3d0c0c 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Dancing Script", cursive;
  font-size: 2rem;
  color: #ffb4b4;
  text-align: center;
  padding: 20px;
`;

// 3D Heart between names
function Heart3D() {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.015;
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 2) * 0.1;
      
      const targetScale = hovered ? 1.2 : 1;
      meshRef.current.scale.setScalar(targetScale);
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={[0, 0, 0]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <sphereGeometry args={[0.3, 32, 32]} />
      <meshStandardMaterial
        color={hovered ? "#ff4d4d" : "#ff6b6b"}
        emissive="#ff0000"
        emissiveIntensity={0.5}
        metalness={0.3}
        roughness={0.4}
      />
    </mesh>
  );
}

// Text with glow effect
function GlowingText({ children, position, color = "#ffffff", fontSize = 0.8 }) {
  const textRef = useRef();

  useFrame((state) => {
    if (textRef.current) {
      textRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.05;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
      <Text
        ref={textRef}
        fontSize={fontSize}
        color={color}
        anchorX="center"
        anchorY="middle"
        position={position}
        outlineWidth={0.02}
        outlineColor="#ff6b6b"
        outlineOpacity={0.8}
      >
        {children}
      </Text>
    </Float>
  );
}

// Particle system for magical effect
function SparkleParticles() {
  const count = 200;
  const particlesRef = useRef();

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.002;
      particlesRef.current.rotation.x += 0.001;
    }
  });

  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 5;

    // Create pink-red gradient particles
    const redness = Math.random();
    colors[i * 3] = 1;
    colors[i * 3 + 1] = 0.3 + (0.4 * (1 - redness));
    colors[i * 3 + 2] = 0.3 + (0.4 * (1 - redness));
  }

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Main 3D Scene
function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#ff6b6b" />
      <pointLight position={[-10, -10, -10]} intensity={0.7} color="#ffffff" />
      <spotLight position={[0, 5, 0]} intensity={0.5} color="#ffb4b4" angle={0.5} penumbra={1} />
      
      {/* Names and heart */}
      <GlowingText position={[-1.7, 0, 0]} color="#ffb4b4" fontSize={0.9}>
        Cyra
      </GlowingText>
      
      <Heart3D />
      
      <GlowingText position={[1.8, 0, 0]} color="#ffb4b4" fontSize={0.9}>
        Aviral
      </GlowingText>
      
      {/* Subtitle */}
      <GlowingText position={[0, -1.5, 0]} color="#ff8585" fontSize={0.5}>
        Forever Together
      </GlowingText>
      
      <SparkleParticles />
      
      <Stars
        radius={100}
        depth={50}
        count={2000}
        factor={4}
        saturation={0}
        fade
        speed={0.5}
      />
      
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2.2}
        minPolarAngle={Math.PI / 2.8}
      />
    </>
  );
}

// Main component
export function ThreeDElement() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0.8]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.95]);

  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      setIsSupported(!!gl);
    } catch (e) {
      setIsSupported(false);
    }
  }, []);

  if (!isSupported) {
    return (
      <Fallback>
        <div>
          <h2>3D content not supported in your browser</h2>
          <p>Please try with a WebGL-enabled browser.</p>
        </div>
      </Fallback>
    );
  }

  return (
    <ThreeContainer style={{ opacity, scale }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{ 
          alpha: false,
          antialias: true,
          preserveDrawingBuffer: true
        }}
      >
        <color attach="background" args={['#1a0505']} />
        <Scene />
      </Canvas>
    </ThreeContainer>
  );
}
