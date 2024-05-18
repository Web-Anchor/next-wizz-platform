import { Switch as SwitchUI } from '@headlessui/react';
import Switch from './Switch';
import { memo, useState } from 'react';
import { cFetch } from '@lib/cFetcher';
import { mutate } from 'swr';
import { toast } from 'sonner';
import Button from './Button';

const table = [
  {
    title: 'Invoice Header',
    description:
      'Invoice header text is the text that appears at the top of the page.',
    stateKey: 'header',
    maxLength: 100,
  },
  {
    title: 'Memo',
    description:
      'Memo text is the text that appears above the invoice pricing section.',
    stateKey: 'memo',
    maxLength: 100,
  },
  {
    title: 'Footer',
    description:
      'Footer text is the text that appears at the bottom of the invoice.',
    stateKey: 'footer',
    maxLength: 200,
  },
  {
    title: 'Custom Fields',
    description:
      'Custom fields are additional fields you can add to your invoice.',
    stateKey: 'customFields',
    maxLength: 20,
  },
];

type CustomField = {
  name: string;
  value: string;
};
type Form = {
  [key: string]: string;
};

export default function InvoiceTable() {
  const [state, setState] = useState<{
    [key: string]: boolean | CustomField[] | undefined;
  }>({
    fields: [{ name: '', value: '' }],
  });

  function setEnabled(key: string, value?: boolean) {
    setState((prev) => ({ ...prev, [key]: value }));
  }

  async function submit(form: any) {
    try {
      // --------------------------------------------------------------------------------
      // 📌  Add Stripe API key to db
      // --------------------------------------------------------------------------------
      setState((prev) => ({ ...prev, fetching: true }));
      const header = form.get('header');
      const footer = form.get('footer');
      const memo = form.get('memo');
      const customFields = Array.from(form.entries()).filter(([key]: any) =>
        key.includes('custom-field')
      ) as [string, string][];

      return console.log(form.entries(), header, footer, customFields);

      const { data, status } = await cFetch({
        url: '/api/v1/stripe/keys/add-key',
        method: 'POST',
        data: { header },
      });

      if (status !== 200 || data?.error) {
        throw new Error(data?.error);
      }

      console.log(data, status);
      mutate(`/api/v1/stripe/keys`);
      toast.success('API key added successfully');
    } catch (err: any) {
      console.error(err.message);
      toast.error(err.message);
    } finally {
      setState((prev) => ({ ...prev, fetching: false }));
    }
  }

  const CustomFields = memo(function CustomFields() {
    const [cState, cSetState] = useState<{
      [key: string]: boolean | CustomField[] | undefined;
    }>({
      fields: [{ name: '', value: '' }],
    });
    const config = table.filter(
      (config) => config.stateKey === 'customFields'
    )[0];
    console.log('cState', cState);

    function addCustomField() {
      cSetState((prev) => ({
        ...prev,
        fields: [...(prev?.fields as CustomField[]), { name: '', value: '' }],
      }));
    }

    function removeCustomField(index: number) {
      console.log('removeCustomField', index);

      cSetState((prev) => ({
        ...prev,
        fields: (prev?.fields as CustomField[])?.filter((_, i) => i !== index),
      }));
    }

    function updateCustomField(index: number, key: string, value: string) {
      cSetState((prev) => ({
        ...prev,
        fields: (prev?.fields as CustomField[])?.map((field, i) =>
          i === index ? { ...field, [key]: value } : field
        ),
      }));
    }

    return (
      <div className="flex flex-col gap-5 mt-5">
        {(cState?.fields as CustomField[])?.map((row, key) => (
          <div key={key} className="flex flex-row gap-5 items-center">
            <Button
              title="Remove"
              style="ghost"
              onClick={() => removeCustomField(key)}
            />
            <input
              type="text"
              name={`custom-field-name-${key}`}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Field name (e.g. PO Number)"
              maxLength={config?.maxLength!}
              // value={(state?.fields?.[key]?.name as string) ?? ''}
              // onChange={(e) => updateCustomField(key, 'name', e.target.value)}
            />
            <input
              type="text"
              name={`custom-field-value-${key}`}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Field value"
              maxLength={config?.maxLength!}
              // value={(state?.fields?.[key]?.value as string) ?? ''}
              // onChange={(e) => updateCustomField(key, 'value', e.target.value)}
            />
          </div>
        ))}
        <Button title="Add" style="ghost" onClick={addCustomField} />
      </div>
    );
  });

  return (
    <section>
      <div className="card max-w-4xl bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Customize your invoice feel & look</h2>
          <form action={submit} className="flex flex-col gap-5">
            {table?.map((item, key) => {
              const isCustomFields = item?.stateKey === 'customFields';

              return (
                <SwitchUI.Group
                  key={key}
                  as="div"
                  className="flex justify-between"
                >
                  <span className="flex flex-grow flex-col pr-14">
                    <SwitchUI.Label
                      as="span"
                      className="text-sm font-medium leading-6 text-gray-900"
                      passive
                    >
                      {item.title}{' '}
                      <span className="text-xs text-gray-400">
                        {item.maxLength} characters max
                      </span>
                    </SwitchUI.Label>
                    <SwitchUI.Description
                      as="span"
                      className="text-xs text-gray-500"
                    >
                      {!state?.[item?.stateKey] && <p>{item.description}</p>}
                      {state?.[item?.stateKey] && !isCustomFields && (
                        <input
                          type="text"
                          name={item.stateKey}
                          className="block w-full rounded-md border-0 py-1.5 mt-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          placeholder={item?.title}
                          maxLength={item?.maxLength}
                        />
                      )}
                      {state?.[item?.stateKey] && isCustomFields && (
                        <CustomFields />
                      )}
                    </SwitchUI.Description>
                  </span>
                  <Switch
                    enabled={state?.[item?.stateKey] as boolean}
                    onChange={(value) => setEnabled(item?.stateKey, value)}
                  />
                </SwitchUI.Group>
              );
            })}
            <div className="card-actions justify-end">
              <Button title="Save" type="submit" />
              <Button title="Cancel" style="secondary" />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
