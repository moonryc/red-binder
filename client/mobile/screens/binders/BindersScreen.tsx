import React, { useEffect, useLayoutEffect } from 'react';
import { Button, SafeAreaView, ScrollView } from 'react-native';
import { BinderItem } from '../../components/list-items';
import { StandardButton } from '../../components/buttons/StandardButton';
import { useNavigation } from '@react-navigation/native';
import { BinderStackParamList } from '../../navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useApplicationContext } from '../../context/GlobalState';
import { useLazyQuery } from '@apollo/client';
import { GET_ALL_BINDERS } from '../../utils/apis';
import { StatusBar } from 'expo-status-bar';
import CustomScrollableView from '../../components/misc/CustomScrollableView';

type binderScreenProp = NativeStackNavigationProp<BinderStackParamList, 'BindersHome'>;


export const BinderScreen = () => {

  const [fetchAllBinders,{error}] = useLazyQuery(GET_ALL_BINDERS);
  const { state:{binders} } = useApplicationContext();
  const navigation = useNavigation<binderScreenProp>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => {
          navigation.navigate('CreateBinder');
        }} title="New Binder" />
      ),
    });
  }, [navigation]);



  return (
    <CustomScrollableView>
      <StandardButton fontSize={'text-lg'} color={'red'} onPress={fetchAllBinders}>update</StandardButton>
      {binders && binders.length >0 && binders.map((binder,binderIndex)=>{
        return(<BinderItem key={binder._id} binderOwner={binder} binderIndex={binderIndex}/>);
      })}
    </CustomScrollableView>
  );
};


