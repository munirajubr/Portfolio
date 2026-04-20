import { useNavigate } from 'react-router-dom'
import { socialLinks } from '../utils/socialLinks'

export default function Footer() {
  const navigate = useNavigate()

  const handleNav = (to, isExternal = false) => {
    if (isExternal) {
      window.open(to, '_blank', 'noreferrer')
    } else {
      navigate(to)
    }
  }

  return (
    <footer className="footer reveal">
      <div className="footer-inner">
        <div className="footer-contact-section">
          <h2 className="footer-contact-headline reveal delay-1">
            Let's craft something <br />
            <span>exceptional together.</span>
          </h2>
          <p className="footer-contact-subtitle reveal delay-2">
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
                      onClick={() => handleNav(link.href, true)}
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

        <div className="footer-base">
          <div className="footer-copyright">
            © {new Date().getFullYear()} Muniraju B R. All rights reserved.
          </div>
          <div className="footer-bottom-links">
            <span>Built with Passion & Minimalist Design</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.4 }}>
    <line x1="7" y1="17" x2="17" y2="7"></line>
    <polyline points="7 7 17 7 17 17"></polyline>
  </svg>
)