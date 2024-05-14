"use client";
import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

// Set workerSrc to the version you've installed
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface PdfViewerProps {
  fileUrl: string;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ fileUrl }) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setLoading(false);
  };

  const onDocumentLoadError = () => {
    setLoading(false); // Ensure loading is turned off if there's an error loading the document
    console.error("Failed to load the PDF document.");
  };
  const handlePreviousPage = () => {
    setPageNumber((prevPageNumber) => Math.max(1, prevPageNumber - 1));
  };

  const handleNextPage = () => {
    setPageNumber((prevPageNumber) => Math.min(numPages!, prevPageNumber + 1));
  };

  return (
    <div className="flex flex-col h-[700px] mx-auto border border-gray-200">
      <div className="flex-grow overflow-auto w-full h-full">
        <Document
          file={fileUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={onDocumentLoadError}
          loading={() => (
            <div className="w-full aspect-video flex items-center justify-center">
              <Loader2 className="text-customColor" size={100} />
            </div>
          )}
        >
          <Page
            pageNumber={pageNumber}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        </Document>
      </div>
      <div className="p-2 bg-gray-200 flex flex-col justify-between items-center">
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
