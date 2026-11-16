import { Field, PageHeader, Panel, TextInput, Select, SecondaryButton } from '../components/ui'
import { site } from '../../config'
import { useAuth } from '../../context/AuthContext'

export default function Settings() {
  const { user } = useAuth()

  return (
    <div>
      <PageHeader title="Settings" description="Business profile, account and provider preferences." />

      <div className="grid gap-4 xl:grid-cols-2">
        <Panel className="p-5">
          <h2 className="font-display text-base font-semibold text-deep">Business profile</h2>
          <div className="mt-4 grid gap-3">
            <Field label="Business name">
              <TextInput defaultValue="Clarity" />
            </Field>
            <Field label="Legal / trading name">
              <TextInput defaultValue={site.name} />
            </Field>
            <Field label="Phone">
              <TextInput defaultValue={site.phoneDisplay} />
            </Field>
            <Field label="Website">
              <TextInput defaultValue={site.domain} />
            </Field>
          </div>
        </Panel>

        <Panel className="p-5">
          <h2 className="font-display text-base font-semibold text-deep">Account</h2>
          <div className="mt-4 grid gap-3">
            <Field label="Signed-in email">
              <TextInput defaultValue={user?.email || ''} readOnly />
            </Field>
            <Field label="Role">
              <TextInput defaultValue="Admin" readOnly />
            </Field>
            <Field label="Timezone">
              <Select defaultValue="Africa/Accra">
                <option>Africa/Accra</option>
                <option>UTC</option>
              </Select>
            </Field>
          </div>
        </Panel>

        <Panel className="p-5">
          <h2 className="font-display text-base font-semibold text-deep">Team members</h2>
          <p className="mt-2 text-sm text-muted">Invite flow will use Supabase Auth later.</p>
          <div className="mt-4 rounded-xl border border-line px-3 py-3 text-sm">
            <p className="font-semibold text-deep">{user?.email}</p>
            <p className="text-muted">Owner · Admin</p>
          </div>
          <SecondaryButton className="mt-4" disabled>
            Invite teammate
          </SecondaryButton>
        </Panel>

        <Panel className="p-5">
          <h2 className="font-display text-base font-semibold text-deep">Providers & notifications</h2>
          <ul className="mt-4 space-y-3 text-sm text-muted">
            <li>Email provider settings — manage in Integrations</li>
            <li>SMS provider settings — manage in Integrations</li>
            <li>Meta integration — manage in Integrations</li>
            <li>Payment settings — manage in Integrations</li>
            <li>Notification preferences — coming with provider hooks</li>
          </ul>
        </Panel>
      </div>
    </div>
  )
}
