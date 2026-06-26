import { motion } from 'framer-motion'
import { useIntersection } from '../../hooks/useIntersection'
import { projects } from '../../data/projects'
import FeaturedProject from './FeaturedProject'
import ProjectCard from './ProjectCard'
import CardDeck from '../ui/CardDeck'

export default function Projects() {
  const [ref, visible] = useIntersection<HTMLDivElement>({ threshold: 0.1 })

  const featured = projects.find(p => p.featured)!
  const rest     = projects.filter(p => !p.featured)

  return (
    <section id="projects" className="relative min-h-screen flex flex-col justify-center py-24 overflow-hidden">

      {/* Ambient glows */}
      <div className="absolute pointer-events-none" style={{
        top: '15%', right: '-5%', width: '40%', height: '50%',
        background: 'radial-gradient(ellipse, var(--p-faint) 0%, transparent 70%)',
      }} />
      <div className="absolute pointer-events-none" style={{
        bottom: '5%', left: '-8%', width: '45%', height: '55%',
        background: 'radial-gradient(ellipse, rgba(var(--p-rgb), 0.05) 0%, transparent 70%)',
      }} />

      <div className="relative z-10 mx-auto w-full px-4 sm:px-6 2xl:px-12" style={{ maxWidth: 1800 }}>
        <div ref={ref} className="mb-10 md:mb-16">
          <motion.p
            initial={{ opacity: 0, x: -16 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="text-xs font-mono uppercase tracking-widest mb-3"
            style={{ color: 'var(--p)' }}
          >
            03 — Projects
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-extrabold tracking-tight"
            style={{
              background: 'linear-gradient(110deg, #F0F0F5 0%, var(--p-light) 55%, var(--p) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Selected Work
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="mt-3 text-base"
            style={{ color: '#9CA3AF', maxWidth: 520 }}
          >
            Projects ranging from CRM systems to real-time crypto trackers — built with a focus on data integrity and performance.
          </motion.p>
        </div>

        <CardDeck
          label="Project"
          cards={[
            <FeaturedProject key="featured" project={featured} visible={true} />,
            ...rest.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i + 1} visible={true} />
            )),
          ]}
        />
      </div>
    </section>
  )
}
