import { Card } from 'antd';
import type { FC } from 'react';
import type { WithChildren } from 'src/types';

import style from './DetailsLayout.module.scss';

interface Props extends WithChildren {
  loading?: boolean;
}

export const DetailsLayout: FC<Props> = ({ children, loading }) => {
  return (
    <Card className={style.details} loading={loading}>
      {children}
    </Card>
  );
};

DetailsLayout.displayName = 'Details.Layout';
