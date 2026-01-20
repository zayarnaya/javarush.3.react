import dayjs from "dayjs";

export const parseDate = (date: string | string[]) => Array.isArray(date) 
    ? date.map(date => dayjs(date))
    : dayjs(date);