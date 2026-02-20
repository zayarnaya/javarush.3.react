import { useCallback, useState, type FC } from 'react';
import { NavLink, useNavigate } from 'react-router';
import cn from 'classnames';
import logo from '@images/logo.svg';
import logoWhite from '@images/logo-white.svg';

import './Header.scss';

interface Props {
  darkTheme?: boolean;
}

export const Header: FC<Props> = ({ darkTheme = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleMenuToggle = useCallback(() => setIsOpen((prev) => !prev), []);
  const navigate = useNavigate();

  return (
    <header className={cn('header', darkTheme && 'header__dark')}>
      <div className={cn('logo', !darkTheme && 'active')} onClick={darkTheme ? undefined : () => navigate('/')}>
        <img className="logo__image" alt="Railway" src={darkTheme ? logoWhite : logo} width="74" />
        <span className="logo__name">Railway</span>
      </div>
      <div className="header__hamburger">
        <button
          className={cn('header__toggler', isOpen && 'active')}
          aria-label="Toggle menu"
          onClick={handleMenuToggle}
        >
          <div className="line1" aria-hidden></div>
          <div className="line2" aria-hidden></div>
          <div className="line3" aria-hidden></div>
        </button>
      </div>
      <nav className={cn('header__nav', isOpen && 'active')}>
        <NavLink to="/">Mobile App</NavLink>
        <NavLink to="/">FAQs</NavLink>
        <NavLink to="/">Contact</NavLink>
        <NavLink to="/">Sign Up</NavLink>
      </nav>
    </header>
  );
};

Header.displayName = 'Header';
