import React, { useLayoutEffect, useState } from 'react';

import { Image, SafeAreaView, ScrollView, View } from 'react-native';
import { StandardButton } from '../../components/buttons/StandardButton';
import { useTailwind } from 'tailwind-rn';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BinderStackParamList } from '../../navigation';

type binderScreenProp = NativeStackNavigationProp<BinderStackParamList, 'SelectedBinder'>;

export const SelectedBinderScreen = () => {

  const navigation = useNavigation<binderScreenProp>();
  //@ts-ignore
  const {params:{_id,image,name}} =useRoute();
  // const {_id, image} = params;
  useLayoutEffect(() => {
    navigation.setOptions({title:name? name:'Null'});
  },[navigation,name]);

  const tailwind = useTailwind();
  const styles = {
    binderContainer: tailwind('flex items-center'),
    binderIcon: {...tailwind('flex rounded-full justify-center'), width:100, height:100 },
  } as const ;

  const goToMedicalHistory =()=> navigation.navigate('BinderMedicalHistory');
  const goToMedications = ()=>navigation.navigate('BinderMedications');
  const goToMedicalInteractions = ()=>navigation.navigate('BinderInteractions');
  const goToEditBinder = ()=>navigation.navigate('EditBinder');

  return (
    <SafeAreaView>
      <ScrollView style={{height:'100%'}}>
        <View style={styles.binderContainer}>
          <Image
            style={styles.binderIcon}
            source={{uri:image.uri}}/>
        </View>
        <StandardButton fontSize={'text-lg'} color={'blue'} onPress={goToMedicalHistory}>
          Medical History
        </StandardButton>
        <StandardButton fontSize={'text-lg'} color={'blue'} onPress={goToMedications}>
        Medications
        </StandardButton>
        <StandardButton fontSize={'text-lg'} color={'blue'} onPress={goToMedicalInteractions}>
        Medical Interactions
        </StandardButton>
        <StandardButton fontSize={'text-lg'} color={'blue'} onPress={goToEditBinder}>
        Edit Binder
        </StandardButton>

      </ScrollView>
    </SafeAreaView>
  );
};


