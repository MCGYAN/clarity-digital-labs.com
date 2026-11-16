import { IntegrationNotice, PageHeader, Panel, Badge, statusTone, PrimaryButton } from '../components/ui'
import { emailCampaigns } from '../data/mock'

export default function EmailMarketing() {
  return (
    <div>
      <PageHeader
        title="Email Marketing"
        description="Prepare email campaigns now. Delivery starts after an email provider is connected."
        actions={<PrimaryButton disabled>Create campaign</PrimaryButton>}
      />
      <IntegrationNotice service="Email provider" />
      <Panel className="mt-4 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-line bg-mist/50 text-xs uppercase tracking-wide text-muted">
              <tr>
                <th className="px-4 py-3 font-semibold">Campaign</th>
                <th className="px-4 py-3 font-semibold">Recipients</th>
                <th className="px-4 py-3 font-semibold">Sent</th>
                <th className="px-4 py-3 font-semibold">Opens</th>
                <th className="px-4 py-3 font-semibold">Clicks</th>
                <th className="px-4 py-3 font-semibold">Provider</th>
                <th className="px-4 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {emailCampaigns.map((c) => (
                <tr key={c.id} className="border-b border-line/70">
                  <td className="px-4 py-3 font-semibold text-deep">{c.name}</td>
                  <td className="px-4 py-3 text-muted">{c.recipients}</td>
                  <td className="px-4 py-3 text-muted">{c.sent}</td>
                  <td className="px-4 py-3 text-muted">{c.opens}</td>
                  <td className="px-4 py-3 text-muted">{c.clicks}</td>
                  <td className="px-4 py-3">
                    <Badge tone={statusTone(c.provider)}>{c.provider}</Badge>
                  </td>
                  <td className="px-4 py-3">
                    <Badge tone={statusTone(c.status)}>{c.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  )
}
