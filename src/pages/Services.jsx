import { useNavigate } from 'react-router-dom'
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
  const navigate = useNavigate()

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
              <div 
                key={idx} 
                className="cert-card"
                onClick={() => navigate('/contact')}
                style={{ cursor: 'pointer' }}
              >
                <div className="cert-img-wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fafafa' }}>
                  <div className="service-icon-main">
                    {item.icon}
                  </div>
                </div>

                <div className="cert-body">
                  <span className="cert-provider">Expertise</span>
                  <h3 className="cert-title">{item.title}</h3>
                  <p className="service-desc" style={{ marginTop: 12, fontSize: '15px', color: '#666', lineHeight: '1.6' }}>{item.desc}</p>
                  
                  <div className="service-contact-link">
                    <span>Get in Touch</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </div>
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
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
      <path d="M10 9l-2 2 2 2" />
      <path d="M14 13l2-2-2-2" />
    </svg>
  )
}

function DesignIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  )
}

function StrategyIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  )
}
