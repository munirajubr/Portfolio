import { useEffect, useRef, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { socialLinks } from '../utils/socialLinks'

const inputStyle = {
  background: 'var(--white)',
  border: '2px solid var(--black)',
  borderRadius: 10,
  padding: 20,
  width: '100%',
  fontFamily: 'Syne, sans-serif',
  fontSize: 18,
  fontWeight: 500,
  color: 'var(--black)',
  boxShadow: '3px 3px 0 var(--black)',
  outline: 'none',
  transition: 'box-shadow .15s, transform .15s',
}

export default function Contact() {
  const pageRef = useRef(null)
  const [form, setForm] = useState({ name: '', email: '', website: '', message: '' })
  const [sent, setSent] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1 }
    )
    pageRef.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 3000)
    setForm({ name: '', email: '', website: '', message: '' })
  }

  return (
    <div ref={pageRef} style={{ background: 'var(--bg)', minHeight: '100vh', display: 'flex', flexDirection: 'column', gap: 50 }}>
      <Navbar />

      {/* ── Contact section ── */}
      <section className="section-pad" style={{ padding: '0 100px', display: 'flex', flexDirection: 'column', gap: 25 }}>
        <h1 className="page-title" style={{ fontSize: 32, fontWeight: 700 }}>Contact</h1>
        <p className="body-text-lg" style={{ fontSize: 24, fontWeight: 500, opacity: 0.8, maxWidth: 802 }}>
          I specialize in crafting{' '}
          <strong style={{ color: 'var(--purple)', textDecoration: 'underline', fontWeight: 700 }}>
            exceptional digital experience
          </strong>{' '}
          to help clients achieve their business goals.
        </p>

        <div className="reveal contact-top-row" style={{ display: 'flex', gap: 25, alignItems: 'flex-start' }}>
          {/* Left – email & socials */}
          <div className="contact-email-col" style={{ width: 681, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 15, padding: '25px 0' }}>
            <p style={{ fontSize: 18, fontWeight: 500 }}>Email at:</p>
            <a
              href="mailto:munirajgowdaraj@gmail.com"
              className="contact-email-text"
              style={{ fontSize: 32, fontWeight: 700, color: 'var(--black)', textDecoration: 'none', transition: 'color .15s', wordBreak: 'break-all' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--purple)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--black)'}
            >
              munirajgowdaraj@gmail.com
            </a>

            <p style={{ fontSize: 18, fontWeight: 500, marginTop: 16 }}>Follow</p>
            <div className="contact-socials" style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {socialLinks.map(({ label, icon, bg, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  style={{ display: 'flex', alignItems: 'center', gap: 10, background: bg, border: '2px solid var(--black)', borderRadius: 15, padding: '7.5px 15px', boxShadow: '4px 4px 0 var(--black)', textDecoration: 'none', color: 'var(--black)', fontSize: 18, fontWeight: 500, transition: 'transform .15s, box-shadow .15s' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translate(-2px,-2px)'; e.currentTarget.style.boxShadow = '6px 6px 0 var(--black)' }}
                  onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '4px 4px 0 var(--black)' }}
                >
                  <img src={icon} alt="" style={{ width: 20, height: 20 }} />
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Right – location & phone cards */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10, minWidth: 0 }}>
            <div style={{ background: 'var(--white)', border: '3px solid var(--black)', borderRadius: 25, padding: 30, boxShadow: '3px 3px 0 var(--black)' }}>
              <p style={{ fontSize: 18, fontWeight: 500 }}>Location:</p>
              <p style={{ fontSize: 32, fontWeight: 700, marginTop: 8 }}>Bengaluru, Karnataka</p>
            </div>
            <div style={{ background: 'var(--white)', border: '3px solid var(--black)', borderRadius: 25, padding: 30, boxShadow: '3px 3px 0 var(--black)', display: 'flex', flexDirection: 'column', gap: 15 }}>
              <p style={{ fontSize: 18, fontWeight: 500 }}>Contact</p>
              <p className="contact-phone-text" style={{ fontSize: 32, fontWeight: 700 }}>+91 8296158346</p>
              <a
                href="https://wa.me/918296158346"
                target="_blank"
                rel="noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', background: 'var(--green)', border: '2px solid var(--black)', borderRadius: 15, padding: '7.5px 15px', boxShadow: '4px 4px 0 var(--black)', textDecoration: 'none', fontSize: 18, fontWeight: 500, color: 'var(--black)', cursor: 'pointer', transition: 'transform .15s', width: 'fit-content' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translate(-2px,-2px)'}
                onMouseLeave={e => e.currentTarget.style.transform = ''}
              >
                Call / WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Collaboration / Form ── */}
      <section className="section-pad" style={{ padding: '0 100px', display: 'flex', flexDirection: 'column', gap: 25 }}>
        <h2 className="section-heading" style={{ fontSize: 32, fontWeight: 700 }}>For collaboration</h2>

        <div className="reveal contact-top-row" style={{ display: 'flex', gap: 25, alignItems: 'flex-start' }}>
          {/* Description */}
          <div style={{ width: 'min(605px, 100%)', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 15, padding: '25px 0' }}>
            <p style={{ fontSize: 32, fontWeight: 700 }}>Tell me about your project</p>
            <p className="body-text-md" style={{ fontSize: 20, fontWeight: 500, opacity: 0.8, lineHeight: 1.7 }}>
              Any project starts with goal setting. If you have a vision, I can design it.
              <br /><br />
              After the inquiry, I will reply within 2–3 working days, with an approximate quote for the project or with questions for more details.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-end', minWidth: 0 }}
          >
            <div style={{ display: 'flex', gap: 10, width: '100%', flexWrap: 'wrap' }}>
              <input
                required
                placeholder="Your name *"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                style={{ ...inputStyle, flex: 1, minWidth: 160 }}
                onFocus={e => { e.target.style.boxShadow = '5px 5px 0 var(--purple)'; e.target.style.borderColor = 'var(--purple)' }}
                onBlur={e => { e.target.style.boxShadow = '3px 3px 0 var(--black)'; e.target.style.borderColor = 'var(--black)' }}
              />
              <input
                required
                type="email"
                placeholder="Your email *"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                style={{ ...inputStyle, flex: 1, minWidth: 160 }}
                onFocus={e => { e.target.style.boxShadow = '5px 5px 0 var(--purple)'; e.target.style.borderColor = 'var(--purple)' }}
                onBlur={e => { e.target.style.boxShadow = '3px 3px 0 var(--black)'; e.target.style.borderColor = 'var(--black)' }}
              />
            </div>
            <input
              placeholder="Your Website (if exists)"
              value={form.website}
              onChange={e => setForm(f => ({ ...f, website: e.target.value }))}
              style={{ ...inputStyle }}
              onFocus={e => { e.target.style.boxShadow = '5px 5px 0 var(--purple)'; e.target.style.borderColor = 'var(--purple)' }}
              onBlur={e => { e.target.style.boxShadow = '3px 3px 0 var(--black)'; e.target.style.borderColor = 'var(--black)' }}
            />
            <textarea
              required
              placeholder="Project details, context, how can I help... *"
              value={form.message}
              onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
              style={{ ...inputStyle, height: 180, resize: 'vertical' }}
              onFocus={e => { e.target.style.boxShadow = '5px 5px 0 var(--purple)'; e.target.style.borderColor = 'var(--purple)' }}
              onBlur={e => { e.target.style.boxShadow = '3px 3px 0 var(--black)'; e.target.style.borderColor = 'var(--black)' }}
            />
            <button
              type="submit"
              style={{
                background: sent ? 'var(--green)' : 'var(--orange)',
                border: '2px solid var(--black)',
                borderRadius: 15,
                padding: '15px 20px',
                boxShadow: '4px 4px 0 var(--black)',
                fontFamily: 'Syne, sans-serif',
                fontSize: 18,
                fontWeight: 500,
                color: 'var(--black)',
                cursor: 'pointer',
                transition: 'transform .15s, box-shadow .15s, background .3s',
                alignSelf: 'flex-end',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translate(-2px,-2px)'; e.currentTarget.style.boxShadow = '6px 6px 0 var(--black)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '4px 4px 0 var(--black)' }}
            >
              {sent ? '✓ Message Sent!' : 'Send Message'}
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  )
}
