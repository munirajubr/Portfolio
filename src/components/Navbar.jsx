import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { navItems } from '../utils/navItems'

export default function Navbar() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const links = navItems.map(item => ({ label: item.label, to: item.link }))

  useEffect(() => { setMenuOpen(false) }, [pathname])
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const handleNavigation = (to, isExternal) => {
    setMenuOpen(false)
    if (isExternal) {
      window.open(to, '_blank', 'noreferrer')
    } else {
      navigate(to)
    }
  }



  return (
    <>
      <nav className="nav">
        <div className="nav-inner">
          <div 
            className="nav-logo" 
            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px' }}
            onClick={() => handleNavigation('/', false)}
          >
            <img src="/icon.png" alt="Logo" style={{ width: 36, height: 36, filter: 'brightness(0) invert(1)' }} />
            {/* <span>Muniraju B R</span> */}
          </div>

          {/* Desktop nav links (all items including Resume) */}
          <div className="nav-links">
            {links.map((item) => {
              const isExternal = item.to.startsWith('http');
              return (
                <div
                  key={item.to}
                  onClick={() => handleNavigation(item.to, isExternal)}
                  style={{ cursor: 'pointer' }}
                  className={`nav-link ${pathname === item.to ? 'active' : ''}`}
                >
                  {item.label}
                  {pathname === item.to && <span className="nav-dot" />}
                </div>
              );
            })}
          </div>

          <div className="nav-mobile-right">

            <button
              className={`hamburger ${menuOpen ? 'open' : ''}`}
              onClick={() => setMenuOpen(o => !o)}
              aria-label="Toggle menu"
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay: fullscreen centered (Reverted to "as like before") */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        {links.map((item) => {
          const isExternal = item.to.startsWith('http');
          return (
            <div
              key={item.to}
              onClick={() => handleNavigation(item.to, isExternal)}
              className={`mobile-link ${pathname === item.to ? 'active' : ''}`}
              style={{ cursor: 'pointer' }}
            >
              {item.label}
            </div>
          );
        })}
      </div>
    </>
  )
}
