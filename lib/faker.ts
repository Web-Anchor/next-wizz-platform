import { faker } from '@faker-js/faker';

export function fakerUser() {
  const blob = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    imageUrl:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
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
    paid: faker.datatype.boolean(),
  }));
  console.log(blob);

  return blob as any;
}
