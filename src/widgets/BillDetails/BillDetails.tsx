import { Card, Flex, Typography } from 'antd';
import { useContext, type FC } from 'react';
import { BillRow } from 'src/components';
import { BookingContext } from 'src/contexts';

import style from './BillDetails.module.scss';

const { Title, Text } = Typography;

export const BillDetails: FC = () => {
  const {
    state: { extraBaggage, meals, baseAmount, totalDiscount, totalSum, foodLoading, offersLoading, trainLoading },
  } = useContext(BookingContext);
  return (
    <Card loading={trainLoading || foodLoading || offersLoading}>
      <Title level={3}>Bill Details</Title>
      <Flex gap={4} vertical>
        <BillRow title="Base Ticket Fare" amount={baseAmount ?? 0} />
        {meals &&
          Object.entries(meals).map(([, meal]) => {
            return (
              <BillRow
                title={`${meal.name}${meal.count && meal.count > 1 ? ` x ${meal.count}` : ''}`}
                amount={meal.total ?? 0}
                key={`meal_${meal.name}`}
              />
            );
          })}
        {extraBaggage && <BillRow title="Extra Baggage" amount={500} />}
        {totalDiscount && (
          <strong>
            <BillRow neg title="Discount" amount={totalDiscount ?? 0} />
          </strong>
        )}
        <Flex justify="space-between">
          <Text className={style.total}>Total Charge</Text>
          <Text className={style.total}>{`₹${totalSum ?? 0}`}</Text>
        </Flex>
      </Flex>
    </Card>
  );
};

BillDetails.displayName = 'Bill.Details';
