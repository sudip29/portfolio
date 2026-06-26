import { useState, useEffect } from 'react'

export interface MousePosition {
  x: number
  y: number
  /** Normalised to [-1, 1] relative to viewport center */
  nx: number
  ny: number
}

export function useMousePosition(): MousePosition {
  const [pos, setPos] = useState<MousePosition>({ x: 0, y: 0, nx: 0, ny: 0 })

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      setPos({
        x: e.clientX,
        y: e.clientY,
        nx: (e.clientX / window.innerWidth) * 2 - 1,
        ny: -((e.clientY / window.innerHeight) * 2 - 1),
      })
    }
    window.addEventListener('mousemove', handler, { passive: true })
    return () => window.removeEventListener('mousemove', handler)
  }, [])

  return pos
}
