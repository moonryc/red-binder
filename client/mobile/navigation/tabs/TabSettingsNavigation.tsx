import React from 'react';
import { View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SettingsScreen } from '../../screens';
import { ParamListBase } from '@react-navigation/native';

export const SettingsStack = createNativeStackNavigator();

export interface SettingsStackParamList extends ParamListBase {
  SettingsHome: undefined,
}

// @ts-ignore
export const TabSettingsNavigation = ({navigationOptionStyle}) => {

  return (
    <View style={{flex:1}} collapsable={false} >
      <SettingsStack.Navigator initialRouteName={'SettingsHome'} screenOptions={{headerShown:true}}>
        <SettingsStack.Screen name={'SettingsHome'} component={SettingsScreen} options={{ ...navigationOptionStyle, title:'Settings' }}/>
      </SettingsStack.Navigator>
    </View>
  );
};


