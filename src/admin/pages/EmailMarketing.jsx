import {
  Badge,
  EmptyState,
  IntegrationNotice,
  PageHeader,
  Panel,
  PrimaryButton,
  statusTone,
} from '../components/ui'
import DataState from '../components/DataState'
import { useAdminData } from '../context/AdminDataContext'

export default function EmailMarketing() {
  const { emailCampaigns, loading, error } = useAdminData()

  return (
    <div>
      <PageHeader
        title="Email Marketing"
        description="Prepare email campaigns now. Delivery starts after an email provider is connected."
        actions={<PrimaryButton disabled>Create campaign</PrimaryButton>}
      />
      <IntegrationNotice service="Email provider" />
      <div className="mt-4">
        <DataState
          loading={loading}
          error={error}
          isEmpty={!loading && !error && emailCampaigns.length === 0}
          empty={<EmptyState title="No email campaigns yet" description="This table is empty in Supabase." />}
        >
          <Panel className="overflow-hidden">
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
        </DataState>
      </div>
    </div>
  )
}
