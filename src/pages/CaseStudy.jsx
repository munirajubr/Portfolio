import { useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Tag from '../components/Tag'
import { caseStudies } from '../utils/caseStudies'

import { assets } from '../utils/assets'

const nextColorMap = {
  pink: 'var(--pink)',
  orange: 'var(--orange)',
  blue: 'var(--blue)',
  green: 'var(--green)',
  'light-orange': 'var(--light-orange)',
}

export default function CaseStudy() {
  const { id } = useParams()
  const navigate = useNavigate()
  const pageRef  = useRef(null)
  const cs = caseStudies[id] || caseStudies['student-gpt']

  useEffect(() => {
    window.scrollTo(0, 0)
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.08 }
    )
    pageRef.current?.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [id])

  const metaCard = (label, value) => (
    <div style={{ background:'var(--white)', border:'3px solid var(--black)', borderRadius:15, padding:'15px 20px', boxShadow:'3px 3px 0 var(--black)', display:'flex', flexDirection:'column', gap:8, width:'100%' }}>
      <span style={{ fontSize:18, fontWeight:500 }}>{label}</span>
      <span style={{ fontSize:24, fontWeight:500 }}>{value}</span>
    </div>
  )

  const ExploreBtn = () => (
    <a href={cs.projectLink} target="_blank" rel="noreferrer"
      style={{ display:'inline-flex', alignItems:'center', gap:15, background:'var(--white)', border:'3px solid var(--black)', borderRadius:15, padding:'12.5px 25px', boxShadow:'3px 3px 0 var(--black)', textDecoration:'none', fontSize:24, fontWeight:500, color:'var(--black)', transition:'transform .15s, box-shadow .15s' }}
      onMouseEnter={e=>{ e.currentTarget.style.transform='translate(-2px,-2px)'; e.currentTarget.style.boxShadow='5px 5px 0 var(--black)' }}
      onMouseLeave={e=>{ e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow='3px 3px 0 var(--black)' }}>
      Explore Project
      <div style={{ background:'var(--green)', border:'2px solid var(--black)', borderRadius:15, padding:'5px 10px', boxShadow:'5px 5px 0 var(--black)', display:'flex', alignItems:'center', justifyContent:'center', height:64 }}>
        <img src={assets.extArrow} alt="→" style={{ width:20, height:20 }} />
      </div>
    </a>
  )

  return (
    <div ref={pageRef} style={{ background:'var(--bg)', minHeight:'100vh', display:'flex', flexDirection:'column', gap:50 }}>
      <Navbar />

      {/* ══ MAIN CONTENT ══ */}
      <section style={{ padding:'0 100px', display:'flex', flexDirection:'column', gap:25, alignItems:'flex-end' }}>

        {/* Back button */}
        <button onClick={() => navigate(-1)}
          style={{ display:'flex', alignItems:'center', gap:15, background:'none', border:'none', cursor:'pointer', fontFamily:'Syne, sans-serif', alignSelf:'flex-start', transition:'opacity .15s' }}
          onMouseEnter={e=>e.currentTarget.style.opacity='.7'}
          onMouseLeave={e=>e.currentTarget.style.opacity='1'}>
          <img src={assets.backArrow} alt="←" style={{ width:36, height:37 }} />
          <span style={{ fontSize:32, fontWeight:700 }}>Back</span>
        </button>

        {/* Title row */}
        <div className="reveal" style={{ display:'flex', gap:25, alignItems:'center', justifyContent:'center', width:'100%' }}>
          <div style={{ flex:1, display:'flex', flexDirection:'column', gap:25 }}>
            <h1 style={{ fontSize:48, fontWeight:700, lineHeight:1.2 }}>{cs.title}</h1>
            <div style={{ display:'flex', gap:15, flexWrap:'wrap' }}>
              {cs.tags.map(([l, c]) => <Tag key={l} label={l} color={c} />)}
            </div>
          </div>
          <a href={cs.projectLink} target="_blank" rel="noreferrer"
            style={{ display:'inline-flex', alignItems:'center', gap:15, background:'var(--white)', border:'3px solid var(--black)', borderRadius:15, padding:'12.5px 25px', boxShadow:'3px 3px 0 var(--black)', textDecoration:'none', fontSize:24, fontWeight:500, color:'var(--black)', flexShrink:0, transition:'transform .15s, box-shadow .15s', height:80 }}
            onMouseEnter={e=>{ e.currentTarget.style.transform='translate(-2px,-2px)'; e.currentTarget.style.boxShadow='5px 5px 0 var(--black)' }}
            onMouseLeave={e=>{ e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow='3px 3px 0 var(--black)' }}>
            Explore Case Study
            <div style={{ background:'var(--green)', border:'2px solid var(--black)', borderRadius:15, padding:'5px 10px', boxShadow:'5px 5px 0 var(--black)', display:'flex', alignItems:'center', justifyContent:'center', height:'100%', aspectRatio:'90/80' }}>
              <img src={assets.extArrow} alt="→" style={{ width:20, height:20 }} />
            </div>
          </a>
        </div>

        {/* Hero image */}
        <div className="reveal" style={{ width:'100%', borderRadius:20, border:'5px solid var(--black)', boxShadow:'7.5px 7.5px 0 var(--black)', overflow:'hidden', aspectRatio:'1440/1024' }}>
          <img src={cs.heroImg} alt={cs.title} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
        </div>

        {/* Meta + overview row */}
        <div className="reveal" style={{ display:'flex', gap:25, padding:'25px 0', width:'100%', alignItems:'flex-start' }}>
          {/* Left meta cards */}
          <div style={{ display:'flex', flexDirection:'column', gap:25, width:284, flexShrink:0 }}>
            {metaCard('Timeline:', cs.timeline)}
            {metaCard('Role:', cs.role)}
            {metaCard('Outcome:', cs.outcome)}
          </div>

          {/* Right content */}
          <div style={{ flex:1, display:'flex', flexDirection:'column', gap:25 }}>
            <h2 style={{ fontSize:28, fontWeight:700 }}>Overview:</h2>
            <p style={{ fontSize:28, fontWeight:500, lineHeight:1.6 }}>{cs.overview}</p>

            {/* Divider */}
            <div style={{ height:5, borderRadius:10, background:'linear-gradient(to right, rgba(0,0,0,0.75), rgba(61,61,61,0))' }} />

            {/* Vision + Strategy */}
            <div style={{ display:'flex', gap:50 }}>
              <div style={{ flex:1, display:'flex', flexDirection:'column', gap:25 }}>
                <div style={{ display:'inline-flex' }}>
                  <span style={{ background:'var(--blue)', border:'2px solid var(--black)', borderRadius:15, padding:'7.5px 15px', boxShadow:'4px 4px 0 var(--black)', fontSize:28, fontWeight:700 }}>The Vision</span>
                </div>
                <p style={{ fontSize:28, fontWeight:500, lineHeight:1.5 }}>{cs.vision}</p>
              </div>
              <div style={{ flex:1, display:'flex', flexDirection:'column', gap:25 }}>
                <div style={{ display:'inline-flex' }}>
                  <span style={{ background:'var(--red)', border:'2px solid var(--black)', borderRadius:15, padding:'7.5px 15px', boxShadow:'4px 4px 0 var(--black)', fontSize:28, fontWeight:700 }}>Strategy</span>
                </div>
                <p style={{ fontSize:28, fontWeight:500, lineHeight:1.5 }}>{cs.strategy}</p>
              </div>
            </div>

            {/* How it Works */}
            <h3 style={{ fontSize:28, fontWeight:700, textDecoration:'underline' }}>How it Works:</h3>
            <div style={{ display:'flex', flexDirection:'column', gap:8, fontSize:28, fontWeight:500, lineHeight:1.6 }}>
              {cs.howItWorks.map((item, i) => (
                <p key={i}>
                  <strong style={{ fontWeight:700 }}>- {item.bold}</strong>
                  {item.text}
                </p>
              ))}
            </div>

            {/* Key Benefits */}
            <h3 style={{ fontSize:28, fontWeight:700, textDecoration:'underline' }}>Key Benefits:</h3>
            <div style={{ display:'flex', flexDirection:'column', gap:8, fontSize:28, fontWeight:500, lineHeight:1.6 }}>
              {cs.keyBenefits.map((item, i) => (
                <p key={i}>
                  <strong style={{ fontWeight:700 }}>{item.bold}</strong>
                  {item.text}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Explore Project button (bottom right) */}
        <div className="reveal" style={{ display:'flex', justifyContent:'flex-end', width:'100%' }}>
          <ExploreBtn />
        </div>
      </section>

      {/* ══ NEXT STEP CTA ══ */}
      <section className="reveal" style={{ padding:'0 100px', display:'flex', flexDirection:'column', gap:25 }}>
        <div style={{ display:'inline-flex' }}>
          <Tag label="Next Step" color={cs.nextColor} />
        </div>
        <div style={{ background:'var(--white)', border:'3px solid var(--black)', borderRadius:25, padding:'25px 30px', boxShadow:'3px 3px 0 var(--black)', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <p style={{ fontSize:38, fontWeight:700, maxWidth:392 }}>Let's Work Together</p>
          <button
            onClick={() => navigate('/contact')}
            style={{ background: nextColorMap[cs.nextColor] || 'var(--orange)', border:'2px solid var(--black)', borderRadius:25, padding:'15px 20px', boxShadow:'5px 5px 0 var(--black)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', transition:'transform .15s' }}
            onMouseEnter={e=>e.currentTarget.style.transform='translate(-2px,-2px)'}
            onMouseLeave={e=>e.currentTarget.style.transform=''}>
            <img src={assets.exploreIco} alt="→" style={{ width:50, height:50 }} />
          </button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
