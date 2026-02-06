import type { Food, Offer, Train } from 'src/api/mocks';
import type { Passenger } from './components';
import { fromRupees } from 'src/shared/helpers';

export const getBasePrice = (train: Train, classCode: string): number => {
  if (!train) return 0;
  const { classes } = train;
  const trainClass = classes.find((item) => item.classCode.toLowerCase() === classCode.toLowerCase());
  if (!trainClass) return 0;
  return trainClass.price;
};

export const getDiscountAmount = (price: number, code: string, promocodes: Offer[]): number => {
  const offer = promocodes?.find((offer) => offer.code.toLowerCase() === code.toLowerCase());

  if (!offer) return 0;

  console.log(offer);
  const minPrice = offer.discount.minPrice;
  const maxPrice = offer.discount.maxPrice ?? Infinity;
  const maximum = typeof maxPrice === 'number' ? maxPrice : fromRupees(maxPrice);
  if (offer.discount.type === 'percentage') {
    if (!minPrice || price >= (typeof minPrice === 'number' ? minPrice : fromRupees(minPrice))) {
      return (Math.min(price, maximum) * offer.discount.amount) / 100;
    }
  } else {
    return offer.discount.amount;
  }
  return 0;
};

export const getTotalFoodAmount = (meals: Record<string, number> | Passenger, food: Food[]) =>
  Object.entries(meals).reduce((acc, [foodId, num]) => {
    const dish = food?.find((item: Food) => item.id === +foodId);
    if (!dish || !num) return acc;
    const { price } = dish;
    acc += typeof price === 'number' ? price * num : fromRupees(price) * num;
    return acc;
  }, 0);
