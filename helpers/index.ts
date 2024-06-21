import { StripeSubscription } from '../types/index';
import { twMerge } from 'tailwind-merge';
import {
  formatDistanceToNow,
  format,
  addMonths,
  startOfMonth,
  addDays,
} from 'date-fns';
import axios from 'axios';

export function classNames(...classes: any[]) {
  // --------------------------------------------------------------------------------
  // 📌  Tailwind css merge handler
  // --------------------------------------------------------------------------------
  const merged = classes.filter(Boolean).join(' ');

  return twMerge(merged);
}

export function getTimeAgo(dateString: string | number): string {
  try {
    const inputDate = new Date(dateString);
    return formatDistanceToNow(inputDate, { addSuffix: true });
  } catch (error) {
    console.error('Error getting time ago:', error);
    return '';
  }
}

export function convertToAsterisks(inputString: string): string {
  const str = inputString.replace(/./g, '*')?.slice(0, 16);

  return str;
}

export function convertToYearMonthDay(inputDate: number): string {
  const date = new Date(inputDate * 1000);
  return date.toDateString(); // 'Sun Feb 01 1970' format
}

export function convertToK(input?: number): string {
  if (!input) {
    return '0';
  }

  if (input < 1000) {
    return input.toString();
  } else {
    return `${(input / 1000).toFixed(1)}k`;
  }
}

export function capitalize(inputString: string, allWords: boolean): string {
  if (allWords) {
    return inputString.replace(/\b\w/g, (char) => char.toUpperCase());
  } else {
    return inputString.charAt(0).toUpperCase() + inputString.slice(1);
  }
}

export function printToPDF(id: string, pageFormat: string) {
  const domElement = document.getElementById(id);
  // TODO: check out jspdf lib

  if (domElement) {
    const printWindow = window.open('', '_blank');
    printWindow?.document.write(domElement.outerHTML);
    printWindow?.document.close();
    printWindow?.print();
  }
}

export function isSubActive(subscription: StripeSubscription): boolean {
  return subscription.status === 'active';
}

export function handleIsRedirect(param: string | null) {
  if (typeof param === 'string' && param !== 'null' && param.trim() !== '') {
    return param;
  }
  return null;
}

export function currentMonth() {
  const currentDate = new Date();
  const startOfMonthDate = startOfMonth(currentDate);
  const nextMonthStartDate = startOfMonth(addMonths(currentDate, 1));

  const formattedStartOfMonth = format(startOfMonthDate, 'MMM do');
  const formattedNextMonthStart = format(nextMonthStartDate, 'MMM do');

  return `${formattedStartOfMonth} - ${formattedNextMonthStart}`;
}

export function lastMonth() {
  const currentDate = new Date();
  const startOfMonthDate = startOfMonth(currentDate);
  const lastMonthStartDate = startOfMonth(addMonths(currentDate, -1));
  const lastMonthEndDate = startOfMonth(currentDate);

  const formattedStartOfMonth = format(lastMonthStartDate, 'MMM do');
  const formattedEndOfMonth = format(lastMonthEndDate, 'MMM do');

  return `${formattedStartOfMonth} - ${formattedEndOfMonth}`;
}

export function last7Days() {
  const currentDate = new Date();
  const last7Days = addDays(currentDate, -7);

  return `${format(last7Days, 'MMM do')} - ${format(currentDate, 'MMM do')}`;
}

export function convertKeyValueObjToArray(input?: {
  [key: string]: number;
}): { name?: string; value?: number }[] {
  if (!input) {
    return [];
  }

  return Object.entries(input)?.map(([name, value]) => ({ name, value }));
}

export function convertObjectToArray(input: {
  [key: string]: Object;
}): Object[] {
  const valuesArray: Object[] = [];

  for (const key in input) {
    if (input.hasOwnProperty(key)) {
      valuesArray.push(input[key]);
    }
  }

  return valuesArray;
}

export async function downloadFile(props: {
  url: string;
  name?: string;
  classBack?: (progress: number) => void;
}): Promise<void> {
  try {
    const { data } = await axios.get(props.url, {
      responseType: 'blob',
      onDownloadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / (progressEvent.total ?? 0)
        );
        props.classBack?.(percentCompleted);
      },
    });
    console.log('🚧 BLOB ', data);

    const url = window.URL.createObjectURL(data);
    const a = document.createElement('a');
    a.href = url;
    a.download = props.name || 'download';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  } catch (error) {
    console.error('Error downloading file:', error);
  }
}

export function copyToClipboard(str: string) {
  const el = document.createElement('textarea');
  el.value = str;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
}

export function generateId(): string {
  const timestamp = Date.now().toString();
  const randomNumber = Math.floor(Math.random() * 1000000)
    .toString()
    .padStart(6, '0');
  return timestamp + randomNumber;
}
