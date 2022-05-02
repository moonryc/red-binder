import React, { useMemo, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useCustomTheme } from '../../../hooks/useCustomTheme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface INavButton {
  [x: string]: any;
  onPress: Function;
}

/**
 * The nav button for the Calendar
 * @param onPress
 * @param children
 * @constructor
 */
const NavButton: React.FC<INavButton> = ({ onPress, children }) => {
  const [isPressed, setIsPressed] = useState<boolean>(false);
  const colors = useCustomTheme();
  const styles = useMemo(() => ({
    container: {
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'row',
      alignItems:'center',
      width: 40,
      height: 40,
      borderRadius: 40 / 2,
      backgroundColor: isPressed ? colors.standardCalendarDayPressed : colors.standardCalendarDay
    },
    text: {
      display:'flex',
      color: colors.text,
      textAlign: 'center'
    }
  } as const), [colors.standardCalendarDay, colors.standardCalendarDayPressed, colors.text, isPressed]);

  return (
    <Pressable onPressIn={() => setIsPressed(true)} onPressOut={() => setIsPressed(false)} onPress={() => onPress()}>
      <View style={styles.container}>
        <Text style={styles.text}>
          {children}
        </Text>
      </View>
    </Pressable>
  );
};

interface props {
  previousMonth: Function,
  nextMonth: Function
  month: string,
  year: number
}


/**
 * Renders the navigation controller for the calendar
 * @param previousMonth
 * @param nextMonth
 * @param month
 * @param year
 * @constructor
 */
const CalendarNav: React.FC<props> = ({ previousMonth, nextMonth, month, year }) => {

  const colors = useCustomTheme();
  const styles = useMemo(() => ({
    navigation: {
      display: 'flex',
      width: '100%',
      flexDirection: 'row',
      padding:15,
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  } as const), []);



  return (
    <View style={styles.navigation}>
      <NavButton onPress={()=>previousMonth()}>
        <MaterialCommunityIcons name={'chevron-left'} color={colors.primaryDark} size={30} />
      </NavButton>
      <Text>{`${month} - ${year}`}</Text>
      <NavButton onPress={()=>nextMonth()}>
        <MaterialCommunityIcons name={'chevron-right'} color={colors.primaryDark} size={30} />
      </NavButton>
    </View>
  );
};

export default CalendarNav;
