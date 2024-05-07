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

export * from './charges';
export * from './stripe-keys';
export * from './validate-api-keys';
export * from './customers';
export * from './stats';
export * from './users';
