import React, { useEffect, useRef, useState, useCallback } from 'react';
import Tag from '../components/Tag';
import { AnimatePresence, motion } from 'framer-motion';
import * as pdfjsLib from 'pdfjs-dist';

pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

const pdfFiles = import.meta.glob('./slides/*.pdf', { eager: true, query: '?url', import: 'default' });

// ─── Inline SVG Icons (zero font dependency) ──────────────────────────────────
const IconDownload = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3v13M7 11l5 5 5-5"/><path d="M5 20h14"/>
  </svg>
);
const IconChevronDown = ({ size = 14, rotate = false }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
    style={{ transition: 'transform 0.2s', transform: rotate ? 'rotate(180deg)' : 'none', display: 'block' }}>
    <path d="M6 9l6 6 6-6"/>
  </svg>
);
const IconPlay = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5.14v14l11-7-11-7z"/>
  </svg>
);
const IconX = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <path d="M18 6L6 18M6 6l12 12"/>
  </svg>
);
const IconFilePdf = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
    <text x="5" y="19" fontSize="6" fontWeight="bold" stroke="none" fill="currentColor">PDF</text>
  </svg>
);
const IconSlides = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
  </svg>
);
const IconPresentation = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.2 }}>
    <rect x="2" y="3" width="20" height="13" rx="2"/><path d="M8 21h8M12 16v5"/>
  </svg>
);

// ─── PDF Thumbnail ─────────────────────────────────────────────────────────────
const PDFThumbnail = ({ url }) => {
  const canvasRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const pdf = await pdfjsLib.getDocument(url).promise;
        const page = await pdf.getPage(1);
        const viewport = page.getViewport({ scale: 0.8 });
        const canvas = canvasRef.current;
        if (!canvas || cancelled) return;
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise;
        if (!cancelled) setLoaded(true);
      } catch (e) { /* silent */ }
    })();
    return () => { cancelled = true; };
  }, [url]);

  return (
    <div style={{
      width: '100%', aspectRatio: '16/9',
      background: '#ece9d8',
      border: '3px solid var(--black)',
      borderRadius: 10,
      overflow: 'hidden',
      position: 'relative',
      marginBottom: 18,
      flexShrink: 0,
    }}>
      {!loaded && (
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{
            width: 28, height: 28, border: '3px solid var(--black)',
            borderTopColor: 'transparent', borderRadius: '50%',
            animation: 'spin 0.7s linear infinite',
          }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      )}
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: loaded ? 1 : 0, transition: 'opacity 0.3s', display: 'block' }} />
    </div>
  );
};

