'use client'
import { useEffect, useRef, useState } from 'react'
import { Magnetic } from '@/components/effects/Magnetic'

const NAV_LINKS = [
  { label: 'FLAVORS', href: '#flavors' },
  { label: 'WHY', href: '#why' },
  { label: 'STORY', href: '#story' },
]

function NavLink({ label, href }: { label: string; href: string }) {
  return (
    <a href={href} className="group relative inline-block overflow-hidden align-middle"
      style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.7rem', letterSpacing: '0.15em', height: '1.5em', lineHeight: '1.5em' }}>
      <span className="block text-[#F4ECCF]/70 transition-transform duration-300 ease-out group-hover:-translate-y-full" style={{ lineHeight: '1.5em' }}>{label}</span>
      <span className="absolute left-0 top-0 block text-[#F15728] translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0" style={{ lineHeight: '1.5em' }}>{label}</span>
    </a>
  )
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const lastY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 40)
      if (y > lastY.current && y > 240) setHidden(true)
      else setHidden(false)
      lastY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-[transform,background-color] duration-300"
      style={{
        transform: hidden ? 'translateY(-100%)' : 'translateY(0)',
        background: scrolled ? 'rgba(16,11,6,0.9)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(244,236,207,0.08)' : '1px solid transparent',
      }}
    >
      <div className="shell flex items-center justify-between py-3">
        <Magnetic strength={0.25} triggerArea={90}>
          <a href="#" data-cursor="top" className="flex items-center" aria-label="TWAHWIHA home">
            <img src="/assets/mascot nobg.png" alt="TWAHWIHA" draggable={false}
              className="h-11 md:h-14 w-auto object-contain select-none" />
          </a>
        </Magnetic>

        <div className="hidden md:flex items-center gap-16">
          {NAV_LINKS.map((l) => <NavLink key={l.label} {...l} />)}
        </div>

        <Magnetic strength={0.35} triggerArea={110}>
          <a href="#finale" data-cursor="get it"
            className="btn-outline inline-flex items-center justify-center px-9 py-3.5 leading-none font-bold"
            style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.72rem', letterSpacing: '0.16em' }}>
            GET SAUCE
          </a>
        </Magnetic>
      </div>
    </nav>
  )
}
