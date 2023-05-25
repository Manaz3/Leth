/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable react/jsx-no-bind */
import React, { memo, useState } from "react";
import { Document, pdfjs, Page } from "react-pdf";
// import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "./MenuList.css";
import { useNavigate } from "react-router-dom";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function MenuList(): JSX.Element {
  const [numPages, setNumPages] = useState(5);
  const [pageNumber, setPageNumber] = useState(1);
  const navigate = useNavigate();

  function onDocumentLoadSuccess(): void {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offSet: any): void {
    setPageNumber((prevPageNumber) => prevPageNumber + offSet);
  }

  function changePageBack(): void {
    changePage(-1);
  }

  function changePageNext(): void {
    changePage(+1);
  }
  function closeMenu(): void {
    navigate(-1)
  }

  return (
    <div className="menu-container">
      <Document file="/menu.pdf" onLoadSuccess={onDocumentLoadSuccess}>
        <Page className="menu-list-item" pageNumber={pageNumber} />
      </Document>
      <div className="menu-pages">
        Page {pageNumber} of {numPages}
      </div>
      <button type="button" className="menu-button" onClick={closeMenu}>
        Закрыть меню
      </button>
      {pageNumber > 1 && (
        <button type="button" onClick={changePageBack} className="menu-button">
          Предыдущая страница
        </button>
      )}
      {pageNumber < numPages && (
        <button type="button" className="menu-button" onClick={changePageNext}>
          Следующая страница
        </button>
      )}
    </div>
  );
}
export default memo(MenuList);
