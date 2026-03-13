import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Tag from './Tag'
import { assets } from '../utils/assets'

/* ── Project Card ── */
export function ProjectCard({ id, tags, title, desc, img, caseColor, arrowIco, reverse }) {
  const navigate = useNavigate()
  return (
    <div className="reveal" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 30, flexDirection: reverse ? 'row-reverse' : 'row' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: 575, flexShrink: 0 }}>
        <div style={{ display: 'flex', gap: 15, flexWrap: 'wrap' }}>
          {tags.map(([label, color]) => <Tag key={label} label={label} color={color} />)}
        </div>
        <h3 style={{ fontSize: 32, fontWeight: 700, lineHeight: 1.2 }}>{title}</h3>
        <p style={{ fontSize: 18, fontWeight: 500, lineHeight: 1.6 }}>{desc}</p>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <Link to={`/case-study/${id}`} style={{ display: 'flex', alignItems: 'center', gap: 5, textDecoration: 'none', fontSize: 16, fontWeight: 500, color: 'var(--black)' }}>
            View <strong style={{ color: caseColor, fontWeight: 700 }}> Case Study</strong>
            {arrowIco ? (
              <img src={arrowIco} alt="" style={{ width: 18, height: 18 }} />
            ) : (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M3.75 9h10.5M9.75 5l4.5 4-4.5 4" stroke={caseColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </Link>
          <div style={{ marginLeft: 44, width: 111, height: 2, background: caseColor, borderRadius: 50 }} />
        </div>
      </div>
      <div
        style={{ width: 550, height: 391, borderRadius: 20, border: '5px solid var(--black)', boxShadow: '7.5px 7.5px 0 var(--black)', flexShrink: 0, overflow: 'hidden', cursor: 'pointer', transition: 'transform .2s, box-shadow .2s' }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translate(-3px,-3px)'; e.currentTarget.style.boxShadow = '10.5px 10.5px 0 var(--black)' }}
        onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '7.5px 7.5px 0 var(--black)' }}
        onClick={() => navigate(`/case-study/${id}`)}>
        <img src={img} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
    </div>
  )
}

/* ── Achievement Card ── */
export function AchievementCard({ title, providedby, color, date = "2024-2025", achievementLink }) {
  return (
    <div className="reveal" style={{ background: 'var(--white)', border: '3px solid var(--black)', borderRadius: 15, padding: 10, boxShadow: '4px 4px 0 var(--black)', display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Tag label={providedby} color={color} />
        <span style={{ fontSize: 18, fontWeight: 500 }}>{date}</span>
      </div>
      <p style={{ flex: 1, fontSize: 32, fontWeight: 700, lineHeight: 1.2 }}>{title}</p>
      <a href={achievementLink} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 5, textDecoration: 'none' }}>
        <span style={{ fontSize: 16, fontWeight: 500, color: 'var(--purple)' }}>View Credential</span>
        <img src={assets.linkArrow} alt="" style={{ width: 18, height: 18 }} />
      </a>
    </div>
  )
}

/* ── Education Card ── */
export function EducationCard({ institution, location, degree, gaduationyear, CGPA, color }) {
  return (
    <div style={{ flex: 1, background: 'var(--white)', border: '3px solid var(--black)', borderRadius: 15, padding: 10, boxShadow: '4px 4px 0 var(--black)', display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Tag label={gaduationyear} color={color} />
          {degree.includes('Pursuing') && <span style={{ fontSize: 18, fontWeight: 500 }}>Pursuing</span>}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img src={assets.starIco} alt="" style={{ width: 20, height: 20 }} />
          <span style={{ fontSize: 18, fontWeight: 500 }}>{CGPA} CGPA</span>
        </div>
      </div>
      <p style={{ fontSize: 32, fontWeight: 700 }}>{institution}</p>
      <p style={{ fontSize: 18, fontWeight: 500 }}>{location}</p>
      <p style={{ fontSize: 18, fontWeight: 500 }}>{degree}</p>
    </div>
  )
}

/* ── Experience Card ── */
export function ExperienceCard({ duration, domain, worktype, company, workmode, dates, description, color, milestones }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const showDetail = description.length > 2

  return (
    <div className="reveal" style={{ display: 'flex', gap: 50 }}>
      <div style={{ width: 400, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 15 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Tag label={duration} color={color} />
          {/* <p style={{ fontSize: 32, fontWeight: 700 }}>{domain} <span style={{ fontSize: 18, fontWeight: 600 }}>({worktype})</span></p> */}
          {/* <p style={{ fontSize: 18, fontWeight: 500 }}>{company} ({workmode})</p> */}
          {/* <p style={{ fontSize: 18, fontWeight: 500 }}>{dates}</p> */}
        </div>

        {/* Milestones Vertical Progress */}
        {milestones && milestones.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0, marginTop: 10, paddingLeft: 10 }}>
            {milestones.map((ms, idx) => (
              <div key={idx} style={{ display: 'flex', gap: 15, position: 'relative', paddingBottom: idx === milestones.length - 1 ? 0 : 25 }}>
                {/* Vertical Line */}
                {idx !== milestones.length - 1 && (
                  <div style={{ position: 'absolute', left: 4, top: 12, bottom: 0, width: 2, background: 'var(--black)', opacity: 0.3 }} />
                )}
                
                {/* Dot */}
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--black)', border: '2px solid var(--white)', boxShadow: '0 0 0 2px var(--black)', zIndex: 2, marginTop: 6, flexShrink: 0 }} />
                
                {/* Info */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <p style={{ fontSize: 18, fontWeight: 700, lineHeight: 1.2 }}>{ms.title}</p>
                  <p style={{ fontSize: 14, fontWeight: 500, opacity: 0.7 }}>{ms.type} • {ms.date}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <ul style={{ fontSize: 20, fontWeight: 500, paddingLeft: 36, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {(isExpanded ? description : description.slice(0, 2)).map((desc, i) => (
            <li key={i}>{desc}</li>
          ))}
        </ul>
        
        {showDetail && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              style={{ 
                background: 'none', 
                border: 'none', 
                color: 'var(--black)', 
                fontSize: 16, 
                fontWeight: 500, 
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                padding: 0,
                width: 'fit-content',
              }}
            >
              {isExpanded ? 'Show Less' : 'View Detail'}
            </button>
            <div 
              style={{ 
                width: isExpanded ? 80 : 85, 
                height: 3, 
                background: `var(--${color === 'red' ? 'purple' : 'orange'})`,
                borderRadius: 50,
                transition: 'width 0.3s ease'
              }} 
            />
          </div>
        )}
      </div>
    </div>
  )
}

/* ── Skill Card ── */
export function SkillCard({ category, skillsList }) {
  return (
    <div className="reveal" style={{ display: 'flex', gap: 50 }}>
      <div style={{ width: 400, flexShrink: 0 }}><p style={{ fontSize: 32, fontWeight: 700 }}>{category}</p></div>
      <p style={{ flex: 1, fontSize: 20, fontWeight: 500, lineHeight: 1.6 }}>
        {skillsList.map((skill, i) => (
          <span key={i}>
            {skill}
            {i < skillsList.length - 1 && <span style={{ color: 'var(--purple)' }}> / </span>}
          </span>
        ))}
      </p>
    </div>
  )
}
