import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

/* ── live counter that ticks up ── */
function LiveCounter({ target, duration = 2000, suffix = '' }: { target: number; duration?: number; suffix?: string }) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    let start = 0
    const step = target / (duration / 16)
    const id = setInterval(() => {
      start += step
      if (start >= target) { setVal(target); clearInterval(id) }
      else setVal(Math.floor(start))
    }, 16)
    return () => clearInterval(id)
  }, [target, duration])
  return <>{val.toLocaleString()}{suffix}</>
}

/* ── animated dot flowing along a line from (x1,y1) to (x2,y2) ── */
function FlowDot({ x1, y1, x2, y2, delay, color = '#F59E0B', dur = 1.8 }: {
  x1: number; y1: number; x2: number; y2: number
  delay: number; color?: string; dur?: number
}) {
  return (
    <motion.circle cx={x1} cy={y1} r={3}
      fill={color}
      style={{ filter: `drop-shadow(0 0 4px ${color})` }}
      animate={{ cx: [x1, x2], cy: [y1, y2], opacity: [0, 1, 1, 0] }}
      transition={{ repeat: Infinity, duration: dur, delay, ease: 'linear', times: [0, 0.1, 0.85, 1] }}
    />
  )
}

/* ── pipeline node card ── */
function PipeNode({ x, y, icon, label, sublabel, color, glow, delay = 0 }: {
  x: number; y: number; icon: string; label: string; sublabel: string
  color: string; glow: string; delay?: number
}) {
  return (
    <motion.g initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}>
      {/* glow bg */}
      <motion.ellipse cx={x + 44} cy={y + 22} rx={44} ry={24}
        fill={glow} animate={{ opacity: [0.5, 0.9, 0.5] }}
        transition={{ repeat: Infinity, duration: 2.5, delay }} />
      {/* card */}
      <foreignObject x={x} y={y} width={88} height={46}>
        <div style={{
          background: 'rgba(8,10,22,0.9)', border: `1px solid ${color}55`,
          borderRadius: 10, padding: '6px 8px', height: '100%', boxSizing: 'border-box',
          boxShadow: `0 0 16px ${glow}`,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{ fontSize: 14 }}>{icon}</span>
            <div>
              <p style={{ color: '#F0F0F5', fontSize: 10, fontWeight: 700, lineHeight: 1.2 }}>{label}</p>
              <p style={{ color: color, fontSize: 8, fontWeight: 600, lineHeight: 1.2, fontFamily: 'monospace' }}>{sublabel}</p>
            </div>
          </div>
        </div>
      </foreignObject>
    </motion.g>
  )
}

/* ── connection path ── */
function Pipe({ d, color = 'rgba(245,158,11,0.25)', delay = 0 }: { d: string; color?: string; delay?: number }) {
  return (
    <motion.path d={d} fill="none" stroke={color} strokeWidth={1.5}
      strokeDasharray="5 6" strokeLinecap="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 1, delay, ease: 'easeOut' }}
    />
  )
}

/* status badge */
function StatusDot({ active = true }: { active?: boolean }) {
  return (
    <motion.circle r={4} fill={active ? '#10B981' : '#6B7280'}
      animate={active ? { opacity: [1, 0.4, 1], r: [4, 5.5, 4] } : {}}
      transition={{ repeat: Infinity, duration: 1.6 }}
    />
  )
}

