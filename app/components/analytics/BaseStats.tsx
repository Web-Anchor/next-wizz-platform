'use client';

import { SectionWrapper } from '@app/components/Wrapper';
import StatsCard from '@app/components/StatsCard';
import PieChart from '@app/components/analytics/PieChart';
import NumbersCard from '@app/components/NumbersCard';
import PageHeadings from '@components/PageHeadings';
import { useStatistics } from '@hooks/statistics';
import {
  convertObjToArray,
  currentMonth,
  last7Days,
  lastMonth,
} from '@helpers/index';

export default function BaseStats() {
  const { charges, customers, isLoading } = useStatistics({
    type: 'advanced',
  });
  const pieClass = 'lg:max-w-[calc(50%-5rem)] h-[360px]';

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
          title="Customers Last 7 Days"
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
        <PieChart
          title={`Geographical Customer\nDistribution`}
          data={convertObjToArray(customers?.customerDemographics)}
          class={pieClass}
          loading={isLoading}
          type="pie"
        />
        <PieChart
          title={`Preferred Customer\nLocales`}
          data={convertObjToArray(customers?.customerPreferredLocales)}
          class={pieClass}
          loading={isLoading}
          type="pie"
        />
        <PieChart
          title={`Customer Currency\nDistribution`}
          data={convertObjToArray(customers?.customerCurrencies)}
          class={pieClass}
          loading={isLoading}
          type="pie"
        />
        <PieChart
          title={`Customer Creation\nDay of Week`}
          data={convertObjToArray(customers?.customerCreationDayOfWeek)}
          class={pieClass}
          loading={isLoading}
          type="pie"
        />
        <PieChart
          title={`Customer Creation\nDay of Week`}
          data={convertObjToArray(customers?.customerCreationDayOfWeek)}
          class={pieClass}
          loading={isLoading}
          type="radial"
        />
        <PieChart
          title={`Customer Payment\nMethod Distribution`}
          data={convertObjToArray(customers?.customerPaymentMethod)}
          class={pieClass}
          loading={isLoading}
          type="radial"
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
        <StatsCard
          currentTotal={charges?.totalCurrentCharges}
          previousTotal={`${charges?.totalLastMonthCharges} prev`}
          percentage={charges?.chargesPercentageGrowth}
          type="payments"
          title="Transactions"
          link="/dashboard/charges"
          description={currentMonth()}
        />

        <PageHeadings title="Advanced Revenue Analytics Suite" />
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

        <PageHeadings
          title="Revenue Insights Pro"
          description="Elevate your revenue analysis with our Advanced Revenue Analytics Suite, offering sophisticated chart components for in-depth financial metrics exploration. Uncover revenue trends, customer spending patterns, and subscription performance to drive strategic decision-making."
          slogan="Charting Success, Unveiling Opportunities!"
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
        <NumbersCard
          number={charges?.subscriptionRenewalRateCurrentMonth}
          icon="payments"
          title="Current Subscription Renewal Rate"
          description={currentMonth()}
          subDescription="Subscription Renewal Rate"
        />
      </SectionWrapper>
      <SectionWrapper class="lg:flex-row flex-wrap gap-5">
        <PieChart
          title={`Charges Source\nBrand Distribution`}
          data={convertObjToArray(
            charges?.chargesSourceBrandDistributionCurrentMonth
          )}
          class={pieClass}
          loading={isLoading}
          type="radial"
        />
        <PieChart
          title={`Charges Source\nBrand Distribution`}
          data={convertObjToArray(
            charges?.chargesSourceFundingDistributionCurrentMonth
          )}
          class={pieClass}
          loading={isLoading}
          type="pie"
        />
        <PieChart
          title={`Risk Score\nDistribution`}
          data={convertObjToArray(charges?.riskScoreDistributionCurrentMonth)}
          class={pieClass}
          loading={isLoading}
          type="pie"
        />
      </SectionWrapper>
    </SectionWrapper>
  );
}

// Charges Insights Module
// Name: Revenue Explorer
// Description: Dive into detailed revenue analytics, transaction trends, and payment performance metrics with our Charges Insights Module. Unlock valuable insights into your financial data to optimize revenue streams and drive business growth.
// Slogan: "Navigate Revenue Waters, Chart Your Success!"

// Customers Insights Module
// Name: Customer Pulse
// Description: Get a pulse on customer behavior, lifetime value trends, and acquisition insights with our Customers Insights Module. Understand your customer base better, segment effectively, and enhance retention strategies for sustainable growth.
// Slogan: "Connecting with Customers, Growing Together!"
