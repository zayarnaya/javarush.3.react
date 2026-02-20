import { type FC } from 'react';

import style from './TrainInfo.module.scss';
import { StationInfo } from 'src/components';
import { Typography } from 'antd';
import type { Train } from 'src/api/mocks';

const { Text } = Typography;

interface Props {
  train: Train | null;
}

export const TrainInfo: FC<Props> = ({ train }) => {
  return train ? (
    <div className={style.grid}>
      <StationInfo
        date={train.from.date}
        time={train.from.time}
        station={{ name: train.from.station, code: train.from.code }}
      />
      <Text type="secondary" className={style.middle}>
        {train.duration}
      </Text>
      <StationInfo
        date={train.to.date}
        time={train.to.time}
        station={{ name: train.to.station, code: train.to.code }}
        align="right"
      />
    </div>
  ) : null;
};

TrainInfo.displayName = 'Train.Info';
