import React, { useEffect } from 'react';
import { TabBindersNavigation, TabCalendarNavigation, TabSettingsNavigation } from './tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { View } from 'react-native';
import { useQuery } from '@apollo/client';
import { GET_ALL_BINDERS } from '../utils/apis';
import { useApplicationContext } from '../context/GlobalState';
import { UPDATE_BINDERS } from '../context/actions';
import { useCustomTheme } from '../hooks/useCustomTheme';
import { IBinders } from '../types';
import { parseDate } from '../utils/parseDate';

const Drawer = createMaterialBottomTabNavigator();

const screenOptions = (name:string,icon:string,colors:any)=>{
  return {
    tabBarIcon: ({color}:{color:any})=> {
      return(<MaterialCommunityIcons name={icon} color={color} size={26} />);
    }
  };
};

interface props {
  navigationOptionStyle:any
}

export const HomeScreenNavigation:React.FC<props> = ({navigationOptionStyle}) => {

  const { state:{binders}, dispatch}= useApplicationContext();
  const colors= useCustomTheme();





  return (
    <View style={{flex:1}} collapsable={false}>
      <Drawer.Navigator sceneAnimationEnabled={false} initialRouteName={'Calendar'} activeColor={colors.primary}
        inactiveColor={colors.primaryLight}
        barStyle={{ backgroundColor: colors.primaryBar }}>
        <Drawer.Screen name={'Calendar'} options={screenOptions('Calendar','calendar',colors)}>
          {props=>(<TabCalendarNavigation navigationOptionStyle={navigationOptionStyle} {...props}/>)}
        </Drawer.Screen>
        <Drawer.Screen name={'Binders'} options={screenOptions('Binders','book',colors)}>
          {props=><TabBindersNavigation navigationOptionStyle={navigationOptionStyle} {...props}/>}
        </Drawer.Screen>
        <Drawer.Screen name={'Settings'} options={screenOptions('Settings','cog',colors)}>
          {props=><TabSettingsNavigation navigationOptionStyle={navigationOptionStyle} {...props}/>}
        </Drawer.Screen>
      </Drawer.Navigator>
    </View>
  );
};


