import { Link } from 'react-router-dom'
import { PageHeader, Panel, Badge, statusTone } from '../components/ui'
import { campaignPerformance } from '../data/mock'

export default function Campaigns() {
  return (
    <div>
      <PageHeader
        title="Campaigns"
        description="Organise marketing work across email, SMS and Meta audiences."
      />

      <div className="grid gap-4 md:grid-cols-3">
        {[
          { title: 'Email Marketing', to: '/admin/email', blurb: 'Prepare broadcasts and sequences.' },
          { title: 'SMS Marketing', to: '/admin/sms', blurb: 'Draft reminders and SMS offers.' },
          { title: 'Meta Audiences', to: '/admin/meta-audiences', blurb: 'Ready contacts for custom audiences.' },
        ].map((card) => (
          <Panel key={card.title} className="p-5">
            <h2 className="font-display text-lg font-semibold text-deep">{card.title}</h2>
            <p className="mt-2 text-sm text-muted">{card.blurb}</p>
            <Link to={card.to} className="mt-4 inline-block text-sm font-semibold text-sea hover:underline">
              Open →
            </Link>
          </Panel>
        ))}
      </div>

      <Panel className="mt-4 overflow-hidden">
        <div className="border-b border-line px-5 py-4">
          <h2 className="font-display text-base font-semibold text-deep">Campaign performance</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-mist/50 text-xs uppercase tracking-wide text-muted">
              <tr>
                <th className="px-4 py-3 font-semibold">Campaign</th>
                <th className="px-4 py-3 font-semibold">Leads</th>
                <th className="px-4 py-3 font-semibold">Spend</th>
                <th className="px-4 py-3 font-semibold">Conversion</th>
                <th className="px-4 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {campaignPerformance.map((row) => (
                <tr key={row.name} className="border-t border-line">
                  <td className="px-4 py-3 font-semibold text-deep">{row.name}</td>
                  <td className="px-4 py-3 text-muted">{row.leads}</td>
                  <td className="px-4 py-3 text-muted">{row.spend}</td>
                  <td className="px-4 py-3 text-muted">{row.conv}</td>
                  <td className="px-4 py-3">
                    <Badge tone={statusTone('Published')}>Active sample</Badge>
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
