import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import LoadingScreen   from './components/ui/LoadingScreen'
import ScrollProgress  from './components/ui/ScrollProgress'
import Cursor          from './components/ui/Cursor'
import Navigation      from './components/Navigation'
import Hero            from './components/Hero/Hero'
import Skills          from './components/Skills/Skills'
import Experience      from './components/Experience/Experience'
import Projects        from './components/Projects/Projects'
import Contact         from './components/Contact/Contact'

/* Mouse-following spotlight — radial glow that tracks the cursor */
function Spotlight() {
  const [pos, setPos] = useState({ x: -9999, y: -9999 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[2]"
      style={{
        background: `radial-gradient(650px circle at ${pos.x}px ${pos.y}px, rgba(245,158,11,0.06), transparent 80%)`,
      }}
    />
  )
}

export default function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    document.body.style.overflow = loading ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [loading])

  return (
    <>
      {/* Loading screen */}
      <AnimatePresence mode="wait">
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {/* Main app — rendered immediately but hidden behind loader */}
      <div style={{ visibility: loading ? 'hidden' : 'visible' }}>
        <Spotlight />
        <ScrollProgress />
        <Cursor />
        <Navigation />

        <main>
          <Hero />
          <Skills />
          <Experience />
          <Projects />
          <Contact />
        </main>
      </div>
    </>
  )
}
