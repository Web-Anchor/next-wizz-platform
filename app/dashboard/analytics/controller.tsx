'use client';

import PageHeadings from '@app/components/PageHeadings';
import Wrapper from '@app/components/Wrapper';
import { SectionWrapper } from '@app/components/Wrapper';
import StatsCard from '@app/components/StatsCard';
import PieChart from '@app/components/analytics/PieChart';
import NumbersCard from '@app/components/NumbersCard';
import { useStatistics } from '@hooks/index';
import {
  convertObjToArray,
  currentMonth,
  last7Days,
  lastMonth,
} from '@helpers/index';

export default function Page() {
  const { charges, customers, isLoading } = useStatistics({
    type: 'advanced',
  });

  return (
    <Wrapper>
      <PageHeadings
        title="Reports Hub. Gain Insights, Drive Decisions."
        description="Explore comprehensive reports and analytics on our Reports page to gain valuable insights into your financial data. Track performance metrics, monitor trends, and make informed decisions to drive your business forward. Leverage data-driven insights to optimize your strategies and achieve success."
        slogan="Informed Decisions, Thriving Business - Your Data, Your Power!"
      />

      <SectionWrapper class="lg:flex-row flex-wrap gap-5">
        <PageHeadings
          title="Advanced Revenue Analytics Suite"
          description=" Dive into detailed revenue analytics, transaction trends, and payment performance metrics with our Charges Insights Module. Unlock valuable insights into your financial data to optimize revenue streams and drive business growth."
          slogan="Navigate Revenue Waters, Chart Your Success!"
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
          loading={isLoading}
          type="pie"
          description="Visualize the distribution of your customers across different regions on a map to gain insights into where your customer base is located."
        />
        <PieChart
          title={`Preferred Customer\nLocales`}
          data={convertObjToArray(customers?.customerPreferredLocales)}
          loading={isLoading}
          type="pie"
          description="Identify the top locations where your customers are concentrated, helping you target specific regions for marketing and growth strategies."
        />
        <PieChart
          title={`Customer Currency\nDistribution`}
          data={convertObjToArray(customers?.customerCurrencies)}
          loading={isLoading}
          type="pie"
          description="Analyze the currencies used by your customers for transactions to optimize pricing strategies and tailor payment options based on popular currencies."
        />
        <PieChart
          title={`Customer Creation\nDay of Week`}
          data={convertObjToArray(customers?.customerCreationDayOfWeek)}
          loading={isLoading}
          type="radial"
          description="Chart the distribution of payment methods preferred by customers to understand their payment preferences and optimize payment processing options for a seamless customer experience."
        />
        <PieChart
          title={`Customer Payment\nMethod Distribution`}
          data={convertObjToArray(customers?.customerPaymentMethod)}
          loading={isLoading}
          type="radial"
          description="Visualize the distribution of payment methods used by customers to understand preferred payment options and tailor your payment processing strategies accordingly."
        />
      </SectionWrapper>

      <SectionWrapper class="lg:flex-row flex-wrap gap-5">
        <PageHeadings
          title="Revenue Insights & Trends."
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
          title={`Charges Source\nFunding Distribution`}
          data={convertObjToArray(
            charges?.chargesSourceFundingDistributionCurrentMonth
          )}
          loading={isLoading}
          type="pie"
          description="Chart the distribution of charge funding sources (e.g., credit cards, bank accounts) to track payment trends and optimize payment processing methods based on customer preferences."
        />
        <PieChart
          title={`Charges Source\n By Brand Distribution`}
          data={convertObjToArray(
            charges?.chargesSourceBrandDistributionCurrentMonth
          )}
          loading={isLoading}
          type="radial"
          description="Analyze the distribution of charges by different brands or sources to identify top-performing sources and optimize marketing strategies for each brand."
        />
        <PieChart
          title={`Risk Score\nDistribution`}
          data={convertObjToArray(charges?.riskScoreDistributionCurrentMonth)}
          loading={isLoading}
          type="pie"
          description="Evaluate the distribution of risk scores assigned to transactions to assess potential fraud risks and implement targeted risk management measures for fraud prevention."
        />
        <PieChart
          title={`Risk Level\nDistribution`}
          data={convertObjToArray(charges?.riskLevelDistributionCurrentMonth)}
          loading={isLoading}
          type="pie"
          description="Categorize risk levels associated with transactions to identify high-risk activities and implement appropriate security measures to mitigate risks effectively."
        />
      </SectionWrapper>
    </Wrapper>
  );
}
