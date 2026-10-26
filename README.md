# TWAHWIHA

[![Live site](https://img.shields.io/badge/live-twahwiha.vercel.app-e2643a?style=flat)](https://twahwiha.vercel.app)
[![CI](https://github.com/FARUKxKUN/twahwiha/actions/workflows/ci.yml/badge.svg)](https://github.com/FARUKxKUN/twahwiha/actions/workflows/ci.yml)
![Next.js 16](https://img.shields.io/badge/Next.js-16-000000?style=flat&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-0AE448?style=flat&logo=greensock&logoColor=black)
![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=flat&logo=tailwindcss&logoColor=white)

Scroll-driven showcase site for TWAHWIHA, a fictional Tunisian hot sauce brand.

**Live:** [twahwiha.vercel.app](https://twahwiha.vercel.app)

![TWAHWIHA homepage](docs/screenshot.png)

## Features

- Hero bottle that rotates and shifts with scroll, with parallax on the wordmark
- Pinned horizontal section that scrubs through the three flavors
- Background color that changes per section as you scroll
- Fire-trail cursor and floating ember particles
- Marquee that reacts to scroll velocity
- Magnetic buttons
- Smooth scroll with Lenis, synced to GSAP ScrollTrigger
- Every effect checks `prefers-reduced-motion`, and cursor effects turn off on touch devices

## Stack

- Next.js 16 (App Router), React 19, TypeScript
- Tailwind CSS v4
- GSAP + ScrollTrigger
- Lenis
- Bebas Neue, Inter Tight and Space Mono via `next/font`

## Structure

```
src/components/sections/   Hero, Story, Flavors, WhyDifferent, GetYours, Finale, Footer
src/components/effects/    FireCursor, Embers, VelocityMarquee, Magnetic, Reveal
src/lib/                   animations.ts, lenis.tsx
```

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## My role

Solo project: concept, design and development.

## License

No license is granted. All rights reserved by Farouk Battikh.
