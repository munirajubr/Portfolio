import { Link, useLocation, useNavigate } from 'react-router-dom'
import styles from './shared.module.css'
import { navItems } from '../utils/navItems'
import { LogoPills } from './shared'

/* ── Navbar ── */
export default function Navbar() {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const links = navItems.map(item => ({
    label: item.label,
    to: item.link
  }))

  return (
    <nav className={styles.nav}>
      <Link to="/" className={styles.logoWrap}>
        <LogoPills />
        <span className={styles.logoName}>Muniraju B R</span>
      </Link>
      <div className={styles.navLinks}>
        {links.map(({ label, to }) => (
          <Link
            key={to}
            to={to}
            className={`${styles.navItem} ${pathname === to ? styles.navActive : ''}`}
          >
            <span>{label}</span>
            <div className={styles.navUnderline} />
          </Link>
        ))}
      </div>
    </nav>
  )
}