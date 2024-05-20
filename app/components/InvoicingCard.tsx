import Switch from './Switch';
import { useState } from 'react';
import { cFetch } from '@lib/cFetcher';
import { mutate } from 'swr';
import { toast } from 'sonner';
import Button from './Button';
import Dialog from './Dialog';
import TemplateOne from '@components/templates/TemplateOne';
import { maxLength } from '@config/index';
import { dummyData } from '@app/dashboard/invoices/controller';

const table = {
  header: {
    title: 'Invoice Header',
    description:
      'Invoice header text is the text that appears at the top of the page.',
    stateKey: 'header',
    maxLength: maxLength?.message,
  },
  memo: {
    title: 'Memo',
    description:
      'Memo text is the text that appears above the invoice pricing section.',
    stateKey: 'memo',
    maxLength: maxLength?.message,
  },
  footer: {
    title: 'Footer',
    description:
      'Footer text is the text that appears at the bottom of the invoice.',
    stateKey: 'footer',
    maxLength: maxLength?.message,
  },
  customFields: {
    title: 'Custom Fields',
    description:
      'Custom fields are additional fields you can add to your invoice.',
    stateKey: 'customFields',
    maxLength: maxLength?.customField,
  },
};

type CustomField = {
  value: string;
};

const Section = ({
  children,
  hidden,
}: {
  children: React.ReactNode;
  hidden?: boolean;
}) => {
  if (hidden) return null;

  return <section className="flex flex-col gap-5">{children}</section>;
};

