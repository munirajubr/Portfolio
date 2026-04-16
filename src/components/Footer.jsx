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
        <div className="footer-header">
          <h2 className="footer-headline">
            Have a project in mind? <br/>
            <span>Let's build something exceptional.</span>
          </h2>
          <div 
            onClick={() => handleNav('/contact')} 
            className="footer-cta-main"
          >
            Get in touch
            <div className="footer-cta-circle">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </div>
          </div>
        </div>

        <div className="footer-content">
          <div className="footer-brand">
            <span className="footer-logo">Muniraju B R.</span>
            <p className="footer-tagline">UI/UX Designer & Full-stack Developer based in Bangalore, India.</p>
          </div>

          <div className="footer-links-grid">
            <div className="footer-link-group">
              <span className="footer-group-label">Navigation</span>
              <div className="footer-link-item" onClick={() => handleNav('/')}>Home</div>
              <div className="footer-link-item" onClick={() => handleNav('/about')}>About</div>
              <div className="footer-link-item" onClick={() => handleNav('/achievements')}>Achievements</div>
              <div className="footer-link-item" onClick={() => handleNav('/services')}>Services</div>
            </div>

            <div className="footer-link-group">
              <span className="footer-group-label">Connect</span>
              {socialLinks.map(({ label, href }) => (
                <div 
                  key={label} 
                  className="footer-link-item" 
                  onClick={() => handleNav(href, true)}
                >
                  {label}
                </div>
              ))}
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