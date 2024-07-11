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
import Badge from '@app/components/Badge';
import { useSubscription } from '@hooks/useSubscriptions';
import { plans } from '@config/index';
import { fakerCustomers } from '@lib/faker';

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
  const { product } = useSubscription({});
  let { customers, has_previous, has_more, isLoading } = useCustomers({
    starting_after,
    ending_before,
  });
  // customers = fakerCustomers(); // faker data
  const plan = plans?.[product?.name];

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

  async function emailCustomer(props: {
    email: string;
    name: string;
    id: string;
  }) {
    try {
      // --------------------------------------------------------------------------------
      // 📌  Add Stripe API key to db
      // --------------------------------------------------------------------------------
      setState((prev) => ({ ...prev, fetching: props.id }));

      const template = await getTemplate({
        templateName: 'email-template-one.hbs',
      });
      const html = await buildTemplate({
        template,
        data: {
          name: props.name ?? 'Customer',
          portalUrl: `${process.env.NEXT_PUBLIC_PORTAL_URL}?id=${user?.id}`,
          platformUrl: process.env.NEXT_PUBLIC_APP_URL,
        },
      });

      const { data, status } = await cFetch({
        url: '/api/v1/send-email',
        method: 'POST',
        data: {
          email: props.email,
          subject: 'invoicio Customer Portal ✨',
          html,
          name: props.name,
          invoiceNumber: props.id,
        },
      });
      console.log('📧 Email sent to:', data);

      if (status !== 200 || data?.error) {
        throw new Error(
          data?.error ||
            `Failed to send email to ${props?.name || props?.email}!`
        );
      }

      toast.success(`Link to portal sent to ${props?.name ?? props.email} ✨`);
      mutate(`/api/v1/user`);
    } catch (err: any) {
      console.error(err);
      toast.error(err.message);
    } finally {
      setState((prev) => ({ ...prev, fetching: undefined }));
    }
  }

  async function emailCustomerInvoice(props: {
    email: string;
    name: string;
    id: string;
  }) {
    try {
      // --------------------------------------------------------------------------------
      // 📌  Add Stripe API key to db
      // --------------------------------------------------------------------------------
      setState((prev) => ({ ...prev, fetching: 'send-invoice' }));
      // const customer = customers.find((c: Customer) => c.id === props.id);

      const template = await getTemplate({
        templateName: 'email-template-one.hbs',
      });
      const html = await buildTemplate({
        template,
        data: {
          name: props.name ?? 'Customer',
          portalUrl: `${process.env.NEXT_PUBLIC_PORTAL_URL}?id=${user?.id}`,
          platformUrl: process.env.NEXT_PUBLIC_APP_URL,
        },
      });

      const { data, status } = await cFetch({
        url: '/api/v2/send-invoice-pdf',
        method: 'POST',
        data: {
          id: user.id, // use to gen user template
          email: props.email,
          subject: 'Find attached invoice! invoicio.io Customer Portal ✨',
          html,
          name: props.name,
          fileName: `invoice-${props.id}.pdf`,
        },
      });

      if (status !== 200 || data?.error) {
        console.log('🚨 Error sending email:', data, status);

        throw new Error(
          data?.error ||
            `Failed to send email to ${props?.name || props?.email}!`
        );
      }
      console.log('📧 Email sent to:', data);

      toast.success(`Link to portal sent to ${props?.name ?? props.email} ✨`);
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

      <Badge
        title={mediaScreenTitle(
          `Total Emails Sent: ${
            user?.emailsSendCount ?? 0
          } ${`out of ${plan?.emailCap} 📧`}`,
          `Total Emails Sent: ${user?.emailsSendCount ?? 0}`
        )}
        type="info"
        description={
          user?.lastEmailSendDate
            ? `Sent: ${getTimeAgo(user?.lastEmailSendDate!)}`
            : undefined
        }
      />

      <Table
        fetching={isLoading || state.fetching === 'fetching'}
        header={[
          { item: 'Name' },
          { item: 'Email' },
          { item: 'Currency', class: 'hidden lg:table-cell' },
          { item: 'Created At', class: 'hidden lg:table-cell' },
          { item: 'Address', class: 'hidden lg:table-cell' },
          { item: 'Send Invite' },
          { item: 'Email Invoice' },
        ]}
        data={response?.map((item: Customer) => {
          return {
            row: [
              {
                item: (
                  <section className="max-w-32 lg:max-w-none truncate text-ellipsis">
                    {item?.name}
                  </section>
                ),
              },
              {
                item: (
                  <section className="max-w-32 lg:max-w-none truncate text-ellipsis">
                    {item?.email}
                  </section>
                ),
              },
              {
                item: <section>{item?.currency}</section>,
                class: 'hidden lg:table-cell',
              },
              {
                item: <section>{getTimeAgo(item?.created! * 1000)}</section>,
                class: 'hidden lg:table-cell',
              },
              {
                item: <section>{item?.address?.line1}</section>,
                class: 'hidden lg:table-cell',
              },
              {
                item: (
                  <Button
                    title={mediaScreenTitle('Email Portal Link', 'Email Link')}
                    onClick={() =>
                      emailCustomer({
                        email: item?.email!,
                        name: item?.name!,
                        id: item?.id!,
                      })
                    }
                    fetching={state?.fetching === item?.id}
                    disabled={!!state?.fetching}
                    style="link"
                  />
                ),
              },
              {
                item: (
                  <Button
                    title={mediaScreenTitle('Send Invoice', 'Send Invoice')}
                    onClick={() =>
                      emailCustomerInvoice({
                        email: item?.email!,
                        name: item?.name!,
                        id: item?.id!,
                      })
                    }
                    fetching={state?.fetching === 'send-invoice'}
                    disabled={!!state?.fetching}
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
