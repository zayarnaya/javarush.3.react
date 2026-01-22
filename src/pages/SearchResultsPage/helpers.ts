import dayjs from 'dayjs';

export const parseDate = (dateStr: string) => dateStr.split(',').map((date) => dayjs(date));
