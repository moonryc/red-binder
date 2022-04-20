import React, { useContext, useMemo, useState } from 'react';

import { HomeScreenNavigation } from './HomeScreenNavigation';
import { DarkTheme, DefaultTheme, NavigationContainer, useTheme } from '@react-navigation/native';
import { LoginSignupNavigation } from './LoginSignupNavigation';
import { useApplicationContext } from '../context/GlobalState';

const MyLightTheme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3f51b5',
    primaryLight: 'rgb(101, 115, 195)',
    primaryDark: 'rgb(44, 56, 126)',
    text: '#fff',

    secondary: '#f50057',
    secondaryLight: 'rgb(247, 51, 120)',
    secondaryDark: 'rgb(171, 0, 60)',


    background: '#64b5f6',
    card: 'rgb(255, 255, 255)',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)'
  }
};

//TODO
const MyDarkTheme = {
  ...DarkTheme,
  dark: true,
  colors: {
    ...DarkTheme.colors,
    primary: 'rgb(255, 45, 85)',
    background: 'rgb(153,200,232)',
    card: 'rgb(255, 255, 255)',
    text: 'rgb(28, 28, 30)',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)'
  }
};

const NavigationSelector = ({isLoggedIn}:{isLoggedIn:boolean}) => {
  const {colors}=useTheme();
  const navigationOptionStyle = useMemo(() => ({
    // title: 'My home',
    headerStyle: {
      backgroundColor: colors.primary
    },
    headerTintColor: colors.text,
    headerTitleStyle: {
      fontWeight: 'bold'
    }
  }), [colors.primary, colors.text]);
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


