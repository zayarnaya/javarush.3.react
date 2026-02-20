import type { FC } from 'react';
import cn from 'classnames';

import style from './StationInfo.module.scss';

interface Props {
  date: string;
  time: string;
  station: {
    name: string;
    code: string;
  };
  align?: 'left' | 'right';
}

export const StationInfo: FC<Props> = ({ date, time, station: { name, code }, align = 'left' }) => {
  return (
    <div className={style.wrapper}>
      <p className={cn(style.paragraph, align === 'right' && style['align-right'])}>{date}</p>
      <p className={cn(style.paragraph, align === 'right' && style['align-right'])}>{time}</p>
      <p className={cn(style.paragraph, align === 'right' && style['align-right'])}>
        {name} - {code}
      </p>
    </div>
  );
};

StationInfo.displayName = 'Station.Info';
