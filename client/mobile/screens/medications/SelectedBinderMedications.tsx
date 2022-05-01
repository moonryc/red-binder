import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { useApplicationContext } from '../../context/GlobalState';
import { IMedication } from '../../types';
import MedicationItem from '../../components/list-items/MedicationItem';
import CustomScrollableView from '../../components/misc/CustomScrollableView';
import { useCustomTheme, useSimpleNavigation } from '../../hooks';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


export const SelectedBinderMedications = () => {

  const colors = useCustomTheme();
  const {navigate,navigation} = useSimpleNavigation({name:'Medications'});
  const {state:{binders,selectedBinderIndex}}= useApplicationContext();
  const [medicationArray, setMedicationArray] = useState(binders![selectedBinderIndex].medications);

  const onPress = useCallback((medication:IMedication) => {
    const selectedMedication = {...medication,next_refill:medication.next_refill.toString()};
    navigate('CreateMedication', medication.name,{medication:selectedMedication,id:medication._id});
  },[navigate]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ()=>(<MaterialCommunityIcons name={'plus-circle-outline'} color={colors.primaryDark} size={26} onPress={()=>navigate('CreateMedication','New Medication')}/>),
    });
  }, [colors.primaryDark, navigate, navigation,binders,medicationArray]);

  useEffect(() => {
    setMedicationArray(binders![selectedBinderIndex].medications);
  }, [binders, selectedBinderIndex]);

  return (
    <CustomScrollableView>
      {medicationArray.map((medication:IMedication,index)=>(
        <MedicationItem key={medication._id} medicationName={medication.name} onPress={()=>onPress(medication)}/>
      ))}
    </CustomScrollableView>
  );
};


