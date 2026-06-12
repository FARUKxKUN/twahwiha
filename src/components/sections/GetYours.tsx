'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { registerGSAP, prefersReducedMotion } from '@/lib/animations'
import { Magnetic } from '@/components/effects/Magnetic'

export function GetYours() {
  const sectionRef = useRef<HTMLElement>(null)
  const bottlesRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    registerGSAP()
    const ctx = gsap.context(() => {
      gsap.fromTo('[data-gy-line]',
        { y: 80, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        }
      )
      gsap.fromTo('[data-gy-card]',
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' }, delay: 0.3,
        }
      )
      gsap.fromTo(bottlesRef.current,
        { scale: 0.85, opacity: 0, rotation: -6 },
        {
          scale: 1, opacity: 1, rotation: 0, duration: 1.1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        }
      )
      if (!prefersReducedMotion()) {
        gsap.to(bottlesRef.current, { y: -16, duration: 3.4, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 1.1 })
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="get-yours" ref={sectionRef} className="relative bg-[#F15728] overflow-hidden min-h-screen flex items-center py-24">

      {/* Botanical texture */}
      <img src="/assets/branch.png" alt="" aria-hidden
        className="absolute top-[-8%] right-[-4%] pointer-events-none select-none opacity-[0.08]"
        style={{ height: '70%', width: 'auto', objectFit: 'contain' }} />

      <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 items-center gap-12 px-6 md:px-16">

        {/* LEFT — copy + order panel */}
        <div className="order-2 lg:order-1">
          <p data-gy-line className="text-[#100B06]/55 mb-5"
            style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase' }}>
            Limited stock · No waitlist
          </p>

          <h2 className="mb-7">
            {['GET', 'YOUR'].map((w) => (
              <span key={w} className="block overflow-hidden pb-[0.1em]">
                <span data-gy-line className="block text-[#100B06] leading-[0.92]"
                  style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(3.5rem,8vw,7.5rem)' }}>
                  {w}
                </span>
              </span>
            ))}
            <span className="block overflow-hidden pb-[0.1em]">
              <span data-gy-line className="block text-[#F4ECCF] leading-[0.92]"
                style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(3.5rem,8vw,7.5rem)' }}>
                BOTTLE.
              </span>
            </span>
          </h2>

          <p data-gy-card className="text-[#100B06]/75 leading-relaxed max-w-[40ch] mb-8"
            style={{ fontFamily: 'var(--font-body)', fontSize: '1rem' }}>
            Three flavors. One fire. All real. We ship across Tunisia and to select international addresses.
          </p>

          {/* The full set */}
          <div data-gy-card className="border border-[#100B06]/25 p-5 mb-6 max-w-[420px]">
            <p className="text-[#100B06]/55 mb-2"
              style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.6rem', letterSpacing: '0.15em' }}>
              THE FULL SET
            </p>
            <p className="text-[#100B06] mb-1"
              style={{ fontFamily: 'var(--font-bebas)', fontSize: '2rem', letterSpacing: '0.02em' }}>
              N0.01 + N0.02 + N0.03
            </p>
            <p className="text-[#100B06]/55"
              style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem' }}>
              Original · TOUM · ASLA. All three, one price.
            </p>
          </div>

          <div data-gy-card className="flex gap-3 max-w-[420px]">
            <Magnetic className="flex-1">
              <button data-cursor="order now"
                className="w-full bg-[#100B06] text-[#F4ECCF] py-4 min-h-[44px] font-bold hover:bg-[#F4ECCF] hover:text-[#100B06] transition-colors duration-300"
                style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.68rem', letterSpacing: '0.12em' }}>
                ORDER NOW →
              </button>
            </Magnetic>
            <a href="#flavors"
              className="flex-1 inline-flex items-center justify-center border-2 border-[#100B06]/40 text-[#100B06]/80 py-4 min-h-[44px] hover:border-[#100B06] hover:text-[#100B06] transition-colors duration-300"
              style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.68rem', letterSpacing: '0.12em' }}>
              SEE FLAVORS
            </a>
          </div>
        </div>

        {/* RIGHT — the product, fills the space */}
        <div className="order-1 lg:order-2 flex items-center justify-center">
          <img
            ref={bottlesRef}
            src="/assets/3 twahwihas.png"
            alt="TWAHWIHA Original, TOUM and ASLA"
            className="object-contain pointer-events-none select-none max-w-full h-[40vh] md:h-[62vh]"
            style={{ width: 'auto', filter: 'drop-shadow(0 30px 50px rgba(0,0,0,0.35))' }}
            draggable={false}
          />
        </div>
      </div>
    </section>
  )
}
