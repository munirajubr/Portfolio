import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { assets, projectsData, ExperienceItems, aboutDetails, skillItems, strengthsData } from '../utils/projectsData'
import { socialLinks } from '../utils/socialLinks'
import { navItems } from '../utils/navItems'
import { calculateTotalExperienceCount, formatDateRange } from '../utils/helper'
import { GithubIcon, BehanceIcon, LearningIcon } from '../utils/icons'
import { achievements } from '../utils/achievements'
import { services } from '../utils/services'
import Spline from '@splinetool/react-spline'

export default function Home() {
  const navigate = useNavigate()
  const sectionRef = useRef(null)
  const trackRef = useRef(null)


  const handleNavigation = (href) => {
    if (href.startsWith('http')) {
      window.open(href, '_blank', 'noreferrer')
    } else {
      navigate(href)
    }
  }

  // Filter projects by priority
  const sortedProjects = [...projectsData].sort((a, b) => (a.priority || 99) - (b.priority || 99));
  const horizontalProjects = sortedProjects.filter(p => p.priority >= 1 && p.priority <= 3);
  const moreWorksProjects = sortedProjects.filter(p => p.priority >= 4 && p.priority <= 5);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !trackRef.current) return

      const section = sectionRef.current
      const track = trackRef.current
      const offsetTop = section.offsetTop
      const height = section.offsetHeight
      const windowHeight = window.innerHeight
      const scrollPos = window.pageYOffset

      if (scrollPos >= offsetTop && scrollPos <= offsetTop + height - windowHeight) {
        const progress = (scrollPos - offsetTop) / (height - windowHeight)
        const trackWidth = track.scrollWidth
        const moveX = progress * (trackWidth - window.innerWidth)
        track.style.transform = `translateX(-${moveX}px)`
      }
    };

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="page-root">
      <Navbar />

      {/* ── HERO ── */}
      <section className="hero">
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, overflow: 'hidden', background: '#000' }}>
          <Spline scene="https://prod.spline.design/ZIjwes7MzK40s8CX/scene.splinecode" />
          <div style={{ position: 'absolute', bottom: 10, right: 10, width: '150px', height: '50px', background: '#000', zIndex: 10 }}></div>
        </div>
        <div className="hero-inner new-hero-layout">
          <div className="hero-left">
            <div className="hero-cert-text reveal delay-1">
              Hi, I'm Muniraju B R
            </div>
            <h1 className="hero-title reveal delay-2">
              Designing <br /><span className="highlight">quiet interfaces</span> <br />that do <span className="text-blue">loud </span>work.
            </h1>
            <div className="hero-cert-text reveal delay-3">
              GOOGLE UX PROFESSIONAL &nbsp;\&nbsp; INTERNSHALA UIUX WITH AI
            </div>
          </div>

          <div className="hero-right">
            <p className="hero-sub-slogan reveal delay-2">
              I design minimalist interfaces that feel calm yet perform complex tasks. By combining clean aesthetics with deep research, I create digital products that are intuitive, accessible, and effective.
            </p>
            <div className="hero-buttons reveal delay-3">
              <button className="hero-btn-contact" onClick={() => handleNavigation('/about')}>
                More About Me
              </button>
              <button className="hero-btn-resume" onClick={() => window.open('https://drive.google.com/file/d/1X15hS5bS0kO7SgJvH1D9qU0P-Sj4_u-8/view?usp=sharing', '_blank')}>
                My Resume <span className="plus-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg></span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT & EXPERIENCE OVERVIEW ── */}
      <section className="about-overview-section reveal delay-4 section-pad" style={{ background: 'transparent' }}>
        <div className="section-inner" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="about-overview-content" style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>

            {/* Overview Text */}
            <div className="overview-text-section">
              <h2 className="section-heading" style={{ color: '#fff', borderBottom: '1px solid #333', paddingBottom: '12px', marginBottom: '32px' }}>Overview</h2>
              <p style={{ fontSize: '18px', lineHeight: 1.6, color: '#ccc', maxWidth: '1000px', fontWeight: 300 }}>
                {aboutDetails.join(' ')}
              </p>

              {/* Stats Grid */}
              <div className="stats-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                border: '1px solid #222',
                borderRadius: '24px',
                width: '100%',
                background: 'transparent',
                marginTop: '60px'
              }}>
                <div className="stat-item" style={{ padding: '40px', borderRight: '1px solid #222', textAlign: 'center' }}>
                  <span className="stat-value" style={{ fontSize: '48px', fontWeight: 300, color: '#fff', display: 'block', marginBottom: '8px' }}>{calculateTotalExperienceCount(ExperienceItems)}+</span>
                  <span className="stat-label" style={{ fontSize: '11px', color: '#666', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Years of work experience</span>
                </div>
                <div className="stat-item" style={{ padding: '40px', borderRight: '1px solid #222', textAlign: 'center' }}>
                  <span className="stat-value" style={{ fontSize: '48px', fontWeight: 300, color: '#fff', display: 'block', marginBottom: '8px' }}>8+</span>
                  <span className="stat-label" style={{ fontSize: '11px', color: '#666', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Projects completed</span>
                </div>
                <div className="stat-item" style={{ padding: '40px', textAlign: 'center' }}>
                  <span className="stat-value" style={{ fontSize: '48px', fontWeight: 300, color: '#fff', display: 'block', marginBottom: '8px' }}>2+</span>
                  <span className="stat-label" style={{ fontSize: '11px', color: '#666', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Design tools mastery</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PINNED HORIZONTAL SCROLL SECTION ── */}
      <section
        ref={sectionRef}
        className="horizontal-scroll-section"
        style={{ height: '400vh' }}
      >
        <div className="sticky-container">
          <div ref={trackRef} className="horizontal-track">
            {/* Introductory Slide */}
            <div className="scroll-slide intro-slide" style={{
              minWidth: '100vw',
              flexShrink: 0,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              textAlign: 'center',
              padding: '0 40px',
              boxSizing: 'border-box'
            }}>
              <span style={{ fontSize: '13px', color: '#555', textTransform: 'uppercase', letterSpacing: '0.3em', display: 'block', marginBottom: '32px' }}>SELECTED WORK</span>
              <h2 style={{
                fontSize: 'clamp(32px, 10vw, 84px)',
                fontWeight: 300,
                color: '#fff',
                lineHeight: 1.1,
                margin: 0,
                fontFamily: "'Playfair Display', serif",
                wordBreak: 'break-word'
              }}>
                Crafting digital <br /> experiences.
              </h2>
            </div>

            {horizontalProjects.map((project, idx) => (
              <div key={idx} className="featured-project-card">
                <div className="featured-card-top">
                  <span className="featured-index">Project 0{idx + 1}</span>
                  <h2 className="featured-card-title">{project.title}</h2>
                  <div className="featured-card-badges">
                    <span className="featured-badge">{project.role}</span>
                    <span className="featured-badge">{project.duration}</span>
                    <span className="featured-badge">Rated: ✦ {project.rating}</span>
                  </div>
                </div>

                <div className="featured-card-img-wrap">
                  <img src={project.imgSrc} alt={project.title} />
                </div>

                <div className="featured-card-bottom">
                  <button
                    className="featured-btn outlined"
                    onClick={() => {
                      const casestudy = project.links.find(l => l.type === 'casestudy');
                      if (casestudy) handleNavigation(casestudy.url);
                    }}
                  >
                    View Case Study
                  </button>
                  {project.links.find(l => l.type === 'github' || l.type === 'behance') && (
                    <a
                      href={project.links.find(l => l.type === 'github' || l.type === 'behance').url}
                      target="_blank"
                      rel="noreferrer"
                      className="featured-secondary-link"
                    >
                      Visit {project.links.find(l => l.type === 'github' || l.type === 'behance').type === 'github' ? 'Github' : 'Behance'}
                    </a>
                  )}
                </div>
              </div>
            ))}

            {/* More Projects Message Card */}
            <div className="more-projects-message-card">
              <p className="message-main">Check more of my project works.</p>
              <div className="go-down-container">
                <span className="go-down-text">Explore more</span>
                <div className="go-down-arrow">
                  <svg width="40" height="60" viewBox="0 0 40 60" fill="none">
                    <path d="M20 5V55M20 55L5 40M20 55L35 40" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ALL PROJECTS GRID & CTA ── */}
      <section className="projects-section reveal delay-5 section-pad" style={{ background: 'transparent' }}>
        <div className="section-inner" style={{ maxWidth: '1200px', padding: '0 24px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

          <div className="projects-thumbnail-grid" style={{ width: '100%', marginBottom: '60px' }}>
            {moreWorksProjects.map((project, idx) => (
              <div key={idx} className="project-thumbnail-container" onClick={() => {
                const primaryLink = project.links.find(l => l.type === 'casestudy') || project.links[0];
                handleNavigation(primaryLink.url);
              }}>
                <div className="project-thumbnail-only">
                  <img src={project.imgSrc} alt={project.title} className="project-thumb-img" />
                </div>
                <div style={{ padding: '32px 24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <h3 style={{ fontSize: '22px', fontWeight: 600, color: '#fff', margin: 0, lineHeight: 1.3 }}>{project.title}</h3>
                  </div>
                  <div className="project-links-row" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    {project.links.map((link, lIdx) => (
                      <button
                        key={lIdx}
                        style={{
                          cursor: 'pointer',
                          padding: '8px 18px',
                          borderRadius: '100px',
                          border: '1.5px solid #333',
                          background: 'transparent',
                          color: '#fff',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          fontSize: '12px',
                          fontWeight: 700,
                          transition: 'all 0.3s ease',
                          textTransform: 'uppercase',
                          letterSpacing: '0.02em'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = '#fff';
                          e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = '#333';
                          e.currentTarget.style.background = 'transparent';
                        }}
                        onClick={(e) => { e.stopPropagation(); handleNavigation(link.url); }}>
                        {link.type === 'github' && <GithubIcon size={14} />}
                        {link.type === 'behance' && <BehanceIcon size={14} />}
                        {link.type === 'casestudy' && <LearningIcon size={14} />}
                        <span>
                          {link.type === 'casestudy' ? 'Case Study' : link.type}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            className="featured-btn outlined"
            onClick={() => handleNavigation('/work')}
            style={{
              padding: '14px 32px',
              fontSize: '14px',
              fontWeight: 500,
              color: '#fff',
              backgroundColor: 'transparent',
              border: '1px solid #fff',
              borderRadius: '100px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#fff'; e.currentTarget.style.color = '#000'; }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#fff'; }}
          >
            View More Projects
          </button>

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
    </div >
  )
}
