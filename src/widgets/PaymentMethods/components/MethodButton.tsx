import { Button, Flex } from 'antd';
import type { FC } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { capitalize } from 'src/shared/helpers';

interface Props {
  type: 'paypal' | 'bitcoin';
}

export const MethodButton: FC<Props> = ({ type }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const toSuccessPage = () => navigate({ pathname: '/success', search: searchParams.toString() });
  return (
    <Flex justify="center">
      <Button htmlType="button" onClick={toSuccessPage}>
        Pay with {capitalize(type)}
      </Button>
    </Flex>
  );
};
