import { Card, Flex, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { useFetchTrain } from 'src/api/mockApi';
import { StationInfo } from 'src/components';
import { parseDate } from 'src/shared';
import { PassengerCard, type Passenger } from './components/PassengerCard/PassengerCard';
import { PageLayout } from 'src/layouts';

const { Title, Paragraph, Text } = Typography;

export const ReviewBookingPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();
  const details = Object.fromEntries(searchParams.entries());
  //@ts-expect-error
  details.date = parseDate(details.date);

  const [passengersInfo, setPassengersInfo] = useState<Passenger[]>(
    new Array(details.passengers).map((_, index) => ({
      id: index + 1,
      fullName: null,
      phone: null,
      email: null,
      birthDate: null,
    })),
  );

  const { data: train, loading, error, fetchTrainById } = useFetchTrain();

  useEffect(() => {
    if (details.trainId) {
      console.log(details.trainId);
      fetchTrainById(details.trainId);
    } else {
      navigate('/');
    }
  }, [details.trainId]);

  useEffect(() => {
    console.log(train);
  }, [train]);

  return (
    <PageLayout>
      <Title level={1}>Review your booking</Title>
      <Card loading={loading}>
        <Title level={4}>Boarding Details</Title>
        {train && (
          <>
            <Flex justify="space-between">
              <Title level={5}>
                {train.trainNumber} - {train.trainName}
              </Title>
              <Text>Class {details.classCode} & Tatkal Quota</Text>
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
          onFieldChange={(e) => console.log(e.currentTarget)}
          key={`passenger__${passenger.id}`}
        />
      ))}
    </PageLayout>
  );
};

ReviewBookingPage.displayName = 'Review.Booking.Page';
