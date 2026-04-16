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

      <section className="hero">
        <div className="hero-inner">
          <h1 className="reveal delay-1">Let's craft something exceptional together.</h1>
          <p className="hero-subtitle reveal delay-2">
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
