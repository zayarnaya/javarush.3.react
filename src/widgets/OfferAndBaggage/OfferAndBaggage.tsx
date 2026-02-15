import { Button, Card, Input, Typography } from 'antd';
import { useCallback, useContext, useState, type ChangeEvent, type FC, type FocusEvent } from 'react';

import style from './OfferAndBaggage.module.scss';
import { BookingContext } from 'src/contexts';

const { Title, Paragraph } = Typography;

interface Props {
  promoError: boolean;
  handlePromocodeChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handlePromocodeBlur: (e: FocusEvent<HTMLInputElement>) => void;
}

export const OfferAndBaggage: FC<Props> = ({ promoError, handlePromocodeChange, handlePromocodeBlur }) => {
  const {
    state: { extraBaggage, code },
    updateState,
  } = useContext(BookingContext);

  const handleExtraBaggageAdd = useCallback(() => updateState({ key: 'extraBaggage', values: true }), []);
  const handleExtraBaggageRemove = useCallback(() => updateState({ key: 'extraBaggage', values: false }), []);

  return (
    <div className={style.cards}>
      <Card className={style.card}>
        <Title level={3}>Apply Code</Title>
        <div className={style['promo-error']}>
          {promoError && <Paragraph type="danger">There is no such promocode! Try using another.</Paragraph>}
        </div>
        <Input
          placeholder="Enter Code"
          onChange={handlePromocodeChange}
          onBlur={handlePromocodeBlur}
          value={code ?? ''}
        />
      </Card>
      <Card className={style.card}>
        <Title level={3}>Extra Baggage</Title>
        <div className={style['promo-error']}></div>
        <Button
          color="default"
          variant="outlined"
          className={style['card__button']}
          onClick={extraBaggage ? handleExtraBaggageRemove : handleExtraBaggageAdd}
        >
          {extraBaggage ? 'Remove from Ticket' : 'Add to Ticket'}
        </Button>
      </Card>
    </div>
  );
};

OfferAndBaggage.displayName = 'Offer.And.Baggage.Card';
