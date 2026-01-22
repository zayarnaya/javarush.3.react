import { indianRailwayStations, trainsMockData, type Train } from 'src/mockData/mocks';
import { useFetch } from './useFetch';
import { useState } from 'react';

const mapTypeToData: Record<string, any> = {
  stations: indianRailwayStations,
  trains: trainsMockData,
};

export const mockFetch = async (type: string, noDelay = false) => {
  return new Promise((resolve) => {
    setTimeout(resolve, noDelay ? 0 : Math.random() * 2000, mapTypeToData[type]);
  });
};

export const fetchStations = async (noDelay = false) => mockFetch('stations', noDelay);

export const useFetchTrains = () => {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchTrains(departure: string, arrival: string, noDelay = false) {
    setLoading(true);

    try {
      const trains: Train[] = (await mockFetch('trains', noDelay)) as Train[];
      setData(trains.filter(({ from, to }) => from.code === departure && to.code === arrival));
    } catch (error) {
      setError((error as unknown as Error).message);
    }

    setLoading(false);
  }

  return { data, loading, error, fetchTrains };
};

export const useFetchTrain = () => {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchTrainById(trainId: number | string, noDelay = false) {
    setLoading(true);

    try {
      const trains: Train[] = (await mockFetch('trains', noDelay)) as Train[];
      console.log(trains);

      setData(trains.find(({ id }) => id == trainId));
    } catch (error) {
      setError((error as unknown as Error).message);
    }

    setLoading(false);
  }

  return { data, loading, error, fetchTrainById };
};
