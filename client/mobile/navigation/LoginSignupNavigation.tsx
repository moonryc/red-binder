import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen, SignupScreen } from '../screens';

export const LoginSignupStack = createNativeStackNavigator();

export const LoginSignupNavigation = () => {
  return (
    <LoginSignupStack.Navigator initialRouteName={'Login'}>
      <LoginSignupStack.Screen name={'Login'} component={LoginScreen}/>
      <LoginSignupStack.Screen name={'Signup'} component={SignupScreen}/>
    </LoginSignupStack.Navigator>
  );
};


