import { Card, Flex, Typography } from 'antd';
import { useCallback, useContext, useEffect } from 'react';
import { Banner, TicketForm, TrainCard } from 'src/widgets';
import { useNavigate, useSearchParams } from 'react-router';
import { PageLayout } from 'src/layouts';
import banner1 from '@images/banner1.png';
import banner2 from '@images/banner2.png';
import { useFetchTrains } from 'src/api/mockApi';
import type { Train } from 'src/api/mocks';
import { TicketFormContext } from 'src/contexts';

const { Title, Paragraph } = Typography;

export const SearchResultsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    state: { arrival, departure },
  } = useContext(TicketFormContext);
  const { data: trains, loading: trainsLoading, fetchTrains } = useFetchTrains();

  useEffect(() => {
    fetchTrains(departure ?? '', arrival ?? '');
  }, []);

  const handleSubmit = useCallback(
    (searchString: string) => {
      const newSearchParams = new URLSearchParams(searchString);
      setSearchParams(newSearchParams, { replace: true });
      fetchTrains(departure ?? '', arrival ?? '');
    },
    [searchParams],
  );

  const navigate = useNavigate();
  const handleTrainSelect = useCallback((id: number, code: string) => {
    navigate({ pathname: '/review-booking', search: searchParams.toString() + `&classCode=${code}&trainId=${id}` });
  }, []);

  return (
    <PageLayout>
      <Title level={1}>Search results</Title>
      <TicketForm handleSubmit={handleSubmit} isSearch />
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
          {!trainsLoading &&
            !!trains?.length &&
            trains.map((train: Train) => <TrainCard train={train} key={train.id} onSelectTrain={handleTrainSelect} />)}
          {!trainsLoading && !trains?.length && <Paragraph>Sorry, no trains found! Try another station</Paragraph>}
        </Flex>
      </section>
    </PageLayout>
  );
};

SearchResultsPage.displayName = 'Search.Results.Page';
