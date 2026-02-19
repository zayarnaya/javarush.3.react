import { type FC } from 'react';
import { Outlet, useLocation } from 'react-router';
import cn from 'classnames';

import { Header, Footer } from 'src/widgets';

import style from './MainLayout.module.scss';
import { BookingContextProvider, StationsContextProvider, TicketFormContextProvider } from 'src/contexts';

export const MainLayout: FC = () => {
  const { pathname } = useLocation();
  const isMainPage = pathname === '/';

  return (
    <BookingContextProvider>
      <StationsContextProvider>
        <TicketFormContextProvider>
          <Header darkTheme={isMainPage} />
          <main className={cn(style.main, isMainPage && style['main__dark'])}>
            <Outlet />
          </main>
          <Footer />
        </TicketFormContextProvider>
      </StationsContextProvider>
    </BookingContextProvider>
  );
};

MainLayout.displayName = 'Main.Layout';
