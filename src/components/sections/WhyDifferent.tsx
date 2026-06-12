'use client'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { registerGSAP, prefersReducedMotion } from '@/lib/animations'

const PROMISES = [
  {
    num: '01', title: 'REAL TUNISIAN PEPPERS',
    sub: 'Picked from Tunisian fields. Processed the same day. You can taste the difference, that heat is the real thing.',
    bg: '#1A0A06', accent: '#F15728',
    bgImg: '/assets/elements/spicy.png', bgFit: 'contain', bgOpacity: 0.12,
  },
  {
    num: '02', title: 'MADE IN TUNISIA',
    sub: 'Not inspired by Tunisia. Not a tribute. Actually made here, by people who grew up eating this kind of heat.',
    bg: '#15100A', accent: '#E0A84A',
    bgImg: '/assets/elements/honey-background.jpeg', bgFit: 'cover', bgOpacity: 0.32,
  },
  {
    num: '03', title: 'NO PRESERVATIVES',
    sub: "No chemicals to make it last. A good bottle doesn't survive long enough to need them anyway.",
    bg: '#0E160B', accent: '#8FB85A',
    bgImg: '/assets/elements/garlic-background.jpeg', bgFit: 'cover', bgOpacity: 0.4,
  },
]

export function WhyDifferent() {
  const sectionRef = useRef<HTMLElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    registerGSAP()
    const ctx = gsap.context(() => {
      const reduce = prefersReducedMotion()
      const n = PROMISES.length

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: reduce ? false : 1,
          onUpdate: (self) => setActive(Math.min(n - 1, Math.floor(self.progress * n))),
        },
      })
      if (reduce) return

      // background colour shifts
      tl.to(bgRef.current, { backgroundColor: PROMISES[1].bg, duration: 1 }, 0.9)
      tl.to(bgRef.current, { backgroundColor: PROMISES[2].bg, duration: 1 }, 1.9)

      // crossfade promise layers
      tl.to('[data-promise="0"]', { opacity: 0, yPercent: -8, duration: 0.4 }, 0.9)
      tl.fromTo('[data-promise="1"]', { opacity: 0, yPercent: 8 }, { opacity: 1, yPercent: 0, duration: 0.4 }, 0.95)
      tl.to('[data-promise="1"]', { opacity: 0, yPercent: -8, duration: 0.4 }, 1.9)
      tl.fromTo('[data-promise="2"]', { opacity: 0, yPercent: 8 }, { opacity: 1, yPercent: 0, duration: 0.4 }, 1.95)
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="why" ref={sectionRef} className="relative" style={{ height: '300vh' }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* shifting background */}
        <div ref={bgRef} className="absolute inset-0" style={{ background: PROMISES[0].bg }} />

        {/* section label */}
        <span className="absolute top-10 left-6 md:left-12 z-30 text-[#F4ECCF]/30"
          style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.65rem', letterSpacing: '0.3em' }}>
          WHY IT&apos;S DIFFERENT
        </span>

        {/* promise layers */}
        {PROMISES.map((p, i) => (
          <div key={p.num} data-promise={i} className="absolute inset-0 flex items-center justify-center px-6"
            style={{ opacity: i === 0 ? 1 : 0 }}>

            {/* per-promise background image */}
            <img src={p.bgImg} alt="" aria-hidden
              className="absolute inset-0 w-full h-full pointer-events-none select-none"
              style={{ objectFit: p.bgFit as 'cover' | 'contain', opacity: p.bgOpacity }} />

            {/* dark vignette keeps the headline readable over the image */}
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse 70% 60% at center, rgba(16,11,6,0.6) 0%, rgba(16,11,6,0.2) 55%, transparent 100%)' }} />

            <div className="relative text-center">
              <span className="block mb-6" style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(2.5rem,5vw,4rem)', color: p.accent, lineHeight: 1, transform: 'translateX(-3rem)' }}>
                {p.num}
              </span>
              <h3 className="text-[#F4ECCF] leading-[0.9] mb-8 mx-auto"
                style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(3.6rem,10.5vw,9.5rem)' }}>
                {p.title}
              </h3>
              <p className="mx-auto text-[#F4ECCF]/65 max-w-[52ch]" style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(1.05rem,1.5vw,1.4rem)', lineHeight: 1.65 }}>
                {p.sub}
              </p>
            </div>
          </div>
        ))}

        {/* progress */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3">
          {PROMISES.map((p, i) => (
            <span key={p.num} className="rounded-full transition-all duration-300"
              style={{ width: active === i ? '30px' : '9px', height: '9px', background: active === i ? p.accent : 'rgba(244,236,207,0.22)' }} />
          ))}
        </div>
      </div>
    </section>
  )
}
