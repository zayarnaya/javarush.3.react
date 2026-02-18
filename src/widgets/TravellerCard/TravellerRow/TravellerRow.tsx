import { Flex, Typography } from 'antd';
import type { FC } from 'react';

const { Text } = Typography;

interface Props {
  textLeft: string;
  textRight: string;
}

export const TravellerRow: FC<Props> = ({ textLeft, textRight, ...props }) => {
  return (
    <Flex {...props} justify="space-between" gap={32}>
      <Text>{textLeft}</Text>
      <Text>{textRight}</Text>
    </Flex>
  );
};

TravellerRow.displayName = 'Traveller.Row';
