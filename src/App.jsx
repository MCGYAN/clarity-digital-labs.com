import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import DigitalProducts from './pages/DigitalProducts'

export default function App() {
  return (
    <div id="top" className="min-h-screen bg-white">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/digital-products" element={<DigitalProducts />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
