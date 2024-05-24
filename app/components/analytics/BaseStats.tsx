'use client';

import { SectionWrapper } from '@app/components/Wrapper';
import { format, addMonths, startOfMonth, addDays } from 'date-fns';
import StatsCard from '@app/components/StatsCard';
import Pie from '@app/components/analytics/Pie';
import NumbersCard from '@app/components/NumbersCard';
import PageHeadings from '@components/PageHeadings';
import { useStatistics } from '@hooks/statistics';
import RadialBar from '@components/analytics/RadialBar';

export default function BaseStats() {
  const { data, charges, customers, isLoading } = useStatistics({
    type: 'advanced',
  });
  const pieClass = 'lg:max-w-[calc(50%-5rem)] h-[360px]';
  console.log('🚧 API Stats ', customers);

  return (
    <SectionWrapper>
      <SectionWrapper class="lg:flex-row flex-wrap gap-5">
        <StatsCard
          currentTotal={customers?.customersTotalCurrentMonth}
          previousTotal={`${customers?.customersTotalLastMonth} prev`}
          percentage={customers?.customersPercentageGrowth}
          type="customers"
          title="Customer Growth Rate"
          link="/dashboard/customers"
          description={currentMonth()}
        />
        <NumbersCard
          number={customers?.customersTotal}
          icon="customers"
          title="Total Customers"
          subDescription="Total Number of Customers"
        />
        <NumbersCard
          number={customers?.useCustomersCurrentMonthGrowth}
          icon="customers"
          title="Customer Growth Rate"
          description={lastMonth()}
          subDescription="Customer Growth Rate"
        />

        <PageHeadings
          title="Customer Pulse."
          description="Visualize key metrics from Stripe charges and customers API data in an easy-to-understand format with our Basic Charts Component. Gain insights into revenue trends, customer behavior, and payment performance at a glance."
          slogan="Simplify Insights, Drive Growth - Charting Your Success!"
        />

        <NumbersCard
          number={customers?.customersLast7Days}
          icon="customers"
          title="Last 7 Days Customers"
          description={last7Days()}
          subDescription="Total Number of Customers"
        />
        <NumbersCard
          number={customers?.customersTotalCurrentMonth}
          icon="customers"
          title="Current Month Customers Growth"
          description={currentMonth()}
          subDescription="Total Number of Customers"
        />
        <NumbersCard
          number={customers?.customersTotalLastMonth}
          icon="customers"
          title="Last Month Customers Growth"
          description={lastMonth()}
          subDescription="Total Number of Customers"
        />
      </SectionWrapper>
      <SectionWrapper class="lg:flex-row flex-wrap gap-5">
        <PageHeadings
          title="Advanced Customer Analytics."
          description="Get a pulse on customer behavior, lifetime value trends, and acquisition insights with our Customers Insights Module. Understand your customer base better, segment effectively, and enhance retention strategies for sustainable growth."
          slogan="Connecting with Customers, Growing Together!"
          class="order-1 lg:-order-none"
        />
        <Pie
          title={`Geographical Customer\nDistribution`}
          data={convertObjToArray(customers?.customerDemographics)}
          class={pieClass}
          loading={isLoading}
        />
        <Pie
          title={`Preferred Customer\nLocales`}
          data={convertObjToArray(customers?.customerPreferredLocales)}
          class={pieClass}
          loading={isLoading}
        />
        <Pie
          title={`Customer Currency\nDistribution`}
          data={convertObjToArray(customers?.customerCurrencies)}
          class={pieClass}
          loading={isLoading}
        />
        <Pie
          title={`Customer Creation\nDay of Week`}
          data={convertObjToArray(customers?.customerCreationDayOfWeek)}
          class={pieClass}
          loading={isLoading}
        />
        <RadialBar
          title={`Customer Creation\nDay of Week`}
          data={convertObjToArray(customers?.customerCreationDayOfWeek)}
          class={pieClass}
          loading={isLoading}
        />
        <RadialBar
          title={`Customer Payment\nMethod Distribution`}
          data={convertObjToArray(customers?.customerPaymentMethod)}
          class={pieClass}
          loading={isLoading}
        />
      </SectionWrapper>

      <SectionWrapper class="lg:flex-row flex-wrap gap-5">
        <PageHeadings
          title="Revenue Explorer"
          description=" Dive into detailed revenue analytics, transaction trends, and payment performance metrics with our Charges Insights Module. Unlock valuable insights into your financial data to optimize revenue streams and drive business growth."
          slogan="Navigate Revenue Waters, Chart Your Success!"
        />
        <StatsCard
          currentTotal={charges?.totalCurrentCharges}
          previousTotal={`${charges?.totalLastMonthCharges} prev`}
          percentage={charges?.chargesPercentageGrowth}
          type="payments"
          title="Payments"
          link="/dashboard/charges"
          description={currentMonth()}
        />
        <StatsCard
          currentTotal={charges?.revenueCurrentMonth}
          previousTotal={`${charges?.revenueLastMonth} prev`}
          percentage={charges?.revenueGrowthRate}
          type="payments"
          title="Revenue"
          link="/dashboard/charges"
          description={currentMonth()}
        />

        <NumbersCard
          number={charges?.avgRevenuePerUserCurrentMonth}
          icon="customers"
          title="Current Month (RPC)"
          description={currentMonth()}
          subDescription="Revenue per Customer (RPC)"
          about="Revenue per Customer (RPC) is the average amount of money a customer spends on your products or services in a given period. It is calculated by dividing the total revenue generated in a month by the total number of customers in that month."
        />
        <NumbersCard
          number={charges?.avgRevenuePerUserLastMonth}
          icon="customers"
          title="Previous Month (RPC)"
          description={lastMonth()}
          subDescription="Revenue per Customer (RPC)"
          about="Revenue per Customer (RPC) is the average amount of money a customer spends on your products or services in a given period. It is calculated by dividing the total revenue generated in a month by the total number of customers in that month."
        />

        <StatsCard
          currentTotal={charges?.totalCurrentCharges}
          previousTotal={`${charges?.totalLastMonthCharges} prev`}
          percentage={charges?.chargesPercentageGrowth}
          type="payments"
          title="Transactions"
          link="/dashboard/charges"
          description={currentMonth()}
        />
        <NumbersCard
          number={charges?.totalCurrentSuccessfulCharges}
          icon="payments"
          title="Current Transactions"
          description={currentMonth()}
          subDescription="Total Successful Transactions"
        />
        <NumbersCard
          number={charges?.totalLastMonthSuccessfulCharges}
          icon="payments"
          title="Previous Month Transactions"
          description={lastMonth()}
          subDescription="Total Successful Transactions"
        />

        <NumbersCard
          number={charges?.totalCurrentSuccessfulCharges}
          icon="payments"
          title="Current Successful Transactions"
          description={currentMonth()}
          subDescription="Total Successful Transactions"
        />
        <NumbersCard
          number={charges?.totalLastMonthSuccessfulCharges}
          icon="payments"
          title="Previous Month Successful Transactions"
          description={lastMonth()}
          subDescription="Total Successful Transactions"
        />

        <NumbersCard
          number={charges?.totalCurrentFailedCharges}
          icon="payments"
          title="Current Failed Transactions"
          description={currentMonth()}
          subDescription="Total Failed Transactions"
        />
        <NumbersCard
          number={charges?.totalLastMonthFailedCharges}
          icon="payments"
          title="Previous Month Failed Transactions"
          description={lastMonth()}
          subDescription="Total Failed Transactions"
        />

        <NumbersCard
          number={charges?.totalCurrentRefunds}
          icon="payments"
          title="Current Refunds"
          description={currentMonth()}
          subDescription="Total Refunds"
        />
        <NumbersCard
          number={charges?.totalLastMonthRefunds}
          icon="payments"
          title="Previous Month Refunds"
          description={lastMonth()}
          subDescription="Total Refunds"
        />

        <NumbersCard
          number={charges?.totalCurrentRefundAmount}
          icon="payments"
          title="Current Refund Amount"
          description={currentMonth()}
          subDescription="Total Refunds"
        />
        <NumbersCard
          number={charges?.totalLastMonthRefundAmount}
          icon="payments"
          title="Previous Month Refund Amount"
          description={lastMonth()}
          subDescription="Total Refunds"
        />
      </SectionWrapper>
      <Pie
        title={`Geographical Customer\nDistribution`}
        data={convertObjToArray(charges?.geographicalDistributionCurrentMonth)}
        labelPosition="outside"
      />
    </SectionWrapper>
  );
}

