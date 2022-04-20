import React, { useEffect } from 'react';


import { SafeAreaView, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BinderStackParamList } from '../../navigation';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StandardButton } from '../../components/buttons/StandardButton';
import { StandardInput } from '../../components/inputs/StandardInput';
import { useMutation } from '@apollo/client';
import { DELETE_BINDER, GET_ALL_BINDERS } from '../../utils/apis';
import { apolloErrorHandler } from '../../utils';
import { useApplicationContext } from '../../context/GlobalState';
import CustomScrollableView from '../../components/misc/CustomScrollableView';

type binderScreenProp = NativeStackNavigationProp<BinderStackParamList, 'EditBinder'>;

export const SelectedBinderEditScreen = () => {

  const {state:{binders,selectedBinderIndex}} = useApplicationContext();
  const navigation = useNavigation<binderScreenProp>();
  const [deleteBinder, {error, loading}] = useMutation(DELETE_BINDER,{
    refetchQueries:[GET_ALL_BINDERS]
  });



  const handleDeleteBinder = async () => {
    try{
      if(!binders){
        return;
      }
      const { data } = await deleteBinder({variables:{binderId:binders[selectedBinderIndex]._id}});
      if(!error){
        navigation.navigate('BindersHome');
      }else{
        apolloErrorHandler(error);
      }
    }catch (e) {
      if(error){
        apolloErrorHandler(error);
      }
      console.log(error);
    }
  };


  return (
    <CustomScrollableView>
      <StandardButton fontSize={'text-lg'} color={'black'} onPress={handleDeleteBinder}>Delete Binder</StandardButton>

    </CustomScrollableView>
  );
};


