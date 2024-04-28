'use client';

import {
  classNames,
  convertToAsterisks,
  getDateDifference,
} from '@helpers/index';
import AddStripeKeyDialog from './AddStripeKeyDialog';
import { useState } from 'react';
import { StripeKey } from '../../types';
import { RowSkeleton, TableSkeleton } from './Skeleton';
import { TableCellsIcon } from '@heroicons/react/24/outline';
import Button from './Button';
import { useKeyValidate } from '@hooks/index';

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

const ServeDataRow = ({ stripeKey }: { stripeKey: StripeKey }) => {
  const [state, setState] = useState<{ edit?: boolean }>({});
  const { data, error, isLoading } = useKeyValidate({
    key: stripeKey.restrictedAPIKey,
  });
  console.log('🔑 data', error, data);

  return (
    <tr className="hover:text-slate-800">
      <td className={classNames('px-3 py-3.5 text-sm text-gray-500')}>
        {stripeKey.name}
      </td>
      <td
        className={classNames(
          'blur hidden lg:table-cell px-3 py-3.5 text-sm text-gray-500 truncate max-w-28 overflow-hidden'
        )}
      >
        {convertToAsterisks(stripeKey.restrictedAPIKey!)}
      </td>
      <td className={classNames('px-3 py-3.5 text-sm text-gray-500')}>
        {isLoading && <RowSkeleton />}
        {!isLoading && (
          <div
            className={classNames(
              'flex items-center justify-end gap-x-2 sm:justify-start',
              error ? 'text-rose-400' : 'text-green-400'
            )}
          >
            <div
              className={classNames(
                'flex-none rounded-full p-1 shadow-md bg-opacity-25',
                error ? 'bg-rose-400' : 'bg-green-400'
              )}
            >
              <div className="h-1.5 w-1.5 rounded-full bg-current" />
            </div>
            <div className="font-semibold">{error ? 'Error' : 'Valid'}</div>
          </div>
        )}
      </td>
      <td className={classNames('px-3 py-3.5 text-sm text-gray-500')}>
        {getDateDifference(stripeKey.createdAt!)}
      </td>
      <td className={classNames('px-3 py-3.5 text-sm text-gray-500')}>
        <button
          type="button"
          className="text-indigo-600 px-3 py-1 btn-ghost flex flex-row justify-center gap-2 hover:bg-transparent hover:opacity-80"
        >
          Edit<span className="sr-only">{stripeKey.name}</span>
        </button>
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

  if (props.fetching) {
    return <TableSkeleton />;
  }

  return (
    <>
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
      <div className="mt-10">
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
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Key
              </th>
              <th
                scope="col"
                className="hidden lg:table-cell px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Validation Check
              </th>
              <th
                scope="col"
                className="hidden lg:table-cell px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Created At
              </th>
              <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                <span className="sr-only">Select</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {props?.keys?.map((key: StripeKey, idx: number) => {
              return <ServeDataRow stripeKey={key} key={idx} />;
            }) ?? <NoData />}
          </tbody>
        </table>
      </div>
    </>
  );
}
