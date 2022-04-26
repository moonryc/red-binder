import React from 'react';

import { View } from 'react-native';
import CalendarDay from '../day/CalendarDay';
import { ICalendarDay } from '../../../types/calendar';


interface props{
  daysInWeek:ICalendarDay[]
}

const styles= {
  container:{
    display:'flex',
    flexDirection:'row',
    width:'100%',
    flexWrap:'wrap',
    alignItems:'center',
    justifyContent:'space-around',
  }
} as const;

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



