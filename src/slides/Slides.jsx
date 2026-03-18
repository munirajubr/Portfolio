import React, { useEffect, useRef, useState } from 'react';
import Tag from '../components/Tag';

import SlideCard from './components/SlideCard';
import PDFPresentationViewer from './components/PDFPresentationViewer';
import OTPModal from './components/OTPModal';
import { IconPresentation } from './icons';
import { useAuth } from './hooks/useAuth';

// Dynamically import ALL PDFs
const pdfFiles = import.meta.glob('./slides/*.pdf', { eager: true, query: '?url', import: 'default' });

const Slides = () => {
  const pageRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(null);
  const [slides, setSlides] = useState([]);

  const { status, error, cooldown, requestOTP, verifyOTP, verifyPassword } = useAuth();
  
  // PRIMARY CONDITION: Show content only if verified
  const isVerified = status === 'verified';

  // Load slides from PDF glob
  useEffect(() => {
    const loaded = Object.keys(pdfFiles).map((path) => {
      const filename = path.split('/').pop();
      const nameRaw = filename.replace(/\.pdf$/i, '');
      const title = nameRaw.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
      return { id: nameRaw, title, filename, url: pdfFiles[path] };
    });
    setSlides(loaded);
  }, []);

  // Scroll reveal animation
  useEffect(() => {
    if (!slides.length || !isVerified) return;
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    pageRef.current?.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [slides, isVerified]);

  return (
    <div ref={pageRef} style={{ background: 'var(--bg, #fdfcf0)', minHeight: '100vh', position: 'relative' }}>
      {/* <Navbar /> */}

      {/* AUTH MODAL - Always render overlay if not verified */}
      {!isVerified && (
        <OTPModal
          status={status}
          error={error}
          cooldown={cooldown}
          onRequest={requestOTP}
          onVerify={verifyOTP}
          onVerifyPassword={verifyPassword}
        />
      )}

      <div style={{ position: 'relative', paddingBottom: 100 }}>
        {/* Comic dot background */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.03, pointerEvents: 'none',
          backgroundImage: 'radial-gradient(black 1px, transparent 1px)',
          backgroundSize: '12px 12px', zIndex: 0,
        }} />

        {/* Page content */}
        <main style={{
          padding: '80px 5%', 
          maxWidth: 1400,
          margin: '0 auto',
          position: 'relative', 
          zIndex: 1,
          filter: !isVerified ? 'blur(10px)' : 'none',
          pointerEvents: !isVerified ? 'none' : 'auto',
          transition: 'filter 0.5s ease',
        }}>
          {/* Header */}
          <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 70, maxWidth: 700 }}>
            <Tag label="PRESENTATIONS" color="red" />
            <h1 style={{ fontSize: 'clamp(32px, 8vw, 48px)', fontWeight: 800, fontFamily: 'Syne, sans-serif', textTransform: 'uppercase', lineHeight: 1.1 }}>
              Slides
            </h1>
            <p style={{ fontSize: 'clamp(16px, 3vw, 20px)', fontWeight: 500, lineHeight: 1.6, fontFamily: 'Outfit, sans-serif', opacity: 0.75 }}>
              A collection of talks, workshops, and presentations.
            </p>
          </div>

          {/* Grid with improved responsive behavior */}
          {slides.length > 0 ? (
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 400px), 1fr))', 
              gap: 24 
            }}>
              {slides.map((s) => (
                <SlideCard key={s.id} slide={s} onPresent={setActiveSlide} />
              ))}
            </div>
          ) : (
            <div className="reveal" style={{
              background: '#fff', border: '3px solid #000',
              borderRadius: 20, padding: 80, boxShadow: '12px 12px 0 #000', textAlign: 'center',
            }}>
              <IconPresentation size={52} />
              <h2 style={{ fontSize: 28, fontWeight: 800, textTransform: 'uppercase', fontFamily: 'Syne, sans-serif', marginTop: 20 }}>
                No slides yet
              </h2>
            </div>
          )}

          <div className="reveal" style={{ marginTop: 120, paddingTop: 50, borderTop: '4px solid var(--black)' }}>
            <Tag label="RESOURCES" color="blue" />
            <p style={{ fontSize: 'clamp(18px, 3vw, 24px)', fontWeight: 800, textTransform: 'uppercase', marginTop: 15, fontFamily: 'Syne, sans-serif', lineHeight: 1.3 }}>
              Technical insights shared<br />with the community.
            </p>
          </div>
        </main>
      </div>

      {/* <Footer /> */}

      {/* PDF Presenter */}
      {activeSlide && isVerified && (
        <PDFPresentationViewer slide={activeSlide} onClose={() => setActiveSlide(null)} />
      )}
    </div>
  );
};

export default Slides;
