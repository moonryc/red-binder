import React from 'react';
import { View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CalendarScreen } from '../../screens';
import { ParamListBase } from '@react-navigation/native';

export const CalendarStack = createNativeStackNavigator();

export interface CalendarStackParamList extends ParamListBase{
  CalendarHome: undefined,
}


//@ts-ignore
export const TabCalendarNavigation= ({navigationOptionStyle}:any) => {

  return (
    <View style={{flex:1}} collapsable={false}>
      <CalendarStack.Navigator initialRouteName={'CalendarHome'}>
        <CalendarStack.Screen name={'CalendarHome'} component={CalendarScreen} options={navigationOptionStyle}/>
      </CalendarStack.Navigator>
    </View>
  );
};


