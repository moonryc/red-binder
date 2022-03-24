import React from 'react';

import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export const CalendarStack = createNativeStackNavigator();



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

//@ts-ignore
export const TabCalendarNavigation= ({navigation}:any) => {
  return (
    <View style={styles.container}>
      <Text>
      Calendar
      </Text>
    </View>
  );
};


