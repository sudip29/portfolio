import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import HeroText from './HeroText'
import sudipPhoto from '../../assets/person.png'

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

      {/* Gold ambient */}
      <div className="absolute pointer-events-none" style={{
        top: '-10%', left: '-5%', width: '55%', height: '70%',
        background: 'radial-gradient(ellipse at 30% 25%, rgba(245,158,11,0.07) 0%, transparent 65%)',
      }} />

      {/* ── Photo panel — full-height, right half, behind text layer ── */}
      <div
        className="absolute hidden lg:block"
        style={{ top: 0, right: 0, width: '50%', height: '100%', zIndex: 1 }}
      >
        <div style={{
          position: 'absolute',
          right: -32,
          top: '5%',
          width: '78%',
          height: '90%',
          background: 'linear-gradient(145deg, #0C0E1C 0%, #090A15 100%)',
          borderRadius: 40,
          border: '1px solid rgba(245,158,11,0.08)',
          boxShadow: '0 40px 100px rgba(0,0,0,0.6)',
          transform: 'rotate(5deg)',
        }} />

        <img
          src={sudipPhoto}
          alt="Sudip Kumar Shaw"
          style={{
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            height: '92vh',
            width: 'auto',
            objectFit: 'contain',
            objectPosition: 'bottom center',
            zIndex: 2,
          }}
        />

        <div style={{
          position: 'absolute', bottom: 0, left: '10%', width: '80%', height: '28%',
          background: 'radial-gradient(ellipse, rgba(245,158,11,0.16) 0%, transparent 70%)',
          filter: 'blur(24px)', pointerEvents: 'none', zIndex: 1,
        }} />
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '22%',
          background: 'linear-gradient(to bottom, #08090F 0%, transparent 100%)',
          pointerEvents: 'none', zIndex: 4,
        }} />
        <div style={{
          position: 'absolute', top: 0, left: 0, bottom: 0, width: '20%',
          background: 'linear-gradient(to right, #08090F 0%, transparent 100%)',
          pointerEvents: 'none', zIndex: 4,
        }} />
      </div>

      {/* ── Text — responsive padding, full-width on mobile, 52% on lg+ ── */}
      <div
        className="relative z-10 w-full mx-auto flex items-center px-5 sm:px-8 lg:px-12 2xl:px-16"
        style={{ maxWidth: 1800, minHeight: '100vh', paddingTop: 72 }}
      >
        <div className="w-full lg:w-[52%] 2xl:w-[50%]">
          <HeroText />
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
