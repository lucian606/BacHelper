import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

export default function Pdf(props) {
    let url = props.url;
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setPageNumber(1);
    }

    function onError(error) {
        console.log(error);
    }

    function changePage(offset) {
        setPageNumber(prevPageNumber => prevPageNumber + offset);
    }

    function previousPage() {
        changePage(-1);
    }

    function nextPage() {
        changePage(1);
    }

    if (!props.url || props.url === "") {
        console.log("No url");
        return <div></div>
    }

    return (
        <div>
            <Document file={url} onLoadSuccess={onDocumentLoadSuccess} onLoadError={onError}>
                <Page size="A4" pageNumber={pageNumber} scale={2} />
            </Document>
            <div className="flex justify-between">
                <button onClick={previousPage} disabled={pageNumber <= 1} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"> Previous </button>
                <button onClick={nextPage} disabled={pageNumber >= numPages} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"> Next </button>
            </div>
        </div>
    )
}