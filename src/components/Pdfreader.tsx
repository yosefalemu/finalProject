"use client";
import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Set workerSrc to the version you've installed
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface PdfViewerProps {
  fileUrl: string;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ fileUrl }) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };
  const handlePreviousPage = () => {
    setPageNumber((prevPageNumber) => Math.max(1, prevPageNumber - 1));
  };

  const handleNextPage = () => {
    setPageNumber((prevPageNumber) => Math.min(numPages!, prevPageNumber + 1));
  };

  return (
    <div className="flex flex-col h-[700px] w-fit mx-auto border border-gray-200">
      <div className="flex-grow overflow-auto w-full">
        <Document file={fileUrl} onLoadSuccess={onDocumentLoadSuccess}>
          <Page
            pageNumber={pageNumber}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        </Document>
      </div>
      <div className="p-2 bg-gray-200 flex justify-between items-center">
        <span>
          Page {pageNumber} of {numPages}
        </span>
        <div className="flex items-center gap-x-4">
          <Button
            onClick={() => setPageNumber(Math.max(1, pageNumber - 1))}
            disabled={pageNumber <= 1}
            className="rounded-none"
          >
            <ChevronLeft />
          </Button>
          <Button
            onClick={() =>
              setPageNumber(Math.min(numPages || pageNumber, pageNumber + 1))
            }
            disabled={pageNumber >= numPages!}
            className="rounded-none"
          >
            <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PdfViewer;
