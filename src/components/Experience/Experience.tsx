import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useIntersection } from '../../hooks/useIntersection'
import { experiences } from '../../data/experience'
import { MapPin, Calendar, CheckCircle2, Briefcase } from 'lucide-react'

const TOTAL_EXPERIENCE = '5+ Years'

/* ── Local logo assets ── */
import dataSeersLogo  from '../../assets/dataseers.png'
import anandRathiLogo from '../../assets/anandrathi.png'
import weverseLogo    from '../../assets/weverse.png'
import torusLogo      from '../../assets/torus.png'
import indusLogo      from '../../assets/indus.png'

const ACCENTS: Record<string, {
  from: string; to: string; glow: string; initials: string; logo: string
}> = {
  'exp-0': { from: '#0076D6', to: '#3B9EFF', glow: 'rgba(0,118,214,0.18)',   initials: 'DS', logo: dataSeersLogo  },
  'exp-1': { from: '#D4AF37', to: '#F0CC5A', glow: 'rgba(212,175,55,0.18)',  initials: 'AR', logo: anandRathiLogo },
  'exp-2': { from: '#E6007A', to: '#FF3FA0', glow: 'rgba(230,0,122,0.18)',   initials: 'WD', logo: weverseLogo     },
  'exp-3': { from: '#35D6E7', to: '#7EEEF7', glow: 'rgba(53,214,231,0.18)',  initials: 'TD', logo: torusLogo       },
  'exp-4': { from: '#007A33', to: '#22C55E', glow: 'rgba(0,122,51,0.18)',    initials: 'MT', logo: indusLogo       },
}

/* Logo with graceful initials fallback */
function CompanyLogo({ logo, initials, accentFrom, accentTo, accentGlow, size = 'md' }: {
  logo: string; initials: string; accentFrom: string; accentTo: string; accentGlow: string; size?: 'sm' | 'md'
}) {
  const [imgFailed, setImgFailed] = useState(false)
  const smClass = 'w-9 h-9 xl:w-11 xl:h-11 2xl:w-14 2xl:h-14'
  const mdClass = 'w-14 h-14 xl:w-16 xl:h-16 2xl:w-20 2xl:h-20'
  return (
    <div
      className={`flex-shrink-0 flex items-center justify-center rounded-xl overflow-hidden ${size === 'sm' ? smClass : mdClass}`}
      style={{
        background: `linear-gradient(135deg, ${accentFrom}20, ${accentTo}30)`,
        border: `1.5px solid ${accentFrom}50`,
        boxShadow: `0 4px 18px ${accentGlow}`,
      }}
    >
      {!imgFailed ? (
        <img
          src={logo}
          alt={initials}
          onError={() => setImgFailed(true)}
          className="w-[75%] h-[75%]"
          style={{ objectFit: 'contain', borderRadius: 4 }}
        />
      ) : (
        <span
          className={size === 'sm' ? 'text-xs xl:text-sm 2xl:text-base' : 'text-lg xl:text-xl 2xl:text-2xl'}
          style={{ fontWeight: 900, color: accentTo, fontFamily: 'Inter, system-ui, sans-serif', letterSpacing: '-0.02em' }}
        >
          {initials}
        </span>
      )}
    </div>
  )
}

