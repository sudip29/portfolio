import { motion } from 'framer-motion'
import { useIntersection } from '../../hooks/useIntersection'
import { skillCategories } from '../../data/skills'
import TechMarquee from './TechMarquee'
import SkillCard from './SkillCard'
import CardDeck from '../ui/CardDeck'

export default function Skills() {
  const [ref, visible] = useIntersection<HTMLDivElement>({ threshold: 0.15 })

  return (
    <section id="skills" className="relative min-h-screen flex flex-col justify-center py-24 overflow-hidden">

      {/* Ambient glows */}
      <div className="absolute pointer-events-none" style={{
        top: '10%', left: '-10%', width: '50%', height: '60%',
        background: 'radial-gradient(ellipse, var(--p-faint) 0%, transparent 70%)',
      }} />
      <div className="absolute pointer-events-none" style={{
        bottom: '0%', right: '-5%', width: '40%', height: '50%',
        background: 'radial-gradient(ellipse, rgba(var(--p-rgb), 0.05) 0%, transparent 70%)',
      }} />

      <div className="relative z-10 mx-auto w-full px-4 sm:px-6 2xl:px-12" style={{ maxWidth: 1400 }}>
        <div ref={ref} className="mb-10 md:mb-16">
          <motion.p
            initial={{ opacity: 0, x: -16 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="text-xs font-mono uppercase tracking-widest mb-3"
            style={{ color: 'var(--p)' }}
          >
            01 — Skills
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
            className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-extrabold tracking-tight"
            style={{
              background: 'linear-gradient(110deg, #F0F0F5 0%, var(--p-light) 55%, var(--p) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Tech Stack
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.18, ease: [0.4, 0, 0.2, 1] }}
            className="mt-3 text-base"
            style={{ color: '#9CA3AF', maxWidth: 520 }}
          >
            Tools and technologies I work with daily — databases, ETL pipelines, cloud platforms, and more.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mb-14"
        >
          <TechMarquee />
        </motion.div>

        <CardDeck
          label="Skill"
          cards={skillCategories.map((cat) => (
            <SkillCard key={cat.title} category={cat} index={0} visible={true} />
          ))}
        />
      </div>
    </section>
  )
}
