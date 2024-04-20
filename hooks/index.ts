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
