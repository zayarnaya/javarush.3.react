import { Button, Card, Flex, Input, Typography } from 'antd';
import { useCallback, useEffect, useMemo, useState, type ChangeEvent, type FocusEvent } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router';
import { useApplyCode, useFetchFood, useFetchOffers, useFetchTrain } from 'src/api/mockApi';
import { StationInfo } from 'src/components';
import { parseDate } from 'src/shared';
import { PageLayout } from 'src/layouts';
import { BillRow, FoodCard, OfferCard, PassengerCard, type Passenger } from './components';
import type { Food, Offer, Train } from 'src/api/mocks';
import style from './ReviewBookingPage.module.scss';
import { getBasePrice, getDiscountAmount, getTotalFoodAmount } from './helpers';
import { fromRupees, mapFormData } from 'src/shared/helpers';

const { Title, Paragraph, Text } = Typography;

export const ReviewBookingPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();
  const details = Object.fromEntries(searchParams.entries());
  //@ts-expect-error
  details.date = parseDate(details.date);

  const [passengersInfo, setPassengersInfo] = useState<Passenger[]>(
    new Array(+details.passengers).fill(null).map((_, index) => ({
      id: index + 1,
      fullName: null,
      phone: null,
      email: null,
      birthDate: null,
      meal: [],
    })),
  );

  const [tripDetails, setTripDetails] = useState(details);

  const { data: train, loading, fetchTrainById } = useFetchTrain();
  const { data: food, loading: foodLoading, fetchFood } = useFetchFood();
  const { data: offers, loading: offersLoading, fetchOffers } = useFetchOffers();

  const [promocode, setPromocode] = useState('');
  const [promoError, setPromoError] = useState(false);
  const [extraBaggage, setExtraBaggage] = useState(false);

  const handlePromocodeChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setPromoError(false);
      setPromocode(e.currentTarget.value);
    },
    [promocode],
  );

  const handlePromocodeApply = useCallback(
    (id: number) => {
      setPromoError(false);
      const offer = offers?.find((offer: Offer) => offer.id === id);
      if (!offer) {
        setPromoError(true);
      } else {
        setPromocode(offer.code);
      }
    },
    [promoError, offers],
  );

  const handlePromocodeBlur = useCallback(
    (e: FocusEvent<HTMLInputElement>) => {
      setPromoError(false);
      const code = e.currentTarget.value?.toLowerCase();
      if (!code) return;

      const offer = offers?.find((offer: Offer) => offer.code.toLowerCase() === code);
      if (!offer) {
        setPromoError(true);
      } else {
        setPromocode(e.currentTarget.value);
      }
    },
    [promoError, offers],
  );

  const handleExtraBaggageAdd = useCallback(() => setExtraBaggage(true), []);
  const handleExtraBaggageRemove = useCallback(() => setExtraBaggage(false), []);

  useEffect(() => {
    if (tripDetails.trainId) {
      fetchTrainById(tripDetails.trainId);
    } else {
      navigate('/');
    }
  }, [tripDetails.trainId]);

  useEffect(() => {
    if (!food) {
      fetchFood();
    }
  }, []);

  useEffect(() => {
    if (!offers) {
      fetchOffers();
    }
  }, []);

  const handleFieldChange = useCallback((e: ChangeEvent) => {
    const target = e.currentTarget as HTMLInputElement;
    const [, id, field] = (target.getAttribute('id') ?? '').split('_');

    setPassengersInfo((prev) =>
      prev.map((passenger) => (passenger.id === +id ? { ...passenger, [field]: target.value } : { ...passenger })),
    );
  }, []);

  const handleDateChange = useCallback((id: number, date: Date | null) => {
    setPassengersInfo((prev) =>
      prev.map((passenger) => (passenger.id === id ? { ...passenger, birthDate: date } : { ...passenger })),
    );
  }, []);

  const handleFoodChange = useCallback(
    (id: number, meal: number[]) =>
      setPassengersInfo((prev) =>
        prev.map((passenger) => (passenger.id === id ? { ...passenger, meal } : { ...passenger })),
      ),
    [],
  );

  const basePrice = useMemo(
    () => getBasePrice(train, tripDetails.classCode) * +tripDetails.passengers,
    [train, tripDetails.classCode],
  );

  const mealPrice = useMemo(
    () =>
      passengersInfo.reduce(
        //@ts-expect-error
        (acc: Record<string, number>, { meal }: { meal: number[] }) => {
          const newAcc = { ...acc };
          for (let id of meal) {
            if (!newAcc[`${id}`]) {
              newAcc[id] = 0;
            }
            newAcc[id] += 1;
          }
          return newAcc;
        },
        {},
      ),
    [passengersInfo],
  );

  return (
    <PageLayout>
      <Flex vertical gap={32} className={style.wrapper}>
        <Title level={1}>Review your booking</Title>
        <Card loading={loading}>
          <Title level={4}>Boarding Details</Title>
          {train && (
            <>
              <Flex justify="space-between">
                <Title level={5}>
                  {train.trainNumber} - {train.trainName}
                </Title>
                <Text>Class {tripDetails.classCode} & Tatkal Quota</Text>
              </Flex>

              <Flex justify="space-between">
                <StationInfo
                  date={train.from.date}
                  time={train.from.time}
                  station={{ name: train.from.station, code: train.from.code }}
                />
                <Text type="secondary">{train.duration}</Text>
                <StationInfo
                  date={train.to.date}
                  time={train.to.time}
                  station={{ name: train.to.station, code: train.to.code }}
                  align="right"
                />
              </Flex>
            </>
          )}
        </Card>
        {passengersInfo.map((passenger) => (
          <PassengerCard
            {...passenger}
            onFieldChange={handleFieldChange}
            onDateChange={handleDateChange}
            food={food}
            foodLoading={foodLoading}
            onFoodChange={handleFoodChange}
            key={`passenger__${passenger.id}`}
          />
        ))}

        <Card className={style.offers} loading={offersLoading}>
          <Title level={3} className={style['offers__title']}>
            Offers
          </Title>
          {offers &&
            offers.map((offer: Offer) => <OfferCard offer={offer} key={offer.id} handleClick={handlePromocodeApply} />)}
        </Card>

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
              value={promocode}
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
        <Card loading={loading || foodLoading || offersLoading}>
          <Title level={3}>Bill Details</Title>
          <Flex gap={4} vertical>
            <BillRow title="Base Ticket Fare" amount={basePrice} />
            {food &&
              Object.entries(mealPrice).map(([foodId, num]) => {
                const dish = food?.find((item: Food) => item.id === +foodId);
                if (!dish || !num) return null;
                return (
                  <BillRow
                    title={`${dish.name}${num > 1 ? ` x ${num}` : ''}`}
                    amount={(typeof dish.price === 'string' ? fromRupees(dish.price) : dish.price) * num}
                  />
                );
              })}
            {extraBaggage && <BillRow title="Extra Baggage" amount={500} />}
            {promocode && !promoError && (
              <strong>
                <BillRow
                  neg
                  title="Discount"
                  amount={getDiscountAmount(
                    +basePrice + +getTotalFoodAmount(mealPrice, food) + (extraBaggage ? 500 : 0),
                    promocode,
                    offers,
                  )}
                />
              </strong>
            )}
            <Flex justify="space-between">
              <Text className={style.total}>Total Charge</Text>
              <Text
                className={style.total}
              >{`₹${(+basePrice + +getTotalFoodAmount(mealPrice, food) + (extraBaggage ? 500 : 0) - getDiscountAmount(+basePrice + +getTotalFoodAmount(mealPrice, food) + (extraBaggage ? 500 : 0), promocode, offers)).toFixed(2)}`}</Text>
            </Flex>
          </Flex>
        </Card>
        <Card variant="borderless">
          <Flex vertical align="center" gap={16}>
            <Text type="secondary">Discounts, offers and price concessions will be applied later during payment</Text>
            <Button
              style={{ width: '400px', padding: '16px 0', height: '56px' }}
              type="primary"
              variant="solid"
              onClick={() => navigate('/payment')}
            >
              Book Now
            </Button>
            <Button
              style={{ width: '400px', padding: '16px 0', height: '56px' }}
              variant="outlined"
              color="danger"
              onClick={() => navigate({ pathname: '/search-results', search: mapFormData(tripDetails) })}
            >
              Cancel
            </Button>
          </Flex>
        </Card>
      </Flex>
    </PageLayout>
  );
};

ReviewBookingPage.displayName = 'Review.Booking.Page';
