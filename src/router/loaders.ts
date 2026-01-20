import { fetchStations } from "src/api/mockApi"

export const homeLoader = async () => {
    const stations = await fetchStations();
    return {stations};
} 