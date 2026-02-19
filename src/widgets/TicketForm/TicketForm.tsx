import { useCallback, useContext, useEffect, useMemo, useRef, useState, type ChangeEvent, type FC } from 'react';
import {
  Button,
  Radio,
  InputNumber,
  Form,
  Select,
  DatePicker,
  type RadioChangeEvent,
  Flex,
  Typography,
  Card,
} from 'antd';

import style from './TicketForm.module.scss';
import { StationsContext, TicketFormContext } from 'src/contexts';
import dayjs from 'dayjs';
import { Label } from './Label';
import { useLocation } from 'react-router';

interface Props {
  handleSubmit: (searchString: string) => void;
  isSearch?: boolean;
}

const { Text } = Typography;

export const TicketForm: FC<Props> = ({ handleSubmit, isSearch = false }) => {
  const { stations, loading: stationsIsLoading } = useContext(StationsContext);

  const { pathname } = useLocation();

  const stationList = useMemo(
    () => stations && stations.map(({ name, code }: { name: string; code: string }) => ({ label: name, value: code })),
    [stations, stationsIsLoading],
  );

  const {
    state: { type, passengers, departure, arrival, date },
    updateState,
  } = useContext(TicketFormContext);
  console.log(JSON.stringify({ type, passengers, departure, arrival, date }));

  const [departureList, setDepartureList] = useState<typeof stationList>([]);
  const [arrivalList, setArrivalList] = useState<typeof stationList>([]);

  const handleDepartureChange = useCallback(
    (value: string) => {
      updateState({ key: 'departure', values: stationList?.find((station) => station.value === value)?.value ?? '' });
      setArrivalList(stationList?.filter((station) => value !== station.value) ?? []);
    },
    [stationList, arrivalList, departure, updateState, setArrivalList],
  );
  const handleArrivalChange = useCallback(
    (value: string) => {
      updateState({ key: 'arrival', values: stationList?.find((station) => station.value === value)?.value ?? '' });
      setDepartureList(stationList?.filter((station) => value !== station.value) ?? []);
    },
    [stationList, departureList, arrival, updateState, setDepartureList],
  );

  const handleTripTypeChange = useCallback(
    (e: RadioChangeEvent) => updateState({ key: 'type', values: e.target.value }),
    [updateState],
  );

  const handleDateChange = useCallback(
    (date: any) => updateState({ key: 'date', values: [date?.valueOf() ?? ''] }),
    [updateState],
  );

  const handleRangeChange = useCallback(
    (dates: any[] | null) =>
      updateState({ key: 'date', values: dates?.map((date) => date?.valueOf() ?? null) }) ?? null,
    [updateState],
  );

  useEffect(() => {
    if (stationList && !stationsIsLoading) {
      setDepartureList(stationList);
      setArrivalList(stationList);
    }
  }, [stationList, stationsIsLoading]);

  const handleFinish = useCallback(
    (values: Record<string, any>) => {
      const search = new URLSearchParams({
        ...values,
        date: Array.isArray(values.date) ? values.date.map((item: any) => item?.valueOf()) : values.date.valueOf(),
      });
      handleSubmit(search.toString());
    },
    [handleSubmit],
  );

  const [formError, setFormError] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    if (formError) {
      timerRef.current = setTimeout(setFormError, 2000, false);
    }
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef?.current);
      }
    };
  });

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      type: type ?? 'round',
      passengers: passengers ?? 1,
      departure: departure ?? '',
      arrival: arrival ?? '',
      date: date?.map((value) => dayjs(new Date(value))) ?? null,
    });
  }, [type, passengers, departure, arrival, date]);

  const initialValues: Record<string, any> = useMemo(
    () => ({
      type: type ?? 'round',
      passengers: passengers ?? 1,
      departure: departure ?? '',
      arrival: arrival ?? '',
      date: date?.map((value) => dayjs(new Date(value))) ?? null,
    }),
    [type, passengers, departure, arrival, date],
  );

  const handleFail = () => setFormError(true);
  const [isFormLoading, setIsFormLoading] = useState(pathname.includes('search'));

  useEffect(() => {
    if (type && passengers && arrival && departure && date) {
      setIsFormLoading(false);
    }
  }, [type, passengers, departure, arrival, date]);

  return isFormLoading ? (
    <Card style={{ width: '100%', maxWidth: '640px' }} loading />
  ) : (
    <Form
      onFinish={handleFinish}
      onFinishFailed={handleFail}
      initialValues={initialValues}
      className={style.form}
      requiredMark={false}
      form={form}
    >
      <Flex vertical className={style['form-wrapper']}>
        <Flex className={style['type-wrapper']}>
          <Form.Item label={null} name="type" rules={[{ required: true, message: 'Please select the trip type!' }]}>
            <Radio.Group
              onChange={handleTripTypeChange}
              options={[
                { value: 'round', label: 'Round trip' },
                { value: 'one-way', label: 'One way' },
              ]}
              value={type}
            />
          </Form.Item>
          <Form.Item
            label={null}
            name="passengers"
            rules={[{ required: true, message: 'Select the number of passengers!' }]}
          >
            <InputNumber
              mode="spinner"
              variant="borderless"
              step={1}
              min={1}
              max={25}
              onChange={(value: any) => updateState({ key: 'passengers', values: value })}
              value={passengers ?? 0}
              className={style['with-person']}
              size="small"
            />
          </Form.Item>
        </Flex>
        <div className={style['station-wrapper']}>
          <Flex vertical>
            <Form.Item
              label={<Label className={isSearch ? '' : style.white}>Departure</Label>}
              name="departure"
              rules={[{ required: true, message: 'Select the departure station!' }]}
              layout="vertical"
            >
              <Select
                loading={stationsIsLoading}
                options={departureList ?? []}
                showSearch={{ optionFilterProp: 'label' }}
                placeholder="Select a station"
                onChange={handleDepartureChange}
                value={stationsIsLoading ? null : departure}
                allowClear
                style={{ height: '53px', backgroundColor: 'white' }}
                variant="borderless"
              />
            </Form.Item>
          </Flex>
          <Flex vertical>
            <Form.Item
              layout="vertical"
              label={<Label className={isSearch ? '' : style.white}>Arrival</Label>}
              name="arrival"
              rules={[{ required: true, message: 'Select the arrival station!' }]}
            >
              <Select
                loading={stationsIsLoading}
                options={arrivalList ?? []}
                showSearch={{ optionFilterProp: 'label' }}
                placeholder="Select a station"
                onChange={handleArrivalChange}
                value={stationsIsLoading ? null : arrival}
                allowClear
                style={{ height: '53px', backgroundColor: 'white' }}
                variant="borderless"
              />
            </Form.Item>
          </Flex>
        </div>
        <Form.Item
          label={<Label className={isSearch ? '' : style.white}>Pick your lucky day!</Label>}
          name="date"
          className={style['date-wrapper']}
          rules={[{ required: true, message: 'Please select date!' }]}
          layout="vertical"
        >
          {type === 'one-way' ? (
            <DatePicker
              className={style.datePicker}
              onChange={handleDateChange}
              value={date?.[0] ? dayjs(new Date(date[0])) : null}
              style={{ height: '53px', backgroundColor: 'white' }}
              variant="borderless"
            />
          ) : (
            <DatePicker.RangePicker
              className={style.datePicker}
              onChange={handleRangeChange}
              value={date ? [dayjs(new Date(date[0])), dayjs(new Date(date[1]))] : null}
              style={{ height: '53px', backgroundColor: 'white' }}
              variant="borderless"
            />
          )}
        </Form.Item>
        <Form.Item label={null}>
          <Button type="primary" htmlType="submit" block style={{ height: '64px' }}>
            Ticket, please!
          </Button>
        </Form.Item>
        <Flex style={{ height: '50px' }}>
          {formError && <Text type="danger">Oops! Something went wrong with the form</Text>}
        </Flex>
      </Flex>
    </Form>
  );
};

TicketForm.displayName = 'Ticket.Form';
