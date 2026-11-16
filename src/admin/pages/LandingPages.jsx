import { useState } from 'react'
import { Copy, Eye, Plus } from 'lucide-react'
import {
  Badge,
  EmptyState,
  Field,
  Modal,
  PageHeader,
  Panel,
  PrimaryButton,
  SecondaryButton,
  Select,
  TextInput,
  statusTone,
} from '../components/ui'
import { useAdminData } from '../context/AdminDataContext'
import { conversionRate } from '../data/mock'

const emptyPage = {
  name: '',
  slug: '',
  campaign: '',
  status: 'Draft',
}

export default function LandingPages() {
  const { landingPages, addLandingPage, updateLandingPage, duplicateLandingPage } = useAdminData()
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState(emptyPage)
  const [copied, setCopied] = useState('')

  function savePage(e) {
    e.preventDefault()
    addLandingPage({
      ...form,
      slug: form.slug || form.name.toLowerCase().replace(/\s+/g, '-'),
    })
    setForm(emptyPage)
    setOpen(false)
  }

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
        description="Create campaign pages for offers, guides and consultations. Builder templates come next."
        actions={
          <PrimaryButton onClick={() => setOpen(true)}>
            <span className="inline-flex items-center gap-2">
              <Plus size={16} /> New landing page
            </span>
          </PrimaryButton>
        }
      />

      <Panel className="overflow-hidden">
        {landingPages.length === 0 ? (
          <EmptyState title="No landing pages yet" action={<PrimaryButton onClick={() => setOpen(true)}>Create one</PrimaryButton>} />
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-line bg-mist/50 text-xs uppercase tracking-wide text-muted">
                <tr>
                  <th className="px-4 py-3 font-semibold">Page</th>
                  <th className="px-4 py-3 font-semibold">Campaign</th>
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
                      <p className="font-semibold text-deep">{page.name}</p>
                      <p className="text-xs text-muted">/{page.slug}</p>
                    </td>
                    <td className="px-4 py-3 text-muted">{page.campaign}</td>
                    <td className="px-4 py-3">
                      <Badge tone={statusTone(page.status)}>{page.status}</Badge>
                    </td>
                    <td className="px-4 py-3 text-muted">{page.visitors.toLocaleString()}</td>
                    <td className="px-4 py-3 text-muted">{page.leads}</td>
                    <td className="px-4 py-3 text-muted">{conversionRate(page.leads, page.visitors)}%</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1.5">
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
                        <button
                          type="button"
                          className="rounded-xl border border-line px-2.5 py-2 text-deep hover:bg-mist"
                          title="Preview"
                          onClick={() => window.alert(`Preview placeholder for /${page.slug}`)}
                        >
                          <Eye size={15} />
                        </button>
                        {copied === page.slug && <span className="text-xs font-semibold text-sea">Copied</span>}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Panel>

      <Modal open={open} onClose={() => setOpen(false)} title="Create landing page" wide>
        <form className="grid gap-3" onSubmit={savePage}>
          <Field label="Page name">
            <TextInput required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </Field>
          <Field label="URL slug">
            <TextInput
              placeholder="auto-from-name"
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
            />
          </Field>
          <Field label="Campaign name">
            <TextInput required value={form.campaign} onChange={(e) => setForm({ ...form, campaign: e.target.value })} />
          </Field>
          <Field label="Status">
            <Select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
              <option>Draft</option>
              <option>Published</option>
            </Select>
          </Field>
          <p className="rounded-xl bg-mist px-3 py-3 text-sm text-muted">
            Page builder blocks (headlines, forms, VSL, CTAs, booking and payment links) will plug into this
            workflow next.
          </p>
          <div className="flex justify-end gap-2">
            <SecondaryButton type="button" onClick={() => setOpen(false)}>
              Cancel
            </SecondaryButton>
            <PrimaryButton type="submit">Create page</PrimaryButton>
          </div>
        </form>
      </Modal>
    </div>
  )
}
