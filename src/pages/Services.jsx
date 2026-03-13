import { useEffect, useRef } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { services } from '../utils/services'
import { assets } from '../utils/assets'

export default function Services() {
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

      <section style={{ padding:'0 100px', display:'flex', flexDirection:'column', gap:50 }}>
        <h1 style={{ fontSize:32, fontWeight:700 }}>Services</h1>

        <div className="reveal" style={{ display:'flex', gap:50 }}>
          {services.map(({ icon, iconBg, title, desc, linkColor }) => (
            <div key={title} style={{
              background:'var(--white)',
              border:'2.5px solid var(--black)',
              borderRadius:25,
              padding:25,
              boxShadow:'7.5px 7.5px 0 var(--black)',
              width:350,
              display:'flex',
              flexDirection:'column',
              gap:15,
              height:425,
              flexShrink:0,
            }}>
              {/* Icon */}
              <div style={{
                background: iconBg,
                border:'2px solid var(--black)',
                borderRadius:5,
                boxShadow:`${iconBg !== 'transparent' ? '5px 5px' : '3px 3px'} 0 var(--black)`,
                padding: iconBg !== 'transparent' ? 10 : 0,
                width: iconBg !== 'transparent' ? 'fit-content' : 100,
                height: iconBg !== 'transparent' ? 'fit-content' : 69,
                overflow:'hidden',
                display:'flex',
                alignItems:'center',
                flexShrink:0,
              }}>
                <img src={icon} alt="" style={{ width: iconBg !== 'transparent' ? 84 : '100%', height: iconBg !== 'transparent' ? 50 : '100%', objectFit:'contain' }} />
              </div>

              <h3 style={{ fontSize:32, fontWeight:700, lineHeight:1.2 }}>{title}</h3>
              <p style={{ flex:1, fontSize:18, fontWeight:500, lineHeight:1.6 }}>{desc}</p>

              <a href="#" style={{ display:'inline-flex', alignItems:'center', gap:5, borderBottom:`2px solid ${linkColor}`, paddingBottom:2, textDecoration:'none', fontSize:18, fontWeight:500, color: linkColor }}>
                Learn more
                <img src={assets.learnArrow} alt="" style={{ width:18, height:18 }} />
              </a>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}
