import { type FC } from "react";
import { Outlet } from "react-router";

import './MainLayout.scss';
import { Header } from "src/widgets/Header/Header";

export const MainLayout:FC = () => {
    
    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
            <footer>
            </footer>
        </>
    )
}

MainLayout.displayName = 'Main.Layout';