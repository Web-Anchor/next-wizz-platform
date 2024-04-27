'use client';

import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { cFetch } from '@lib/cFetcher';
import { mutate } from 'swr';

type Props = {
  open?: boolean;
  setter?: (value: boolean) => void;
};

export default function AddStripeKeyDialog(props: Props) {
  const [state, setState] = useState<{ fetching?: boolean }>({});

  async function submit(form: any) {
    try {
      // --------------------------------------------------------------------------------
      // 📌  Add Stripe API key to db
      // --------------------------------------------------------------------------------
      setState((prev) => ({ ...prev, fetching: true }));
      const key = form.get('key');
      const name = form.get('name');

      const { data, status } = await cFetch({
        url: '/api/v1/add-key',
        method: 'POST',
        data: { key, name },
      });

      if (status !== 200) {
        throw new Error(data?.message);
      }

      console.log(data, status);
      mutate(`/api/v1/keys`);
    } catch (err) {
      console.error(err);
    } finally {
      props.setter?.(false);
      setState((prev) => ({ ...prev, fetching: false }));
    }
  }

  return (
    <Transition.Root show={props?.open ?? false} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => props.setter?.(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <form action={submit}>
                  <h2 className="text-base font-semibold leading-7 text-gray-900">
                    Connect your Stripe account API key
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    API key will be used to connect your account to Stripe. For
                    more information, visit the{' '}
                    <a
                      href="https://stripe.com/docs/api"
                      target="_blank"
                      rel="noreferrer"
                      className="text-indigo-600 hover:underline"
                    >
                      Stripe API documentation
                    </a>
                    .
                  </p>

                  <div className="my-5 sm:col-span-4">
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Name
                    </label>
                    <div className="mt-2">
                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <input
                          type="text"
                          name="name"
                          autoComplete="off"
                          className="block flex-1 border-0 bg-transparent py-1.5 px-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          placeholder="Enter your API name"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="my-5 sm:col-span-4">
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      API Key
                    </label>
                    <div className="mt-2">
                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <input
                          type="text"
                          name="key"
                          autoComplete="off"
                          className="block flex-1 border-0 bg-transparent py-1.5 px-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          placeholder="Enter your API key"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="py-3 gap-5 sm:flex sm:flex-row-reverse">
                    <button
                      type="submit"
                      className="inline-flex w-fit justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                    >
                      Add New Key
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => props.setter?.(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
