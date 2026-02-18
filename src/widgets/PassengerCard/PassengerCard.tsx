import { Card, DatePicker, Flex, Form, Input, Typography } from 'antd';
import { useCallback, useContext, useMemo, type ChangeEvent, type FC } from 'react';

import style from './PassengerCard.module.scss';
import type { Food } from 'src/api/mocks';
import { FoodCard } from '../FoodCard/FoodCard';
import { Link } from 'react-router';
import dayjs from 'dayjs';
import { BookingContext } from 'src/contexts';
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

  // const debouncedUpdatePassenger = useDebounce(updatePassengerById);

  const handleFieldChange = useCallback(
    (e: ChangeEvent) => {
      const target = e.currentTarget as HTMLInputElement;
      const [, , , field] = (target.getAttribute('id') ?? '').split('_');

      updatePassengerById({ id, info: { ...passenger, [field]: target.value } });
    },
    [passengers, updatePassengerById],
  );

  const handleDateChange = (date: any) =>
    updatePassengerById({
      id,
      info: { ...passenger, meal: passenger?.meal ? [...passenger?.meal] : [], birthDate: date },
    });

  const handleAddMeal = (foodId: number) =>
    updatePassengerFoodById({ id, meal: (passenger?.meal ?? []).concat(foodId) });
  const handleRemoveMeal = (foodId: number) =>
    updatePassengerFoodById({
      id,
      meal: (passenger?.meal ?? []).filter((item) => item !== foodId),
    });
  return passenger ? (
    <>
      <Card {...props} className={style.card}>
        <Title level={3}>Passenger {id}</Title>
        <Text type="secondary">Please enter your contact info</Text>
        {/* <Form
          name={`passenger_${id}`}
          className={style.form}
          initialValues={{
            fullName: passenger?.fullName,
            birthDate: passenger?.birthDate,
            phone: passenger?.phone,
            email: passenger?.email,
          }}
        > */}
        <div className={style.form}>
          <Flex vertical>
            <Text>Full Name</Text>
            <Item
              name={`passenger_${id}_fullName`}
              rules={[{ required: true, message: "Please fill in passenger's name" }]}
            >
              <Input placeholder="Your name" onChange={handleFieldChange} />
            </Item>
          </Flex>
          <Flex vertical>
            <Text>Phone Number</Text>
            <Item
              name={`passenger_${id}_phone`}
              rules={[{ required: true, message: "Please fill in passenger's phone number" }]}
            >
              <Input placeholder="+91" onChange={handleFieldChange} />
            </Item>
          </Flex>
          <Flex vertical>
            <Text>Email</Text>
            <Item
              name={`passenger_${id}_email`}
              rules={[{ required: true, message: "Please fill in passenger's e-mail" }]}
            >
              <Input placeholder="john.doe@company.com" onChange={handleFieldChange} />
            </Item>
          </Flex>
          <Flex vertical>
            <Text>Date of birth</Text>

            <Item
              name={`passenger_${id}_birthDate`}
              rules={[{ required: true, message: "Please fill in passenger's date of birth" }]}
            >
              <DatePicker placeholder="12.12.1975" onChange={handleDateChange} style={{ width: '100%' }} />
            </Item>
          </Flex>
        </div>
        {/* </Form> */}
      </Card>

      {foodLoading ? (
        <Card loading />
      ) : (
        food && (
          <Flex vertical>
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
            <Flex justify="flex-end">
              <Link to="/">
                View more <span className={style.arrow}>{'>'}</span>
              </Link>
            </Flex>
          </Flex>
        )
      )}
    </>
  ) : null;
};

PassengerCard.displayName = 'Passenger.Card';
