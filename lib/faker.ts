import { faker } from '@faker-js/faker';

const emailList: string[] = Array.from({ length: 20 }, () =>
  faker.internet.email()
);
const dateList = Array.from(
  { length: 20 },
  () =>
    faker.date.between({ from: '2024-06-01', to: '2024-06-24' }).getTime() /
    1000
);
const numberList = Array.from({ length: 20 }, () =>
  faker.number.int({ max: 25 })
);
const cardIssueList: string[] = Array.from({ length: 10 }, () =>
  faker.finance.creditCardIssuer()
);
const countryCodeList = Array.from({ length: 10 }, () =>
  faker.address.countryCode()
);
const currencyList = Array.from({ length: 10 }, () =>
  faker.finance.currencyCode()
);
const phoneList = Array.from({ length: 10 }, () => faker.phone.number());
const daysOfWeekList = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];
const paymentList = ['card', 'paypal', 'debit', 'eft', 'lk', 'mpesa'];

export function fakerUser() {
  const blob = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    imageUrl: faker.image.urlLoremFlickr({
      category: 'person',
      width: 40,
      height: 40,
    }),
  };

  return blob as any;
}

export function fakerCharges() {
  const blob = Array.from({ length: 5 }, () => ({
    id: faker.string.uuid(),
    amount: faker.finance.amount(),
    billing_details: {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      address: {
        line1: faker.location.streetAddress(),
        city: faker.location.city(),
        state: faker.location.state(),
        postal_code: faker.location.zipCode(),
        country: faker.location.country(),
      },
    },
    calculated_statement_descriptor: faker.finance.transactionDescription(),
    created:
      faker.date.between({ from: '2024-06-01', to: '2024-06-24' }).getTime() /
      1000,
    currency: faker.finance.currencyCode(),
    customer: faker.string.uuid(),
    description: faker.finance.transactionDescription(),
    receipt_url: faker.internet.url(),
    status: faker.finance.transactionType(),
    paid: faker.datatype.boolean({ probability: 90 }),
  }));

  return blob as any;
}

export function fakerCustomers() {
  const blob = Array.from({ length: 8 }, () => ({
    id: faker.string.uuid(),
    address: {
      line1: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      postal_code: faker.location.zipCode(),
      country: faker.location.country(),
    },
    balance: faker.finance.amount(),
    created: faker.defaultRefDate().getTime() / 1000,
    name: faker.person.fullName(),
    email: faker.internet.email(),
    currency: faker.finance.currencyCode(),
  }));

  return blob as any;
}

