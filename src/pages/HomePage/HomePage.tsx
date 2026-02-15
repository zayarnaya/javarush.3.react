import { Flex } from 'antd';
import { useCallback } from 'react';
import style from './HomePage.module.scss';

import { useNavigate } from 'react-router';
import { TicketForm } from 'src/widgets';

export const HomePage = () => {
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    (searchString: string) => navigate({ pathname: '/search-results', search: searchString }),
    [],
  );

  return (
    <Flex vertical align="center" justify="center" className={style.wrapper}>
      <h1>Let's Find That Ticket</h1>
      <p>Before Someone Else Does</p>
      <TicketForm handleSubmit={handleSubmit} />
    </Flex>
  );
};

HomePage.displayName = 'Home.Page';
