import React, { useContext } from 'react';

import { HomeScreenNavigation } from './HomeScreenNavigation';
import { NavigationContainer } from '@react-navigation/native';
import { MainStoreContext } from '../context/MainStoreContext';
import { LoginSignupNavigation } from './LoginSignupNavigation';


export const Navigation = () => {

  const {isLoggedIn} = useContext(MainStoreContext);

  return (
    <NavigationContainer>
      {isLoggedIn ? <HomeScreenNavigation />: <LoginSignupNavigation/>}
    </NavigationContainer>
  );
};


