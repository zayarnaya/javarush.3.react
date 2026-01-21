import { useCallback, useState, type FC } from 'react';
import { Button, Radio, InputNumber, Form, Select, DatePicker, type RadioChangeEvent, Flex, Typography } from 'antd';

import style from './TicketForm.module.scss';

interface Props {
  stationList: { label: string; value: string }[];
  handleFinish: (e: RadioChangeEvent) => void;
  stationsIsLoading: boolean;
  initialValues: Record<string, any>;
  formType?: 'search' | 'result';
  theme?: 'light' | 'dark';
}

const { Title } = Typography;

export const TicketForm: FC<Props> = ({
  stationList,
  handleFinish,
  stationsIsLoading,
  initialValues,
  theme = 'dark',
  formType = 'search',
}) => {
  const [tripType, setTripType] = useState(initialValues?.type ?? 'round');

  const handleTripTypeChange = useCallback((e: RadioChangeEvent) => setTripType(e.target.value), []);

  return (
    <Form onFinish={handleFinish} initialValues={initialValues}>
      <Flex vertical className={style['form-wrapper']}>
        <Flex className={style['type-wrapper']}>
          <Form.Item label={null} name="type" rules={[{ required: true, message: 'Please select the trip type!' }]}>
            <Radio.Group
              onChange={handleTripTypeChange}
              options={[
                { value: 'round', label: 'Round trip' },
                { value: 'one-way', label: 'One way' },
              ]}
            />
          </Form.Item>
          <Form.Item
            label={null}
            name="passengers"
            rules={[{ required: true, message: 'Select the number of passengers!' }]}
          >
            <InputNumber mode="spinner" step={1} min={0} max={25} />
          </Form.Item>
        </Flex>
        <div className={style['station-wrapper']}>
          <Form.Item
            label={null}
            name="departure"
            rules={[{ required: true, message: 'Select the departure station!' }]}
          >
            <Flex vertical>
              <Title level={5}>Departure</Title>
              <Select
                loading={stationsIsLoading}
                options={stationList}
                showSearch={{ optionFilterProp: 'label' }}
                placeholder="Select a station"
              />
            </Flex>
          </Form.Item>
          <Form.Item label={null} name="arrival" rules={[{ required: true, message: 'Select the arrival station!' }]}>
            <Flex vertical>
              <Title level={5}>Arrival</Title>
              <Select
                loading={stationsIsLoading}
                options={stationList}
                showSearch={{ optionFilterProp: 'label' }}
                placeholder="Select a station"
              />
            </Flex>
          </Form.Item>
        </div>
        <Form.Item
          label={null}
          name="date"
          className={style['date-wrapper']}
          rules={[{ required: true, message: 'Please select date!' }]}
        >
          <Title level={5}>Pick your lucky day!</Title>
          {tripType === 'one-way' ? (
            <DatePicker className={style.datePicker} />
          ) : (
            <DatePicker.RangePicker className={style.datePicker} />
          )}
        </Form.Item>

        <Form.Item label={null}>
          <Flex justify="center">
            <Button type="primary" htmlType="submit" block>
              Ticket, please!
            </Button>
          </Flex>
        </Form.Item>
      </Flex>
    </Form>
  );
};

TicketForm.displayName = 'Ticket.Form';
