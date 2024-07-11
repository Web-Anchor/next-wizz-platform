'use client';

import Table from '@app/components/Table';
import Wrapper from '@app/components/Wrapper';
import { useCharges, useUser } from '@hooks/index';
import { Charge } from '../../../types';
import { classNames, getTimeAgo } from '@helpers/index';
import Link from 'next/link';
import PageHeadings from '@app/components/PageHeadings';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { fakerCharges } from '@lib/faker';
import Button from '@app/components/Button';
import { mediaScreenTitle } from '@helpers/components';
import { buildTemplate, getTemplate } from '@server/templates';

export default function Page() {
  const [state, setState] = useState<{
    fetching?: string;
    charges?: Charge[];
    has_more?: boolean;
    has_previous?: boolean;
  }>({});
  const { user } = useUser({});
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
      setState((prev) => ({ ...prev, fetching: 'next-page' }));
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
      setState((prev) => ({ ...prev, fetching: 'prev-page' }));
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

  async function emailCustomerInvoice(props: {
    email: string;
    name: string;
    id: string; // Stripe charge id
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

      const { data, status } = await axios.post('/api/v2/send-invoice-pdf', {
        id: user.id, // use to gen user template
        email: props.email,
        subject: 'Find attached invoice! invoicio.io Customer Portal ✨',
        html,
        name: props.name,
        chargeId: props.id,
        fileName: `invoice-${props.id}.pdf`,
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
        title="Stripe Charges: Monitor and Manage Your Payment Activity."
        description="Stay informed and in control of your payment activity with our Stripe Charges page. Monitor transaction details, track payment statuses, and manage charges effectively to ensure smooth financial operations. Streamline your payment monitoring process and gain valuable insights into your transaction history effortlessly."
        slogan="Tracking Transactions, Empowering Financial Clarity!"
      />

      <Table
        fetching={isLoading || !!state.fetching}
        header={[
          { item: 'Customer', class: 'truncate' },
          { item: 'Amount' },
          { item: 'Phone', class: 'hidden xl:table-cell' },
          { item: 'Status', class: 'hidden lg:table-cell' },
          { item: 'Created At', class: 'text-nowrap' },
          { item: 'Address', class: 'hidden xl:table-cell' },
          { item: 'Email Invoice' },
        ]}
        data={response?.map((item: Charge) => {
          return {
            row: [
              {
                item: (
                  <section className="flex flex-col max-w-40 lg:max-w-56">
                    <section className="text-sm font-medium text-gray-800 truncate text-ellipsis">
                      {item?.billing_details?.name || item?.customer?.name}
                    </section>
                    {item?.customer?.description && (
                      <section className="mt-1 text-xs text-gray-500 truncate text-ellipsis">
                        {item?.customer?.description}
                      </section>
                    )}
                    <section className="mt-1 text-xs text-indigo-400 truncate text-ellipsis">
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
                class: 'hidden xl:table-cell',
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
                  <section>
                    {item?.billing_details?.address?.line1 ||
                      item?.customer?.address?.line1}
                  </section>
                ),
                class: 'hidden xl:table-cell',
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
              {
                item: (
                  <Button
                    title={mediaScreenTitle('Send Invoice', 'Send Invoice')}
                    onClick={() =>
                      emailCustomerInvoice({
                        email: item?.customer?.email!,
                        name: item?.customer?.name!,
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

function priceToDisplay(price?: number) {
  if (!price) return `0.00`;
  return `${(price / 100).toFixed(2)}`;
}
