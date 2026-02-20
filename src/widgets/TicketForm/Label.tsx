import type { WithChildren } from 'src/types';
import style from './TicketForm.module.scss';
import type { FC } from 'react';
import cn from 'classnames';

interface Props extends WithChildren {
  className?: string;
}

export const Label: FC<Props> = ({ children, className }) => (
  <span className={cn(style.label, className)}>{children}</span>
);

Label.displayName = 'Label';
