import React, { useMemo, useState } from 'react';
import {
  Pressable,
  Text,
  useWindowDimensions, View
} from 'react-native';
import { useCustomTheme } from '../../../hooks';
import { getDate } from 'date-fns';
import { ICalendarDay } from '../../../types/calendar';
import { useApplicationContext } from '../../../context/GlobalState';
import { SET_SELECTED_DAY } from '../../../context/actions';


const CalendarDay:React.FC<ICalendarDay> = ({isFillerDay=false,isToday=false,isMissedDosage=false,isRefill,date=new Date(),onPress=null}) => {
  const colors=useCustomTheme();
  const {width} = useWindowDimensions();
  const {dispatch} =useApplicationContext();
  const [isPressed, setIsPressed] = useState(false);


  const styles = useMemo(()=>({
    dayContainer:{
      width:1/9 *width,
      height: 1/9*width,
      borderRadius:(1/7*width)/2,
      justifyContent:'center',
      backgroundColor: isFillerDay ? colors.standardCalendarDay: isPressed ? colors.standardCalendarDayPressed : colors.standardCalendarDay,
    },
    refill:{
      backgroundColor: isRefill ? isPressed ? colors.refillPressed :colors.refill:'',
    },
    today:{
      backgroundColor: isToday ? isPressed ? colors.refillPressed :colors.todayCalendarDay:'',
    },
    text:{
      color:colors.calendarText,
      fontWeight:'bold',
      fontSize:22,
      textAlign:'center',
    }
  }as const),[colors.calendarText, colors.refill, colors.refillPressed, colors.standardCalendarDay, colors.standardCalendarDayPressed, colors.todayCalendarDay, isFillerDay, isPressed, isRefill, isToday, width]);


  if(isFillerDay){
    return(<View style={[styles.dayContainer,{backgroundColor:colors.paper}]}></View>);
  }

  return(
    <Pressable style={[styles.dayContainer, isRefill ? styles.refill:null, isToday ? styles.today:null]} onPressIn={() => setIsPressed(true)} onPressOut={() => setIsPressed(false)} onPress={() => dispatch({type:SET_SELECTED_DAY,value:date})}>
      <Text style={styles.text}>{ getDate(date)}</Text>
    </Pressable>
  );

};

export default CalendarDay;
