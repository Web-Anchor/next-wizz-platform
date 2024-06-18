'use client';

import Wrapper, { SectionWrapper } from '@app/components/Wrapper';
import { useSubscription, useUser } from '@hooks/index';
import Pricing from '@components/Pricing';
import PageHeadings from '@app/components/PageHeadings';
import { useStatistics } from '@hooks/index';
import StatsCard from '@app/components/StatsCard';
import { copyToClipboard, currentMonth, lastMonth } from '@helpers/index';
import NumbersCard from '@app/components/NumbersCard';
import Button from '@app/components/Button';
import { useRouter } from 'next/navigation';
import Badge from '@app/components/Badge';
import Link from 'next/link';
import { toast } from 'sonner';

export default function Page() {
  const router = useRouter();
  const { user } = useUser({});
  const { subscription } = useSubscription({});
  const { charges, customers, isLoading } = useStatistics({
    type: 'advanced',
  });
  console.log('🚧 Subs ', subscription);
  console.log(`🚧 User `, user);

  if (!subscription && !isLoading) {
    // --------------------------------------------------------------------------------
    // 📌  Fallback Component if no subscription
    // --------------------------------------------------------------------------------
    return (
      <Wrapper>
        <Pricing />
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <PageHeadings
        title="Dashboard. Your Central Hub for Insights and Control."
        description="Access real-time data, analytics, and key metrics on our Dashboard, empowering you with valuable insights to make informed decisions. Monitor performance, track trends, and stay in control of your operations from a centralized platform designed to streamline your workflow."
        slogan="Invoice Smarter, Grow Stronger - Empowering Your Business!"
      />
      <Badge
        title={
          <p>
            <span className="text-indigo-600">invoicio.io</span> API key
          </p>
        }
        type="info"
        tooltip={`My invoicio.io API key: ${user?.id}. API key is used to access invoicio.io customer portal charges & invoices.`}
        tooltipPosition="tooltip-bottom"
        description={
          <section className="flex flex-row gap-5 content-center justify-center">
            <Button
              title="Copy API Key"
              style="ghost"
              onClick={() => {
                copyToClipboard(user?.id!);
                toast.success('API key copied to clipboard');
              }}
            />
            <Link
              href={`${process.env.NEXT_PUBLIC_PORTAL_URL}/?id=${user?.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-indigo-600 hover:text-indigo-500 self-center"
            >
              Go to Customer Portal
            </Link>
          </section>
        }
      />
      <PageHeadings description="Your API key to access invoicio.io customer portal. This API key will be automatically send to your customers and will be needed to access invoices on a customer portal." />

      <section>
        <SectionWrapper class="lg:flex-row flex-wrap gap-5">
          <StatsCard
            currentTotal={charges?.totalCurrentCharges}
            previousTotal={`${charges?.totalLastMonthCharges} prev`}
            percentage={charges?.chargesPercentageGrowth}
            type="payments"
            title="Payments"
            link="/dashboard/charges"
            description={currentMonth()}
            isLoading={isLoading}
          />
          <StatsCard
            currentTotal={charges?.revenueCurrentMonth}
            previousTotal={`${charges?.revenueLastMonth} prev`}
            percentage={charges?.revenueGrowthRate}
            type="payments"
            title="Revenue"
            link="/dashboard/charges"
            description={currentMonth()}
            isLoading={isLoading}
          />
          <NumbersCard
            number={customers?.customersTotal}
            icon="customers"
            title="Total Customers"
            subDescription="Total Number of Customers"
            isLoading={isLoading}
          />
          <NumbersCard
            number={charges?.avgRevenuePerUserCurrentMonth}
            icon="customers"
            title="Current Month (RPC)"
            description={currentMonth()}
            subDescription="Revenue per Customer (RPC)"
            about="Revenue per Customer (RPC) is the average amount of money a customer spends on your products or services in a given period. It is calculated by dividing the total revenue generated in a month by the total number of customers in that month."
            isLoading={isLoading}
          />
          <NumbersCard
            number={charges?.avgRevenuePerUserLastMonth}
            icon="customers"
            title="Previous Month (RPC)"
            description={lastMonth()}
            subDescription="Revenue per Customer (RPC)"
            about="Revenue per Customer (RPC) is the average amount of money a customer spends on your products or services in a given period. It is calculated by dividing the total revenue generated in a month by the total number of customers in that month."
            isLoading={isLoading}
          />
          <NumbersCard
            number={charges?.totalCurrentSuccessfulCharges}
            icon="payments"
            title="Current Transactions"
            description={currentMonth()}
            subDescription="Total Successful Transactions"
            isLoading={isLoading}
          />
        </SectionWrapper>

        <Button
          title="View All Statistics & Reports"
          style="link"
          onClick={() => router.push('/dashboard/reports')}
          class="mt-10"
        />
      </section>
    </Wrapper>
  );
}
