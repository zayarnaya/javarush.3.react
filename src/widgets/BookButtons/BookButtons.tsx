import { Button, Flex, Typography } from 'antd';
import { useCallback, type FC } from 'react';

import style from './BookButtons.module.scss';
import { Disclamers } from 'src/components';

interface Props {
  onConfirm: () => void;
  onCancel: () => void;
  withError?: boolean;
  bookingError?: boolean;
  error?: boolean;
  bookLoading?: boolean;
}

const { Text } = Typography;

export const BookButtons: FC<Props> = ({
  onConfirm,
  onCancel,
  withError = false,
  bookingError = false,
  error = false,
  bookLoading = false,
}) => {
  const onBookingClick = useCallback(() => onConfirm(), [onConfirm]);
  const onCancelClick = useCallback(() => onCancel, [onCancel]);
  return (
    <>
      <Text type="secondary">Discounts, offers and price concessions will be applied later during payment</Text>
      <Button
        className={style.button}
        type="primary"
        variant="solid"
        onClick={onBookingClick}
        htmlType="button"
        loading={bookLoading}
      >
        Book Now
      </Button>
      <Button className={style.button} variant="outlined" color="danger" onClick={onCancelClick} htmlType="button">
        Cancel
      </Button>
      {withError && (
        <Flex justify="center" style={{ minHeight: '50px', display: 'flex' }}>
          {bookingError && (
            <Text type="danger" style={{ transition: 'all ease .5s' }}>
              Fill out Passenger Data, please!
            </Text>
          )}
          {error && (
            <Text type="danger" style={{ transition: 'all ease .5s' }}>
              Some error occured during booking, try again later!
            </Text>
          )}
        </Flex>
      )}
      <Disclamers />
    </>
  );
};
