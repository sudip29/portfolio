import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function Cursor() {
  const [hovered,  setHovered]  = useState(false)
  const [clicking, setClicking] = useState(false)
  const [visible,  setVisible]  = useState(false)

  const mx = useMotionValue(-200)
  const my = useMotionValue(-200)

  /* Ring lags behind with spring */
  const rx = useSpring(mx, { stiffness: 140, damping: 18, mass: 0.6 })
  const ry = useSpring(my, { stiffness: 140, damping: 18, mass: 0.6 })

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return

    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX)
      my.set(e.clientY)
      if (!visible) setVisible(true)
    }
    const onOver  = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('a,button,[role="button"],input,textarea')) setHovered(true)
    }
    const onOut   = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('a,button,[role="button"],input,textarea')) setHovered(false)
    }
    const onDown  = () => setClicking(true)
    const onUp    = () => setClicking(false)
    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)

    window.addEventListener('mousemove',  onMove,  { passive: true })
    document.addEventListener('mouseover',  onOver)
    document.addEventListener('mouseout',   onOut)
    document.addEventListener('mousedown',  onDown)
    document.addEventListener('mouseup',    onUp)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)

    return () => {
      window.removeEventListener('mousemove',  onMove)
      document.removeEventListener('mouseover',  onOver)
      document.removeEventListener('mouseout',   onOut)
      document.removeEventListener('mousedown',  onDown)
      document.removeEventListener('mouseup',    onUp)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
    }
  }, [mx, my, visible])

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return null

  return (
    <>
      {/* Precise dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[202] rounded-full"
        style={{
          x: mx, y: my,
          translateX: '-50%', translateY: '-50%',
        }}
        animate={{
          width:   clicking ? 4 : 7,
          height:  clicking ? 4 : 7,
          opacity: visible ? 1 : 0,
          background: hovered ? '#60A5FA' : '#ffffff',
          scale: hovered ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
      />

      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[201] rounded-full"
        style={{
          x: rx, y: ry,
          translateX: '-50%', translateY: '-50%',
          border: '1.5px solid',
        }}
        animate={{
          width:       hovered ? 48 : clicking ? 28 : 36,
          height:      hovered ? 48 : clicking ? 28 : 36,
          borderColor: hovered ? 'rgba(96,165,250,0.9)' : 'rgba(255,255,255,0.45)',
          backgroundColor: hovered ? 'rgba(59,130,246,0.1)' : 'transparent',
          opacity: visible ? 1 : 0,
          scale: clicking ? 0.85 : 1,
        }}
        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
      />
    </>
  )
}
