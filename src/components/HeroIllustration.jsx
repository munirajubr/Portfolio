import React from 'react';
import heroGraphic from '../assets/hero-graphic.png';

const HeroIllustration = () => {
  return (
    <div className="reveal delay-2" style={{ position: 'relative', width: '100%', maxWidth: 500, height: 'auto', minHeight: 280, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      
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
    </div>
  );
};

export default HeroIllustration;
