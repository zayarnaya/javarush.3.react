import { indianRailwayStations, trainsMockData, type Train } from "src/mockData/mocks"

const mapTypeToData: Record<string, any> = {
    stations: indianRailwayStations,
    trains: trainsMockData
}

export const mockFetch = async (type: string, noDelay = false) => {
    return new Promise(resolve => {
        setTimeout(resolve, noDelay ? 0 : Math.random() * 2000, mapTypeToData[type])
    })
}

export const fetchStations = async (noDelay = false) => mockFetch('stations', noDelay);

export const fetchTrains = async (departure: string, arrival: string | null, noDelay = false) => {
    const trains: Train[] = await mockFetch('trains', noDelay) as Train[];

    return trains.filter(({from, to}) => from.code === departure && to.code === arrival);
 
}