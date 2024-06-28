import 'server-only';
import { startOfMonth, endOfMonth, subMonths } from 'date-fns';

export async function charges({ apiKey }: { apiKey?: string }) {
  try {
    console.log('👤 Computing user charges & stats');

    // --------------------------------------------------------------------------------
    // 📌  Compute stats for user account
    // --------------------------------------------------------------------------------
    const stripe = require('stripe')(apiKey);
    let chargesCurrentMont: any = [];
    let hasMoreChargesCM = true;

    while (hasMoreChargesCM) {
      const res = await stripe.charges.list({
        limit: 100,
        created: {
          gte: startOfMonth(subMonths(new Date(), 1)),
        },
      });

      chargesCurrentMont = chargesCurrentMont.concat(res?.data);
      hasMoreChargesCM = res.has_more;
    }

    let chargesLastMonth: any = [];
    let hasMoreChargesLM = true;

    while (hasMoreChargesLM) {
      const res = await stripe.charges.list({
        limit: 100,
        created: {
          gte: startOfMonth(subMonths(new Date(), 1)),
          lte: endOfMonth(subMonths(new Date(), 1)),
        },
      });

      chargesLastMonth = chargesLastMonth.concat(res?.data);
      hasMoreChargesLM = res.has_more;
    }

    const revenueCurrentMonth = chargesCurrentMont.reduce(
      (acc: number, charge: any) => acc + charge.amount,
      0
    );
    const revenueLastMonth = chargesLastMonth.reduce(
      (acc: number, charge: any) => acc + charge.amount,
      0
    );

    console.log(chargesCurrentMont?.length, chargesLastMonth?.length);

    const stats = {
      chargesCurrentMont,
      chargesLastMonth,
      // --------------------------------------------------------------------------------
      // 📌  Charge Stats
      // --------------------------------------------------------------------------------
      // Total Revenue:
      revenueCurrentMonth: chargesConversion(revenueCurrentMonth),
      revenueLastMonth: chargesConversion(revenueLastMonth),
      // revenue growth rate
      revenueGrowthRate: handleNaN(
        Number(
          ((revenueCurrentMonth - revenueLastMonth) / revenueLastMonth) * 100
        ).toFixed(2)
      ), // Revenue Growth Rate:
      totalCurrentCharges: chargesCurrentMont.length,
      totalLastMonthCharges: chargesLastMonth.length,
      chargesPercentageGrowth: handleNaN(
        Number(
          ((chargesCurrentMont?.length - chargesLastMonth?.length) /
            chargesLastMonth?.length) *
            100
        ).toFixed(2)
      ), // Charge Growth Rate:
      // Number of Successful Charges:
      totalCurrentSuccessfulCharges: chargesCurrentMont.filter(
        (charge: any) => charge.status === 'succeeded'
      ).length,
      totalLastMonthSuccessfulCharges: chargesLastMonth.filter(
        (charge: any) => charge.status === 'succeeded'
      ).length,
      // Number of Failed Charges:
      totalCurrentFailedCharges: chargesCurrentMont.filter(
        (charge: any) => charge.status === 'failed'
      ).length,
      totalLastMonthFailedCharges: chargesLastMonth.filter(
        (charge: any) => charge.status === 'failed'
      ).length,
      // Total Refunds:
      totalCurrentRefunds: chargesCurrentMont.filter(
        (charge: any) => charge.refunded
      ).length,
      totalLastMonthRefunds: chargesLastMonth.filter(
        (charge: any) => charge.refunded
      ).length,
      // Total Refund Amount:
      totalCurrentRefundAmount: chargesCurrentMont.reduce(
        (acc: number, charge: any) => acc + charge.amount_refunded,
        0
      ),
      totalLastMonthRefundAmount: chargesLastMonth.reduce(
        (acc: number, charge: any) => acc + charge.amount_refunded,
        0
      ),
      // Average Transaction Value:
      avgTransactionValueCurrentMonth: chargesConversion(
        chargesCurrentMont.reduce(
          (acc: number, charge: any) => acc + charge.amount,
          0
        ) / chargesCurrentMont.length
      ),
      avgTransactionValueLastMonth: chargesConversion(
        chargesLastMonth.reduce(
          (acc: number, charge: any) => acc + charge.amount,
          0
        ) / chargesLastMonth.length
      ),
      // Payment Success Rate
      paymentSuccessRateCurrentMonth:
        chargesCurrentMont.filter(
          (charge: any) => charge.status === 'succeeded'
        ).length / chargesCurrentMont.length,
      paymentSuccessRateLastMonth:
        chargesLastMonth.filter((charge: any) => charge.status === 'succeeded')
          .length / chargesLastMonth.length,
      // Failed Transaction Rate
      failedTransactionRateCurrentMonth:
        chargesCurrentMont.filter((charge: any) => charge.status === 'failed')
          .length / chargesCurrentMont.length,
      failedTransactionRateLastMonth:
        chargesLastMonth.filter((charge: any) => charge.status === 'failed')
          .length / chargesLastMonth.length,
      // Refund Rate:
      refundRateCurrentMonth:
        chargesCurrentMont.filter((charge: any) => charge.refunded).length /
        chargesCurrentMont.length,
      refundRateLastMonth:
        chargesLastMonth.filter((charge: any) => charge.refunded).length /
        chargesLastMonth.length,
      // Payment Method Distribution
      paymentMethodDistributionCurrentMonth: chargesCurrentMont.reduce(
        (acc: any, charge: any) => {
          if (!acc[charge.payment_method_details.type]) {
            acc[charge.payment_method_details.type] = 1;
          } else {
            acc[charge.payment_method_details.type]++;
          }
          return acc;
        },
        {}
      ),
      paymentMethodDistributionLastMonth: chargesLastMonth.reduce(
        (acc: any, charge: any) => {
          if (!acc[charge.payment_method_details.type]) {
            acc[charge.payment_method_details.type] = 1;
          } else {
            acc[charge.payment_method_details.type]++;
          }
          return acc;
        },
        {}
      ),
      // Chargeback Rate:
      chargebackRateCurrentMonth:
        chargesCurrentMont.filter((charge: any) => charge.dispute).length /
        chargesCurrentMont.length,
      chargebackRateLastMonth:
        chargesLastMonth.filter((charge: any) => charge.dispute).length /
        chargesLastMonth.length,
      // Average Revenue Per User (ARPU):
      avgRevenuePerUserCurrentMonth: chargesConversion(
        chargesCurrentMont.reduce(
          (acc: number, charge: any) => acc + charge.amount,
          0
        ) / chargesCurrentMont.length
      ),
      avgRevenuePerUserLastMonth: chargesConversion(
        chargesLastMonth.reduce(
          (acc: number, charge: any) => acc + charge.amount,
          0
        ) / chargesLastMonth.length
      ),
      // Monthly Active Customers:
      totalCurrentCustomerDistribution: chargesCurrentMont.reduce(
        (acc: any, charge: any) => {
          if (!acc[charge.customer]) {
            acc[charge.customer] = 1;
          }
          return acc;
        },
        {}
      ),
      totalLastMonthCustomerDistribution: chargesLastMonth.reduce(
        (acc: any, charge: any) => {
          if (!acc[charge?.customer]) {
            acc[charge?.customer] = 1;
          }
          return acc;
        },
        {}
      ),
      // Average Time to Payment Confirmation:
      avgTimeToPaymentConfirmationCurrentMonth:
        chargesCurrentMont.reduce(
          (acc: number, charge: any) => acc + charge.created - charge.created,
          0
        ) / chargesCurrentMont.length,
      avgTimeToPaymentConfirmationLastMonth:
        chargesLastMonth.reduce(
          (acc: number, charge: any) => acc + charge.created - charge.created,
          0
        ) / chargesLastMonth.length,
      // Geographical Distribution of Sales based on country:
      geographicalDistributionCurrentMonth: chargesCurrentMont.reduce(
        (acc: any, charge: any) => {
          if (!acc[charge?.payment_method_details?.card.country]) {
            acc[charge?.payment_method_details.card?.country] = 1;
          } else {
            acc[charge?.payment_method_details?.card.country]++;
          }
          return acc;
        },
        {}
      ),
      geographicalDistributionLastMonth: chargesLastMonth.reduce(
        (acc: any, charge: any) => {
          if (!acc[charge?.payment_method_details?.card.country]) {
            acc[charge?.payment_method_details?.card.country] = 1;
          } else {
            acc[charge?.payment_method_details?.card.country]++;
          }
          return acc;
        },
        {}
      ),
      // Subscription Renewal Rate
      subscriptionRenewalRateCurrentMonth:
        chargesCurrentMont.filter(
          (charge: any) => charge.status === 'succeeded'
        ).length /
        chargesCurrentMont.filter(
          (charge: any) => charge.status === 'succeeded'
        ).length,
      // charges source brand distribution
      chargesSourceBrandDistributionCurrentMonth: chargesCurrentMont.reduce(
        (acc: any, charge: any) => {
          if (!acc[charge?.source?.brand]) {
            acc[charge?.source?.brand] = 1;
          } else {
            acc[charge?.source?.brand]++;
          }
          return acc;
        },
        {}
      ),
      // charges source funding distribution
      chargesSourceFundingDistributionCurrentMonth: chargesCurrentMont.reduce(
        (acc: any, charge: any) => {
          if (!acc[charge?.source?.funding]) {
            acc[charge?.source?.funding] = 1;
          } else {
            acc[charge?.source?.funding]++;
          }
          return acc;
        },
        {}
      ),
      // risk_score distribution
      riskScoreDistributionCurrentMonth: chargesCurrentMont.reduce(
        (acc: any, charge: any) => {
          if (!acc[charge?.outcome?.risk_score]) {
            acc[charge?.outcome?.risk_score] = 1;
          } else {
            acc[charge?.outcome?.risk_score]++;
          }
          return acc;
        },
        {}
      ),
      // risk_level distribution
      riskLevelDistributionCurrentMonth: chargesCurrentMont.reduce(
        (acc: any, charge: any) => {
          if (!acc[charge?.outcome?.risk_level]) {
            acc[charge?.outcome?.risk_level] = 1;
          } else {
            acc[charge?.outcome?.risk_level]++;
          }
          return acc;
        },
        {}
      ),
    };

    return stats;
  } catch (error: any) {
    console.error('🔑 error', error);
    return { error: error?.message };
  }
}

