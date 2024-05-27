// --------------------------------------------------------------------------------
// custom-html2pdf.d.ts
// 📌  Custom types for html2pdf
// --------------------------------------------------------------------------------

declare module 'html2pdf.js' {
  const self = typeof window !== 'undefined' ? window : global;
  interface Html2PdfFunction {
    (element: HTMLElement, options?: Html2PdfOptions): Promise<void>;
  }

  interface Html2PdfOptions {
    filename?: string;
    html2canvas?: any; // You may need to specify the correct type for html2canvas
    // Add more options as needed
    margin?: number | array;
    image?: object;
    jsPDF?: object;
    pagebreak?: object;
    after?: string | array;
    enableLinks?: boolean;
  }

  const html2pdf: Html2PdfFunction;

  export default html2pdf;
}
