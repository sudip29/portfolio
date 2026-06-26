import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { GithubIcon } from '../ui/BrandIcons'
import type { Project } from '../../data/projects'

interface Props {
  project: Project
  visible: boolean
}

export default function FeaturedProject({ project, visible }: Props) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className="group relative flex flex-col lg:flex-row rounded-2xl overflow-hidden col-span-2 transition-all duration-300"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.07)',
        minHeight: 340,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'var(--p-border)'
        e.currentTarget.style.boxShadow = '0 0 40px var(--p-glow)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {/* Parallax preview */}
      <div className="relative overflow-hidden lg:w-[52%] min-h-[220px] flex-shrink-0">
        <motion.div
          style={{ y: imageY, background: project.gradient }}
          className="absolute inset-0 scale-[1.12] transition-transform duration-500 ease-out group-hover:scale-[1.16]"
        />
        {/* Featured badge */}
        <div
          className="absolute top-4 left-4 px-3 py-1 text-xs font-mono font-semibold rounded-full"
          style={{ background: 'var(--p-subtle)', color: 'var(--p)', border: '1px solid var(--p-border)' }}
        >
          Featured Project
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col justify-center gap-4 p-7 lg:p-10">
        <h3 className="text-xl md:text-2xl font-bold leading-snug" style={{ color: '#FAFAFA' }}>
          {project.title}
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: '#A1A1AA' }}>
          {project.longDescription || project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.stack.map(t => (
            <span
              key={t}
              className="px-2.5 py-1 text-xs font-mono rounded-lg"
              style={{ background: 'var(--p-faint)', color: 'var(--p-light)', border: '1px solid var(--p-border)' }}
            >
              {t}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-4 pt-1">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group/a flex items-center gap-1.5 text-sm font-semibold transition-colors duration-200"
            style={{ color: 'var(--p)' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--p-light)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--p)')}
          >
            Live Demo <ArrowRight size={14} className="transition-transform duration-200 group-hover/a:translate-x-0.5" />
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm font-semibold transition-colors duration-200"
            style={{ color: '#71717A' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#FAFAFA')}
            onMouseLeave={e => (e.currentTarget.style.color = '#71717A')}
          >
            <GithubIcon size={15} /> GitHub
          </a>
        </div>
      </div>
    </motion.article>
  )
}
