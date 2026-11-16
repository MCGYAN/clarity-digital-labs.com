import {
  Badge,
  EmptyState,
  IntegrationNotice,
  PageHeader,
  Panel,
  SecondaryButton,
  statusTone,
} from '../components/ui'
import DataState from '../components/DataState'
import { useAdminData } from '../context/AdminDataContext'

export default function MetaAudiences() {
  const { metaAudiences, loading, error } = useAdminData()

  return (
    <div>
      <PageHeader
        title="Meta Audiences"
        description="Prepare contact segments for Meta Custom Audiences. Syncing requires a Meta connection."
      />
      <IntegrationNotice service="Meta" />
      <div className="mt-4">
        <DataState
          loading={loading}
          error={error}
          isEmpty={!loading && !error && metaAudiences.length === 0}
          empty={<EmptyState title="No Meta audiences yet" description="This table is empty in Supabase." />}
        >
          <div className="grid gap-4 md:grid-cols-2">
            {metaAudiences.map((audience) => (
              <Panel key={audience.id} className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="font-display text-lg font-semibold text-deep">{audience.name}</h2>
                    <p className="mt-1 text-sm text-muted">{audience.contacts} contacts</p>
                  </div>
                  <Badge tone={statusTone(audience.connection)}>{audience.connection}</Badge>
                </div>
                <p className="mt-3 text-sm text-muted">Status: {audience.status}</p>
                <SecondaryButton className="mt-4" disabled>
                  Export for Meta
                </SecondaryButton>
              </Panel>
            ))}
          </div>
        </DataState>
      </div>
    </div>
  )
}
