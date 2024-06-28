'use client';

import Button from '@app/components/Button';
import Table from '@app/components/Table';
import Wrapper, { SectionWrapper } from '@app/components/Wrapper';
import { useStripeKeys } from '@hooks/useStripeKeys';
import { StripeKey } from '../../../types';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { classNames, convertToAsterisks, getTimeAgo } from '@helpers/index';
import AddStripeKeyDialog from '@app/components/AddStripeKeyDialog';
import { useKeyValidate } from '@hooks/useValidateApiKeys';
import { RowSkeleton } from '@app/components/Skeleton';
import { cFetch } from '@lib/cFetcher';
import { mutate } from 'swr';
import { toast } from 'sonner';
import PageHeadings from '@app/components/PageHeadings';
import Badge from '@app/components/Badge';
import { mediaScreenTitle } from '@helpers/components';
import Link from 'next/link';

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
  const { keys, isLoading, hasKeys } = useStripeKeys({});
  const {
    hasErrors,
    errorType,
    chargesPermissionError,
    customersPermissionError,
    isLoading: isKeyValidationLoad,
  } = useKeyValidate({
    key: keys?.[0]?.restrictedAPIKey,
  });
  const router = useRouter();
  const nameRef = useRef<HTMLInputElement>(null);
  const keyRef = useRef<HTMLInputElement>(null);
  console.log('StripeKeys', hasErrors, errorType);

  function stateSetter(props: any) {
    setState((prev) => ({ ...prev, ...(props ?? {}) }));
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
      <AddStripeKeyDialog {...state} setter={stateSetter} />

      <PageHeadings
        title="Stripe API Keys. Enhance Your Platform with Secure Payment Integration."
        description="Manage and secure your payment transactions by adding your Stripe API keys on our platform. Seamlessly integrate Stripe's powerful payment solutions, enhance transaction security, and unlock a world of possibilities for your business. Take control of your payment processes with ease and efficiency."
        slogan="Powering Secure Transactions, One Key at a Time!"
      />

      {!isKeyValidationLoad && hasErrors && (
        <SectionWrapper class="gap-5">
          <Badge
            title={
              (errorType === 'StripeAuthenticationError' &&
                mediaScreenTitle('Invalid Stripe API Key', 'Invalid Key')) ||
              (errorType === 'StripePermissionError' &&
                chargesPermissionError &&
                mediaScreenTitle(
                  'API key Charges Permissions Missing',
                  'Charges Permissions Missing'
                )) ||
              (errorType === 'StripePermissionError' &&
                customersPermissionError &&
                mediaScreenTitle(
                  'API key Customers Permissions Missing',
                  'Customers Permissions Missing'
                ))
            }
            type={errorType === 'StripePermissionError' ? 'warning' : 'error'}
            tooltip={
              hasErrors
                ? 'Please update your keys'
                : 'Please add your Stripe keys to use the platform!'
            }
            tooltipPosition="tooltip-bottom"
          />
          {errorType === 'StripeAuthenticationError' && (
            <PageHeadings description="Provided API Key is required to be a valid Stripe API key. Please update your keys to continue using the platform." />
          )}
          {chargesPermissionError && (
            <PageHeadings description="The provided API key is missing the required permissions to access charges. Please update your keys to continue using the platform. API key is required to have read permissions for charges." />
          )}
          {customersPermissionError && (
            <PageHeadings description="The provided API key is missing the required permissions to access customers. Please update your keys to continue using the platform. API key is required to have read permissions for customers." />
          )}
        </SectionWrapper>
      )}

      <div className="flex flex-col gap-3 lg:flex-row">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-800">
            Connected Stripe API Keys
          </h1>
          <p className="text-sm font-medium leading-6 text-gray-500">
            Manage your connected Stripe API keys and enhance your platform with
            secure payment integration.
          </p>
        </div>
        <section>
          <Button
            title="Add key"
            class="text-nowrap"
            onClick={() => setState((prev) => ({ ...prev, open: !prev.open }))}
            hide={isLoading || hasKeys}
          />
        </section>
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
                    {!edit && (
                      <section className="max-w-24 lg:max-w-none truncate text-ellipsis">
                        {key.name}
                      </section>
                    )}
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
                      <section className="blur">
                        {convertToAsterisks(key.restrictedAPIKey!)}
                      </section>
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
                item: <section>{getTimeAgo(key.createdAt!)}</section>,
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

      <section
        className={classNames('max-w-none lg:max-w-4xl flex flex-col gap-2')}
      >
        <h2 className="font-bold text-xl leading-6 text-gray-600 lg:mx-0 ">
          Restricted API key
        </h2>
        {/* <p className="text-sm text-gray-500">
          Go to the{' '}
          <Link
            href="https://dashboard.stripe.com/apikeys"
            target="_blank"
            className="text-sm text-indigo-600 font-semibold"
          >
            API keys
          </Link>{' '}
          page in your Stripe Dashboard.
        </p>
        <p className="text-sm text-gray-500">
          Click on "Create restricted key".
        </p>
        <p className="text-sm text-gray-500">Give your key a name.</p>
        <p className="text-sm text-gray-500">
          Set the permissions for the key. Make sure to set "Verification
          Sessions and Reports" and "Access recent sensitive verification
          results" to "Read". If you need access to collected images, also add
          the "Files" permission with "Write".
        </p>
        <p className="text-sm text-gray-500">Click "Create key".</p> */}

        {/* refactor to bullet points */}

        <ul className="list-decimal list-inside text-sm text-gray-500">
          <li>
            Go to the{' '}
            <Link
              href="https://dashboard.stripe.com/apikeys"
              target="_blank"
              className="text-sm text-indigo-600 font-semibold"
            >
              API keys
            </Link>{' '}
            page in your Stripe Dashboard.
          </li>
          <li>{`Click on "Create restricted key".`}</li>
          <li>Give your key a name.</li>
          <li>
            {`Set the permissions for the key. Make sure to set "Verification
            Sessions and Reports" and "Access recent sensitive verification
            results" to "Read". If you need access to collected images, also add
            the "Files" permission with "Write".`}
          </li>
          <li>{`Click "Create key".`}</li>
        </ul>
      </section>
    </Wrapper>
  );
}
