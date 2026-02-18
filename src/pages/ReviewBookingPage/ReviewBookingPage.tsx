import { Button, Card, Flex, Form, Typography } from 'antd';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { useBooking } from 'src/api/mockApi';
import { PageLayout } from 'src/layouts';
import style from './ReviewBookingPage.module.scss';
import { mapFormData } from 'src/shared/helpers';
import { BookingContext } from 'src/contexts/BookingContext';
import { TicketFormContext } from 'src/contexts';
import { BillDetails, PassengerForm } from 'src/widgets';
import { BoardingDetails } from 'src/widgets/BoardingDetails/BoardingDetails';
import { Offers } from 'src/widgets/Offers/Offers';

const { Title, Text } = Typography;

export const ReviewBookingPage = () => {
  const navigate = useNavigate();

  const {
    state: { type, passengers: passengersNo, departure, arrival, date, trainId },
  } = useContext(TicketFormContext);

  const {
    state: {
      train,
      passengers,
      extraBaggage,
      classCode,
      code,
      meals,
      totalFood,
      baseAmount,
      totalDiscount,
      total,
      totalSum,
      trainLoading,
    },
  } = useContext(BookingContext);

  const { loading: bookingLoading, error, book } = useBooking();

  const [bookingFormError, setBookingFormError] = useState(false);

  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    if (bookingFormError) {
      timerRef.current = setTimeout(() => setBookingFormError(false), 3000);
    }
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [bookingFormError]);

  const handleBooking = useCallback(async () => {
    if (!train || !classCode) {
      navigate('/');
      return;
    }
    if (!passengers) {
      setBookingFormError(true);
      return;
    }

    const purchaseId = await book({
      train,
      passengers,
      extraBaggage: extraBaggage ?? false,
      classCode,
      code: code ?? '',
      baseAmount: baseAmount ?? 0,
      totalDiscount: totalDiscount ?? 0,
      totalFood: totalFood ?? 0,
      totalSum: totalSum ?? 0,
      total: total ?? 0,
      meals,
    });
    navigate({ pathname: '/payment', search: new URLSearchParams({ purchaseId: `${purchaseId}` }).toString() });
  }, [train, passengers, extraBaggage, classCode, code, baseAmount, totalDiscount, totalFood, totalSum, total, meals]);

  const [form] = Form.useForm();
  return (
    <PageLayout>
      <Flex vertical gap={32} className={style.wrapper}>
        <Title level={1}>Review your booking</Title>

        <BoardingDetails loading={trainLoading} />

        <PassengerForm form={form} onFinish={handleBooking} onFinishFailed={() => setBookingFormError(true)} />
        {/* {passengers &&
          passengers.map((passenger) => <PassengerCard id={passenger.id} key={`passenger__${passenger.id}`} />)} */}

        <Offers />

        <BillDetails />

        <Card variant="borderless" style={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
          <Flex vertical align="center" gap={16}>
            <Text type="secondary">Discounts, offers and price concessions will be applied later during payment</Text>
            <Button
              style={{ width: '400px', padding: '16px 0', height: '56px' }}
              type="primary"
              variant="solid"
              // onClick={handleBooking}
              onClick={() => form.submit()}
              loading={bookingLoading}
              htmlType="button"
            >
              Book Now
            </Button>
            <Button
              style={{ width: '400px', padding: '16px 0', height: '56px' }}
              variant="outlined"
              color="danger"
              onClick={() =>
                navigate({
                  pathname: '/search-results',
                  search: mapFormData({ type, passengers: passengersNo, departure, arrival, date, trainId }),
                })
              }
            >
              Cancel
            </Button>
            <Flex justify="center" style={{ height: '60px', display: 'flex' }}>
              {bookingFormError && (
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
            <Flex gap={32} justify="center">
              <Text type="secondary" style={{ cursor: 'pointer' }}>
                Cancellation Policy
              </Text>
              <Text type="secondary" style={{ cursor: 'pointer' }}>
                Terms & Conditions
              </Text>
              <Text type="secondary" style={{ cursor: 'pointer' }}>
                Travel Insurance
              </Text>
            </Flex>
          </Flex>
        </Card>
      </Flex>
    </PageLayout>
  );
};

ReviewBookingPage.displayName = 'Review.Booking.Page';
