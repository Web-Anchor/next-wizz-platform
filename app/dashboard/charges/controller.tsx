'use client';

import Table from '@app/components/Table';
import Wrapper from '@app/components/Wrapper';
import { useCharges } from '@hooks/index';
import { Charge } from '../../../types';
import { classNames, getTimeAgo } from '@helpers/index';
import Link from 'next/link';
import PageHeadings from '@app/components/PageHeadings';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { fakerCharges } from '@lib/faker';

export default function Page() {
  const [state, setState] = useState<{
    fetching?: boolean;
    charges?: Charge[];
    has_more?: boolean;
    has_previous?: boolean;
  }>({});
  const router = useRouter();
  const searchParams = useSearchParams()!;
  const starting_after = searchParams.get('starting_after')!;
  const ending_before = searchParams.get('ending_before')!;

  let { has_more, has_previous, charges, isLoading } = useCharges({
    starting_after,
    ending_before,
  });
  // charges = fakerCharges(); // faker data
  console.log('🔑 charges', charges);

  const response = state?.charges || charges;
  const hasMoreRes = state?.has_more ?? has_more;
  const hasPreviousRes = state?.has_previous ?? has_previous;

  async function nexPage() {
    try {
      setState((prev) => ({ ...prev, fetching: true }));
      const starting_after = response?.[charges?.length - 1]?.id;
      const { data } = await axios.post('/api/v1/stripe/charges', {
        starting_after,
      });
      router.push(`/dashboard/charges?starting_after=${starting_after}`);

      setState((prev) => ({
        ...prev,
        charges: data?.charges?.data,
        has_more: data?.charges?.has_more,
        has_previous: data?.charges?.has_previous,
      }));
    } catch (error: any) {
      console.error('🔑 error', error);
      toast.error(error.message);
    } finally {
      setState((prev) => ({ ...prev, fetching: undefined }));
    }
  }

  async function prevPage() {
    try {
      setState((prev) => ({ ...prev, fetching: true }));
      const ending_before = response?.[0]?.id;
      const { data } = await axios.post('/api/v1/stripe/charges', {
        ending_before,
      });
      router.push(`/dashboard/charges?ending_before=${ending_before}`);

      setState((prev) => ({
        ...prev,
        charges: data?.charges?.data,
        has_more: data?.charges?.has_more,
        has_previous: data?.charges?.has_previous,
      }));
    } catch (error: any) {
      console.error('🔑 error', error);
      toast.error(error.message);
    } finally {
      setState((prev) => ({ ...prev, fetching: undefined }));
    }
  }

  return (
    <Wrapper>
      <PageHeadings
        title="Stripe Charges: Monitor and Manage Your Payment Activity."
        description="Stay informed and in control of your payment activity with our Stripe Charges page. Monitor transaction details, track payment statuses, and manage charges effectively to ensure smooth financial operations. Streamline your payment monitoring process and gain valuable insights into your transaction history effortlessly."
        slogan="Tracking Transactions, Empowering Financial Clarity!"
      />

      <Table
        fetching={isLoading || state.fetching}
        header={[
          { item: 'Customer', class: 'truncate lg:max-w-none' },
          { item: 'Amount' },
          { item: 'Phone', class: 'hidden lg:table-cell' },
          { item: 'Status', class: 'hidden lg:table-cell' },
          { item: 'Created At', class: 'text-nowrap' },
          { item: 'Address', class: 'hidden lg:table-cell' },
        ]}
        data={response?.map((item: Charge) => {
          return {
            row: [
              {
                item: (
                  <section className="flex flex-col max-w-28 lg:max-w-none">
                    <section className="text-sm font-medium leading-6 text-gray-800 truncate text-ellipsis">
                      {item?.billing_details?.name || item?.customer}
                    </section>
                    <section className="mt-1 text-xs leading-5 text-gray-500 truncate text-ellipsis">
                      {item?.billing_details?.email || item?.description}
                    </section>
                  </section>
                ),
              },
              {
                item: <section>{priceToDisplay(item?.amount)}</section>,
              },
              {
                item: <section>{item?.billing_details?.phone}</section>,
                class: 'hidden lg:table-cell',
              },
              {
                item: (
                  <div
                    className={classNames(
                      'rounded-md py-1 px-2 text-xs font-medium ring-1 ring-inset w-fit',
                      item?.paid
                        ? 'text-green-700 bg-green-50 ring-green-600/20'
                        : 'text-red-700 bg-red-50 ring-red-600/10'
                    )}
                  >
                    {item.status}
                  </div>
                ),
                class: 'hidden lg:table-cell',
              },
              {
                item: <section>{getTimeAgo(item?.created! * 1000)}</section>,
              },
              {
                item: (
                  <section>{item?.billing_details?.address?.line1}</section>
                ),
              },
              {
                item: (
                  <section>
                    <Link
                      href={item.receipt_url!}
                      className="text-sm font-medium leading-6 text-indigo-600 hover:text-indigo-500"
                      target="_blank"
                    >
                      View
                      <section className="hidden sm:inline">
                        {' '}
                        transaction receipt
                      </section>
                      <section className="sr-only">
                        , invoice #{item?.id}, {item?.billing_details?.name}
                      </section>
                    </Link>
                    <div className="mt-1 text-xs leading-5 text-gray-500">
                      Invoice{' '}
                      <section className="truncate hidden lg:flex text-gray-800">
                        {item.id}
                      </section>
                    </div>
                  </section>
                ),
              },
            ],
          };
        })}
        hasMore={hasMoreRes}
        hasPrevious={hasPreviousRes}
        nextCallback={nexPage}
        prevCallback={prevPage}
      />
    </Wrapper>
  );
}

function priceToDisplay(price?: number) {
  if (!price) return `0.00`;
  return `${(price / 100).toFixed(2)}`;
}
