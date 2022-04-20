import React, { useReducer, useState } from 'react';
import { Text, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import { addMonths, format, getDay, getDaysInMonth, getYear, isSameDay, startOfMonth, subMonths } from 'date-fns';
import CalendarDay from '../../components/calendar/day/CalendarDay';
import { StandardButton } from '../../components/buttons/StandardButton';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CalendarStackParamList } from '../../navigation';
import { StatusBar } from 'expo-status-bar';

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


  const BlankDays = ({ numberOfBlankDays,location }: { numberOfBlankDays: number,location:'beg'|'end' }) => {
    const arrayOfBlankDays = [];

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
      </>
    );
  };
  const blankDaysEndCalculator = () => {

    let numberOfDays = (selectedMonth.numberOfDaysInMonth + selectedMonth.firstDayOfMonth);
    if(numberOfDays >35){
      return 42-numberOfDays;
    }else{
      return 35-numberOfDays;
    }
  };
  //TODO THE NEW LINE IN THIS FUNCTION CAUSES THE CALENDER TO NOT BE CENTERED
  const RemainingDays = () => {
    const arrayOfBlankDays = [];
    for (let index = 1; index <= selectedMonth.numberOfDaysInMonth; index++) {
      arrayOfBlankDays.push(index);
    }
    return (
      <>
        {
          arrayOfBlankDays.map((date, index) => {
            return (<React.Fragment key={index.toString() +'ft2'}>
              {index !==0 && (selectedMonth.firstDayOfMonth + index) % 7 === 0 &&(
                <Text key={index.toString() + 't'}>{'\n'}</Text>)}
              <CalendarDay key={index.toString()+'c'} dayNumber={date} />
            </React.Fragment>);
          })
        }
      </>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style='auto' />
      <View style={styles.navigation}>
        <StandardButton fontSize={'text-lg'} color={''} onPress={() => dispatch({ type: 'backwards' })}>Back</StandardButton>
        <Text>{selectedMonth.month}{'\n'} {selectedMonth.year}</Text>
        <StandardButton fontSize={'text-lg'} color={''} onPress={() => dispatch({ type: 'forwards' })}>Forwards</StandardButton>

      </View>
      <View style={styles.weekContainer}>

        <BlankDays numberOfBlankDays={selectedMonth.firstDayOfMonth} location={'beg'} />
        <RemainingDays />
        <BlankDays numberOfBlankDays={blankDaysEndCalculator()} location={'end'}/>
        <Text>{'\n'}</Text>
      </View>


    </View>
  );
};

