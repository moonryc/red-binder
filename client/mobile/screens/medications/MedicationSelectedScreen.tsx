import React from 'react';
import { Text } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { IMedication } from '../../types';
import CustomScrollableView from '../../components/misc/CustomScrollableView';
import { format } from 'date-fns';
import { useSimpleNavigation } from '../../hooks';


export const MedicationSelectedScreen = () => {

  const {params} =useRoute();
  useSimpleNavigation(params);
  //@ts-ignore
  const {name, bottle_dosage_amount, bottle_dosage_measurement, next_refill, notes}:IMedication = params.medication;

  return (
    <CustomScrollableView>
      <Text>{name}</Text>
      <Text>{bottle_dosage_amount} {bottle_dosage_measurement}</Text>
      <Text>Next refill: {format(new Date(next_refill),'dd/MM/yyyy')}</Text>
      <Text>Notes: {notes}</Text>
    </CustomScrollableView>
  );
};


