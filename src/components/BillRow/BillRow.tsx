import { Flex, Typography } from 'antd';
import type { FC, HTMLAttributes } from 'react';
import style from './BillRow.module.scss';

const { Text } = Typography;

interface Props extends HTMLAttributes<HTMLDivElement> {
  title: string;
  amount: string | number;
  neg?: boolean;
}

export const BillRow: FC<Props> = ({ title, amount, neg = false, ...rest }) => (
  <Flex justify="space-between" {...rest}>
    <Text className={style.text} type="secondary">
      {title}
    </Text>
    <Text type="secondary">
      {neg && '-'}
      {typeof amount === 'string' ? amount : `₹${amount.toFixed(2)}`}
    </Text>
  </Flex>
);

BillRow.displayName = 'Bill.Row';
