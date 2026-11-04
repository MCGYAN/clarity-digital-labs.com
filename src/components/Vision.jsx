import Reveal from './Reveal'
import { vision } from '../data'

export default function Vision() {
  return (
    <section className="relative overflow-hidden py-14 md:py-28">
      <img src={vision.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-deep/75" />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-deep/50 to-transparent"
        aria-hidden="true"
      />

      <div className="relative z-10 container-x max-w-3xl text-white">
        <Reveal>
          <div className="glass-dark rounded-3xl p-5 sm:p-8 md:p-10">
            <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl">
              {vision.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/90 sm:mt-5 sm:text-lg md:text-xl">
              {vision.text}
            </p>
            <p className="mt-6 text-lg font-semibold sm:mt-8 sm:text-xl md:text-2xl">
              {vision.close}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
