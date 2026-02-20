import { Flex, Typography } from 'antd';
import type { FC } from 'react';

const { Text } = Typography;

export const Disclamers: FC = () => (
  <Flex gap={32} justify="center" style={{ flexWrap: 'wrap' }}>
    <Text type="secondary" style={{ cursor: 'pointer' }}>
      Cancellation Policy
    </Text>
    <Text type="secondary" style={{ cursor: 'pointer' }}>
      Terms & Conditions
    </Text>
    <Text type="secondary" style={{ cursor: 'pointer' }}>
      Travel Insurance
    </Text>
  </Flex>
);

Disclamers.displayName = 'Disclamers';
