import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { mapProduct } from '../admin/lib/mappers'
import { formatGhs } from '../admin/data/constants'
import PayNowButton from '../components/PayNowButton'
import { site } from '../config'
import { supabase } from '../lib/supabase'

export default function DigitalProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    async function load() {
      setLoading(true)
      setError('')
      const { data, error: fetchError } = await supabase
        .from('products')
        .select('*')
        .eq('status', 'Published')
        .order('created_at', { ascending: false })

      if (!active) return

      if (fetchError) {
        setError(fetchError.message)
        setLoading(false)
        return
      }

      setProducts((data || []).map(mapProduct))
      setLoading(false)
    }

    load()
    return () => {
      active = false
    }
  }, [])

  return (
    <section className="ambient-bg relative min-h-[100svh] py-24 md:py-28">
      <div className="relative z-10 container-x">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-label">Digital Products</p>
          <h1 className="display-title text-3xl sm:text-4xl md:text-5xl">Useful tools for your business.</h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            Practical digital products from Clarity. Buy what you need, use it right away.
          </p>
        </div>

        {loading && (
          <p className="mt-12 text-center text-sm font-semibold text-muted">Loading products…</p>
        )}

        {error && (
          <p className="mx-auto mt-12 max-w-lg rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-center text-sm text-red-700">
            {error}
          </p>
        )}

        {!loading && !error && products.length === 0 && (
          <div className="mx-auto mt-12 max-w-xl rounded-3xl border border-line bg-white/80 p-8 text-center">
            <h2 className="font-display text-2xl font-bold text-deep">No products published yet</h2>
            <p className="mt-3 text-muted">Check back soon, or talk to us if you want early access.</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link to="/" className="btn-secondary btn-stack-mobile">
                Back to Home
              </Link>
              <a href={site.whatsappUrl} target="_blank" rel="noreferrer" className="btn-primary btn-stack-mobile">
                Talk To Us
              </a>
            </div>
          </div>
        )}

        {!loading && !error && products.length > 0 && (
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
              <article key={product.id} className="rounded-3xl border border-line bg-white/90 p-6 shadow-[0_1px_2px_rgba(10,61,77,0.04)]">
                <p className="text-xs font-bold uppercase tracking-wide text-sea">Digital product</p>
                <h2 className="mt-2 font-display text-xl font-semibold text-deep">{product.name}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted">{product.description || 'No description yet.'}</p>
                <p className="mt-5 font-display text-2xl font-bold text-deep">{formatGhs(product.priceGhs)}</p>
                <div className="mt-6">
                  <PayNowButton product={product} />
                </div>
              </article>
            ))}
          </div>
        )}

        {!loading && products.length > 0 && (
          <div className="mt-10 text-center">
            <Link to="/" className="text-sm font-semibold text-sea hover:underline">
              Back to Home
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
