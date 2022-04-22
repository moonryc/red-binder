import React, { useMemo } from 'react';

import { HomeScreenNavigation } from './HomeScreenNavigation';
import { DarkTheme, DefaultTheme, NavigationContainer, useTheme } from '@react-navigation/native';
import { LoginSignupNavigation } from './LoginSignupNavigation';
import { useApplicationContext } from '../context/GlobalState';
import { CustomTheme } from '../types';
import { useCustomTheme } from '../hooks/useCustomTheme';


const MyLightTheme:CustomTheme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    primary: '#e7ab63',
    primaryLight: 'rgb(171,122,87)',
    primaryDark: 'rgb(105,58,26)',
    primaryBar:'rgb(105,58,26)',
    text: '#fff',


    secondary: '#f50057',
    secondaryLight: 'rgb(247, 51, 120)',
    secondaryDark: 'rgb(171, 0, 60)',



    background: 'rgb(236,194,140)',
    card: 'rgb(255, 255, 255)',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',


    refill:'darkblue',
    refillPressed:'blue'


  }
};

//TODO
const MyDarkTheme:CustomTheme = {
  ...DarkTheme,
  dark: true,
  colors: {
    ...DarkTheme.colors,
    primary: '#e7ab63',
    primaryLight: 'rgb(171,122,87)',
    primaryDark: 'rgb(105,58,26)',
    primaryBar:'rgb(105,58,26)',
    text: '#fff',


    secondary: '#f50057',
    secondaryLight: 'rgb(247, 51, 120)',
    secondaryDark: 'rgb(171, 0, 60)',



    background: 'rgb(236,194,140)',
    card: 'rgb(255, 255, 255)',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',


    refill:'darkblue',
    refillPressed:'blue'

  }
};

const NavigationSelector = ({isLoggedIn}:{isLoggedIn:boolean}) => {
  const colors = useCustomTheme();
  const navigationOptionStyle = useMemo(() => ({
    // title: 'My home',
    headerStyle: {
      backgroundColor: colors.primary
    },
    headerTintColor: colors.text,
    headerTitleStyle: {
      fontWeight: 'bold'
    }
  }as const), [colors.primary, colors.text]);
  return(
    <>
      {isLoggedIn ? <HomeScreenNavigation navigationOptionStyle={navigationOptionStyle}/> : <LoginSignupNavigation navigationOptionStyle={navigationOptionStyle}/>}
    </>
  );
};


export const Navigation = () => {

  const {state:{isLoggedIn,isLightTheme}} = useApplicationContext();

  return (
    <NavigationContainer theme={isLightTheme ? MyLightTheme : MyDarkTheme}>
      <NavigationSelector isLoggedIn={isLoggedIn}/>
    </NavigationContainer>
  );
};


