import { Card, Flex, Form, Typography } from 'antd';
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
import { BookButtons } from 'src/widgets/BookButtons/BookButtons';

const { Title } = Typography;

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

  const { loading: bookLoading, error, book } = useBooking();

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
      console.error(
        'ОШИБКА С ДАННЫМИ',
        JSON.stringify({ train, classCode, passengers, extraBaggage, baseAmount, totalDiscount, totalFood, totalSum }),
      );
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

        <BoardingDetails loading={trainLoading} showClass />

        <PassengerForm form={form} onFinish={handleBooking} onFinishFailed={() => setBookingFormError(true)} />

        <Offers />

        <BillDetails />

        <Card
          variant="borderless"
          type="inner"
          style={{ backgroundColor: 'transparent', boxShadow: 'none', padding: 0 }}
        >
          <Flex vertical align="center" gap={16}>
            <BookButtons
              onConfirm={() => form.submit()}
              onCancel={() =>
                navigate({
                  pathname: '/search-results',
                  search: mapFormData({ type, passengers: passengersNo, departure, arrival, date, trainId }),
                })
              }
              withError
              error={!!error}
              bookingError={bookingFormError}
              bookLoading={bookLoading}
            />
          </Flex>
        </Card>
      </Flex>
    </PageLayout>
  );
};

ReviewBookingPage.displayName = 'Review.Booking.Page';
export default ReviewBookingPage;
