import React, { useMemo, useState } from 'react';

import {
  Pressable,
  Text,
  useWindowDimensions, View
} from 'react-native';
import { useTailwind } from 'tailwind-rn';


import { useCustomTheme } from '../../../hooks';
import { getDate } from 'date-fns';
import { ICalendarDay } from '../../../types/calendar';
import { useApplicationContext } from '../../../context/GlobalState';
import { SET_SELECTED_DAY } from '../../../context/actions';


const CalendarDay:React.FC<ICalendarDay> = ({isFillerDay=false,isToday=false,isMissedDosage=false,isRefill,date=new Date(),onPress=null}) => {
  const colors=useCustomTheme();
  const {width} = useWindowDimensions();
  const {dispatch} =useApplicationContext();
  const tailwind = useTailwind();
  const [isPressed, setIsPressed] = useState(false);
  const styles = useMemo(()=>({
    dayContainer:{ ...tailwind(`${isFillerDay?'':'bg-sky-500'} rounded-full flex justify-center`),
      // flex:1/7,
      width:1/9 *width,
      height: 1/9*width,
      // borderRadius:9999,
      backgroundColor: isFillerDay ? colors.primaryLight: isPressed ? colors.primaryBar :colors.primaryLight,
    },
    refill:{
      backgroundColor: isRefill ? isPressed ? colors.refillPressed :colors.refill:'',
    },
    today:{
      backgroundColor: isToday ? isPressed ? colors.refillPressed :colors.primary:'',
    },
    text:{
      color:colors.calendarText,
      fontWeight:'bold',
      fontSize:22,
      textAlign:'center',
    }
  }as const),[colors.calendarText, colors.primary, colors.primaryBar, colors.primaryLight, colors.refill, colors.refillPressed, isFillerDay, isPressed, isRefill, isToday, tailwind, width]);


  if(isFillerDay){
    return(<View style={[styles.dayContainer,{backgroundColor:colors.primaryLight}]}></View>);
  }

  return(
    <Pressable style={[styles.dayContainer, isRefill ? styles.refill:null, isToday ? styles.today:null]} onPressIn={() => setIsPressed(true)} onPressOut={() => setIsPressed(false)} onPress={() => dispatch({type:SET_SELECTED_DAY,value:date})}>
      <Text style={styles.text}>{ getDate(date)}</Text>
    </Pressable>
  );

};

export default CalendarDay;
