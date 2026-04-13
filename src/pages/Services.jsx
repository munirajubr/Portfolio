import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Tag from '../components/Tag'
import { services } from '../utils/services'
import { ArrowUpRightIcon } from '../utils/icons'

export default function Services() {
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
        <h1 className="page-title" style={{ fontSize: 32, fontWeight: 700 }}>Services</h1>

        <div className="reveal services-row" style={{ display: 'flex', gap: 50, flexWrap: 'wrap' }}>
          {services.map(({ Icon, iconBg, title, desc }) => (
            <div
              key={title}
              style={{
                background: 'var(--white)',
                border: '2.5px solid var(--black)',
                borderRadius: 25,
                padding: 25,
                boxShadow: '7.5px 7.5px 0 var(--black)',
                width: 350,
                display: 'flex',
                flexDirection: 'column',
                gap: 15,
                minHeight: 320,
                flexShrink: 0,
              }}
            >
              <div style={{
                background: iconBg,
                border: '2px solid var(--black)',
                borderRadius: 5,
                boxShadow: '3px 3px 0 var(--black)',
                padding: 10,
                width: 'fit-content',
                display: 'flex',
                alignItems: 'center',
                flexShrink: 0,
              }}>
                <Icon size={50} color="var(--black)" />
              </div>
              <h3 style={{ fontSize: 32, fontWeight: 700, lineHeight: 1.2 }}>{title}</h3>
              <p style={{ flex: 1, fontSize: 18, fontWeight: 500, lineHeight: 1.6 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Next Step CTA */}
      <section className="reveal section-pad" style={{ padding: '0 100px', display: 'flex', flexDirection: 'column', gap: 25 }}>
        <div style={{ display: 'inline-flex' }}>
          <Tag label="Let's Connect" color="red" />
        </div>
        <div
          className="cta-row"
          style={{ background: 'var(--white)', border: '3px solid var(--black)', borderRadius: 25, padding: '25px 30px', boxShadow: '3px 3px 0 var(--black)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}
        >
          <p className="cta-heading" style={{ fontSize: 38, fontWeight: 700, maxWidth: 392 }}>Let's Connect</p>
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