export function fakerStatsCharges() {
  const blob = {
    avgRevenuePerUserCurrentMonth: faker.finance.amount(),
    avgRevenuePerUserLastMonth: faker.finance.amount(),
    avgTimeToPaymentConfirmationCurrentMonth: faker.number.int({ max: 100 }),
    avgTimeToPaymentConfirmationLastMonth: faker.number.int({ max: 100 }),
    avgTransactionValueCurrentMonth: faker.finance.amount(),
    avgTransactionValueLastMonth: faker.finance.amount(),
    chargebackRateCurrentMonth: faker.number.int({ max: 100 }),
    chargebackRateLastMonth: faker.number.int({ max: 100 }),
    chargesCurrentMont: fakerCharges(),
    chargesLastMonth: fakerCharges(),
    chargesPercentageGrowth: faker.number.int({ max: 100 }),
    chargesSourceBrandDistributionCurrentMonth: cardIssueList.reduce(
      (acc: any, card) => {
        acc[card] = faker.number.int({ max: 100 });
        return acc;
      },
      {}
    ),
    chargesSourceFundingDistributionCurrentMonth: {
      credit: faker.number.int({ max: 100 }),
      paypal: faker.number.int({ max: 100 }),
      debit: faker.number.int({ max: 100 }),
    },
    failedTransactionRateCurrentMonth: faker.number.int({ max: 10 }),
    failedTransactionRateLastMonth: faker.number.int({ max: 10 }),
    geographicalDistributionCurrentMonth: countryCodeList.reduce(
      (acc: any, code) => {
        acc[code] = faker.number.int({ max: 100 });
        return acc;
      },
      {}
    ),
    geographicalDistributionLastMonth: countryCodeList.reduce(
      (acc: any, code) => {
        acc[code] = faker.number.int({ max: 100 });
        return acc;
      },
      {}
    ),
    paymentMethodDistributionCurrentMonth: paymentList.reduce(
      (acc: any, code) => {
        acc[code] = faker.number.int({ max: 100 });
        return acc;
      },
      {}
    ),
    paymentMethodDistributionLastMonth: paymentList.reduce((acc: any, code) => {
      acc[code] = faker.number.int({ max: 100 });
      return acc;
    }, {}),
    paymentSuccessRateCurrentMonth: faker.number.int({ max: 1000 }),
    paymentSuccessRateLastMonth: faker.number.int({ max: 1000 }),
    refundRateCurrentMonth: faker.number.int({ max: 1000 }),
    refundRateLastMonth: faker.number.int({ max: 1000 }),
    revenueCurrentMonth: faker.finance.amount(),
    revenueGrowthRate: faker.number.int({ max: 1000 }),
    revenueLastMonth: faker.finance.amount(),
    riskLevelDistributionCurrentMonth: {
      normal: faker.number.int({ max: 100 }),
      high: faker.number.int({ max: 100 }),
      low: faker.number.int({ max: 100 }),
    },
    riskScoreDistributionCurrentMonth: numberList.reduce((acc: any, number) => {
      acc[number] = faker.number.int({ max: 30 });
      return acc;
    }, {}),
    subscriptionRenewalRateCurrentMonth: faker.number.int({ max: 100 }),
    totalCurrentCharges: faker.number.int({ max: 1000 }),
    totalCurrentCustomerDistribution: {
      cus_QMCvFZvRMG4V0a: faker.number.int({ max: 25 }),
      cus_QMCsSI44fFbdTr: faker.number.int({ max: 25 }),
      cus_QATnvdREn147OF: faker.number.int({ max: 25 }),
      cus_QASpsZO2kGO7YM: faker.number.int({ max: 25 }),
      cus_QLZi5iFwCwtj3R: faker.number.int({ max: 25 }),
    },
    totalCurrentFailedCharges: faker.number.int({ max: 100 }),
    totalCurrentRefundAmount: faker.number.int({ max: 100 }),
    totalCurrentRefunds: faker.number.int({ max: 100 }),
    totalCurrentSuccessfulCharges: faker.number.int({ max: 1000 }),
    totalLastMonthCharges: faker.number.int({ max: 1000 }),
    totalLastMonthCustomerDistribution: {
      cus_QAe3rCNfZPnhaW: faker.number.int({ max: 100 }),
      cus_QATnvdREn147OF: faker.number.int({ max: 100 }),
      cus_QASpsZO2kGO7YM: faker.number.int({ max: 100 }),
      cus_Pxa077Nvge3feK: faker.number.int({ max: 100 }),
      cus_Pxa0uTXdWZzToL: faker.number.int({ max: 100 }),
    },
    totalLastMonthFailedCharges: faker.number.int({ max: 100 }),
    totalLastMonthRefundAmount: faker.number.int({ max: 100 }),
    totalLastMonthRefunds: faker.number.int({ max: 100 }),
    totalLastMonthSuccessfulCharges: faker.number.int({ max: 100 }),
  };

  return blob as any;
}

export function fakerStatsCustomers() {
  const blob = {
    averageCustomerAge: { undefined: 49 },
    customerCreationDateDistribution: dateList.reduce((acc: any, date) => {
      acc[date] = faker.number.int({ max: 25 });
      return acc;
    }, {}),
    customerCreationDayOfWeek: daysOfWeekList.reduce((acc: any, day) => {
      acc[day] = faker.number.int({ max: 25 });
      return acc;
    }, {}),
    customerCurrencies: currencyList.reduce((acc: any, code) => {
      acc[code] = faker.number.int({ max: 25 });
      return acc;
    }, {}),
    customerDemographics: countryCodeList?.reduce((acc: any, code) => {
      acc[code] = faker.number.int({ max: 25 });
      return acc;
    }, {}),
    customerEmailSegmentation: emailList.reduce((acc, email) => {
      acc[email] = faker.number.int({ max: 25 });
      return acc;
    }, {} as { [key: string]: number }),
    customerLastActivityDate: { undefined: 49 },
    customerPaymentMethod: paymentList.reduce((acc: any, code) => {
      acc[code] = faker.number.int({ max: 100 });
      return acc;
    }, {}),
    customerPreferredLocales: countryCodeList?.reduce((acc: any, code) => {
      acc[code] = faker.number.int({ max: 25 });
      return acc;
    }, {}),
    customerSubscriptionStatus: { undefined: 49 },
    customers: fakerCustomers(),
    customersCurrentMonth: fakerCustomers(),
    customersGrowthRate: faker.number.int({ max: 100 }),
    customersLast7Days: faker.number.int({ max: 100 }),
    customersLastMonth: fakerCustomers(),
    customersPercentageGrowth: faker.number.int({ max: 100 }),
    customersTotal: faker.number.int({ max: 100 }),
    customersTotalCurrentMonth: faker.number.int({ max: 100, min: 50 }),
    customersTotalLastMonth: faker.number.int({ max: 100 }),
    useCustomersCurrentMonthGrowth: faker.number.int({ max: 100, min: 35 }),
  };

  return blob as any;
}
