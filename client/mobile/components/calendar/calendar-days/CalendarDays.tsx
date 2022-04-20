import React from 'react';
import { Text } from 'react-native';
import CalendarDay from '../day/CalendarDay';
import { format, getMonth } from 'date-fns';

interface props {
  selectedMonth: {
    firstDayOfMonth: 0 | 1 | 2 | 3 | 4 | 5 | 6,
    month: string,
    year: number,
    date: Date
    numberOfDaysInMonth: number
  };
  arrayOfRefillDates: string[];
}

interface Day {
  numberOfDayInMonth: number,
  isRefill: boolean
}

const CalendarDays: React.FC<props> = ({
  selectedMonth: { numberOfDaysInMonth, firstDayOfMonth,year ,date},
  arrayOfRefillDates
}) => {
  const arrayOfBlankDays = [];
  for (let index = 1; index <= numberOfDaysInMonth; index++) {
    const tempDate = format(new Date(year,getMonth(date),index),'MM/dd/yyyy');
    const tempIsRefill = arrayOfRefillDates.includes(tempDate);
    arrayOfBlankDays.push({
      numberOfDayInMonth: index,
      isRefill: tempIsRefill
    });
  }


  return (
    <>
      {
        arrayOfBlankDays.map(({numberOfDayInMonth,isRefill}, index) => {
          return (<React.Fragment key={index.toString() + 'ft2'}>
            {index !== 0 && (firstDayOfMonth + index) % 7 === 0 && (
              <Text key={index.toString() + 't'}>{'\n'}</Text>)}
            <CalendarDay key={index.toString() + 'c'} dayNumber={numberOfDayInMonth} isRefillDay={isRefill} />
          </React.Fragment>);
        })
      }
    </>
  );
};

export default CalendarDays;