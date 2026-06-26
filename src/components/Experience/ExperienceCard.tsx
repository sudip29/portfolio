import { motion } from 'framer-motion'
import { MapPin, Calendar, CheckCircle2 } from 'lucide-react'
import type { Experience } from '../../data/experience'

interface Props {
  exp: Experience
  index: number
  visible: boolean
}

/* Per-company accent colours */
const ACCENTS: Record<string, { from: string; to: string; glow: string; initials: string }> = {
  'exp-1': { from: '#3B82F6', to: '#60A5FA', glow: 'rgba(59,130,246,0.18)', initials: 'AR' },
  'exp-2': { from: '#8B5CF6', to: '#A78BFA', glow: 'rgba(139,92,246,0.18)',  initials: 'WD' },
  'exp-3': { from: '#06B6D4', to: '#67E8F9', glow: 'rgba(6,182,212,0.18)',   initials: 'TD' },
  'exp-4': { from: '#F59E0B', to: '#FCD34D', glow: 'rgba(245,158,11,0.18)',  initials: 'MT' },
}

export default function ExperienceCard({ exp, visible }: Props) {
  const ac = ACCENTS[exp.id] ?? ACCENTS['exp-1']

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
      className="relative rounded-2xl overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.03)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: `0 8px 40px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.04)`,
      }}
    >
      {/* Accent glow behind card */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `radial-gradient(60% 40% at 10% 0%, ${ac.glow} 0%, transparent 70%)`,
      }} />

      {/* Left accent bar */}
      <div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-2xl" style={{
        background: `linear-gradient(180deg, ${ac.from}, ${ac.to})`,
      }} />

      <div className="relative pl-8 pr-6 pt-6 pb-6 flex flex-col gap-5">

        {/* ── Company header ── */}
        <div className="flex items-start gap-4">

          {/* Logo badge */}
          <div
            className="flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center text-lg font-black tracking-tight select-none"
            style={{
              background: `linear-gradient(135deg, ${ac.from}22, ${ac.to}33)`,
              border: `1.5px solid ${ac.from}55`,
              color: ac.to,
              boxShadow: `0 4px 20px ${ac.glow}`,
              fontFamily: 'Inter, system-ui, sans-serif',
            }}
          >
            {ac.initials}
          </div>

          {/* Company name + role */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <div>
                <h3
                  className="text-xl font-extrabold leading-tight"
                  style={{ color: '#F0F0F5', letterSpacing: '-0.01em' }}
                >
                  {exp.company}
                </h3>
                <p
                  className="text-sm font-bold mt-0.5"
                  style={{
                    background: `linear-gradient(90deg, ${ac.from}, ${ac.to})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {exp.role}
                </p>
              </div>

              {exp.current && (
                <span
                  className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full flex-shrink-0"
                  style={{
                    background: 'rgba(16,185,129,0.12)',
                    color: '#34D399',
                    border: '1px solid rgba(16,185,129,0.25)',
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Current
                </span>
              )}
            </div>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-4 mt-2">
              <span className="flex items-center gap-1.5 text-xs font-mono" style={{ color: '#6B7280' }}>
                <MapPin size={11} style={{ color: ac.from }} />
                {exp.location}
              </span>
              <span className="flex items-center gap-1.5 text-xs font-mono" style={{ color: '#6B7280' }}>
                <Calendar size={11} style={{ color: ac.from }} />
                {exp.period}
              </span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: 'rgba(255,255,255,0.06)' }} />

        {/* Bullets */}
        <ul className="flex flex-col gap-2.5">
          {exp.bullets.map((b, i) => (
            <li key={i} className="flex gap-3 text-sm leading-relaxed" style={{ color: '#C0C4D0' }}>
              <CheckCircle2
                size={14}
                className="mt-0.5 flex-shrink-0"
                style={{ color: ac.from, opacity: 0.85 }}
              />
              {b}
            </li>
          ))}
        </ul>

        {/* Stack chips */}
        <div className="flex flex-wrap gap-2 pt-1">
          {exp.stack.map(tech => (
            <span
              key={tech}
              className="px-2.5 py-1 text-xs font-mono rounded-lg"
              style={{
                background: `${ac.from}18`,
                color: ac.to,
                border: `1px solid ${ac.from}35`,
              }}
            >
              {tech}
            </span>
          ))}
        </div>

      </div>
    </motion.div>
  )
}
