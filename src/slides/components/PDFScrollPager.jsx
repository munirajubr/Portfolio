import React, { useEffect, useState, useRef } from 'react';
import * as pdfjsLib from 'pdfjs-dist';

pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

const PDFPage = ({ pdf, pageNo, scale = 1.5 }) => {
  const canvasRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let renderTask = null;
    (async () => {
      try {
        const page = await pdf.getPage(pageNo);
        const canvas = canvasRef.current;
        if (!canvas) return;

        const viewport = page.getViewport({ scale });
        const context = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;

        canvas.height = viewport.height * dpr;
        canvas.width = viewport.width * dpr;
        canvas.style.width = `${viewport.width}px`;
        canvas.style.height = `${viewport.height}px`;

        context.scale(dpr, dpr);

        renderTask = page.render({
          canvasContext: context,
          viewport: viewport
        });

        await renderTask.promise;
        setLoading(false);
      } catch (err) {
        if (err.name !== 'RenderingCancelledException') {
          console.error(err);
        }
      }
    })();

    return () => {
      if (renderTask) renderTask.cancel();
    };
  }, [pdf, pageNo, scale]);

  return (
    <div style={{ 
      marginBottom: 30, 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center',
      background: '#fff',
      border: '3px solid #000',
      borderRadius: 12,
      boxShadow: '10px 10px 0 #000',
      overflow: 'hidden',
      position: 'relative',
      minHeight: 200
    }}>
      {loading && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Syne, sans-serif', fontWeight: 700, opacity: 0.3 }}>
          LOADING PAGE {pageNo}...
        </div>
      )}
      <canvas ref={canvasRef} />
      <div style={{ 
        padding: '10px 20px', 
        borderTop: '3px solid #000', 
        width: '100%', 
        textAlign: 'right', 
        fontSize: 12, 
        fontWeight: 800, 
        fontFamily: 'Syne, sans-serif',
        background: '#f0f0f0'
      }}>
        PAGE {pageNo}
      </div>
    </div>
  );
};

export default function PDFScrollPager({ url }) {
  const [pdf, setPdf] = useState(null);
  const [numPages, setNumPages] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const loadingTask = pdfjsLib.getDocument(url);
        const pdfDoc = await loadingTask.promise;
        setPdf(pdfDoc);
        setNumPages(pdfDoc.numPages);
        setLoading(false);
      } catch (err) {
        console.error("Error loading PDF:", err);
        setLoading(false);
      }
    })();
  }, [url]);

  if (loading) return (
    <div style={{ textAlign: 'center', padding: 50, fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 24 }}>
      INITIALIZING PDF ENGINE...
    </div>
  );

  if (!pdf) return (
    <div style={{ textAlign: 'center', padding: 50, color: 'red', fontFamily: 'Syne, sans-serif', fontWeight: 800 }}>
      FAILED TO LOAD CASE STUDY PDF.
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: '100%', maxWidth: 1000, margin: '0 auto' }}>
      {Array.from({ length: numPages }, (_, i) => (
        <PDFPage key={i + 1} pdf={pdf} pageNo={i + 1} />
      ))}
    </div>
  );
}
