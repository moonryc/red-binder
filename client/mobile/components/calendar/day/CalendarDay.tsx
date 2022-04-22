import React, { useMemo, useState } from 'react';

import { Pressable, Text, useWindowDimensions, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import { useTheme } from '@react-navigation/native';
import { CustomTheme } from '../../../types';
import { useCustomTheme } from '../../../hooks/useCustomTheme';

interface ICalendarDay {
  disabled?: true|false
  dayNumber?:number|'',
  color?:'red'|'blue'|'orange'|'purple'|'',
  isRefillDay:boolean,
  isToday:boolean,
  onPress?:Function
}

const CalendarDay:React.FC<ICalendarDay> = ({disabled=false,dayNumber='', isRefillDay=false,onPress,isToday}) => {
  const colors=useCustomTheme();
  const {width} = useWindowDimensions();
  const tailwind = useTailwind();
  const [isPressed, setIsPressed] = useState(false);

  const styles = useMemo(()=>({
    dayContainer:{ ...tailwind(`${disabled?'':'bg-sky-500'} rounded-full flex justify-center`),
      width:1/8 *100 +'%',
      height: 1/8*width,
      backgroundColor: disabled ? colors.background: isPressed ? colors.primaryLight :colors.primaryBar,
    },
    refill:{
      backgroundColor: isRefillDay ? isPressed ? colors.refillPressed :colors.refill:'',
    },
    today:{
      backgroundColor: isToday ? isPressed ? colors.refillPressed :colors.primary:'',
    },
    text:{
      color:colors.text,
      textAlign:'center',
    }
  }as const),[colors.background, colors.primary, colors.primaryBar, colors.primaryLight, colors.refill, colors.refillPressed, colors.text, disabled, isPressed, isRefillDay, isToday, tailwind, width]);

  return (

    <Pressable style={{ ...styles.dayContainer, ... isRefillDay ? styles.refill:null, ... isToday ? styles.today:null}} onPressIn={() => setIsPressed(true)} onPressOut={() => setIsPressed(false)} onPress={() => onPress?.()}>
      <Text style={styles.text}>{dayNumber}</Text>
    </Pressable>

  );
};

export default CalendarDay;
