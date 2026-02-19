import { Card, Flex, Typography } from 'antd';
import { useContext, type FC } from 'react';
import { StationInfo } from 'src/components';
import { BookingContext } from 'src/contexts';
import cn from 'classnames';

import style from './BoardingDetails.module.scss';

interface Props {
  loading?: boolean;
  inset?: boolean;
}

const { Title, Text } = Typography;

export const BoardingDetails: FC<Props> = ({ loading = false, inset = false }) => {
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
            <Text>Class {classCode} & Tatkal Quota</Text>
          </Flex>

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
        </>
      )}
    </Card>
  );
};

BoardingDetails.displayName = 'Boarding.Details';
