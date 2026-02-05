import type { Offer } from 'src/api/mocks';
import { toRupeees } from 'src/shared/helpers';

export const makeOfferString = (offer: Offer): string => {
  const minPrice = offer.discount.minPrice;
  const maxPrice = offer.discount.maxPrice;
  const end = ` | Use code ${offer.code}`;

  const start = `${offer.discount.type === 'amount' ? '₹' : ''}${offer.discount.amount}${offer.discount.type === 'percentage' ? '%' : ''} off`;
  const from = minPrice ? ` from ${typeof minPrice === 'string' ? minPrice : toRupeees(minPrice)}` : '';
  const to = maxPrice ? ` up to ${typeof maxPrice === 'string' ? maxPrice : toRupeees(maxPrice)}` : '';

  return `${start}${from}${to}${end}`;
};