function currentMonth() {
  const currentDate = new Date();
  const startOfMonthDate = startOfMonth(currentDate);
  const nextMonthStartDate = startOfMonth(addMonths(currentDate, 1));

  const formattedStartOfMonth = format(startOfMonthDate, 'MMM do');
  const formattedNextMonthStart = format(nextMonthStartDate, 'MMM do');

  return `${formattedStartOfMonth} - ${formattedNextMonthStart}`;
}

function lastMonth() {
  const currentDate = new Date();
  const startOfMonthDate = startOfMonth(currentDate);
  const lastMonthStartDate = startOfMonth(addMonths(currentDate, -1));
  const lastMonthEndDate = startOfMonth(currentDate);

  const formattedStartOfMonth = format(lastMonthStartDate, 'MMM do');
  const formattedEndOfMonth = format(lastMonthEndDate, 'MMM do');

  return `${formattedStartOfMonth} - ${formattedEndOfMonth}`;
}

function last7Days() {
  const currentDate = new Date();
  const last7Days = addDays(currentDate, -7);

  return `${format(last7Days, 'MMM do')} - ${format(currentDate, 'MMM do')}`;
}

function convertObjToArray(input?: {
  [key: string]: number;
}): { name?: string; value?: number }[] {
  console.log('INPUT ', input);

  if (!input) {
    return [];
  }

  return Object.entries(input)?.map(([name, value]) => ({ name, value }));
}

// Charges Insights Module
// Name: Revenue Explorer
// Description: Dive into detailed revenue analytics, transaction trends, and payment performance metrics with our Charges Insights Module. Unlock valuable insights into your financial data to optimize revenue streams and drive business growth.
// Slogan: "Navigate Revenue Waters, Chart Your Success!"

// Customers Insights Module
// Name: Customer Pulse
// Description: Get a pulse on customer behavior, lifetime value trends, and acquisition insights with our Customers Insights Module. Understand your customer base better, segment effectively, and enhance retention strategies for sustainable growth.
// Slogan: "Connecting with Customers, Growing Together!"
