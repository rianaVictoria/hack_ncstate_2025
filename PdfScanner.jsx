import React, { useState } from "react";
import { PDFDocument } from "pdf-lib";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PdfScanner = () => {
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({});

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setFile(file);
      extractPdfFormData(file);
    }
  };

  const extractPdfFormData = async (file) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);

    reader.onload = async () => {
      const pdfBytes = new Uint8Array(reader.result);
      const pdfDoc = await PDFDocument.load(pdfBytes);

      const form = pdfDoc.getForm();
      const fields = form.getFields();
      const extractedData = {};

      fields.forEach((field) => {
        const name = field.getName();
        const value = field.getText();
        extractedData[name] = value;
      });

      setFormData(extractedData);
    };
  };

  return (
    <div className="p-4">
      <input type="file" accept="application/pdf" onChange={handleFileChange} className="mb-4" />
      {file && (
        <div>
          <h3 className="text-lg font-semibold mb-2">PDF Preview:</h3>
          <Document file={file}>
            <Page pageNumber={1} width={400} />
          </Document>
        </div>
      )}
      {Object.keys(formData).length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Extracted Data:</h3>
          <pre className="bg-gray-100 p-2 rounded">{JSON.stringify(formData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default PdfScanner;
