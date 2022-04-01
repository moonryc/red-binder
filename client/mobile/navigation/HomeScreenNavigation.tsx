import React from 'react';
import { TabBindersNavigation, TabCalendarNavigation, TabSettingsNavigation, TabTodaysInfoNavigation } from './tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useLoadDataOnLaunch } from '../hooks/useLoadDataOnLaunch';

const Drawer = createMaterialBottomTabNavigator();

export const HomeScreenNavigation = () => {

  const screenOptions=(name:string,icon:string)=>{
    return {
      tabBarIcon: ({color}:{color:any})=><MaterialCommunityIcons name={icon} color={color} size={26} />
    };
  };

  const {colors}=useTheme();

  const navigationOptionStyle = {
    // title: 'My home',
    headerStyle: {
      backgroundColor: colors.primary
    },
    headerTintColor: colors.text,
    headerTitleStyle: {
      fontWeight: 'bold'
    }
  } as const;



  const Calendar =()=> (<TabCalendarNavigation navigationOptionStyle={navigationOptionStyle}/>);
  const Today =()=>(<TabTodaysInfoNavigation navigationOptionStyle={navigationOptionStyle}/>);
  const Binders=()=>(<TabBindersNavigation navigationOptionStyle={navigationOptionStyle}/>);
  const Settings=()=>(<TabSettingsNavigation navigationOptionStyle={navigationOptionStyle}/>);

  useLoadDataOnLaunch();

  return (
    <View style={{flex:1}} collapsable={false}>

      <Drawer.Navigator initialRouteName={'Calendar'} activeColor="#f0edf6"
        inactiveColor="#3e2465"
        barStyle={{ backgroundColor: '#007cd4' }}>
        <Drawer.Screen name={'Calendar'} component={Calendar} options={screenOptions('Calendar','calendar')}/>
        <Drawer.Screen name={'Today\'s Info'} component={Today} options={screenOptions('Today\'s Info','note')}/>
        <Drawer.Screen name={'Binders'} component={Binders} options={screenOptions('Binders','book')}/>
        <Drawer.Screen name={'Settings'} component={Settings} options={screenOptions('Settings','cog')}/>
      </Drawer.Navigator>

    </View>
  );
};


