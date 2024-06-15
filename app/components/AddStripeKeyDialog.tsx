'use client';

import { Fragment, useRef } from 'react';
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
} from '@headlessui/react';
import { cFetch } from '@lib/cFetcher';
import { mutate } from 'swr';
import Button from './Button';
import { toast } from 'sonner';

type Props = {
  open?: boolean;
  fetching?: string;
  setter?: (value: any) => void;
};

export default function AddStripeKeyDialog(props: Props) {
  const formRef = useRef<HTMLFormElement>(null);

  async function submit() {
    try {
      // --------------------------------------------------------------------------------
      // 📌  Add Stripe API key to db
      // --------------------------------------------------------------------------------
      props?.setter?.({ fetching: 'add-key' });
      // use ref to get value from form
      const form = new FormData(formRef.current!);
      const key = form.get('key');
      const name = form.get('name');

      const { data, status, error } = await cFetch({
        url: '/api/v1/stripe/keys/add-key',
        method: 'POST',
        data: { key, name },
      });
      console.log('🔑 Key: ', error?.response?.data?.error);

      if (status !== 200 || data?.error) {
        throw new Error(error?.response?.data?.error ?? data?.error);
      }

      mutate(`/api/v1/stripe/keys`);
      toast.success('API key added successfully');
    } catch (err: any) {
      console.error(err.message);
      toast.error(err.message);
    } finally {
      props.setter?.({ fetching: undefined, open: false });
    }
  }

  return (
    <Transition.Root show={props?.open ?? false} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={() => props.setter?.(false)}
      >
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <form action={submit} ref={formRef}>
                  <h2 className="text-base font-semibold leading-7 text-gray-800">
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
                      className="block text-sm font-medium leading-6 text-gray-800"
                    >
                      Name
                    </label>
                    <div className="mt-2">
                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <input
                          type="text"
                          name="name"
                          autoComplete="off"
                          className="block flex-1 border-0 bg-transparent py-1.5 px-2 text-gray-800 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          placeholder="Enter your API name"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="my-5 sm:col-span-4">
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium leading-6 text-gray-800"
                    >
                      API Key
                    </label>
                    <div className="mt-2">
                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <input
                          type="text"
                          name="key"
                          autoComplete="off"
                          className="block flex-1 border-0 bg-transparent py-1.5 px-2 text-gray-800 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          placeholder="Enter your API key"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="py-3 gap-5 flex sm:flex-row-reverse">
                    <Button
                      title="Add New Key"
                      onClick={submit}
                      fetching={props?.fetching === 'add-key'}
                    />
                    <Button
                      title="Cancel"
                      style="secondary"
                      onClick={() => props.setter?.({ open: false })}
                    />
                  </div>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
