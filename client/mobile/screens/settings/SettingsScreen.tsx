import React from 'react';
import { SafeAreaView, ScrollView, Text } from 'react-native';
import { StandardButton } from '../../components/buttons/StandardButton';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LoginStackParamList, SettingsStackParamList } from '../../navigation';
import { useNavigation } from '@react-navigation/native';
import { useApplicationContext } from '../../context/GlobalState';
import { TOGGLE_THEME } from '../../context/actions';
import { StatusBar } from 'expo-status-bar';
import CustomScrollableView from '../../components/misc/CustomScrollableView';


type settingsScreenProp = NativeStackNavigationProp<SettingsStackParamList, 'SettingsHome'>;

export const SettingsScreen = () => {
  const navigation = useNavigation<settingsScreenProp>();
  const { state: { isLightTheme }, dispatch }= useApplicationContext();

  return (
    <CustomScrollableView>
      <Text>Hello</Text>
      <StandardButton onPress={()=>dispatch({ type:TOGGLE_THEME })} fontSize={'text-lg'} color={'red'}>{isLightTheme? 'Light Mode': 'Dark Mode'}</StandardButton>
    </CustomScrollableView>
  );
};


