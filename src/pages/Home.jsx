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

          <p className="reveal delay-1" style={{ fontSize:32, fontWeight:800, letterSpacing:'3.2px', textTransform:'uppercase', color:'white', textShadow:'-4px 4px 0px #ff8282', lineHeight:1.35 }}>
            Crafting Intuitive and Impactful Digital Experiences
          </p>

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
        <div className="reveal delay-2" style={{ position:'relative', flexShrink:0, width:480, height:520 }}>
          {/* Tool icons – left */}
          <div style={{ position:'absolute', left:0, top:85, display:'flex', flexDirection:'column', gap:18, zIndex:2 }}>
            <img src={assets.figmaLogo} alt="Figma" style={{ width:75, height:75 }} />
            <div style={{ border:'2px solid var(--black)', borderRadius:10, boxShadow:'4px 4px 0 var(--black)', width:51, height:50, overflow:'hidden' }}>
              <img src={assets.xdLogo} alt="Adobe XD" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
            </div>
            <div style={{ border:'2px solid var(--black)', borderRadius:10, boxShadow:'4px 4px 0 var(--black)', width:50, height:50, overflow:'hidden', marginTop:100 }}>
              <img src={assets.miroLogo} alt="Miro" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
            </div>
          </div>
          {/* Yellow card */}
          <div style={{ position:'absolute', left:99, top:81, width:368, height:370, background:'#f5d050', borderRadius:16, zIndex:1 }} />
          {/* Photo */}
          <img src={assets.profilePhoto} alt="Muniraju B R"
            style={{ position:'absolute', left:104, top:0, width:336, height:504, objectFit:'cover', objectPosition:'top', borderRadius:12, zIndex:2 }}
            onError={e => e.currentTarget.style.opacity='0'} />
          {/* Name badge */}
          <div style={{ position:'absolute', right:-20, top:0, zIndex:3, background:'var(--purple)', border:'3px solid var(--black)', borderRadius:50, padding:'10px 20px', fontSize:16, fontWeight:700, color:'var(--bg)', boxShadow:'3px 3px 0 var(--black)', whiteSpace:'nowrap' }}>
            Muniraju B R
          </div>
          {/* Available badge */}
          <div style={{ position:'absolute', left:170, bottom:10, zIndex:3, background:'var(--green)', border:'3px solid var(--black)', borderRadius:50, padding:'10px 20px', fontSize:14, fontWeight:700, color:'var(--black)', boxShadow:'3px 3px 0 var(--black)', display:'flex', alignItems:'center', gap:10, whiteSpace:'nowrap' }}>
            <img src={assets.availIco} alt="" style={{ width:18, height:18 }} />
            Available for collaborations
          </div>
        </div>
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
