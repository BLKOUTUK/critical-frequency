/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Tetrahedron, Octahedron, Box, Icosahedron, Torus, Cylinder, Cone } from '@react-three/drei';
import * as THREE from 'three';

// Explicitly declare intrinsic elements for React Three Fiber to satisfy TypeScript
declare global {
  namespace JSX {
    interface IntrinsicElements {
      group: any;
      meshStandardMaterial: any;
      lineSegments: any;
      edgesGeometry: any;
      lineBasicMaterial: any;
      meshBasicMaterial: any;
      ambientLight: any;
      pointLight: any;
      fog: any;
      directionalLight: any;
      color: any;
      meshPhysicalMaterial: any;
    }
  }
}

// Custom Float Implementation to avoid Drei context issues
const AnimatedGroup = ({ children, speed = 1 }: { children: React.ReactNode, speed?: number }) => {
    const group = useRef<THREE.Group>(null);
    useFrame((state) => {
        if (group.current) {
            const t = state.clock.getElapsedTime() * speed;
            group.current.position.y = Math.sin(t * 0.5) * 0.2;
            group.current.rotation.x = Math.sin(t * 0.3) * 0.1;
            group.current.rotation.z = Math.cos(t * 0.2) * 0.05;
        }
    });
    return <group ref={group}>{children}</group>;
};

const RadicalParticle = ({ position, color, geometry = 'tetra' }: { position: [number, number, number]; color: string; geometry?: 'tetra' | 'octa' }) => {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.getElapsedTime();
      ref.current.rotation.x = t * 0.2 + position[0];
      ref.current.rotation.y = t * 0.1 + position[1];
    }
  });

  return (
    <group position={position}>
        {geometry === 'tetra' ? (
            <Tetrahedron ref={ref} args={[1, 0]}>
                <meshStandardMaterial color="black" wireframe />
                <lineSegments>
                    <edgesGeometry args={[new THREE.TetrahedronGeometry(1)]} />
                    <lineBasicMaterial color={color} linewidth={2} />
                </lineSegments>
            </Tetrahedron>
        ) : (
             <Octahedron ref={ref} args={[0.8, 0]}>
                <meshStandardMaterial color={color} wireframe />
             </Octahedron>
        )}
    </group>
  );
};

// "Wayfinding Markers"
const Marker = ({ position, color }: {position: [number, number, number], color: string}) => {
    const ref = useRef<THREE.Group>(null);
    useFrame((state) => {
        if(ref.current) {
             ref.current.rotation.y += 0.005;
        }
    })
    return (
        <group position={position} ref={ref}>
            <Cone args={[0.5, 2, 4]} rotation={[Math.PI, 0, 0]}>
                <meshStandardMaterial color={color} wireframe />
            </Cone>
        </group>
    )
}

const HeroContent = () => {
  return (
    <>
      <ambientLight intensity={1.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#FF007F" />
      
      <AnimatedGroup speed={1}>
        {/* Symbolic shapes: Navigation Markers */}
        <RadicalParticle position={[0, 0, 0]} color="#111" geometry="tetra" />
        
        <Marker position={[-3, 1, -2]} color="#FF007F" />
        <Marker position={[3, -1, -1]} color="#0055FF" />
        
        {/* Connection Lines (Cables) */}
        <group>
           <Cylinder args={[0.02, 0.02, 8]} rotation={[0, 0, Math.PI/3]} position={[0,0,-4]}>
              <meshBasicMaterial color="#999" />
           </Cylinder>
        </group>
        
      </AnimatedGroup>
      
      {/* Fog to blend with paper background */}
      <fog attach="fog" args={['#F2F2F2', 5, 20]} />
    </>
  );
};

export const HeroScene: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 opacity-80 pointer-events-none mix-blend-multiply">
      {/* Clamp DPR to max 1.5 to prevent mobile overheating */}
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }} dpr={[1, 1.5]}>
        <color attach="background" args={['#F2F2F2']} />
        <HeroContent />
      </Canvas>
    </div>
  );
};

const HubContent = () => {
  return (
    <>
      <ambientLight intensity={1} />
      <directionalLight position={[5, 10, 5]} intensity={2} color="#fff" />
      
      <AnimatedGroup speed={0.5}>
        <group rotation={[0, -Math.PI / 4, 0]}>
          
          {/* Base Box (Subwoofer) */}
          <Box args={[2, 2, 2]} position={[0, -1, 0]}>
             <meshStandardMaterial color="#111" roughness={0.2} />
             <lineSegments>
                <edgesGeometry args={[new THREE.BoxGeometry(2, 2, 2)]} />
                <lineBasicMaterial color="#333" />
             </lineSegments>
          </Box>
          
          {/* Mid Box (Mids) */}
          <Box args={[1.8, 1.5, 1.8]} position={[0, 1, 0]}>
             <meshStandardMaterial color="#222" roughness={0.2} />
             <lineSegments>
                <edgesGeometry args={[new THREE.BoxGeometry(1.8, 1.5, 1.8)]} />
                <lineBasicMaterial color="#333" />
             </lineSegments>
          </Box>

          {/* Top Horn (Tweeter / Signal) */}
           <Cylinder args={[0.5, 1, 1, 4]} position={[0, 2.5, 0]}>
              <meshStandardMaterial color="#E6FF00" wireframe />
           </Cylinder>

           {/* The Signal Ring */}
           <Torus args={[2.5, 0.05, 16, 100]} rotation={[Math.PI/2, 0, 0]}>
               <meshBasicMaterial color="#FF007F" />
           </Torus>

        </group>
      </AnimatedGroup>
    </>
  );
}

// "The Beacon" / "Speaker Stack Totem"
export const CommunityHubScene: React.FC = () => {
  return (
    <div className="w-full h-full absolute inset-0">
      <Canvas camera={{ position: [4, 2, 6], fov: 45 }} dpr={[1, 1.5]}>
        <HubContent />
      </Canvas>
    </div>
  );
}