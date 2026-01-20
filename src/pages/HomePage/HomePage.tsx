import { Button, Flex, Radio, InputNumber, Form, Select, type RadioChangeEvent, DatePicker } from 'antd';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { ThemeContext } from 'src/contexts/ThemeContext';
import style from './HomePage.module.scss'
import { useFetch } from 'src/api/useFetch';
import './override.styles.scss'
import { useNavigate } from 'react-router';
import { transformDate } from './helpers';
import { TicketForm } from 'src/widgets';

export const HomePage = () => {
    const { setTheme } = useContext(ThemeContext);
    setTheme('dark');

    const { loading, data, fetchIt } = useFetch();
    const navigate = useNavigate();

    const stationList = useMemo(() => data && data.map(({ name, code }: { name: string, code: string }) => ({ label: name, value: code })), [data])

    useEffect(() => {
        fetchIt('stations');
    }, []);

    const handleFinish = useCallback((values: Record<string, any>) => navigate(`/search-results?${Object.entries(values).map(([key, value]) => key === 'date' ? `date=${transformDate(value)}` : `${key}=${value}`).join('&')}`), [])

    return (
        <Flex vertical align='center' justify='center' className={style.wrapper}>

            <h1>Let's Find That Ticket</h1>
            <p>Before Someone Else Does</p>
            <TicketForm initialValues={{
                type: "round",
                passengers: 1,
            }} handleFinish={handleFinish} stationList={stationList} stationsIsLoading={loading} theme="dark"/>


        </Flex>
    )
}

HomePage.displayName = 'Home.Page'