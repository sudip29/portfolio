import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { GithubIcon } from '../ui/BrandIcons'
import type { Project } from '../../data/projects'

interface Props {
  project: Project
  index: number
  visible: boolean
}

export default function ProjectCard({ project, index, visible }: Props) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.09, ease: [0.4, 0, 0.2, 1] }}
      className="group flex flex-col rounded-2xl overflow-hidden transition-all duration-300"
      style={{
        background: 'rgba(255,255,255,0.03)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(255,255,255,0.07)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
        height: '100%',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'var(--p-border)'
        e.currentTarget.style.transform = 'translateY(-5px)'
        e.currentTarget.style.boxShadow = '0 16px 48px var(--p-glow)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.3)'
      }}
    >
      <div className="w-full overflow-hidden relative" style={{ height: 160 }}>
        <div
          className="w-full h-full transition-transform duration-500 ease-out group-hover:scale-105"
          style={{ background: project.gradient }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 40%, rgba(8,9,15,0.6))' }} />
      </div>

      <div className="flex flex-col flex-1 gap-3 p-5">
        <h3 className="text-base font-bold leading-snug" style={{ color: '#F0F0F5' }}>
          {project.title}
        </h3>
        <p className="text-sm leading-relaxed flex-1" style={{ color: '#9CA3AF' }}>
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {project.stack.map(t => (
            <span
              key={t}
              className="px-2.5 py-0.5 text-xs font-mono rounded-full"
              style={{ background: 'var(--p-subtle)', color: 'var(--p-light)', border: '1px solid var(--p-border)' }}
            >
              {t}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4 pt-1">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link flex items-center gap-1 text-xs font-semibold transition-colors duration-200"
            style={{ color: 'var(--p)' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--p-light)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--p)')}
          >
            Live Demo
            <ArrowRight size={12} className="transition-transform duration-200 group-hover/link:translate-x-0.5" />
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs font-semibold transition-colors duration-200"
            style={{ color: '#6B7280' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#F0F0F5')}
            onMouseLeave={e => (e.currentTarget.style.color = '#6B7280')}
          >
            <GithubIcon size={13} />
            GitHub
          </a>
        </div>
      </div>
    </motion.article>
  )
}
