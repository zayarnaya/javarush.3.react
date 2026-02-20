import { useCallback, type FC } from 'react';
import { Card, Flex, Typography } from 'antd';

import style from './TrainCard.module.scss';
import type { ClassCode, Train } from 'src/api/mocks';
import { ClassCard } from './components';
import { TrainInfo } from '../TrainInfo/TrainInfo';

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
      <Flex vertical gap={24}>
        <Title level={3}>
          {train.trainNumber} - {train.trainName}
        </Title>
        <Flex vertical>
          <Text>Runs on:</Text>
          <div className={style.reg}>Everyday</div>
        </Flex>
        <TrainInfo train={train} />
        <Flex justify="space-between" gap={8} className={style['class-card']}>
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
      </Flex>
    </Card>
  );
};

TrainCard.displayName = 'Train.Card';
