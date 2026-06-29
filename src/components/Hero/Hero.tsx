import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import HeroText from './HeroText'
import HeroVisual from './HeroVisual'

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden"
      style={{ minHeight: '100vh' }}
    >
      {/* Background */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(135deg, #07080F 0%, #08090F 55%, #0A0B14 100%)',
      }} />

      {/* Subtle grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)
        `,
        backgroundSize: '64px 64px',
      }} />

      {/* Gold ambient left */}
      <div className="absolute pointer-events-none" style={{
        top: '-10%', left: '-5%', width: '55%', height: '70%',
        background: 'radial-gradient(ellipse at 30% 25%, rgba(245,158,11,0.07) 0%, transparent 65%)',
      }} />

      {/* Main layout */}
      <div
        className="relative z-10 w-full mx-auto flex items-center px-5 sm:px-8 lg:px-12 2xl:px-16"
        style={{ maxWidth: 'min(1400px, 90vw)', minHeight: '100vh', paddingTop: 72 }}
      >
        {/* Left: text */}
        <div className="w-full lg:w-[50%] 2xl:w-[48%] flex-shrink-0">
          <HeroText />
        </div>

        {/* Right: animated data visual — hidden on mobile */}
        <div className="hidden lg:block flex-1 relative" style={{ height: '90vh', maxHeight: 680 }}>
          <HeroVisual />
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-10"
        style={{ cursor: 'pointer' }}
        onClick={() => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.6 }}
      >
        <span className="text-xs font-mono tracking-widest uppercase" style={{ color: '#71717A' }}>scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
          style={{ color: '#F59E0B' }}
        >
          <ChevronDown size={18} />
        </motion.div>
      </motion.div>
    </section>
  )
}
