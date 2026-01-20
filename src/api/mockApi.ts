import { indianRailwayStations } from "src/mockData/mocks"

const mapTypeToData: Record<string, any> = {
    stations: indianRailwayStations
}

export const mockFetch = async (type: string, noDelay = false) => {
    return new Promise(resolve => {
        setTimeout(resolve, noDelay ? 0 : Math.random() * 2000, mapTypeToData[type])
    })
}

export const fetchStations = async (noDelay = false) => mockFetch('stations', noDelay);