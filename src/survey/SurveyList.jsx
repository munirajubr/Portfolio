import { surveys } from './surveyData';
import { useEffect, useRef } from 'react';
import Tag from '../components/Tag';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const SurveyList = () => {
  const pageRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.08 }
    )
    pageRef.current?.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={pageRef} style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <Navbar />
      
      <div style={{ position: 'relative', paddingBottom: 100 }}>
        {/* Comic Dotted Background Pattern */}
        <div style={{ 
          position: 'absolute', 
          inset: 0, 
          opacity: 0.03, 
          pointerEvents: 'none',
          backgroundImage: 'radial-gradient(black 1px, transparent 1px)', 
          backgroundSize: '12px 12px' 
        }} />

        <main style={{ padding: '80px 5%', maxWidth: 1400, margin: '0 auto' }}>
          <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 80, maxWidth: 800 }}>
            <Tag label="INTERACTIVE FEEDBACK" color="red" />
            <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, fontFamily: 'Syne, sans-serif', textTransform: 'uppercase' }}>
              User Surveys
            </h1>
            <p style={{ fontSize: 'clamp(18px, 3vw, 24px)', fontWeight: 500, opacity: 0.8, lineHeight: 1.5, fontFamily: 'Outfit, sans-serif' }}>
              Sharing your insights helps me refine digital experiences and build better products for everyone.
            </p>
          </div>

          {/* Grid with improved responsive behavior */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 400px), 1fr))', 
            gap: '30px' 
          }}>
            {surveys.map((survey, index) => (
              <a 
                href={survey.formUrl}
                target="_blank"
                rel="noreferrer"
                key={survey.id}
                className="reveal"
                style={{
                  background: 'var(--white)',
                  border: '3px solid var(--black)',
                  borderRadius: 24,
                  padding: '35px 30px',
                  boxShadow: '10px 10px 0 var(--black)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  textDecoration: 'none',
                  color: 'inherit',
                  transition: 'all 0.2s',
                  gap: 30,
                  minHeight: '420px',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translate(-4px, -4px)'; e.currentTarget.style.boxShadow = '14px 14px 0 var(--black)'; e.currentTarget.style.background = 'var(--light-orange)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '10px 10px 0 var(--black)'; e.currentTarget.style.background = 'var(--white)' }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                  <Tag label={`MISSION #${index + 1}`} color="black" />
                  <h3 style={{ fontSize: 26, fontWeight: 800, textTransform: 'uppercase', fontFamily: 'Syne, sans-serif', borderBottom: '5px solid var(--purple)', width: 'fit-content', paddingBottom: 5, lineHeight: 1.2 }}>
                    {survey.name}
                  </h3>
                  <p style={{ fontSize: 16, fontWeight: 500, lineHeight: 1.6, opacity: 0.8, fontFamily: 'Outfit, sans-serif' }}>
                    {survey.description}
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '2px solid rgba(0,0,0,0.1)', paddingTop: 30 }}>
                  <span style={{ fontSize: 15, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1.5, fontFamily: 'Syne, sans-serif' }}>
                    {survey.buttonText}
                  </span>
                  <div style={{ width: 48, height: 48, border: '3px solid var(--black)', background: 'var(--white)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 12, boxShadow: '3px 3px 0 var(--black)' }}>
                    {/* Fallback to simple SVG arrow if material symbols are missing */}
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="7" y1="17" x2="17" y2="7"></line>
                      <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                  </div>
                </div>
              </a>
            ))}
          </div>

          <div className="reveal" style={{ marginTop: 120, paddingTop: 50, borderTop: '4px solid var(--black)' }}>
            <Tag label="ANONYMITY GUARANTEED" color="blue" />
            <p style={{ fontSize: 'clamp(18px, 3vw, 24px)', fontWeight: 800, textTransform: 'uppercase', marginTop: 15, fontFamily: 'Syne, sans-serif', lineHeight: 1.3 }}>
              Your feedback is anonymous<br />and highly valued.
            </p>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default SurveyList;
