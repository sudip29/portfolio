import { useState, useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { ArrowRight, Mail } from 'lucide-react'
import { GithubIcon, LinkedinIcon, TwitterXIcon } from '../ui/BrandIcons'

function MagneticButton({ children, className, style, onClick, onMouseEnter, onMouseLeave }: {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  onClick?: () => void
  onMouseEnter?: (e: React.MouseEvent<HTMLButtonElement>) => void
  onMouseLeave?: (e: React.MouseEvent<HTMLButtonElement>) => void
}) {
  const ref = useRef<HTMLButtonElement>(null)
  const x = useMotionValue(0); const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 18 })
  const sy = useSpring(y, { stiffness: 200, damping: 18 })
  const handleMove = (e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width  / 2) * 0.28)
    y.set((e.clientY - r.top  - r.height / 2) * 0.28)
  }
  const handleLeave = (e: React.MouseEvent<HTMLButtonElement>) => { x.set(0); y.set(0); onMouseLeave?.(e) }
  return (
    <motion.button ref={ref} style={{ x: sx, y: sy, ...style }} className={className}
      onClick={onClick} onMouseMove={handleMove} onMouseEnter={onMouseEnter} onMouseLeave={handleLeave}>
      {children}
    </motion.button>
  )
}

const ROLES = ['Senior Data Engineer', 'SQL Architect', 'ETL Pipeline Builder', 'Database Performance Expert']

function useTypewriter(words: string[]) {
  const [index, setIndex] = useState(0)
  const [sub, setSub] = useState(0)
  const [rev, setRev] = useState(false)
  useEffect(() => {
    if (sub === words[index].length && !rev) { const t = setTimeout(() => setRev(true), 2200); return () => clearTimeout(t) }
    if (sub === 0 && rev) { setRev(false); setIndex(i => (i + 1) % words.length); return }
    const t = setTimeout(() => setSub(s => s + (rev ? -1 : 1)), rev ? 32 : 72)
    return () => clearTimeout(t)
  }, [sub, index, rev, words])
  return words[index].substring(0, sub)
}

const STATS = [
  { value: '4+', label: 'Years Exp.' },
  { value: '3',  label: 'DB Platforms' },
  { value: '100+', label: 'Procedures' },
]
const SOCIALS = [
  { icon: GithubIcon,   href: 'https://github.com/sudip-007',          label: 'GitHub' },
  { icon: LinkedinIcon, href: 'https://www.linkedin.com/in/sudip-shaw', label: 'LinkedIn' },
  { icon: TwitterXIcon, href: 'https://twitter.com/',                   label: 'Twitter' },
]

function scrollTo(id: string) { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }) }

