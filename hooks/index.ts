import axios from 'axios';

// --------------------------------------------------------------------------------
// 📌  SWR fetchers
// --------------------------------------------------------------------------------
export async function fetcher(url: string) {
  return await axios.get(url);
}

export function bodyFetcher(url: string, body?: any) {
  return axios.post(url, body);
}

export * from './useCharges';
export * from './useStripeKeys';
export * from './useValidateApiKeys';
export * from './useCustomers';
export * from './useStats';
export * from './useUsers';
export * from './useSubscriptions';
export * from './useSupportTickets';
export * from './useFeatures';
export * from './useTemplates';
export * from './useStatistics';
export * from './useComponents';
