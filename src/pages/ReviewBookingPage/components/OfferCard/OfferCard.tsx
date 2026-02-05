import { Button, Flex } from 'antd';
import { useCallback, type FC, type HTMLAttributes } from 'react';
import style from './OfferCard.module.scss';
import type { Offer } from 'src/api/mocks';
import { makeOfferString } from './helpers';

interface Props extends HTMLAttributes<HTMLDivElement> {
  offer: Offer;
  handleClick: (id: number) => void;
}

export const OfferCard: FC<Props> = ({ offer, handleClick, ...rest }) => {
  const handleApplyClick = useCallback(() => handleClick(offer.id), []);
  return (
    <Flex justify="space-between" gap={20} {...rest} data-id={offer.id}>
      <Flex gap={8} className={style.info}>
        {makeOfferString(offer)}
      </Flex>
      <Button type="link" onClick={handleApplyClick}>
        Apply
      </Button>
    </Flex>
  );
};
