'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { registerGSAP, prefersReducedMotion } from '@/lib/animations'
import { Reveal } from '@/components/effects/Reveal'

const BEATS = [
  { k: 'BORN IN A KITCHEN', t: 'TWAHWIHA started where every good thing in Tunisia starts: a loud kitchen, a grandmother, and far too much chili.' },
  { k: 'NO MIDDLEMEN', t: 'We drive to the farms ourselves. Fresh peppers, garlic and honey, processed the same day they are picked.' },
  { k: 'BY HAND', t: 'Small batches. Glass bottles. Labels placed by hand. The kind of attention that does not scale, and we are fine with that.' },
]

export function Story() {
  const sectionRef = useRef<HTMLElement>(null)
  const mascotRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    registerGSAP()
    const ctx = gsap.context(() => {
      if (!prefersReducedMotion()) {
        gsap.to(mascotRef.current, { y: -14, duration: 3.4, ease: 'sine.inOut', yoyo: true, repeat: -1 })
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="story" ref={sectionRef} className="relative bg-[#15100A] py-28 md:py-40 overflow-hidden">
      <div className="shell relative z-10">
        <Reveal>
          <p className="text-[#F4ECCF]/30 mb-3" style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.65rem', letterSpacing: '0.3em' }}>
            THE MAKER
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="text-[#F4ECCF] leading-[0.9] mb-16 max-w-[16ch]" style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(3rem,8vw,6.5rem)' }}>
            MADE WITH HANDS THAT KNOW FIRE
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-[42%_58%] gap-12 lg:gap-16 items-start">
          {/* mascot — sticky */}
          <div className="lg:sticky lg:top-28">
            <div className="relative flex justify-center lg:justify-start">
              <img ref={mascotRef} src="/assets/mascot nobg.png" alt="TWAHWIHA mascot" draggable={false}
                className="object-contain pointer-events-none select-none h-[44vh] md:h-[52vh] w-auto" />
              <div className="absolute -top-3 right-0 md:-right-4 bg-[#F15728] px-6 py-3 rotate-3 shadow-[0_10px_28px_rgba(0,0,0,0.35)]">
                <p className="text-[#100B06] whitespace-nowrap leading-none" style={{ fontFamily: 'var(--font-bebas)', fontSize: '1.4rem', letterSpacing: '0.04em' }}>
                  &ldquo;DON&apos;T COOK WITHOUT IT.&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* narrative beats */}
          <div className="flex flex-col gap-12 lg:pt-6">
            {BEATS.map((b, i) => (
              <Reveal key={b.k} delay={i * 0.05} className="border-l-2 border-[#F15728]/40 pl-12">
                <p className="text-[#F15728] mb-5" style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.62rem', letterSpacing: '0.2em' }}>
                  {String(i + 1).padStart(2, '0')} · {b.k}
                </p>
                <p className="text-[#F4ECCF]/80" style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(1.15rem,2vw,1.6rem)', lineHeight: 1.45 }}>
                  {b.t}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
