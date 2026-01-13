import { Outlet } from "react-router" 
import { MainLayout } from "src/layouts/MainLayout/MainLayout"

export const HomePage = () => {
    return (
        <MainLayout>
            <Outlet />
        </MainLayout>
    )
}

HomePage.displayName = 'Home.Page'