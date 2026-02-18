import { useContext, type FC } from 'react';
import type { Passenger } from 'src/api/mockApi';
import { BookingContext } from 'src/contexts';
import dayjs from 'dayjs';
import { TravellerRow } from './TravellerRow/TravellerRow';

interface Props extends Passenger {}

export const TravellerCard: FC<Props> = ({ fullName, birthDate, email, meal = [] }) => {
  const {
    state: { food, extraBaggage },
  } = useContext(BookingContext);

  const foodList = meal?.map((item) => food?.find(({ id }) => item === id));

  const age = Math.abs(dayjs(birthDate).diff(new Date(), 'year'));
  return (
    <>
      <TravellerRow textLeft={fullName ?? ''} textRight={`${age} Yrs`} />
      <TravellerRow textLeft="Extra Baggage" textRight={extraBaggage ? '1' : '0'} />
      {!!foodList.length &&
        foodList.map((item, index) => (
          <TravellerRow textLeft={item?.name ?? ''} textRight={item?.name ? '1' : ''} key={`${item?.id ?? index}`} />
        ))}
      <TravellerRow textLeft="E-Tickets will be sent to:" textRight={email ?? ''} />
    </>
  );
};
