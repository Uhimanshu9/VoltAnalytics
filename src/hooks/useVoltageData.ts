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
      
      const response = await axios.get('https://h25j8bv46f.execute-api.us-east-1.amazonaws.com/default/test-himanshu');
      setData(response.data);
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