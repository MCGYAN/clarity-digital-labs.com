import { Route, Routes, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import ProtectedRoute from './components/admin/ProtectedRoute'
import AdminLayout from './layouts/AdminLayout'
import { AdminDataProvider } from './admin/context/AdminDataContext'
import Home from './pages/Home'
import DigitalProducts from './pages/DigitalProducts'
import AdminLogin from './pages/admin/AdminLogin'
import Overview from './admin/pages/Overview'
import Contacts from './admin/pages/Contacts'
import ContactDetail from './admin/pages/ContactDetail'
import Pipeline from './admin/pages/Pipeline'
import Bookings from './admin/pages/Bookings'
import LandingPages from './admin/pages/LandingPages'
import LandingPageEditor from './admin/pages/LandingPageEditor'
import PublicLandingPage from './pages/PublicLandingPage'
import Campaigns from './admin/pages/Campaigns'
import EmailMarketing from './admin/pages/EmailMarketing'
import SmsMarketing from './admin/pages/SmsMarketing'
import MetaAudiences from './admin/pages/MetaAudiences'
import Products from './admin/pages/Products'
import Sales from './admin/pages/Sales'
import Website from './admin/pages/Website'
import Analytics from './admin/pages/Analytics'
import Integrations from './admin/pages/Integrations'
import Settings from './admin/pages/Settings'

export default function App() {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin')
  const isLandingRoute = location.pathname.startsWith('/p/')
  const hideChrome = isAdminRoute || isLandingRoute

  return (
    <div id="top" className="min-h-screen bg-white">
      {!hideChrome && <Header />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/digital-products" element={<DigitalProducts />} />
          <Route path="/p/:slug" element={<PublicLandingPage />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDataProvider>
                  <AdminLayout />
                </AdminDataProvider>
              </ProtectedRoute>
            }
          >
            <Route index element={<Overview />} />
            <Route path="contacts" element={<Contacts />} />
            <Route path="contacts/:id" element={<ContactDetail />} />
            <Route path="pipeline" element={<Pipeline />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="landing-pages" element={<LandingPages />} />
            <Route path="landing-pages/:id" element={<LandingPageEditor />} />
            <Route path="campaigns" element={<Campaigns />} />
            <Route path="email" element={<EmailMarketing />} />
            <Route path="sms" element={<SmsMarketing />} />
            <Route path="meta-audiences" element={<MetaAudiences />} />
            <Route path="products" element={<Products />} />
            <Route path="sales" element={<Sales />} />
            <Route path="website" element={<Website />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="integrations" element={<Integrations />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </main>
      {!hideChrome && <Footer />}
    </div>
  )
}
