import React, { useMemo, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useCustomTheme } from '../../../hooks/useCustomTheme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface INavButton {
  [x: string]: any;
  onPress: Function;
}

const NavButton: React.FC<INavButton> = ({ onPress, children }) => {
  const [isPressed, setIsPressed] = useState<boolean>(false);
  const colors = useCustomTheme();
  const styles = useMemo(() => ({
    container: {
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'row',
      alignItems:'center',
      width: 60,
      height: 60,
      borderRadius: 60 / 2,
      backgroundColor: isPressed ? colors.primaryLight : colors.primaryDark
    },
    text: {
      display:'flex',
      color: colors.text,
      textAlign: 'center'
    }
  } as const), [colors.primaryDark, colors.primaryLight, colors.text, isPressed]);

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


const CalendarNav: React.FC<props> = ({ previousMonth, nextMonth, month, year }) => {

  const colors = useCustomTheme();

  const styles = useMemo(() => ({
    navigation: {
      display: 'flex',
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around'
    }
  } as const), []);

  const goBack = () => {
    previousMonth();
  };

  const goForward = () => {
    nextMonth();
  };

  return (
    <View style={styles.navigation}>
      <NavButton onPress={goBack}>
        <MaterialCommunityIcons name={'chevron-left'} color={colors.text} size={26} />
      </NavButton>
      <Text>{`${month} - ${year}`}</Text>
      <NavButton onPress={goForward}>
        <MaterialCommunityIcons name={'chevron-right'} color={colors.text} size={26} />
      </NavButton>
    </View>
  );
};

export default CalendarNav;
