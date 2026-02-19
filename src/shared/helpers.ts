import dayjs from 'dayjs';

const transformDate = (date: Date[] | Date) => {
  return Array.isArray(date) ? date.map((date) => date.getTime()).join(',') : date.getTime();
  // return Array.isArray(date) ? date.map((date) => date.toISOString()).join(',') : date.toISOString();
};

export const mapFormData = (data: Record<string, any>) =>
  '?' +
  Object.entries(data)
    .map(([key, value]) => (key === 'date' ? `date=${transformDate(value)}` : `${key}=${value}`))
    .join('&');

export const parseDate = (dateStr: string) => dateStr.split(',').map((date) => dayjs(date));

export const to3digit = (num: number) => num.toString().padStart(3, '0');

export const fromRupees = (str: string | number): number => {
  if (typeof str === 'number') return str;
  return parseFloat(str.replace(/₹/g, ''));
};

export const toRupeees = (num: number | string): string =>
  typeof num === 'string'
    ? num
    : new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
      }).format(num);

export const capitalize = (str: string) => str.slice(0, 1).toUpperCase() + str.slice(1);

export const makeRandomNumberSequence = (length: number): string =>
  Math.round(Math.random() * 10 ** length)
    .toString()
    .padStart(length, '0');
