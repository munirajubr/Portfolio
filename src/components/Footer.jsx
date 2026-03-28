import { Link, useNavigate } from 'react-router-dom'
import styles from './shared.module.css'
import { socialLinks } from '../utils/socialLinks'
import { CompassIcon, ShareIcon } from '../utils/icons'

/* ── Footer ── */
export default function Footer() {
  const navigate = useNavigate()

  return (
    <footer className={styles.footer}>
      <div className={styles.footerDivider} />
      <div className={styles.footerCard}>
        <div className={`${styles.footerTop} footer-top-row`}>
          <div className={styles.footerCta}>
            <p className={styles.footerHeadline}>
              Crafting Exceptional digital experiences to help clients achieve their goals.
            </p>
            <button
              className={`${styles.btnTouch} footer-btn-touch`}
              onClick={() => navigate('/contact')}
            >
              Get in Touch
            </button>
          </div>

          <div className="footer-nav-group">
            <div className={styles.footerCol}>
              <div className={`${styles.footerColHeader} ${styles.footerColGreen}`}>
                <CompassIcon size={20} />
                Explore
              </div>
              <Link className={styles.footerLink} to="/about">About Me</Link>
              <Link className={styles.footerLink} to="/work">My Work</Link>
              <Link className={styles.footerLink} to="/contact">Contact</Link>
            </div>

            <div className={styles.footerCol}>
              <div className={`${styles.footerColHeader} ${styles.footerColBlue}`}>
                <ShareIcon size={20} />
                Social
              </div>
              {socialLinks.map(({ label, href }) => (
                <a key={label} className={styles.footerLink} href={href} target="_blank" rel="noreferrer">{label}</a>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.footerCopy}>
          <p>@ 2026 Portfolio Designed by <span style={{ color: 'var(--purple)', fontWeight: 700 }}>Muniraju B R</span> | All Rights Reserved</p>
        </div>
      </div>

      <div className={styles.footerBigName}>
        <span>Muniraju B R</span>
      </div>
    </footer>
  )
}