export type Charge = {
  id?: string;
};

export type Customer = {
  id?: string;
  address?: {
    city?: string;
    state?: string;
    country?: string;
    postal_code?: string;
  };
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
