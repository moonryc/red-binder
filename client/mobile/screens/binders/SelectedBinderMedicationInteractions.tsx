import React from 'react';


import { SafeAreaView, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BinderStackParamList } from '../../navigation';
import { useNavigation } from '@react-navigation/native';

type binderScreenProp = NativeStackNavigationProp<BinderStackParamList, 'BinderInteractions'>;

export const SelectedBinderMedicationInteractions = () => {

  const navigation = useNavigation<binderScreenProp>();

  return (
    <SafeAreaView>
      <ScrollView style={{height:'100%'}}>

      </ScrollView>
    </SafeAreaView>
  );
};


