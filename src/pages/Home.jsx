import { useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Tag from '../components/Tag'
import { getHomeProjects, getProjectsCount } from '../utils/work'
import { assets } from '../utils/assets'
import { calculateTotalExperienceCount } from '../utils/calculateExperience'
import { ExperienceItems } from '../utils/ExperienceItems'
import { ProjectCard } from '../components/Cards'
import HeroIllustration from '../components/HeroIllustration'


const PROJECTS = getHomeProjects()

export default function Home() {
  const navigate = useNavigate()
  const pageRef  = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.08 }
    )
    pageRef.current?.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={pageRef} style={{ background:'var(--bg)', minHeight:'100vh', display:'flex', flexDirection:'column', gap:100 }}>
      <Navbar />

      {/* ══ HERO ══ */}
      <section style={{ padding:'50px 100px', display:'flex', gap:50, alignItems:'center' }}>

        {/* Left */}
        <div style={{ flex:1, display:'flex', flexDirection:'column', gap:25, minWidth:0 }}>
          <p className="reveal" style={{ fontSize:24, fontWeight:500, opacity:0.8 }}>Hi, I'm Muniraju B R.</p>

          <h1 className="reveal delay-1" style={{ 
            fontSize:42, 
            fontWeight:800, 
            letterSpacing:'0.5px', 
            textTransform:'uppercase', 
            color:'var(--white)', 
            textShadow: `
              1px 1px 0 var(--black), 
              -1px 1px 0 var(--black), 
              1px -1px 0 var(--black), 
              -1px -1px 0 var(--black), 
              0px 1px 0 var(--black), 
              0px -1px 0 var(--black), 
              1px 0px 0 var(--black), 
              -1px 0px 0 var(--black), 
              -3px 3px 0px var(--red)
            `, 
            lineHeight:1.2 
          }}>
            Crafting Intuitive and Impactful Digital Experiences
          </h1>

          <p className="reveal delay-2" style={{ fontSize:24, fontWeight:500, opacity:0.8, lineHeight:1.5 }}>
            I'm a UIUX Designer, I specialize in crafting exceptional digital experiences to help clients achieve their business goals.
          </p>

          {/* Stats + Resume */}
          <div className="reveal delay-3" style={{ display:'flex', gap:30, alignItems:'center', flexWrap:'wrap' }}>
            <div style={{ display:'flex', flexDirection:'column', gap:1 }}>
              <div style={{ display:'flex', alignItems:'flex-end' }}>
                <span style={{ fontSize:32, fontWeight:700 }}>{calculateTotalExperienceCount(ExperienceItems)}</span>
                <span style={{ fontSize:24, fontWeight:500, color:'var(--purple)' }}>+</span>
              </div>
              <span style={{ fontSize:18, fontWeight:500, color:'var(--gray)' }}>Years of Experience</span>
            </div>
            <div style={{ width:2, background:'var(--gray)', opacity:0.5, borderRadius:50, alignSelf:'stretch' }} />
            <div style={{ display:'flex', flexDirection:'column', gap:1 }}>
              <div style={{ display:'flex', alignItems:'flex-end' }}>
                <span style={{ fontSize:32, fontWeight:700 }}>{getProjectsCount()}</span>
                <span style={{ fontSize:24, fontWeight:500, color:'var(--purple)' }}>+</span>
              </div>
              <span style={{ fontSize:18, fontWeight:500, color:'var(--gray)' }}>Projects</span>
            </div>
            <a href={assets.resumeURL} target="_blank" rel="noreferrer" style={{ display:'flex', alignItems:'center', gap:15, background:'var(--green)', border:'3px solid var(--black)', borderRadius:50, padding:'12.5px 30px', boxShadow:'3px 3px 0 var(--black)', fontSize:24, fontWeight:700, color:'var(--black)', textDecoration:'none', transition:'transform .15s, box-shadow .15s', flexShrink:0 }}
              onMouseEnter={e=>{ e.currentTarget.style.transform='translate(-2px,-2px)'; e.currentTarget.style.boxShadow='5px 5px 0 var(--black)' }}
              onMouseLeave={e=>{ e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow='3px 3px 0 var(--black)' }}>
              <img src={assets.resumeIco} alt="" style={{ width:32, height:32 }} />
              View Resume
            </a>
          </div>

          {/* About link */}
          <div className="reveal delay-4" style={{ display:'flex', flexDirection:'column', alignItems:'flex-start' }}>
            <Link to="/about" style={{ display:'flex', alignItems:'center', gap:5, textDecoration:'none', fontSize:18, fontWeight:500, color:'var(--black)' }}>
              <span>more</span>
              <strong style={{ color:'var(--purple)', fontWeight:700 }}> About Me</strong>
              <img src={assets.aboutArrow} alt="" style={{ width:18, height:18 }} />
            </Link>
            <div style={{ marginLeft:55, width:110, height:2, background:'var(--purple)', borderRadius:50 }} />
          </div>
        </div>

        {/* Right – photo composite */}
        <HeroIllustration />
      </section>

      {/* ══ FEATURED WORKS ══ */}
      <section style={{ padding:'0 100px', display:'flex', flexDirection:'column', gap:50 }}>
        <div className="reveal" style={{ display:'flex', alignItems:'center', gap:25 }}>
          <div style={{ flex:1, height:5, borderRadius:10, background:'linear-gradient(to left, rgba(255,130,130,0.75), rgba(61,61,61,0))' }} />
          <h2 style={{ fontSize:32, fontWeight:700, whiteSpace:'nowrap' }}>Featured Works</h2>
          <div style={{ flex:1, height:5, borderRadius:10, background:'linear-gradient(to right, rgba(255,130,130,0.75), rgba(61,61,61,0))' }} />
        </div>

        {PROJECTS.map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </section>


      <Footer />
    </div>
  )
}
