import { twMerge } from 'tailwind-merge';

export function classNames(...classes: any[]) {
  // --------------------------------------------------------------------------------
  // 📌  Tailwind css merge handler
  // --------------------------------------------------------------------------------
  const merged = classes.filter(Boolean).join(' ');

  return twMerge(merged);
}

export function getDateDifference(inputDateStr: string): string {
  const inputDate = new Date(inputDateStr);
  const currentDate = new Date();

  const timeDifference = currentDate.getTime() - inputDate.getTime();
  const secondsDifference = Math.floor(timeDifference / 1000);

  if (secondsDifference < 60) {
    return 'now';
  } else if (secondsDifference < 3600) {
    const minutes = Math.floor(secondsDifference / 60);
    return `${minutes} minute(s) ago`;
  } else if (secondsDifference < 86400) {
    const hours = Math.floor(secondsDifference / 3600);
    return `${hours} hour(s) ago`;
  } else if (secondsDifference < 2592000) {
    const days = Math.floor(secondsDifference / 86400);
    return `${days} day(s) ago`;
  } else if (secondsDifference < 31536000) {
    const months = Math.floor(secondsDifference / 2592000);
    return `${months} month(s) ago`;
  } else {
    const years = Math.floor(secondsDifference / 31536000);
    return `${years} year(s) ago`;
  }
}

export function convertToAsterisks(inputString: string): string {
  return inputString.replace(/./g, '*');
}

export function convertToYearMonthDay(inputDate: number): string {
  const date = new Date(inputDate * 1000);
  return date.toDateString(); // 'Sun Feb 01 1970' format
}
