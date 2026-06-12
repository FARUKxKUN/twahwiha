'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { registerGSAP, prefersReducedMotion } from '@/lib/animations'
import { Magnetic } from '@/components/effects/Magnetic'
import { Embers } from '@/components/effects/Embers'

export function Finale() {
  const sectionRef = useRef<HTMLElement>(null)
  const bottlesRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    registerGSAP()
    const ctx = gsap.context(() => {
      gsap.fromTo('[data-fin]',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' } }
      )
      gsap.fromTo(bottlesRef.current,
        { scale: 0.85, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' } }
      )
      if (!prefersReducedMotion()) {
        gsap.to(bottlesRef.current, { y: -16, duration: 3.4, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 1.1 })
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="finale" ref={sectionRef} className="relative bg-[#100B06] min-h-screen flex flex-col items-center justify-center overflow-hidden py-28">

      {/* Ambient embers */}
      <Embers className="z-0" count={36} />

      {/* chili burst — full-bleed background */}
      <img src="/assets/elements/spicy.png" alt="" aria-hidden
        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none z-[1]"
        style={{ opacity: 0.14 }} />

      {/* glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vh] h-[80vh] rounded-full pointer-events-none z-[1]"
        style={{ background: 'radial-gradient(circle, rgba(241,87,40,0.16) 0%, transparent 65%)' }} />

      {/* Left flanking copy */}
      <div data-fin className="hidden lg:block absolute left-[6%] top-1/2 -translate-y-1/2 z-10 max-w-[17ch] text-center">
        <p className="text-[#F15728] mb-4" style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.62rem', letterSpacing: '0.25em' }}>
          THE FULL SET
        </p>
        <p className="text-[#F4ECCF] leading-[0.95] mb-4" style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(2.1rem,2.9vw,3.4rem)' }}>
          THREE FLAVORS, ONE FIRE.
        </p>
        <p className="text-[#F4ECCF]/45" style={{ fontFamily: 'var(--font-body)', fontSize: '0.98rem' }}>
          Original · Toum · Asla.
        </p>
      </div>

      {/* Right flanking copy */}
      <div data-fin className="hidden lg:block absolute right-[6%] top-1/2 -translate-y-1/2 z-10 max-w-[17ch] text-center">
        <p className="text-[#F15728] mb-4" style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.62rem', letterSpacing: '0.25em' }}>
          STRAIGHT FROM TUNISIA
        </p>
        <p className="text-[#F4ECCF] leading-[0.95] mb-4" style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(2.1rem,2.9vw,3.4rem)' }}>
          REAL HEAT, NO SHORTCUTS.
        </p>
        <p className="text-[#F4ECCF]/45" style={{ fontFamily: 'var(--font-body)', fontSize: '0.98rem' }}>
          Bottled by hand, small batches.
        </p>
      </div>

      {/* brand word — smaller */}
      <h2 data-fin className="relative z-10 text-[#F4ECCF] text-center leading-[0.85]"
        style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(2.6rem,8vw,7rem)' }}>
        TWAHWIHA
      </h2>

      {/* bottles — dominate the page */}
      <img ref={bottlesRef} src="/assets/3 twahwihas.png" alt="TWAHWIHA Original, TOUM and ASLA" draggable={false}
        className="relative z-20 object-contain pointer-events-none select-none h-[50vh] md:h-[70vh] w-auto -mt-2"
        style={{ filter: 'drop-shadow(0 30px 50px rgba(0,0,0,0.5))' }} />

      <p data-fin className="relative z-10 text-[#F4ECCF]/45 mt-10 mb-14"
        style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.72rem', letterSpacing: '0.35em' }}>
        TUNISIAN FIRE SINCE 2025
      </p>

      <div data-fin className="relative z-10">
        <Magnetic>
          <a href="https://instagram.com/faruk_automates" target="_blank" rel="noopener noreferrer" data-cursor="follow"
            className="btn-outline inline-flex items-center justify-center gap-3 px-12 py-5 leading-none min-h-[52px] font-bold"
            style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.8rem', letterSpacing: '0.2em' }}>
            GET THE SET <span>↗</span>
          </a>
        </Magnetic>
      </div>
    </section>
  )
}
