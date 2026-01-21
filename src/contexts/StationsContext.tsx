import { createContext } from 'react';

export interface Station {
  name: string;
  code: string;
}

export interface StationsContextProps {
  stations: Station[] | null;
  loading: boolean;
}

export const StationsContext = createContext<StationsContextProps>({
  stations: null,
  loading: false,
});
