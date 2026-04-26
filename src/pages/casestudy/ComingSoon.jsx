import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { BackArrowIcon } from '../../utils/icons';

const ComingSoon = ({ title }) => {
  return (
    <div className="page-root">
      <Navbar />
      
      <main style={{ 
        minHeight: '75vh', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '80px 24px',
        textAlign: 'center'
      }}>
        {/* Simple Label */}
        <div style={{ 
          fontSize: '14px', 
          fontWeight: 700, 
          color: '#999', 
          textTransform: 'uppercase', 
          letterSpacing: '0.15em',
          marginBottom: '24px'
        }}>
          Project Case Study
        </div>

        {/* Minimal Title */}
        <h1 style={{ 
          fontSize: 'clamp(32px, 7vw, 74px)', 
          fontFamily: "'Playfair Display', serif",
          fontWeight: 300,
          color: 'var(--white)',
          lineHeight: 1.1,
          marginBottom: '24px',
          maxWidth: '900px'
        }}>
          {title}
        </h1>

        {/* Coming Soon Badge */}
        <div style={{ 
          border: '1.5px solid var(--white)', 
          color: 'var(--white)', 
          padding: '8px 24px', 
          borderRadius: '100px',
          fontSize: '15px',
          fontWeight: 600,
          marginBottom: '40px',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e' }} />
          Coming Soon
        </div>

        {/* Brief Text */}
        <p style={{ 
          fontSize: '18px', 
          lineHeight: 1.8,
          color: 'var(--gray)',
          maxWidth: '600px',
          marginBottom: '48px'
        }}>
          I'm currently putting together the details for this project. Stay tuned for a deep dive into the design process and final outcomes.
        </p>

        {/* Themed Button */}
        <Link 
          to="/" 
          className="hero-resume-btn stylish"
          style={{ 
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px'
          }}
        >
          <BackArrowIcon size={18} color="var(--white)" />
          Back to Home
        </Link>
      </main>

      <Footer />
    </div>
  );
};

export default ComingSoon;
