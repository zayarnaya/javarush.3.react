import type { FC, HTMLAttributes } from 'react';
import style from './FooterNavList.module.scss';
import { FooterNavListItem } from './FooterNavListItem/FooterNavListItem';
import { Typography } from 'antd';

interface NavListItem {
  text: string;
  link?: string;
}

interface Props extends HTMLAttributes<HTMLDivElement> {
  label: string;
  items: NavListItem[];
}

const { Title } = Typography;

export const FooterNavList: FC<Props> = ({ items, label }) => {
  return (
    <ul className={style.list}>
      <Title level={4} className={style.heading}>
        {label}
      </Title>
      {items.map((item) => (
        <FooterNavListItem {...item} key={item.text} />
      ))}
    </ul>
  );
};

FooterNavList.displayName = 'Footer.Nav.List';
