import React, { useReducer, useState } from 'react';
import { Text } from 'react-native';
import CalendarDay from '../day/CalendarDay';
import { format, getMonth, isSameDay, parseISO } from 'date-fns';
import { useApplicationContext } from '../../../context/GlobalState';
import { useGetToday } from '../../../hooks/useGetToday';
import { IMedication } from '../../../types';
import SelectedCalendarDayModal from '../../modals/selected-calendar-day-modal/SelectedCalendarDayModal';

interface props {
  selectedMonth: {
    firstDayOfMonth: 0 | 1 | 2 | 3 | 4 | 5 | 6,
    month: string,
    year: number,
    date: Date
    numberOfDaysInMonth: number
  };
}

interface ICalendarDay {
  numberOfDayInMonth: number,
  isRefill: boolean,
  isToday: boolean,
  refills:IMedication[]
}

interface modalData {
  isOpen:boolean,
  refills:[]
}

const initialModalData = {
  isOpen:false,
  refills:[]
};

type actionTypes = 'open'|'close'|'setRefills'

const reducer = (state:modalData,action:{type:actionTypes,value?:any}) => {
  switch(action.type){
  case 'open':
    return {...state, isOpen:true};
  case 'close':
    return {...state, isOpen:false};
  case 'setRefills':
    return {...state, refills:action.value};
  default:
    return {...state};
  }
};

const CalendarDays: React.FC<props> = ({
  selectedMonth: { numberOfDaysInMonth, firstDayOfMonth, year, date }
}) => {
  const today = useGetToday();
  const monthNumber = getMonth(date);
  const { state: { arrayOfMedications } } = useApplicationContext();
  const [modalState,modalDispatch] = useReducer(reducer,initialModalData);
  const {isOpen}=modalState;

  const arrayOfDays:ICalendarDay[] = [];
  for (let index = 1; index <= numberOfDaysInMonth; index++) {
    const calendarDay = new Date(year,monthNumber,index);
    const refills = arrayOfMedications.filter((medication)=> isSameDay(medication.next_refill as Date, calendarDay) );
    const isRefill = refills.length>0;
    arrayOfDays.push({
      numberOfDayInMonth:index,
      isRefill:isRefill,
      isToday: isSameDay(today, calendarDay),
      refills:refills
    } as ICalendarDay);
  }

  const handleCalendarDayPress = (refills:IMedication[]) => {
    modalDispatch({type:'open'});
    modalDispatch({type:'setRefills',value:refills});
  };

  const closeModal = () => {
    modalDispatch({type:'close'});
    modalDispatch({type:'setRefills',value:[]});
  };

  return (
    <>
      {
        arrayOfDays.map(({ numberOfDayInMonth, isRefill,isToday, refills }, index) => {
          return (<React.Fragment key={index.toString() + 'ft2'}>
            {index !== 0 && (firstDayOfMonth + index) % 7 === 0 && (
              <Text key={index.toString() + 't'}>{'\n'}</Text>)}
            <CalendarDay key={index.toString() + 'c'} dayNumber={numberOfDayInMonth} isRefillDay={isRefill} isToday={isToday} onPress={()=>handleCalendarDayPress(refills)}/>
          </React.Fragment>);
        })
      }
      <SelectedCalendarDayModal isCalendarDayOpen={isOpen} setIsCalendarDayOpen={closeModal}/>
    </>
  );
};

export default CalendarDays;