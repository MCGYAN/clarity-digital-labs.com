import { IntegrationNotice, PageHeader, Panel, Badge, statusTone, PrimaryButton } from '../components/ui'
import { smsCampaigns } from '../data/mock'

export default function SmsMarketing() {
  return (
    <div>
      <PageHeader
        title="SMS Marketing"
        description="Draft SMS campaigns and segments. Delivery reports appear after an SMS provider is connected."
        actions={<PrimaryButton disabled>Create SMS campaign</PrimaryButton>}
      />
      <IntegrationNotice service="SMS provider" />
      <Panel className="mt-4 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-line bg-mist/50 text-xs uppercase tracking-wide text-muted">
              <tr>
                <th className="px-4 py-3 font-semibold">Campaign</th>
                <th className="px-4 py-3 font-semibold">Segment</th>
                <th className="px-4 py-3 font-semibold">Recipients</th>
                <th className="px-4 py-3 font-semibold">Provider</th>
                <th className="px-4 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {smsCampaigns.map((c) => (
                <tr key={c.id} className="border-b border-line/70">
                  <td className="px-4 py-3 font-semibold text-deep">{c.name}</td>
                  <td className="px-4 py-3 text-muted">{c.segment}</td>
                  <td className="px-4 py-3 text-muted">{c.recipients}</td>
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
