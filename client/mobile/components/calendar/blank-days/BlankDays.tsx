import CalendarDay from '../day/CalendarDay';
import React, { useState } from 'react';
import { Text } from 'react-native';

interface props {
  selectedMonth:{
    firstDayOfMonth: 0 | 1 | 2 | 3 | 4 | 5 | 6,
    month: string,
    year: number,
    date: Date
    numberOfDaysInMonth: number
  }
  location: 'beg' | 'end'
}

const BlankDays:React.FC<props> = ({ selectedMonth: { numberOfDaysInMonth,firstDayOfMonth }, location }) => {
  let numberOfBlankDays = 0;
  const arrayOfBlankDays = [];


  const blankDaysEndCalculator = () => {

    let numberOfDays = (numberOfDaysInMonth + firstDayOfMonth);
    if (numberOfDays > 35) {
      return 42 - numberOfDays;
    } else {
      return 35 - numberOfDays;
    }
  };

  if(location==='beg'){
    numberOfBlankDays = firstDayOfMonth;
  }else{
    numberOfBlankDays = blankDaysEndCalculator();
  }

  for (let index = 0; index < numberOfBlankDays; index++) {
    arrayOfBlankDays.push(index);
  }

  return (
    <>
      {
        arrayOfBlankDays.map((index) => {
          return <CalendarDay key={index + location} disabled />;
        })
      }
      {location === 'end' && <Text>{'\n'}</Text>}
    </>
  );
};

export default BlankDays;