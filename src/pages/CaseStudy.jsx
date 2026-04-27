import { useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { caseStudies } from '../utils/caseStudies'
import { works } from '../utils/work'
import { BackArrowIcon, ArrowUpRightIcon } from '../utils/icons'

export default function CaseStudy() {
  const { id } = useParams()
  const navigate = useNavigate()
  const pageRef = useRef(null)
  
  // Get detailed case study data
  const cs = caseStudies[id] || caseStudies['student-gpt']
  // Get project listing data to use its thumbnail
  const projectListing = works.find(w => w.id === id) || works[0]

  useEffect(() => {
    window.scrollTo(0, 0)
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.08 }
    )
    pageRef.current?.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [id])

  const handleExternalNav = (href) => {
    window.open(href, '_blank', 'noreferrer')
  }

  const SectionHeading = ({ children }) => (
    <h2 className="reveal" style={{ fontSize: '32px', fontWeight: 300, fontFamily: "'Playfair Display', serif", color: '#fff', borderBottom: '1px solid #333', paddingBottom: '16px', marginBottom: '32px' }}>
      {children}
    </h2>
  )

  return (
    <div ref={pageRef} style={{ background: '#000', minHeight: '100vh', display: 'flex', flexDirection: 'column', color: '#fff' }}>
      <Navbar />

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '100px 24px', width: '100%', display: 'flex', flexDirection: 'column', gap: '80px' }}>
        
        {/* Navigation & Header */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          <button
            onClick={() => navigate(-1)}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'none', border: '1px solid #333', padding: '10px 20px', borderRadius: '100px', cursor: 'pointer', alignSelf: 'flex-start', color: '#fff', transition: 'all 0.3s' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#111'; e.currentTarget.style.borderColor = '#555'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.borderColor = '#333'; }}
          >
            <BackArrowIcon size={20} color="#fff" />
            <span style={{ fontSize: '14px', fontWeight: 500 }}>Back to Projects</span>
          </button>

          <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <h1 style={{ fontSize: 'clamp(40px, 6vw, 64px)', fontWeight: 300, fontFamily: "'Playfair Display', serif", lineHeight: 1.1, margin: 0 }}>
              {cs.title}
            </h1>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {cs.tags.map(([l, c]) => (
                <span key={l} style={{ padding: '6px 16px', borderRadius: '100px', border: '1px solid #333', fontSize: '12px', fontWeight: 500 }}>{l}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Thumbnail Hero */}
        <div className="reveal" style={{ width: '100%', borderRadius: '16px', border: '1px solid #222', overflow: 'hidden', aspectRatio: '16/9' }}>
          <img src={projectListing.imgSrc} alt={cs.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>

        {/* Meta Info */}
        <div className="reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', padding: '32px', background: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: '16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ fontSize: '12px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Timeline</span>
            <span style={{ fontSize: '18px', fontWeight: 500 }}>{cs.timeline}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ fontSize: '12px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Role</span>
            <span style={{ fontSize: '18px', fontWeight: 500 }}>{cs.role}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ fontSize: '12px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Outcome</span>
            <span style={{ fontSize: '18px', fontWeight: 500 }}>{cs.outcome}</span>
          </div>
        </div>

        {/* Overview */}
        <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '900px' }}>
          <SectionHeading>Overview</SectionHeading>
          <p style={{ fontSize: '20px', lineHeight: 1.6, color: '#ccc', fontWeight: 300 }}>{cs.overview}</p>
        </div>

        {/* Problem & Solution */}
        {(cs.problem || cs.solution) && (
          <div className="reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
            {cs.problem && (
              <div style={{ padding: '40px', background: 'linear-gradient(145deg, #0a0a0a, #050505)', border: '1px solid #222', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <h3 style={{ fontSize: '24px', color: '#ff5c5c', fontWeight: 400, fontFamily: "'Playfair Display', serif" }}>The Problem</h3>
                <p style={{ fontSize: '16px', lineHeight: 1.7, color: '#bbb' }}>{cs.problem}</p>
              </div>
            )}
            {cs.solution && (
              <div style={{ padding: '40px', background: 'linear-gradient(145deg, #0a0a0a, #050505)', border: '1px solid #222', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <h3 style={{ fontSize: '24px', color: '#5cff8a', fontWeight: 400, fontFamily: "'Playfair Display', serif" }}>The Solution</h3>
                <p style={{ fontSize: '16px', lineHeight: 1.7, color: '#bbb' }}>{cs.solution}</p>
              </div>
            )}
          </div>
        )}

        {/* Design Process */}
        {cs.designProcess && (
          <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <SectionHeading>Design Process</SectionHeading>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
              {cs.designProcess.map((step, i) => (
                <div key={i} style={{ padding: '24px', border: '1px solid #222', borderRadius: '12px', background: '#0a0a0a' }}>
                  <h4 style={{ fontSize: '18px', fontWeight: 500, color: '#fff', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '12px', padding: '4px 8px', background: '#222', borderRadius: '4px', color: '#888' }}>0{i + 1}</span>
                    {step.phase}
                  </h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {step.activities.map((act, j) => (
                      <li key={j} style={{ fontSize: '14px', color: '#aaa', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ width: '4px', height: '4px', background: '#555', borderRadius: '50%' }}></span>
                        {act}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Competitive Analysis */}
        {cs.competitiveAnalysis && (
          <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <SectionHeading>Competitive Analysis</SectionHeading>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {cs.competitiveAnalysis.map((comp, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', padding: '24px', border: '1px solid #222', borderRadius: '12px', background: '#0a0a0a' }}>
                  <div style={{ fontSize: '18px', fontWeight: 600, color: '#fff', display: 'flex', alignItems: 'center' }}>{comp.name}</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <span style={{ fontSize: '12px', color: '#5cff8a', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Strengths</span>
                    <span style={{ fontSize: '14px', color: '#bbb', lineHeight: 1.5 }}>{comp.strength}</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <span style={{ fontSize: '12px', color: '#ff5c5c', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Weaknesses</span>
                    <span style={{ fontSize: '14px', color: '#bbb', lineHeight: 1.5 }}>{comp.weakness}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* User Persona & Empathy Map */}
        {(cs.userPersona || cs.empathyMap) && (
          <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            <SectionHeading>User Research & Empathy</SectionHeading>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
              {cs.userPersona && (
                <div style={{ padding: '32px', border: '1px solid #222', borderRadius: '16px', background: '#0a0a0a', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#222', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>👤</div>
                    <div>
                      <h4 style={{ fontSize: '20px', color: '#fff', margin: 0 }}>{cs.userPersona.name}</h4>
                      <span style={{ fontSize: '14px', color: '#888' }}>{cs.userPersona.role}</span>
                    </div>
                  </div>
                  <p style={{ fontSize: '15px', color: '#ccc', lineHeight: 1.6, fontStyle: 'italic' }}>"{cs.userPersona.bio}"</p>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                      <strong style={{ fontSize: '13px', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Goals</strong>
                      <ul style={{ paddingLeft: '20px', marginTop: '8px', color: '#bbb', fontSize: '14px', lineHeight: 1.5 }}>
                        {cs.userPersona.goals.map((g, i) => <li key={i}>{g}</li>)}
                      </ul>
                    </div>
                    <div>
                      <strong style={{ fontSize: '13px', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Frustrations</strong>
                      <ul style={{ paddingLeft: '20px', marginTop: '8px', color: '#bbb', fontSize: '14px', lineHeight: 1.5 }}>
                        {cs.userPersona.frustrations.map((f, i) => <li key={i}>{f}</li>)}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {cs.empathyMap && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
                  <div style={{ padding: '24px', background: '#0a0a0a', border: '1px solid #222', borderRadius: '12px' }}>
                    <span style={{ fontSize: '12px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '12px' }}>Says</span>
                    <ul style={{ paddingLeft: '16px', margin: 0, color: '#ddd', fontSize: '13px', lineHeight: 1.5 }}>
                      {cs.empathyMap.says.map((s, i) => <li key={i}>{s}</li>)}
                    </ul>
                  </div>
                  <div style={{ padding: '24px', background: '#0a0a0a', border: '1px solid #222', borderRadius: '12px' }}>
                    <span style={{ fontSize: '12px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '12px' }}>Thinks</span>
                    <ul style={{ paddingLeft: '16px', margin: 0, color: '#ddd', fontSize: '13px', lineHeight: 1.5 }}>
                      {cs.empathyMap.thinks.map((t, i) => <li key={i}>{t}</li>)}
                    </ul>
                  </div>
                  <div style={{ padding: '24px', background: '#0a0a0a', border: '1px solid #222', borderRadius: '12px' }}>
                    <span style={{ fontSize: '12px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '12px' }}>Does</span>
                    <ul style={{ paddingLeft: '16px', margin: 0, color: '#ddd', fontSize: '13px', lineHeight: 1.5 }}>
                      {cs.empathyMap.does.map((d, i) => <li key={i}>{d}</li>)}
                    </ul>
                  </div>
                  <div style={{ padding: '24px', background: '#0a0a0a', border: '1px solid #222', borderRadius: '12px' }}>
                    <span style={{ fontSize: '12px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '12px' }}>Feels</span>
                    <ul style={{ paddingLeft: '16px', margin: 0, color: '#ddd', fontSize: '13px', lineHeight: 1.5 }}>
                      {cs.empathyMap.feels.map((f, i) => <li key={i}>{f}</li>)}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Existing Sections (Vision, Strategy, How it Works) */}
        <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          <SectionHeading>Solution Details</SectionHeading>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <strong style={{ fontSize: '14px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.1em' }}>The Vision</strong>
              <p style={{ fontSize: '18px', lineHeight: 1.6, color: '#ddd' }}>{cs.vision}</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <strong style={{ fontSize: '14px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Strategy</strong>
              <p style={{ fontSize: '18px', lineHeight: 1.6, color: '#ddd' }}>{cs.strategy}</p>
            </div>
          </div>

          {cs.howItWorks && (
            <div style={{ marginTop: '20px' }}>
              <strong style={{ fontSize: '14px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '24px' }}>How it Works</strong>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                {cs.howItWorks.map((item, i) => (
                  <div key={i} style={{ padding: '24px', background: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: '12px' }}>
                    <strong style={{ color: '#fff', fontSize: '16px', display: 'block', marginBottom: '8px' }}>{item.bold}</strong>
                    <span style={{ color: '#aaa', fontSize: '14px', lineHeight: 1.5 }}>{item.text.replace(/^:\s*/, '')}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {cs.keyBenefits && (
            <div style={{ marginTop: '20px' }}>
              <strong style={{ fontSize: '14px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '24px' }}>Key Benefits</strong>
              <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '12px', color: '#ccc', fontSize: '16px' }}>
                {cs.keyBenefits.map((item, i) => (
                  <li key={i}>
                    <strong style={{ color: '#fff' }}>{item.bold}</strong>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Explore Project / Behance Link CTA */}
        <div className="reveal" style={{ marginTop: '60px', display: 'flex', justifyContent: 'center' }}>
          <a
            href={cs.projectLink}
            target="_blank"
            rel="noreferrer"
            style={{ 
              display: 'inline-flex', alignItems: 'center', gap: '12px', 
              padding: '16px 32px', background: '#fff', color: '#000', 
              borderRadius: '100px', fontSize: '18px', fontWeight: 600, 
              textDecoration: 'none', transition: 'all 0.3s',
              boxShadow: '0 4px 15px rgba(255,255,255,0.1)'
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(255,255,255,0.2)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 4px 15px rgba(255,255,255,0.1)'; }}
          >
            Explore Full Project
            <ArrowUpRightIcon size={20} color="#000" />
          </a>
        </div>

      </main>
      <Footer />
    </div>
  )
}