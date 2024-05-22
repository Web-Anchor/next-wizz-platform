import 'server-only';
import { startOfMonth, endOfMonth, subMonths } from 'date-fns';

export async function charges({ apiKey }: { apiKey?: string }) {
  try {
    console.log('👤 Computing user charges & stats');

    // --------------------------------------------------------------------------------
    // 📌  Compute stats for user account
    // --------------------------------------------------------------------------------
    const stripe = require('stripe')(apiKey);
    const CHARGE_ADJUSTMENT = 100; // 📌 Stripe charges amount in cents
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

    const stats = {
      chargesCurrentMont,
      chargesLastMonth,
      // --------------------------------------------------------------------------------
      // 📌  Charge Stats
      // --------------------------------------------------------------------------------
      // Total Revenue:
      revenueCurrentMonth: chargesCurrentMont.reduce(
        (acc: number, charge: any) => acc + charge.amount,
        0
      ),
      revenueLastMonth: chargesLastMonth.reduce(
        (acc: number, charge: any) => acc + charge.amount,
        0
      ),
      // Number of Charges:
      totalCurrentCharges: chargesCurrentMont.length,
      totalLastMonthCharges: chargesLastMonth.length,
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
      avgTransactionValueCurrentMonth:
        chargesCurrentMont.reduce(
          (acc: number, charge: any) => acc + charge.amount,
          0
        ) / chargesCurrentMont.length,
      avgTransactionValueLastMonth:
        chargesLastMonth.reduce(
          (acc: number, charge: any) => acc + charge.amount,
          0
        ) / chargesLastMonth.length,
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
      avgRevenuePerUserCurrentMonth:
        chargesCurrentMont.reduce(
          (acc: number, charge: any) => acc + charge.amount,
          0
        ) / chargesCurrentMont.length,
      avgRevenuePerUserLastMonth:
        chargesLastMonth.reduce(
          (acc: number, charge: any) => acc + charge.amount,
          0
        ) / chargesLastMonth.length,
      // Monthly Active Customers:
      totalCurrentCustomers: chargesCurrentMont.reduce(
        (acc: any, charge: any) => {
          if (!acc[charge.customer]) {
            acc[charge.customer] = 1;
          }
          return acc;
        },
        {}
      ),
      totalLastMonthCustomers: chargesLastMonth.reduce(
        (acc: any, charge: any) => {
          if (!acc[charge.customer]) {
            acc[charge.customer] = 1;
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
          if (!acc[charge.payment_method_details.card.country]) {
            acc[charge.payment_method_details.card.country] = 1;
          } else {
            acc[charge.payment_method_details.card.country]++;
          }
          return acc;
        },
        {}
      ),
      geographicalDistributionLastMonth: chargesLastMonth.reduce(
        (acc: any, charge: any) => {
          if (!acc[charge.payment_method_details.card.country]) {
            acc[charge.payment_method_details.card.country] = 1;
          } else {
            acc[charge.payment_method_details.card.country]++;
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
    };

    return stats;
  } catch (error: any) {
    console.error('🔑 error', error);
    return { error: error?.message };
  }
}

// --------------------------------------------------------------------------------
// 📌 Based on the data returned by stripe.charges.list(), you can compute various statistics and metrics to gain insights into your payment transactions. Here is a list of possible statistics and metrics you can calculate based on the Stripe charges API data:
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