export default function Experience() {
  const [ref, visible] = useIntersection<HTMLDivElement>({ threshold: 0.1 })
  const [active, setActive] = useState('exp-0')

  const current = experiences.find(e => e.id === active)!
  const ac = ACCENTS[active]

  return (
    <section id="experience" className="relative flex flex-col justify-center overflow-hidden"
      style={{ minHeight: '100vh', paddingTop: '4rem', paddingBottom: '4rem' }}>

      {/* Ambient glows */}
      <div className="absolute pointer-events-none" style={{ top: '5%', right: '-8%', width: '45%', height: '55%', background: 'radial-gradient(ellipse, var(--p-faint) 0%, transparent 70%)' }} />
      <div className="absolute pointer-events-none" style={{ bottom: '10%', left: '-5%', width: '35%', height: '45%', background: 'radial-gradient(ellipse, rgba(var(--p-rgb), 0.05) 0%, transparent 70%)' }} />

      <div className="relative z-10 mx-auto w-full px-4 sm:px-6 2xl:px-12" style={{ maxWidth: 'min(1400px, 90vw)' }}>

        {/* Heading */}
        <div ref={ref} className="mb-6 md:mb-8">
          <motion.p initial={{ opacity: 0, x: -16 }} animate={visible ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.4 }}
            className="text-xs font-mono uppercase tracking-widest mb-2" style={{ color: 'var(--p)' }}>
            02 — Experience
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }}
            className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-extrabold tracking-tight"
            style={{ background: 'linear-gradient(110deg, #F0F0F5 0%, var(--p-light) 55%, var(--p) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Where I've Been
          </motion.h2>
        </div>

        <motion.div initial={{ opacity: 0, y: 24 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 }}>

          {/* ── MOBILE: horizontal scrollable tabs ── */}
          <div className="flex lg:hidden gap-2 overflow-x-auto pb-3 mb-4 no-scrollbar">
            {experiences.map(exp => {
              const a = ACCENTS[exp.id]
              const isActive = exp.id === active
              return (
                <button key={exp.id} onClick={() => setActive(exp.id)}
                  className="flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-300"
                  style={{
                    background: isActive ? `linear-gradient(135deg, ${a.from}22, ${a.to}14)` : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${isActive ? a.from + '60' : 'rgba(255,255,255,0.07)'}`,
                    boxShadow: isActive ? `0 4px 16px ${a.glow}` : 'none',
                  }}>
                  <CompanyLogo logo={a.logo} initials={a.initials} accentFrom={a.from} accentTo={a.to} accentGlow={a.glow} size="sm" />
                  <span className="text-xs font-semibold whitespace-nowrap" style={{ color: isActive ? '#F0F0F5' : '#9CA3AF' }}>
                    {exp.company.split(' ')[0]}
                  </span>
                </button>
              )
            })}
          </div>

          {/* ── DESKTOP: side-by-side ── */}
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6" style={{ minHeight: 'clamp(400px, 58vh, 800px)' }}>

            {/* Left: map timeline panel */}
            <div className="hidden lg:flex flex-col flex-shrink-0 relative rounded-2xl overflow-hidden"
              style={{ width: 'clamp(280px, 22vw, 400px)', minHeight: 'clamp(400px, 58vh, 800px)' }}>

              {/* Dark base */}
              <div className="absolute inset-0 rounded-2xl" style={{ background: '#080B12', border: '1px solid rgba(255,255,255,0.06)' }} />

              {/* Dot-grid map texture */}
              <div className="absolute inset-0 pointer-events-none" style={{
                backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.07) 1px, transparent 0)',
                backgroundSize: '22px 22px',
              }} />

              {/* Active accent ambient glow */}
              <div className="absolute inset-0 pointer-events-none transition-all duration-700" style={{
                background: `radial-gradient(ellipse 70% 50% at 15% 50%, ${ac.glow} 0%, transparent 65%)`,
              }} />

              {/* Curved dashed route connecting all pins */}
              <svg className="absolute inset-0 pointer-events-none w-full h-full" preserveAspectRatio="none"
                viewBox="0 0 100 100" style={{ overflow: 'visible' }}>
                <path
                  d="M 11,8 C 4,14 4,21 11,28 C 18,35 18,42 11,50 C 4,58 4,65 11,73 C 18,81 18,87 11,93"
                  fill="none"
                  stroke="rgba(255,255,255,0.22)"
                  strokeWidth="0.8"
                  strokeDasharray="3 5"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>

              {/* Entries — evenly distributed, pinned to SVG waypoints */}
              <div className="relative z-10 flex flex-col justify-between h-full px-3 xl:px-4 py-8 xl:py-10">
                {experiences.map(exp => {
                  const a = ACCENTS[exp.id]
                  const isActive = exp.id === active
                  return (
                    <button key={exp.id}
                      onMouseEnter={() => setActive(exp.id)}
                      onClick={() => setActive(exp.id)}
                      className="flex items-center gap-2.5 xl:gap-3 text-left transition-all duration-300"
                    >
                      {/* Location pin marker */}
                      <div className="flex-shrink-0 w-[26px] h-[26px] xl:w-8 xl:h-8 flex items-center justify-center rounded-full z-10 transition-all duration-300"
                        style={{
                          background: isActive ? `linear-gradient(135deg, ${a.from}, ${a.to})` : '#0F1520',
                          border: `2px solid ${isActive ? a.from : 'rgba(255,255,255,0.18)'}`,
                          boxShadow: isActive ? `0 0 18px ${a.glow}, 0 0 6px ${a.from}90` : 'none',
                        }}>
                        <MapPin size={11} style={{ color: isActive ? '#030712' : '#4B5563' }} fill={isActive ? '#030712' : 'none'} />
                      </div>

                      {/* Company card */}
                      <div className="flex items-center gap-2 xl:gap-2.5 flex-1 px-2.5 xl:px-3 py-2 xl:py-2.5 rounded-xl transition-all duration-300"
                        style={{
                          background: isActive ? `linear-gradient(135deg, ${a.from}18, ${a.to}0c)` : 'rgba(255,255,255,0.025)',
                          border: `1px solid ${isActive ? a.from + '55' : 'rgba(255,255,255,0.06)'}`,
                          boxShadow: isActive ? `0 4px 20px ${a.glow}` : 'none',
                        }}>
                        <CompanyLogo logo={a.logo} initials={a.initials} accentFrom={a.from} accentTo={a.to} accentGlow={a.glow} size="sm" />
                        <div className="min-w-0 flex-1">
                          <p className="text-xs xl:text-sm font-bold truncate leading-tight" style={{ color: isActive ? '#F0F0F5' : '#9CA3AF' }}>{exp.company}</p>
                          <p className="text-[10px] xl:text-xs truncate mt-0.5" style={{ color: isActive ? a.to : '#6B7280', fontWeight: isActive ? 600 : 400 }}>{exp.role}</p>
                          <p className="text-[10px] font-mono mt-0.5" style={{ color: '#4B5563' }}>{exp.period}</p>
                        </div>
                        {exp.current && (
                          <span className="flex-shrink-0 flex items-center gap-1 text-[9px] font-semibold px-1.5 py-0.5 rounded-full"
                            style={{ background: 'rgba(16,185,129,0.12)', color: '#34D399', border: '1px solid rgba(16,185,129,0.2)' }}>
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            Now
                          </span>
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Right: detail panel */}
            <div className="flex-1 relative rounded-2xl overflow-hidden" style={{ minWidth: 0 }}>
              <div className="absolute inset-0 pointer-events-none transition-all duration-500"
                style={{ background: `radial-gradient(55% 45% at 8% 8%, ${ac.glow} 0%, transparent 70%)` }} />
              <div className="absolute inset-0 rounded-2xl"
                style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.07)' }} />
              <div className="absolute top-0 left-8 right-8 h-[1px] transition-all duration-500"
                style={{ background: `linear-gradient(90deg, transparent, ${ac.from}99, transparent)` }} />

              <AnimatePresence mode="wait">
                <motion.div key={active} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
                  className="relative p-4 sm:p-6 lg:p-8 xl:p-10 2xl:p-12 flex flex-col gap-4 xl:gap-5 2xl:gap-6 h-full">

                  {/* Header */}
                  <div className="flex items-start gap-3 md:gap-4">
                    <CompanyLogo logo={ac.logo} initials={ac.initials} accentFrom={ac.from} accentTo={ac.to} accentGlow={ac.glow} size="md" />
                    <div>
                      <h3 className="text-base md:text-xl xl:text-2xl 2xl:text-3xl font-extrabold" style={{ color: '#F0F0F5' }}>{current.company}</h3>
                      <p className="text-xs md:text-sm xl:text-base font-bold mt-0.5"
                        style={{ background: `linear-gradient(90deg, ${ac.from}, ${ac.to})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                        {current.role}
                      </p>
                      <div className="flex flex-wrap gap-3 md:gap-4 mt-1.5">
                        <span className="flex items-center gap-1.5 text-xs font-mono" style={{ color: '#6B7280' }}>
                          <MapPin size={10} style={{ color: ac.from }} />{current.location}
                        </span>
                        <span className="flex items-center gap-1.5 text-xs font-mono" style={{ color: '#6B7280' }}>
                          <Calendar size={10} style={{ color: ac.from }} />{current.period}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div style={{ height: 1, background: 'rgba(255,255,255,0.06)' }} />

                  {/* Bullets */}
                  <ul className="flex flex-col gap-2 md:gap-2.5">
                    {current.bullets.map((b, i) => (
                      <li key={i} className="flex gap-2.5 text-xs md:text-sm xl:text-base 2xl:text-lg leading-relaxed" style={{ color: '#C0C4D0' }}>
                        <CheckCircle2 size={13} className="mt-0.5 flex-shrink-0" style={{ color: ac.from, opacity: 0.85 }} />
                        {b}
                      </li>
                    ))}
                  </ul>

                  {/* Total Experience card */}
                  <div className="flex items-center gap-4 px-4 py-3 xl:px-5 xl:py-4 rounded-xl"
                    style={{ background: `${ac.from}12`, border: `1px solid ${ac.from}30` }}>
                    <div className="flex-shrink-0 w-10 h-10 xl:w-12 xl:h-12 flex items-center justify-center rounded-full"
                      style={{ background: `${ac.from}22`, border: `1px solid ${ac.from}40` }}>
                      <Briefcase size={16} style={{ color: ac.to }} />
                    </div>
                    <div>
                      <p className="text-xs xl:text-sm font-medium" style={{ color: '#9CA3AF' }}>Total Experience</p>
                      <p className="text-xl xl:text-2xl 2xl:text-3xl font-extrabold leading-tight"
                        style={{ background: `linear-gradient(90deg, ${ac.from}, ${ac.to})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                        {TOTAL_EXPERIENCE}
                      </p>
                    </div>
                  </div>

                  {/* Stack */}
                  <div className="flex flex-wrap gap-1.5 md:gap-2 mt-auto pt-2">
                    {current.stack.map(tech => (
                      <span key={tech} className="px-2 py-0.5 md:px-2.5 md:py-1 xl:px-3 xl:py-1.5 text-[10px] md:text-xs xl:text-sm font-mono rounded-lg"
                        style={{ background: `${ac.from}18`, color: ac.to, border: `1px solid ${ac.from}35` }}>
                        {tech}
                      </span>
                    ))}
                  </div>

                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