export default function HeroText() {
  const typed = useTypewriter(ROLES)

  return (
    <div className="flex flex-col gap-4 md:gap-5 2xl:gap-6">

      {/* ── Label ── */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex items-center gap-2.5 md:gap-3"
      >
        <div style={{ width: 24, height: 2, background: 'linear-gradient(90deg, #F59E0B, #FBBF24)', borderRadius: 1 }}
          className="md:w-8" />
        <span className="text-[10px] sm:text-xs 2xl:text-sm font-mono uppercase tracking-[0.2em] font-semibold"
          style={{ color: '#F59E0B' }}>
          Senior Data Engineer
        </span>
        <div style={{ width: 24, height: 2, background: 'linear-gradient(90deg, #FBBF24, transparent)', borderRadius: 1 }}
          className="md:w-8" />
      </motion.div>

      {/* ── Name headline ── */}
      <div>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="font-medium text-sm md:text-base 2xl:text-lg"
          style={{ color: '#9CA3AF', marginBottom: 2 }}
        >
          Hi, I'm
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
          style={{
            /* clamp: 28px mobile → 6vw fluid → 112px 2xl+ */
            fontSize: 'clamp(28px, 6vw, 112px)',
            fontWeight: 900,
            letterSpacing: '-0.03em',
            lineHeight: 1.0,
            color: '#F0F0F5',
          }}
        >
          Sudip Kumar
        </motion.h1>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.42, ease: [0.4, 0, 0.2, 1] }}
          style={{
            fontSize: 'clamp(28px, 6vw, 112px)',
            fontWeight: 900,
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            background: 'linear-gradient(90deg, #F59E0B 0%, #FBBF24 50%, #FCD34D 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Shaw.
        </motion.h1>
      </div>

      {/* ── Typewriter ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.5 }}
        className="flex items-center gap-2 text-sm md:text-base 2xl:text-lg"
        style={{ color: '#9CA3AF' }}
      >
        <span style={{ color: '#F59E0B' }}>▸</span>
        <span style={{ color: '#E5E7EB', fontWeight: 500 }}>{typed}</span>
        <motion.span
          style={{ display: 'inline-block', width: 2, height: '1em', background: '#F59E0B', borderRadius: 1, verticalAlign: 'text-bottom' }}
          animate={{ opacity: [1, 0, 1] }}
          transition={{ repeat: Infinity, duration: 1.1 }}
        />
      </motion.div>

      {/* ── Description ── */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="text-sm md:text-base 2xl:text-lg"
        style={{ color: '#9CA3AF', lineHeight: 1.75, maxWidth: 500 }}
      >
        4+ years crafting high-performance data systems — stored procedures, ETL pipelines,
        query optimisation, and cloud architectures across MSSQL, MySQL, and Snowflake.
      </motion.p>

      {/* ── Stats ── */}
      <motion.div
        className="flex gap-2 md:gap-4"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.35, duration: 0.5 }}
      >
        {STATS.map(s => (
          <div
            key={s.label}
            className="flex flex-col items-center px-3 py-2 md:px-4 md:py-2.5 rounded-xl"
            style={{ background: 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.2)', minWidth: 60 }}
          >
            <span className="font-black text-base md:text-xl 2xl:text-2xl" style={{ color: '#FBBF24' }}>{s.value}</span>
            <span className="text-[10px] md:text-xs font-medium mt-0.5" style={{ color: '#6B7280' }}>{s.label}</span>
          </div>
        ))}
      </motion.div>

      {/* ── CTAs ── */}
      <motion.div
        className="flex flex-wrap gap-2 md:gap-3"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <MagneticButton
          onClick={() => scrollTo('projects')}
          className="group flex items-center gap-2 px-4 py-2.5 md:px-6 md:py-3 rounded-full text-xs md:text-sm font-bold transition-all duration-200"
          style={{ background: 'linear-gradient(135deg, #F59E0B, #D97706)', color: '#0A0B0F', boxShadow: '0 4px 24px rgba(245,158,11,0.35)' }}
          onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 6px 32px rgba(245,158,11,0.55)')}
          onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 4px 24px rgba(245,158,11,0.35)')}
        >
          View My Work
          <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-0.5" />
        </MagneticButton>

        <MagneticButton
          onClick={() => scrollTo('contact')}
          className="flex items-center gap-2 px-4 py-2.5 md:px-6 md:py-3 rounded-full text-xs md:text-sm font-semibold transition-all duration-200"
          style={{ color: '#F0F0F5', background: 'transparent', border: '1px solid rgba(245,158,11,0.3)' }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(245,158,11,0.6)'; e.currentTarget.style.background = 'rgba(245,158,11,0.08)' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(245,158,11,0.3)'; e.currentTarget.style.background = 'transparent' }}
        >
          <Mail size={13} />
          Get in Touch
        </MagneticButton>
      </motion.div>

      {/* ── Social icons ── */}
      <motion.div
        className="flex items-center gap-2 md:gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.7, duration: 0.5 }}
      >
        {SOCIALS.map(({ icon: Icon, href, label }) => (
          <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
            className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full transition-all duration-200"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#9CA3AF' }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = 'rgba(245,158,11,0.5)'; el.style.color = '#FBBF24'; el.style.background = 'rgba(245,158,11,0.08)' }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = 'rgba(255,255,255,0.1)'; el.style.color = '#9CA3AF'; el.style.background = 'rgba(255,255,255,0.04)' }}
          >
            <Icon size={14} />
          </a>
        ))}
        <span className="text-xs font-mono ml-1 hidden sm:block" style={{ color: '#4B5563' }}>
          sudipshaw29@gmail.com
        </span>
      </motion.div>

    </div>
  )
}
