import React from 'react';
import { View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CalendarScreen } from '../../screens';

export const CalendarStack = createNativeStackNavigator();

//@ts-ignore
export const TabCalendarNavigation= ({navigationOptionStyle}:any) => {

  return (
    <View style={{flex:1}} collapsable={false}>
      <CalendarStack.Navigator initialRouteName={'Calendar Home'}>
        <CalendarStack.Screen name={'Calendar Home'} component={CalendarScreen} options={navigationOptionStyle}/>
      </CalendarStack.Navigator>
    </View>
  );
};


