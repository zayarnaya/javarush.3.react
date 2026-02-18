import { food, indianRailwayStations, mockOffers, trainsMockData, type Offer, type Train } from './mocks';
import { useState } from 'react';

const BOOKING_KEY = 'booking';

async function delay(ms: number, response?: any) {
  return new Promise((resolve) => setTimeout(resolve, ms, response));
}

async function randomDelay(max = 2000, response?: any) {
  return new Promise((resolve) => setTimeout(resolve, Math.random() * max, response));
}

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

export const mockFetch = async (type: string, noDelay = false) => randomDelay(noDelay ? 0 : 2000, mapTypeToData[type]);

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

export const useFetchStations = () => {
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
  baseAmount: number;
  totalFood: number;
  totalDiscount: number;
  totalSum: number;
  total: number;
  meals: any; // поправить
}

export const bookTrain = async (
  {
    train,
    passengers,
    extraBaggage = false,
    classCode,
    code = '',
    baseAmount = 0,
    totalDiscount = 0,
    totalFood = 0,
    totalSum = 0,
    total = 0,
    meals = {},
  }: BookTrain,
  noDelay = false,
): Promise<number> => {
  const id = Date.now();

  localStorage.setItem(
    BOOKING_KEY,
    JSON.stringify({
      id,
      train,
      passengers,
      extraBaggage,
      classCode,
      code,
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
    {
      train,
      passengers,
      extraBaggage = false,
      classCode,
      code = '',
      baseAmount,
      totalDiscount,
      totalFood,
      totalSum,
      total,
      meals,
    }: BookTrain,
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
          baseAmount,
          totalDiscount,
          totalFood,
          totalSum,
          total,
          meals,
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

export const useFetchPaymentDetails = () => {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPaymentDetails = async (id: number, noDelay = false) => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const paymentRaw = localStorage.getItem(BOOKING_KEY);
      if (paymentRaw) {
        const payment = JSON.parse(paymentRaw);
        if (+payment.id !== id) {
          throw new Error('No such payment!');
        }
        if (!noDelay) await randomDelay(2000);
        setData(payment);
      } else {
        throw new Error('No payments!');
      }
    } catch (error) {
      setError((error as unknown as Error).message);
    }
    setLoading(false);
  };

  return { data, loading, error, fetchPaymentDetails };
};
