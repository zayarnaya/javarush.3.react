export const to3digit = (num: number) => num.toString().padStart(3, '0');

export const toRupeees = (num: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(num);
