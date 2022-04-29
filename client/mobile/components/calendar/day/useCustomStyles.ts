import { ThemeColors } from '../../../types';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { useTailwind } from 'tailwind-rn';

export const useCustomStyles = (colors:ThemeColors, isFillerDay:boolean,isPressed:boolean,isRefill:boolean,isToday:boolean) => {
  const tailwind = useTailwind();
  const {width} = useWindowDimensions();

  return StyleSheet.create({
    dayContainer:{
      // ...tailwind(`${isFillerDay?'':'bg-sky-500'} rounded-full flex justify-center`),
      // flex:1/7,
      width:1/9 *width,
      height: 1/9*width,
      borderRadius:9999,
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
  } as const);
};