function chargesConversion(charge: number): number {
  // --------------------------------------------------------------------------------
  // 📌  Conversion from cents to dollars
  // --------------------------------------------------------------------------------
  if (charge && charge > 0) {
    return Number((charge / 100).toFixed(2));
  }

  return charge;
}

function handleNaN(value: any): number {
  if (isNaN(value)) {
    return 0;
  }
  return value;
}

// --------------------------------------------------------------------------------
// 📌 Stripe charges API data:
// --------------------------------------------------------------------------------
// 1. Total Revenue: Sum of the amount field from all successful charges.
// 2. Number of Successful Charges: Count of all successful charges returned.
// 3. Total Refunds: Sum of the amount field from all refunds.
// 4. Average Transaction Value: Average amount per transaction.
// 5. Payment Success Rate: Percentage of successful payments out of total payments.
// 6. Failed Transaction Rate: Percentage of failed transactions out of total transactions.
// 7. Chargeback Rate: Percentage of chargebacks relative to total charges.
// 8. Refund Rate: Percentage of refunds relative to total charges.
// 9. Payment Method Distribution: Distribution of payments across different payment methods.
// 10. Revenue Trend Analysis: Trend analysis of revenue over time.
// 11. Customer Acquisition Cost (CAC): Cost of acquiring a new customer based on total charges and marketing expenses.
// 12. Customer Lifetime Value (CLV): Predicted revenue a customer will generate during their entire relationship with your business.
// 13. Churn Rate: Percentage of customers who stop using your service over a specific period.
// 14. Average Revenue Per User (ARPU): Average revenue generated by each customer over a specific period.
// 15. Subscription Renewal Rate: Percentage of customers who renew their subscription.
// 16. Monthly Active Customers: Number of unique customers who made at least one charge in a month.
// 17. Average Time to Payment Confirmation: Average time taken to confirm a payment.
// 18. Geographical Distribution of Sales: Distribution of sales by geographic region.
// --------------------------------------------------------------------------------
