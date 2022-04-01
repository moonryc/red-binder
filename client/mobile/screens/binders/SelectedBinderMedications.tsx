import React, { useLayoutEffect } from 'react';
import { Button, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BinderStackParamList } from '../../navigation';

type binderScreenProp = NativeStackNavigationProp<BinderStackParamList, 'SelectedMedication'>;

export const SelectedBinderMedications = () => {

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
    <SafeAreaView>
      <ScrollView style={{height:'100%'}}>

      </ScrollView>
    </SafeAreaView>
  );
};


