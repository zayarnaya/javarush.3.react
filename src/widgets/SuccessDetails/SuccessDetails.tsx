import { forwardRef, type HTMLAttributes } from 'react';
import { DetailsLayout } from 'src/layouts';
import { BoardingDetails } from '../BoardingDetails/BoardingDetails';
import { TravellerDetails } from '../TravellerDetails/TravellerDetails';

import style from './SuccessDetails.module.scss';
import { Card, Flex } from 'antd';
import { makeRandomNumberSequence } from 'src/shared/helpers';

interface Props extends HTMLAttributes<HTMLDivElement> {
  loading?: boolean;
}

export const SuccessDetails = forwardRef<HTMLDivElement, Props>(({ loading = false }, ref) => {
  return loading ? (
    <Card loading />
  ) : (
    //@ts-expect-error
    <DetailsLayout className={style.wrapper} ref={ref}>
      <Flex justify="space-between" gap={32}>
        <span>PNR No: {makeRandomNumberSequence(10)}</span>
        <span>Transaction ID : {makeRandomNumberSequence(15)}</span>
      </Flex>
      <BoardingDetails inset />
      <TravellerDetails />
    </DetailsLayout>
  );
});

SuccessDetails.displayName = 'Success.Details';
