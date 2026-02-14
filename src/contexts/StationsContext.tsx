import { createContext, useEffect, type FC } from 'react';
import { useFetchStations } from 'src/api/mockApi';
import type { WithChildren } from 'src/types';

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

export const StationsContextProvider: FC<WithChildren> = ({ children }) => {
  const { data: stations, loading, fetchStations } = useFetchStations();

  useEffect(() => {
    if (!stations) {
      fetchStations();
    }
  }, [stations]);

  return <StationsContext.Provider value={{ stations, loading }}>{children}</StationsContext.Provider>;
};

StationsContextProvider.displayName = 'Stations.Context.Provider';
