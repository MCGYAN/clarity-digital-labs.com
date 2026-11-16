import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { Menu } from 'lucide-react'
import Sidebar from '../admin/components/Sidebar'
import { useAuth } from '../context/AuthContext'

export default function AdminLayout() {
  const { user, signOut } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-[100svh] bg-[#F7FAFB] text-ink">
      <div className="flex min-h-[100svh]">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-3 border-b border-line bg-white/90 px-4 backdrop-blur sm:px-6">
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-white text-deep lg:hidden"
                onClick={() => setSidebarOpen(true)}
                aria-label="Open menu"
              >
                <Menu size={18} />
              </button>
              <div className="lg:hidden">
                <p className="font-display text-sm font-bold tracking-[0.14em] text-deep">CLARITY</p>
              </div>
              <p className="hidden text-sm text-muted md:block">Business command centre</p>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <p className="hidden max-w-[200px] truncate text-xs text-muted sm:block">{user?.email}</p>
              <Link
                to="/"
                className="rounded-xl border border-line bg-white px-3 py-2 text-sm font-semibold text-deep transition hover:border-sea/30"
              >
                View site
              </Link>
              <button
                type="button"
                onClick={() => signOut()}
                className="rounded-xl bg-deep px-3 py-2 text-sm font-semibold text-white transition hover:bg-deep-soft"
              >
                Sign out
              </button>
            </div>
          </header>

          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}
