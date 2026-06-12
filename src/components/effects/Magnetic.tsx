'use client'
import { useEffect, useRef } from 'react'

type MagneticProps = {
  children: React.ReactNode
  strength?: number
  triggerArea?: number
  className?: string
}

const lerp = (current: number, target: number, factor: number) =>
  current * (1 - factor) + target * factor

/**
 * Magnetic wrapper (Andrew Woan pattern) — element pulls toward the cursor
 * within a trigger radius, springs back on leave. Lerp-smoothed via rAF.
 */
export function Magnetic({ children, strength = 0.3, triggerArea = 140, className = '' }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.matchMedia('(pointer: coarse)').matches) return

    const el = ref.current
    if (!el) return

    const mouse = { x: -9999, y: -9999 }
    const pos = { x: 0, y: 0 }
    const target = { x: 0, y: 0 }
    let rafId = 0

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    window.addEventListener('mousemove', onMove, { passive: true })

    const render = () => {
      // rect re-read per frame: stays correct under Lenis smooth scroll
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dist = Math.hypot(mouse.x - cx, mouse.y - cy)

      if (dist < triggerArea) {
        el.classList.add('is-magnetic-active')
        target.x = (mouse.x - cx) * strength
        target.y = (mouse.y - cy) * strength
      } else {
        el.classList.remove('is-magnetic-active')
        target.x = 0
        target.y = 0
      }

      pos.x = lerp(pos.x, target.x, 0.15)
      pos.y = lerp(pos.y, target.y, 0.15)
      el.style.transform = `translate(${pos.x}px, ${pos.y}px)`

      rafId = requestAnimationFrame(render)
    }
    rafId = requestAnimationFrame(render)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
    }
  }, [strength, triggerArea])

  return (
    <div ref={ref} className={`inline-block w-fit ${className}`}>
      {children}
    </div>
  )
}
