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

export const BindersStack = createNativeStackNavigator();

// @ts-ignore
export const TabBindersNavigation = ({navigationOptionStyle}) => {

  return (
    <View style={{flex:1}} collapsable={false}>
      {/*  This view is included to fix a bug that causes the navigator to not render properly on android*/}
      <BindersStack.Navigator screenOptions={{ headerShown: true }}>
        <BindersStack.Screen name={'Binders Home'} component={BinderScreen} options={navigationOptionStyle} />
        <BindersStack.Screen name={'Create Medication'} component={MedicationCreateEditScreen} options={navigationOptionStyle}/>
        <BindersStack.Screen name={'Selected Medication'} component={MedicationSelectedScreen} options={navigationOptionStyle} />

        <BindersStack.Screen name={'Create Binder'} component={CreateBinderScreen} options={navigationOptionStyle}/>
        <BindersStack.Screen name={'Selected Binder'} component={SelectedBinderScreen} options={navigationOptionStyle}/>
        <BindersStack.Screen name={'Edit Binder'} component={SelectedBinderEditScreen} options={navigationOptionStyle}/>
        <BindersStack.Screen name={'Binder Medications'} component={SelectedBinderMedications} options={navigationOptionStyle}/>
        <BindersStack.Screen name={'Binder Interactions'} component={SelectedBinderMedicationInteractions} options={navigationOptionStyle}/>
        <BindersStack.Screen name={'Binder Medical History'} component={SelectedBinderMedicalHistoryScreen} options={navigationOptionStyle}/>
      </BindersStack.Navigator>
    </View>
  );
};


