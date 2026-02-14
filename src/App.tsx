import { RouterProvider } from 'react-router';
import './App.scss';
import { router } from './router/router';
import { BookingContextProvider, StationsContextProvider, TicketFormContextProvider } from './contexts';

function App() {
  return (
    <BookingContextProvider>
      <StationsContextProvider>
        <TicketFormContextProvider>
          <RouterProvider router={router} />
        </TicketFormContextProvider>
      </StationsContextProvider>
    </BookingContextProvider>
  );
}

export default App;
