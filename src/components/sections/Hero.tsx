'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { registerGSAP, prefersReducedMotion } from '@/lib/animations'
import { Magnetic } from '@/components/effects/Magnetic'
import { Embers } from '@/components/effects/Embers'

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const wordRef = useRef<HTMLHeadingElement>(null)
  const bottleRef = useRef<HTMLImageElement>(null)
  const floatRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    registerGSAP()
    const ctx = gsap.context(() => {
      // Load-in
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.fromTo(wordRef.current, { scale: 1.15, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.2 })
        .fromTo(bottleRef.current, { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1 }, '-=0.8')
        .fromTo('[data-hero-up]', { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.12 }, '-=0.6')

      if (!prefersReducedMotion()) {
        // Idle float
        gsap.to(floatRef.current, { y: -22, duration: 3, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 1.2 })

        // Scroll-linked bottle rotation + word parallax
        gsap.to(bottleRef.current, {
          rotation: 28, y: -30, scale: 0.92, ease: 'none',
          scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: 1 },
        })
        gsap.to(wordRef.current, {
          yPercent: -18, opacity: 0.4, ease: 'none',
          scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: 1 },
        })
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-[#100B06] overflow-hidden flex items-center justify-center">

      {/* Ambient embers behind everything */}
      <Embers className="z-0" count={34} />

      {/* Glow */}
      <div className="absolute left-1/2 top-[54%] -translate-x-1/2 -translate-y-1/2 w-[70vh] h-[70vh] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(241,87,40,0.20) 0%, transparent 68%)' }} />

      {/* Top label */}
      <div data-hero-up className="absolute top-20 left-0 right-0 flex justify-center z-30">
        <span className="text-[#F4ECCF]/45" style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.7rem', letterSpacing: '0.4em' }}>
          TUNISIAN HOT SAUCE · EST. 2025
        </span>
      </div>

      {/* Brand word behind the bottle */}
      <h1 ref={wordRef} className="absolute left-0 right-0 text-center text-[#F4ECCF] z-0 pointer-events-none select-none px-2"
        style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(4.5rem,19vw,17rem)', lineHeight: 0.9, letterSpacing: '0.01em' }}>
        TWAHWIHA
      </h1>

      {/* Bottle in front */}
      <div ref={bottleRef} className="relative z-20 will-change-transform">
        <img
          ref={floatRef}
          src="/assets/original flavor.png"
          alt="TWAHWIHA Tunisian Hot Sauce"
          className="object-contain pointer-events-none select-none h-[58vh] md:h-[80vh] w-auto"
          style={{ filter: 'drop-shadow(0 40px 50px rgba(0,0,0,0.6))' }}
          draggable={false}
        />
      </div>

      {/* Copy split to flank the lower half of the bottle */}
      <p data-hero-up className="hidden md:block absolute left-[21%] lg:left-[23%] top-[71%] -translate-y-1/2 z-30 text-center max-w-[13ch] text-[#F4ECCF]/75"
        style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(1.2rem,1.6vw,1.85rem)', lineHeight: 1.4, fontWeight: 500 }}>
        The sauce that hits different.
      </p>
      <p data-hero-up className="hidden md:block absolute right-[21%] lg:right-[23%] top-[73%] -translate-y-1/2 z-30 text-center max-w-[13ch] text-[#F4ECCF]/75"
        style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(1.2rem,1.6vw,1.85rem)', lineHeight: 1.4, fontWeight: 500 }}>
        Real Tunisian fire. Three flavors, zero shortcuts.
      </p>

      {/* Bottom CTA */}
      <div className="absolute bottom-12 left-0 right-0 z-30 flex flex-col items-center gap-6 px-6">
        <p data-hero-up className="md:hidden text-center text-[#F4ECCF]/70 max-w-[30ch]"
          style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', lineHeight: 1.6 }}>
          The sauce that hits different. Real Tunisian fire, three flavors, zero shortcuts.
        </p>
        <div data-hero-up>
          <Magnetic>
            <a href="#flavors" data-cursor="taste it"
              className="btn-outline inline-flex items-center justify-center gap-3 px-10 py-4 leading-none min-h-[44px] font-bold"
              style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.58rem', letterSpacing: '0.18em' }}>
              TASTE THE RANGE <span>↓</span>
            </a>
          </Magnetic>
        </div>
      </div>
    </section>
  )
}
