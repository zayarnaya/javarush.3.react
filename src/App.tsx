import { RouterProvider } from 'react-router';
import './App.scss';
import { router } from './router/router';
import { useEffect, useState } from 'react';
import { StationsContext, type StationsContextProps } from './contexts/StationsContext';
import {
  initialFormState,
  TicketFormContext,
  type TicketFormContextProps,
  type TicketFormValuesPartial,
} from './contexts/TicketFormContext';
import { useFetch } from './api/useFetch';
import { BookingContextProvider } from './contexts/BookingContext';

function App() {
  const { loading, data, fetchIt } = useFetch();
  const stationsContext: StationsContextProps = { stations: data, loading };

  const [values, setValues] = useState<TicketFormValuesPartial>(initialFormState);
  const formContext: TicketFormContextProps = { values, setValues };

  useEffect(() => {
    fetchIt('stations');
  }, []);

  return (
    <BookingContextProvider>
      <StationsContext.Provider value={stationsContext}>
        <TicketFormContext.Provider value={formContext}>
          <RouterProvider router={router} />
        </TicketFormContext.Provider>
      </StationsContext.Provider>
    </BookingContextProvider>
  );
}

export default App;
