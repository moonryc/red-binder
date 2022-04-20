import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView,Text } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BinderStackParamList } from '../../navigation';
import { useNavigation, useRoute } from '@react-navigation/native';
import { IMedication } from '../../types';
import { useApplicationContext } from '../../context/GlobalState';
import CustomScrollableView from '../../components/misc/CustomScrollableView';

type selectedMedicationScreenProp = NativeStackNavigationProp<BinderStackParamList, 'SelectedMedication'>;



export const MedicationSelectedScreen = () => {


  const navigation = useNavigation<selectedMedicationScreenProp>();

  //@ts-ignore
  const {params:{medication}}:IMedication =useRoute();
  useEffect(()=>{
    console.log(medication);
  },[]);

  return (
    <CustomScrollableView>
      <Text>{medication.name}</Text>
      <Text>{medication.bottle_dosage_amount} {medication.bottle_dosage_measurement}</Text>
      <Text>Next refill: {new Date(parseInt(medication.next_refill)).toDateString()}</Text>
      <Text>Notes: {medication.notes}</Text>
    </CustomScrollableView>
  );
};


