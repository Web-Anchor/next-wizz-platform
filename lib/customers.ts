import 'server-only';
import {
  startOfMonth,
  endOfMonth,
  subMonths,
  format,
  parseISO,
} from 'date-fns';

export async function customers({ apiKey }: { apiKey?: string }) {
  try {
    console.log('👤 Computing user charges & stats');

    // --------------------------------------------------------------------------------
    // 📌  Compute stats for user account
    // --------------------------------------------------------------------------------
    const stripe = require('stripe')(apiKey);
    let customers: any = [];
    let hasMoreCustomers = true;

    while (hasMoreCustomers) {
      const res = await stripe.customers?.list({
        limit: 100,
      });

      customers = customers?.concat(res.data);
      hasMoreCustomers = res.has_more;
    }
    const customersCurrentMonth = customers?.filter((customer: any) => {
      const created = new Date(customer.created * 1000);
      return (
        created >= startOfMonth(new Date()) && created <= endOfMonth(new Date())
      );
    });
    const customersLastMonth = customers?.filter((customer: any) => {
      const created = new Date(customer.created * 1000);
      return (
        created >= startOfMonth(subMonths(new Date(), 1)) &&
        created <= endOfMonth(subMonths(new Date(), 1))
      );
    });

    const stats = {
      customers,
      customersCurrentMonth, // or Customer Acquisition Rate per month
      customersLastMonth,
      customersTotalCurrentMonth: customersCurrentMonth?.length,
      customersTotalLastMonth: customersLastMonth?.length,
      customersPercentageGrowth: Number(
        ((customersCurrentMonth?.length - customersLastMonth?.length) /
          customersLastMonth?.length) *
          100
      ).toFixed(2), // Customer Growth Rate:
      customersGrowthRate:
        customersCurrentMonth?.length - customersLastMonth?.length,
      // --------------------------------------------------------------------------------
      // 📌  Charge Stats
      // --------------------------------------------------------------------------------
      // Total Number of Customers:
      totalCustomers: customers?.length,
      // Customer Growth Rate current month:
      useCustomersCurrentMonthGrowth:
        customersCurrentMonth?.length - customersLastMonth?.length,
      // Customer Country Distribution: Customer Demographics Analysis:
      customerDemographics: customers?.reduce((acc: any, customer: any) => {
        const country = customer?.address?.country;
        if (acc[country]) {
          acc[country]++;
        } else {
          acc[country] = 1;
        }
        return acc;
      }, {}),
      // Customer preferred_locales:
      customerPreferredLocales: customers?.reduce((acc: any, customer: any) => {
        const locale = customer?.preferred_locales;
        if (acc[locale]) {
          acc[locale]++;
        } else {
          acc[locale] = 1;
        }
        return acc;
      }, {}),
      // customer currencies:
      customerCurrencies: customers?.reduce((acc: any, customer: any) => {
        const currency = customer?.currency;
        if (acc[currency]) {
          acc[currency]++;
        } else {
          acc[currency] = 1;
        }
        return acc;
      }, {}),
      // Customer Email Domain Distribution: Customer Segmentation:
      customerSegmentation: customers?.reduce((acc: any, customer: any) => {
        const email = customer?.email;
        if (acc[email]) {
          acc[email]++;
        } else {
          acc[email] = 1;
        }
        return acc;
      }, {}),
      customerCreationDateDistribution: customers?.reduce(
        (acc: any, customer: any) => {
          const created = new Date(customer.created * 1000);
          const date = format(created, 'yyyy-MM-dd');
          if (acc[date]) {
            acc[date]++;
          } else {
            acc[date] = 1;
          }
          return acc;
        },
        {}
      ),
      customerCreationDayOfWeek: customers?.reduce(
        (acc: any, customer: any) => {
          const createdDate = parseISO(
            new Date(customer.created * 1000).toISOString()
          );
          const dayOfWeek = format(createdDate, 'EEEE'); // 'EEEE' format gives the full name of the day of the week

          if (acc[dayOfWeek]) {
            acc[dayOfWeek]++;
          } else {
            acc[dayOfWeek] = 1;
          }
          return acc;
        },
        {}
      ),
      // Customer Last Activity Date:
      customerLastActivityDate: customers?.reduce((acc: any, customer: any) => {
        const lastActivity = customer?.metadata?.last_activity;
        if (acc[lastActivity]) {
          acc[lastActivity]++;
        } else {
          acc[lastActivity] = 1;
        }
        return acc;
      }, {}),
      // Customer Payment Method Distribution:
      customerPaymentMethod: customers?.reduce((acc: any, customer: any) => {
        const paymentMethod =
          customer?.invoice_settings?.default_payment_method;
        if (acc[paymentMethod]) {
          acc[paymentMethod]++;
        } else {
          acc[paymentMethod] = 1;
        }
        return acc;
      }, {}),
      // Customer Subscription Status:
      customerSubscriptionStatus: customers?.reduce(
        (acc: any, customer: any) => {
          const status = customer?.subscriptions?.data[0]?.status;
          if (acc[status]) {
            acc[status]++;
          } else {
            acc[status] = 1;
          }
          return acc;
        },
        {}
      ),
      // Average Customer Age: Customer Demographics Analysis:
      averageCustomerAge: customers?.reduce((acc: any, customer: any) => {
        const age = customer?.metadata?.age;
        if (acc[age]) {
          acc[age]++;
        } else {
          acc[age] = 1;
        }
        return acc;
      }, {}),
    };

    return stats;
  } catch (error: any) {
    console.error('🔑 error', error);
    return { error: error?.message };
  }
}

