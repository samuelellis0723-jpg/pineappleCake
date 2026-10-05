import Header from '../components/Header'
import Hero from '../components/Hero'
import ProductCollection from '../components/ProductCollection'
import TornPaperDivider from '../components/TornPaperDivider'
import Footer from '../components/Footer'

export function LandingPage() {
  return (
    <div className="min-h-screen bg-surface font-body-md text-on-surface">
      <Header />
      <main className="w-full pt-20 bg-surface min-h-[calc(100vh-80px)]">
        <div className="flex flex-col w-full">
          <Hero />
          <ProductCollection />
          <TornPaperDivider inverted />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default LandingPage
