import { Plan } from '../types/index';

export const plans: { [key: string]: Plan } = {
  // --------------------------------------------------------------------------------
  // 📌  Plan restriction configuration
  // --------------------------------------------------------------------------------
  Freelancer: {
    keyLimit: 1,
    emailLimit: 100,
    name: 'Freelancer',
  },
  Startup: {
    keyLimit: 5,
    emailLimit: 500,
    name: 'Startup',
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
