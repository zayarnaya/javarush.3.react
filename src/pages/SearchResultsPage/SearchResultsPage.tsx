import { Card, Flex, Typography } from 'antd';
import { useCallback, useContext, useEffect, useMemo } from 'react';
import cn from 'classnames';
import style from './SearchResultsPage.module.scss';
import { Banner, TicketForm, TrainCard } from 'src/widgets';
import { useSearchParams } from 'react-router';
import { StationsContext } from 'src/contexts/StationsContext';
import { parseDate } from './helpers';
import { PageLayout } from 'src/layouts';
import banner1 from '@images/banner1.png';
import banner2 from '@images/banner2.png';
import dayjs from 'dayjs';
import { useFetchTrains } from 'src/api/mockApi';
import type { Train } from 'src/mockData/mocks';

const { Title, Paragraph } = Typography;

export const SearchResultsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialValues = Object.fromEntries(searchParams.entries());
  //@ts-expect-error
  initialValues.date = parseDate(initialValues.date);

  const handleFinish = useCallback((values: Record<string, any>) => console.log(values), []);

  const { stations, loading } = useContext(StationsContext);

  const stationList = useMemo(
    () => stations && stations.map(({ name, code }: { name: string; code: string }) => ({ label: name, value: code })),
    [stations],
  );

  const { data: trains, loading: trainsLoading, error, fetchTrains } = useFetchTrains();

  useEffect(() => {
    fetchTrains(initialValues.departure, initialValues.arrival);
  }, []);

  return (
    <PageLayout>
      <Title level={1}>Search results</Title>
      <TicketForm
        initialValues={initialValues}
        handleFinish={handleFinish}
        stationsIsLoading={loading}
        formType="result"
        stationList={stationList ?? []}
      />
      <Flex vertical gap={34}>
        <Banner text="Planning your holidays" image={banner1} />
        <Banner text="Train tourism packages" image={banner2} />
        <Paragraph>
          Our trains don't just transport people, they transport emotions and stories! From the mountains of Darjeeling
          to the beaches of Goa, we connect more than just stations. As Raj Koothrappali would say, "In India, we don't
          just ride trains, we experience cosmic journeys with occasional cow delays." Book now and embrace the colorful
          chaos!
        </Paragraph>
      </Flex>
      <section>
        <Title level={2}>Available Trains</Title>
        <Flex vertical gap={32} style={{ marginBottom: '128px' }}>
          {trainsLoading && <Card loading />}
          {!trainsLoading && !!trains?.length && trains.map((train: Train) => <TrainCard train={train} />)}
          {!trainsLoading && !trains?.length && <Paragraph>Sorry, no trains found! Try another station</Paragraph>}
        </Flex>
      </section>
    </PageLayout>
  );
};

SearchResultsPage.displayName = 'Search.Results.Page';
