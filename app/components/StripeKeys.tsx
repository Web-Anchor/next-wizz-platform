'use client';

import {
  classNames,
  convertToAsterisks,
  getDateDifference,
} from '@helpers/index';
import AddStripeKeyDialog from './AddStripeKeyDialog';
import { useState } from 'react';
import { StripeKey } from '../../types';
import { TableSkeleton } from './Skeleton';
import { TableCellsIcon } from '@heroicons/react/24/outline';
import Button from './Button';

type Props = {
  className?: string;
  fetching?: boolean;
  keys?: StripeKey[];
};

const NoData = () => {
  return (
    <tr>
      <td colSpan={1000}>
        <div className="text-center py-5">
          <div className="bg-indigo-500 text-white mx-auto flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg">
            <TableCellsIcon className="h-8 w-8" aria-hidden="true" />
          </div>
          <h3 className="mt-2 text-sm font-semibold text-gray-900">
            No Stripe API keys added
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by adding a new API key.
          </p>
        </div>
      </td>
    </tr>
  );
};

export default function StripeKeys(props: Props) {
  const [state, setState] = useState<{
    open?: boolean;
    edit?: boolean;
    key?: StripeKey;
  }>({});

  function dialogClose() {
    setState((prev) => ({ ...prev, open: false }));
  }

  const ServeStripeKeys = () => {
    if (!props?.keys?.length) {
      return <NoData />;
    }

    return props?.keys?.map((key: StripeKey, idx: number) => (
      <tr key={idx} className="hover:text-slate-800">
        <td
          className={classNames(
            'hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell'
          )}
        >
          {key.name}
        </td>
        <td
          className={classNames(
            'hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell truncate max-w-28 overflow-hidden'
          )}
        >
          <span className="blur">
            {convertToAsterisks(key.restrictedAPIKey!)}
          </span>
        </td>
        <td
          className={classNames(
            'hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell'
          )}
        >
          {key.name}
        </td>
        <td
          className={classNames(
            'hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell'
          )}
        >
          {getDateDifference(key.createdAt!)}
        </td>
        <td
          className={classNames(
            'hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell'
          )}
        >
          <button
            type="button"
            className="text-indigo-600 px-3 py-1 btn-ghost flex flex-row justify-center gap-2 hover:bg-transparent hover:opacity-80"
          >
            Edit<span className="sr-only">{key.name}</span>
          </button>
        </td>
      </tr>
    ));
  };

  if (props.fetching) {
    return <TableSkeleton />;
  }

  return (
    <div>
      <AddStripeKeyDialog open={state?.open} setter={dialogClose} />
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Connected Stripe API Keys
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Your team is on the{' '}
            <strong className="font-semibold text-gray-900">Startup</strong>{' '}
            key. You can upgrade or downgrade your plan at any time.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <Button
            title="Add a new key"
            onClick={() => setState((prev) => ({ ...prev, open: !prev.open }))}
          />
        </div>
      </div>
      <div className="-mx-4 mt-10 ring-1 ring-gray-300 sm:mx-0 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
              >
                Name
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
              >
                Key
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
              >
                Validation Check
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
              >
                Created At
              </th>
              <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                <span className="sr-only">Select</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <ServeStripeKeys />
          </tbody>
        </table>
      </div>
    </div>
  );
}
