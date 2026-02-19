import { Flex, Form } from 'antd';
import { useContext, useMemo, type FC } from 'react';
import { BookingContext } from 'src/contexts';
import { PassengerCard } from '../PassengerCard/PassengerCard';
import dayjs from 'dayjs';

interface Props {
  form: any;
  onFinish: () => void;
  onFinishFailed?: () => void;
}

export const PassengerForm: FC<Props> = ({ form, onFinish, onFinishFailed }) => {
  const {
    state: { passengers },
  } = useContext(BookingContext);

  const initialValues = useMemo(() => {
    const res: [string, any][] = [];
    if (!passengers) return {};
    for (let passenger of passengers) {
      const { id, fullName, phone, email, birthDate } = passenger;
      console.log(birthDate);
      res.push([`passenger_${id}_fullName`, fullName]);
      res.push([`passenger_${id}_phone`, phone]);
      res.push([`passenger_${id}_email`, email]);
      if (birthDate) res.push([`passenger_${id}_birthDate`, dayjs(birthDate)]);
    }
    return Object.fromEntries(res);
  }, [passengers]);

  return passengers ? (
    <Form
      form={form}
      name="passengers"
      initialValues={initialValues}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Flex vertical gap={32}>
        {passengers.map((passenger) => (
          <PassengerCard id={passenger.id} key={`passenger__${passenger.id}`} />
        ))}
      </Flex>
    </Form>
  ) : null;
};

PassengerForm.displayName = 'Passenger.Form';
