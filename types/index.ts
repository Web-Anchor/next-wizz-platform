export type Charge = {
  id?: string;
  amount?: number;
  application?: string;
  billing_details?: {
    address?: Address;
    email?: string;
    name?: string;
    phone?: string;
  };
  calculated_statement_descriptor?: string;
  created?: number;
  currency?: string;
  customer?: string;
  description?: string;
  receipt_url?: string;
  status?: string;
  paid?: boolean;
};

type Address = {
  city?: string;
  country?: string;
  line1?: string;
  line2?: string;
  postal_code?: string;
  state?: string;
};

export type Customer = {
  id?: string;
  address?: Address;
  balance?: number;
  created?: number;
  name?: string;
  email?: string;
  currency?: string;
  // TODO: Add more fields
};

export type StripeKey = {
  id?: string;
  name?: string;
  userId?: string;
  restrictedAPIKey?: string;
  createdAt?: string;
};

export type User = {
  id?: string;
  email?: string;
  name?: string;
  createdAt?: string;
  updatedAt?: string;
  stripeKeys?: StripeKey[];
};

export type Template = {
  id?: string;
  userId?: string;
  name?: string;
  description?: string;
  logoUrl?: string;
  memo?: string;
  footer?: string;
  header?: string;
  customFields?: { [key: string]: CustomField };
  createdAt?: string;
};

export type CustomField = {
  value: string;
};

export type StripeSubscription = {
  id?: string;
  customer?: string;
  items?: {
    data?: {
      price?: {
        id?: string;
        active?: boolean;
        currency?: string;
        product?: string;
        unit_amount?: number;
      };
    }[];
  };
  status?: string;
  current_period_end?: number;
  current_period_start?: number;
  created?: number;
  ended_at?: number;
  latest_invoice?: string;
  start_date?: number;
  plan?: {
    id?: string;
    nickname?: string;
    amount?: number;
    currency?: string;
  };
  currency?: string;
};

export type Plan = {
  keyLimit: number;
  emailLimit: number;
  name: string;
};

export type Ticket = {
  id?: string;
  userId?: string;
  subject?: string;
  message?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type Feature = {
  id?: string;
  userId?: string;
  featureName?: string;
  description?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
};
