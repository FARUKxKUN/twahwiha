'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const FIRE = ['#F15728', '#FF7A3C', '#E0A84A', '#DA1F27', '#FFC15E']

/**
 * Fire cursor (smoke-cursor-trail adapted to embers, catalog) + hover-only
 * action label. Warm particles trail and rise from the cursor; over a
 * [data-cursor] element a small pill label springs in and reliably hides
 * (evaluated every move, so it never sticks). Desktop only.
 */
export function FireCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const labelTextRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const canvas = canvasRef.current
    const dot = dotRef.current
    const label = labelRef.current
    const labelText = labelTextRef.current
    if (!canvas || !dot || !label || !labelText) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const resize = () => {
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    type P = { x: number; y: number; vx: number; vy: number; a: number; size: number; color: string }
    let parts: P[] = []
    let lastX = 0, lastY = 0
    const rand = (a: number, b: number) => a + Math.random() * (b - a)

    const emit = (x: number, y: number, vx: number, vy: number) => {
      const speed = Math.min(Math.hypot(vx, vy), 40)
      const count = Math.max(2, Math.min(6, Math.round(speed * 0.18)))
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2
        const s = rand(0.4, 1.6)
        parts.push({
          x, y,
          vx: Math.cos(angle) * s + vx * 0.1,
          vy: Math.sin(angle) * s + vy * 0.1 - rand(0.3, 0.9),
          a: 1,
          size: rand(2, 5),
          color: FIRE[(Math.random() * FIRE.length) | 0],
        })
      }
    }

    const dotX = gsap.quickTo(dot, 'x', { duration: 0.06, ease: 'power3' })
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.06, ease: 'power3' })
    const labX = gsap.quickTo(label, 'x', { duration: 0.2, ease: 'power3' })
    const labY = gsap.quickTo(label, 'y', { duration: 0.2, ease: 'power3' })

    let shown = false
    let current = ''

    const move = (e: MouseEvent) => {
      const vx = e.clientX - lastX
      const vy = e.clientY - lastY
      emit(e.clientX, e.clientY, vx, vy)
      lastX = e.clientX
      lastY = e.clientY

      dotX(e.clientX); dotY(e.clientY)
      labX(e.clientX); labY(e.clientY)

      // re-evaluate hover target EVERY move so the label never sticks
      const t = (e.target as HTMLElement)?.closest('[data-cursor]') as HTMLElement | null
      const text = t?.dataset.cursor || ''
      if (text) {
        if (!shown || text !== current) {
          current = text
          labelText.textContent = text
          gsap.to(label, { opacity: 1, scale: 1, duration: 0.5, ease: 'elastic.out(1, 0.6)' })
          shown = true
        }
      } else if (shown) {
        gsap.to(label, { opacity: 0, scale: 0.6, duration: 0.25, ease: 'power2.in' })
        shown = false
        current = ''
      }
    }

    const leave = () => {
      if (shown) {
        gsap.to(label, { opacity: 0, scale: 0.6, duration: 0.2 })
        shown = false; current = ''
      }
      gsap.to(dot, { opacity: 0, duration: 0.2 })
    }
    const enter = () => gsap.to(dot, { opacity: 1, duration: 0.2 })

    window.addEventListener('mousemove', move)
    document.documentElement.addEventListener('mouseleave', leave)
    document.documentElement.addEventListener('mouseenter', enter)

    let raf = 0
    const tick = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      ctx.globalCompositeOperation = 'lighter'
      parts = parts.filter((p) => p.a > 0.02)
      for (const p of parts) {
        p.x += p.vx
        p.y += p.vy
        p.vy -= 0.04 // embers rise
        p.vx *= 0.96
        p.vy *= 0.96
        p.a *= 0.93
        p.size *= 0.99
        ctx.globalAlpha = p.a * 0.7
        ctx.fillStyle = p.color
        ctx.shadowBlur = 8
        ctx.shadowColor = p.color
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
      ctx.shadowBlur = 0
      ctx.globalCompositeOperation = 'source-over'
      raf = requestAnimationFrame(tick)
    }
    tick()

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', move)
      document.documentElement.removeEventListener('mouseleave', leave)
      document.documentElement.removeEventListener('mouseenter', enter)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <canvas ref={canvasRef} aria-hidden style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9998 }} />
      <div ref={dotRef} aria-hidden className="cursor-dot" />
      <div ref={labelRef} aria-hidden className="cursor-label"><span ref={labelTextRef} /></div>
    </>
  )
}
