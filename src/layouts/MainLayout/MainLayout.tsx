import { useContext, type FC } from 'react';
import { Outlet, useLocation } from 'react-router';
import cn from 'classnames';

import { Header, Footer } from 'src/widgets';

import style from './MainLayout.module.scss';

export const MainLayout: FC = () => {
  const { pathname } = useLocation();
  const darkTheme = pathname === '/';

  return (
    <>
      <Header darkTheme={darkTheme} />
      <main className={cn(style.main, darkTheme && style['main__dark'])}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

MainLayout.displayName = 'Main.Layout';
