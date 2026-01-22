import { useCallback, useEffect, useState, type FC } from 'react';
import { Button, Radio, InputNumber, Form, Select, DatePicker, type RadioChangeEvent, Flex, Typography } from 'antd';

import style from './TicketForm.module.scss';

interface Props {
  stationList: { label: string; value: string }[];
  handleFinish: (e: RadioChangeEvent) => void;
  stationsIsLoading: boolean;
  initialValues: Record<string, any>;
  formType?: 'search' | 'result';
}

const { Title } = Typography;

export const TicketForm: FC<Props> = ({
  stationList,
  handleFinish,
  stationsIsLoading,
  initialValues,
  formType = 'search',
}) => {
  const [tripType, setTripType] = useState(initialValues?.type ?? 'round');

  const [departureList, setDepartureList] = useState<typeof stationList>([]);
  const [departureStation, setDepartureStation] = useState<{ label: string; value: string } | undefined>(undefined);
  const [arrivalList, setArrivalList] = useState<typeof stationList>([]);
  const [arrivalStation, setArrivalStation] = useState<{ label: string; value: string } | undefined>(undefined);

  const handleDepartureChange = useCallback(
    (value: string) => {
      setDepartureStation(stationList.find((station) => station.value === value));
      setArrivalList(stationList.filter((station) => value !== station.value));
    },
    [stationList, arrivalList, departureStation],
  );
  const handleArrivalChange = useCallback(
    (value: string) => {
      setArrivalStation(stationList.find((station) => station.value === value));
      setDepartureList(stationList.filter((station) => value !== station.value));
    },
    [stationList, departureList, arrivalStation],
  );

  const handleTripTypeChange = useCallback((e: RadioChangeEvent) => setTripType(e.target.value), []);

  useEffect(() => {
    if (stationList && !stationsIsLoading) {
      setDepartureList(stationList);
      setArrivalList(stationList);
    }
  }, [stationList, stationsIsLoading]);
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
          <Flex vertical>
            <Title level={5}>Departure</Title>
            <Form.Item
              label={null}
              name="departure"
              rules={[{ required: true, message: 'Select the departure station!' }]}
            >
              <Select
                loading={stationsIsLoading}
                options={departureList}
                showSearch={{ optionFilterProp: 'label' }}
                placeholder="Select a station"
                onChange={handleDepartureChange}
                //@ts-expect-error
                value={departureStation}
                allowClear
              />
            </Form.Item>
          </Flex>
          <Flex vertical>
            <Title level={5}>Arrival</Title>
            <Form.Item label={null} name="arrival" rules={[{ required: true, message: 'Select the arrival station!' }]}>
              <Select
                loading={stationsIsLoading}
                options={arrivalList}
                showSearch={{ optionFilterProp: 'label' }}
                placeholder="Select a station"
                onChange={handleArrivalChange}
                //@ts-expect-error
                value={arrivalStation}
                allowClear
              />
            </Form.Item>
          </Flex>
        </div>
        <Title level={5}>Pick your lucky day!</Title>
        <Form.Item
          label={null}
          name="date"
          className={style['date-wrapper']}
          rules={[{ required: true, message: 'Please select date!' }]}
        >
          {tripType === 'one-way' ? (
            <DatePicker className={style.datePicker} />
          ) : (
            <DatePicker.RangePicker className={style.datePicker} />
          )}
        </Form.Item>
        <Flex justify="center">
          <Form.Item label={null}>
            <Button type="primary" htmlType="submit" block>
              Ticket, please!
            </Button>
          </Form.Item>{' '}
        </Flex>
      </Flex>
    </Form>
  );
};

TicketForm.displayName = 'Ticket.Form';
