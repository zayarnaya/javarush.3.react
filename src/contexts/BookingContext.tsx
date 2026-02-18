import { createContext, useEffect, useState, type FC } from 'react';
import { useSearchParams } from 'react-router';
import { useFetchFood, useFetchOffers, useFetchTrain, type Passenger } from 'src/api/mockApi';
import type { Food, Offer, Train } from 'src/api/mocks';
import { getBasePrice, getDiscountAmount, getTotalFoods } from 'src/pages/ReviewBookingPage/helpers';
import type { WithChildren } from 'src/types';

export interface BookingContextState {
  train: Train | null;
  passengers: Passenger[] | null;
  extraBaggage: boolean | null;
  classCode: string | null;
  code: string | null;
  food: Food[] | null;
  promocodes: Offer[] | null;
  meals: Food[] | null;
  totalFood: number | null;
  baseAmount: number | null;
  totalDiscount: number | null;
  total: number | null;
  totalSum: number | null;
  foodLoading: boolean;
  offersLoading: boolean;
  trainLoading: boolean;
}

export interface BookingContextProps {
  state: BookingContextState;
  updateState: (entry: BookingContextStateEntry) => void;
  updatePassengerById: ({ id, info }: { id: number; info: Partial<Passenger> }) => void;
  updateAllState: (state: Record<string, string | number | string[] | null | undefined>) => void;
  updatePassengerFoodById: ({ id, meal }: { id: number; meal: number[] }) => void;
}

const initialBookingState = {
  train: null,
  passengers: null,
  extraBaggage: null,
  classCode: null,
  code: null,
  food: null,
  promocodes: null,
  meals: null,
  totalFood: null,
  baseAmount: null,
  totalDiscount: null,
  total: null,
  totalSum: null,
  foodLoading: false,
  offersLoading: false,
  trainLoading: false,
};

export type BookingContextStateEntry = {
  [K in keyof BookingContextState]: {
    key: K;
    values: NonNullable<BookingContextState[K]>;
  };
}[keyof BookingContextState];

export const BookingContext = createContext<BookingContextProps>({
  state: initialBookingState,
  //@ts-expect-error
  updateState: (entry: BookingContextStateEntry) => {},
  //@ts-expect-error
  updatePassengerById: ({ id, info }: { id: number; info: Partial<Passenger> }) => {},
  //@ts-expect-error
  updateAllState: (state: Record<string, string | number | string[] | null | undefined>) => {},
  //@ts-expect-error
  updatePassengerFoodById: ({ id, meal }: { id: number; meal: number[] }) => {},
});

