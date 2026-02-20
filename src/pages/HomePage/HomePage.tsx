import { Flex, Typography } from 'antd';
import { useCallback } from 'react';
import style from './HomePage.module.scss';

import { useNavigate } from 'react-router';
import { TicketForm } from 'src/widgets';

const { Title } = Typography;

export const HomePage = () => {
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    (searchString: string) => navigate({ pathname: '/search-results', search: searchString }),
    [],
  );

  return (
    <Flex vertical align="center" justify="center" className={style.wrapper}>
      <Title className={style.h1}>
        Let's{'\u00A0'}Find That{'\u00A0'}Ticket
      </Title>
      <p className={style.p}>Before Someone Else Does</p>
      <TicketForm handleSubmit={handleSubmit} />
    </Flex>
  );
};

HomePage.displayName = 'Home.Page';

export default HomePage;