export default function HeroVisual() {
  /* SVG coordinate space: 520 × 560 */
  const W = 520, H = 560

  /* node anchor centres */
  const MSSQL  = { x: 30,  y: 50,  cx: 74,  cy: 73  }
  const MYSQL  = { x: 215, y: 50,  cx: 259, cy: 73  }
  const CSV    = { x: 400, y: 50,  cx: 444, cy: 73  }
  const ETL    = { x: 195, y: 195, cx: 239, cy: 218 }
  const SNOW   = { x: 195, y: 355, cx: 239, cy: 378 }
  const DASH   = { x: 30,  y: 480, cx: 74,  cy: 503 }
  const RPT    = { x: 400, y: 480, cx: 444, cy: 503 }

  const GOLD   = '#F59E0B'
  const BLUE   = '#3B82F6'
  const GREEN  = '#10B981'
  const PURPLE = '#8B5CF6'
  const CYAN   = '#06B6D4'

  return (
    <div className="relative w-full h-full select-none" style={{ minHeight: 480 }}>

      {/* faint grid bg */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)`,
        backgroundSize: '28px 28px',
        maskImage: 'radial-gradient(ellipse 85% 85% at 55% 45%, black 40%, transparent 80%)',
        WebkitMaskImage: 'radial-gradient(ellipse 85% 85% at 55% 45%, black 40%, transparent 80%)',
      }} />

      {/* ambient glow */}
      <div className="absolute pointer-events-none" style={{
        top: '10%', left: '15%', width: '70%', height: '60%',
        background: `radial-gradient(ellipse, rgba(245,158,11,0.07) 0%, transparent 70%)`,
        filter: 'blur(30px)',
      }} />

      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full" style={{ overflow: 'visible' }}>

        {/* ── PIPES ── */}
        {/* sources → ETL */}
        <Pipe d={`M${MSSQL.cx},${MSSQL.cy+0} Q${MSSQL.cx+40},${ETL.cy-60} ${ETL.cx},${ETL.cy}`} color="rgba(239,68,68,0.3)" delay={0.8} />
        <Pipe d={`M${MYSQL.cx},${MYSQL.cy}   L${ETL.cx},${ETL.cy}`}                              color="rgba(245,158,11,0.3)"  delay={0.9} />
        <Pipe d={`M${CSV.cx},${CSV.cy}   Q${CSV.cx-40},${ETL.cy-60} ${ETL.cx},${ETL.cy}`}        color="rgba(96,165,250,0.3)"  delay={1.0} />
        {/* ETL → Snowflake */}
        <Pipe d={`M${ETL.cx},${ETL.cy}  L${SNOW.cx},${SNOW.cy}`} color="rgba(139,92,246,0.4)" delay={1.1} />
        {/* Snowflake → outputs */}
        <Pipe d={`M${SNOW.cx},${SNOW.cy} Q${SNOW.cx-80},${DASH.cy-40} ${DASH.cx},${DASH.cy}`} color="rgba(16,185,129,0.3)" delay={1.2} />
        <Pipe d={`M${SNOW.cx},${SNOW.cy} Q${SNOW.cx+80},${RPT.cy-40}  ${RPT.cx},${RPT.cy}`}  color="rgba(6,182,212,0.3)"   delay={1.3} />

        {/* ── FLOW DOTS ── */}
        {/* MSSQL → ETL */}
        {[0, 0.6, 1.2].map(d => <FlowDot key={d} x1={MSSQL.cx} y1={MSSQL.cy} x2={ETL.cx} y2={ETL.cy} delay={d} color="#EF4444" dur={1.8} />)}
        {/* MySQL → ETL */}
        {[0.2, 0.8, 1.4].map(d => <FlowDot key={d} x1={MYSQL.cx} y1={MYSQL.cy} x2={ETL.cx} y2={ETL.cy} delay={d} color={GOLD} dur={1.6} />)}
        {/* CSV → ETL */}
        {[0.4, 1.0, 1.6].map(d => <FlowDot key={d} x1={CSV.cx} y1={CSV.cy} x2={ETL.cx} y2={ETL.cy} delay={d} color={BLUE} dur={2.0} />)}
        {/* ETL → Snowflake */}
        {[0, 0.5, 1.0, 1.5].map(d => <FlowDot key={d} x1={ETL.cx} y1={ETL.cy} x2={SNOW.cx} y2={SNOW.cy} delay={d} color={PURPLE} dur={1.4} />)}
        {/* Snowflake → Dash */}
        {[0.2, 0.9].map(d => <FlowDot key={d} x1={SNOW.cx} y1={SNOW.cy} x2={DASH.cx} y2={DASH.cy} delay={d} color={GREEN} dur={1.6} />)}
        {/* Snowflake → Reports */}
        {[0.5, 1.2].map(d => <FlowDot key={d} x1={SNOW.cx} y1={SNOW.cy} x2={RPT.cx} y2={RPT.cy} delay={d} color={CYAN} dur={1.8} />)}

        {/* ── STATUS DOTS ON NODES ── */}
        {[MSSQL, MYSQL, CSV, ETL, SNOW, DASH, RPT].map((n, i) => (
          <g key={i} transform={`translate(${n.x + 82}, ${n.y + 6})`}>
            <StatusDot active />
          </g>
        ))}

        {/* ── PIPELINE NODES ── */}
        <PipeNode {...MSSQL} icon="🗄️" label="MSSQL"     sublabel="Source DB"      color="#EF4444" glow="rgba(239,68,68,0.15)"     delay={0.2} />
        <PipeNode {...MYSQL}  icon="🐬" label="MySQL"     sublabel="Source DB"      color={GOLD}    glow="rgba(245,158,11,0.15)"    delay={0.3} />
        <PipeNode {...CSV}    icon="📄" label="CSV / API" sublabel="Raw Files"      color={BLUE}    glow="rgba(59,130,246,0.15)"    delay={0.4} />
        <PipeNode {...ETL}    icon="⚙️" label="ETL Engine" sublabel="Transform"     color={PURPLE}  glow="rgba(139,92,246,0.18)"    delay={0.6} />
        <PipeNode {...SNOW}   icon="❄️" label="Snowflake"  sublabel="Data Warehouse" color={CYAN}   glow="rgba(6,182,212,0.18)"     delay={0.8} />
        <PipeNode {...DASH}   icon="📊" label="Analytics"  sublabel="BI Dashboard"  color={GREEN}   glow="rgba(16,185,129,0.15)"    delay={1.0} />
        <PipeNode {...RPT}    icon="📋" label="Reports"    sublabel="Auto Export"   color={CYAN}    glow="rgba(6,182,212,0.15)"     delay={1.1} />

        {/* ── ETL label tag ── */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}>
          <foreignObject x={ETL.x - 70} y={ETL.y + 52} width={220} height={36}>
            <div style={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
              {['Validate', 'Deduplicate', 'Enrich'].map((tag, i) => (
                <span key={tag} style={{
                  fontSize: 8, fontWeight: 700, fontFamily: 'monospace',
                  padding: '2px 6px', borderRadius: 4,
                  background: `rgba(139,92,246,0.15)`, color: '#A78BFA',
                  border: '1px solid rgba(139,92,246,0.3)',
                }}>
                  {tag}
                </span>
              ))}
            </div>
          </foreignObject>
        </motion.g>

        {/* ── LIVE METRICS CARD ── */}
        <motion.g initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.6, duration: 0.6 }}>
          <foreignObject x={160} y={288} width={160} height={58}>
            <div style={{
              background: 'rgba(6,8,20,0.92)', border: '1px solid rgba(139,92,246,0.4)',
              borderRadius: 10, padding: '7px 10px',
              boxShadow: '0 4px 20px rgba(139,92,246,0.2)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                <span style={{ color: '#A78BFA', fontSize: 8, fontWeight: 700, fontFamily: 'monospace' }}>PIPELINE STATUS</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#10B981', display: 'inline-block' }} />
                  <span style={{ color: '#10B981', fontSize: 7, fontWeight: 700 }}>LIVE</span>
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ color: GOLD, fontSize: 12, fontWeight: 900, fontFamily: 'monospace', lineHeight: 1 }}>2.4M</p>
                  <p style={{ color: '#6B7280', fontSize: 7.5 }}>rows/hr</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ color: GREEN, fontSize: 12, fontWeight: 900, fontFamily: 'monospace', lineHeight: 1 }}>12ms</p>
                  <p style={{ color: '#6B7280', fontSize: 7.5 }}>latency</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ color: CYAN, fontSize: 12, fontWeight: 900, fontFamily: 'monospace', lineHeight: 1 }}>99.9%</p>
                  <p style={{ color: '#6B7280', fontSize: 7.5 }}>uptime</p>
                </div>
              </div>
            </div>
          </foreignObject>
        </motion.g>

        {/* ── QUERY CARD (top right corner) ── */}
        <motion.g initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.8, duration: 0.6 }}>
          <foreignObject x={368} y={148} width={148} height={90}>
            <div style={{
              background: 'rgba(6,8,20,0.92)', border: '1px solid rgba(59,130,246,0.35)',
              borderRadius: 10, padding: '8px 10px',
              boxShadow: '0 4px 20px rgba(59,130,246,0.15)',
            }}>
              <p style={{ color: BLUE, fontSize: 8, fontWeight: 700, letterSpacing: '0.1em', marginBottom: 6, fontFamily: 'monospace' }}>ACTIVE QUERY</p>
              <div style={{ fontFamily: 'monospace', fontSize: 9, lineHeight: 1.7 }}>
                <p><span style={{ color: '#60A5FA' }}>SELECT</span> <span style={{ color: '#E5E7EB' }}>*</span></p>
                <p><span style={{ color: '#60A5FA' }}>FROM</span> <span style={{ color: '#FCD34D' }}>dw.orders</span></p>
                <p><span style={{ color: '#60A5FA' }}>WHERE</span> <span style={{ color: '#86EFAC' }}>date</span></p>
                <p style={{ color: '#6B7280', paddingLeft: 4 }}>{`> '2026-01'`}</p>
              </div>
            </div>
          </foreignObject>
        </motion.g>

        {/* ── SP card (left side) ── */}
        <motion.g initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 2.0, duration: 0.6 }}>
          <foreignObject x={0} y={185} width={140} height={80}>
            <div style={{
              background: 'rgba(6,8,20,0.92)', border: '1px solid rgba(245,158,11,0.3)',
              borderRadius: 10, padding: '8px 10px',
              boxShadow: '0 4px 20px rgba(245,158,11,0.12)',
            }}>
              <p style={{ color: GOLD, fontSize: 8, fontWeight: 700, letterSpacing: '0.1em', marginBottom: 6, fontFamily: 'monospace' }}>STORED PROC</p>
              <div style={{ fontFamily: 'monospace', fontSize: 9, lineHeight: 1.7 }}>
                <p><span style={{ color: '#A78BFA' }}>EXEC</span></p>
                <p style={{ color: '#E5E7EB', paddingLeft: 4 }}>usp_Load</p>
                <p style={{ color: '#E5E7EB', paddingLeft: 8 }}>@batch=500</p>
              </div>
            </div>
          </foreignObject>
        </motion.g>

      </svg>

      {/* Floating gold particles */}
      {[
        { top: 8,  left: 12, d: 0.0, dur: 3.0 },
        { top: 22, left: 88, d: 0.7, dur: 2.6 },
        { top: 60, left: 5,  d: 1.2, dur: 3.4 },
        { top: 75, left: 78, d: 0.3, dur: 2.8 },
        { top: 45, left: 95, d: 1.7, dur: 3.2 },
      ].map((p, i) => (
        <motion.div key={i}
          animate={{ opacity: [0, 0.8, 0], y: [0, -18, 0] }}
          transition={{ repeat: Infinity, duration: p.dur, delay: p.d, ease: 'easeInOut' }}
          style={{
            position: 'absolute', width: 3, height: 3, borderRadius: '50%',
            background: GOLD, top: `${p.top}%`, left: `${p.left}%`,
            boxShadow: `0 0 6px ${GOLD}`, pointerEvents: 'none',
          }}
        />
      ))}
    </div>
  )
}
