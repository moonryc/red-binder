import React from 'react';
import { TodaysInfoScreen } from '../../screens';
import { View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export const TodaysInfoStack = createNativeStackNavigator();

// @ts-ignore
export const TabTodaysInfoNavigation = ({navigationOptionStyle}) => {

  return (
    <View style={{flex:1}} collapsable={false}>
      {/*  This view is included to fix a bug that causes the navigator to not render properly on android*/}
      <TodaysInfoStack.Navigator initialRouteName={'Today'} screenOptions={{headerShown:true}}>
        <TodaysInfoStack.Screen name={'Today'} component={TodaysInfoScreen} options={navigationOptionStyle}/>
      </TodaysInfoStack.Navigator>
    </View>
  );
};


