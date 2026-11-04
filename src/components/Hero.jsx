import { hero } from '../data'

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-deep pt-16 md:pt-[72px]">
      <img
        src={hero.image}
        alt=""
        className="absolute inset-0 h-full w-full scale-105 object-cover object-[center_18%] md:object-center"
      />
      <div className="hero-overlay absolute inset-0" />
      <div className="hero-shine" aria-hidden="true" />

      <div className="relative z-10 flex min-h-[calc(100svh-4rem)] items-end pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-6 md:min-h-[calc(100svh-72px)] md:items-center md:py-16 md:pb-16">
        <div className="container-x max-w-3xl fade-up">
          <div className="glass-dark rounded-2xl p-4 sm:p-7 md:rounded-3xl md:p-9">
            <p className="font-display text-[0.7rem] font-semibold tracking-[0.16em] text-white/90 sm:text-xs md:text-sm md:tracking-[0.22em]">
              CLARITY DIGITAL LABS
            </p>
            <h1 className="mt-2 font-display text-[1.75rem] font-bold leading-[1.12] tracking-tight text-white sm:mt-3 sm:text-4xl md:mt-4 md:text-5xl lg:text-[3.5rem]">
              {hero.title}
            </h1>
            <p className="mt-2.5 max-w-xl text-[0.92rem] leading-relaxed text-white/90 sm:mt-4 sm:text-lg md:mt-5 md:text-xl">
              {hero.text}
            </p>
            <div className="mt-4 grid w-full grid-cols-1 gap-2.5 sm:mt-7 sm:flex sm:w-auto sm:flex-row sm:flex-wrap sm:gap-3">
              <a
                href={hero.primaryCta.href}
                className="btn-primary btn-stack-mobile"
                {...(hero.primaryCta.external
                  ? { target: '_blank', rel: 'noreferrer' }
                  : {})}
              >
                {hero.primaryCta.label}
              </a>
              <a href={hero.secondaryCta.href} className="btn-ghost btn-stack-mobile">
                {hero.secondaryCta.label}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
