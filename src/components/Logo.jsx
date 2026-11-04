import { site } from '../config'

export default function Logo({ className = '', invert = false }) {
  const main = invert ? '#FFFFFF' : '#0A3D4D'
  const rule = invert ? 'rgba(255,255,255,0.35)' : '#9BB8C3'
  const sub = invert ? 'rgba(255,255,255,0.85)' : '#0B7EA4'

  return (
    <a
      href="#top"
      className={`inline-flex items-center gap-3 ${className}`}
      aria-label={`${site.name} home`}
    >
      <span className="font-display text-[0.95rem] font-bold tracking-[0.16em] sm:text-[1.05rem] md:text-[1.15rem]" style={{ color: main }}>
        CLARITY
      </span>
      <span className="h-6 w-px self-center sm:h-7" style={{ background: rule }} aria-hidden="true" />
      <span
        className="flex flex-col text-[0.58rem] font-semibold leading-[1.05] tracking-[0.12em] sm:text-[0.62rem] md:text-[0.68rem]"
        style={{ color: sub }}
      >
        <span>DIGITAL</span>
        <span>LABS</span>
      </span>
    </a>
  )
}
