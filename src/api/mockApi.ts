import { food, indianRailwayStations, mockOffers, trainsMockData, type Food, type Offer, type Train } from './mocks';
import { useMemo, useState } from 'react';
import { getBasePrice, getDiscountAmount, getTotalFoods } from 'src/pages/ReviewBookingPage/helpers';

const mapTypeToData: Record<string, any> = {
  stations: indianRailwayStations,
  trains: trainsMockData,
  food: food,
  offers: mockOffers,
};

export interface Passenger {
  id: number;
  fullName: string | null;
  phone: string | null;
  email: string | null;
  birthDate: any | null;
  meal?: number[];
}

export const mockFetch = async (type: string, noDelay = false) => {
  return new Promise((resolve) => {
    setTimeout(resolve, noDelay ? 0 : Math.random() * 2000, mapTypeToData[type]);
  });
};

export const useFetch = () => {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchIt(type: string, noDelay = false) {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const data = await mockFetch(type, noDelay);
      setData(data);
    } catch (error) {
      setError((error as unknown as Error).message);
    }

    setLoading(false);
  }

  return { data, loading, error, fetchIt };
};

export const useFetchStations = async () => {
  const { data, loading, error, fetchIt } = useFetch();
  const fetchStations = (noDelay = false) => fetchIt('stations', noDelay);
  return { data, loading, error, fetchStations };
};

export const fetchStations = async (noDelay = false) => mockFetch('stations', noDelay);

export const useFetchTrains = () => {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchTrains(departure: string, arrival: string, noDelay = false) {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const trains: Train[] = (await mockFetch('trains', noDelay)) as Train[];
      setData(trains.filter(({ from, to }) => from.code === departure && to.code === arrival));
    } catch (error) {
      setError((error as unknown as Error).message);
    }

    setLoading(false);
  }

  return { data, loading, error, fetchTrains };
};

export const useFetchTrain = () => {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchTrainById(trainId: number | string, noDelay = false) {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const trains: Train[] = (await mockFetch('trains', noDelay)) as Train[];

      setData(trains.find(({ id }) => id == trainId));
    } catch (error) {
      setError((error as unknown as Error).message);
    }

    setLoading(false);
  }

  return { data, loading, error, fetchTrainById };
};

export const useFetchFood = () => {
  const { data, loading, error, fetchIt } = useFetch();
  const fetchFood = (noDelay = false) => fetchIt('food', noDelay);
  return { data, loading, error, fetchFood };
};

export const useFetchOffers = () => {
  const { data, loading, error, fetchIt } = useFetch();
  const fetchOffers = (noDelay = false) => fetchIt('offers', noDelay);
  return { data, loading, error, fetchOffers };
};

export const useApplyCode = () => {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const applyCode = async (code: string, noDelay = false) => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const offers: Offer[] = (await mockFetch('offer', noDelay)) as Offer[];
      const offer = offers.find((offer) => offer.code.toLowerCase() === code.toLowerCase());
      if (!offer) {
        throw new Error('There is no such promocode!');
      }
      setData(offer);
    } catch (error) {
      setError((error as unknown as Error).message);
    }
    setLoading(false);
  };

  return { data, loading, error, applyCode };
};

interface BookTrain {
  train: Train;
  passengers: Passenger[];
  extraBaggage?: boolean;
  code?: string;
  classCode: string;
  food: Food[];
  promocodes: Offer[];
}

export const bookTrain = async (
  { train, passengers, extraBaggage = false, classCode, code = '', food, promocodes }: BookTrain,
  noDelay = false,
): Promise<number> => {
  const baseAmount = getBasePrice(train, classCode);
  const { meals, total: totalFood } = getTotalFoods(passengers, food);

  const total = baseAmount + totalFood + (extraBaggage ? 500 : 0);
  const totalDiscount = getDiscountAmount(total, code, promocodes);

  const totalSum = total - totalDiscount;

  const id = Date.now();

  localStorage.setItem(
    'booking',
    JSON.stringify({
      id,
      train,
      passengers,
      extraBaggage,
      classCode,
      code,
      food,
      promocodes,
      meals,
      totalFood,
      baseAmount,
      totalDiscount,
      total,
      totalSum,
    }),
  );

  return new Promise((resolve) => setTimeout(resolve, noDelay ? 0 : Math.random() * 1000, id));
};

export const useBooking = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const book = async (
    { train, passengers, extraBaggage = false, classCode, code = '', food, promocodes }: BookTrain,
    noDelay = false,
  ) => {
    setLoading(true);
    setError(null);

    try {
      const id = await bookTrain(
        {
          train,
          passengers,
          extraBaggage,
          classCode,
          code,
          food,
          promocodes,
        },
        noDelay,
      );
      setLoading(false);
      return id;
    } catch (error) {
      setError((error as unknown as Error).message);
    }
    setLoading(false);
  };

  return { loading, error, book };
};
