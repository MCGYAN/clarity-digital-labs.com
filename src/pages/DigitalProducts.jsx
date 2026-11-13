import { Link } from 'react-router-dom'
import { site } from '../config'

export default function DigitalProducts() {
  return (
    <section className="ambient-bg relative flex min-h-[100svh] items-center py-24 md:py-28">
      <div className="relative z-10 container-x max-w-2xl">
        <div className="glass-sea rounded-3xl p-6 text-center sm:p-10 md:p-12 fade-up">
          <p className="section-label !mb-3">Digital Products</p>
          <h1 className="display-title text-3xl sm:text-4xl md:text-5xl">Coming soon.</h1>
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-muted sm:mt-5 sm:text-lg">
            We are building useful digital products for businesses. Check back soon, or talk to us
            if you want early access.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:mx-auto sm:mt-10 sm:w-auto sm:flex-row sm:justify-center">
            <Link to="/" className="btn-secondary btn-stack-mobile">
              Back to Home
            </Link>
            <a
              href={site.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-primary btn-stack-mobile"
            >
              Talk To Us
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