// --------------------------------------------------------------------------------
// 📌 Stripe customers API data:
// --------------------------------------------------------------------------------
// 1. Total Number of Customers: Count of all customers returned.
// 2. Customer Growth Rate: Percentage increase or decrease in the number of customers over a specific period.
// 3. Customer Acquisition Rate: Number of new customers acquired within a specific time frame.
// 4. Customer Churn Rate: Percentage of customers who stop using your service over a specific period.
// 5. Average Revenue Per Customer: Average revenue generated per customer over a specific period.
// 6. Customer Lifetime Value (CLV): Predicted revenue a customer will generate during their entire relationship with your business.
// 7. Customer Demographics Analysis: Analysis of customer demographics such as age, location, gender, etc.
// 8. Customer Segmentation: Grouping customers based on certain characteristics for targeted marketing strategies.
// 9. Subscription Rate: Percentage of customers subscribed to recurring services.
// 10. Average Time Between Purchases: Average time taken by customers to make repeat purchases.
// 11. Customer Retention Rate: Percentage of customers retained over a specific period.
// 12. Revenue per Customer Segment: Revenue generated per customer segment (e.g., new customers, loyal customers).
// 13. Customer Satisfaction Score (CSAT): Measure of customer satisfaction with your products or services.
// 14. Customer Lifetime Value vs. Customer Acquisition Cost (CLV:CAC): Comparison of the value a customer brings versus the cost of acquiring them.
// 15. Active vs. Inactive Customers: Number of active customers who made purchases recently compared to inactive customers?.
// Customer Count: Calculate the total number of customers returned by the customers?.list() API call. This metric provides a basic overview of the customer base.
// Average Customer Age: Calculate the average age of all customers based on their creation dates. This metric gives insight into the distribution of customer creation dates.
// Customer Country Distribution: Analyze the distribution of customers by country based on the country field in the customer data returned by the Stripe API.
// Customer Card Usage: Determine the percentage of customers who have added a payment card to their account. You can analyze the presence of card details in the customer data.
// Customer Email Domain Distribution: Analyze the distribution of customer email domains (e.g., gmail.com, yahoo.com) to understand the email providers used by customers?.
// Customer Subscription Status: Calculate the percentage of customers who have active subscriptions versus those who do not. This metric provides insights into subscription adoption among customers?.
// Customer Payment Method Distribution: Analyze the distribution of payment methods (credit card, bank transfer, etc.) used by customers for transactions.
// Customer Last Activity Date: Determine the last activity date for each customer to understand how recently they engaged with your platform or services.
// --------------------------------------------------------------------------------
