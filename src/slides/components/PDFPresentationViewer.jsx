import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import * as pdfjsLib from 'pdfjs-dist';
import { IconX } from '../icons';

pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

export default function PDFPresentationViewer({ slide, onClose }) {
  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const canvasRef = useRef(null);
  const pdfRef = useRef(null);
  const renderTaskRef = useRef(null);
  const isNavigating = useRef(false);

  useEffect(() => {
    (async () => {
      try {
        const doc = await pdfjsLib.getDocument(slide.url).promise;
        pdfRef.current = doc;
        setNumPages(doc.numPages);
        setLoading(false);
      } catch (e) { console.error(e); }
    })();
  }, [slide.url]);

  const renderPage = useCallback(async (pageNo) => {
    const pdf = pdfRef.current;
    if (!pdf) return;
    try {
      if (renderTaskRef.current) { renderTaskRef.current.cancel(); renderTaskRef.current = null; }
      const page = await pdf.getPage(pageNo);
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      const base = page.getViewport({ scale: 1 });
      const scale = Math.max(window.innerWidth / base.width, window.innerHeight / base.height) * dpr;
      const vp = page.getViewport({ scale, rotation: page.rotate });
      canvas.width = vp.width; canvas.height = vp.height;
      canvas.style.width = `${vp.width / dpr}px`; canvas.style.height = `${vp.height / dpr}px`;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const task = page.render({ canvasContext: ctx, viewport: vp });
      renderTaskRef.current = task;
      await task.promise;
      renderTaskRef.current = null;
    } catch (e) {
      if (e?.name !== 'RenderingCancelledException') console.error(e);
    } finally { isNavigating.current = false; }
  }, []);

  useEffect(() => { if (!loading) renderPage(currentPage); }, [loading, currentPage, renderPage]);

  useEffect(() => {
    const h = () => renderPage(currentPage);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, [currentPage, renderPage]);

  const goTo = (p) => {
    if (p < 1 || p > numPages || isNavigating.current) return;
    isNavigating.current = true; setCurrentPage(p);
  };

  useEffect(() => {
    const h = (e) => {
      if (['ArrowRight', 'ArrowDown', ' '].includes(e.key)) { e.preventDefault(); goTo(currentPage + 1); }
      if (['ArrowLeft', 'ArrowUp'].includes(e.key)) { e.preventDefault(); goTo(currentPage - 1); }
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [currentPage, numPages, onClose]);

  useEffect(() => {
    const el = document.documentElement;
    if (el.requestFullscreen) el.requestFullscreen().catch(() => {});
    return () => { if (document.fullscreenElement && document.exitFullscreen) document.exitFullscreen().catch(() => {}); };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      style={{ position: 'fixed', inset: 0, background: '#000', zIndex: 9999, overflow: 'hidden', cursor: 'none' }}
    >
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        {loading
          ? <div style={{ color: 'rgba(255,255,255,0.25)', fontSize: 12, fontFamily: 'Syne, sans-serif', letterSpacing: 4, textTransform: 'uppercase' }}>Loading…</div>
          : <motion.canvas ref={canvasRef} key={currentPage} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.12 }} style={{ display: 'block' }} />
        }
      </div>

      {/* Click zones */}
      {!loading && currentPage > 1 && (
        <div onClick={() => goTo(currentPage - 1)} style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '30%', cursor: 'w-resize', zIndex: 10 }} />
      )}
      {!loading && currentPage < numPages && (
        <div onClick={() => goTo(currentPage + 1)} style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '30%', cursor: 'e-resize', zIndex: 10 }} />
      )}

      {/* Progress bar */}
      {!loading && numPages > 1 && (
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: 'rgba(255,255,255,0.08)', zIndex: 20 }}>
          <motion.div style={{ height: '100%', background: 'var(--green)', originX: 0 }} animate={{ scaleX: currentPage / numPages }} transition={{ duration: 0.25, ease: 'easeOut' }} />
        </div>
      )}

      {/* Hints — fade after 3s */}
      <motion.div initial={{ opacity: 1 }} animate={{ opacity: 0 }} transition={{ delay: 3, duration: 1.5 }} style={{ pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', bottom: 14, left: 20, color: 'rgba(255,255,255,0.25)', fontSize: 11, fontFamily: 'Outfit, sans-serif', zIndex: 20 }}>
          {!loading && `${currentPage} / ${numPages}`}
        </div>
        <div style={{ position: 'absolute', bottom: 14, right: 20, color: 'rgba(255,255,255,0.25)', fontSize: 10, fontFamily: 'Outfit, sans-serif', letterSpacing: 2, textTransform: 'uppercase', zIndex: 20 }}>
          ESC · ← →
        </div>
      </motion.div>

      {/* Close button */}
      <motion.button
        initial={{ opacity: 1 }} animate={{ opacity: 0 }} whileHover={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1.5 }}
        onClick={onClose}
        style={{
          position: 'absolute', top: 16, right: 18,
          background: 'var(--white)', border: '2px solid rgba(0,0,0,0.1)',
          borderRadius: 8, padding: '6px 12px',
          color: 'var(--black)', cursor: 'pointer', zIndex: 30,
          display: 'flex', alignItems: 'center', gap: 6,
          fontSize: 12, fontFamily: 'Syne, sans-serif', fontWeight: 700,
        }}
      >
        <IconX size={12} /> ESC
      </motion.button>
    </motion.div>
  );
}
