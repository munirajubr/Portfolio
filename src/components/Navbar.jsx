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
            <img src="/icon.png" alt="Logo" style={{ width: 36, height: 36 }} />
            {/* <span>Muniraju B R</span> */}
          </div>

          <div className="nav-links">
            {links.map((item) => {
              const isExternal = item.to.startsWith('http');

              return (
                <div
                  key={item.to}
                  onClick={() => handleNavigation(item.to, isExternal)}
                  style={{ cursor: 'pointer' }}
                  className={`nav-link ${pathname === item.to ? 'active' : ''} ${item.label === 'Resume' ? 'nav-link-highlight' : ''}`}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {item.label === 'Resume' && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                        <polyline points="10 9 9 9 8 9"></polyline>
                      </svg>
                    )}
                    {item.label}
                  </div>
                  {pathname === item.to && item.label !== 'Resume' && <span className="nav-dot" />}
                </div>
              );
            })}
          </div>

          <button
            className={`hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <button
          className="hamburger open"
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
          style={{ position: 'absolute', top: 24, right: 24 }}
        >
          <span /><span /><span />
        </button>
        {links.map((item) => {
          const isExternal = item.to.startsWith('http');

          return (
            <div
              key={item.to}
              onClick={() => handleNavigation(item.to, isExternal)}
              className={`mobile-link ${pathname === item.to ? 'active' : ''} ${item.label === 'Resume' ? 'nav-link-highlight' : ''}`}
              style={{ 
                cursor: 'pointer',
                ...(item.label === 'Resume' ? { width: 'fit-content', margin: '0 auto' } : {}) 
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                {item.label === 'Resume' && (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                )}
                {item.label}
              </div>
            </div>
          );
        })}
      </div>
    </>
  )
}
