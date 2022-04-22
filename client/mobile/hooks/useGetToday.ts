import { useEffect, useState } from 'react';
import { isSameDay } from 'date-fns';

export const useGetToday = () => {
  const [today, setToday] = useState(new Date());


  useEffect(() => {

    const todayInterval = setInterval(() => {
      if (!isSameDay(today, new Date())) {
        setToday(new Date());
      }
    }, 1000 * 60);
    return () => {
      clearInterval(todayInterval);
    };
  }, []);



  return today;
};