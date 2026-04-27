import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import { projectsData } from '../utils/projectsData';
import { GithubIcon, BehanceIcon, LearningIcon } from '../utils/icons';

export default function MyWork() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleNavigation = (href) => {
    if (href.startsWith('http')) {
      window.open(href, '_blank', 'noreferrer');
    } else {
      navigate(href);
    }
  };

  return (
    <div className="page-root">
      <Navbar />
      <section className="projects-section reveal section-pad" style={{ background: '#000', flex: 1, paddingTop: '120px', paddingBottom: '100px' }}>
        <div className="section-inner" style={{ maxWidth: '100%', margin: '0 auto', width: '100%', padding: '0' }}>
          <h1 className="section-heading" style={{ color: '#fff', borderBottom: '1px solid #333', paddingBottom: '16px', marginBottom: '60px', textAlign: 'left', fontSize: 'clamp(40px, 6vw, 64px)', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
            All Works
          </h1>
          <div className="projects-thumbnail-grid">
            {projectsData.map((project, idx) => (
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
        </div>
      </section>
      <Footer />
    </div>
  );
}
