import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { assets, projectsData } from '../utils/projectsData'
import { socialLinks } from '../utils/socialLinks'

export default function Home() {
  const handleNavigation = (href) => {
    window.open(href, '_blank', 'noreferrer')
  }

  return (
    <div className="page-root">
      <Navbar />

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-inner">
          <h1 className="hero-title reveal delay-1">
            Hello, I'm Muniraju.
          </h1>
          <p className="hero-bio reveal delay-2">
            I'm a UIUX Designer & Full Stack Developer who loves building beautiful, fast, and user-focused digital products. I enjoy working on projects that solve real-world problems and create seamless experiences across web and mobile.
          </p>

          <div className="social-row reveal delay-3">
            <div className="social-divider" />
            {socialLinks.map(({ label, Icon, href }) => (
              <div 
                key={label} 
                onClick={() => handleNavigation(href)} 
                className="social-icon" 
                title={label}
                style={{ cursor: 'pointer' }}
              >
                <Icon />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section className="projects-section reveal delay-4">
        <div className="achievements-grid">
          {projectsData.map((project, idx) => (
            <div
              key={idx}
              onClick={() => handleNavigation(project.projectLink || '#')}
              className="cert-card"
              style={{ cursor: 'pointer' }}
            >
              <div className="cert-img-wrap">
                <img src={project.imgSrc} alt={project.title} className="cert-img" />
                <div className="cert-overlay">
                  <span className="cert-view-btn">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"/>
                      <polyline points="12 5 19 12 12 19"/>
                    </svg>
                    View Project
                  </span>
                </div>
              </div>

              <div className="cert-body">
                <h3 className="cert-title">{project.title}</h3>
                {project.tags?.length > 0 && (
                  <div className="cert-tags">
                    {project.tags.map(tag => (
                      <span key={tag} className="cert-tag">{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* ── BEHANCE CTA ── */}
        <div className="behance-cta">
          <span className="behance-cta-text">For more design works</span>
          <div className="behance-cta-row">
            <span className="behance-cta-arrow">
              <svg width="120" height="55" viewBox="0 0 120 55" fill="none">
                <path d="M5 5C5 30 35 50 65 45C85 42 95 25 85 12C75 0 60 12 68 30C74 43 100 48 118 45M118 45L110 42M118 45L114 53" stroke="#ccc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 4"/>
              </svg>
            </span>
            <div 
              onClick={() => handleNavigation(socialLinks.find(s => s.label === 'Behance')?.href || 'https://www.behance.net/munirajraj2')}
              className="behance-cta-logo"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 1.2.836 1.973 2.14 1.973.798 0 1.348-.33 1.692-1.005l2.444.061zM15.97 13h4.604c-.088-1.313-.836-1.993-2.272-1.993-1.48 0-2.193.737-2.332 1.993zM8.986 12.737c1.459.358 2.514 1.21 2.514 2.827 0 2.085-1.741 3.436-4.515 3.436H1V5h5.866c2.634 0 4.204 1.14 4.204 3.132 0 1.348-.738 2.23-2.084 2.605zm-5.037-4.93v2.59h2.55c1.137 0 1.811-.465 1.811-1.325 0-.836-.651-1.265-1.764-1.265H3.949zm2.74 6.568H3.949v2.826h2.76c1.215 0 1.905-.498 1.905-1.413 0-.937-.711-1.413-1.925-1.413z"/>
              </svg>
              <span className="behance-cta-logo-text">Behance</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
