'use client';

import Button from '@app/components/Button';
import Table from '@app/components/Table';
import Wrapper from '@app/components/Wrapper';
import { useCustomers } from '@hooks/customers';
import { Customer } from '../../../types';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { getTimeAgo } from '@helpers/index';
import PageHeadings from '@app/components/PageHeadings';

export default function Page() {
  const [state, setState] = useState<{
    fetching?: string;
  }>({});
  const params = useSearchParams();
  const { customers, data, isLoading } = useCustomers({});
  console.log('🧾 Customers', customers, data);

  async function emailInvoice(id: string) {
    try {
      // --------------------------------------------------------------------------------
      // 📌  Add Stripe API key to db
      // --------------------------------------------------------------------------------
      setState((prev) => ({ ...prev, fetching: id }));
      const customer = customers.find((c: Customer) => c.id === id);
      console.log('Email Invoice');
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // const { data, status } = await cFetch({
      //   url: '/api/v1/stripe/keys/edit-key',
      //   method: 'POST',
      //   data: { key, name, id },
      // });

      // if (status !== 200 || data?.error) {
      //   throw new Error(data?.error);
      // }

      toast.success(`Latest invoice sent to ${customer?.name}`);
    } catch (err: any) {
      console.error(err);
      toast.error(err.message);
    } finally {
      setState((prev) => ({ ...prev, fetching: undefined }));
    }
  }

  return (
    <Wrapper>
      <PageHeadings
        title="Stripe Customers. Manage Your Transactions with Ease."
        description="Navigate your Stripe transactions effortlessly with our Stripe Customers page. Access detailed information, track payments, and manage customer interactions seamlessly to stay on top of your financial transactions. Simplify your payment management process and gain insights into your customer activity with ease."
        slogan="Empowering Seamless Transactions, One Click at a Time!"
      />

      <Table
        fetching={isLoading}
        header={[
          { item: 'Name' },
          { item: 'Email' },
          { item: 'Currency', class: 'hidden lg:table-cell' },
          { item: 'Created At', class: 'hidden lg:table-cell' },
        ]}
        data={customers?.map((item: Customer) => {
          return {
            row: [
              {
                item: (
                  <p className="max-w-24 lg:max-w-none truncate text-ellipsis">
                    {item?.name}
                  </p>
                ),
              },
              {
                item: (
                  <p className="max-w-24 lg:max-w-none truncate text-ellipsis">
                    {item?.email}
                  </p>
                ),
              },
              {
                item: <p>{item?.currency}</p>,
                class: 'hidden lg:table-cell',
              },
              {
                item: <p>{getTimeAgo(item?.created! * 1000)}</p>,
                class: 'hidden lg:table-cell',
              },
              {
                item: <p>{item?.address?.line1}</p>,
              },
              {
                item: (
                  <Button
                    title="Send Invoice"
                    onClick={() => emailInvoice(item?.id!)}
                    fetching={state?.fetching === item?.id}
                  />
                ),
              },
            ],
          };
        })}
      />
    </Wrapper>
  );
}
