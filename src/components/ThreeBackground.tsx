'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function NeuralParticles() {
    const pointsRef = useRef<THREE.Points>(null!)
    const count = 1000

    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3)
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 50
            pos[i * 3 + 1] = (Math.random() - 0.5) * 50
            pos[i * 3 + 2] = (Math.random() - 0.5) * 50
        }
        return pos
    }, [])

    useFrame((state) => {
        const time = state.clock.getElapsedTime()
        pointsRef.current.rotation.y = time * 0.05
        pointsRef.current.rotation.x = time * 0.03
    })

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.15}
                color="#bf00ff"
                transparent
                opacity={0.6}
                sizeAttenuation
            />
        </points>
    )
}

function Connections() {
    const linesRef = useRef<THREE.Group>(null!)
    // In a real neural network background, we'd draw lines between close particles
    // For the prototype, we use a simple rotating wireframe sphere to simulate connections
    return (
        <mesh rotation={[Math.PI / 4, 0, 0]}>
            <sphereGeometry args={[20, 16, 16]} />
            <meshBasicMaterial color="#00ffff" wireframe transparent opacity={0.05} />
        </mesh>
    )
}

export default function ThreeBackground() {
    return (
        <div className="fixed inset-0 -z-10 bg-[#050505]">
            <Canvas camera={{ position: [0, 0, 30], fov: 75 }}>
                <color attach="background" args={['#050505']} />
                <ambientLight intensity={0.5} />
                <NeuralParticles />
                <Connections />
            </Canvas>
        </div>
    )
}
