import { Card, Typography } from 'antd';
import { useContext, type FC } from 'react';
import { BookingContext } from 'src/contexts';
import { TravellerCard } from '../TravellerCard/TravellerCard';

import style from './TravellerDetails.module.scss';

const { Title } = Typography;

export const TravellerDetails: FC = () => {
  const {
    state: { passengers },
  } = useContext(BookingContext);
  return (
    <Card type="inner" className={style.card}>
      <Title level={5}>Traveller Details</Title>
      {!!passengers?.length && passengers.map((passenger) => <TravellerCard {...passenger} key={passenger.id} />)}
    </Card>
  );
};