// ─── Download Dropdown ─────────────────────────────────────────────────────────
const DownloadDropdown = ({ url, title }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  const download = (ext) => {
    const a = document.createElement('a');
    a.href = url; a.download = `${title}.${ext}`; a.click();
    setOpen(false);
  };

  const formats = [
    { ext: 'pdf',  Icon: IconFilePdf,  label: 'PDF',  sub: '.pdf' },
    { ext: 'pptx', Icon: IconSlides,   label: 'PPTX', sub: '.pptx' },
    { ext: 'ppt',  Icon: IconSlides,   label: 'PPT',  sub: '.ppt'  },
  ];

  return (
    <div ref={ref} style={{ position: 'relative', flex: 1 }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%',
          background: 'var(--blue)',
          border: '3px solid var(--black)',
          borderRadius: 12,
          padding: '11px 14px',
          cursor: 'pointer',
          boxShadow: '4px 4px 0 var(--black)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8,
          transition: 'transform 0.15s, box-shadow 0.15s',
          color: 'var(--black)',
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translate(-2px,-2px)'; e.currentTarget.style.boxShadow = '6px 6px 0 var(--black)'; }}
        onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '4px 4px 0 var(--black)'; }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 13, fontWeight: 700, fontFamily: 'Syne, sans-serif', textTransform: 'uppercase' }}>
          Download As
        </span>
          <IconDownload size={16} />
        {/* <IconChevronDown size={14} rotate={open} /> */}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scaleY: 0.92 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -6, scaleY: 0.92 }}
            transition={{ duration: 0.13 }}
            style={{
              position: 'absolute', top: 'calc(100% + 8px)', left: 0, right: 0,
              background: 'var(--white)',
              border: '3px solid var(--black)',
              borderRadius: 12, overflow: 'hidden', zIndex: 100,
              boxShadow: '4px 4px 0 var(--black)',
              transformOrigin: 'top center',
            }}
          >
            {formats.map(({ ext, Icon, label, sub }, i) => (
              <button
                key={ext}
                onClick={() => download(ext)}
                style={{
                  width: '100%', background: 'none', border: 'none',
                  borderTop: i > 0 ? '2px solid var(--black)' : 'none',
                  padding: '10px 14px',
                  cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: 10,
                  transition: 'background 0.1s',
                  color: 'var(--black)',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--blue)'}
                onMouseLeave={e => e.currentTarget.style.background = 'none'}
              >
                <Icon size={15} />
                <span style={{ fontSize: 13, fontWeight: 600, fontFamily: 'Outfit, sans-serif' }}>{label}</span>
                <span style={{ fontSize: 11, fontFamily: 'Outfit, sans-serif', opacity: 0.45, marginLeft: 'auto' }}>{sub}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── Slide Card ────────────────────────────────────────────────────────────────
const SlideCard = ({ slide, onPresent }) => (
  <div
    className="reveal"
    style={{
      background: 'var(--white)',
      border: '3px solid var(--black)',
      borderRadius: 20,
      padding: 20,
      boxShadow: '8px 8px 0 var(--black)',
      display: 'flex', flexDirection: 'column',
      transition: 'transform 0.18s, box-shadow 0.18s',
    }}
    onMouseEnter={e => { e.currentTarget.style.transform = 'translate(-3px,-3px)'; e.currentTarget.style.boxShadow = '11px 11px 0 var(--black)'; }}
    onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '8px 8px 0 var(--black)'; }}
  >
    <PDFThumbnail url={slide.url} />

    <h1 className="page-title" style={{ fontSize: 24, fontWeight: 600 }}>{slide.title}</h1>
    <p style={{ fontSize: 14, fontWeight: 500, fontFamily: 'Outfit, sans-serif', color: 'var(--gray)', opacity: 0.6, marginBottom: 20 }}>
      {slide.filename}
    </p>

    <div style={{ display: 'flex', gap: 12, marginTop: 'auto' }}>
      <DownloadDropdown url={slide.url} title={slide.title} />

      <button
        onClick={() => onPresent(slide)}
        style={{
          flex: 1,
          background: 'var(--green)',
          border: '3px solid var(--black)',
          borderRadius: 12,
          padding: '11px 14px',
          cursor: 'pointer',
          boxShadow: '4px 4px 0 var(--black)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          transition: 'transform 0.15s, box-shadow 0.15s',
          color: 'var(--black)',
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translate(-2px,-2px)'; e.currentTarget.style.boxShadow = '6px 6px 0 var(--black)'; }}
        onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '4px 4px 0 var(--black)'; }}
      >
        <IconPlay size={15} />
        <span style={{ fontSize: 13, fontWeight: 700, fontFamily: 'Syne, sans-serif', textTransform: 'uppercase' }}>Present</span>
      </button>
    </div>
  </div>
);

// ─── Fullscreen Presenter ──────────────────────────────────────────────────────
const PDFPresentationViewer = ({ slide, onClose }) => {
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

      {!loading && currentPage > 1 && (
        <div onClick={() => goTo(currentPage - 1)} style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '30%', cursor: 'w-resize', zIndex: 10 }} />
      )}
      {!loading && currentPage < numPages && (
        <div onClick={() => goTo(currentPage + 1)} style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '30%', cursor: 'e-resize', zIndex: 10 }} />
      )}

      {!loading && numPages > 1 && (
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: 'rgba(255,255,255,0.08)', zIndex: 20 }}>
          <motion.div style={{ height: '100%', background: 'var(--green)', originX: 0 }} animate={{ scaleX: currentPage / numPages }} transition={{ duration: 0.25, ease: 'easeOut' }} />
        </div>
      )}

      <motion.div initial={{ opacity: 1 }} animate={{ opacity: 0 }} transition={{ delay: 3, duration: 1.5 }} style={{ pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', bottom: 14, left: 20, color: 'rgba(255,255,255,0.25)', fontSize: 11, fontFamily: 'Outfit, sans-serif', letterSpacing: 1, zIndex: 20 }}>
          {!loading && `${currentPage} / ${numPages}`}
        </div>
        <div style={{ position: 'absolute', bottom: 14, right: 20, color: 'rgba(255,255,255,0.25)', fontSize: 10, fontFamily: 'Outfit, sans-serif', letterSpacing: 2, textTransform: 'uppercase', zIndex: 20 }}>
          ESC · ← →
        </div>
      </motion.div>

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
};

// ─── Page ──────────────────────────────────────────────────────────────────────
const Slides = () => {
  const pageRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(null);
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    const loaded = Object.keys(pdfFiles).map((path) => {
      const filename = path.split('/').pop();
      const nameRaw = filename.replace(/\.pdf$/i, '');
      const title = nameRaw.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
      return { id: nameRaw, title, filename, url: pdfFiles[path] };
    });
    setSlides(loaded);
  }, []);

  useEffect(() => {
    if (!slides.length) return;
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    pageRef.current?.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [slides]);

  return (
    <div ref={pageRef} style={{ background: 'var(--bg)', minHeight: '100vh', paddingBottom: 100 }}>
      <div style={{ position: 'fixed', inset: 0, opacity: 0.03, pointerEvents: 'none', backgroundImage: 'radial-gradient(black 1px, transparent 1px)', backgroundSize: '12px 12px', zIndex: 0 }} />

      <main style={{ padding: '80px 100px', position: 'relative', zIndex: 1 }}>
        <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 70, maxWidth: 700 }}>
          <Tag label="Presentations" color="red" />
          <h1 className="page-title" style={{ fontSize: 32, fontWeight: 700 }}>Slides</h1>
          <p style={{ fontSize: 20, fontWeight: 400, lineHeight: 1.6, fontFamily: 'Outfit, sans-serif', opacity: 0.75 }}>
            A collection of talks, workshops, and presentations. 
          </p>
        </div>

        {slides.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(420px, 1fr))', gap: 24 }}>
            {slides.map((s) => <SlideCard key={s.id} slide={s} onPresent={setActiveSlide} />)}
          </div>
        ) : (
          <div className="reveal" style={{ background: 'var(--white)', border: '3px solid var(--black)', borderRadius: 20, padding: 80, boxShadow: '12px 12px 0 var(--black)', textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}><IconPresentation size={52} /></div>
            <h2 style={{ fontSize: 28, fontWeight: 800, textTransform: 'uppercase', fontFamily: 'Syne, sans-serif', marginBottom: 12 }}>No slides yet</h2>
            <p style={{ fontSize: 16, fontWeight: 500, fontFamily: 'Outfit, sans-serif', opacity: 0.6 }}>
              Add PDF files to <code style={{ background: 'var(--blue)', padding: '2px 8px', borderRadius: 4, border: '2px solid var(--black)' }}>src/slides/slides/</code> to see them here.
            </p>
          </div>
        )}

        <div className="reveal" style={{ marginTop: 100, paddingTop: 40, borderTop: '4px solid var(--black)' }}>
          <Tag label="RESOURCES" color="blue" />
          <p style={{ fontSize: 20, fontWeight: 700, textTransform: 'uppercase', marginTop: 15, fontFamily: 'Syne, sans-serif' }}>
            Technical insights shared with the community.
          </p>
        </div>
      </main>

      <AnimatePresence>
        {activeSlide && <PDFPresentationViewer slide={activeSlide} onClose={() => setActiveSlide(null)} />}
      </AnimatePresence>
    </div>
  );
};

export default Slides;