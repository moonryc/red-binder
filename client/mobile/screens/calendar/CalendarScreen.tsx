import React, { useCallback, useMemo, useReducer } from 'react';
import { View } from 'react-native';
import { addMonths, format, getDay, getDaysInMonth, getYear, startOfMonth, subMonths } from 'date-fns';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CalendarStackParamList } from '../../navigation';
import { StatusBar } from 'expo-status-bar';
import CalendarDays from '../../components/calendar/calendar-days/CalendarDays';
import CalendarNav from '../../components/calendar/calendar-nav/CalendarNav';
import CalendarMenu from '../../components/calendar/calendar-menu/CalendarMenu';
import { useCustomTheme } from '../../hooks';

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

  const colors = useCustomTheme();
  const styles = useMemo(()=>({
    container:{
      flex:1,
      display:'flex',
      // width:'100%',
      // height:'100%',
    },
    calendarContainer:{
      display:'flex',
      flex:0,


      margin: 15,
      backgroundColor: colors.paper,
      borderRadius: 20,
      padding: 15,
      alignItems: 'center',
      shadowColor: colors.paperShadow,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      height:'auto'

    },
    weekContainer:{
      flex:0,

      height:'auto',

    }
  }as const),[colors.paper, colors.paperShadow]);
  const [selectedMonth, dispatch] = useReducer(reducer, initialState);
  const previousMonth = useCallback(
    () => {
      dispatch({ type: 'backwards' });
    }, []);
  const nextMonth = useCallback(
    () => {
      dispatch({ type: 'forwards' });
    }, []);


  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.calendarContainer}>
        <CalendarNav month={selectedMonth.month} year={selectedMonth.year} previousMonth={previousMonth} nextMonth={nextMonth}/>
        <View style={styles.weekContainer}>
          <CalendarDays selectedMonth={selectedMonth}/>
        </View>
      </View>
      <CalendarMenu />
    </View>
  );
};




