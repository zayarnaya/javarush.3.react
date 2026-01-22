import { Flex } from 'antd';
import { useCallback, useContext, useMemo } from 'react';
import style from './HomePage.module.scss';

import { useNavigate } from 'react-router';
import { TicketForm } from 'src/widgets';
import { StationsContext } from 'src/contexts/StationsContext';
import { mapFormData } from 'src/shared';

export const HomePage = () => {
  const navigate = useNavigate();

  const { stations, loading } = useContext(StationsContext);

  const stationList = useMemo(
    () => stations && stations.map(({ name, code }: { name: string; code: string }) => ({ label: name, value: code })),
    [stations],
  );

  const handleFinish = useCallback(
    (values: Record<string, any>) => navigate({ pathname: '/search-results', search: mapFormData(values) }),
    [],
  );

  return (
    <Flex vertical align="center" justify="center" className={style.wrapper}>
      <h1>Let's Find That Ticket</h1>
      <p>Before Someone Else Does</p>
      <TicketForm
        initialValues={{
          type: 'round',
          passengers: 1,
        }}
        handleFinish={handleFinish}
        stationList={stationList ?? []}
        stationsIsLoading={loading}
      />
    </Flex>
  );
};

HomePage.displayName = 'Home.Page';
