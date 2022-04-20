import React, { useEffect, useLayoutEffect } from 'react';
import { Button, Text,SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BinderStackParamList } from '../../navigation';
import { useApplicationContext } from '../../context/GlobalState';
import { IMedication } from '../../types';
import MedicationItem from '../../components/list-items/MedicationItem';
import CustomScrollableView from '../../components/misc/CustomScrollableView';

type binderScreenProp = NativeStackNavigationProp<BinderStackParamList, 'BinderMedications'>;

export const SelectedBinderMedications = () => {

  const {state:{binders,selectedBinderIndex}}= useApplicationContext();
  const navigation = useNavigation<binderScreenProp>();




  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => {
          navigation.navigate('CreateMedication');
        }} title="New Medication" />
      ),
    });
  }, [navigation]);


  return (
    <CustomScrollableView>
      {binders && binders[selectedBinderIndex] && binders[selectedBinderIndex].medications.length>0 && binders[selectedBinderIndex].medications.map((medication:IMedication,index)=>(
        <MedicationItem key={medication._id} medication={medication}/>
      ))}
    </CustomScrollableView>
  );
};


