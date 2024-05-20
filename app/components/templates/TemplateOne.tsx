'use client';

import { classNames } from '@helpers/index';
import DOMPurify from 'dompurify';

type CustomField = {
  value: string;
};

type Props = {
  id?: string;
  printRef?: React.MutableRefObject<null>;
  format?: 'a4' | 'a5';
  invoiceNumber?: string | React.ReactNode;
  date?: string | React.ReactNode;
  billToName?: string;
  billToAddress?: string;
  items?: {
    description: string;
    amount: string;
    quantity?: number;
    units?: number;
  }[];
  subtotal?: string | React.ReactNode;
  tax?: string | React.ReactNode;
  total?: string | React.ReactNode;
  dueDate?: string | React.ReactNode;
  companyName?: string | React.ReactNode;
  footer?: string;
  memo?: string;
  header?: string;
  customFields?: CustomField[];
};

const format = {
  a4: {
    width: 595,
    height: 842,
  },
  a5: {
    width: 420,
    height: 595,
  },
};

const Content = ({ content, show }: { content?: string; show?: boolean }) => {
  if (show && content) {
    const sanitizedHtml = DOMPurify?.sanitize(content!);
    return (
      <section
        className="text-justify"
        dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
      />
    );
  }

  return null;
};

const CustomFiled = ({
  content,
  show,
}: {
  content?: string;
  show?: boolean;
}) => {
  return show ? (
    <section>
      <p>{content}</p>
    </section>
  ) : null;
};

export default function TemplateOne(props: Props) {
  const pageFormat = props.format || 'a4';
  const pageWidth = format[pageFormat as keyof typeof format].width;
  const pageHeight = format[pageFormat as keyof typeof format].height;

  return (
    <div
      id={props.id ?? 'template-one'}
      ref={props.printRef}
      className={classNames(
        'flex flex-1 gap-10 flex-col h-full px-8 py-10 bg-white rounded-lg shadow-md'
      )}
    >
      <Content content={props?.header} show={!!props?.header} />
      <div className="flex justify-between">
        <div>
          <h1 className="text-lg font-bold">Invoice</h1>
          <p className="text-gray-500">Invoice Number: {props.invoiceNumber}</p>
          <p className="text-gray-500">Date: {props?.date}</p>
        </div>
        <div>
          <p className="text-gray-500 text-right font-semibold text-xl">
            {props?.companyName}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-semibold">Bill To:</h2>
        <CustomFiled content={props?.billToName} show={!!props?.billToName} />
        <CustomFiled
          content={props?.billToAddress}
          show={!!props?.billToAddress}
        />
        {props?.customFields?.map((field, index) => (
          <CustomFiled key={index} content={field.value} show={!!field.value} />
        ))}
      </div>
      <Content content={props?.memo} show={!!props?.memo} />

      <section
        className={classNames(
          `flex-1 min-h-[595px] min-w-[600px] pdf-printable-content`
        )}
      >
        <table className="w-full mb-6">
          <thead className="border-b border-gray-300">
            <tr>
              <th className="py-3 text-left pl-5">Description</th>
              <th className="py-3 text-right w-20">Qty</th>
              <th className="py-3 text-right w-20">Units</th>
              <th className="text-right w-36 pr-5">Amount</th>
            </tr>
          </thead>
          <tbody>
            {props?.items?.map((item, index) => (
              <tr key={index}>
                <td
                  className={classNames(
                    'text-right py-2 text-sm text-gray-800'
                  )}
                >
                  {item.description}
                </td>
                <td
                  className={classNames(
                    'text-right py-2 text-sm text-gray-800'
                  )}
                >
                  {item.quantity}
                </td>
                <td
                  className={classNames(
                    'text-right py-2 text-sm text-gray-800'
                  )}
                >
                  {item.units}
                </td>
                <td className="text-sm font-semibold text-right pr-5">
                  {item.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="flex flex-col gap-10 border-t pt-4">
        <div className="flex justify-between">
          <div>
            {props?.dueDate && (
              <p className="text-sm text-gray-500">
                Payment Due By: {props?.dueDate}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2 font-semibold text-gray-800 text-right">
            <p className="text-gray-500">Subtotal: {props?.subtotal}</p>
            {props?.tax && <p className="text-gray-500">Tax: {props?.tax}</p>}
            <h2>Total: {props?.total}</h2>
          </div>
        </div>
        <Content content={props?.footer} show={!!props?.footer} />
      </section>
    </div>
  );
}
