import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { ShortcutKey } from '../components/ui/ShortcutKey'
import { Navbar } from '../components/landing/Navbar'
import { Hero } from '../components/landing/Hero'
import { ProblemSection } from '../components/landing/ProblemSection'
// import { HowItWorks } from '../components/landing/HowItWorks'
// import { WidgetDemoSection, WidgetOverlay } from '../components/landing/WidgetDemo'
import { WidgetOverlay } from '../components/landing/WidgetDemo'
import { FeaturesGrid } from '../components/landing/FeaturesGrid'
import { FooterCTA } from '../components/landing/FooterCTA'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  const [widgetOpen, setWidgetOpen] = useState(false)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.metaKey && e.shiftKey && e.key === 'F') {
        e.preventDefault()
        setWidgetOpen(true)
      }
      if (e.key === 'Escape') {
        setWidgetOpen(false)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#0A0A0A]">
      <Navbar />
      <Hero onTryWidget={() => setWidgetOpen(true)} />
      <ProblemSection />
      {/* <HowItWorks /> */}
      {/* <WidgetDemoSection onTryWidget={() => setWidgetOpen(true)} /> */}
      <FeaturesGrid />
      <FooterCTA />

      <WidgetOverlay isOpen={widgetOpen} onClose={() => setWidgetOpen(false)} />

      {!widgetOpen && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30">
          <button
            onClick={() => setWidgetOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-orange-400 shadow-md text-neutral-600 text-xs cursor-pointer hover:border-orange-500 hover:shadow-orange-200 hover:shadow-lg transition-all duration-200"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
            Press{' '}
            <ShortcutKey size="sm" />
            {' '}anywhere to try the widget
          </button>
        </div>
      )}
    </div>
  )
}
