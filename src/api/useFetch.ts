import { useState } from "react"
import { mockFetch } from "./mockApi";

export const useFetch = () => {
    const [data, setData] = useState<any | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    async function fetchIt (type: string, noDelay = false) {
        setLoading(true);

        try {
            const data = await mockFetch(type, noDelay);
            setData(data);
        } catch (error) {
            setError((error as unknown as Error).message);
        }

        setLoading(false);
    }

    return {data, loading, error, fetchIt};
}
