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

      {/* ── ACHIEVEMENTS MAIN SECTION ── */}
      <section className="achievements-section reveal section-pad" style={{ background: '#000', flex: 1, paddingTop: '120px', paddingBottom: '100px' }}>
        <div className="section-inner" style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', padding: '0 24px' }}>
          <h1 className="section-heading" style={{ color: '#fff', borderBottom: '1px solid #333', paddingBottom: '16px', marginBottom: '60px', textAlign: 'left', fontSize: 'clamp(40px, 6vw, 64px)', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
            Achievements
          </h1>
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
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
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
        </div>
      </section>

      <Footer />
    </div>
  )
}
