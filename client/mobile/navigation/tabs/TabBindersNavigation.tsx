import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  BinderScreen,
  MedicationCreateEditScreen,
  MedicationSelectedScreen,
  SelectedBinderEditScreen,
  SelectedBinderMedicalHistoryScreen,
  SelectedBinderMedicationInteractions,
  SelectedBinderMedications,
  SelectedBinderScreen
} from '../../screens';

export const BindersStack = createNativeStackNavigator();


export const TabBindersNavigation = () => {
  return (
    <BindersStack.Navigator screenOptions={{headerShown:false} }>
      <BindersStack.Screen name={'Binders Home'} component={BinderScreen}/>
      <BindersStack.Screen name={'Create Medication'} component={MedicationCreateEditScreen}/>
      <BindersStack.Screen name={'Selected Medication'} component={MedicationSelectedScreen} options={{title:'selected medication'}}/>

      <BindersStack.Screen name={'Selected Binder'} component={SelectedBinderScreen}/>
      <BindersStack.Screen name={'Edit Binder'} component={SelectedBinderEditScreen}/>
      <BindersStack.Screen name={'Binder Medications'} component={SelectedBinderMedications}/>
      <BindersStack.Screen name={'Binder Interactions'} component={SelectedBinderMedicationInteractions}/>
      <BindersStack.Screen name={'Binder Medical History'} component={SelectedBinderMedicalHistoryScreen}/>
    </BindersStack.Navigator>

  );
};


