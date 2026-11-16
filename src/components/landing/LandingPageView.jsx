import { useMemo, useState } from 'react'
import { supabase } from '../../lib/supabase'

function CtaButton({ label, onClick, href }) {
  if (href) {
    return (
      <a href={href} className="btn-primary btn-stack-mobile" target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
        {label}
      </a>
    )
  }
  return (
    <button type="button" className="btn-primary btn-stack-mobile" onClick={onClick}>
      {label}
    </button>
  )
}

export default function LandingPageView({ page, preview = false }) {
  const content = page.content || {}
  const [form, setForm] = useState({ fullName: '', email: '', phone: '', company: '' })
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')
  const [showForm, setShowForm] = useState(page.ctaType === 'lead_form')

  const ctaHref = useMemo(() => {
    if (page.ctaType === 'book_call') return page.ctaUrl || '/#contact'
    if (page.ctaType === 'payment') return page.ctaUrl || ''
    if (page.ctaType === 'custom') return page.ctaUrl || ''
    return ''
  }, [page])

  async function submitLead(e) {
    e.preventDefault()
    if (preview) {
      setDone(true)
      return
    }
    setSubmitting(true)
    setError('')
    try {
      const { error: leadError } = await supabase.rpc('submit_landing_lead', {
        page_id: page.id,
        full_name: form.fullName,
        email: form.email,
        phone: form.phone || '',
        company: form.company || '',
      })
      if (leadError) throw leadError

      setDone(true)
      if (page.leadMagnetUrl) {
        window.open(page.leadMagnetUrl, '_blank', 'noreferrer')
      }
    } catch (err) {
      setError(err.message || 'Could not submit. Try again.')
    } finally {
      setSubmitting(false)
    }
  }

  function handlePrimaryCta() {
    if (page.ctaType === 'lead_form') {
      setShowForm(true)
      document.getElementById('landing-form')?.scrollIntoView({ behavior: 'smooth' })
      return
    }
    if (!ctaHref) {
      setError(
        page.ctaType === 'payment'
          ? 'Payment link is not set yet. Add it in page settings.'
          : 'Destination link is not set yet.',
      )
    }
  }

  return (
    <div className="bg-white text-ink">
      <section className="relative overflow-hidden bg-deep text-white">
        <div className="pointer-events-none absolute -right-20 top-10 h-64 w-64 rounded-full bg-sea/30 blur-3xl" />
        <div className="container-x relative py-16 md:py-24">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/70">{content.eyebrow}</p>
          <h1 className="mt-3 max-w-3xl font-display text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
            {content.headline}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">{content.subheadline}</p>

          {page.hasVsl && (
            <div className="mt-8 overflow-hidden rounded-3xl border border-white/15 bg-black/20">
              {page.vslUrl ? (
                <div className="aspect-video">
                  <iframe
                    title="Offer video"
                    src={page.vslUrl}
                    className="h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className="flex aspect-video items-center justify-center px-6 text-center text-white/70">
                  Add your VSL link in page settings to show the video here.
                </div>
              )}
            </div>
          )}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <CtaButton
              label={page.ctaLabel}
              href={page.ctaType === 'lead_form' ? undefined : ctaHref || undefined}
              onClick={handlePrimaryCta}
            />
          </div>
          {error && !showForm && <p className="mt-3 text-sm text-amber-200">{error}</p>}
        </div>
      </section>

      <section className="container-x py-14 md:py-20">
        <h2 className="display-title text-2xl md:text-3xl">{content.problemTitle}</h2>
        <ul className="mt-6 space-y-3">
          {(content.problemPoints || []).map((point) => (
            <li key={point} className="rounded-2xl border border-line bg-mist/40 px-4 py-3 text-base text-muted">
              {point}
            </li>
          ))}
        </ul>
      </section>

      <section className="border-y border-line bg-mist/50 py-14 md:py-20">
        <div className="container-x">
          <h2 className="display-title text-2xl md:text-3xl">{content.offerTitle}</h2>
          <ul className="mt-6 grid gap-3 md:grid-cols-3">
            {(content.offerPoints || []).map((point) => (
              <li key={point} className="rounded-2xl border border-line bg-white px-4 py-5 text-base text-deep">
                {point}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-x py-14 md:py-20">
        <h2 className="display-title text-2xl md:text-3xl">{content.stepsTitle}</h2>
        <ol className="mt-6 grid gap-4 md:grid-cols-3">
          {(content.steps || []).map((step, index) => (
            <li key={step.title} className="rounded-2xl border border-line px-4 py-5">
              <p className="text-xs font-bold uppercase tracking-wide text-sea">Step {index + 1}</p>
              <h3 className="mt-2 font-display text-lg font-semibold text-deep">{step.title}</h3>
              <p className="mt-2 text-sm text-muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-y border-line bg-white py-14 md:py-20">
        <div className="container-x max-w-3xl">
          <h2 className="display-title text-2xl md:text-3xl">{content.proofTitle}</h2>
          <p className="mt-4 text-lg text-muted">{content.proofText}</p>
        </div>
      </section>

      {(showForm || page.ctaType === 'lead_form') && (
        <section id="landing-form" className="container-x py-14 md:py-20">
          <div className="mx-auto max-w-xl rounded-3xl border border-line bg-mist/40 p-6 sm:p-8">
            <h2 className="font-display text-2xl font-bold text-deep">{page.ctaLabel}</h2>
            <p className="mt-2 text-sm text-muted">Fill this short form to continue.</p>
            {done ? (
              <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-4 text-sm text-emerald-800">
                Thank you. Your details were received.
                {page.leadMagnetUrl ? ' Your download should open now.' : ''}
              </div>
            ) : (
              <form className="mt-6 grid gap-3" onSubmit={submitLead}>
                <input
                  className="field"
                  required
                  placeholder="Full name"
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                />
                <input
                  className="field"
                  required
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                <input
                  className="field"
                  placeholder="Phone / WhatsApp"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
                {error && <p className="text-sm text-red-600">{error}</p>}
                <button type="submit" className="btn-primary" disabled={submitting}>
                  {submitting ? 'Submitting…' : page.ctaLabel}
                </button>
              </form>
            )}
          </div>
        </section>
      )}

      <section className="border-t border-line bg-mist/40 py-14 md:py-20">
        <div className="container-x max-w-3xl">
          <h2 className="display-title text-2xl">FAQ</h2>
          <ul className="mt-6 space-y-3">
            {(content.faq || []).map((item) => (
              <li key={item.q} className="rounded-2xl border border-line bg-white px-4 py-4">
                <p className="font-semibold text-deep">{item.q}</p>
                <p className="mt-1 text-sm text-muted">{item.a}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-deep py-14 text-white md:py-20">
        <div className="container-x max-w-3xl">
          <h2 className="font-display text-3xl font-bold">{content.finalHeadline}</h2>
          <p className="mt-3 text-white/80">{content.finalText}</p>
          <div className="mt-7">
            <CtaButton
              label={page.ctaLabel}
              href={page.ctaType === 'lead_form' ? undefined : ctaHref || undefined}
              onClick={handlePrimaryCta}
            />
          </div>
        </div>
      </section>
    </div>
  )
}
