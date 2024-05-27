// --------------------------------------------------------------------------------
// custom-html2pdf.d.ts
// 📌  Custom types for html2pdf
// --------------------------------------------------------------------------------

declare module 'html2pdf.js' {
  interface Html2PdfInstance {
    set(options: Html2PdfOptions): this;
    from(component: HTMLElement): this;
    save(): this;
    then(callback: () => void): void;
  }
  interface Html2PdfFunction {
    (): Html2PdfInstance;
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
    onAfterDownload?: Function;
  }

  const html2pdf: Html2PdfFunction;

  export default html2pdf;
}
