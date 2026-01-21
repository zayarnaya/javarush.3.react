const transformDate = (date: Date[] | Date) => {
  return Array.isArray(date) ? date.map((date) => date.toISOString()).join(',') : date.toISOString();
};

const transformArrival = (arrival: string | undefined) => arrival ?? '';

export const mapFormData = (data: Record<string, any>) =>
  '?' +
  Object.entries(data)
    .map(([key, value]) =>
      key === 'date'
        ? `date=${transformDate(value)}`
        : key === 'arrival'
          ? `arrival=${transformArrival(value)}`
          : `${key}=${value}`,
    )
    .join('&');
