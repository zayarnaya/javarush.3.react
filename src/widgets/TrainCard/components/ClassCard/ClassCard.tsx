import { useCallback, type FC } from 'react';
import cn from 'classnames';

import style from './ClassCard.module.scss';
import { to3digit, toRupeees } from './helpers';

export type ClassCode = '3A' | '2A' | '1A';

interface Props {
  code: ClassCode;
  avl?: number | false;
  wl?: number | false;
  tariff?: string;
  name?: string;
  price: number | string;
  onClick: (code: ClassCode) => void;
}

export const ClassCard: FC<Props> = ({ code, avl, wl = 1, tariff = 'TatKal', price, onClick, name = '' }) => {
  const handleClick = useCallback(() => onClick(code), [code]);
  return (
    <div className={cn(style.wrapper, style[`code__${code}`])} onClick={handleClick} aria-label={name}>
      <div className={style.row}>
        <span>{code}</span>
        <span>{avl ? `Avl - ${to3digit(avl)}` : `WL - ${wl}`}</span>
      </div>
      <div className={style.row}>
        <span>{tariff}</span>
        <span>{typeof price === 'number' ? toRupeees(price) : price}</span>
      </div>
    </div>
  );
};

ClassCard.displayName = 'Class.Card';
