import { Badge, Field, PageHeader, Panel, TextArea, TextInput, statusTone } from '../components/ui'
import { WEBSITE_PAGES } from '../data/constants'
import { site } from '../../config'

export default function Website() {
  return (
    <div>
      <PageHeader
        title="Website"
        description="Manage the main Clarity Labs website separately from campaign landing pages."
      />

      <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <Panel className="p-5">
          <h2 className="font-display text-base font-semibold text-deep">Website overview</h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex items-center justify-between gap-3">
              <dt className="text-muted">Status</dt>
              <dd>
                <Badge tone="success">Live</Badge>
              </dd>
            </div>
            <div className="flex items-center justify-between gap-3">
              <dt className="text-muted">Domain</dt>
              <dd className="font-semibold text-deep">{site.domain}</dd>
            </div>
            <div className="flex items-center justify-between gap-3">
              <dt className="text-muted">Public site</dt>
              <dd className="font-semibold text-deep">Connected</dd>
            </div>
          </dl>

          <h3 className="mt-6 text-sm font-bold text-deep">Main pages</h3>
          <ul className="mt-3 space-y-2">
            {WEBSITE_PAGES.map((page) => (
              <li key={page.id} className="flex items-center justify-between rounded-xl border border-line px-3 py-2.5">
                <div>
                  <p className="text-sm font-semibold text-deep">{page.name}</p>
                  <p className="text-xs text-muted">{page.path}</p>
                </div>
                <Badge tone={statusTone(page.status)}>{page.status}</Badge>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel className="p-5">
          <h2 className="font-display text-base font-semibold text-deep">Content settings</h2>
          <p className="mt-1 text-sm text-muted">Editable fields are prepared for future website content sync.</p>
          <div className="mt-4 grid gap-3">
            <Field label="Hero headline">
              <TextInput defaultValue="Tech that makes your business easier." />
            </Field>
            <Field label="Hero supporting text">
              <TextArea defaultValue={site.description} />
            </Field>
            <Field label="Contact phone">
              <TextInput defaultValue={site.phoneDisplay} />
            </Field>
            <Field label="SEO title">
              <TextInput defaultValue="Clarity Digital Labs | Useful Technology, Made Clear" />
            </Field>
          </div>
        </Panel>
      </div>
    </div>
  )
}
