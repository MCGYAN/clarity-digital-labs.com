import { Badge, PageHeader, Panel, SecondaryButton, statusTone } from '../components/ui'
import { integrations } from '../data/mock'

export default function Integrations() {
  return (
    <div>
      <PageHeader
        title="Integrations"
        description="Connect providers when you are ready. Nothing is marked as sent or synced until connected."
      />
      <div className="grid gap-4 md:grid-cols-2">
        {integrations.map((item) => (
          <Panel key={item.id} className="p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="font-display text-lg font-semibold text-deep">{item.name}</h2>
                <p className="mt-1 text-sm text-muted">{item.description}</p>
              </div>
              <Badge tone={statusTone(item.status)}>{item.status}</Badge>
            </div>
            <SecondaryButton className="mt-4" disabled={item.status === 'Connected'}>
              {item.status === 'Connected' ? 'Connected' : 'Connect'}
            </SecondaryButton>
          </Panel>
        ))}
      </div>
    </div>
  )
}
