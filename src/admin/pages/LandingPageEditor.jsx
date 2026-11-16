import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import LandingPageView from '../../components/landing/LandingPageView'
import {
  Field,
  PageHeader,
  Panel,
  PrimaryButton,
  SecondaryButton,
  Select,
  TextArea,
  TextInput,
} from '../components/ui'
import { useAdminData } from '../context/AdminDataContext'
import { getTemplate, LANDING_TEMPLATES, slugify } from '../data/landingPresets'

const CTA_OPTIONS = [
  { value: 'lead_form', label: 'Lead form (capture details)' },
  { value: 'book_call', label: 'Book a call (calendar / contact)' },
  { value: 'payment', label: 'Payment link' },
  { value: 'custom', label: 'Custom URL' },
]

function buildFromTemplate(templateKey) {
  const template = getTemplate(templateKey)
  return {
    name: template.defaults.name,
    slug: template.defaults.slug,
    campaign: template.defaults.campaign,
    status: 'Draft',
    templateKey: template.key,
    content: { ...template.defaults },
    ctaType: template.ctaType,
    ctaLabel: template.ctaLabel,
    ctaUrl: template.ctaType === 'book_call' ? '/#contact' : '',
    hasVsl: template.hasVsl,
    vslUrl: '',
    leadMagnetUrl: '',
    formFields: ['fullName', 'email', 'phone'],
  }
}

