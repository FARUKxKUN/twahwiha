import { Navbar } from '@/components/layout/Navbar'
import { Hero } from '@/components/sections/Hero'
import { Flavors } from '@/components/sections/Flavors'
import { WhyDifferent } from '@/components/sections/WhyDifferent'
import { Story } from '@/components/sections/Story'
import { Finale } from '@/components/sections/Finale'
import { Footer } from '@/components/sections/Footer'
import { VelocityMarquee } from '@/components/effects/VelocityMarquee'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <VelocityMarquee items={['TWAHWIHA', 'TUNISIAN FIRE', 'حارّة برشا']} />
        <Flavors />
        <WhyDifferent />
        <Story />
        <VelocityMarquee
          items={['GET THE SET', 'N0.01 ORIGINAL', 'N0.02 TOUM', 'N0.03 ASLA']}
          bg="#F15728" color="#100B06" star="#F4ECCF" borderless
        />
        <Finale />
        <Footer />
      </main>
    </>
  )
}
