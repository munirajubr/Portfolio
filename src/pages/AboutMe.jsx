import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { ExperienceItems, assets, skillItems, aboutDetails } from '../utils/projectsData'
import { calculateTotalExperienceCount, formatDateRange, getProjectsCount } from '../utils/helper'
import { navItems } from '../utils/navItems'

export default function AboutMe() {
  const handleNavigation = (href) => {
    window.open(href, '_blank', 'noreferrer')
  }

  const renderExperienceList = (items) => (
    <div className="experience-list">
      {items.map((exp, index) => (
        <div key={index} className="exp-item">
          <div className="exp-header">
            <div className="exp-left">
              <div className="exp-date">
                {formatDateRange(exp.startDate, exp.endDate)}
              </div>
              <h3 className="exp-title">{exp.company}</h3>
              <p className="exp-company">
                {exp.worktype} • {exp.domain}
              </p>
            </div>
            <div className="exp-badge">
              {exp.domain}
            </div>
          </div>
          <ul className="exp-desc">
            {exp.description.map((desc, i) => (
              <li key={i}>{desc}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )

  return (
    <div className="page-root">
      <Navbar />

      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero-inner">
          <div className="about-hero-row">
            {/* Left */}
            <div className="about-text-col reveal delay-2">
              <h1 className="hero-title reveal delay-1">About Me</h1>
              {/* Mobile Photo: Shows between title and bio on mobile */}
              <div className="about-photo-wrap photo-mobile reveal delay-3">
                <img
                  src="/images/munir_nobg.png"
                  alt="Muniraju"
                  className="about-photo-ghost"
                />
              </div>

              <p className="hero-bio">
                {aboutDetails[0]}
                <br /><br />
                {aboutDetails[1]}
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

              {/* Stats */}
              <div className="stats-row">
                <div className="stat-item">
                  <span className="stat-value">{calculateTotalExperienceCount(ExperienceItems.filter(e => !e.isFreelance))}y+</span>
                  <span className="stat-label">Work Exp</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">{calculateTotalExperienceCount(ExperienceItems.filter(e => e.isFreelance))}y+</span>
                  <span className="stat-label">Freelance Exp</span>
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

            {/* Desktop Photo: Shows on the right for larger screens */}
            <div className="about-photo-wrap photo-desktop reveal delay-3">
              <img
                src="/images/munir_nobg.png"
                alt="Muniraju"
                className="about-photo-ghost"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Experience ── */}
      <section className="about-section reveal delay-3">
        <div className="section-inner">
          <h2 className="section-heading">Experience</h2>
          {renderExperienceList(ExperienceItems)}
        </div>
      </section>

      {/* ── Skills ── */}
      <section className="about-section reveal delay-4" style={{ paddingBottom: 100 }}>
        <div className="section-inner">
          <h2 className="section-heading">Skills</h2>
          <div className="skills-grid">
            {skillItems.map((category, index) => (
              <div key={index} className="skill-category">
                <h3 className="skill-cat-title">
                  {category.category}
                </h3>
                <div className="skill-tags">
                  {category.skillsList.map((skill, i) => (
                    <span key={i} className="skill-pill">
                      {skill}
                    </span>
                  ))}
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
