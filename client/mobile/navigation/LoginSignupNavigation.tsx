import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen, SignupScreen } from '../screens';
import { ParamListBase, useTheme } from '@react-navigation/native';

export const LoginSignupStack = createNativeStackNavigator();

export interface LoginStackParamList extends ParamListBase{
  Login:undefined,
  Signup:undefined
}

interface props {
  navigationOptionStyle:any
}

export const LoginSignupNavigation:React.FC<props> = ({navigationOptionStyle}) => {

  return (
    <LoginSignupStack.Navigator initialRouteName={'Login'} screenOptions={{headerShown:true}}>
      <LoginSignupStack.Screen name={'Login'} component={LoginScreen} options={navigationOptionStyle}/>
      <LoginSignupStack.Screen name={'Signup'} component={SignupScreen} options={navigationOptionStyle}/>
    </LoginSignupStack.Navigator>
  );
};


