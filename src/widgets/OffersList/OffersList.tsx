import { Card, Flex, Typography } from 'antd';
import { useContext, type FC } from 'react';
import type { Offer } from 'src/api/mocks';
import { BookingContext } from 'src/contexts';
import { OfferCard } from '../OfferCard/OfferCard';

import style from './OffersList.module.scss';

const { Title } = Typography;

interface Props {
  handlePromocodeApply: (id: number) => void;
}

export const OffersList: FC<Props> = ({ handlePromocodeApply }) => {
  const {
    state: { promocodes, offersLoading },
  } = useContext(BookingContext);

  return (
    <Card className={style.offers} loading={offersLoading}>
      <Title level={3} className={style['offers__title']}>
        Offers
      </Title>
      <Flex vertical gap={32}>
        {promocodes &&
          promocodes.map((offer: Offer) => (
            <OfferCard offer={offer} key={offer.id} handleClick={handlePromocodeApply} />
          ))}
      </Flex>
    </Card>
  );
};

OffersList.displayName = 'Offers.List';
