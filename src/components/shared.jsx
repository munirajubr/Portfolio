import { useEffect, useRef } from 'react'
import styles from './shared.module.css'

/* ── Logo Pills ── */
export function LogoPills() {
  return (
    <div className={styles.logoPills}>
      <div className={`${styles.pill} ${styles.pillPurple}`} />
      <div className={`${styles.pill} ${styles.pillPink}`} />
      <div className={`${styles.pill} ${styles.pillGreen}`} />
    </div>
  )
}

/* ── Scroll reveal hook ── */
export function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible')
      }),
      { threshold: 0.1 }
    )
    const el = ref.current
    if (el) {
      el.querySelectorAll('.reveal').forEach(node => observer.observe(node))
    }
    return () => observer.disconnect()
  }, [])
  return ref
}

/* ── Section divider with title ── */
export function SectionDivider({ title }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 25 }}>
      <div style={{
        flex: 1,
        height: 5,
        borderRadius: 10,
        background: 'linear-gradient(to left, rgba(255,130,130,0.75), rgba(61,61,61,0))',
      }} />
      <h2 style={{ fontSize: 32, fontWeight: 700, whiteSpace: 'nowrap' }}>{title}</h2>
      <div style={{
        flex: 1,
        height: 5,
        borderRadius: 10,
        background: 'linear-gradient(to right, rgba(255,130,130,0.75), rgba(61,61,61,0))',
      }} />
    </div>
  )
}
