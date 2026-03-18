import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { IconDownload, IconChevronDown, IconFilePdf, IconSlides } from '../icons';

const formats = [
  { ext: 'pdf',  Icon: IconFilePdf, label: 'PDF',  sub: '.pdf'  },
  { ext: 'pptx', Icon: IconSlides,  label: 'PPTX', sub: '.pptx' },
  { ext: 'ppt',  Icon: IconSlides,  label: 'PPT',  sub: '.ppt'  },
];

export default function DownloadDropdown({ url, title }) {
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

  return (
    <div ref={ref} style={{ position: 'relative', flex: 1 }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', background: 'var(--blue)',
          border: '3px solid var(--black)', borderRadius: 12,
          padding: '11px 14px', cursor: 'pointer',
          boxShadow: '4px 4px 0 var(--black)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8,
          transition: 'transform 0.15s, box-shadow 0.15s', color: 'var(--black)',
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translate(-2px,-2px)'; e.currentTarget.style.boxShadow = '6px 6px 0 var(--black)'; }}
        onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '4px 4px 0 var(--black)'; }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 13, fontWeight: 700, fontFamily: 'Syne, sans-serif', textTransform: 'uppercase' }}>
          <IconDownload size={15} /> Download As
        </span>
        <IconChevronDown size={14} rotate={open} />
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
              background: 'var(--white)', border: '3px solid var(--black)',
              borderRadius: 12, overflow: 'hidden', zIndex: 100,
              boxShadow: '4px 4px 0 var(--black)', transformOrigin: 'top center',
            }}
          >
            {formats.map(({ ext, Icon, label, sub }, i) => (
              <button
                key={ext}
                onClick={() => download(ext)}
                style={{
                  width: '100%', background: 'none', border: 'none',
                  borderTop: i > 0 ? '2px solid var(--black)' : 'none',
                  padding: '10px 14px', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: 10,
                  transition: 'background 0.1s', color: 'var(--black)',
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
}
