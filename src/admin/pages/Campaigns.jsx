import { Link } from 'react-router-dom'
import { EmptyState, PageHeader, Panel } from '../components/ui'
import DataState from '../components/DataState'
import { useAdminData } from '../context/AdminDataContext'

export default function Campaigns() {
  const { emailCampaigns, smsCampaigns, metaAudiences, loading, error } = useAdminData()
  const total =
    emailCampaigns.length + smsCampaigns.length + metaAudiences.length

  return (
    <div>
      <PageHeader
        title="Campaigns"
        description="Organise marketing work across email, SMS and Meta audiences."
      />

      <div className="grid gap-4 md:grid-cols-3">
        {[
          { title: 'Email Marketing', to: '/admin/email', count: emailCampaigns.length, blurb: 'Prepare broadcasts and sequences.' },
          { title: 'SMS Marketing', to: '/admin/sms', count: smsCampaigns.length, blurb: 'Draft reminders and SMS offers.' },
          { title: 'Meta Audiences', to: '/admin/meta-audiences', count: metaAudiences.length, blurb: 'Ready contacts for custom audiences.' },
        ].map((card) => (
          <Panel key={card.title} className="p-5">
            <h2 className="font-display text-lg font-semibold text-deep">{card.title}</h2>
            <p className="mt-2 text-sm text-muted">{card.blurb}</p>
            <p className="mt-3 text-xs font-semibold text-muted">{card.count} saved</p>
            <Link to={card.to} className="mt-4 inline-block text-sm font-semibold text-sea hover:underline">
              Open →
            </Link>
          </Panel>
        ))}
      </div>

      <div className="mt-4">
        <DataState
          loading={loading}
          error={error}
          isEmpty={!loading && !error && total === 0}
          empty={
            <EmptyState
              title="No campaign records yet"
              description="Email, SMS and Meta tables are empty and ready. Providers stay disconnected until you connect them."
            />
          }
        >
          <Panel className="p-5">
            <p className="text-sm text-muted">
              You have {emailCampaigns.length} email, {smsCampaigns.length} SMS and {metaAudiences.length} Meta
              audience records in Supabase.
            </p>
          </Panel>
        </DataState>
      </div>
    </div>
  )
}
