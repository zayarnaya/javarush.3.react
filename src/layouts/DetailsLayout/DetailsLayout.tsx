import { Card } from 'antd';
import { forwardRef, type FC, type HTMLAttributes } from 'react';
import cn from 'classnames';

import style from './DetailsLayout.module.scss';

interface Props extends HTMLAttributes<HTMLDivElement> {
  loading?: boolean;
}

export const DetailsLayout: FC<Props> = forwardRef<HTMLDivElement, Props>(
  ({ children, loading, className, ...props }, ref) => {
    return (
      <Card {...props} ref={ref} className={cn(style.details, className)} loading={loading}>
        {children}
      </Card>
    );
  },
);

DetailsLayout.displayName = 'Details.Layout';
