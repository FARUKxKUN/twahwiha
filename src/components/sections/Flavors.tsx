'use client'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { registerGSAP, prefersReducedMotion } from '@/lib/animations'

const FLAVORS = [
  {
    id: 'original', num: 'N0.01', name: 'ORIGINAL', heat: 3,
    note: 'The one that started it all. Pure Tunisian chili, no filler, no apology.',
    bottle: '/assets/original flavor.png',
    bg: '#1A0A06', accent: '#F15728', glow: 'rgba(241,87,40,0.30)',
    ing: ['/assets/pepper 1.png', '/assets/pepper2.png'],
  },
  {
    id: 'toum', num: 'N0.02', name: 'TOUM', heat: 4,
    note: 'Crushed garlic meets Tunisian fire. Bold, unforgettable, no compromise.',
    bottle: '/assets/TOUM.png',
    bg: '#0E160B', accent: '#8FB85A', glow: 'rgba(124,176,72,0.28)',
    ing: ['/assets/garlic 1.png', '/assets/garlic 2.png'],
  },
  {
    id: 'asla', num: 'N0.03', name: 'ASLA', heat: 2,
    note: 'Tunisian honey and chili. Sweet first, then it hits you. The best betrayal.',
    bottle: '/assets/asla.png',
    bg: '#1A130A', accent: '#E0A84A', glow: 'rgba(224,168,74,0.30)',
    ing: ['/assets/honey.png', '/assets/comb.png'],
  },
]

export function Flavors() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    registerGSAP()
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    const ctx = gsap.context(() => {
      const panels = FLAVORS.length
      const reduce = prefersReducedMotion()

      gsap.to(track, {
        x: () => -(window.innerWidth * (panels - 1)),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => '+=' + window.innerWidth * (panels - 1),
          pin: true,
          scrub: reduce ? false : 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => setActive(Math.min(panels - 1, Math.round(self.progress * (panels - 1)))),
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section id="flavors" ref={sectionRef} className="relative overflow-hidden">
      <div ref={trackRef} className="flex h-screen will-change-transform" style={{ width: `${FLAVORS.length * 100}vw` }}>
        {FLAVORS.map((f, i) => (
          <article key={f.id} className="relative w-screen h-screen shrink-0 flex items-center overflow-hidden" style={{ background: f.bg }}>

            {/* glow */}
            <div className="absolute right-[18%] top-1/2 -translate-y-1/2 w-[60vh] h-[60vh] rounded-full pointer-events-none"
              style={{ background: `radial-gradient(circle, ${f.glow} 0%, transparent 66%)` }} />

            {/* giant index watermark */}
            <span className="absolute right-6 bottom-2 pointer-events-none select-none leading-none"
              style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(8rem,26vw,24rem)', color: 'rgba(244,236,207,0.04)' }}>
              {i + 1}
            </span>

            <div className="shell relative z-10 grid grid-cols-1 lg:grid-cols-2 items-center gap-10 w-full">
              {/* text */}
              <div className="lg:pl-12 xl:pl-24">
                <div className="flex items-center gap-3 mb-5">
                  <span style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.65rem', letterSpacing: '0.2em', color: f.accent }}>{f.num}</span>
                  <span className="w-10 border-t border-dashed" style={{ borderColor: 'rgba(244,236,207,0.25)' }} />
                  <span className="text-[#F4ECCF]/40" style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.65rem', letterSpacing: '0.2em' }}>
                    {String(i + 1).padStart(2, '0')} / {String(FLAVORS.length).padStart(2, '0')}
                  </span>
                </div>

                <h2 className="text-[#F4ECCF] leading-[0.92] mb-6"
                  style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(4rem,11vw,9rem)' }}>
                  {f.name}
                </h2>

                <p className="text-[#F4ECCF]/65 max-w-[40ch] mb-9" style={{ fontFamily: 'var(--font-body)', fontSize: '1.15rem', lineHeight: 1.8 }}>
                  {f.note}
                </p>

                {/* heat meter */}
                <div className="flex items-center gap-3 mb-8">
                  <span className="text-[#F4ECCF]/40" style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.6rem', letterSpacing: '0.2em' }}>HEAT</span>
                  <div className="flex gap-1.5">
                    {[0, 1, 2, 3, 4].map((d) => (
                      <span key={d} className="w-2.5 h-2.5 rounded-full" style={{ background: d < f.heat ? f.accent : 'rgba(244,236,207,0.15)' }} />
                    ))}
                  </div>
                </div>

                <button data-cursor="add to cart"
                  className="btn-outline inline-flex items-center justify-center gap-3 px-9 py-3.5 leading-none min-h-[44px] font-bold"
                  style={{ ['--btn']: f.accent, fontFamily: 'var(--font-space-mono)', fontSize: '0.68rem', letterSpacing: '0.18em' } as React.CSSProperties}>
                  ADD TO CART
                </button>
              </div>

              {/* bottle */}
              <div className="relative flex items-center justify-center min-h-[56vh] lg:min-h-[86vh]">
                <img src={f.ing[0]} alt="" aria-hidden loading="lazy"
                  className="absolute z-10 pointer-events-none select-none h-[18vh] md:h-[26vh] w-auto"
                  style={{ top: '4%', right: '4%' }} />
                <img src={f.ing[1]} alt="" aria-hidden loading="lazy"
                  className="absolute z-10 pointer-events-none select-none h-[16vh] md:h-[22vh] w-auto"
                  style={{ bottom: '6%', left: '2%' }} />
                <img src={f.bottle} alt={`TWAHWIHA ${f.name}`} loading="lazy"
                  className="relative z-20 object-contain pointer-events-none select-none h-[58vh] md:h-[86vh] w-auto"
                  style={{ filter: 'drop-shadow(0 30px 45px rgba(0,0,0,0.5))' }} />
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* progress dots (fixed within pinned section) */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3">
        {FLAVORS.map((f, i) => (
          <span key={f.id} className="rounded-full transition-all duration-300"
            style={{ width: active === i ? '30px' : '9px', height: '9px', background: active === i ? f.accent : 'rgba(244,236,207,0.25)' }} />
        ))}
      </div>

      {/* scroll hint */}
      <span className="absolute bottom-8 right-6 md:right-12 z-30 text-[#F4ECCF]/35"
        style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.6rem', letterSpacing: '0.2em' }}>
        SCROLL →
      </span>
    </section>
  )
}
