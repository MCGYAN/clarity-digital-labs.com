import { Link, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function AdminLayout() {
  const { signOut } = useAuth()

  return (
    <div className="min-h-[100svh] bg-mist">
      <header className="glass-nav sticky top-0 z-40">
        <div className="container-x flex h-16 items-center justify-between gap-4">
          <Link to="/admin" className="font-display text-sm font-bold tracking-[0.14em] text-deep">
            CLARITY ADMIN
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/" className="text-sm font-semibold text-sea hover:underline">
              View site
            </Link>
            <button
              type="button"
              onClick={() => signOut()}
              className="rounded-xl border border-line bg-white px-3 py-2 text-sm font-semibold text-deep transition hover:border-sea/30"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="container-x py-8 md:py-10">
        <Outlet />
      </main>
    </div>
  )
}
