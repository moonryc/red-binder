import React from 'react';
import { View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SettingsScreen } from '../../screens';

export const SettingsStack = createNativeStackNavigator();

// @ts-ignore
export const TabSettingsNavigation = ({navigationOptionStyle}) => {

  return (
    <View style={{flex:1}} collapsable={false} >
      <SettingsStack.Navigator initialRouteName={'Settings Home'} screenOptions={{headerShown:true}}>
        <SettingsStack.Screen name={'Settings Home'} component={SettingsScreen} options={{ ...navigationOptionStyle, title:'Settings' }}/>
      </SettingsStack.Navigator>
    </View>
  );
};