export default function InvoiceTable() {
  const BASE_STATE = {
    header: '',
    memo: '',
    footer: '',
    customFields: [{ value: '' }],
  };
  const [state, setState] = useState<{
    isHeader?: boolean;
    isMemo?: boolean;
    isFooter?: boolean;
    isCustomFields?: boolean;
    fetching?: boolean;
    customFields: CustomField[];
    header?: string;
    memo?: string;
    footer?: string;
    preview?: boolean;
  }>(BASE_STATE);

  const handleChange = (index: number, key: string, value: string) => {
    const updatedFields = [...state.customFields];
    (updatedFields as any)[index][key] = value;
    setState({ ...state, customFields: updatedFields });
  };

  const addCustomField = () => {
    setState({
      ...state,
      customFields: [...state.customFields, { value: '' }],
    });
  };

  function removeCustomField(index: number) {
    setState({
      ...state,
      customFields: state.customFields.filter((_, i) => i !== index),
    });
  }

  async function submit(e: React.FormEvent) {
    try {
      e.preventDefault();
      // --------------------------------------------------------------------------------
      // 📌  Add Stripe API key to db
      // --------------------------------------------------------------------------------
      setState((prev) => ({ ...prev, fetching: true }));

      const { data, status } = await cFetch({
        url: '/api/v1/templates/add',
        method: 'POST',
        data: {
          header: state?.header,
          memo: state?.memo,
          footer: state?.footer,
          customFields: state?.customFields,
        },
      });

      if (status !== 200 || data?.error) {
        throw new Error(data?.error);
      }

      console.log(data, status);
      mutate(`/api/v1/stripe/keys`);
      toast.success('Template created successfully!');
    } catch (err: any) {
      console.error(err.message);
      toast.error(err.message);
    } finally {
      setState((prev) => ({ ...prev, fetching: false }));
    }
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-5">
      <Dialog
        open={state?.preview}
        callBack={() => setState({ ...state, preview: false })}
      >
        <TemplateOne
          header={state?.header}
          memo={state?.memo}
          footer={state?.footer}
          customFields={state?.customFields}
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
        />
      </Dialog>

      <Section>
        <div className="flex flex-row gap-5 justify-between">
          <label>
            {table?.header?.title}
            <span className="text-xs ml-1 text-gray-400">
              {table?.header?.maxLength} characters max
            </span>
          </label>

          <Switch
            enabled={state?.isHeader}
            onChange={() =>
              setState((prev) => ({
                ...prev,
                isHeader: !prev.isHeader,
              }))
            }
          />
        </div>
        <Section>
          <p className="text-xs text-gray-500">{table?.header?.description}</p>
        </Section>
        <Section hidden={!state?.isHeader}>
          <textarea
            placeholder="Add Header Content"
            value={state.header}
            onChange={(e) => setState({ ...state, header: e.target.value })}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            maxLength={table?.header?.maxLength}
          />
        </Section>
      </Section>
      <Section>
        <div className="flex flex-row gap-5 justify-between">
          <label>
            {table?.footer?.title}
            <span className="text-xs ml-1 text-gray-400">
              {table?.footer?.maxLength} characters max
            </span>
          </label>

          <Switch
            enabled={state?.isFooter}
            onChange={() =>
              setState((prev) => ({
                ...prev,
                isFooter: !prev.isFooter,
              }))
            }
          />
        </div>
        <Section>
          <p className="text-xs text-gray-500">{table?.footer?.description}</p>
        </Section>
        <Section hidden={!state?.isFooter}>
          <textarea
            placeholder="Add Footer Content"
            value={state.footer}
            onChange={(e) => setState({ ...state, footer: e.target.value })}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            maxLength={table?.footer?.maxLength}
          />
        </Section>
      </Section>
      <Section>
        <div className="flex flex-row gap-5 justify-between">
          <label>
            {table?.memo?.title}
            <span className="text-xs ml-1 text-gray-400">
              {table?.memo?.maxLength} characters max
            </span>
          </label>

          <Switch
            enabled={state?.isMemo}
            onChange={() =>
              setState((prev) => ({
                ...prev,
                isMemo: !prev.isMemo,
              }))
            }
          />
        </div>
        <Section>
          <p className="text-xs text-gray-500">{table?.memo?.description}</p>
        </Section>
        <Section hidden={!state?.isMemo}>
          <textarea
            placeholder="Add a new Memo"
            value={state.memo}
            onChange={(e) => setState({ ...state, memo: e.target.value })}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            maxLength={table?.memo?.maxLength}
          />
        </Section>
      </Section>

      <Section>
        <div className="flex flex-row gap-5 justify-between">
          <label>
            {table?.customFields?.title}
            <span className="text-xs ml-1 text-gray-400">
              {table?.customFields?.maxLength} characters max
            </span>
          </label>

          <Switch
            enabled={state?.isCustomFields}
            onChange={() =>
              setState((prev) => ({
                ...prev,
                isCustomFields: !prev.isCustomFields,
                customFields: prev.customFields
                  ? [{ name: '', value: '' }]
                  : prev.customFields,
              }))
            }
          />
        </div>
        <Section>
          <p className="text-xs text-gray-500">
            {table?.customFields?.description}
          </p>
        </Section>
        <Section hidden={!state?.isCustomFields}>
          {state?.customFields?.map((field, index) => (
            <div key={index} className="flex flex-row gap-5 items-center">
              <input
                type="text"
                placeholder="Define a custom field value"
                value={field.value}
                onChange={(e) => handleChange(index, 'value', e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                maxLength={table?.customFields?.maxLength}
              />
              <Button
                title="Remove"
                style="ghost"
                hide={state?.customFields?.length === 1}
                onClick={() => removeCustomField(index)}
              />
            </div>
          ))}
          <div className="card-actions justify-start">
            <Button
              title="Add custom field"
              style="ghost"
              onClick={addCustomField}
            />
          </div>
        </Section>
      </Section>

      <div className="card-actions justify-end">
        <Button title="Submit" type="submit" fetching={state?.fetching} />
        <Button
          title="Preview"
          onClick={() => setState({ ...state, preview: true })}
          disabled={state?.fetching}
        />
        <Button
          title="Cancel"
          style="secondary"
          onClick={() => setState(BASE_STATE)}
          disabled={state?.fetching}
        />
      </div>
    </form>
  );
}
