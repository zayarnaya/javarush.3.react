import { type FC } from 'react';
import logo from '@images/logo-white.svg';
import style from './Footer.module.scss';
import { navListItems } from './consts/navlistitems';
import { FooterNavList } from './FooterNavList/FooterNavList';

interface Props {
  isMainPage?: boolean;
}

export const Footer: FC<Props> = ({ isMainPage = false }) => {
  return isMainPage ? (
    <footer className={style.footer}>
      <div className={style.footerLogo}>
        <img src={logo} alt="" className={style.image} />
        <span className={style.footerLogoName}>Railway</span>
      </div>
      <nav className={style.nav}>
        {navListItems.map((item) => (
          <FooterNavList {...item} key={item.label} />
        ))}
      </nav>
      <div className={style.cp}>©2025 RailWay. All rights reserved</div>
    </footer>
  ) : null;
};

Footer.displayName = 'Footer';
