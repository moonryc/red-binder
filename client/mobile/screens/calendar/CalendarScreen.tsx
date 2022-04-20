import React, { useReducer, useState } from 'react';
import { Text, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import {
  addMonths,
  format,
  getDay,
  getDaysInMonth,
  getYear,
  isSameDay,
  isSameMonth,
  startOfMonth,
  subMonths
} from 'date-fns';
import { StandardButton } from '../../components/buttons/StandardButton';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CalendarStackParamList } from '../../navigation';
import { StatusBar } from 'expo-status-bar';
import BlankDays from '../../components/calendar/blank-days/BlankDays';
import CalendarDays from '../../components/calendar/calendar-days/CalendarDays';
import { useApplicationContext } from '../../context/GlobalState';
import { useGetRefillDays } from '../../hooks';

type CalendarScreenProp = NativeStackNavigationProp<CalendarStackParamList, 'CalendarHome'>;

interface IInitialState {
  firstDayOfMonth: 0 | 1 | 2 | 3 | 4 | 5 | 6,
  month: string,
  year: number,
  date: Date
  numberOfDaysInMonth: number
}

const initialState: IInitialState = {
  firstDayOfMonth: getDay(startOfMonth(new Date())),
  month: format(new Date(), 'MMMM'),
  year: getYear(new Date()),
  date: new Date(),
  numberOfDaysInMonth: getDaysInMonth(new Date())
};

const reducer = (state: { date: number | Date; }, action: { type: string; }) => {
  let newDate;
  if (action.type === 'forwards') {
    newDate = addMonths(state.date, 1);
  } else if (action.type === 'backwards') {
    newDate = subMonths(state.date, 1);
  } else {
    throw Error();
  }

  const firstDayOfTheMonth = getDay(startOfMonth(newDate));
  const month = format(newDate, 'MMMM');
  const newYear = getYear(newDate);
  return {
    firstDayOfMonth: firstDayOfTheMonth,
    month: month,
    year: newYear,
    date: newDate,
    numberOfDaysInMonth: getDaysInMonth(newDate)
  };
};

export const CalendarScreen = () => {

  const {state:{binders}} = useApplicationContext();
  const tailwind = useTailwind();
  const styles = {
    container: tailwind('flex w-full h-full'),
    navigation: tailwind('flex w-full flex-row items-center justify-around my-4'),
    weekContainer: tailwind('flex w-full flex-row flex-wrap items-center justify-around')
  };

  const [selectedMonth, dispatch] = useReducer(reducer, initialState);
  const [today, setToday] = useState(new Date());
  setInterval(() => {
    if (!isSameDay(today, new Date())) {
      setToday(new Date());
    }
  }, 1000 * 60);


  const arrayOfRefillDates = useGetRefillDays(binders).filter(date=>isSameMonth(new Date(date),selectedMonth.date));





  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.navigation}>
        <StandardButton fontSize={'text-lg'} color={''}
          onPress={() => dispatch({ type: 'backwards' })}>{'<'}</StandardButton>
        <Text>{selectedMonth.month}{'\n'} {selectedMonth.year}</Text>
        <StandardButton fontSize={'text-lg'} color={''}
          onPress={() => dispatch({ type: 'forwards' })}>{'>'}</StandardButton>
      </View>
      <View style={styles.weekContainer}>
        <BlankDays selectedMonth={selectedMonth} location={'beg'} />
        <CalendarDays arrayOfRefillDates={arrayOfRefillDates} selectedMonth={selectedMonth}/>
        <BlankDays selectedMonth={selectedMonth} location={'end'} />
      </View>
    </View>
  );
};




