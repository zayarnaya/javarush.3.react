import { useCallback, useState, type FC } from "react";
import { Button, Radio, InputNumber, Form, Select, DatePicker, type RadioChangeEvent } from 'antd';

interface Props {
    stationList: {label: string, value: string}[],
    handleFinish: (e: RadioChangeEvent) => void,
    stationsIsLoading: boolean,
    initialValues: Record<string, any>,
    formType?: 'search' | 'result',
    theme?: 'light' | 'dark'
    
}

export const TicketForm:FC<Props> = ({stationList, handleFinish, stationsIsLoading, initialValues, theme='dark', formType = 'search'}) => {
        const [tripType, setTripType] = useState(initialValues?.type ?? 'round');
    
        const handleTripTypeChange = useCallback((e: RadioChangeEvent) => setTripType(e.target.value), []);
    
    return (
        <Form onFinish={handleFinish}
                initialValues={initialValues}>
                <fieldset >
                    <Form.Item
                        label={null}
                        name="type"
                        rules={[{ required: true, message: 'Please select the trip type!' }]}
                    >
                        <Radio.Group onChange={handleTripTypeChange} options={[
                            { value: "round", label: "Round trip" },
                            { value: "one-way", label: "One way" },
                        ]} /></Form.Item>
                    <Form.Item
                        label={null}
                        name="passengers"
                        rules={[{ required: true, message: 'Select the number of passengers!' }]}
                    ><InputNumber step={1} min={0} max={25} /></Form.Item>
                </fieldset>
                <Form.Item
                    label='Departure'
                    name="departure"
                    rules={[{ required: true, message: 'Select the departure station!' }]}
                ><Select
                        loading={stationsIsLoading}
                        options={stationList}
                        showSearch={{ optionFilterProp: 'label' }}
                        placeholder='Select a station'
                    /></Form.Item>
                <Form.Item
                    label="Arrival"
                    name="arrival"
                    rules={[{ required: tripType === 'round', message: 'Select the arrival station!' }]}
                ><Select
                        loading={stationsIsLoading}
                        options={stationList}
                        showSearch={{ optionFilterProp: 'label' }}
                        disabled={tripType === 'one-way'}
                        placeholder='Select a station'
                    /></Form.Item>

                <Form.Item label="Pick your lucky day" name="date" rules={[{required: true, message: 'Please select date!'}]}>
                    {tripType === 'one-way'
                    ? <DatePicker />
                : <DatePicker.RangePicker />}
                </Form.Item>

                <Form.Item label={null}>
                    <Button type="primary" htmlType="submit">
                        Ticket, please!
                    </Button>
                </Form.Item>
            </Form>
    )
}

TicketForm.displayName = 'Ticket.Form';