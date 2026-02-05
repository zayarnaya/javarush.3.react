import { Button, Card, Flex, Typography } from 'antd';
import { useCallback, useEffect, useState, type ChangeEvent } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router';
import { useFetchFood, useFetchOffers, useFetchTrain } from 'src/api/mockApi';
import { StationInfo } from 'src/components';
import { parseDate } from 'src/shared';
import { PageLayout } from 'src/layouts';
import { FoodCard, OfferCard, PassengerCard, type Passenger } from './components';
import type { Food, Offer } from 'src/api/mocks';
import style from './ReviewBookingPage.module.scss';

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
    })),
  );

  const [meal, setMeal] = useState<number[]>([]);

  const [tripDetails, setTripDetails] = useState(details);

  const { data: train, loading, fetchTrainById } = useFetchTrain();
  const { data: food, loading: foodLoading, fetchFood } = useFetchFood();
  const { data: offers, loading: offersLoading, fetchOffers } = useFetchOffers();

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

  const handleFoodSelect = useCallback((id: number) => {
    setMeal((prev) => prev.concat(id));
    // setSearchParams(prev => {
    //   const newParams = new URLSearchParams(prev.toString());
    //   const meals = newParams.get('meal')?.split(',').map(Number) ?? [];
    //   meals.push(id);
    //   newParams.set('meal', meals.toString());
    //   return newParams;
    // }, {replace: true})
  }, []);

  const handleFoodDeselect = useCallback((id: number) => {
    setMeal((prev) => prev.filter((item) => item !== id));
    // setSearchParams(prev => {
    //   const newParams = new URLSearchParams(prev.toString());
    //   console.log(prev.toString())
    //   const meals = newParams.get('meal')?.split(',')?.map(Number)?.filter(item => item !== id) ?? [];
    //   newParams.set('meal', meals.toString());
    //   return newParams;
    // }, {replace: true})
  }, []);

  return (
    <PageLayout>
      <Flex vertical gap={32}>
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
            key={`passenger__${passenger.id}`}
          />
        ))}
        <Flex gap={32}>
          {foodLoading ? (
            <Card loading />
          ) : (
            food &&
            food.map((item: Food) => (
              <FoodCard
                key={`food_${item.id}`}
                {...item}
                handleSelectClick={handleFoodSelect}
                handleDeselectClick={handleFoodDeselect}
                isSelected={meal.includes(item.id)}
              />
            ))
          )}
        </Flex>
        <Flex justify="flex-end">
          <Link to="/">
            View more <span className={style.arrow}>{'>'}</span>
          </Link>
        </Flex>
      </Flex>

      <Card className={style.offers} loading={offersLoading}>
        <Title level={3} className={style['offers__title']}>
          Offers
        </Title>
        {offers &&
          offers.map((offer: Offer) => (
            <OfferCard offer={offer} key={offer.id} handleClick={(id: number) => console.log(id)} />
          ))}
      </Card>
    </PageLayout>
  );
};

ReviewBookingPage.displayName = 'Review.Booking.Page';
