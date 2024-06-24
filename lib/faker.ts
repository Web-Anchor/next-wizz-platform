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
  const blob = {
    charges: faker.finance.amount(),
    refunds: faker.finance.amount(),
    net: faker.finance.amount(),
  };

  return blob as any;
}
