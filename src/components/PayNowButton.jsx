import { useState } from 'react'
import { formatGhs } from '../admin/data/constants'
import { isMoolreConfigured, startMoolreCheckout } from '../lib/moolre'

export default function PayNowButton({ product, className = 'btn-primary btn-stack-mobile' }) {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')
  const [tone, setTone] = useState('error')

  const priceLabel = formatGhs(product.priceGhs)

  function close() {
    if (busy) return
    setOpen(false)
    setMessage('')
  }

  async function handlePay(e) {
    e.preventDefault()
    setMessage('')
    setBusy(true)

    try {
      if (!isMoolreConfigured()) {
        setTone('error')
        setMessage('Payment system not installed yet. Add Moolre keys in your environment variables.')
        setBusy(false)
        return
      }

      await startMoolreCheckout({
        amount: product.priceGhs,
        email,
        customerName: fullName,
        phone,
        metadata: {
          product_id: product.id,
          product_name: product.name,
        },
        onSuccess: () => {
          setTone('success')
          setMessage('Payment received. Thank you!')
          setBusy(false)
        },
        onCancel: () => {
          setTone('error')
          setMessage('Payment was cancelled.')
          setBusy(false)
        },
        onError: (err) => {
          setTone('error')
          setMessage(err?.message || 'Payment failed. Try again.')
          setBusy(false)
        },
      })
    } catch (err) {
      setTone('error')
      setMessage(
        err?.code === 'MOOLRE_NOT_CONFIGURED'
          ? 'Payment system not installed yet. Add Moolre keys in your environment variables.'
          : err.message || 'Could not start checkout.',
      )
      setBusy(false)
    }
  }

  return (
    <>
      <button type="button" className={className} onClick={() => setOpen(true)}>
        Pay now · {priceLabel}
      </button>

      {open && (
        <div className="fixed inset-0 z-[80] flex items-end justify-center bg-deep/40 p-4 sm:items-center" role="dialog" aria-modal="true">
          <button type="button" className="absolute inset-0 cursor-default" aria-label="Close checkout" onClick={close} />
          <div className="relative z-10 w-full max-w-md rounded-3xl border border-line bg-white p-6 shadow-xl">
            <p className="text-xs font-bold uppercase tracking-wide text-sea">Checkout</p>
            <h3 className="mt-1 font-display text-xl font-bold text-deep">{product.name}</h3>
            <p className="mt-1 text-sm text-muted">Amount due: <span className="font-semibold text-deep">{priceLabel}</span></p>

            {!isMoolreConfigured() && (
              <p className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900">
                Payment system not installed yet. Moolre keys have not been added.
              </p>
            )}

            <form className="mt-5 grid gap-3" onSubmit={handlePay}>
              <label className="grid gap-1 text-sm">
                <span className="font-semibold text-deep">Full name</span>
                <input
                  className="rounded-xl border border-line px-3 py-2.5 outline-none focus:border-sea"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Your name"
                  required
                />
              </label>
              <label className="grid gap-1 text-sm">
                <span className="font-semibold text-deep">Email</span>
                <input
                  type="email"
                  className="rounded-xl border border-line px-3 py-2.5 outline-none focus:border-sea"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  required
                />
              </label>
              <label className="grid gap-1 text-sm">
                <span className="font-semibold text-deep">Phone (optional)</span>
                <input
                  type="tel"
                  className="rounded-xl border border-line px-3 py-2.5 outline-none focus:border-sea"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0XXXXXXXXX"
                />
              </label>

              {message && (
                <p
                  className={`rounded-2xl px-3 py-2 text-sm ${
                    tone === 'success' ? 'border border-emerald-200 bg-emerald-50 text-emerald-800' : 'border border-red-200 bg-red-50 text-red-700'
                  }`}
                >
                  {message}
                </p>
              )}

              <div className="mt-1 flex gap-2">
                <button type="button" className="btn-secondary flex-1" onClick={close} disabled={busy}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary flex-1" disabled={busy}>
                  {busy ? 'Opening…' : `Pay now · ${priceLabel}`}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
