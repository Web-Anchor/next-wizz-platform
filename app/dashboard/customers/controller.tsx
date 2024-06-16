'use client';

import Button from '@app/components/Button';
import Table from '@app/components/Table';
import Wrapper from '@app/components/Wrapper';
import { useCustomers } from '@hooks/useCustomers';
import { Customer } from '../../../types';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { getTimeAgo } from '@helpers/index';
import PageHeadings from '@app/components/PageHeadings';
import { mediaScreenTitle } from '@helpers/components';
import { cFetch } from '@lib/cFetcher';
import { useUser } from '@hooks/useUsers';

export default function Page() {
  const [state, setState] = useState<{
    fetching?: string;
  }>({});
  const params = useSearchParams();
  const { user } = useUser({});
  const { customers, data, isLoading } = useCustomers({});
  // console.log('🧾 Customers', customers, data);

  async function emailCustomer(email: string) {
    try {
      // --------------------------------------------------------------------------------
      // 📌  Add Stripe API key to db
      // --------------------------------------------------------------------------------
      setState((prev) => ({ ...prev, fetching: email }));
      const customer = customers.find((c: Customer) => c.email === email);

      const { data, status } = await cFetch({
        url: '/api/v1/send-email',
        method: 'POST',
        data: {
          email,
          subject: 'Link to customer Portal 🚀',
          html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Link to customer portal</title>
                <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
            </head>
            <body>
                <div class="bg-gray-100 p-4 rounded-lg max-w-md mx-auto mt-8">
                    <p class="text-lg">Dear Customer,</p>
                    <p class="text-base mb-4">You can download your invoices from our customer portal. Please click the link below:</p>
                    <a href="${process.env.NEXT_PUBLIC_PORTAL_URL}?id=${user?.id}" target="_blank" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Download Invoices</a>
                </div>
            </body>
            </html>
            `,
        },
      });
      console.log('📧 Email sent to:', email, data);

      if (status !== 200 || data?.error) {
        throw new Error(
          data?.error || `Failed to send email to ${customer?.name}!`
        );
      }

      toast.success(`Link to portal sent to ${customer?.name} ✨`);
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
                  <p className="max-w-32 lg:max-w-none truncate text-ellipsis">
                    {item?.name}
                  </p>
                ),
              },
              {
                item: (
                  <p className="max-w-32 lg:max-w-none truncate text-ellipsis">
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
                    title={mediaScreenTitle('Email Portal Link', 'Email Link')}
                    onClick={() => emailCustomer(item?.email!)}
                    fetching={state?.fetching === item?.id}
                    style="link"
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
