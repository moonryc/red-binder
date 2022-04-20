import React, { useCallback, useEffect, useMemo } from 'react';
import { TabBindersNavigation, TabCalendarNavigation, TabSettingsNavigation, TabTodaysInfoNavigation } from './tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useQuery } from '@apollo/client';
import { GET_ALL_BINDERS } from '../utils/apis';
import { useApplicationContext } from '../context/GlobalState';
import { UPDATE_BINDERS } from '../context/actions';

const Drawer = createMaterialBottomTabNavigator();

const screenOptions = (name:string,icon:string)=>{
  return {
    tabBarIcon: ({color}:{color:any})=><MaterialCommunityIcons name={icon} color={color} size={26} />
  };
};


interface props {
  navigationOptionStyle:any
}


export const HomeScreenNavigation:React.FC<props> = ({navigationOptionStyle}) => {

  const { state:{binders}, dispatch}= useApplicationContext();

  const {data:bindersData,error,loading}= useQuery(GET_ALL_BINDERS);

  useEffect(()=>{
    if(bindersData?.getAllBindersByAccountId?.binders){
      const isDataIdentical = JSON.stringify(bindersData?.getAllBindersByAccountId?.binders) === JSON.stringify(binders);
      if(!isDataIdentical){
        dispatch({type:UPDATE_BINDERS, value: bindersData.getAllBindersByAccountId.binders});
      }
    }
  },[binders, bindersData, dispatch]);



  return (
    <View style={{flex:1}} collapsable={false}>
      <Drawer.Navigator sceneAnimationEnabled={false} initialRouteName={'Calendar'} activeColor="#f0edf6"
        inactiveColor="#3e2465"
        barStyle={{ backgroundColor: '#007cd4' }}>
        <Drawer.Screen name={'Calendar'} options={screenOptions('Calendar','calendar')}>
          {props=>(<TabCalendarNavigation navigationOptionStyle={navigationOptionStyle} {...props}/>)}
        </Drawer.Screen>
        <Drawer.Screen name={'Today\'s Info'} options={screenOptions('Today\'s Info','note')}>
          {props =><TabTodaysInfoNavigation navigationOptionStyle={navigationOptionStyle} {...props}/>}
        </Drawer.Screen>
        <Drawer.Screen name={'Binders'} options={screenOptions('Binders','book')}>
          {props=><TabBindersNavigation navigationOptionStyle={navigationOptionStyle} {...props}/>}
        </Drawer.Screen>
        <Drawer.Screen name={'Settings'} options={screenOptions('Settings','cog')}>
          {props=><TabSettingsNavigation navigationOptionStyle={navigationOptionStyle} {...props}/>}
        </Drawer.Screen>
      </Drawer.Navigator>
    </View>
  );
};


