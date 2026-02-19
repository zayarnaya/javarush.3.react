import { Button, Flex, Form, Typography } from 'antd';
import { useContext, useEffect, useState, type ChangeEvent, type FC, type FocusEvent } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { useFetchPaymentDetails } from 'src/api/mockApi';
import { BookingContext } from 'src/contexts';
import { DetailsLayout, PageLayout } from 'src/layouts';

import style from './PaymentPage.module.scss';
import { BoardingDetails } from 'src/widgets/BoardingDetails/BoardingDetails';
import { TravellerDetails } from 'src/widgets/TravellerDetails/TravellerDetails';
import { BillDetails, PaymentMethods } from 'src/widgets';

import shield from '@images/save.svg';
import { Offers } from 'src/widgets/Offers/Offers';
import { Disclamers } from 'src/components';

const { Title, Text } = Typography;

export const PaymentPage: FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const toSuccessPage = () => navigate({ pathname: '/success', search: searchParams.toString() });
  const { data, loading, fetchPaymentDetails } = useFetchPaymentDetails();
  const {
    state: { totalSum },
    updateAllState,
  } = useContext(BookingContext);

  useEffect(() => {
    const id = searchParams.get('purchaseId');
    if (!id) {
      navigate('/');
    }
  }, []);
  useEffect(() => {
    if (!data && !loading) {
      const id = searchParams.get('purchaseId');
      id && fetchPaymentDetails(+id);
    }
  }, [data, loading]);
  useEffect(() => {
    if (data && !loading) {
      updateAllState(data);
    }
  }, [data, loading]);

  const [activeMethod, setActiveMethod] = useState('1');
  const updateActiveMethod = (key: string) => setActiveMethod(key);

  const [form] = Form.useForm();

  return (
    <PageLayout>
      <Flex vertical gap={32} className={style.wrapper}>
        <Title level={2} style={{ color: 'var(--primary-blue)' }}>
          Pay <span style={{ color: 'var(--primary-red)' }}>₹{totalSum}</span> to confirm booking
        </Title>
        <DetailsLayout loading={loading}>
          <BoardingDetails loading={loading} inset />
          <TravellerDetails />
        </DetailsLayout>

        <Offers />

        <BillDetails />

        <PaymentMethods onTabClick={updateActiveMethod} form={form} />

        <Flex vertical align="center" gap={16}>
          <Flex gap={24} align="flex-start">
            <img src={shield} width={32} alt="" />
            <span>All your data are safe</span>
          </Flex>
          <Text type="secondary">Discounts, offers and price concessions will be applied later during payment</Text>
          <Button
            style={{ width: '400px', padding: '16px 0', height: '56px' }}
            type="primary"
            variant="solid"
            onClick={activeMethod === '1' ? form.submit : toSuccessPage}
          >
            Book Now
          </Button>
          <Button
            style={{ width: '400px', padding: '16px 0', height: '56px' }}
            variant="outlined"
            color="danger"
            onClick={() => navigate('/')}
          >
            Cancel
          </Button>
          <Disclamers />
        </Flex>
      </Flex>
    </PageLayout>
  );
};

PaymentPage.displayName = 'Payment.Page';
