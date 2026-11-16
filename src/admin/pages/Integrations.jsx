import { Badge, PageHeader, Panel, statusTone } from '../components/ui'
import { INTEGRATIONS } from '../data/constants'
import { isMoolreConfigured } from '../../lib/moolre'

export default function Integrations() {
  const items = INTEGRATIONS.map((item) => {
    if (item.id !== 'i4') return item
    return {
      ...item,
      status: isMoolreConfigured() ? 'Connected' : 'Not connected',
      description: isMoolreConfigured()
        ? 'Moolre checkout is live. Pay now uses product prices automatically.'
        : 'Add VITE_MOOLRE_USERNAME, VITE_MOOLRE_PUBLIC_KEY, and VITE_MOOLRE_ACCOUNT_NUMBER in Vercel/.env, then redeploy.',
    }
  })

  return (
    <div>
      <PageHeader
        title="Integrations"
        description="Connect providers when you are ready. Nothing is marked as sent or synced until connected."
      />
      <div className="grid gap-4 md:grid-cols-2">
        {items.map((item) => (
          <Panel key={item.id} className="p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="font-display text-lg font-semibold text-deep">{item.name}</h2>
                <p className="mt-1 text-sm text-muted">{item.description}</p>
              </div>
              <Badge tone={statusTone(item.status)}>{item.status}</Badge>
            </div>
            {item.id === 'i4' && (
              <p className="mt-4 text-xs text-muted">
                Keys are set in environment variables, not inside this admin screen.
              </p>
            )}
          </Panel>
        ))}
      </div>
    </div>
  )
}
