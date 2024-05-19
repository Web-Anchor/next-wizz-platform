'use client';

import Button from '@app/components/Button';
import Table from '@app/components/Table';
import Wrapper from '@app/components/Wrapper';
import { useStripeKeys } from '@hooks/stripe-keys';
import { StripeKey } from '../../../types';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { classNames, convertToAsterisks, getTimeAgo } from '@helpers/index';
import AddStripeKeyDialog from '@app/components/AddStripeKeyDialog';
import { useKeyValidate } from '@hooks/validate-api-keys';
import { RowSkeleton } from '@app/components/Skeleton';
import { cFetch } from '@lib/cFetcher';
import { mutate } from 'swr';
import { toast } from 'sonner';

const KeyStatus = ({ stripeKey }: { stripeKey: StripeKey }) => {
  const { data, error, isLoading } = useKeyValidate({
    key: stripeKey.restrictedAPIKey,
  });
  // console.log('🔑 key check', error, data);

  return (
    <div className={classNames('text-sm text-gray-500')}>
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
  const [state, setState] = useState<{
    edit?: string;
    open?: boolean;
    fetching?: string;
  }>({});
  const { keys, isLoading } = useStripeKeys({});
  const router = useRouter();
  const nameRef = useRef<HTMLInputElement>(null);
  const keyRef = useRef<HTMLInputElement>(null);
  console.log('StripeKeys', keys, state);

  function redirectToStripe() {
    // router.push('https://docs.stripe.com/keys#obtain-api-keys');
    window.open('https://docs.stripe.com/keys#obtain-api-keys', '_blank');
  }

  function dialogClose() {
    setState((prev) => ({ ...prev, open: false }));
  }

  async function deleteKey(id: string) {
    try {
      // --------------------------------------------------------------------------------
      // 📌  Add Stripe API key to db
      // --------------------------------------------------------------------------------
      setState((prev) => ({ ...prev, fetching: id }));

      const { data, status } = await cFetch({
        url: '/api/v1/stripe/keys/delete-key',
        method: 'POST',
        data: { id },
      });

      if (status !== 200 || data?.error) {
        throw new Error(data?.error);
      }

      mutate(`/api/v1/stripe/keys`);
      toast.success(`API key deleted successfully`);
    } catch (err: any) {
      console.error(err);
      toast.error(err.message);
    } finally {
      setState((prev) => ({ ...prev, fetching: undefined }));
    }
  }

  async function editKey(id: string) {
    try {
      // --------------------------------------------------------------------------------
      // 📌  Add Stripe API key to db
      // --------------------------------------------------------------------------------
      setState((prev) => ({ ...prev, fetching: id }));
      const name = nameRef.current?.value;
      const key = keyRef.current?.value;

      const { data, status } = await cFetch({
        url: '/api/v1/stripe/keys/edit-key',
        method: 'POST',
        data: { key, name, id },
      });

      if (status !== 200 || data?.error) {
        throw new Error(data?.error);
      }

      mutate(`/api/v1/stripe/keys`);
      toast.success(`API key updated successfully`);
    } catch (err: any) {
      console.error(err);
      toast.error(err.message);
    } finally {
      setState((prev) => ({ ...prev, fetching: undefined, edit: undefined }));
    }
  }

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
          { item: 'Key value', class: 'hidden lg:table-cell' },
          { item: 'Status' },
          { item: 'Created At' },
        ]}
        data={keys?.map((key: StripeKey) => {
          const edit = state?.edit === key.id;
          const fetching = state?.fetching === key.id;

          return {
            row: [
              {
                item: (
                  <section>
                    {!edit && <p>{key.name}</p>}
                    {edit && (
                      <input
                        type="text"
                        className="input input-bordered max-w-24"
                        placeholder="Key name"
                        defaultValue={key.name}
                        ref={nameRef}
                      />
                    )}
                  </section>
                ),
                class: 'md:table-cell-auto min-w-28',
              },
              {
                item: (
                  <section>
                    {!edit && (
                      <p className="blur">
                        {convertToAsterisks(key.restrictedAPIKey!)}
                      </p>
                    )}
                    {edit && (
                      <input
                        type="text"
                        className="input input-bordered max-w-24"
                        placeholder="Key value"
                        defaultValue={key.restrictedAPIKey}
                        ref={keyRef}
                      />
                    )}
                  </section>
                ),
                class: 'hidden lg:table-cell min-w-28',
              },
              { item: <KeyStatus stripeKey={key} /> },
              {
                item: <p>{getTimeAgo(key.createdAt!)}</p>,
              },
              {
                item: (
                  <Button
                    title={edit ? 'Save' : 'Edit'}
                    style="ghost"
                    class="text-indigo-600"
                    onClick={() => {
                      if (!edit) {
                        setState((prev) => ({ ...prev, edit: key.id }));
                      }
                      if (edit) {
                        editKey(key.id!);
                      }
                    }}
                    fetching={fetching && edit}
                    disabled={fetching}
                  />
                ),
                class: 'hidden lg:table-cell',
              },
              {
                item: (
                  <Button
                    title={edit ? 'Cancel' : 'Delete'}
                    style="ghost"
                    class="text-indigo-600"
                    type="submit"
                    onClick={() => {
                      if (!edit) {
                        deleteKey(key.id!);
                      }
                      if (edit) {
                        setState((prev) => ({ ...prev, edit: undefined }));
                      }
                    }}
                    fetching={fetching && !edit}
                    disabled={fetching}
                  />
                ),
              },
            ],
          };
        })}
      />

      <div className="bg-white px-6 py-8 lg:px-5">
        <div className="mx-auto sm:mx-0 max-w-3xl text-base leading-7 text-gray-700">
          <p className="text-base font-semibold leading-7 text-indigo-600">
            Restricted API key
          </p>
          <div className="mt-4 max-w-2xl">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              Creating a restricted API key
            </h2>
            <p className="mt-6">
              You can create a restricted key from scratch or start by cloning
              an existing restricted key.
            </p>
            <p className="mt-6">
              To create a restricted key from scratch, click Create restricted
              key. In this case, the default value for all permissions is None.
              To clone an existing key, in the row for the key you want to
              clone, click the overflow menu (), then select Duplicate key…. In
              this case, the default value for each permission is its value in
              the cloned key.
            </p>
            <p className="mt-6">
              In the Key name field, enter a name. If you cloned an existing
              key, the default name is the cloned key’s name.
            </p>
            <p className="mt-6">
              For each resource you want the new key to access, select the
              permission for this key to allow. If you use Connect, you can also
              select the permission for this key to allow when accessing
              connected accounts. Available permissions are None, Read, or
              Write.
            </p>
            <p className="mt-6">Click Create key.</p>
            <p className="mt-6">
              The dialog displays the new key value. Copy it by clicking it.
            </p>
            <p className="mt-6">
              Save the key value. You can’t retrieve it later.
            </p>
            <p className="mt-6">
              In the Add a note field, enter the location where you saved the
              key and click Done.
            </p>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
