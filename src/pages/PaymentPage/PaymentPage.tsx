import { Flex, Form, Typography } from 'antd';
import { useCallback, useContext, useEffect, useState, type FC } from 'react';
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
import { BookButtons } from 'src/widgets/BookButtons/BookButtons';

const { Title } = Typography;

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

  const handleSubmit = useCallback(() => {
    activeMethod === '1' ? form.submit() : toSuccessPage();
  }, [activeMethod, form]);

  return (
    <PageLayout>
      <Flex vertical gap={32} className={style.wrapper}>
        <Title level={2} style={{ color: 'var(--primary-blue)' }}>
          Pay <span style={{ color: 'var(--primary-red)' }}>₹{totalSum}</span> to confirm booking
        </Title>
        <DetailsLayout loading={loading}>
          <BoardingDetails loading={loading} inset showClass />
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
          <BookButtons onConfirm={handleSubmit} onCancel={() => navigate('/')} />
        </Flex>
      </Flex>
    </PageLayout>
  );
};

PaymentPage.displayName = 'Payment.Page';
export default PaymentPage;
