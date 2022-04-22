import React, { useCallback, useMemo, useReducer } from 'react';
import { View } from 'react-native';
import { addMonths, format, getDay, getDaysInMonth, getYear, startOfMonth, subMonths } from 'date-fns';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CalendarStackParamList } from '../../navigation';
import { StatusBar } from 'expo-status-bar';
import BlankDays from '../../components/calendar/blank-days/BlankDays';
import CalendarDays from '../../components/calendar/calendar-days/CalendarDays';
import { useApplicationContext } from '../../context/GlobalState';
import CalendarNav from '../../components/calendar/calendar-nav/CalendarNav';

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

  const styles = useMemo(()=>({
    container:{
      display:'flex',
      width:'100%',
      height:'100%',
    },
    weekContainer:{
      display:'flex',
      flexDirection:'row',
      width:'100%',
      height:'100%',
      flexWrap:'wrap',
      alignItems:'center',
      justifyContent:'space-around'
    }
  }as const),[]);


  const {state:{binders}} = useApplicationContext();
  const [selectedMonth, dispatch] = useReducer(reducer, initialState);


  const previousMonth = useCallback(
    () => {
      dispatch({ type: 'backwards' });
    },
    []
  );
  const nextMonth = useCallback(
    () => {
      dispatch({ type: 'forwards' });
    },
    []
  );





  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <CalendarNav month={selectedMonth.month} year={selectedMonth.year} previousMonth={previousMonth} nextMonth={nextMonth}/>
      <View style={styles.weekContainer}>
        <BlankDays selectedMonth={selectedMonth} location={'beg'} />
        <CalendarDays selectedMonth={selectedMonth}/>
        <BlankDays selectedMonth={selectedMonth} location={'end'} />
      </View>
    </View>
  );
};




