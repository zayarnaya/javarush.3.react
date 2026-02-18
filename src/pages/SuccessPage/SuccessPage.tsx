import train from '@images/success.svg';
import { Button, Flex, Typography } from 'antd';
import { PageLayout } from 'src/layouts';
import { SuccessDetails } from 'src/widgets';
import QRCode from 'react-qr-code';
import { useContext, useEffect, useRef } from 'react';
import generatePDF, { Margin } from 'react-to-pdf';
import { useFetchPaymentDetails } from 'src/api/mockApi';
import { useNavigate, useSearchParams } from 'react-router';
import { BookingContext } from 'src/contexts';

const { Title } = Typography;

export const SuccessPage = () => {
  const [searchParams] = useSearchParams();
  const { data, loading, fetchPaymentDetails } = useFetchPaymentDetails();
  const pdfRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { updateAllState } = useContext(BookingContext);

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
  return (
    <PageLayout>
      <Flex vertical align="center" gap={32} style={{ paddingBottom: '100px' }}>
        <img alt="" src={train} width={130} />
        <Title level={2} style={{ color: 'var(--success-green)', textAlign: 'center' }}>
          Congratulations!
          <br />
          You have successfully booked tickets
        </Title>
        <SuccessDetails ref={pdfRef} loading={loading} />
        <Flex justify="space-between" align="center" gap={32}>
          <QRCode value={location.href} size={220} />
          <Flex vertical gap={16}>
            <Button type="primary" onClick={() => navigate('/')}>
              Book another ticket
            </Button>
            <Button
              type="primary"
              onClick={() => generatePDF(pdfRef, { filename: 'ticket.pdf', page: { margin: Margin.LARGE } })}
            >
              Download Ticket
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </PageLayout>
  );
};

SuccessPage.displayName = 'Success.Page';
