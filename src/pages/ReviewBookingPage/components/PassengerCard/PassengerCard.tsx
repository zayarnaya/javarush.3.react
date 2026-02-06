import { Card, DatePicker, Flex, Form, Input, Typography } from 'antd';
import { useCallback, useState, type ChangeEvent, type FC, type MouseEvent } from 'react';

import style from './PassengerCard.module.scss';
import type { Food } from 'src/api/mocks';
import { FoodCard } from '../FoodCard/FoodCard';
import { Link } from 'react-router';
import type { Passenger } from 'src/api/mockApi';

interface Props extends Passenger {
  onFieldChange: (e: ChangeEvent) => void;
  onDateChange: (id: number, date: Date | null) => void;
  food: Food[];
  onFoodChange: (id: number, meal: number[]) => void;
  foodLoading: boolean;
}

const { Item } = Form;
const { Title, Text } = Typography;

export const PassengerCard: FC<Props> = ({
  id,
  onFieldChange,
  onDateChange,
  food,
  onFoodChange,
  foodLoading,
  ...props
}) => {
  const handleDateChange = useCallback(
    (date: Date | null) => {
      onDateChange(id, date);
    },
    [onDateChange],
  );

  const [meal, setMeal] = useState<number[]>([]);
  const handleAddMeal = useCallback(
    (foodId: number) => {
      const newMeal = [...meal].concat(foodId);
      setMeal(newMeal);
      onFoodChange(id, newMeal);
    },
    [onFoodChange, meal],
  );
  const handleRemoveMeal = useCallback(
    (foodId: number) => {
      const newMeal = [...meal].filter((item) => item !== foodId);
      setMeal(newMeal);
      onFoodChange(id, newMeal);
    },
    [onFoodChange, meal],
  );
  return (
    <>
      <Card {...props} className={style.card}>
        <Title level={3}>Passenger {id}</Title>
        <Text>Please enter your contact info</Text>
        <Form name={`passenger_${id}`} className={style.form} initialValues={{ ...props }}>
          <Flex vertical>
            <Text>Full Name</Text>
            <Item name="fullName" rules={[{ required: true, message: "Please fill in passenger's name" }]}>
              <Input placeholder="Your name" onChange={onFieldChange} />
            </Item>
          </Flex>
          <Flex vertical>
            <Text>Phone Number</Text>
            <Item name="phone" rules={[{ required: true, message: "Please fill in passenger's phone number" }]}>
              <Input placeholder="+91" onChange={onFieldChange} />
            </Item>
          </Flex>
          <Flex vertical>
            <Text>Email</Text>
            <Item name="email" rules={[{ required: true, message: "Please fill in passenger's e-mail" }]}>
              <Input placeholder="john.doe@company.com" onChange={onFieldChange} />
            </Item>
          </Flex>
          <Flex vertical>
            <Text>Date of birth</Text>

            <Item name="birthDate" rules={[{ required: true, message: "Please fill in passenger's date of birth" }]}>
              <DatePicker placeholder="12.12.1975" onChange={handleDateChange} />
            </Item>
          </Flex>
        </Form>
      </Card>
      <Flex gap={32}>
        {foodLoading ? (
          <Card loading />
        ) : (
          food &&
          food.map((item: Food) => (
            <FoodCard
              key={`food_${item.id}`}
              {...item}
              handleSelectClick={handleAddMeal}
              handleDeselectClick={handleRemoveMeal}
              isSelected={meal.includes(item.id)}
            />
          ))
        )}
      </Flex>
      <Flex justify="flex-end">
        <Link to="/">
          View more <span className={style.arrow}>{'>'}</span>
        </Link>
      </Flex>
    </>
  );
};

PassengerCard.displayName = 'Passenger.Card';
