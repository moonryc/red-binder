import React from 'react';

import { Text, useWindowDimensions, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';

interface ICalendarDay {
  disabled?: true|false
  dayNumber?:number|'',
  color?:'red'|'blue'|'orange'|'purple'|'',
  isRefillDay?:boolean

}

const CalendarDay:React.FC<ICalendarDay> = ({disabled=false,dayNumber='', color='',isRefillDay=false}) => {

  const {width} = useWindowDimensions();
  const tailwind = useTailwind();

  const styles = {
    dayContainer:{ ...tailwind(`${disabled?'':'bg-sky-500'} rounded-full flex justify-center`),
      width:1/8 *100 +'%',
      height: 1/8*width,

    },
    refill:{
      backgroundColor: isRefillDay ? 'red': 'blue'
    },
    text:tailwind('text-white text-center')
  };

  return (
    <View style={{ ...styles.dayContainer, ... isRefillDay ? styles.refill:null }}>
      <Text style={styles.text}>{dayNumber}</Text>
    </View>
  );
};

export default CalendarDay;
