'use client';

import Button from '@app/components/Button';
import InvoicingCard from '@app/components/InvoicingCard';
import PageHeadings from '@app/components/PageHeadings';
import Wrapper, { SectionWrapper } from '@app/components/Wrapper';
import TemplateOne from '@app/components/templates/TemplateOne';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { toast } from 'sonner';
import { jsPDF } from 'jspdf';

export const dummyData = {
  invoiceNumber: 'INV12345',
  date: '01/05/2023',
  billToName: 'John Doe',
  billToAddress: '123 Main St.',
  items: [
    {
      description: 'Product 1',
      amount: '$100.00',
      quantity: 1,
    },
    {
      description: 'Product 2',
      amount: '$100.00',
      quantity: 1,
      units: 2,
    },
    {
      description: 'Product 3',
      amount: '$225.00',
      quantity: 1,
    },
  ],
  subtotal: '$425.00',
  tax: '$25.50',
  total: '$450.50',
  dueDate: '01/30/2023',
  companyName: 'Your Company Name',
};

export default function Page() {
  const componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    documentTitle: 'Invoice Sample',
    onBeforePrint: () => console.log('before printing...'),
    onAfterPrint: () => toast?.success('Document downloaded successfully!'),
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

    handlePrint(null, () => componentRef.current);
  }

  function exportPDF() {
    const templateOneElement = document.getElementById('template-one');
    console.log('templateOneElement', templateOneElement);

    if (templateOneElement) {
      const doc = new jsPDF();

      // doc.html(templateOneElement, {
      //   callback: function (pdf) {
      //     pdf.save('invoice.pdf');
      //   },
      // });

      doc.html(templateOneElement, {
        // width: 170,
      });
      doc.save('test.pdf');
    }
  }

  return (
    <Wrapper>
      <PageHeadings
        title="Invoice Templates. Personalize Your Brand, Impress Your Clients."
        description="Discover a collection of customizable invoice templates on our platform to elevate your brand identity and create professional invoices effortlessly. Tailor your invoices to reflect your unique style, enhance client interactions, and make a lasting impression. Personalize your billing documents with ease and professionalism."
        slogan="Crafting Elegance, Sealing Deals - Your Invoices, Your Brand!"
      />
      <InvoicingCard />

      <SectionWrapper class="hidden lg:flex">
        <PageHeadings title="Invoice Templates Sample" />
        <TemplateOne
          id="template-one"
          printRef={componentRef}
          invoiceNumber={dummyData.invoiceNumber}
          date={dummyData.date}
          billToName={dummyData.billToName}
          billToAddress={dummyData.billToAddress}
          items={dummyData.items}
          subtotal={dummyData.subtotal}
          tax={dummyData.tax}
          total={dummyData.total}
          dueDate={dummyData.dueDate}
          companyName={dummyData.companyName}
          memo="Thank you for your business! <br/> If you have any questions about this invoice, please contact us at: Your Company Name, 123 Main St., Your City, Your State, 12345, (123) 456-7890"
          footer="<strong>Thank you for your business!</strong> <br/> If you have any questions about this invoice, please contact us at: <br/> <strong>Your Company Name</strong> <br/> 123 Main St. <br/> Your City, Your State, 12345 <br/> (123) 456-7890"
          customFields={{
            0: {
              value: 'Net 30: Main Street',
            },
            1: {
              value: 'Invoice #INV12345',
            },
          }}
          header='<img class="h-8 w-auto"
        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Company Logo" />
        <br/>
        <p class="text-sm text-gray-600">Customize your invoice with your company logo and brand colors.</p>
        '
        />
      </SectionWrapper>

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
            <p>Print Sample PDF</p>
          </section>
        </Button>
        <Button style="secondary" onClick={exportPDF}>
          <section className="flex flex-row gap-2">
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
            <p>Sample PDF</p>
          </section>
        </Button>
      </div>
    </Wrapper>
  );
}
