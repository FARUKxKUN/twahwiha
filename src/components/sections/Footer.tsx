const LINKS = [
  { label: 'FLAVORS', href: '#flavors' },
  { label: 'WHY', href: '#why' },
  { label: 'STORY', href: '#story' },
]

export function Footer() {
  return (
    <footer className="bg-[#0B0704] border-t border-[#F4ECCF]/10 py-14">
      <div className="shell flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
        <div>
          <div className="text-[#F4ECCF] leading-none mb-2"
            style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(2.4rem,5vw,3.6rem)', letterSpacing: '0.02em' }}>
            TWAHWIHA
          </div>
          <p className="text-[#F4ECCF]/30" style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.58rem', letterSpacing: '0.2em' }}>
            TUNISIAN FIRE SINCE 2025
          </p>
        </div>

        <nav className="flex flex-wrap gap-6 md:gap-10">
          {LINKS.map((l) => (
            <a key={l.label} href={l.href} data-cursor="go"
              className="inline-flex items-center min-h-[44px] text-[#F4ECCF]/40 hover:text-[#F4ECCF] transition-colors duration-200"
              style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.64rem', letterSpacing: '0.15em' }}>
              {l.label}
            </a>
          ))}
        </nav>

        <a href="https://instagram.com/faruk_automates" target="_blank" rel="noopener noreferrer" data-cursor="follow"
          className="text-[#F4ECCF]/50 hover:text-[#F15728] transition-colors duration-200"
          style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.64rem', letterSpacing: '0.12em' }}>
          @TWAHWIHA ↗
        </a>
      </div>

      <div className="shell mt-10 pt-6 border-t border-[#F4ECCF]/10 flex items-center justify-between">
        <p className="text-[#F4ECCF]/20" style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.55rem', letterSpacing: '0.1em' }}>
          © 2025 TWAHWIHA
        </p>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#F15728] animate-pulse" />
          <span className="text-[#F4ECCF]/20" style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.55rem', letterSpacing: '0.1em' }}>
            MADE IN TUNISIA
          </span>
        </div>
      </div>
    </footer>
  )
}
