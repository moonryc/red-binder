import { IBinders } from '../types';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';

export const useGetRefillDays = (binders: IBinders[]|[]|null) => {
  const [arrayOfRefillDates, setArrayOfRefillDates] = useState<string[]>([]);
  useEffect(() => {
    if (binders && binders.length > 0) {
      let tempArrayOfMedicationsDates: Date[] = [];
      for (const {medications} of binders) {
        for(const {next_refill} of medications){
          tempArrayOfMedicationsDates = [...tempArrayOfMedicationsDates,new Date(parseInt(next_refill as string))];
        }
      }
      const formatTempArray = tempArrayOfMedicationsDates.map(date=>{
        return format(date,'MM/dd/yyyy');
      });
      setArrayOfRefillDates(formatTempArray);
      console.log(tempArrayOfMedicationsDates);
    }
  }, [binders]);

  return arrayOfRefillDates;

};