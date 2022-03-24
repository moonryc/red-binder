import React from 'react';

import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export const SettingsStack = createNativeStackNavigator();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export const TabSettingsNavigation = () => {
  return (
    <View style={styles.container}>
      <Text>
Settings
      </Text>
    </View>
  );
};


