import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Copy, Check } from 'lucide-react'
import { GithubIcon, LinkedinIcon, TwitterXIcon } from '../ui/BrandIcons'
import { useIntersection } from '../../hooks/useIntersection'
import { personal } from '../../data/personal'

const EMAIL = personal.email

const SOCIALS = [
  { Icon: GithubIcon,   href: personal.socials.github,          label: 'GitHub'   },
  { Icon: LinkedinIcon, href: personal.socials.linkedin,         label: 'LinkedIn' },
  { Icon: TwitterXIcon, href: personal.socials.twitter,          label: 'Twitter'  },
  { Icon: Mail,         href: `mailto:${personal.email}`,        label: 'Email'    },
]

export default function Contact() {
  const [ref, visible] = useIntersection<HTMLElement>({ threshold: 0.2 })
  const [copied, setCopied] = useState(false)

  function copyEmail() {
    navigator.clipboard.writeText(EMAIL).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    })
  }

  return (
    <section
      ref={ref}
      id="contact"
      className="relative flex flex-col justify-center overflow-hidden"
      style={{ minHeight: '70vh', paddingTop: 96, paddingBottom: 0 }}
    >
      {/* Ambient glow */}
      <div className="absolute pointer-events-none inset-0" style={{
        background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(var(--p-rgb), 0.10) 0%, transparent 70%)',
      }} />
      <div className="absolute pointer-events-none" style={{
        top: '10%', left: '10%', width: '35%', height: '50%',
        background: 'radial-gradient(ellipse, rgba(var(--p-rgb), 0.06) 0%, transparent 70%)',
      }} />

      <div className="relative z-10 mx-auto w-full px-4 sm:px-6 flex flex-col items-center text-center" style={{ maxWidth: 800 }}>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="text-xs font-mono uppercase tracking-widest mb-4"
          style={{ color: 'var(--p)' }}
        >
          04 — Contact
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-extrabold tracking-tight leading-[1.1]"
          style={{
            background: 'linear-gradient(110deg, #F0F0F5 0%, var(--p-light) 50%, var(--p) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {personal.contact.heading}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.16 }}
          className="mt-5 text-base leading-relaxed"
          style={{ color: '#9CA3AF', maxWidth: 520 }}
        >
          {personal.contact.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.26 }}
          className="mt-10 relative"
        >
          <motion.button
            onClick={copyEmail}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="group flex items-center gap-2 md:gap-3 px-4 py-3 md:px-6 md:py-4 rounded-2xl transition-all duration-300 text-sm md:text-lg 2xl:text-xl font-semibold"
            style={{
              color: '#F0F0F5',
              background: 'rgba(255,255,255,0.04)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--p-border)'
              e.currentTarget.style.boxShadow = '0 0 40px var(--p-glow)'
              e.currentTarget.style.background = 'var(--p-faint)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
              e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.3)'
              e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
            }}
          >
            <span style={{ color: 'var(--p)' }}>@</span>
            {EMAIL}
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.span key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} style={{ color: '#10B981' }}>
                  <Check size={18} />
                </motion.span>
              ) : (
                <motion.span key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ color: '#6B7280' }}>
                  <Copy size={16} />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          <AnimatePresence>
            {copied && (
              <motion.div
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
                className="absolute -bottom-9 left-1/2 -translate-x-1/2 text-xs font-mono px-3 py-1 rounded-full"
                style={{ background: 'rgba(16,185,129,0.15)', color: '#10B981', border: '1px solid rgba(16,185,129,0.2)', whiteSpace: 'nowrap' }}
              >
                Copied to clipboard!
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.34 }}
          className="flex items-center gap-4 mt-14"
        >
          {SOCIALS.map(({ Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              whileHover={{ scale: 1.15, y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="w-11 h-11 flex items-center justify-center rounded-xl transition-all duration-200"
              style={{
                background: 'rgba(255,255,255,0.04)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: '#6B7280',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--p-border)'
                e.currentTarget.style.color = 'var(--p)'
                e.currentTarget.style.background = 'var(--p-faint)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                e.currentTarget.style.color = '#6B7280'
                e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
              }}
            >
              <Icon size={18} />
            </motion.a>
          ))}
        </motion.div>
      </div>

      <footer
        className="mt-20 w-full mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)', maxWidth: 'min(1400px, 90vw)', marginLeft: 'auto', marginRight: 'auto' }}
      >
        <p className="text-xs font-mono" style={{ color: '#6B7280' }}>
          {personal.footer.credit}
        </p>
        {personal.footer.availableForHire && (
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#10B981' }} />
            <span className="text-xs font-mono" style={{ color: '#10B981' }}>Available for hire</span>
          </div>
        )}
      </footer>
    </section>
  )
}
