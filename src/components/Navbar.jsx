import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from './shared.module.css'
import { navItems } from '../utils/navItems'
import { LogoPills } from './shared'

export default function Navbar() {
  const { pathname } = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  const links = navItems.map(item => ({ label: item.label, to: item.link }))

  useEffect(() => { setMenuOpen(false) }, [pathname])
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <nav className={styles.nav}>
        <Link to="/" className={styles.logoWrap} onClick={() => setMenuOpen(false)}>
          <LogoPills />
          <span className={styles.logoName}>Muniraju B R</span>
        </Link>

        <div className={styles.navLinks}>
          {links.map(({ label, to }) => (
            <Link key={to} to={to} className={`${styles.navItem} ${pathname === to ? styles.navActive : ''}`}>
              <span>{label}</span>
              <div className={styles.navUnderline} />
            </Link>
          ))}
        </div>

        <button
          className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      <div className={`${styles.mobileMenu} ${menuOpen ? styles.open : ''}`}>
        <button
          className={`${styles.hamburger} ${styles.open}`}
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
          style={{ position: 'absolute', top: 20, right: 20 }}
        >
          <span /><span /><span />
        </button>
        {links.map(({ label, to }) => (
          <Link
            key={to}
            to={to}
            className={`${styles.mobileNavItem} ${pathname === to ? styles.mobileNavItemActive : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            {label}
          </Link>
        ))}
      </div>
    </>
  )
}
