'use client';

import Button from '@app/components/Button';
import Table from '@app/components/Table';
import Wrapper from '@app/components/Wrapper';
import { useCustomers } from '@hooks/useCustomers';
import { Customer } from '../../../types';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { getTimeAgo } from '@helpers/index';
import PageHeadings from '@app/components/PageHeadings';
import { mediaScreenTitle } from '@helpers/components';
import { cFetch } from '@lib/cFetcher';
import { useUser } from '@hooks/useUsers';
import axios from 'axios';
import { mutate } from 'swr';
import { buildTemplate, getTemplate } from '@server/templates';

export default function Page() {
  const [state, setState] = useState<{
    fetching?: string;
    customers?: Customer[];
    has_more?: boolean;
    has_previous?: boolean;
  }>({});
  const router = useRouter();
  const searchParams = useSearchParams()!;
  const starting_after = searchParams.get('starting_after')!;
  const ending_before = searchParams.get('ending_before')!;

  const { user } = useUser({});
  const { customers, has_previous, has_more, isLoading } = useCustomers({
    starting_after,
    ending_before,
  });
  console.log('🧾 user', user);

  const response = state?.customers || customers;
  const hasMoreRes = state?.has_more ?? has_more;
  const hasPreviousRes = state?.has_previous ?? has_previous;

  async function nexPage() {
    try {
      setState((prev) => ({ ...prev, fetching: 'fetching' }));
      const starting_after = response?.[customers?.length - 1]?.id;
      const { data } = await axios.post('/api/v1/stripe/customers', {
        starting_after,
      });
      router.push(`/dashboard/customers?starting_after=${starting_after}`);

      setState((prev) => ({
        ...prev,
        customers: data?.customers?.data,
        has_more: data?.customers?.has_more,
        has_previous: data?.customers?.has_previous,
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
      setState((prev) => ({ ...prev, fetching: 'fetching' }));
      const ending_before = response?.[0]?.id;
      const { data } = await axios.post('/api/v1/stripe/customers', {
        ending_before,
      });
      router.push(`/dashboard/customers?ending_before=${ending_before}`);

      setState((prev) => ({
        ...prev,
        customers: data?.customers?.data,
        has_more: data?.customers?.has_more,
        has_previous: data?.customers?.has_previous,
      }));
    } catch (error: any) {
      console.error('🔑 error', error);
      toast.error(error.message);
    } finally {
      setState((prev) => ({ ...prev, fetching: undefined }));
    }
  }

  async function emailCustomer(email: string, name: string) {
    try {
      // --------------------------------------------------------------------------------
      // 📌  Add Stripe API key to db
      // --------------------------------------------------------------------------------
      setState((prev) => ({ ...prev, fetching: email }));
      const customer = customers.find((c: Customer) => c.email === email);
      const template = await getTemplate({
        templateName: 'email-template-one.hbs',
      });
      const html = await buildTemplate({
        template,
        data: {
          name: name ?? 'Customer',
          portalUrl: `${process.env.NEXT_PUBLIC_PORTAL_URL}?id=${user?.id}`,
          platformUrl: process.env.NEXT_PUBLIC_APP_URL,
        },
      });

      const { data, status } = await cFetch({
        url: '/api/v1/send-email',
        method: 'POST',
        data: {
          email,
          subject: 'invoicio Customer Portal ✨',
          html,
        },
      });
      console.log('📧 Email sent to:', email, data);

      if (status !== 200 || data?.error) {
        throw new Error(
          data?.error || `Failed to send email to ${customer?.name}!`
        );
      }

      toast.success(`Link to portal sent to ${customer?.name} ✨`);
      mutate(`/api/v1/user`);
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
        fetching={isLoading || state.fetching === 'fetching'}
        header={[
          { item: 'Name' },
          { item: 'Email' },
          { item: 'Currency', class: 'hidden lg:table-cell' },
          { item: 'Created At', class: 'hidden lg:table-cell' },
        ]}
        data={response?.map((item: Customer) => {
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
                    onClick={() => emailCustomer(item?.email!, item?.name!)}
                    fetching={state?.fetching === item?.id}
                    style="link"
                  />
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