export default function LandingPageEditor() {
  const { id } = useParams()
  const isNew = id === 'new'
  const navigate = useNavigate()
  const { landingPages, addLandingPage, updateLandingPage, loading } = useAdminData()
  const existing = useMemo(() => landingPages.find((p) => p.id === id), [landingPages, id])

  const [step, setStep] = useState(isNew ? 'choose' : 'edit')
  const [form, setForm] = useState(() => buildFromTemplate('lead_magnet'))
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [preview, setPreview] = useState(false)

  useEffect(() => {
    if (!isNew && existing) {
      setForm({
        name: existing.name,
        slug: existing.slug,
        campaign: existing.campaign,
        status: existing.status,
        templateKey: existing.templateKey,
        content: existing.content,
        ctaType: existing.ctaType,
        ctaLabel: existing.ctaLabel,
        ctaUrl: existing.ctaUrl,
        hasVsl: existing.hasVsl,
        vslUrl: existing.vslUrl,
        leadMagnetUrl: existing.leadMagnetUrl,
        formFields: existing.formFields,
      })
      setStep('edit')
    }
  }, [isNew, existing])

  function chooseTemplate(key) {
    setForm(buildFromTemplate(key))
    setStep('edit')
  }

  function updateContent(key, value) {
    setForm((prev) => ({ ...prev, content: { ...prev.content, [key]: value } }))
  }

  function updateList(key, index, value) {
    setForm((prev) => {
      const list = [...(prev.content[key] || [])]
      list[index] = value
      return { ...prev, content: { ...prev.content, [key]: list } }
    })
  }

  function updateFaq(index, field, value) {
    setForm((prev) => {
      const list = [...(prev.content.faq || [])]
      list[index] = { ...list[index], [field]: value }
      return { ...prev, content: { ...prev.content, faq: list } }
    })
  }

  function addFaq() {
    setForm((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        faq: [...(prev.content.faq || []), { q: 'New question?', a: 'Add your answer here.' }],
      },
    }))
  }

  function removeFaq(index) {
    setForm((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        faq: (prev.content.faq || []).filter((_, i) => i !== index),
      },
    }))
  }

  async function save(status) {
    setSaving(true)
    setError('')
    const payload = {
      ...form,
      status: status || form.status,
      slug: slugify(form.slug || form.name),
      name: form.name || form.content.headline || 'Untitled page',
    }
    try {
      if (isNew) {
        const created = await addLandingPage(payload)
        navigate(`/admin/landing-pages/${created.id}`, { replace: true })
      } else {
        await updateLandingPage(id, payload)
      }
    } catch (err) {
      setError(err.message || 'Could not save page')
    } finally {
      setSaving(false)
    }
  }

  if (!isNew && loading && !existing) {
    return <p className="text-sm font-semibold text-muted">Loading page…</p>
  }

  if (!isNew && !loading && !existing) {
    return (
      <div>
        <PageHeader title="Page not found" />
        <Link to="/admin/landing-pages" className="text-sm font-semibold text-sea">
          Back to landing pages
        </Link>
      </div>
    )
  }

  if (step === 'choose') {
    return (
      <div>
        <Link to="/admin/landing-pages" className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-sea">
          <ArrowLeft size={16} /> Back
        </Link>
        <PageHeader
          title="Choose a page type"
          description="Pick one. Clarity fills the page with strong default words. You only change what you need."
        />
        <div className="grid gap-4 md:grid-cols-2">
          {LANDING_TEMPLATES.map((template) => (
            <button
              key={template.key}
              type="button"
              onClick={() => chooseTemplate(template.key)}
              className="rounded-3xl border border-line bg-white p-5 text-left transition hover:border-sea/40 hover:shadow-sm"
            >
              <p className="font-display text-lg font-semibold text-deep">{template.name}</p>
              <p className="mt-2 text-sm text-muted">{template.blurb}</p>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-sea">
                CTA: {template.ctaLabel}
              </p>
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div>
      <Link to="/admin/landing-pages" className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-sea">
        <ArrowLeft size={16} /> Back
      </Link>
      <PageHeader
        title={isNew ? 'Set up landing page' : 'Edit landing page'}
        description="Defaults are already filled. Change only the words or links you care about."
        actions={
          <div className="flex flex-wrap gap-2">
            <SecondaryButton onClick={() => setPreview((v) => !v)}>
              {preview ? 'Hide preview' : 'Preview'}
            </SecondaryButton>
            <SecondaryButton disabled={saving} onClick={() => save('Draft')}>
              Save draft
            </SecondaryButton>
            <PrimaryButton disabled={saving} onClick={() => save('Published')}>
              {saving ? 'Saving…' : 'Publish'}
            </PrimaryButton>
          </div>
        }
      />

      {error && <p className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

      <div className={`grid gap-4 ${preview ? 'xl:grid-cols-2' : ''}`}>
        <div className="space-y-4">
          <Panel className="p-5">
            <h2 className="font-display text-base font-semibold text-deep">Page basics</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <Field label="Internal name">
                <TextInput value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </Field>
              <Field label="URL slug">
                <TextInput value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
              </Field>
              <Field label="Campaign">
                <TextInput value={form.campaign} onChange={(e) => setForm({ ...form, campaign: e.target.value })} />
              </Field>
              <Field label="Template">
                <Select
                  value={form.templateKey}
                  onChange={(e) => {
                    const next = buildFromTemplate(e.target.value)
                    setForm({
                      ...next,
                      name: form.name,
                      slug: form.slug,
                      campaign: form.campaign,
                    })
                  }}
                >
                  {LANDING_TEMPLATES.map((t) => (
                    <option key={t.key} value={t.key}>
                      {t.name}
                    </option>
                  ))}
                </Select>
              </Field>
            </div>
          </Panel>

          <Panel className="p-5">
            <h2 className="font-display text-base font-semibold text-deep">Offer copy</h2>
            <div className="mt-4 grid gap-3">
              <Field label="Eyebrow">
                <TextInput value={form.content.eyebrow || ''} onChange={(e) => updateContent('eyebrow', e.target.value)} />
              </Field>
              <Field label="Headline">
                <TextInput value={form.content.headline || ''} onChange={(e) => updateContent('headline', e.target.value)} />
              </Field>
              <Field label="Supporting text">
                <TextArea value={form.content.subheadline || ''} onChange={(e) => updateContent('subheadline', e.target.value)} />
              </Field>
              {(form.content.problemPoints || []).map((point, index) => (
                <Field key={`problem-${index}`} label={`Problem point ${index + 1}`}>
                  <TextInput value={point} onChange={(e) => updateList('problemPoints', index, e.target.value)} />
                </Field>
              ))}
              {(form.content.offerPoints || []).map((point, index) => (
                <Field key={`offer-${index}`} label={`Offer point ${index + 1}`}>
                  <TextInput value={point} onChange={(e) => updateList('offerPoints', index, e.target.value)} />
                </Field>
              ))}
            </div>
          </Panel>

          <Panel className="p-5">
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-display text-base font-semibold text-deep">FAQ</h2>
              <SecondaryButton type="button" onClick={addFaq}>
                Add FAQ
              </SecondaryButton>
            </div>
            <div className="mt-4 grid gap-4">
              {(form.content.faq || []).length === 0 && (
                <p className="text-sm text-muted">No FAQ items yet. Add one to show questions on the page.</p>
              )}
              {(form.content.faq || []).map((item, index) => (
                <div key={`faq-${index}`} className="rounded-2xl border border-line bg-mist/30 p-4">
                  <Field label={`Question ${index + 1}`}>
                    <TextInput value={item.q || ''} onChange={(e) => updateFaq(index, 'q', e.target.value)} />
                  </Field>
                  <div className="mt-3">
                    <Field label="Answer">
                      <TextArea value={item.a || ''} onChange={(e) => updateFaq(index, 'a', e.target.value)} />
                    </Field>
                  </div>
                  <div className="mt-3 flex justify-end">
                    <SecondaryButton type="button" onClick={() => removeFaq(index)}>
                      Remove
                    </SecondaryButton>
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          <Panel className="p-5">
            <h2 className="font-display text-base font-semibold text-deep">Call to action</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <Field label="CTA type">
                <Select value={form.ctaType} onChange={(e) => setForm({ ...form, ctaType: e.target.value })}>
                  {CTA_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </Select>
              </Field>
              <Field label="Button label">
                <TextInput value={form.ctaLabel} onChange={(e) => setForm({ ...form, ctaLabel: e.target.value })} />
              </Field>
              {(form.ctaType === 'book_call' || form.ctaType === 'payment' || form.ctaType === 'custom') && (
                <div className="sm:col-span-2">
                  <Field
                    label={
                      form.ctaType === 'payment'
                        ? 'Payment link'
                        : form.ctaType === 'book_call'
                          ? 'Booking / calendar link'
                          : 'Custom URL'
                    }
                  >
                    <TextInput
                      placeholder={
                        form.ctaType === 'book_call'
                          ? '/#contact or your calendar URL'
                          : 'https://...'
                      }
                      value={form.ctaUrl}
                      onChange={(e) => setForm({ ...form, ctaUrl: e.target.value })}
                    />
                  </Field>
                </div>
              )}
              {form.ctaType === 'lead_form' && (
                <div className="sm:col-span-2">
                  <Field label="Lead magnet file / link (optional)">
                    <TextInput
                      placeholder="Google Drive / Dropbox / file URL"
                      value={form.leadMagnetUrl}
                      onChange={(e) => setForm({ ...form, leadMagnetUrl: e.target.value })}
                    />
                  </Field>
                </div>
              )}
              {form.hasVsl && (
                <div className="sm:col-span-2">
                  <Field label="VSL embed URL">
                    <TextInput
                      placeholder="YouTube embed URL"
                      value={form.vslUrl}
                      onChange={(e) => setForm({ ...form, vslUrl: e.target.value })}
                    />
                  </Field>
                </div>
              )}
            </div>
          </Panel>
        </div>

        {preview && (
          <div className="overflow-hidden rounded-3xl border border-line bg-white shadow-sm">
            <div className="border-b border-line px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted">
              Live preview
            </div>
            <div className="max-h-[80vh] overflow-y-auto">
              <LandingPageView page={{ ...form, id: id || 'preview' }} preview />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
