import { Card, DatePicker, Flex, Form, Input, Typography } from 'antd';
import { useCallback, type ChangeEvent, type FC } from 'react';

import style from './PassengerCard.module.scss';

export interface Passenger {
  id: number;
  fullName: string | null;
  phone: string | null;
  email: string | null;
  birthDate: any | null;
}

interface Props extends Passenger {
  onFieldChange: (e: ChangeEvent) => void;
  onDateChange: (id: number, date: Date | null) => void;
}

const { Item } = Form;
const { Title, Text } = Typography;

export const PassengerCard: FC<Props> = ({ id, onFieldChange, onDateChange, ...props }) => {
  const handleDateChange = useCallback(
    (date: Date | null) => {
      onDateChange(id, date);
    },
    [onDateChange],
  );
  return (
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
  );
};

PassengerCard.displayName = 'Passenger.Card';
