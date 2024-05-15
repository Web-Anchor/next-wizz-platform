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
