'use client'
import { useEffect, useRef } from 'react'

type EmbersProps = { className?: string; count?: number; colors?: string[] }

/** Ambient background embers — warm particles drifting upward. Sizes to parent. */
export function Embers({ className = '', count = 32, colors = ['#F15728', '#E0A84A', '#DA1F27'] }: EmbersProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const canvas = canvasRef.current
    const parent = canvas?.parentElement
    if (!canvas || !parent) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let w = 0, h = 0, raf = 0
    const resize = () => {
      w = parent.clientWidth; h = parent.clientHeight
      canvas.width = w * dpr; canvas.height = h * dpr
      canvas.style.width = `${w}px`; canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    const ro = new ResizeObserver(resize); ro.observe(parent)
    const rand = (a: number, b: number) => a + Math.random() * (b - a)

    type P = { x: number; y: number; r: number; vx: number; vy: number; life: number; max: number; color: string }
    const make = (atBottom = false): P => {
      const max = rand(260, 560)
      return { x: rand(0, w), y: atBottom ? h + rand(0, 40) : rand(0, h), r: rand(1, 3), vx: rand(-0.15, 0.15), vy: rand(-0.5, -0.18), life: atBottom ? 0 : rand(0, max), max, color: colors[(Math.random() * colors.length) | 0] }
    }
    let parts: P[] = Array.from({ length: count }, () => make())

    const tick = () => {
      ctx.clearRect(0, 0, w, h)
      ctx.globalCompositeOperation = 'lighter'
      for (let i = 0; i < parts.length; i++) {
        const p = parts[i]
        p.x += p.vx; p.y += p.vy; p.life++
        if (p.y < -10 || p.life > p.max) { parts[i] = make(true); continue }
        ctx.globalAlpha = Math.sin((p.life / p.max) * Math.PI) * 0.5
        ctx.fillStyle = p.color
        ctx.shadowBlur = 10; ctx.shadowColor = p.color
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill()
      }
      ctx.globalAlpha = 1; ctx.shadowBlur = 0; ctx.globalCompositeOperation = 'source-over'
      raf = requestAnimationFrame(tick)
    }
    tick()
    return () => { cancelAnimationFrame(raf); ro.disconnect() }
  }, [count])

  return <canvas ref={canvasRef} aria-hidden className={`absolute inset-0 pointer-events-none ${className}`} />
}
