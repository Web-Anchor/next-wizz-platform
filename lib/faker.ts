import { faker } from '@faker-js/faker';

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
  const blob = Array.from({ length: 10 }, () => ({
    id: faker.datatype.uuid(),
    amount: faker.finance.amount(),
    billing_details: {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      address: {
        line1: faker.address.streetAddress(),
        city: faker.address.city(),
        state: faker.address.state(),
        postal_code: faker.address.zipCode(),
        country: faker.address.country(),
      },
    },
    calculated_statement_descriptor: faker.finance.transactionDescription(),
    created: faker.date.between('2024-06-01', '2024-06-24').getTime() / 1000,
    currency: faker.finance.currencyCode(),
    customer: faker.datatype.uuid(),
    description: faker.finance.transactionDescription(),
    receipt_url: faker.internet.url(),
    status: faker.finance.transactionType(),
    paid: faker.datatype.boolean({ probability: 90 }),
  }));
  console.log(blob);

  return blob as any;
}

export function fakerCustomers() {
  const blob = Array.from({ length: 10 }, () => ({
    id: faker.datatype.uuid(),
    address: {
      line1: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      postal_code: faker.location.zipCode(),
      country: faker.location.country(),
    },
    balance: faker.finance.amount(),
    created: faker.date.between('2024-06-01', '2024-06-24').getTime() / 1000,
    name: faker.person.fullName(),
    email: faker.internet.email(),
    currency: faker.finance.currencyCode(),
  }));

  return blob as any;
}