export const BookingContextProvider: FC<WithChildren> = ({ children }) => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get('passengers')) {
      updatePassengersQuantity(Number(searchParams.get('passengers')));
    }
  }, [searchParams]);

  const [train, setTrain] = useState<BookingContextState['train']>(initialBookingState.train);
  const [passengers, setPassengers] = useState<BookingContextState['passengers']>(initialBookingState.passengers);
  const [extraBaggage, setExtraBaggage] = useState<BookingContextState['extraBaggage']>(
    initialBookingState.extraBaggage,
  );
  const [classCode, setClassCode] = useState<BookingContextState['classCode']>(initialBookingState.classCode);
  const [code, setCode] = useState<BookingContextState['code']>(initialBookingState.code);
  const [food, setFood] = useState<BookingContextState['food']>(initialBookingState.food);
  const [promocodes, setPromocodes] = useState<BookingContextState['promocodes']>(initialBookingState.promocodes);
  const [meals, setMeals] = useState<BookingContextState['meals']>(initialBookingState.meals);
  const [totalFood, setTotalFood] = useState<BookingContextState['totalFood']>(initialBookingState.totalFood);
  const [baseAmount, setBaseAmount] = useState<BookingContextState['baseAmount']>(initialBookingState.baseAmount);
  const [totalDiscount, setTotalDiscount] = useState<BookingContextState['totalDiscount']>(
    initialBookingState.totalDiscount,
  );
  const [total, setTotal] = useState<BookingContextState['total']>(initialBookingState.total);
  const [totalSum, setTotalSum] = useState<BookingContextState['totalSum']>(initialBookingState.totalSum);

  type MoneySumsProps = Pick<
    BookingContextState,
    'train' | 'classCode' | 'passengers' | 'food' | 'extraBaggage' | 'code' | 'promocodes'
  >;
  const setMoneySums = ({ train, classCode, passengers, food, extraBaggage, code, promocodes }: MoneySumsProps) => {
    let baseAmount = 0;
    let totalFood = 0;
    let totalDiscount = 0;

    if (train && classCode) {
      baseAmount = getBasePrice(train, classCode, passengers?.length ?? 1);
      setBaseAmount(baseAmount);
    }

    if (passengers && food) {
      const { meals, total } = getTotalFoods(passengers, food);
      //@ts-expect-error
      setMeals(meals);
      totalFood = total;
      setTotalFood(total);
    }

    const total = baseAmount + totalFood + (extraBaggage ? 500 : 0);
    setTotal(total);

    if (code && promocodes) {
      totalDiscount = getDiscountAmount(total, code, promocodes);
      setTotalDiscount(totalDiscount);
    }

    const totalSum = total - totalDiscount;
    setTotalSum(totalSum);
  };

  const updateState = ({ key, values }: BookingContextStateEntry) => {
    switch (key) {
      case 'train':
        setTrain(values);
        setMoneySums({ train: values, classCode, passengers, food, extraBaggage, code, promocodes });
        break;
      case 'passengers': {
        setPassengers(values);
        break;
      }
      case 'extraBaggage':
        setExtraBaggage(values);
        setMoneySums({ train, classCode, passengers, food, extraBaggage: values, code, promocodes });
        break;
      case 'classCode':
        setClassCode(values);
        setMoneySums({ train, classCode: values, passengers, food, extraBaggage, code, promocodes });
        break;
      case 'code':
        setCode(values);
        setMoneySums({ train, classCode, passengers, food, extraBaggage, code: values, promocodes });
        break;
      case 'food':
        setFood(values);
        setMoneySums({ train, classCode, passengers, food: values, extraBaggage, code, promocodes });
        break;
      case 'promocodes':
        setPromocodes(values);
        setMoneySums({ train, classCode, passengers, food, extraBaggage, code, promocodes: values });
        break;
      case 'meals':
      case 'totalFood':
      case 'baseAmount':
      case 'totalDiscount':
      case 'total':
      case 'totalSum':
      case 'foodLoading':
      case 'offersLoading':
      default:
        break;
    }
  };

  const { data: foodData, loading: foodLoading, fetchFood } = useFetchFood();
  const { data: offersData, loading: offersLoading, fetchOffers } = useFetchOffers();
  const { data: trainData, loading: trainLoading, fetchTrainById } = useFetchTrain();

  useEffect(() => {
    if (!foodData) {
      fetchFood();
    } else if (foodData && !foodLoading) {
      updateState({ key: 'food', values: foodData });
    }
  }, [foodData, foodLoading]);

  useEffect(() => {
    if (!offersData) {
      fetchOffers();
    } else if (offersData && !offersLoading) {
      updateState({ key: 'promocodes', values: offersData });
    }
  }, [offersData, offersLoading]);

  useEffect(() => {
    if (searchParams.get('trainId') && (!train || Number(searchParams.get('trainId')) !== train.id)) {
      fetchTrainById(Number(searchParams.get('trainId')));
    }
  }, [searchParams, train]);

  useEffect(() => {
    if (trainData && (!train || (train && trainData.id !== train.id)) && !trainLoading) {
      updateState({ key: 'train', values: trainData });
    }
  }, [train, trainData, trainLoading]);

  useEffect(() => {
    if (searchParams.get('classCode')) {
      updateState({ key: 'classCode', values: searchParams.get('classCode') ?? '' });
    }
  }, [searchParams]);

  function updatePassengerById({ id, info }: { id: number; info: Partial<Passenger> }) {
    updateState({
      key: 'passengers',
      values: (passengers ? [...passengers] : []).map((passenger) =>
        passenger.id === id ? { ...passenger, ...info } : { ...passenger },
      ),
    });
  }

  function updatePassengerFoodById({ id, meal }: { id: number; meal: number[] }) {
    if (!passengers) return;
    const newPassengers = passengers.map((passenger) =>
      passenger.id === id ? { ...passenger, meal } : { ...passenger },
    );
    updateState({ key: 'passengers', values: newPassengers });
    setMoneySums({ train, classCode, passengers: newPassengers, food, extraBaggage, code, promocodes });
  }

  function updateAllState(state: Record<string, string | number | string[] | null | undefined>) {
    for (let key in state) {
      if (key in initialBookingState && state[key] !== undefined) {
        //@ts-expect-error
        updateState({ key: key as keyof BookingContextState, values: state[key as keyof BookingContextState] });
      }
    }
  }

  const newPassenger: Omit<Passenger, 'id' | 'meal'> = {
    fullName: null,
    phone: null,
    email: null,
    birthDate: null,
  };

  const emptyArray: number[] = [];

  function updatePassengersQuantity(q: number) {
    if (!passengers) {
      setPassengers(
        new Array(q).fill(null).map((_, index) => ({ ...newPassenger, id: index + 1, meal: [...emptyArray] })),
      );
    } else if (passengers.length < q) {
      const newArray = new Array(q - passengers.length)
        .fill(null)
        .map((_, index) => ({ ...newPassenger, id: index + q + 1, meal: [...emptyArray] }));
      setPassengers([...passengers, ...newArray]);
    } else if (passengers.length > q) {
      setPassengers(passengers.slice(0, q));
    } else {
      return;
    }
  }

  return (
    <BookingContext.Provider
      value={{
        state: {
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
          foodLoading,
          offersLoading,
          trainLoading,
        },
        updateState,
        updatePassengerById,
        updateAllState,
        updatePassengerFoodById,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

BookingContextProvider.displayName = 'Booking.Context.Provider';
