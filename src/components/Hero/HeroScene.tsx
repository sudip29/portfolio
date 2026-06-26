import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const KEYWORDS = [
  { label: 'SQL',        size: 0.20, color: '#60A5FA' },
  { label: 'MySQL',      size: 0.17, color: '#93C5FD' },
  { label: 'MSSQL',      size: 0.16, color: '#60A5FA' },
  { label: 'Snowflake',  size: 0.16, color: '#BAE6FD' },
  { label: 'AWS',        size: 0.19, color: '#FCD34D' },
  { label: 'ETL',        size: 0.18, color: '#60A5FA' },
  { label: 'Python',     size: 0.17, color: '#86EFAC' },
  { label: 'Azure',      size: 0.16, color: '#93C5FD' },
  { label: 'Spark',      size: 0.16, color: '#FCA5A5' },
  { label: 'Airflow',    size: 0.15, color: '#67E8F9' },
  { label: 'dbt',        size: 0.18, color: '#F9A8D4' },
  { label: 'Kafka',      size: 0.16, color: '#FCD34D' },
  { label: 'Power BI',   size: 0.15, color: '#FCA5A5' },
  { label: 'Tableau',    size: 0.15, color: '#93C5FD' },
  { label: 'Redshift',   size: 0.15, color: '#60A5FA' },
  { label: 'Data',       size: 0.20, color: '#BAE6FD' },
]

function makeTextTexture(label: string, color: string) {
  const canvas  = document.createElement('canvas')
  canvas.width  = 512
  canvas.height = 128
  const ctx = canvas.getContext('2d')!
  ctx.clearRect(0, 0, 512, 128)
  ctx.font      = 'bold 86px Arial, sans-serif'
  ctx.fillStyle = color
  ctx.textAlign    = 'center'
  ctx.textBaseline = 'middle'
  ctx.shadowColor  = color
  ctx.shadowBlur   = 18
  ctx.fillText(label, 256, 68)
  return new THREE.CanvasTexture(canvas)
}

/* Single keyword that always faces the camera (billboard) */
interface KWItemProps {
  pos: [number, number, number]
  w: number
  h: number
  texture: THREE.CanvasTexture
}
function KeywordItem({ pos, w, h, texture }: KWItemProps) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame(({ camera }) => {
    if (ref.current) ref.current.quaternion.copy(camera.quaternion)
  })
  return (
    <mesh ref={ref} position={pos}>
      <planeGeometry args={[w, h]} />
      <meshBasicMaterial map={texture} transparent depthWrite={false} />
    </mesh>
  )
}

function KeywordCloud() {
  const items = useMemo(() => {
    return KEYWORDS.map((kw, i) => {
      const phi   = Math.acos(1 - 2 * (i + 0.5) / KEYWORDS.length)
      const theta = Math.PI * (1 + Math.sqrt(5)) * i
      const r     = 0.28 + (i % 5) * 0.1
      const texture = makeTextTexture(kw.label, kw.color)
      const w = kw.size * (kw.label.length * 0.55 + 0.8)
      const h = kw.size * 1.2
      return {
        texture, w, h,
        pos: [
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta),
          r * Math.cos(phi),
        ] as [number, number, number],
      }
    })
  }, [])

  return (
    <>
      {items.map((item, i) => (
        <KeywordItem key={i} pos={item.pos} w={item.w} h={item.h} texture={item.texture} />
      ))}
    </>
  )
}

/* Glowing core orb */
function CoreOrb() {
  const ref = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    if (ref.current) {
      const mat = ref.current.material as THREE.MeshStandardMaterial
      mat.emissiveIntensity = 0.5 + Math.sin(clock.getElapsedTime() * 1.8) * 0.25
    }
  })
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.18, 32, 32]} />
      <meshStandardMaterial
        color="#1d4ed8"
        emissive="#3B82F6"
        emissiveIntensity={0.7}
        roughness={0.1}
        metalness={0.8}
      />
    </mesh>
  )
}

/* Floating particle cloud */
function Particles({ count = 120 }: { count?: number }) {
  const mesh = useRef<THREE.Points>(null)

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r     = 1.7 + Math.random() * 1.2
      const theta = Math.random() * Math.PI * 2
      const phi   = Math.acos(2 * Math.random() - 1)
      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)
    }
    return pos
  }, [count])

  useFrame(({ clock }) => {
    if (!mesh.current) return
    mesh.current.rotation.y = clock.getElapsedTime() * 0.05
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.032} color="#60A5FA" transparent opacity={0.5} sizeAttenuation depthWrite={false} />
    </points>
  )
}

function CoreSphere() {
  const groupRef  = useRef<THREE.Group>(null)
  const mouse     = useRef({ x: 0, y: 0 })
  const lerpMouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    lerpMouse.current.x += (mouse.current.x - lerpMouse.current.x) * 0.04
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.2 + lerpMouse.current.x * 0.5
      groupRef.current.rotation.x = 0
    }
  })

  return (
    <group ref={groupRef}>
      {/* Outer wireframe cage */}
      <mesh>
        <icosahedronGeometry args={[1.1, 1]} />
        <meshBasicMaterial color="#3B82F6" wireframe transparent opacity={0.35} />
      </mesh>

      {/* Inner smaller cage for depth */}
      <mesh>
        <icosahedronGeometry args={[0.72, 1]} />
        <meshBasicMaterial color="#60A5FA" wireframe transparent opacity={0.12} />
      </mesh>

      <KeywordCloud />
      <CoreOrb />

      {/* Equatorial ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.38, 0.006, 8, 90]} />
        <meshBasicMaterial color="#60A5FA" transparent opacity={0.3} />
      </mesh>
    </group>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[3, 3, 3]}   intensity={1.2} color="#3B82F6" />
      <pointLight position={[-3, -2, -3]} intensity={0.5} color="#818CF8" />
      <pointLight position={[0, 0, 2]}    intensity={0.4} color="#ffffff" />
      <CoreSphere />
      <Particles />
    </>
  )
}

export default function HeroScene() {
  return (
    <div className="w-full h-full" style={{ minHeight: 360 }}>
      <Canvas
        camera={{ position: [0, 0, 3.6], fov: 54 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
        dpr={[1, 1.5]}
      >
        <Scene />
      </Canvas>
    </div>
  )
}
