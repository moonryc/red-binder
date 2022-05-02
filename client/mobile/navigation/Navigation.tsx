import React, { useMemo } from 'react';

import { HomeScreenNavigation } from './HomeScreenNavigation';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { LoginSignupNavigation } from './LoginSignupNavigation';
import { useApplicationContext } from '../context/GlobalState';
import { CustomTheme, LoadingProcess, LoadingProcessStatus } from '../types';
import { useCustomTheme } from '../hooks';
import LoadingScreen from '../screens/LoadingScreen';
import AppLoader from '../components/app-loader/AppLoader';
import { useCheckLogin } from '../hooks/startup/useCheckLogin';
import { useLoadData } from '../hooks/startup/useLoadData';


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

    bottomTabIcon:'',
    bottomTabIconSelected:'',


    calendarText:'#004d97',
    todayCalendarDay:'#63cde7',
    standardCalendarDay:'#ffffff',
    standardCalendarDayPressed:'#003563',
    refill:'#43a3fb',
    refillPressed:'#003564'


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


    bottomTabIcon:'',
    bottomTabIconSelected:'',

    calendarText:'#693A1AFF',
    todayCalendarDay:'#e7ab63',
    standardCalendarDay:'#AB7A57FF',
    standardCalendarDayPressed:'#693A1AFF',
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
  const checkIfLoggedIn = useCheckLogin();
  const getUserData = useLoadData(checkIfLoggedIn);

  const loadingProcesses:LoadingProcess[] = [
    {name:'checkIfLoggedIn',isReady:checkIfLoggedIn.loginStatus === LoadingProcessStatus.isReady},
    {name:'loadExistingUserData', isReady:getUserData.loadDataStatus === LoadingProcessStatus.isReady}
  ];

  return(
    <AppLoader
      loadingComponent={
        <LoadingScreen
          loadingUserDataStatus={checkIfLoggedIn.loginStatus}
          loginStatus={getUserData.loadDataStatus}
        />
      }
      minimumLoadingTime={1000}
      mandatoryProcesses={loadingProcesses}>
      <NavigationContainer theme={isLightTheme ? MyLightTheme : MyDarkTheme}>
        <NavigationSelector isLoggedIn={isLoggedIn}/>
      </NavigationContainer>
    </AppLoader>

  );
};


