import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Props {
  cards: React.ReactNode[]
  label?: string   // e.g. "Skill" for "Skill 2 of 6"
}

const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0, scale: 0.96 }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit:  (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0, scale: 0.96 }),
}

export default function CardDeck({ cards, label = 'Card' }: Props) {
  const [[index, dir], setPage] = useState([0, 0])

  const go = useCallback((next: number) => {
    const d = next > index ? 1 : -1
    setPage([Math.max(0, Math.min(cards.length - 1, next)), d])
  }, [index, cards.length])

  /* Keyboard left / right */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go(index + 1)
      if (e.key === 'ArrowLeft')  go(index - 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [index, go])

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Card stage */}
      <div className="relative overflow-hidden" style={{ minHeight: 220 }}>
        <AnimatePresence custom={dir} mode="wait">
          <motion.div
            key={index}
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
            className="w-full"
          >
            {cards[index]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        {/* Dots */}
        <div className="flex items-center gap-2">
          {cards.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              className="rounded-full transition-all duration-200"
              style={{
                width:  i === index ? 20 : 6,
                height: 6,
                background: i === index
                  ? 'linear-gradient(90deg, var(--p), var(--p-dark))'
                  : 'rgba(255,255,255,0.15)',
              }}
              aria-label={`Go to ${label} ${i + 1}`}
            />
          ))}
        </div>

        {/* Counter + arrows */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono" style={{ color: '#6B7280' }}>
            {index + 1} / {cards.length}
          </span>
          <button
            onClick={() => go(index - 1)}
            disabled={index === 0}
            className="w-9 h-9 flex items-center justify-center rounded-xl transition-all duration-200"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: index === 0 ? '#374151' : '#9CA3AF',
            }}
            onMouseEnter={e => { if (index > 0) e.currentTarget.style.borderColor = 'rgba(59,130,246,0.4)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)' }}
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => go(index + 1)}
            disabled={index === cards.length - 1}
            className="w-9 h-9 flex items-center justify-center rounded-xl transition-all duration-200"
            style={{
              background: index < cards.length - 1 ? 'var(--p-subtle)' : 'rgba(255,255,255,0.04)',
              border: `1px solid ${index < cards.length - 1 ? 'var(--p-border)' : 'rgba(255,255,255,0.08)'}`,
              color: index === cards.length - 1 ? '#374151' : 'var(--p)',
            }}
            onMouseEnter={e => { if (index < cards.length - 1) e.currentTarget.style.background = 'var(--p-glow)' }}
            onMouseLeave={e => { if (index < cards.length - 1) e.currentTarget.style.background = 'var(--p-subtle)' }}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
