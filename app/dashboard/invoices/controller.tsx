'use client';

import Button from '@app/components/Button';
import InvoicingCard from '@app/components/InvoicingCard';
import PageHeadings from '@app/components/PageHeadings';
import Wrapper from '@app/components/Wrapper';
import TemplateOne from '@app/components/templates/TemplateOne';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

export default function Page() {
  const contentToPrint = useRef(null);

  const handlePrint = useReactToPrint({
    documentTitle: 'Print This Document',
    onBeforePrint: () => console.log('before printing...'),
    onAfterPrint: () => console.log('after printing...'),
    removeAfterPrint: true,
  });

  function printPDF() {
    // Set page size for print
    document.body.appendChild(document.createElement('style')).textContent = `
      @media print {
        @page {
          size: 210mm 297mm;
        }
      }
    `;

    handlePrint(null, () => contentToPrint.current);
  }

  function downloadPDF() {
    console.log('Download PDF');

    // const pdf = new jsPDF();
    // pdf.html(contentToPrint.current, {
    //   callback: function (pdf: any) {
    //     pdf.save('invoice.pdf');
    //   },
    // });
  }

  return (
    <Wrapper>
      <PageHeadings
        title="Invoice Templates. Personalize Your Brand, Impress Your Clients."
        description="Discover a collection of customizable invoice templates on our platform to elevate your brand identity and create professional invoices effortlessly. Tailor your invoices to reflect your unique style, enhance client interactions, and make a lasting impression. Personalize your billing documents with ease and professionalism."
        slogan="Crafting Elegance, Sealing Deals - Your Invoices, Your Brand!"
      />
      <InvoicingCard />
      <TemplateOne printRef={contentToPrint} />

      <div className="flex flex-row gap-5 self-end">
        <Button onClick={printPDF}>
          <section className="flex flex-row gap-2">
            <svg
              className="flex-shrink-0 size-4 self-center"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 6 2 18 2 18 9" />
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
              <rect width="12" height="8" x="6" y="14" />
            </svg>
            <p>Print Sample</p>
          </section>
        </Button>
        <a
          className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-lg border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm"
          href="#"
        >
          <svg
            className="flex-shrink-0 size-4"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" x2="12" y1="15" y2="3" />
          </svg>
          Invoice PDF
        </a>
      </div>
    </Wrapper>
  );
}
