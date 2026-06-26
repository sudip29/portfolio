import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  onComplete: () => void
}

const NAME = 'Sudip Shaw'
const LETTERS = NAME.split('')

export default function LoadingScreen({ onComplete }: Props) {
  const [phase, setPhase] = useState<'enter' | 'hold' | 'exit'>('enter')

  useEffect(() => {
    // enter animation ~800ms → hold 300ms → exit ~400ms  = ~1500ms total
    const hold = setTimeout(() => setPhase('hold'), 800)
    const exit = setTimeout(() => setPhase('exit'), 1100)
    const done = setTimeout(() => onComplete(), 1600)
    return () => { clearTimeout(hold); clearTimeout(exit); clearTimeout(done) }
  }, [onComplete])

  return (
    <AnimatePresence>
      {phase !== 'exit' ? (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
          style={{ background: '#0A0A0A' }}
        >
          {/* Progress bar */}
          <motion.div
            className="absolute top-0 left-0 h-[2px]"
            style={{ background: '#3B82F6' }}
            initial={{ width: '0%' }}
            animate={{ width: phase === 'hold' ? '100%' : '75%' }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          />

          {/* Name letters */}
          <div className="flex items-center gap-1 overflow-hidden">
            {LETTERS.map((char, i) => (
              <motion.span
                key={i}
                className="text-4xl md:text-6xl font-bold tracking-tight"
                style={{ color: '#FAFAFA', fontFamily: 'Inter, sans-serif' }}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: i * 0.055,
                  duration: 0.45,
                  ease: [0.4, 0, 0.2, 1],
                }}
              >
                {char === ' ' ? ' ' : char}
              </motion.span>
            ))}
          </div>

          {/* Tagline */}
          <motion.p
            className="mt-3 text-sm font-mono tracking-widest uppercase"
            style={{ color: '#71717A' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.4 }}
          >
            Data &amp; Tech Engineer
          </motion.p>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
