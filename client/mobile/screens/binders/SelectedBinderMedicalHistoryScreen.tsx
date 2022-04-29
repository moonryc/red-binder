import React from 'react';


import { SafeAreaView, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BinderStackParamList } from '../../navigation';
import { useNavigation } from '@react-navigation/native';
import CustomScrollableView from '../../components/misc/CustomScrollableView';
import { useCustomTheme, useSimpleNavigation } from '../../hooks';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


type binderScreenProp = NativeStackNavigationProp<BinderStackParamList, 'BinderMedicalHistory'>;

export const SelectedBinderMedicalHistoryScreen = () => {

  const colors = useCustomTheme();
  const { navigate,navigation } = useSimpleNavigation({name:'Medical History'}, () => (<MaterialCommunityIcons name={'plus-circle-outline'} color={colors.primaryDark} size={26} onPress={()=>navigate('CreateMedicalHistory')}/>));

  return (
    <CustomScrollableView>

    </CustomScrollableView>
  );
};


