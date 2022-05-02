import React from 'react';

import { View,StyleSheet } from 'react-native';
import CalendarDay from '../day/CalendarDay';
import { ICalendarDay } from '../../../types/calendar';


interface props{
  daysInWeek:ICalendarDay[]
}

const styles= StyleSheet.create({
  container:{
    display:'flex',
    flexDirection:'row',
    width:'100%',
    flexWrap:'wrap',
    alignItems:'center',
    justifyContent:'space-around',
  }
});

/**
 * Renders each week of the month 7 days each inside one view component, this is due React natives limited CSS
 * @param daysInWeek
 * @constructor
 */
const CalendarWeek:React.FC<props> = ({daysInWeek}) => {
  return (
    <View style={styles.container}>
      {daysInWeek.map((day,index)=>(
        <CalendarDay key={index} isFillerDay={day.isFillerDay} isToday={day.isToday} isRefill={day.isRefill} date={day.date} isMissedDosage={day.isMissedDosage} />
      ))}
    </View>
  );
};

export default CalendarWeek;



