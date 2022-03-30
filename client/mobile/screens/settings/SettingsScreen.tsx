import React from 'react';

import { SafeAreaView, ScrollView, Text } from 'react-native';
import { StandardButton } from '../../components/buttons/StandardButton';
import { useMainStoreContext } from '../../context/AllContextProvider';

export const SettingsScreen = () => {

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


