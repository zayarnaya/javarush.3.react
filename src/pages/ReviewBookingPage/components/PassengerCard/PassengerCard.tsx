import { Card, DatePicker, Flex, Form, Input, Typography } from 'antd';
import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ChangeEvent,
  type FC,
  type MouseEvent,
} from 'react';

import style from './PassengerCard.module.scss';
import type { Food } from 'src/api/mocks';
import { FoodCard } from '../FoodCard/FoodCard';
import { Link } from 'react-router';
import type { Passenger } from 'src/api/mockApi';
import dayjs from 'dayjs';
import { BookingContext } from 'src/contexts';

interface Props {
  id: number;
  onFieldChange: (e: ChangeEvent) => void;
  onDateChange: (id: number, date: Date | null) => void;
  onFoodChange: (id: number, meal: number[]) => void;
}

const { Item } = Form;
const { Title, Text } = Typography;

export const PassengerCard: FC<Props> = ({ id, onFieldChange, onDateChange, onFoodChange, ...props }) => {
  // const handleDateChange = useCallback(
  //   (date: any | null) => {
  //     onDateChange(id, date);
  //   },
  //   [onDateChange],
  // );
  // const handleAddMeal = useCallback(
  //   (foodId: number) => {
  //     const newMeal = [...meal, foodId];
  //     onFoodChange(id, newMeal);
  //   },
  //   [onFoodChange, meal, id],
  // );
  // const handleRemoveMeal = useCallback(
  //   (foodId: number) => {
  //     const newMeal = [...meal].filter((item) => item !== foodId);
  //     onFoodChange(id, newMeal);
  //   },
  //   [onFoodChange, meal, id],
  // );

  const {
    state: { passengers, food, foodLoading },
    updatePassengerById,
  } = useContext(BookingContext);

  const passenger = useMemo(() => passengers?.find((pass) => pass.id === id), [passengers]);

  const handleDateChange = (date: any) =>
    updatePassengerById({
      id,
      info: { ...passenger, meal: passenger?.meal ? [...passenger?.meal] : [], birthDate: date },
    });

  const handleAddMeal = (foodId: number) =>
    updatePassengerById({ id, info: { ...passenger, meal: passenger?.meal ? [...passenger.meal, foodId] : [foodId] } });
  const handleRemoveMeal = (foodId: number) =>
    updatePassengerById({
      id,
      info: { ...passenger, meal: passenger?.meal ? [...passenger.meal].filter((item) => item !== foodId) : [] },
    });
  return passenger ? (
    <>
      <Card {...props} className={style.card}>
        <Title level={3}>Passenger {id}</Title>
        <Text>Please enter your contact info</Text>
        <Form
          name={`passenger_${id}`}
          className={style.form}
          initialValues={{
            fullName: passenger?.fullName,
            birthDate: passenger?.birthDate,
            phone: passenger?.phone,
            email: passenger?.email,
          }}
        >
          <Flex vertical>
            <Text>Full Name</Text>
            <Item name="fullName" rules={[{ required: true, message: "Please fill in passenger's name" }]}>
              <Input placeholder="Your name" onChange={onFieldChange} value={passenger.fullName ?? ''} />
            </Item>
          </Flex>
          <Flex vertical>
            <Text>Phone Number</Text>
            <Item name="phone" rules={[{ required: true, message: "Please fill in passenger's phone number" }]}>
              <Input placeholder="+91" onChange={onFieldChange} value={passenger.phone ?? ''} />
            </Item>
          </Flex>
          <Flex vertical>
            <Text>Email</Text>
            <Item name="email" rules={[{ required: true, message: "Please fill in passenger's e-mail" }]}>
              <Input placeholder="john.doe@company.com" onChange={onFieldChange} value={passenger.email ?? ''} />
            </Item>
          </Flex>
          <Flex vertical>
            <Text>Date of birth</Text>

            <Item name="birthDate" rules={[{ required: true, message: "Please fill in passenger's date of birth" }]}>
              <DatePicker
                placeholder="12.12.1975"
                onChange={handleDateChange}
                value={dayjs(passenger.birthDate) ?? null}
              />
            </Item>
          </Flex>
        </Form>
      </Card>

      {foodLoading ? (
        <Card loading />
      ) : (
        food && (
          <Flex gap={32}>
            {food.map((item: Food) => (
              <FoodCard
                key={`food_${item.id}`}
                {...item}
                handleSelectClick={handleAddMeal}
                handleDeselectClick={handleRemoveMeal}
                isSelected={passenger.meal?.includes(item.id) ?? false}
              />
            ))}
          </Flex>
        )
      )}

      <Flex justify="flex-end">
        <Link to="/">
          View more <span className={style.arrow}>{'>'}</span>
        </Link>
      </Flex>
    </>
  ) : null;
};

PassengerCard.displayName = 'Passenger.Card';
