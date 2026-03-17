import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const pdfContext = import.meta.glob('./slides/*.pdf', { eager: true, as: 'url' });

export const getSlidesFromFiles = () => {
  return Object.keys(pdfContext).map((path) => {
    const fileName = path.split('/').pop().replace('.pdf', '');
    const title = fileName.replace(/-/g, ' ');
    return {
      id: fileName,
      title: title.charAt(0).toUpperCase() + title.slice(1),
      description: `Presentation from ${fileName}.pdf`,
      pdfUrl: pdfContext[path],
      type: 'pdf'
    };
  });
};
