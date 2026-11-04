import Header from './components/Header'
import Hero from './components/Hero'
import TrustedBy from './components/TrustedBy'
import Problem from './components/Problem'
import Overview from './components/Overview'
import Services from './components/Services'
import Trust from './components/Trust'
import Audience from './components/Audience'
import Vision from './components/Vision'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <div id="top" className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <TrustedBy />
        <Problem />
        <Overview />
        <Services />
        <Trust />
        <Audience />
        <Vision />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
