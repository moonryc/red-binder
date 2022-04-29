import React, { useMemo } from 'react';

import { HomeScreenNavigation } from './HomeScreenNavigation';
import { DarkTheme, DefaultTheme, NavigationContainer, useTheme } from '@react-navigation/native';
import { LoginSignupNavigation } from './LoginSignupNavigation';
import { useApplicationContext } from '../context/GlobalState';
import { CustomTheme } from '../types';
import { useCustomTheme } from '../hooks';
import LoadingScreen from '../screens/LoadingScreen';


const MyLightTheme:CustomTheme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    primary: '#004e98',
    primaryLight: '#44a4fd',
    primaryDark: '#168efd',
    primaryBar:'#003565',
    text: '#ffffff',


    secondary: '#f50057',
    secondaryLight: 'rgb(247, 51, 120)',
    secondaryDark: 'rgb(171, 0, 60)',



    background: '#a1d0fd',
    card: 'rgb(255, 255, 255)',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',

    paper:'rgb(255, 255, 255)',
    paperShadow:'black',
    calendarText:'#FFFFFF',

    refill:'darkblue',
    refillPressed:'blue'


  }
};

//TODO
const MyDarkTheme:CustomTheme = {
  ...DarkTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    primary: '#e7ab63',
    primaryLight: 'rgb(171,122,87)',
    primaryDark: 'rgb(105,58,26)',
    primaryBar:'rgb(105,58,26)',
    text: '#e5aa62',


    secondary: '#f50057',
    secondaryLight: 'rgb(247, 51, 120)',
    secondaryDark: 'rgb(171, 0, 60)',



    background: '#ECC28CFF',
    card: 'rgb(255, 255, 255)',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',

    paper:'rgb(171,122,87)',
    paperShadow:'rgb(105,58,26)',
    calendarText:'rgb(105,58,26)',

    refill:'#998cec',
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
    headerTintColor: colors.primaryDark,
    headerTitleStyle: {
      fontWeight: 'bold'
    }
  }as const), [colors.primary, colors.primaryDark]);
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
      {isLoggedIn ===null ? <LoadingScreen/>:<NavigationSelector isLoggedIn={isLoggedIn} />}
    </NavigationContainer>
  );
};


