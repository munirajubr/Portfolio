import { surveys } from './surveyData';
import { useEffect, useRef } from 'react';
import Tag from '../components/Tag';

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
    <div ref={pageRef} style={{ background: 'var(--bg)', minHeight: '100vh', paddingBottom: 100 }}>
      {/* Comic Dotted Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
          style={{ backgroundImage: 'radial-gradient(black 1px, transparent 1px)', backgroundSize: '12px 12px' }}>
      </div>

      <main className="section-pad" style={{ padding: '80px 100px' }}>
        <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 80, maxWidth: 800 }}>
          <Tag label="INTERACTIVE FEEDBACK" color="red" />
          <h1 className="page-title" style={{ fontSize: 32, fontWeight: 700 }}>User Surveys</h1>
          <p className="body-text-lg" style={{ fontSize: 24, fontWeight: 500, opacity: 0.8, lineHeight: 1.5, fontFamily: 'Outfit, sans-serif' }}>
            Sharing your insights helps me refine digital experiences and build better products for everyone.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                borderRadius: 20,
                padding: '30px 25px',
                boxShadow: '8px 8px 0 var(--black)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                textDecoration: 'none',
                color: 'inherit',
                transition: 'all 0.2s',
                gap: 25,
                minHeight: '400px'
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translate(-2px, -2px)'; e.currentTarget.style.boxShadow = '10px 10px 0 var(--black)'; e.currentTarget.style.background = 'var(--light-orange)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '8px 8px 0 var(--black)'; e.currentTarget.style.background = 'var(--white)' }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <Tag label={`MISSION #${index + 1}`} color="black" />
                <h3 style={{ fontSize: 24, fontWeight: 800, textTransform: 'uppercase', fontFamily: 'Syne, sans-serif', borderBottom: '4px solid var(--purple)', width: 'fit-content', paddingBottom: 5 }}>
                  {survey.name}
                </h3>
                <p style={{ fontSize: 16, fontWeight: 500, lineHeight: 1.6, opacity: 0.9, fontFamily: 'Outfit, sans-serif' }}>
                  {survey.description}
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '2px solid rgba(0,0,0,0.1)', paddingTop: 25 }}>
                <span style={{ fontSize: 16, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>
                  {survey.buttonText}
                </span>
                <div style={{ width: 44, height: 44, border: '3px solid var(--black)', background: 'var(--white)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>
                  <span className="material-symbols-rounded" style={{ fontSize: 24, fontWeight: 900 }}>arrow_outward</span>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="reveal" style={{ marginTop: 100, paddingTop: 40, borderTop: '4px solid var(--black)' }}>
          <Tag label="ANONYMITY GUARANTEED" color="blue" />
          <p style={{ fontSize: 20, fontWeight: 700, textTransform: 'uppercase', marginTop: 15, fontFamily: 'Syne, sans-serif' }}>
            Your feedback is anonymous and highly valued.
          </p>
        </div>
      </main>
    </div>
  );
};

export default SurveyList;
