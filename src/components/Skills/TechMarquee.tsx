import { useRef } from 'react'
import { motion } from 'framer-motion'
import { marqueeTechs } from '../../data/skills'

interface CardProps {
  name: string
  symbol: string
}
function TechCard({ name, symbol }: CardProps) {
  return (
    <div
      className="group flex items-center gap-2.5 px-4 py-2.5 rounded-lg mx-2 cursor-default transition-all duration-300 flex-shrink-0"
      style={{
        background: '#111111',
        border: '1px solid #1F1F1F',
        minWidth: 130,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = '#3B82F6'
        e.currentTarget.style.background = '#141414'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = '#1F1F1F'
        e.currentTarget.style.background = '#111111'
      }}
    >
      <span
        className="text-lg w-7 text-center transition-all duration-300"
        style={{ color: '#71717A', filter: 'grayscale(1)' }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.filter = 'none'; (e.currentTarget as HTMLElement).style.color = '#60A5FA' }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.filter = 'grayscale(1)'; (e.currentTarget as HTMLElement).style.color = '#71717A' }}
      >
        {symbol}
      </span>
      <span className="text-sm font-medium" style={{ color: '#A1A1AA' }}>{name}</span>
    </div>
  )
}

/* Infinite horizontal marquee strip */
function Strip({ items, reverse = false }: { items: typeof marqueeTechs; reverse?: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const doubled = [...items, ...items]

  return (
    <div
      className="overflow-hidden relative"
      onMouseEnter={() => {
        if (ref.current) ref.current.style.animationPlayState = 'paused'
      }}
      onMouseLeave={() => {
        if (ref.current) ref.current.style.animationPlayState = 'running'
      }}
    >
      <div
        ref={ref}
        className="flex"
        style={{
          animation: `marquee${reverse ? 'Reverse' : ''} 28s linear infinite`,
          width: 'max-content',
        }}
      >
        {doubled.map((t, i) => (
          <TechCard key={`${t.name}-${i}`} name={t.name} symbol={t.symbol} />
        ))}
      </div>
    </div>
  )
}

export default function TechMarquee() {
  const half = Math.ceil(marqueeTechs.length / 2)
  const row1 = marqueeTechs.slice(0, half)
  const row2 = marqueeTechs.slice(half)

  return (
    <>
      {/* Inject keyframes once */}
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes marqueeReverse {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
      `}</style>

      <div className="flex flex-col gap-3 w-full overflow-hidden">
        {/* Fade edges */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 w-16 z-10 pointer-events-none" style={{ background: 'linear-gradient(90deg, #0A0A0A, transparent)' }} />
          <div className="absolute inset-y-0 right-0 w-16 z-10 pointer-events-none" style={{ background: 'linear-gradient(-90deg, #0A0A0A, transparent)' }} />
          <Strip items={row1} />
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 w-16 z-10 pointer-events-none" style={{ background: 'linear-gradient(90deg, #0A0A0A, transparent)' }} />
          <div className="absolute inset-y-0 right-0 w-16 z-10 pointer-events-none" style={{ background: 'linear-gradient(-90deg, #0A0A0A, transparent)' }} />
          <Strip items={row2} reverse />
        </div>
      </div>
    </>
  )
}
