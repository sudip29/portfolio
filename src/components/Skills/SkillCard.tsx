import { useState } from 'react'
import { motion } from 'framer-motion'
import type { SkillCategory } from '../../data/skills'

const CHIP_COLORS = [
  { bg: 'rgba(var(--p-rgb), 0.10)',  border: 'rgba(var(--p-rgb), 0.28)',  color: 'var(--p-light)' },
  { bg: 'rgba(139,92,246,0.10)',     border: 'rgba(139,92,246,0.25)',      color: '#C4B5FD' },
  { bg: 'rgba(6,182,212,0.10)',      border: 'rgba(6,182,212,0.25)',       color: '#67E8F9' },
  { bg: 'rgba(16,185,129,0.10)',     border: 'rgba(16,185,129,0.25)',      color: '#6EE7B7' },
  { bg: 'rgba(236,72,153,0.10)',     border: 'rgba(236,72,153,0.25)',      color: '#F9A8D4' },
  { bg: 'rgba(var(--p-rgb), 0.10)',  border: 'rgba(var(--p-rgb), 0.25)',   color: 'var(--p)' },
]

/* Simple Icons CDN helper */
const si = (slug: string, color = 'FFFFFF') =>
  `https://cdn.simpleicons.org/${slug}/${color}`

/* Devicons CDN helper */
const di = (name: string, variant = 'original') =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${name}/${name}-${variant}.svg`

const LOGOS: Record<string, string> = {
  /* Databases */
  'MSSQL':              si('microsoftsqlserver', 'CC2927'),
  'MySQL':              si('mysql', '4479A1'),
  'PostgreSQL':         si('postgresql', '4169E1'),

  /* ETL & Integration */
  'ETL Pipelines':      si('apacheairflow', '017CEE'),
  'SSIS':               si('microsoft', '0078D4'),
  'SSRS':               si('microsoftexcel', '217346'),
  'JDBC':               di('java', 'original'),
  'REST APIs':          si('postman', 'FF6C37'),

  /* Cloud */
  'Snowflake':          si('snowflake', '29B5E8'),
  'Azure (Basics)':     si('microsoftazure', '0078D4'),

  /* Programming */
  'Python':             si('python', '3776AB'),
  'JavaScript':         si('javascript', 'F7DF1E'),
  'Java':               di('java', 'original'),
  'SQL':                si('sqlite', '003B57'),
  'Bash':               si('gnubash', '4EAA25'),

  /* Frontend */
  'ReactJS':            si('react', '61DAFB'),
  'Spring Boot':        si('springboot', '6DB33F'),
  'HTML/CSS':           si('html5', 'E34F26'),

  /* Core Expertise */
  'DB Administration':      si('adminer', '34567C'),
  'Query Optimisation':     si('dbeaver', '382923'),
  'Data Mining':            si('apachespark', 'E25A1C'),
  'Data Processing':        si('apachekafka', '231F20'),
  'Performance Tuning':     si('prometheus', 'E6522C'),
  'Advanced MS Excel':      si('microsoftexcel', '217346'),
}

function SkillLogo({ skill }: { skill: string }) {
  const [failed, setFailed] = useState(false)
  const src = LOGOS[skill]
  if (!src || failed) return null
  return (
    <img
      src={src}
      alt={skill}
      onError={() => setFailed(true)}
      style={{ width: 20, height: 20, objectFit: 'contain', flexShrink: 0, opacity: 0.9 }}
    />
  )
}

interface Props {
  category: SkillCategory
  index: number
  visible: boolean
}

export default function SkillCard({ category, index, visible }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.4, 0, 0.2, 1] }}
      className="group flex flex-col gap-4 p-6 rounded-2xl transition-all duration-300 cursor-default"
      style={{
        background: 'rgba(255,255,255,0.03)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(255,255,255,0.07)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = 'var(--p-faint)'
        e.currentTarget.style.borderColor = 'var(--p-border)'
        e.currentTarget.style.boxShadow = '0 8px 40px var(--p-glow)'
        e.currentTarget.style.transform = 'translateY(-4px)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
        e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.3)'
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      <h3 className="text-xs font-mono font-bold uppercase tracking-widest" style={{ color: 'var(--p)' }}>
        {category.title}
      </h3>

      <div className="flex flex-wrap gap-2">
        {category.items.map((item, i) => {
          const c = CHIP_COLORS[i % CHIP_COLORS.length]
          return (
            <span
              key={item}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200"
              style={{ background: c.bg, color: c.color, border: `1px solid ${c.border}` }}
            >
              <SkillLogo skill={item} />
              {item}
            </span>
          )
        })}
      </div>
    </motion.div>
  )
}
