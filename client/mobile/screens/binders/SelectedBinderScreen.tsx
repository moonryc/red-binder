import React, { useCallback } from 'react';

import { Image, SafeAreaView, ScrollView, View } from 'react-native';
import { StandardButton } from '../../components/buttons/StandardButton';
import { useTailwind } from 'tailwind-rn';

export const SelectedBinderScreen = ({navigation}:any) => {


  const tailwind = useTailwind();
  const styles = {
    binderContainer: tailwind('flex items-center'),
    binderIcon: {...tailwind('flex rounded-full justify-center'), width:100, height:100 },
  } as const ;

  const goToMedicalHistory = useCallback(
    () => {
      navigation.navigate('Binder Medical History');
    }, [navigation]);

  const goToMedications = useCallback(
    () => {
      navigation.navigate('Binder Medications');
    }, [navigation]);

  const goToMedicalInteractions = useCallback(
    () => {
      navigation.navigate('Binder Interactions');
    }, [navigation]);

  const goToEditBinder = useCallback(
    () => {
      navigation.navigate('Edit Binder');
    }, [navigation]);


  return (
    <SafeAreaView>
      <ScrollView style={{height:'100%'}}>
        <View style={styles.binderContainer}>
          <Image
            style={styles.binderIcon}
            source={require('../../assets/icon.png')}/>
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


