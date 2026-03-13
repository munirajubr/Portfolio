import React from 'react';
import heroGraphic from '../assets/hero-graphic.png';

const HeroIllustration = () => {
  return (
    <div className="reveal delay-2" style={{ position: 'relative', width: 500, height: 500, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      
      {/* Main Illustration (No background container or decorations) */}
      <div 
        style={{ 
          position: 'relative',
          width: '100%', 
          height: '100%', 
          zIndex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <img 
          src={heroGraphic} 
          alt="Designer illustration" 
          style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
        />
      </div>

      {/* Name Badge */}
      <div 
        className="sticker sticker-orange"
        style={{ 
          position: 'absolute', 
          top: 40, 
          right: -10, 
          zIndex: 10,
          fontSize: '20px',
          textTransform: 'uppercase'
        }}
      >
        Muniraju B R
      </div>

      {/* Available for Work Badge */}
      <div 
        className="sticker sticker-blue"
        style={{ 
          position: 'absolute', 
          bottom: 40, 
          right: 20, 
          zIndex: 10,
          fontSize: '16px',
          gap: '12px'
        }}
      >
        {/* Verification Icon */}
        <div style={{ 
          width: 24, 
          height: 24, 
          background: 'var(--bg)', 
          borderRadius: '50%', 
          border: '2px solid black',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
            <path d="M1 5L4.5 8.5L11 1" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        Available for work
      </div>
    </div>
  );
};

export default HeroIllustration;
