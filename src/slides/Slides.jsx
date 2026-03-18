import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Tag from '../components/Tag';

import SlideCard from './components/SlideCard';
import PDFPresentationViewer from './components/PDFPresentationViewer';
import OTPModal from './components/OTPModal';
import { IconPresentation } from './icons';
import { useAuth } from './hooks/useAuth';

// Dynamically import ALL PDFs — drop a file in and it appears automatically
const pdfFiles = import.meta.glob('./slides/*.pdf', { eager: true, query: '?url', import: 'default' });

const Slides = () => {
  const pageRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(null);
  const [slides, setSlides] = useState([]);

  const { status, error, cooldown, requestOTP, verifyOTP } = useAuth();
  const isVerified = status === 'verified';
  const showModal = !isVerified;

  // ── Auto-trigger OTP on restricted page enter ───────────────────────────
  useEffect(() => {
    if (status === 'idle') requestOTP();
  }, [status, requestOTP]);

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
    <div ref={pageRef} style={{ background: 'var(--bg)', minHeight: '100vh', paddingBottom: 100 }}>
      {/* Comic dot background */}
      <div style={{
        position: 'fixed', inset: 0, opacity: 0.03, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(black 1px, transparent 1px)',
        backgroundSize: '12px 12px', zIndex: 0,
      }} />

      {/* Page content — blurred behind OTP modal */}
      <main style={{
        padding: '80px 100px', position: 'relative', zIndex: 1,
        filter: showModal ? 'blur(6px)' : 'none',
        pointerEvents: showModal ? 'none' : 'auto',
        userSelect: showModal ? 'none' : 'auto',
        transition: 'filter 0.4s ease',
      }}>
        {/* Header */}
        <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 70, maxWidth: 700 }}>
          <Tag label="PRESENTATIONS" color="red" />
          <h1 style={{ fontSize: 48, fontWeight: 800, fontFamily: 'Syne, sans-serif', textTransform: 'uppercase', lineHeight: 1.1 }}>
            Slides
          </h1>
          <p style={{ fontSize: 20, fontWeight: 500, lineHeight: 1.6, fontFamily: 'Outfit, sans-serif', opacity: 0.75 }}>
            A collection of talks, workshops, and presentations. Drop a PDF into the slides folder — it shows up here automatically.
          </p>
        </div>

        {/* Grid */}
        {slides.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(420px, 1fr))', gap: 24 }}>
            {slides.map((s) => (
              <SlideCard key={s.id} slide={s} onPresent={setActiveSlide} />
            ))}
          </div>
        ) : (
          <div className="reveal" style={{
            background: 'var(--white)', border: '3px solid var(--black)',
            borderRadius: 20, padding: 80, boxShadow: '12px 12px 0 var(--black)', textAlign: 'center',
          }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
              <IconPresentation size={52} />
            </div>
            <h2 style={{ fontSize: 28, fontWeight: 800, textTransform: 'uppercase', fontFamily: 'Syne, sans-serif', marginBottom: 12 }}>
              No slides yet
            </h2>
            <p style={{ fontSize: 16, fontWeight: 500, fontFamily: 'Outfit, sans-serif', opacity: 0.6 }}>
              Add PDF files to{' '}
              <code style={{ background: 'var(--blue)', padding: '2px 8px', borderRadius: 4, border: '2px solid var(--black)' }}>
                src/slides/slides/
              </code>{' '}
              to see them here.
            </p>
          </div>
        )}

        {/* Footer rule */}
        <div className="reveal" style={{ marginTop: 100, paddingTop: 40, borderTop: '4px solid var(--black)' }}>
          <Tag label="RESOURCES" color="blue" />
          <p style={{ fontSize: 20, fontWeight: 700, textTransform: 'uppercase', marginTop: 15, fontFamily: 'Syne, sans-serif' }}>
            Technical insights shared with the community.
          </p>
        </div>
      </main>

      {/* OTP Auth Modal — overlays page until verified */}
      <AnimatePresence>
        {showModal && (
          <OTPModal
            status={status}
            error={error}
            cooldown={cooldown}
            onRequest={requestOTP}
            onVerify={verifyOTP}
          />
        )}
      </AnimatePresence>

      {/* PDF Fullscreen Presenter */}
      <AnimatePresence>
        {activeSlide && (
          <PDFPresentationViewer slide={activeSlide} onClose={() => setActiveSlide(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Slides;
