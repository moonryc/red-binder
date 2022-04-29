import React, { useLayoutEffect, useMemo, useState } from 'react';
import fallbackImage from '../../assets/icon.png';
import { Image, SafeAreaView, ScrollView, View } from 'react-native';
import { StandardButton } from '../../components/buttons/StandardButton';
import { useTailwind } from 'tailwind-rn';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BinderStackParamList } from '../../navigation';
import CustomScrollableView from '../../components/misc/CustomScrollableView';
import { useSimpleNavigation } from '../../hooks';

type binderScreenProp = NativeStackNavigationProp<BinderStackParamList, 'SelectedBinder'>;

export const SelectedBinderScreen = () => {


  const {params} =useRoute();
  //@ts-ignore
  const { image,_id} = params;
  const { navigate } = useSimpleNavigation(params);

  const tailwind = useTailwind();
  const styles = useMemo(()=>({
    binderContainer: tailwind('flex items-center'),
    binderIcon: {...tailwind('flex rounded-full justify-center'), width:100, height:100 },
  } as const),[tailwind] );

  const goToMedicalHistory =()=> navigate('BinderMedicalHistory');
  const goToMedications = ()=>navigate('BinderMedications');
  const goToMedicalInteractions = ()=>navigate('BinderInteractions');
  const goToEditBinder = ()=>navigate('EditBinder');

  return (
    <CustomScrollableView>
      <View style={styles.binderContainer}>
        <Image
          style={styles.binderIcon}
          source={{uri:image ?`data:image/png;base64,${image}`:fallbackImage}}/>
      </View>
      <StandardButton onPress={goToMedicalHistory}>
          Medical History
      </StandardButton>
      <StandardButton onPress={goToMedications}>
        Medications
      </StandardButton>
      <StandardButton onPress={goToMedicalInteractions}>
        Medical Interactions
      </StandardButton>
      <StandardButton onPress={goToEditBinder}>
        Edit Binder
      </StandardButton>

    </CustomScrollableView>
  );
};


