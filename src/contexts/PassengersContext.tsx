import { createContext, useState, type FC } from 'react';
import { type Passenger } from 'src/api/mockApi';
import type { WithChildren } from 'src/types';

export interface PassengersContextProps {
  passengers: Passenger[] | null;
  isPassengerInfoFilled: boolean;
  updatePassengerById: ({ id, info }: { id: number; info: Partial<Passenger> }) => void;
  updateAllPassengers: (state: Passenger[] | null) => void;
}

const initialState: PassengersContextProps = {
  passengers: null,
  isPassengerInfoFilled: false,
  //@ts-expect-error
  updatePassengerById: ({ id, info }: { id: number; info: Partial<Passenger> }) => {},
  //@ts-expect-error
  updateAllPassengers: (state: Passenger[] | null) => {},
};

export const PassengersContext = createContext<PassengersContextProps>(initialState);

export const PassengersContextProvider: FC<WithChildren> = ({ children }) => {
  const [passengers, setPassengers] = useState<PassengersContextProps['passengers']>(initialState.passengers);
  const [isPassengerInfoFilled, setPassengerInfoFilled] = useState<PassengersContextProps['isPassengerInfoFilled']>(
    initialState.isPassengerInfoFilled,
  );

  function updatePassengerById({ id, info }: { id: number; info: Partial<Passenger> }) {
    setPassengers((prev) =>
      (prev ?? []).map((passenger) => (passenger.id === id ? { ...passenger, ...info } : { ...passenger })),
    );
  }

  function updateAllPassengers(state: Passenger[] | null) {
    setPassengers(state);
  }

  return (
    <PassengersContext.Provider value={{ passengers, isPassengerInfoFilled, updatePassengerById, updateAllPassengers }}>
      {children}
    </PassengersContext.Provider>
  );
};

PassengersContextProvider.displayName = 'Passengers.Context.Provider';
