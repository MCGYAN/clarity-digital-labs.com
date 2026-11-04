import Reveal from './Reveal'
import { audience } from '../data'

export default function Audience() {
  return (
    <section className="relative overflow-hidden bg-deep py-12 text-white md:py-20">
      <div
        className="pointer-events-none absolute -left-20 top-0 h-64 w-64 rounded-full bg-sea/25 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-16 bottom-0 h-56 w-56 rounded-full bg-white/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-10 container-x max-w-3xl">
        <Reveal>
          <div className="glass-dark rounded-3xl p-5 sm:p-8 md:p-10">
            <p className="section-label !text-white/70">{audience.label}</p>
            <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
              {audience.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/85 sm:mt-5 sm:text-lg md:text-xl">
              {audience.text}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
