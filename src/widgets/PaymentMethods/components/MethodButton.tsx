import { Button, Flex } from 'antd';
import type { FC } from 'react';
import { useNavigate } from 'react-router';
import { capitalize } from 'src/shared/helpers';

interface Props {
  type: 'paypal' | 'bitcoin';
}

export const MethodButton: FC<Props> = ({ type }) => {
  const navigate = useNavigate();
  return (
    <Flex justify="center">
      <Button htmlType="button" onClick={() => navigate('/success')}>
        Pay with {capitalize(type)}
      </Button>
    </Flex>
  );
};
