'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { registerGSAP } from '@/lib/animations'

type RevealProps = {
  children: React.ReactNode
  className?: string
  y?: number
  delay?: number
  duration?: number
  start?: string
  as?: 'div' | 'span' | 'li'
}

/** Reusable scroll-triggered fade-up. */
export function Reveal({ children, className = '', y = 40, delay = 0, duration = 0.9, start = 'top 85%', as = 'div' }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    registerGSAP()
    const el = ref.current
    if (!el) return
    const ctx = gsap.context(() => {
      gsap.fromTo(el,
        { y, opacity: 0 },
        { y: 0, opacity: 1, duration, delay, ease: 'power3.out', scrollTrigger: { trigger: el, start } }
      )
    }, el)
    return () => ctx.revert()
  }, [y, delay, duration, start])

  const Tag = as
  return <Tag ref={ref as never} className={className}>{children}</Tag>
}
