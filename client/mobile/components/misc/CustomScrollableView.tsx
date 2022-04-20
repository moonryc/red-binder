import React from 'react';

import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

interface props {
  [x:string]:any
}

const CustomScrollableView:React.FC<props> = ({children}) => {
  return (
    <SafeAreaView style={{flex:1}}>
      <ScrollView style={{flex:1}}>
        <StatusBar style='auto' />
        {children}
      </ScrollView>
    </SafeAreaView>
  );
};

export default CustomScrollableView;
