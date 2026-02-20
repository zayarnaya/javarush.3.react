import type { Passenger } from 'src/api/mockApi';
import type { Food, Offer, Train } from 'src/api/mocks';
import { fromRupees } from 'src/shared/helpers';

export const getBasePrice = (train: Train, classCode: string, passengersNo = 1): number => {
  if (!train) return 0;
  const { classes } = train;
  const trainClass = classes.find((item) => item.classCode.toLowerCase() === classCode.toLowerCase());
  if (!trainClass) return 0;
  return trainClass.price * passengersNo;
};

export const getDiscountAmount = (price: number, code: string, promocodes: Offer[]): number => {
  const offer = promocodes?.find((offer) => offer.code.toLowerCase() === code.toLowerCase());

  if (!offer) return 0;
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

interface CountedFood extends Food {
  count: number;
  total: number;
}

export const getTotalFoods = (passengers: Passenger[], food: Food[]) => {
  const meals: Record<number, CountedFood> = {};
  for (let passenger of passengers) {
    if (!passenger.meal) continue;
    for (let foodId of passenger.meal) {
      let res = meals[foodId] ?? food?.find((item: Food) => item.id === +foodId);
      if (!res) continue;

      let { count, total } = res;
      if (!count) count = 0;
      if (!total) total = 0;

      meals[foodId] = {
        ...res,
        count: count++,
        total: total + (typeof res.price === 'number' ? res.price : fromRupees(res.price)),
      };
    }
  }

  let total = 0;
  for (let key in meals) {
    total += meals[key].total;
  }
  return {
    meals,
    total,
  };
};
