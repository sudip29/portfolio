import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, FileText, Menu } from 'lucide-react'
import { GithubIcon, LinkedinIcon, TwitterXIcon } from './ui/BrandIcons'
import { personal } from '../data/personal'

const NAV_LINKS = ['Hero', 'Skills', 'Experience', 'Projects', 'Contact'] as const
type Section = (typeof NAV_LINKS)[number]

function scrollTo(id: string) {
  document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
}

export default function Navigation() {
  const [active, setActive] = useState<Section>('Hero')
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [hoveredLink, setHoveredLink] = useState<Section | null>(null)

  /* ── Active section via IntersectionObserver ── */
  useEffect(() => {
    const sections = NAV_LINKS.map(l =>
      document.getElementById(l.toLowerCase()),
    ).filter(Boolean) as HTMLElement[]

    const obs = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) {
          const id = visible[0].target.id
          const matched = NAV_LINKS.find(l => l.toLowerCase() === id)
          if (matched) setActive(matched)
        }
      },
      { threshold: 0.35 },
    )
    sections.forEach(s => obs.observe(s))
    return () => obs.disconnect()
  }, [])

  /* ── Scroll shadow ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
      className="fixed top-0 inset-x-0 z-50"
      style={{
        background: scrolled ? 'rgba(8,9,15,0.85)' : 'rgba(8,9,15,0.5)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : '1px solid transparent',
        transition: 'background 0.3s, border-color 0.3s',
      }}
    >
      <div
        className="mx-auto flex items-center justify-between px-6 h-16"
        style={{ maxWidth: 1400 }}
      >
        {/* ── Desktop nav links (left-aligned) ── */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(link => {
            const isActive = active === link
            const isHovered = hoveredLink === link
            return (
              <button
                key={link}
                onClick={() => scrollTo(link)}
                onMouseEnter={() => setHoveredLink(link)}
                onMouseLeave={() => setHoveredLink(null)}
                className="relative px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200"
                style={{
                  color: isActive ? '#FAFAFA' : '#A1A1AA',
                  background: isHovered ? 'rgba(255,255,255,0.04)' : 'transparent',
                }}
              >
                {link}
                {/* Animated underline */}
                <motion.span
                  initial={false}
                  animate={{ scaleX: isActive ? 1 : 0 }}
                  transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                  className="absolute bottom-0.5 left-4 right-4 h-px origin-left"
                  style={{ background: '#F59E0B', transformOrigin: 'left' }}
                />
              </button>
            )
          })}
        </nav>

        {/* ── Right cluster ── */}
        <div className="flex items-center gap-3">
          {/* Social icons */}
          <div className="hidden sm:flex items-center gap-2">
            {[
              { Icon: GithubIcon,   href: personal.socials.github,   label: 'GitHub'   },
              { Icon: LinkedinIcon, href: personal.socials.linkedin,  label: 'LinkedIn' },
              { Icon: TwitterXIcon, href: personal.socials.twitter,   label: 'Twitter'  },
            ].map(({ Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                className="w-8 h-8 flex items-center justify-center rounded-md transition-colors duration-200"
                style={{ color: '#71717A' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#FAFAFA')}
                onMouseLeave={e => (e.currentTarget.style.color = '#71717A')}
              >
                <Icon size={16} />
              </motion.a>
            ))}
          </div>

          {/* Resume button */}
          <motion.a
            href={personal.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 text-sm font-medium rounded-lg transition-all duration-200"
            style={{
              color: '#F0F0F5',
              background: 'rgba(255,255,255,0.05)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(245,158,11,0.4)'
              e.currentTarget.style.background = 'rgba(245,158,11,0.08)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
              e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
            }}
          >
            <FileText size={13} />
            Resume
          </motion.a>

          {/* Mobile hamburger */}
          <motion.button
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-md"
            style={{ color: '#A1A1AA', border: '1px solid #1F1F1F' }}
            onClick={() => setMenuOpen(o => !o)}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </motion.button>
        </div>
      </div>

      {/* ── Mobile dropdown ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="md:hidden overflow-hidden"
            style={{
              background: 'rgba(10,10,10,0.97)',
              borderBottom: '1px solid #1F1F1F',
            }}
          >
            <nav className="flex flex-col px-6 pb-4 pt-2 gap-1">
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link}
                  initial={{ x: -16, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05, duration: 0.2 }}
                  onClick={() => { scrollTo(link); setMenuOpen(false) }}
                  className="text-left px-3 py-2.5 text-sm rounded-md transition-colors duration-150"
                  style={{
                    color: active === link ? '#FAFAFA' : '#A1A1AA',
                    background: active === link ? 'rgba(255,255,255,0.04)' : 'transparent',
                  }}
                >
                  {link}
                </motion.button>
              ))}
              <div className="mt-3 pt-3 flex items-center gap-3" style={{ borderTop: '1px solid #1F1F1F' }}>
                <a href={personal.socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" style={{ color: '#71717A' }}>
                  <GithubIcon size={16} />
                </a>
                <a href={personal.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" style={{ color: '#71717A' }}>
                  <LinkedinIcon size={16} />
                </a>
                <a href={personal.resumeUrl} target="_blank" rel="noopener noreferrer" className="ml-auto text-sm px-3 py-1.5 rounded-lg" style={{ color: '#FAFAFA', background: '#111111', border: '1px solid #2A2A2A' }}>
                  Resume
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
