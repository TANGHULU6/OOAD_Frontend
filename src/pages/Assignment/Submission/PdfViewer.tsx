import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PdfViewer = ({ url }) => {
  const [numPages, setNumPages] = useState(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
      <Document
          file={url}
          onLoadSuccess={onDocumentLoadSuccess}
      >
        {Array.from(
            new Array(numPages),
            (el, index) => (
                <Page key={`page_${index + 1}`} pageNumber={index + 1} />
            ),
        )}
      </Document>
  );
};

export default PdfViewer;
