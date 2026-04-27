import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { socialLinks } from '../utils/socialLinks'

export default function Contact() {
  const handleNav = (href) => {
    window.open(href, '_blank', 'noreferrer')
  }

  return (
    <div className="page-root">
      <Navbar />

      {/* ── CONTACT MAIN SECTION ── */}
      <section className="contact-section reveal section-pad" style={{ background: '#000', flex: 1, paddingTop: '120px', paddingBottom: '100px' }}>
        <div className="section-inner" style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', padding: '0 24px' }}>
          <h1 className="section-heading reveal delay-1" style={{ color: '#fff', borderBottom: '1px solid #333', paddingBottom: '16px', marginBottom: '24px', textAlign: 'left', fontSize: 'clamp(40px, 6vw, 64px)', fontWeight: 300, fontFamily: "'Playfair Display', serif", textTransform: 'uppercase' }}>
            Let's Connect
          </h1>
          <p className="hero-subtitle reveal delay-2" style={{ fontSize: '18px', color: '#aaa', marginBottom: '60px', fontWeight: 300, maxWidth: '800px', lineHeight: 1.6 }}>
            I'm always open to new opportunities and interesting projects. Feel free to reach out if you'd like to collaborate or just say hi.
          </p>

          <div className="contact-grid reveal delay-3">
            {/* Left Col */}
            <div className="contact-col">
              <div className="contact-item">
                <p className="contact-label">Send an email</p>
                <div 
                  onClick={() => window.location.href = 'mailto:munirajgowdaraj@gmail.com'} 
                  className="email-link"
                  style={{ cursor: 'pointer' }}
                >
                  munirajgowdaraj@gmail.com
                </div>
              </div>

              <div className="contact-item">
                <p className="contact-label">Location</p>
                <p className="info-line">Bangalore, India</p>
              </div>
            </div>

            {/* Right Col */}
            <div className="contact-col">
              <div className="contact-item">
                <p className="contact-label">Socials</p>
                <div className="social-list">
                  {socialLinks.map((link) => (
                    <div 
                      key={link.label} 
                      onClick={() => handleNav(link.href)} 
                      className="social-link-item"
                      style={{ cursor: 'pointer' }}
                    >
                      {link.label}
                      <ArrowIcon />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.4 }}>
    <line x1="7" y1="17" x2="17" y2="7"></line>
    <polyline points="7 7 17 7 17 17"></polyline>
  </svg>
)
