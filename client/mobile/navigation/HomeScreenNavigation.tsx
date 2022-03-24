import React from 'react';
import { TabBindersNavigation, TabCalendarNavigation, TabSettingsNavigation, TabTodaysInfoNavigation } from './tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Drawer = createMaterialBottomTabNavigator();

export const HomeScreenNavigation = () => {

  const screensArray=[
    {
      name:'Calendar',
      component:TabCalendarNavigation,
      tabBarLabel:'Calendar',
      tabBarIcon:'calendar',
    },
    {
      name:'Today\'s info',
      component:TabTodaysInfoNavigation,
      tabBarLabel:'Today\'s info',
      tabBarIcon:'note',
    },
    {
      name:'Binders',
      component:TabBindersNavigation,
      tabBarLabel:'Binders',
      tabBarIcon:'book',
    },
    {
      name:'Settings',
      component:TabSettingsNavigation,
      tabBarLabel:'Settings',
      tabBarIcon:'cog',
    }
  ];

  return (

    <Drawer.Navigator initialRouteName={'Calendar'} activeColor="#f0edf6"
      inactiveColor="#3e2465"
      barStyle={{ backgroundColor: '#007cd4' }}>
      {screensArray.map((screens,index)=>{
        return (<Drawer.Screen key={index} name={screens.name} component={screens.component} options={{
          tabBarLabel: screens.name,
          tabBarIcon: ({color})=><MaterialCommunityIcons name={screens.tabBarIcon} color={color} size={26} />
        }}/>);
      })}


    </Drawer.Navigator>


  );
};


