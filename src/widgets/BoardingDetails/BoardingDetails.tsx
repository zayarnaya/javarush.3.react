import { Card, Flex, Typography } from 'antd';
import { useContext, type FC } from 'react';
import { BookingContext } from 'src/contexts';
import cn from 'classnames';

import style from './BoardingDetails.module.scss';
import { TrainInfo } from '../TrainInfo/TrainInfo';

interface Props {
  loading?: boolean;
  inset?: boolean;
  showClass?: boolean;
}

const { Title, Text } = Typography;

export const BoardingDetails: FC<Props> = ({ loading = false, inset = false, showClass = false }) => {
  const {
    state: { train, classCode },
  } = useContext(BookingContext);

  return (
    <Card
      loading={loading}
      classNames={() => ({ root: { padding: '0' } })}
      className={cn(style.card, inset && style.inset)}
      type={inset ? 'inner' : undefined}
    >
      <Title level={4}>Boarding Details</Title>
      {train && (
        <>
          <Flex justify="space-between">
            <Title level={5}>
              {train.trainNumber} - {train.trainName}
            </Title>
            {showClass && <Text className={style.showClass}>Class {classCode} & Tatkal Quota</Text>}
          </Flex>

          <TrainInfo train={train} />
        </>
      )}
    </Card>
  );
};

BoardingDetails.displayName = 'Boarding.Details';
