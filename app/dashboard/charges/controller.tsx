'use client';

import Table from '@app/components/Table';
import Wrapper from '@app/components/Wrapper';
import { useCharges } from '@hooks/index';
import { Charge } from '../../../types';
import { classNames, getTimeAgo } from '@helpers/index';
import Link from 'next/link';
import PageHeadings from '@app/components/PageHeadings';

export default function Page() {
  const { data, charges, isLoading } = useCharges({});
  console.log('🧾 Charges', data, charges);

  return (
    <Wrapper>
      <PageHeadings
        title="Stripe Charges: Monitor and Manage Your Payment Activity."
        description="Stay informed and in control of your payment activity with our Stripe Charges page. Monitor transaction details, track payment statuses, and manage charges effectively to ensure smooth financial operations. Streamline your payment monitoring process and gain valuable insights into your transaction history effortlessly."
        slogan="Tracking Transactions, Empowering Financial Clarity!"
      />

      <Table
        fetching={isLoading}
        header={[
          { item: 'Customer', class: 'max-w-10 lg:max-w-none__' },
          { item: 'Amount' },
          { item: 'Phone', class: 'hidden lg:table-cell' },
          { item: 'Status', class: 'hidden lg:table-cell' },
          { item: 'Created At', class: 'text-nowrap' },
          { item: 'Address', class: 'hidden lg:table-cell' },
        ]}
        data={charges?.map((item: Charge) => {
          return {
            row: [
              {
                item: (
                  <section className="flex flex-col max-w-20 lg:max-w-none">
                    <p className="text-sm font-medium leading-6 text-gray-800 truncate text-ellipsis">
                      {item?.billing_details?.name}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-gray-500 truncate text-ellipsis">
                      {item?.billing_details?.email}
                    </p>
                  </section>
                ),
              },
              {
                item: <p>{priceToDisplay(item?.amount)}</p>,
              },
              {
                item: <p>{item?.billing_details?.phone}</p>,
                class: 'hidden lg:table-cell',
              },
              {
                item: (
                  <div
                    className={classNames(
                      'rounded-md py-1 px-2 text-xs font-medium ring-1 ring-inset',
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
                item: <p>{getTimeAgo(item?.created! * 1000)}</p>,
              },
              {
                item: <p>{item?.billing_details?.address?.line1}</p>,
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
                      <span className="hidden sm:inline">
                        {' '}
                        transaction receipt
                      </span>
                      <span className="sr-only">
                        , invoice #{item?.id}, {item?.billing_details?.name}
                      </span>
                    </Link>
                    <div className="mt-1 text-xs leading-5 text-gray-500">
                      Invoice{' '}
                      <span className="hidden lg:flex text-gray-800">
                        {item.id}
                      </span>
                    </div>
                  </section>
                ),
              },
            ],
          };
        })}
      />
    </Wrapper>
  );
}

function priceToDisplay(price?: number) {
  if (!price) return `0.00`;
  return `${(price / 100).toFixed(2)}`;
}
