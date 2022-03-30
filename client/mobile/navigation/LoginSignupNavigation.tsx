import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen, SignupScreen } from '../screens';
import { useTheme } from '@react-navigation/native';

export const LoginSignupStack = createNativeStackNavigator();



export const LoginSignupNavigation = () => {

  const {colors}=useTheme();

  const navigationOptionStyle = {
    // title: 'My home',
    headerStyle: {
      backgroundColor: colors.primary
    },
    headerTintColor: colors.text,
    headerTitleStyle: {
      fontWeight: 'bold'
    }
  } as const;

  return (
    <LoginSignupStack.Navigator initialRouteName={'Login'} screenOptions={{headerShown:true}}>
      <LoginSignupStack.Screen name={'Login'} component={LoginScreen} options={navigationOptionStyle}/>
      <LoginSignupStack.Screen name={'Signup'} component={SignupScreen} options={navigationOptionStyle}/>
    </LoginSignupStack.Navigator>
  );
};


