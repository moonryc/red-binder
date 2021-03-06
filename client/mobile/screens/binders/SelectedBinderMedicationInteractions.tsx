import React from 'react';


import { SafeAreaView, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BinderStackParamList } from '../../navigation';
import { useNavigation } from '@react-navigation/native';
import CustomScrollableView from '../../components/misc/CustomScrollableView';

type binderScreenProp = NativeStackNavigationProp<BinderStackParamList, 'BinderInteractions'>;

export const SelectedBinderMedicationInteractions = () => {

  const navigation = useNavigation<binderScreenProp>();

  return (
    <CustomScrollableView>

    </CustomScrollableView>
  );
};


