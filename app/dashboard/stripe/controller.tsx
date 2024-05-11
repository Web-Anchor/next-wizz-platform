'use client';

import Button from '@app/components/Button';
import Table from '@app/components/Table';
import Wrapper from '@app/components/Wrapper';
import { useStripeKeys } from '@hooks/stripe-keys';
import { StripeKey } from '../../../types';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  classNames,
  convertToAsterisks,
  getDateDifference,
} from '@helpers/index';
import AddStripeKeyDialog from '@app/components/AddStripeKeyDialog';
import { useKeyValidate } from '@hooks/validate-api-keys';
import { RowSkeleton } from '@app/components/Skeleton';

const KeyStatus = ({ stripeKey }: { stripeKey: StripeKey }) => {
  const { data, error, isLoading } = useKeyValidate({
    key: stripeKey.restrictedAPIKey,
  });
  console.log('🔑 key check', error, data);

  return (
    <div className={classNames('px-3 py-3.5 text-sm text-gray-500')}>
      {isLoading && <RowSkeleton />}
      {!isLoading && (
        <div
          className={classNames(
            'flex items-center gap-x-2 justify-start',
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
    </div>
  );
};

export default function Page() {
  const [state, setState] = useState<{ edit?: boolean; open?: boolean }>({});
  const { keys, isLoading } = useStripeKeys({});
  const router = useRouter();

  function redirectToStripe() {
    // router.push('https://docs.stripe.com/keys#obtain-api-keys');
    window.open('https://docs.stripe.com/keys#obtain-api-keys', '_blank');
  }

  function dialogClose() {
    setState((prev) => ({ ...prev, open: false }));
  }
  // console.log('StripeKeys', keys);

  return (
    <Wrapper>
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
      <Table
        fetching={isLoading}
        header={[
          { item: 'Key name' },
          { item: 'Key value', class: 'hidden sm:flex' },
          { item: 'Status' },
          { item: 'Created At', class: 'hidden sm:flex' },
        ]}
        data={keys?.map((key: StripeKey) => ({
          row: [
            { item: key.name },
            {
              item: (
                <span className="blur">
                  {convertToAsterisks(key.restrictedAPIKey!)}
                </span>
              ),
              class: 'hidden sm:flex',
            },
            { item: <KeyStatus stripeKey={key} /> },
            {
              item: getDateDifference(key.createdAt!),
              class: 'hidden sm:flex',
            },
            {
              item: (
                <Button
                  title="Edit"
                  style="ghost"
                  class="text-indigo-600"
                  onClick={() => setState((prev) => ({ ...prev, edit: true }))}
                />
              ),
              class: 'hidden sm:flex',
            },
            {
              item: (
                <Button
                  title="Delete"
                  style="ghost"
                  class="text-indigo-600"
                  onClick={() => setState((prev) => ({ ...prev, edit: true }))}
                />
              ),
            },
          ],
        }))}
      />

      <div className="flex flex-col gap-5">
        <p className="text-base font-semibold leading-7 text-indigo-600">
          Restricted API key
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Create a restricted API key
        </h1>

        <div className="card w-fill bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">
              A restricted API key only allows the level of access that you
              specify.
            </h2>
            <p>To create a restricted API key:</p>

            <section className="flex flex-col gap-2 text-xs font-medium text-slate-500 text-justify">
              <p>Open the API keys page.</p>
              <p>
                You can create a restricted key from scratch or start by cloning
                an existing restricted key.
              </p>
              <p>
                To create a restricted key from scratch, click Create restricted
                key. In this case, the default value for all permissions is
                None. To clone an existing key, in the row for the key you want
                to clone, click the overflow menu (), then select Duplicate
                key…. In this case, the default value for each permission is its
                value in the cloned key.
              </p>
              <p>
                In the Key name field, enter a name. If you cloned an existing
                key, the default name is the cloned key’s name.
              </p>
              <p>
                For each resource you want the new key to access, select the
                permission for this key to allow. If you use Connect, you can
                also select the permission for this key to allow when accessing
                connected accounts. Available permissions are None, Read, or
                Write.
              </p>
              <p>Click Create key.</p>
              <p>
                Stripe sends a verification code to your email address or in a
                text message. (As with any email or text message, it might not
                arrive immediately.) Enter the code in the dialog. If the dialog
                doesn’t continue automatically, click Continue.
              </p>
              <p>
                The dialog displays the new key value. Copy it by clicking it.
              </p>
              <p>Save the key value. You can’t retrieve it later.</p>
              <p>
                In the Add a note field, enter the location where you saved the
                key and click Done.
              </p>
            </section>

            <Button
              title="Stripe API docs"
              style="ghost"
              onClick={redirectToStripe}
            />
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
