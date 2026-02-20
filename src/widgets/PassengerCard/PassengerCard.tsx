import { Card, DatePicker, Flex, Form, Input, Typography } from 'antd';
import { useCallback, useContext, useEffect, useMemo, useState, type ChangeEvent, type FC } from 'react';

import style from './PassengerCard.module.scss';
import type { Food } from 'src/api/mocks';
import { FoodCard } from '../FoodCard/FoodCard';
import { Link } from 'react-router';
import { BookingContext } from 'src/contexts';
import { produce } from 'immer';
import type { Passenger } from 'src/api/mockApi';
// import { useDebounce } from 'src/hooks';

interface Props {
  id: number;
}

const { Item } = Form;
const { Title, Text } = Typography;

export const PassengerCard: FC<Props> = ({ id, ...props }) => {
  const {
    state: { passengers, food, foodLoading },
    updatePassengerById,
    updatePassengerFoodById,
  } = useContext(BookingContext);

  const passenger = useMemo(() => passengers?.find((pass) => pass.id === id), [passengers]);

  const handleFieldChange = useCallback(
    (e: ChangeEvent) => {
      const target = e.currentTarget as HTMLInputElement;
      const [, , , field] = (target.getAttribute('id') ?? '').split('_');

      updatePassengerById({
        id,
        info: produce(passenger, (prev) => {
          prev![field as keyof Passenger] = target.value;
        }) as Partial<Passenger>,
      });
    },
    [passengers, updatePassengerById],
  );

  const handleDateChange = (date: any) =>
    updatePassengerById({
      id,
      info: produce(passenger, (prev) => {
        prev!.birthDate = date;
      }) as Partial<Passenger>,
    });

  const handleAddMeal = (foodId: number) =>
    updatePassengerFoodById({ id, meal: (passenger?.meal ?? []).concat(foodId) });
  const handleRemoveMeal = (foodId: number) =>
    updatePassengerFoodById({
      id,
      meal: (passenger?.meal ?? []).filter((item) => item !== foodId),
    });

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 800);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 800);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return passenger ? (
    <>
      <Card {...props} className={style.card}>
        <Title level={3}>Passenger {id}</Title>
        <Text type="secondary">Please enter your contact info</Text>
        <div className={style.form}>
          <Item
            name={`passenger_${id}_fullName`}
            rules={[
              { required: true, message: "Please fill in passenger's name" },
              { pattern: /^[a-zA-Z\s]*$/, message: 'Write name in latin letters' },
            ]}
            label="Full Name"
            layout="vertical"
          >
            <Input className={style.input} placeholder="Your name" onChange={handleFieldChange} />
          </Item>
          <Item
            name={`passenger_${id}_phone`}
            rules={[
              { required: true, message: "Please fill in passenger's phone number" },
              { pattern: /^(\+)?[\d\s-]*$/, message: 'Write corrent phone number' },
            ]}
            label="Phone Number"
            layout="vertical"
          >
            <Input className={style.input} placeholder="+91" onChange={handleFieldChange} />
          </Item>
          <Item
            name={`passenger_${id}_email`}
            rules={[
              { required: true, message: "Please fill in passenger's e-mail" },
              { pattern: /^[^@]+@[^@]+$/, message: 'Write correct email' },
            ]}
            label="Email"
            layout="vertical"
          >
            <Input className={style.input} placeholder="john.doe@company.com" onChange={handleFieldChange} />
          </Item>
          <Item
            name={`passenger_${id}_birthDate`}
            rules={[{ required: true, message: "Please fill in passenger's date of birth" }]}
            label="Date of birth"
            layout="vertical"
          >
            <DatePicker
              className={style.input}
              placeholder="12.12.1975"
              onChange={handleDateChange}
              style={{ width: '100%' }}
            />
          </Item>
        </div>
      </Card>

      {foodLoading ? (
        <Card loading />
      ) : (
        food && (
          <Flex className={style['foods-wrapper']}>
            <Flex gap={32} className={style.foods}>
              {isMobile ? (
                <FoodCard
                  key={`food_${food[0].id}`}
                  {...food[0]}
                  handleSelectClick={handleAddMeal}
                  handleDeselectClick={handleRemoveMeal}
                  isSelected={passenger.meal?.includes(food[0].id) ?? false}
                />
              ) : (
                food.map((item: Food) => (
                  <FoodCard
                    key={`food_${item.id}`}
                    {...item}
                    handleSelectClick={handleAddMeal}
                    handleDeselectClick={handleRemoveMeal}
                    isSelected={passenger.meal?.includes(item.id) ?? false}
                  />
                ))
              )}
            </Flex>
            <Flex justify="flex-end">
              <a href="" className={style['view-more']}>
                View more{'\u00A0'}
                <span className={style.arrow}>{'>'}</span>
              </a>
            </Flex>
          </Flex>
        )
      )}
    </>
  ) : null;
};

PassengerCard.displayName = 'Passenger.Card';
