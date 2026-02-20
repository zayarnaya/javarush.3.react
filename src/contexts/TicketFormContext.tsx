import { createContext, useEffect, useState, type FC } from 'react';
import { useSearchParams } from 'react-router';
import type { WithChildren } from 'src/types';

export interface TicketFormState {
  type: 'round' | 'one-way';
  passengers: number | null;
  departure: string | null;
  arrival: string | null;
  date: number[] | null;
  trainId: number | null;
  isFormFilled: boolean;
}

export const initialFormState: TicketFormState = {
  type: 'round',
  passengers: 1,
  departure: null,
  arrival: null,
  date: null,
  trainId: null,
  isFormFilled: false,
};

export type FormState = Record<string, string | number | string[] | null | undefined>;

export type TicketFormContextEntry = {
  [K in keyof TicketFormState]: {
    key: K;
    values: string | number | string[] | null | undefined;
    // values: NonNullable<TicketFormState[K]>;
  };
}[keyof TicketFormState];

export interface TicketFormContextProps {
  state: TicketFormState;
  updateState: (entry: TicketFormContextEntry) => void;
  updateAllState: (state: FormState) => void;
}

export const TicketFormContext = createContext<TicketFormContextProps>({
  state: initialFormState,
  //@ts-expect-error
  updateState: (entry: TicketFormContextEntry) => {},
  //@ts-expect-error
  updateAllState: (state: FormState) => {},
});

export const TicketFormContextProvider: FC<WithChildren> = ({ children }) => {
  const [searchParams] = useSearchParams();

  const [type, setType] = useState<TicketFormState['type']>(initialFormState.type);
  const [passengers, setPassengers] = useState<TicketFormState['passengers']>(initialFormState.passengers);
  const [departure, setDeparture] = useState<TicketFormState['departure']>(initialFormState.departure);
  const [arrival, setArrival] = useState<TicketFormState['arrival']>(initialFormState.arrival);
  const [date, setDate] = useState<TicketFormState['date']>(initialFormState.date);
  const [trainId, setTrainId] = useState<TicketFormState['trainId']>(initialFormState.trainId);
  const [isFormFilled, setIsFormFilled] = useState<TicketFormState['isFormFilled']>(initialFormState.isFormFilled);

  useEffect(() => {
    try {
      const search = Object.fromEntries(searchParams.entries());
      //@ts-expect-error
      search.date = search.date.split(',').map(Number);
      updateAllState(search);
    } catch (error) {
      console.error(error);
      return;
    }
  }, [searchParams]);

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
        if (values !== 'one-way' && values !== 'round') {
          values = initialFormState.type;
        }
        setType(values as TicketFormState['type']);
        break;
      case 'passengers':
        if (Array.isArray(values)) {
          values = values.length;
        } else if (values && typeof values !== 'number') {
          values = parseInt(values);
        } else if (!values) {
          values = 0;
        }
        setPassengers(values as number);
        updateFormFilled({ passengers: values as number, departure, arrival, date });
        break;
      case 'departure':
        setDeparture(values?.toString() ?? null);
        updateFormFilled({ passengers, departure: values?.toString() ?? null, arrival, date });
        break;
      case 'arrival':
        setArrival(values?.toString() ?? null);
        updateFormFilled({ passengers, departure, arrival: values?.toString() ?? null, date });
        break;
      case 'date':
        if (!values) {
          values = null;
        } else if (typeof values === 'string') {
          values = (values as string).split(',').slice(0, 2);
        } else if (Array.isArray(values)) {
          //@ts-expect-error
          values = values.slice(0, 2).map(Number) as number[];
        }
        setDate(values as TicketFormState['date']);
        updateFormFilled({ passengers, departure, arrival, date: values as TicketFormState['date'] });
        break;
      case 'trainId':
        if (values && typeof values !== 'number') {
          values = parseInt(values.toString());
        } else {
          values = null;
        }
        setTrainId(values);
        break;
      case 'isFormFilled':
      default:
        break;
    }
  }

  function updateAllState(state: Record<string, string | number | string[] | null | undefined>) {
    for (let key in state) {
      if (key in initialFormState) {
        updateState({ key: key as keyof TicketFormState, values: state[key as keyof TicketFormState] });
      }
    }
  }

  return (
    <TicketFormContext.Provider
      value={{
        state: { type, passengers, departure, arrival, date, trainId, isFormFilled },
        updateState,
        updateAllState,
      }}
    >
      {children}
    </TicketFormContext.Provider>
  );
};

TicketFormContextProvider.displayName = 'Ticket.Form.Context.Provider';
