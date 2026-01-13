import { useCallback, useState, type FC } from "react";
import { NavLink, Outlet } from "react-router";
import cn from 'classnames';
import logo from '@images/logo.svg';
import './MainLayout.scss';

export const MainLayout:FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const handleMenuToggle = useCallback(() => setIsOpen(prev => !prev), []);
    return (
        <>
            <header className="header">
                <div className="logo">
                    <img className="logo__image" alt="Railway" src={logo} width="74" />
                    <span className="logo__name">Railway</span>
                </div>
                <div className="header__hamburger">
                    <button className={cn("header__toggler", isOpen && 'active')} aria-label="Toggle menu" onClick={handleMenuToggle}>
                        <div className="line1" aria-hidden></div>
                        <div className="line2" aria-hidden></div>
                        <div className="line3" aria-hidden></div>
                    </button>
                </div>
                <nav className={cn("header__nav", isOpen && 'active')}>
                    <NavLink to="/">Mobile App</NavLink>
                    <NavLink to="/">FAQs</NavLink>
                    <NavLink to="/">Contact</NavLink>
                    <NavLink to="/">Sign Up</NavLink>
                </nav>
            </header>
            <main>
                <Outlet />
            </main>
            <footer>
            </footer>
        </>
    )
}

MainLayout.displayName = 'Main.Layout';