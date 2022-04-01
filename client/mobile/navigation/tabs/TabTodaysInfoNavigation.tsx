import React from 'react';
import { TodaysInfoScreen } from '../../screens';
import { View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ParamListBase } from '@react-navigation/native';

export const TodaysInfoStack = createNativeStackNavigator();

export interface TodaysInfoStackParamList extends ParamListBase {
  TodayHome: undefined,
}

// @ts-ignore
export const TabTodaysInfoNavigation = ({navigationOptionStyle}) => {

  return (
    <View style={{flex:1}} collapsable={false}>
      {/*  This view is included to fix a bug that causes the navigator to not render properly on android*/}
      <TodaysInfoStack.Navigator initialRouteName={'TodayHome'} screenOptions={{headerShown:true}}>
        <TodaysInfoStack.Screen name={'TodayHome'} component={TodaysInfoScreen} options={navigationOptionStyle}/>
      </TodaysInfoStack.Navigator>
    </View>
  );
};


