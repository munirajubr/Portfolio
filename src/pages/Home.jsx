import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { assets, projectsData, ExperienceItems, aboutDetails, skillItems, strengthsData } from '../utils/projectsData'
import { socialLinks } from '../utils/socialLinks'
import { navItems } from '../utils/navItems'
import { calculateTotalExperienceCount, formatDateRange } from '../utils/helper'

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
          <div className="hero-content-row">
            <div className="hero-text-col">
              <h1 className="hero-title reveal delay-1">
                Designing <br /><span className="highlight">quiet interfaces</span> <br />that do <span className="text-blue">loud </span>work.
              </h1>
              <p className="hero-bio reveal delay-2">
                I design minimalist interfaces that feel calm yet perform complex tasks. By combining clean aesthetics with deep research, I create digital products that are intuitive, accessible, and effective.
              </p>
              <div className="hero-badges-row reveal delay-3">
                <div
                  onClick={() => handleNavigation('https://coursera.org/share/348d156562a8a0edc71fa0f8142b48c0')}
                  className="hero-cert-badge google-cert"
                  style={{ cursor: 'pointer' }}
                >
                  <div className="cert-icon-wrapper">
                    <svg viewBox="0 0 24 24" width="16" height="16">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                      <path d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z" fill="#FBBC05" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                  </div>
                  <span>Google UX Design Certified</span>
                </div>

                <div
                  onClick={() => handleNavigation('https://trainings.internshala.com/s/v/3779492/2dc4a7a4')}
                  className="hero-cert-badge internshala-cert"
                  style={{ cursor: 'pointer' }}
                >
                  <div className="cert-icon-wrapper">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#1295c9" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                      <path d="M6 12v5c3 3 9 3 12 0v-5" />
                    </svg>
                  </div>
                  <span>Internshala UI/UX Certified</span>
                </div>
              </div>

              <div className="hero-cta-row reveal delay-3">
                <div className="social-row">
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

                <div
                  className="hero-resume-btn stylish"
                  onClick={() => handleNavigation(navItems.find(n => n.label === 'Resume')?.link)}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                  View Resume
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section className="projects-section reveal delay-4">
        {/* <h2 className="section-heading">Top Projects</h2> */}
        <div className="projects-thumbnail-grid">
          {projectsData.slice(0, 5).map((project, idx) => (
            <div
              key={idx}
              onClick={() => handleNavigation(project.projectLink || '#')}
              className="project-thumbnail-only"
              style={{ cursor: 'pointer' }}
            >
              <img src={project.imgSrc} alt={project.title} className="project-thumb-img" />
            </div>
          ))}
        </div>

        {/* ── BEHANCE CTA ── */}
        <div className="behance-cta">
          <span className="behance-cta-text">For more design works</span>
          <div className="behance-cta-row">
            <span className="behance-cta-arrow">
              <svg width="120" height="55" viewBox="0 0 120 55" fill="none">
                <path d="M5 5C5 30 35 50 65 45C85 42 95 25 85 12C75 0 60 12 68 30C74 43 100 48 118 45M118 45L110 42M118 45L114 53" stroke="#ccc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 4" />
              </svg>
            </span>
            <div
              onClick={() => handleNavigation(socialLinks.find(s => s.label === 'Behance')?.href || 'https://www.behance.net/munirajraj2')}
              className="behance-cta-logo"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 1.2.836 1.973 2.14 1.973.798 0 1.348-.33 1.692-1.005l2.444.061zM15.97 13h4.604c-.088-1.313-.836-1.993-2.272-1.993-1.48 0-2.193.737-2.332 1.993zM8.986 12.737c1.459.358 2.514 1.21 2.514 2.827 0 2.085-1.741 3.436-4.515 3.436H1V5h5.866c2.634 0 4.204 1.14 4.204 3.132 0 1.348-.738 2.23-2.084 2.605zm-5.037-4.93v2.59h2.55c1.137 0 1.811-.465 1.811-1.325 0-.836-.651-1.265-1.764-1.265H3.949zm2.74 6.568H3.949v2.826h2.76c1.215 0 1.905-.498 1.905-1.413 0-.937-.711-1.413-1.925-1.413z" />
              </svg>
              <span className="behance-cta-logo-text">Behance</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── SKILLS SECTION (Currently hidden by user request) ── */}
      {/* <section className="home-skills-section reveal delay-5">
        <div className="home-skills-inner">
          <h2 className="section-heading">Skills & Tools</h2>
          <div className="home-skills-grid">
            {skillItems.map((cat, idx) => (
              <div key={idx} className="home-skill-cat">
                <h3 className="home-skill-cat-title">{cat.category}</h3>
                <div className="home-skill-pills">
                  {cat.skillsList.map((skill, i) => (
                    <span key={i} className="home-skill-pill">{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      <Footer />
    </div>
  )
}
