import React from 'react';
import {
  BinderScreen,
  CreateBinderScreen,
  MedicationCreateEditScreen,
  MedicationSelectedScreen,
  SelectedBinderEditScreen,
  SelectedBinderMedicalHistoryScreen,
  SelectedBinderMedicationInteractions,
  SelectedBinderMedications,
  SelectedBinderScreen
} from '../../screens';

import { Button, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ParamListBase } from '@react-navigation/native';

export interface BinderStackParamList extends ParamListBase{
  BindersHome: undefined,
  CreateMedication: undefined,
  SelectedMedication: undefined,
  CreateBinder: undefined,
  SelectedBinder: undefined,
  EditBinder: undefined,
  BinderMedications: undefined,
  BinderInteractions: undefined,
  BinderMedicalHistory: undefined,
}

export const BindersStack = createNativeStackNavigator<BinderStackParamList>();


// @ts-ignore
export const TabBindersNavigation = ({ navigationOptionStyle }) => {

  return (
    <View style={{ flex: 1 }} collapsable={false}>
      {/*  This view is included to fix a bug that causes the navigator to not render properly on android*/}
      <BindersStack.Navigator screenOptions={{ headerShown: true }} initialRouteName={'BindersHome'}>
        <BindersStack.Screen name={'BindersHome'} component={BinderScreen} options={navigationOptionStyle} />
        <BindersStack.Screen name={'CreateMedication'} component={MedicationCreateEditScreen}
          options={navigationOptionStyle} />
        <BindersStack.Screen name={'SelectedMedication'} component={MedicationSelectedScreen}
          options={navigationOptionStyle} />

        <BindersStack.Screen name={'CreateBinder'} component={CreateBinderScreen} options={navigationOptionStyle} />
        <BindersStack.Screen name={'SelectedBinder'} component={SelectedBinderScreen}
          options={navigationOptionStyle} />
        <BindersStack.Screen name={'EditBinder'} component={SelectedBinderEditScreen}
          options={navigationOptionStyle} />
        <BindersStack.Screen name={'BinderMedications'} component={SelectedBinderMedications}
          options={navigationOptionStyle} />
        <BindersStack.Screen name={'BinderInteractions'} component={SelectedBinderMedicationInteractions}
          options={navigationOptionStyle} />
        <BindersStack.Screen name={'BinderMedicalHistory'} component={SelectedBinderMedicalHistoryScreen}
          options={navigationOptionStyle} />
      </BindersStack.Navigator>
    </View>
  );
};


