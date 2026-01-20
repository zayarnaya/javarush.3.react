import { Flex } from 'antd';
import { useCallback, useContext, useMemo } from 'react';
import style from './HomePage.module.scss'
import './override.styles.scss'
import { useNavigate } from 'react-router';
import { transformDate } from './helpers';
import { TicketForm } from 'src/widgets';
import { StationsContext } from 'src/contexts/StationsContext';

export const HomePage = () => {

    const navigate = useNavigate();

    const {stations, loading} = useContext(StationsContext);

    const stationList = useMemo(() => stations && stations.map(({ name, code }: { name: string, code: string }) => ({ label: name, value: code })), [stations])

    const handleFinish = useCallback((values: Record<string, any>) => navigate(`/search-results?${Object.entries(values).map(([key, value]) => key === 'date' ? `date=${transformDate(value)}` : `${key}=${value}`).join('&')}`), [])

    return (
        <Flex vertical align='center' justify='center' className={style.wrapper}>

            <h1>Let's Find That Ticket</h1>
            <p>Before Someone Else Does</p>
            <TicketForm initialValues={{
                type: "round",
                passengers: 1,
            }} handleFinish={handleFinish} stationList={stationList ?? []} stationsIsLoading={loading} theme="dark"/>


        </Flex>
    )
}

HomePage.displayName = 'Home.Page'