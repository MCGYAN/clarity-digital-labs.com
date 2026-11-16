import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  Kanban,
  CalendarDays,
  PanelsTopLeft,
  Megaphone,
  Mail,
  MessageSquare,
  Target,
  Package,
  Receipt,
  Globe,
  ChartColumn,
  Plug,
  Settings,
  X,
} from 'lucide-react'
import { adminNav } from '../nav'

const ICONS = {
  LayoutDashboard,
  Users,
  Kanban,
  CalendarDays,
  PanelsTopLeft,
  Megaphone,
  Mail,
  MessageSquare,
  Target,
  Package,
  Receipt,
  Globe,
  ChartColumn,
  Plug,
  Settings,
}

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {open && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-deep/35 lg:hidden"
          aria-label="Close navigation"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[272px] flex-col border-r border-line bg-white transition-transform duration-300 lg:static lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-line px-5">
          <div>
            <p className="font-display text-sm font-bold tracking-[0.16em] text-deep">CLARITY</p>
            <p className="text-[11px] font-medium text-muted">Admin</p>
          </div>
          <button
            type="button"
            className="rounded-lg p-2 text-muted hover:bg-mist lg:hidden"
            onClick={onClose}
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          {adminNav.map((group) => (
            <div key={group.section} className="mb-5">
              <p className="mb-2 px-2 text-[11px] font-bold uppercase tracking-[0.08em] text-muted/80">
                {group.section}
              </p>
              <ul className="space-y-1">
                {group.items.map((item) => {
                  const Icon = ICONS[item.icon]
                  return (
                    <li key={item.to}>
                      <NavLink
                        to={item.to}
                        end={item.end}
                        onClick={onClose}
                        className={({ isActive }) =>
                          `flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
                            isActive
                              ? 'bg-sea/10 text-sea'
                              : 'text-ink/80 hover:bg-mist hover:text-deep'
                          }`
                        }
                      >
                        {Icon && <Icon size={17} strokeWidth={2} />}
                        {item.label}
                      </NavLink>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
    </>
  )
}
