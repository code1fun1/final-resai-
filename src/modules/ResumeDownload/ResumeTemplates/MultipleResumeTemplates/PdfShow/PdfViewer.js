import React, { useEffect, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import 'pdfjs-dist/web/pdf_viewer.css';
//import EditIcon from '~/shared/components/EditIcon';
import PulseEditButton from '~/shared/components/PulseEditButton';
// Set the worker source to the local .mjs file
pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';

const PDFPreview = ({ pdfUrl }) => {
  const [pages, setPages] = useState([]);
  // const pageRefs = useRef([]); // Use a ref array to store canvas references

  // Load PDF Document
  useEffect(() => {
    const loadingTask = pdfjsLib.getDocument(pdfUrl);

    loadingTask.promise
      .then((pdf) => {
        renderAllPages(pdf); // Render all pages once the PDF is loaded
      })
      .catch((error) => {
        console.error('Error loading PDF:', error);
      });
  }, [pdfUrl]);

  const renderAllPages = async (pdf) => {
    const renderedPages = [];
    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
      const canvas = await renderPage(pdf, pageNumber); // Render each page
      renderedPages.push(canvas);
    }
    setPages(renderedPages); // Update state with all rendered pages
  };

  const renderPage = (pdf, pageNum) => {
    return new Promise((resolve, reject) => {
      pdf
        .getPage(pageNum)
        .then((page) => {
          // 🔹 INTERNAL RENDER SCALE (quality)
          const renderScale = 2;
          const viewport = page.getViewport({ scale: renderScale });

          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');

          // ✅ REQUIRED: internal pixel size
          canvas.width = viewport.width;
          canvas.height = viewport.height;

          // ✅ REQUIRED: visual size (YOUR CONTROL)
          canvas.style.width = '100%'; // custom width
          canvas.style.height = '100%'; // custom height (CHANGE HERE)
          canvas.style.display = 'block';

          const renderContext = {
            canvasContext: context,
            viewport
          };

          page
            .render(renderContext)
            .promise.then(() => resolve(canvas))
            .catch(reject);
        })
        .catch(reject);
    });
  };

  return (
    <div style={{ textAlign: 'center' }}>
      {/* Render the pages vertically */}
      <div
        style={{
          width: '100%',
          // maxWidth: "800px",
          // margin: "auto",
          overflowY: 'auto', // Enable vertical scrolling
          height: '119vh' // Set a max height for the scrollable area
          // border: "1px solid #ddd",
          // padding: "10px",
        }}
      >
        {pages.length > 0 ? (
          pages.map((canvas, index) => (
            <div
              key={index}
              style={{
                marginBottom: '20px',
                padding: '20px',
                boxSizing: 'border-box',
                background: '#f5f5f5'
              }}
            >
              {/* Dynamically append the canvas */}
              <div ref={(el) => el?.appendChild(canvas)} />
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
        <PulseEditButton />
      </div>
    </div>
  );
};

export default PDFPreview;
