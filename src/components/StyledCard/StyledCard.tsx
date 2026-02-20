import { Card, type CardProps } from 'antd';
import type { FC } from 'react';
import cn from 'classnames';

import style from './StyledCard.module.scss';

interface Props extends CardProps {}

export const StyledCard: FC<Props> = ({ className, children, ...props }) => (
  <Card {...props} className={cn(style.card, className)}>
    {children}
  </Card>
);
