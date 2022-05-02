import React from 'react';
import { getMonth, isSameDay } from 'date-fns';
import { useApplicationContext } from '../../../context/GlobalState';
import { useGetToday } from '../../../hooks/useGetToday';
import CalendarWeek from '../calendar-week/CalendarWeek';
import { ICalendarDay } from '../../../types/calendar';

interface props {
  selectedMonth: {
    firstDayOfMonth: 0 | 1 | 2 | 3 | 4 | 5 | 6,
    month: string,
    year: number,
    date: Date
    numberOfDaysInMonth: number
  };
}

/**
 * Breaks an array into smaller equal sized chunks
 * @param myArray
 * @param chunk_size
 */
const chunkArray=(myArray:any[], chunk_size:number)=>{
  let index = 0;
  let arrayLength = myArray.length;
  let tempArray = [];
  for (index = 0; index < arrayLength; index += chunk_size) {
    const myChunk = myArray.slice(index, index+chunk_size);
    // Do something if you want with the group
    tempArray.push(myChunk);
  }
  return tempArray;
};

/**
 * Renders a specified month
 * @param numberOfDaysInMonth
 * @param firstDayOfMonth
 * @param year
 * @param date
 * @constructor
 */
const CalendarDays: React.FC<props> = ({
  selectedMonth: { numberOfDaysInMonth, firstDayOfMonth, year, date }
}) => {
  const today = useGetToday();
  const monthNumber = getMonth(date);
  const { state: { arrayOfMedications } } = useApplicationContext();

  const arrayOfDays:ICalendarDay[] = [];
  for (let index = 0; index < firstDayOfMonth; index++) {
    arrayOfDays.push({
      isFillerDay:true,
      date: new Date(),
      isToday:false,
      isRefill:false,
      isMissedDosage:false,
    });
  }
  for(let index = 1; index<=numberOfDaysInMonth;index++){
    const calendarDay = new Date(year,monthNumber,index);
    const refills = arrayOfMedications.filter((medication)=> isSameDay(medication.next_refill as Date, calendarDay) );
    const isRefill = refills.length>0;
    arrayOfDays.push({
      isFillerDay:false,
      date: calendarDay,
      isToday:isSameDay(today, calendarDay),
      isRefill:isRefill,
      isMissedDosage:false,
    });
  }
  while( arrayOfDays.length<42){
    arrayOfDays.push({
      isFillerDay:true,
      date: new Date(),
      isToday:false,
      isRefill:false,
      isMissedDosage:false,
    });
  }
  let arrayOfWeeks:ICalendarDay[][] = chunkArray(arrayOfDays,7);

  return (
    <>
      {
        arrayOfWeeks.map((week,index)=>(
          <CalendarWeek key={index} daysInWeek={week}/>
        ))
      }
    </>
  );
};

export default CalendarDays;