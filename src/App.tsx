import { RouterProvider } from 'react-router'
import './App.scss'
import { router } from './router/router'
import { useEffect, useState } from 'react';
import { ThemeContext, type Theme, type ThemeContextProps } from './contexts/ThemeContext';
import { StationsContext, type StationsContextProps } from './contexts/StationsContext';
import { initialFormState, TicketFormContext, type TicketFormContextProps, type TicketFormValuesPartial } from './contexts/TicketFormContext';
import { useFetch } from './api/useFetch';


function App() {
  const [theme, setTheme] = useState<Theme>('dark');
  const themeContext: ThemeContextProps = { theme, setTheme };

  const { loading, data, fetchIt } = useFetch();
  const stationsContext: StationsContextProps = { stations: data, loading };

  const [values, setValues] = useState<TicketFormValuesPartial>(initialFormState);
  const formContext: TicketFormContextProps = { values, setValues };

  
  
  useEffect(() => {
        fetchIt('stations');
    }, []);

  return (
    <ThemeContext.Provider value={themeContext}>
      <StationsContext.Provider value={stationsContext}>
        <TicketFormContext.Provider value={formContext}>
          <RouterProvider router={router} />
        </TicketFormContext.Provider>
      </StationsContext.Provider>
    </ThemeContext.Provider>

  )
}

export default App
