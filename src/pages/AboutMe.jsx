import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { ExperienceItems, assets, skillItems, aboutDetails } from '../utils/projectsData'
import { calculateTotalExperienceCount, formatDateRange, getProjectsCount } from '../utils/helper'

export default function AboutMe() {
  return (
    <div className="page-root">
      <Navbar />

      {/* ── Hero ── */ }
      <section className="hero">
        <div className="hero-inner">
      

          <div className="about-hero-row">
             {/* Left */}
            <div className="about-text-col reveal delay-2">
              <h1 className="reveal delay-1">About Me</h1>
              <p className="hero-bio">
                {aboutDetails[0]}
                <br /><br />
                {aboutDetails[1]}
              </p>

              {/* Stats */}
              <div className="stats-row">
                <div className="stat-item">
                  <span className="stat-value">{calculateTotalExperienceCount(ExperienceItems)}+</span>
                  <span className="stat-label">Years Exp</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">{getProjectsCount()}+</span>
                  <span className="stat-label">Projects</span>
                </div>
              </div>
            </div>

            {/* Right photo */}
            <div className="about-photo-wrap reveal delay-3">
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
          <div className="experience-list">
            {ExperienceItems.map((exp, index) => (
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
