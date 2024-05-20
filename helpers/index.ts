import { StripeSubscription } from '../types/index';
import { twMerge } from 'tailwind-merge';
import { formatDistanceToNow } from 'date-fns';

export function classNames(...classes: any[]) {
  // --------------------------------------------------------------------------------
  // 📌  Tailwind css merge handler
  // --------------------------------------------------------------------------------
  const merged = classes.filter(Boolean).join(' ');

  return twMerge(merged);
}

export function getTimeAgo(dateString: string | number): string {
  const inputDate = new Date(dateString);
  return formatDistanceToNow(inputDate, { addSuffix: true });
}

export function convertToAsterisks(inputString: string): string {
  const str = inputString.replace(/./g, '*')?.slice(0, 16);

  return str;
}

export function convertToYearMonthDay(inputDate: number): string {
  const date = new Date(inputDate * 1000);
  return date.toDateString(); // 'Sun Feb 01 1970' format
}

export function convertToK(inputNumber?: number): string {
  if (!inputNumber) {
    return '0';
  }

  if (inputNumber < 1000) {
    return inputNumber.toString();
  } else {
    return `${(inputNumber / 1000).toFixed(1)}k`;
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
