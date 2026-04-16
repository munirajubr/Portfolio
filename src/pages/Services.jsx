import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const services = [
  {
    title: 'Web Dev & Engineering',
    desc: 'Building modern, interactive, and high-performance web applications using the latest technologies like React, Node.js, and more.',
    icon: <CodeIcon />
  },
  {
    title: 'UI/UX Design',
    desc: 'Crafting visually stunning and user-centric interfaces that provide a seamless and engaging user experience across all devices.',
    icon: <DesignIcon />
  },
  {
    title: 'Product Strategy',
    desc: 'Helping businesses define their product vision, roadmap, and go-to-market strategy to ensure long-term success and growth.',
    icon: <StrategyIcon />
  }
]

export default function Services() {
  return (
    <div className="page-root">
      <Navbar />

      <section className="hero">
        <div className="hero-inner">
          <h1 className="reveal delay-1">Services I Offer</h1>
          <p className="hero-subtitle reveal delay-2">
            Specializing in high-impact digital experiences through a combination of design-driven development and strategic product thinking.
          </p>
        </div>
      </section>

      <section className="achievements-section reveal delay-3" style={{ padding: '0 60px 100px' }}>
        <div className="container" style={{ margin: '0 auto', maxWidth: 1200 }}>
          <div className="achievements-grid">
            {services.map((item, idx) => (
              <div key={idx} className="cert-card">
                <div className="cert-img-wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fafafa' }}>
                  <div className="service-icon-main">
                    {item.icon}
                  </div>
                </div>
                
                <div className="cert-body">
                  <span className="cert-provider">Expertise</span>
                  <h3 className="cert-title">{item.title}</h3>
                  <p className="service-desc" style={{ marginTop: 12, fontSize: '15px', color: '#666', lineHeight: '1.6' }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

function CodeIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  )
}

function DesignIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
      <path d="M12 8V16" />
      <path d="M8 12H16" />
    </svg>
  )
}

function StrategyIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  )
}
