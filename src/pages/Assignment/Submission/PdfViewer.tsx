import React, { useEffect, useRef } from 'react';
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PdfViewer = ({ url }) => {
  const canvasRef = useRef();

  useEffect(() => {
    const fetchPdf = async () => {
      try {
        const loadingTask = pdfjs.getDocument(url);
        const pdf = await loadingTask.promise;

        // 假设我们只渲染第一页
        const page = await pdf.getPage(1);
        const scale = 1.5;
        const viewport = page.getViewport({ scale: scale });

        const canvas = canvasRef.current;
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
          canvasContext: canvas.getContext('2d'),
          viewport: viewport
        };

        await page.render(renderContext);
      } catch (error) {
        console.error('Error while loading and rendering PDF:', error);
      }
    };

    fetchPdf();
  }, [url]);

  return <canvas ref={canvasRef}></canvas>;
};

export default PdfViewer;
