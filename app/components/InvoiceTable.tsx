import { Switch as SwitchUI } from '@headlessui/react';
import { classNames } from '@helpers/index';
import Switch from './Switch';
import { useState } from 'react';
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
];

export default function InvoiceTable() {
  const [state, setState] = useState<{
    [key: string]: boolean | undefined;
  }>({});
  console.log('STATE', state);

  function setEnabled(key: string, value?: boolean) {
    setState((prev) => ({ ...prev, [key]: value }));
  }

  async function submit(form: any) {
    try {
      // --------------------------------------------------------------------------------
      // 📌  Add Stripe API key to db
      // --------------------------------------------------------------------------------
      setState((prev) => ({ ...prev, fetching: true }));
      const key = form.get('key');
      const name = form.get('name');

      const { data, status } = await cFetch({
        url: '/api/v1/stripe/keys/add-key',
        method: 'POST',
        data: { key, name },
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

  return (
    <section>
      <div className="card max-w-4xl bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Customize your invoice feel & look</h2>
          <form action={submit} className="flex flex-col gap-5">
            {table?.map((item, key) => {
              return (
                <SwitchUI.Group
                  key={key}
                  as="div"
                  className="flex items-center justify-between"
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
                      {state?.[item?.stateKey] && (
                        <input
                          type="text"
                          name={item.stateKey}
                          className="block w-full rounded-md border-0 py-1.5 mt-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          placeholder={item?.title}
                          maxLength={item?.maxLength}
                        />
                      )}
                    </SwitchUI.Description>
                  </span>
                  <Switch
                    enabled={state?.[item?.stateKey]}
                    onChange={(value) => setEnabled(item?.stateKey, value)}
                  />
                </SwitchUI.Group>
              );
            })}
          </form>
          <div className="card-actions justify-end mt-5">
            <Button title="Save" type="submit" />
            <Button title="Cancel" style="secondary" />
          </div>
        </div>
      </div>
    </section>
  );
}
