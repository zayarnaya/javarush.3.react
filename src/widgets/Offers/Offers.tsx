import { useCallback, useContext, useState, type ChangeEvent, type FC, type FocusEvent } from 'react';
import { OffersList } from '../OffersList/OffersList';
import { OfferAndBaggage } from '../OfferAndBaggage/OfferAndBaggage';
import { BookingContext } from 'src/contexts';
import type { Offer } from 'src/api/mocks';

export const Offers: FC = () => {
  const [promoError, setPromoError] = useState(false);
  const {
    state: { promocodes },
    updateState,
  } = useContext(BookingContext);

  const handlePromocodeChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setPromoError(false);
    updateState({ key: 'code', values: e.currentTarget.value });
  }, []);

  const handlePromocodeApply = useCallback(
    (id: number) => {
      setPromoError(false);
      const offer = promocodes?.find((offer: Offer) => offer.id === id);
      if (!offer) {
        setPromoError(true);
      } else {
        updateState({ key: 'code', values: offer.code });
      }
    },
    [promoError, promocodes],
  );

  const handlePromocodeBlur = useCallback(
    (e: FocusEvent<HTMLInputElement>) => {
      setPromoError(false);
      const code = e.currentTarget.value?.toLowerCase();
      if (!code) return;

      const offer = promocodes?.find((offer: Offer) => offer.code.toLowerCase() === code);
      if (!offer) {
        setPromoError(true);
      } else {
        updateState({ key: 'code', values: e.currentTarget.value });
      }
    },
    [promoError, promocodes],
  );
  return (
    <>
      <OffersList handlePromocodeApply={handlePromocodeApply} />

      <OfferAndBaggage
        promoError={promoError}
        handlePromocodeChange={handlePromocodeChange}
        handlePromocodeBlur={handlePromocodeBlur}
      />
    </>
  );
};
