import { useState, useEffect } from 'react';
import { VoltageData, ApiResponse } from '../types';
import axios from 'axios';
export const useVoltageData = (): ApiResponse => {
  const [data, setData] = useState<VoltageData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
   try {
      setLoading(true);
      setError(null);
      
      // const response = await axios.get('http://127.0.0.1:5000/data');
      setData(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
      console.error('Error fetching voltage data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error };
};