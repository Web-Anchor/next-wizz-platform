import axios, { isCancel } from 'axios';

type FetcherTypes = {
  url: string;
  method?: string;
  data?: any;
  headers?: any;
  params?: any;
  cancelToken?: any;
  cacheExpires?: number;
};

export async function cFetch(props: FetcherTypes) {
  try {
    let HEADERS = {
      'Content-Type': 'application/json',
      'apollo-require-preflight': true,
      Expires: props.cacheExpires ?? '0',
    };

    const { data, status, statusText } = await axios({
      url: props.url,
      method: props.method ?? 'POST',
      data: props.data,
      headers: props.headers ?? HEADERS,
      params: props.params,
      cancelToken: props.cancelToken,
      signal: newAbortSignal(5000), // ⚠️ Cancelling requests with AbortController
    });

    return { data, status, statusText };
  } catch (error: any) {
    if (isCancel(error)) {
      console.log('Request canceled', error.message);
    } else {
      console.log('🚨 axios error: ', error.message);
    }

    return { error, message: error.message, status: error?.response?.status };
  }
}

function newAbortSignal(timeoutMs: number) {
  const abortController = new AbortController();
  setTimeout(() => abortController.abort(), timeoutMs || 0);

  return abortController.signal;
}
