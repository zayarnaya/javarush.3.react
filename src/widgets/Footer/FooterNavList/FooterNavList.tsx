import type { FC, HTMLAttributes } from 'react';
import style from './FooterNavList.module.scss';
import { FooterNavListItem } from './FooterNavListItem/FooterNavListItem';

interface NavListItem {
  text: string;
  link?: string;
}

interface Props extends HTMLAttributes<HTMLDivElement> {
  label: string;
  items: NavListItem[];
}

export const FooterNavList: FC<Props> = ({ items, label }) => {
  return (
    <ul className={style.list}>
      <h6 className={style.heading}>{label}</h6>
      {items.map((item) => (
        <FooterNavListItem {...item} key={item.text} />
      ))}
    </ul>
  );
};

FooterNavList.displayName = 'Footer.Nav.List';
