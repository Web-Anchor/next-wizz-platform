import { Plan } from '../types/index';

export const plans: { [key: string]: Plan } = {
  // --------------------------------------------------------------------------------
  // 📌  Plan restriction configuration
  // --------------------------------------------------------------------------------
  Freelancer: {
    keyLimit: 1,
    name: 'Freelancer',
    basic: true,
    advanced: false,
    pro: false,
    invoiceEmailCap: 250,
    emailCap: 250,
  },
  Startup: {
    keyLimit: 1,
    name: 'Startup',
    basic: true,
    advanced: true,
    pro: false,
    invoiceEmailCap: 500,
    emailCap: 500,
  },
  Tester: {
    keyLimit: 1,
    name: 'Startup',
    basic: true,
    advanced: true,
    pro: false,
    invoiceEmailCap: 50,
    emailCap: 50,
  },
};

// --------------------------------------------------------------------------------
// 📌  Ticket status configuration
// --------------------------------------------------------------------------------
export enum TicketStatus {
  Open = 'open',
  Closed = 'closed',
  Pending = 'pending',
}

export const maxLength = {
  description: 10000,
  comment: 2000,
  message: 500,
  phoneNumber: 20,
  customField: 50,
};

export const FETCH_LIMIT = 20;
