'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { Observer } from 'gsap/Observer'

type Props = {
  items: string[]
  baseDuration?: number
  bg?: string
  color?: string
  star?: string
  borderless?: boolean
}

/**
 * Velocity-coupled marquee (Ali-Sanati pattern, catalog).
 * Scrolls continuously; scroll wheel accelerates/reverses it, settles back to 1x.
 */
export function VelocityMarquee({
  items,
  baseDuration = 24,
  bg = '#100B06',
  color = '#F4ECCF',
  star = '#F15728',
  borderless = false,
}: Props) {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    gsap.registerPlugin(Observer)

    const tl = gsap.to(trackRef.current, { x: '-50%', duration: baseDuration, ease: 'none', repeat: -1 })
    const observer = Observer.create({
      onChangeY(self) {
        const factor = self.deltaY < 0 ? 3 : -3
        gsap.timeline()
          .to(tl, { timeScale: -factor, duration: 0.15 })
          .to(tl, { timeScale: 1, duration: 0.8 })
      },
    })
    return () => { tl.kill(); observer.kill() }
  }, [baseDuration])

  const doubled = [...items, ...items]

  return (
    <div className="overflow-hidden py-5 md:py-7" style={{ background: bg, borderBlock: borderless ? 'none' : '1px solid rgba(244,236,207,0.1)' }}>
      <div ref={trackRef} className="inline-flex items-center whitespace-nowrap will-change-transform" style={{ gap: '2.5rem', paddingRight: '2.5rem' }}>
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center" style={{ gap: '2.5rem' }}>
            <span style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(2.6rem,6vw,5rem)', color, lineHeight: 1 }}>
              {item}
            </span>
            <span style={{ color: star, fontSize: 'clamp(1.2rem,2.5vw,2rem)' }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
