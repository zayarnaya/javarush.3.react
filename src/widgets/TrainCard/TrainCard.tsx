import { useCallback, type FC } from 'react';
import { Card, Flex, Typography } from 'antd';

import style from './TrainCard.module.scss';
import type { ClassCode, Train } from 'src/mockData/mocks';
import { ClassCard, StationInfo } from './components';

interface Props {
  train: Train;
  onSelectTrain: (id: number, code: string) => void;
}

const { Title, Text } = Typography;

export const TrainCard: FC<Props> = ({ train, onSelectTrain, ...props }) => {
  const handleClassSelect = useCallback(
    (code: ClassCode) => {
      onSelectTrain(train.id, code);
    },
    [train, onSelectTrain],
  );
  return (
    <Card {...props} className={style.card}>
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
      <Flex justify="space-between">
        {train.classes.map((item, index) => (
          <ClassCard
            key={`${item.classCode}#${index}`}
            onClick={handleClassSelect}
            code={item.classCode}
            name={item.className}
            price={item.price}
            avl={item.availability.type === 'available' && item.availability.count}
            wl={item.availability.type === 'waitlist' && item.availability.position}
            tariff={item.fareType}
          />
        ))}
      </Flex>
    </Card>
  );
};

TrainCard.displayName = 'Train.Card';
