import React from 'react';
import { SafeAreaView, ScrollView, Text } from 'react-native';
import { StandardButton } from '../../components/buttons/StandardButton';
import { useMainStoreContext } from '../../context/AllContextProvider';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LoginStackParamList, SettingsStackParamList } from '../../navigation';
import { useNavigation } from '@react-navigation/native';


type settingsScreenProp = NativeStackNavigationProp<SettingsStackParamList, 'SettingsHome'>;

export const SettingsScreen = () => {

  const navigation = useNavigation<settingsScreenProp>();


  const {isLightTheme, setIsLightTheme}= useMainStoreContext();

  return (
    <SafeAreaView>
      <ScrollView>
        <Text>Hello</Text>
        <StandardButton onPress={()=>setIsLightTheme(!isLightTheme)} fontSize={'text-lg'} color={'red'}>{isLightTheme? 'Light Mode': 'Dark Mode'}</StandardButton>
      </ScrollView>
    </SafeAreaView>
  );
};


