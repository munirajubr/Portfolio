import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Tag from '../components/Tag'
import { ExperienceItems } from '../utils/ExperienceItems'
import { EducationItems } from '../utils/EducationItems'
import { skillItems } from '../utils/skillItems'
import { achievements } from '../utils/achievements'
import { aboutDetails } from '../utils/aboutDetails'
import { calculateTotalExperienceCount, calculateExperienceDuration } from '../utils/calculateExperience'
import { formatDateRange } from '../utils/dateUtils'
import { getProjectsCount } from '../utils/work'
import { assets } from '../utils/assets'

import { ExperienceCard, SkillCard, EducationCard, AchievementCard } from '../components/Cards'

export default function AboutMe() {
  const pageRef = useRef(null)
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1 }
    )
    pageRef.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={pageRef} style={{ background:'var(--bg)', minHeight:'100vh', display:'flex', flexDirection:'column', gap:100 }}>
      <Navbar />

      {/* Hero */}
      <section style={{ padding:'0 100px', display:'flex', flexDirection:'column', gap:50 }}>
        <h1 style={{ fontSize:32, fontWeight:700 }}>About Me</h1>
        <div style={{ display:'flex', gap:50, alignItems:'flex-start' }}>
          {/* Left */}
          <div style={{ flex:1, display:'flex', flexDirection:'column', gap:50 }}>
            <p className="reveal" style={{ fontSize:24, fontWeight:500, lineHeight:1.6 }}>
              {aboutDetails[0]}
            </p>

            {/* Stats */}
            <div className="reveal delay-1" style={{ display:'flex', gap:30, alignItems:'center' }}>
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
              <a href={assets.resumeURL} target="_blank" rel="noreferrer" style={{ display:'flex', alignItems:'center', gap:15, background:'var(--green)', border:'3px solid var(--black)', borderRadius:50, padding:'12.5px 30px', boxShadow:'3px 3px 0 var(--black)', fontSize:24, fontWeight:700, color:'var(--black)', textDecoration:'none', transition:'transform .15s, box-shadow .15s' }}
                onMouseEnter={e=>{ e.currentTarget.style.transform='translate(-2px,-2px)'; e.currentTarget.style.boxShadow='5px 5px 0 var(--black)' }}
                onMouseLeave={e=>{ e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow='3px 3px 0 var(--black)' }}>
                <img src={assets.aboutResumeIco} alt="" style={{ width:32, height:32 }} />
                View Resume
              </a>
            </div>

            {/* Quick links */}
            <div className="reveal delay-2" style={{ display:'flex', gap:25 }}>
              {[{label:'Work Experience',color:'light-orange'},{label:'Skills & Education',color:'pink'},{label:'Achievements',color:'blue'}].map(({label,color})=>(
                <div key={label} style={{ display:'flex', alignItems:'center', gap:5, background:`var(--${color})`, border:'2px solid var(--black)', borderRadius:15, padding:'7.5px 15px', boxShadow:'3px 3px 0 var(--black)', fontSize:16, fontWeight:500, cursor:'pointer', flexShrink:0 }}>
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* Right photo */}
          <div className="reveal delay-1" style={{ position:'relative', width:430, height:460, flexShrink:0 }}>
            <img src={assets.aboutPhoto} alt="Muniraju" style={{ width:428, height:428, objectFit:'cover', borderRadius:16 }} onError={e=>e.currentTarget.style.display='none'} />
            <div style={{ position:'absolute', top:0, right:-20, background:'var(--orange)', border:'3px solid var(--black)', borderRadius:50, padding:'10px 20px', fontSize:16, fontWeight:700, boxShadow:'3px 3px 0 var(--black)', whiteSpace:'nowrap' }}>Muniraju B R</div>
            <div style={{ position:'absolute', bottom:20, left:20, background:'var(--blue)', border:'3px solid var(--black)', borderRadius:50, padding:'10px 20px', fontSize:14, fontWeight:700, boxShadow:'3px 3px 0 var(--black)', display:'flex', alignItems:'center', gap:10, whiteSpace:'nowrap' }}>
              <img src={assets.aboutAvailIco} alt="" style={{ width:18, height:18 }} />
              Available for collaborations
            </div>
          </div>
        </div>
      </section>

      {/* Work Experience */}
      <section style={{ padding:'0 100px', display:'flex', flexDirection:'column', gap:50 }}>
        <div style={{ display:'flex', gap:25, alignItems:'center' }}>
          <h2 style={{ fontSize:32, fontWeight:700, whiteSpace:'nowrap' }}>Work Experience</h2>
          <div style={{ flex:1, height:5, borderRadius:10, background:'linear-gradient(to right, rgba(0,0,0,0.75), rgba(61,61,61,0))' }} />
        </div>

        {ExperienceItems.map((exp, index) => (
          <ExperienceCard 
            key={index}
            duration={calculateExperienceDuration(exp)}
            domain={exp.domain}
            worktype={exp.worktype}
            company={exp.company}
            workmode={exp.workmode}
            dates={formatDateRange(exp.startDate, exp.endDate)}
            description={exp.description}
            color={index === 0 ? "red" : "orange"}
          />
        ))}
      </section>

      {/* Skills & Education */}
      <section style={{ padding:'0 100px', display:'flex', flexDirection:'column', gap:25 }}>
        <div style={{ display:'flex', gap:25, alignItems:'center' }}>
          <h2 style={{ fontSize:32, fontWeight:700, whiteSpace:'nowrap' }}>Skills &amp; Education</h2>
          <div style={{ flex:1, height:5, borderRadius:10, background:'linear-gradient(to right, rgba(0,0,0,0.75), rgba(61,61,61,0))' }} />
        </div>

        <Tag label="Skills" color="pink" />

        {skillItems.map((skillCategory, index) => (
          <SkillCard 
            key={index}
            category={skillCategory.category}
            skillsList={skillCategory.skillsList}
          />
        ))}

        <Tag label="Education" color="red" />

        <div className="reveal" style={{ display:'flex', gap:50 }}>
          {EducationItems.map((edu, index) => (
            <EducationCard 
              key={index}
              {...edu}
              color={index === 0 ? "orange" : "pink"}
            />
          ))}
        </div>
      </section>

      {/* Achievements */}
      <section style={{ padding:'0 100px', display:'flex', flexDirection:'column', gap:50 }}>
        <div style={{ display:'flex', gap:25, alignItems:'center' }}>
          <h2 style={{ fontSize:32, fontWeight:700, whiteSpace:'nowrap' }}>Achievements</h2>
          <div style={{ flex:1, height:5, borderRadius:10, background:'linear-gradient(to right, rgba(0,0,0,0.75), rgba(61,61,61,0))' }} />
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:50 }}>
          {achievements.map((ach, index) => (
            <AchievementCard 
              key={ach.title}
              {...ach}
              color={['orange', 'blue', 'red', 'light-orange'][index % 4]}
            />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}

