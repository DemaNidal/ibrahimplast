// components/hooks/useLookupData.js

import { useEffect, useState } from 'react';

export const useLookupData = (fetchFunction, idKey, nameKey) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetchFunction();
       
        const formatted = res.data.map(item => ({
          value: item[idKey],
          label: item[nameKey]
        }));
       
        setOptions(formatted);
      } catch (err) {
        console.error('Failed to fetch lookup data', err);
      }
    };

    loadData();
  }, [fetchFunction, idKey, nameKey]);

  return options;
};
