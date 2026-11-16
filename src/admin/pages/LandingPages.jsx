import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Copy, Eye, Plus } from 'lucide-react'
import {
  Badge,
  EmptyState,
  PageHeader,
  Panel,
  SecondaryButton,
  statusTone,
} from '../components/ui'
import DataState from '../components/DataState'
import { useAdminData } from '../context/AdminDataContext'
import { conversionRate } from '../data/constants'
import { getTemplate } from '../data/landingPresets'

export default function LandingPages() {
  const { landingPages, updateLandingPage, duplicateLandingPage, loading, error } = useAdminData()
  const [copied, setCopied] = useState('')

  function copyUrl(slug) {
    const url = `${window.location.origin}/p/${slug}`
    navigator.clipboard?.writeText(url)
    setCopied(slug)
    setTimeout(() => setCopied(''), 1500)
  }

  return (
    <div>
      <PageHeader
        title="Landing Pages"
        description="Pick a ready page type, adjust a few words, publish. No blank-page stress."
        actions={
          <Link
            to="/admin/landing-pages/new"
            className="btn-primary !min-h-10 !rounded-xl !px-4 !py-2 text-sm inline-flex items-center gap-2"
          >
            <Plus size={16} /> New landing page
          </Link>
        }
      />

      <DataState
        loading={loading}
        error={error}
        isEmpty={!loading && !error && landingPages.length === 0}
        empty={
          <EmptyState
            title="No landing pages yet"
            description="Start with a free guide, book-a-call, paid offer, or VSL page."
            action={
              <Link to="/admin/landing-pages/new" className="btn-primary !min-h-10 !rounded-xl !px-4 !py-2 text-sm">
                Create page
              </Link>
            }
          />
        }
      >
        <Panel className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-line bg-mist/50 text-xs uppercase tracking-wide text-muted">
                <tr>
                  <th className="px-4 py-3 font-semibold">Page</th>
                  <th className="px-4 py-3 font-semibold">Type</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Visitors</th>
                  <th className="px-4 py-3 font-semibold">Leads</th>
                  <th className="px-4 py-3 font-semibold">Conv.</th>
                  <th className="px-4 py-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {landingPages.map((page) => (
                  <tr key={page.id} className="border-b border-line/70">
                    <td className="px-4 py-3">
                      <Link to={`/admin/landing-pages/${page.id}`} className="font-semibold text-deep hover:text-sea">
                        {page.name}
                      </Link>
                      <p className="text-xs text-muted">/p/{page.slug}</p>
                    </td>
                    <td className="px-4 py-3 text-muted">{getTemplate(page.templateKey).name}</td>
                    <td className="px-4 py-3">
                      <Badge tone={statusTone(page.status)}>{page.status}</Badge>
                    </td>
                    <td className="px-4 py-3 text-muted">{page.visitors.toLocaleString()}</td>
                    <td className="px-4 py-3 text-muted">{page.leads}</td>
                    <td className="px-4 py-3 text-muted">{conversionRate(page.leads, page.visitors)}%</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1.5">
                        <Link
                          to={`/admin/landing-pages/${page.id}`}
                          className="inline-flex min-h-10 items-center justify-center rounded-xl border border-line bg-white px-4 py-2 text-sm font-semibold text-deep transition hover:border-sea/30 hover:bg-mist"
                        >
                          Edit
                        </Link>
                        <SecondaryButton
                          onClick={() =>
                            updateLandingPage(page.id, {
                              status: page.status === 'Published' ? 'Draft' : 'Published',
                            })
                          }
                        >
                          {page.status === 'Published' ? 'Unpublish' : 'Publish'}
                        </SecondaryButton>
                        <SecondaryButton onClick={() => duplicateLandingPage(page.id)}>Duplicate</SecondaryButton>
                        <button
                          type="button"
                          className="rounded-xl border border-line px-2.5 py-2 text-deep hover:bg-mist"
                          title="Copy URL"
                          onClick={() => copyUrl(page.slug)}
                        >
                          <Copy size={15} />
                        </button>
                        {page.status === 'Published' && (
                          <a
                            href={`/p/${page.slug}`}
                            target="_blank"
                            rel="noreferrer"
                            className="rounded-xl border border-line px-2.5 py-2 text-deep hover:bg-mist"
                            title="Open live page"
                          >
                            <Eye size={15} />
                          </a>
                        )}
                        {copied === page.slug && <span className="text-xs font-semibold text-sea">Copied</span>}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
      </DataState>
    </div>
  )
}
