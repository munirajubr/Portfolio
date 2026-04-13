import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Tag from './Tag'
import { StarIcon, LinkArrowIcon } from '../utils/icons'

/* ── Project Card ── */
export function ProjectCard({ id, tags, title, desc, img, caseColor, arrowIco, reverse, projectLink }) {
  const navigate = useNavigate()
  const hasLink = projectLink && projectLink.trim() !== ""
  
  const handleNavigation = (e) => {
    if (e) e.preventDefault()
    if (hasLink) {
      if (projectLink.startsWith('http')) {
        window.location.href = projectLink
      } else {
        navigate(projectLink)
      }
    } else {
      navigate(`/case-study/${id}`)
    }
  }

  return (
    <div
      className="reveal project-card-row"
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 30, flexDirection: reverse ? 'row-reverse' : 'row' }}
    >
      <div className="project-card-info" style={{ display: 'flex', flexDirection: 'column', gap: 10, width: 575, flexShrink: 0 }}>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {tags.map(([label, color]) => <Tag key={label} label={label} color={color} />)}
        </div>
        <h3 className="project-card-title" style={{ fontSize: 32, fontWeight: 700, lineHeight: 1.2 }}>{title}</h3>
        <p style={{ fontSize: 18, fontWeight: 500, lineHeight: 1.6 }}>{desc}</p>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <a 
            href={hasLink ? projectLink : `/case-study/${id}`} 
            onClick={handleNavigation}
            style={{ display: 'flex', alignItems: 'center', gap: 5, textDecoration: 'none', fontSize: 16, fontWeight: 500, color: 'var(--black)' }}
          >
            View <strong style={{ color: caseColor, fontWeight: 700 }}> Project</strong>
            {arrowIco ? (
              <img src={arrowIco} alt="" style={{ width: 18, height: 18 }} />
            ) : (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M3.75 9h10.5M9.75 5l4.5 4-4.5 4" stroke={caseColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </a>
          <div style={{ marginLeft: 44, width: 80, height: 2, background: caseColor, borderRadius: 50 }} />
        </div>
      </div>
      <div
        className="project-card-img"
        style={{ width: 550, height: 391, borderRadius: 20, border: '5px solid var(--black)', boxShadow: '7.5px 7.5px 0 var(--black)', flexShrink: 0, overflow: 'hidden', cursor: 'pointer', transition: 'transform .2s, box-shadow .2s' }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translate(-3px,-3px)'; e.currentTarget.style.boxShadow = '10.5px 10.5px 0 var(--black)' }}
        onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '7.5px 7.5px 0 var(--black)' }}
        onClick={() => handleNavigation()}
      >
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
      <p className="achievement-title" style={{ flex: 1, fontSize: 32, fontWeight: 700, lineHeight: 1.2 }}>{title}</p>
      <a href={achievementLink} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 5, textDecoration: 'none' }}>
        <span style={{ fontSize: 16, fontWeight: 500, color: 'var(--purple)' }}>View Credential</span>
        <LinkArrowIcon size={18} color="var(--purple)" />
      </a>
    </div>
  )
}

/* ── Education Card ── */
export function EducationCard({ institution, location, degree, gaduationyear, CGPA, color }) {
  return (
    <div style={{ flex: 1, background: 'var(--white)', border: '3px solid var(--black)', borderRadius: 15, padding: 10, boxShadow: '4px 4px 0 var(--black)', display: 'flex', flexDirection: 'column', gap: 10, minWidth: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Tag label={gaduationyear} color={color} />
          {degree.includes('Pursuing') && <span style={{ fontSize: 18, fontWeight: 500 }}>Pursuing</span>}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <StarIcon size={20} color="var(--black)" />
          <span style={{ fontSize: 18, fontWeight: 500 }}>{CGPA} CGPA</span>
        </div>
      </div>
      <p className="edu-card-title" style={{ fontSize: 32, fontWeight: 700 }}>{institution}</p>
      <p style={{ fontSize: 18, fontWeight: 500 }}>{location}</p>
      <p style={{ fontSize: 18, fontWeight: 500 }}>{degree}</p>
    </div>
  )
}

/* ── Experience Card ── */
export function ExperienceCard({ duration, domain, worktype, company, workmode, dates, description, color, milestones, caseStudyLink }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const showDetail = description.length > 2

  return (
    <div className="reveal exp-card-row" style={{ display: 'flex', gap: 50 }}>
      <div className="exp-card-left" style={{ width: 400, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 15 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          <Tag label={duration} color={color} />
          <h3 style={{ fontSize: 32, fontWeight: 700, margin: '5px 0 0 0' }}>{company}</h3>
          <p style={{ fontSize: 18, fontWeight: 500, opacity: 0.7, margin: 0 }}>{worktype} • {workmode}</p>
        </div>

        {milestones && milestones.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0, marginTop: 10, paddingLeft: 10 }}>
            {milestones.map((ms, idx) => (
              <div key={idx} style={{ display: 'flex', gap: 15, position: 'relative', paddingBottom: idx === milestones.length - 1 ? 0 : 25 }}>
                {idx !== milestones.length - 1 && (
                  <div style={{ position: 'absolute', left: 4, top: 12, bottom: 0, width: 2, background: 'var(--black)', opacity: 0.3 }} />
                )}
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--black)', border: '2px solid var(--white)', boxShadow: '0 0 0 2px var(--black)', zIndex: 2, marginTop: 6, flexShrink: 0 }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <p style={{ fontSize: 18, fontWeight: 700, lineHeight: 1.2 }}>{ms.title}</p>
                  <p style={{ fontSize: 14, fontWeight: 500, opacity: 0.7 }}>{ms.type} • {ms.date}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16, minWidth: 0 }}>
        <ul className="body-text-md" style={{ fontSize: 20, fontWeight: 500, paddingLeft: 36, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {(isExpanded ? description : description.slice(0, 2)).map((desc, i) => (
            <li key={i}>{desc}</li>
          ))}
        </ul>
          {showDetail && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              style={{ background: 'none', border: 'none', color: 'var(--black)', fontSize: 16, fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', padding: 0, width: 'fit-content' }}
            >
              {isExpanded ? 'Show Less' : 'View Detail'}
            </button>
            <div style={{ width: isExpanded ? 80 : 85, height: 3, background: `var(--${color === 'red' ? 'purple' : 'orange'})`, borderRadius: 50, transition: 'width 0.3s ease' }} />
          </div>
        )}
      </div>
    </div>
  )
}

/* ── Skill Card ── */
export function SkillCard({ category, skillsList }) {
  return (
    <div className="reveal skill-card-row" style={{ display: 'flex', gap: 50 }}>
      <div className="skill-card-label" style={{ width: 400, flexShrink: 0 }}>
        <p style={{ fontSize: 32, fontWeight: 700 }}>{category}</p>
      </div>
      <p className="skill-card-text" style={{ flex: 1, fontSize: 20, fontWeight: 500, lineHeight: 1.6, minWidth: 0 }}>
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
