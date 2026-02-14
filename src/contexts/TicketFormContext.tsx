import { createContext, useState, type FC } from 'react';
import type { WithChildren } from 'src/types';

export interface TicketFormState {
  type: 'round' | 'one-way';
  passengers: number | null;
  departure: string | null;
  arrival: string | null;
  date: string[] | null;
  isFormFilled: boolean;
}

export const initialFormState: TicketFormState = {
  type: 'round',
  passengers: 1,
  departure: null,
  arrival: null,
  date: null,
  isFormFilled: false,
};

export type TicketFormContextEntry = {
  [K in keyof TicketFormState]: {
    key: K;
    values: NonNullable<TicketFormState[K]>;
  };
}[keyof TicketFormState];

export interface TicketFormContextProps {
  state: TicketFormState;
  updateState: (entry: TicketFormContextEntry) => void;
}

export const TicketFormContext = createContext<TicketFormContextProps>({
  state: initialFormState,
  //@ts-expect-error
  updateState: (entry: TicketFormContextEntry) => {},
});

export const TicketFormContextProvider: FC<WithChildren> = ({ children }) => {
  const [type, setType] = useState<TicketFormState['type']>(initialFormState.type);
  const [passengers, setPassengers] = useState<TicketFormState['passengers']>(initialFormState.passengers);
  const [departure, setDeparture] = useState<TicketFormState['departure']>(initialFormState.departure);
  const [arrival, setArrival] = useState<TicketFormState['arrival']>(initialFormState.arrival);
  const [date, setDate] = useState<TicketFormState['date']>(initialFormState.date);
  const [isFormFilled, setIsFormFilled] = useState<TicketFormState['isFormFilled']>(initialFormState.isFormFilled);

  type FilledFormProps = Pick<TicketFormState, 'passengers' | 'departure' | 'arrival' | 'date'>;
  const updateFormFilled = ({ passengers, departure, arrival, date }: FilledFormProps) => {
    setIsFormFilled(true);
    if (!passengers || !departure || !arrival || !date) {
      setIsFormFilled(false);
    }
  };

  function updateState({ key, values }: TicketFormContextEntry) {
    switch (key) {
      case 'type':
        setType(values);
        break;
      case 'passengers':
        setPassengers(values);
        updateFormFilled({ passengers: values, departure, arrival, date });
        break;
      case 'departure':
        setDeparture(values);
        updateFormFilled({ passengers, departure: values, arrival, date });
        break;
      case 'arrival':
        setArrival(values);
        updateFormFilled({ passengers, departure, arrival: values, date });
        break;
      case 'date':
        setDate(values);
        updateFormFilled({ passengers, departure, arrival, date: values });
        break;
      case 'isFormFilled':
      default:
        break;
    }
  }

  return (
    <TicketFormContext.Provider
      value={{ state: { type, passengers, departure, arrival, date, isFormFilled }, updateState }}
    >
      {children}
    </TicketFormContext.Provider>
  );
};

TicketFormContextProvider.displayName = 'Ticket.Form.Context.Provider';
