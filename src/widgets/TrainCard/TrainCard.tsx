import type { FC } from 'react';
import { Card, Flex, Typography } from 'antd';

import style from './TrainCard.module.scss';
import type { Train } from 'src/mockData/mocks';
import { StationInfo } from './components';

interface Props {
  loading?: boolean;
  train: Train;
}

const { Title, Text } = Typography;

export const TrainCard: FC<Props> = ({ loading = false, train }) => {
  return (
    <Card loading={loading} className={style.card}>
      <Title level={3}>
        {train.trainNumber} - {train.trainName}
      </Title>
      <Text>Runs on:</Text>
      <div className={style.reg}>Everyday</div>
      <Flex justify="space-between">
        <StationInfo
          date={train.from.date}
          time={train.from.time}
          station={{ name: train.from.station, code: train.from.code }}
        />
        <Text type="secondary">{train.duration}</Text>
        <StationInfo
          date={train.to.date}
          time={train.to.time}
          station={{ name: train.to.station, code: train.to.code }}
          align="right"
        />
      </Flex>
    </Card>
  );
};

TrainCard.displayName = 'Train.Card';
