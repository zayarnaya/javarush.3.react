import { Flex } from "antd";
import { useCallback, useContext, useMemo } from "react"
import cn from 'classnames'
import style from './SearchResultsPage.module.scss'
import { TicketForm } from "src/widgets";
import { useSearchParams } from "react-router";
import { StationsContext } from "src/contexts/StationsContext";
import { parseDate } from "./helpers";

export const SearchResultsPage = () => {

    const [searchParams, setSearchParams] = useSearchParams();

    const initialValues = Object.fromEntries(searchParams.entries());
    //@ts-expect-error
    initialValues.date = parseDate(initialValues.date);

    const handleFinish = useCallback((values: Record<string, any>) => console.log(values), []);

    const {stations, loading} = useContext(StationsContext);

    const stationList = useMemo(() => stations && stations.map(({ name, code }: { name: string, code: string }) => ({ label: name, value: code })), [stations])
    

    return (
        <Flex vertical className={cn(style.wrapper)}>
            <h1>Search results</h1>
            <TicketForm initialValues={initialValues} handleFinish={handleFinish} stationsIsLoading={loading}
            formType="result" stationList={stationList ?? []} />
        </Flex>
    )
}

SearchResultsPage.displayName = 'Search.Results.Page'