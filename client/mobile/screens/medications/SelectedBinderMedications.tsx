import React, { useEffect, useLayoutEffect } from 'react';
import { Button, Text,SafeAreaView, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BinderStackParamList } from '../../navigation';
import { useApplicationContext } from '../../context/GlobalState';
import { IMedication } from '../../types';
import MedicationItem from '../../components/list-items/MedicationItem';
import CustomScrollableView from '../../components/misc/CustomScrollableView';
import { useCustomTheme, useSimpleNavigation } from '../../hooks';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type binderScreenProp = NativeStackNavigationProp<BinderStackParamList, 'BinderMedications'>;

export const SelectedBinderMedications = () => {

  const {state:{binders,selectedBinderIndex}}= useApplicationContext();
  // const navigation = useNavigation<binderScreenProp>();


  const colors = useCustomTheme();
  const {params} = useRoute();
  const {navigate} = useSimpleNavigation({name:'Medications'}, ()=>(<MaterialCommunityIcons name={'plus-circle-outline'} color={colors.primaryDark} size={26} onPress={()=>navigate('CreateMedication','New Medication')}/>));

  const hasMedications = binders && binders[selectedBinderIndex] && binders[selectedBinderIndex].medications.length > 0;

  const onPress = (medication:IMedication) => {
    console.log(medication);
    navigate('SelectedMedication', medication.name,{medication});
  };

  return (
    <CustomScrollableView>
      {hasMedications && binders[selectedBinderIndex].medications.map((medication:IMedication,index)=>(
        <MedicationItem key={medication._id} medicationName={medication.name} onPress={()=>onPress(medication)}/>
      ))}
    </CustomScrollableView>
  );
};


