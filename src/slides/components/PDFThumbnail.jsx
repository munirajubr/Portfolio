import React, { useEffect, useRef, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';

pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

export default function PDFThumbnail({ url }) {
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
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{
            width: 28, height: 28,
            border: '3px solid var(--black)',
            borderTopColor: 'transparent',
            borderRadius: '50%',
            animation: 'thumb-spin 0.7s linear infinite',
          }} />
          <style>{`@keyframes thumb-spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      )}
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: loaded ? 1 : 0, transition: 'opacity 0.3s', display: 'block' }}
      />
    </div>
  );
}
