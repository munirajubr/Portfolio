import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Tag from '../components/Tag'
import { getAllProjects } from '../utils/work'
import { ArrowUpRightIcon } from '../utils/icons'
import { ProjectCard } from '../components/Cards'

const PROJECTS = getAllProjects()

export default function MyWork() {
  const navigate = useNavigate()
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
    <div ref={pageRef} style={{ background: 'var(--bg)', minHeight: '100vh', display: 'flex', flexDirection: 'column', gap: 50 }}>
      <Navbar />

      <section className="section-pad" style={{ padding: '0 100px', display: 'flex', flexDirection: 'column', gap: 50 }}>
        <h1 className="page-title" style={{ fontSize: 32, fontWeight: 700 }}>My Work</h1>
        {PROJECTS.map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </section>

      {/* Next Step CTA */}
      <section className="reveal section-pad" style={{ padding: '0 100px', display: 'flex', flexDirection: 'column', gap: 25 }}>
        <div style={{ display: 'inline-flex' }}>
          <Tag label="Next Step" color="red" />
        </div>
        <div
          className="cta-row"
          style={{ background: 'var(--white)', border: '3px solid var(--black)', borderRadius: 25, padding: '25px 30px', boxShadow: '3px 3px 0 var(--black)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}
        >
          <p className="cta-heading" style={{ fontSize: 38, fontWeight: 700, maxWidth: 392 }}>Let's Work Together</p>
          <button
            onClick={() => navigate('/contact')}
            style={{ background: 'var(--green)', border: '2px solid var(--black)', borderRadius: 25, padding: '15px 20px', boxShadow: '5px 5px 0 var(--black)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'transform .15s', flexShrink: 0 }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translate(-2px,-2px)'}
            onMouseLeave={e => e.currentTarget.style.transform = ''}
          >
            <ArrowUpRightIcon size={50} color="var(--black)" />
          </button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
