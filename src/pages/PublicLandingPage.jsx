import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import LandingPageView from '../components/landing/LandingPageView'
import { mapLandingPage } from '../admin/lib/mappers'
import { supabase } from '../lib/supabase'

export default function PublicLandingPage() {
  const { slug } = useParams()
  const [page, setPage] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    async function load() {
      setLoading(true)
      setError('')
      const { data, error: fetchError } = await supabase
        .from('landing_pages')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'Published')
        .maybeSingle()

      if (!active) return

      if (fetchError) {
        setError(fetchError.message)
        setLoading(false)
        return
      }

      if (!data) {
        setError('This page is not published or does not exist.')
        setLoading(false)
        return
      }

      setPage(mapLandingPage(data))
      setLoading(false)
      supabase.rpc('increment_landing_page_visitors', { page_slug: slug })
    }

    load()
    return () => {
      active = false
    }
  }, [slug])

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-sm font-semibold text-muted">
        Loading page…
      </div>
    )
  }

  if (error || !page) {
    return (
      <div className="container-x py-24 text-center">
        <h1 className="display-title text-3xl">Page not available</h1>
        <p className="mt-3 text-muted">{error || 'Not found'}</p>
        <Link to="/" className="mt-6 inline-block text-sm font-semibold text-sea hover:underline">
          Back to Clarity home
        </Link>
      </div>
    )
  }

  return (
    <div>
      <div className="border-b border-line bg-white">
        <div className="container-x flex h-14 items-center justify-between">
          <Link to="/" className="font-display text-sm font-bold tracking-[0.14em] text-deep">
            CLARITY
          </Link>
          <a href="https://wa.me/233503893036" className="text-sm font-semibold text-sea hover:underline">
            WhatsApp us
          </a>
        </div>
      </div>
      <LandingPageView page={page} />
    </div>
  )
}
