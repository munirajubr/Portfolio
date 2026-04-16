import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { achievements } from '../utils/achievements'

export default function Achievements() {
  const handleNavigation = (href) => {
    window.open(href, '_blank', 'noreferrer')
  }

  return (
    <div className="page-root">
      <Navbar />

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-inner">
          <h1 className="reveal delay-1">Achievements &amp; Certificates</h1>
          <p className="hero-bio reveal delay-2">
            A collection of certifications and credentials I've earned across UX Design, AI, and Development.
          </p>
        </div>
      </section>

      {/* ── CERTIFICATES GRID ── */}
      <section className="achievements-section reveal delay-3">
        <div className="achievements-grid">
          {achievements.map((item, idx) => (
            <div
              key={idx}
              onClick={() => handleNavigation(item.achievementLink)}
              className={`cert-card ${item.featured ? 'cert-featured' : ''}`}
              style={{ cursor: 'pointer' }}
            >
              <div className="cert-img-wrap">
                <img src={item.imgSrc} alt={item.title} className="cert-img" />
                <div className="cert-overlay">
                  <span className="cert-view-btn">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"/>
                      <polyline points="12 5 19 12 12 19"/>
                    </svg>
                    View Certificate
                  </span>
                </div>
              </div>

              <div className="cert-body">
                <span className="cert-provider">{item.providedby}</span>
                <h3 className="cert-title">{item.title}</h3>
                <div className="cert-tags">
                  {item.tags.map(tag => (
                    <span key={tag} className="cert-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}
