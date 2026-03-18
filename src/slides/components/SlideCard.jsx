import React from 'react';
import PDFThumbnail from './PDFThumbnail';
import DownloadDropdown from './DownloadDropdown';
import { IconPlay } from '../icons';

export default function SlideCard({ slide, onPresent }) {
  return (
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

      <h3 style={{ fontSize: 20, fontWeight: 800, fontFamily: 'Syne, sans-serif', textTransform: 'uppercase', lineHeight: 1.2, marginBottom: 5 }}>
        {slide.title}
      </h3>
      <p style={{ fontSize: 12, fontWeight: 500, fontFamily: 'Outfit, sans-serif', color: 'var(--gray)', opacity: 0.6, marginBottom: 20 }}>
        {slide.filename}
      </p>

      <div style={{ display: 'flex', gap: 12, marginTop: 'auto' }}>
        <DownloadDropdown url={slide.url} title={slide.title} />

        <button
          onClick={() => onPresent(slide)}
          style={{
            flex: 1, background: 'var(--green)',
            border: '3px solid var(--black)', borderRadius: 12,
            padding: '11px 14px', cursor: 'pointer',
            boxShadow: '4px 4px 0 var(--black)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            transition: 'transform 0.15s, box-shadow 0.15s', color: 'var(--black)',
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
}
