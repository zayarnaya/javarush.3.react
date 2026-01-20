import { useContext, type FC } from "react";
import { Outlet } from "react-router";
import cn from 'classnames';

import { Header, Footer } from "src/widgets";

import style from './MainLayout.module.scss';
import { ThemeContext } from "src/contexts/ThemeContext";

export const MainLayout:FC = () => {
    const {theme} = useContext(ThemeContext);
    return (
        <>
            <Header />
            <main className={cn(style.main, theme === 'dark' && style["main__dark"])}>
                <Outlet />
            </main>
            <Footer />
        </>
    )
}

MainLayout.displayName = 'Main.Layout';