import { useState, useEffect } from 'react';

/* ── Under Development Popup ── */
export default function UnderDevelopmentPopup() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      style={{ 
        position: 'fixed', 
        bottom: '30px', 
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 10000,
        width: 'max-content'
      }}
    >
      <style>
        {`
          @keyframes stickerPop {
            0% { transform: scale(0.5) rotate(5deg); opacity: 0; }
            70% { transform: scale(1.1) rotate(-2deg); opacity: 1; }
            100% { transform: scale(1) rotate(0deg); opacity: 1; }
          }
          .sticker-popup {
            animation: stickerPop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
            font-family: 'Syne', sans-serif;
          }
        `}
      </style>
      
      <div 
        className="sticker-popup"
        style={{ 
          background: 'var(--white)',
          border: '3px solid var(--black)',
          borderRadius: '16px',
          padding: '12px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '15px',
          boxShadow: '8px 8px 0 var(--black)',
          position: 'relative'
        }}
      >
        {/* Decorative corner tag */}
        <div style={{
          position: 'absolute',
          top: -15,
          left: -15,
          background: 'var(--purple)',
          border: '2px solid var(--black)',
          borderRadius: '8px',
          padding: '4px 10px',
          fontSize: '12px',
          fontWeight: 800,
          color: 'var(--white)',
          transform: 'rotate(-10deg)',
          boxShadow: '3px 3px 0 var(--black)'
        }}>
          LIVE FIX
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ fontSize: '24px' }}>🛠️</div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '18px', fontWeight: 800, color: 'var(--black)', textTransform: 'uppercase', lineHeight: 1 }}>
              Work in Progress
            </span>
            <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--black)', opacity: 0.8 }}>
              Polishing some digital magic for you.
            </span>
          </div>
        </div>

        {/* Action Button */}
        <button 
          onClick={() => setIsVisible(false)}
          style={{ 
            background: 'var(--light-orange)',
            border: '2px solid var(--black)',
            color: 'var(--black)',
            padding: '8px 16px',
            borderRadius: '10px',
            fontSize: '14px',
            fontWeight: 800,
            cursor: 'pointer',
            transition: 'all 0.1s',
            boxShadow: '3px 3px 0 var(--black)',
            marginLeft: '10px'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translate(-2px, -2px)';
            e.currentTarget.style.boxShadow = '5px 5px 0 var(--black)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.boxShadow = '3px 3px 0 var(--black)';
          }}
        >
          COOL
        </button>
      </div>
    </div>
  );
}
