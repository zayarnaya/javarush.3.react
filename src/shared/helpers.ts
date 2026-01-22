import dayjs from 'dayjs';

const transformDate = (date: Date[] | Date) => {
  return Array.isArray(date) ? date.map((date) => date.toISOString()).join(',') : date.toISOString();
};

export const mapFormData = (data: Record<string, any>) =>
  '?' +
  Object.entries(data)
    .map(([key, value]) => (key === 'date' ? `date=${transformDate(value)}` : `${key}=${value}`))
    .join('&');

export const parseDate = (dateStr: string) => dateStr.split(',').map((date) => dayjs(date));
