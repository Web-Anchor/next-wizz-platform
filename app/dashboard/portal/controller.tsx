'use client';

import Button from '@app/components/Button';
import InvoicingCard from '@app/components/InvoicingCard';
import PageHeadings from '@app/components/PageHeadings';
import Wrapper, { SectionWrapper } from '@app/components/Wrapper';
import TemplateOne from '@app/components/templates/TemplateOne';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { toast } from 'sonner';
import html2pdf from 'html2pdf.js';
import { useSubscription } from '@hooks/useSubscriptions';
import Tiers from '@app/components/Tiers';

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
  const { advanced, pro, subscription } = useSubscription({});
  const isAdvancedPlus = advanced || pro;
  console.log('Subs ', subscription);

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

  async function exportPDF() {
    try {
      await exportToPDF({
        name: 'invoice-sample',
        id: 'template-one',
      });

      toast?.success('Document downloaded successfully!');
    } catch (error) {
      toast?.error('An error occurred while downloading the document.');
    }
  }

  return (
    <Wrapper>
      <PageHeadings
        title="Invoice Templates. Personalize Your Brand, Impress Your Clients."
        description="Discover a collection of customizable invoice templates on our platform to elevate your brand identity and create professional invoices effortlessly. Tailor your invoices to reflect your unique style, enhance client interactions, and make a lasting impression. Personalize your billing documents with ease and professionalism."
        slogan="Crafting Elegance, Sealing Deals - Your Invoices, Your Brand!"
      />
      {isAdvancedPlus && <InvoicingCard />}
      {!isAdvancedPlus && (
        <SectionWrapper>
          <PageHeadings title="Upgrade to access advanced features and unlock premium invoice templates." />
          <Tiers />
        </SectionWrapper>
      )}
      <PageHeadings title="Invoice Templates Sample" class="hidden lg:flex" />

      <SectionWrapper class="flex-row gap-5 self-end">
        <Button onClick={printPDF} class="hidden lg:flex">
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
      </SectionWrapper>
    </Wrapper>
  );
}

export async function exportToPDF({
  name,
  format = 'a4',
  type = 'jpeg',
  id,
  margin = 0,
}: {
  name: string;
  format?:
    | 'a4'
    | 'a3'
    | 'a5'
    | 'letter'
    | 'legal'
    | 'tabloid'
    | 'ledger'
    | 'custom';
  id: string;
  type?: string;
  margin?: number;
}) {
  try {
    const component = document?.getElementById(id);

    if (component) {
      // const hasHiddenClass = component.classList.contains('hidden');
      // hasHiddenClass && component.classList.remove('hidden');

      const templateHeight = component.clientHeight!;
      const templateWidth = component.clientWidth!;
      const templateRatio = templateWidth / templateHeight;

      const FACTOR = 1;
      const a4Height = 842 * FACTOR;
      const a4Width = 595 * FACTOR;
      const ratio = a4Width / a4Height;

      if (templateRatio > ratio) {
        const ADJUSTER = Number((ratio * 100).toFixed()); // 70; // Adjust height based on ratio
        const minAdjHeight = templateWidth / ratio + ADJUSTER;

        component.setAttribute('style', `min-height: ${minAdjHeight}px`);
      }

      const opt = {
        margin,
        filename: `${name}.pdf`,
        image: { type, quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format, orientation: 'portrait' },
      };

      // New Promise-based usage:
      html2pdf()
        .set(opt)
        .from(component)
        .save()
        .then(() => {
          // hasHiddenClass && component?.classList.add('hidden'); // add class hidden
        });
    }
  } catch (error) {
    console.error(error);
  }
}