"use client";
import { useEffect, useState } from "react";

// en caso de que algo pase al retornar el json si hay valores nulos en datos o errores
interface FetchResult<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
}

export const useFetchData = <T,>(url: string, headers?: HeadersInit): FetchResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!url) return; // Si no hay URL, no hace fetch

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url, { headers });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const json: T = await response.json();
        setData(json);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

    