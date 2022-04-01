import React, { useLayoutEffect } from 'react';
import { Button, SafeAreaView, ScrollView } from 'react-native';
import { BinderItem } from '../../components/list-items';
import { useUserDataContext } from '../../context/AllContextProvider';
import { StandardButton } from '../../components/buttons/StandardButton';
import { useGetAllBindersByAccountId } from '../../hooks/api/useGetAllBindersByAccountId';
import { useNavigation } from '@react-navigation/native';
import { BinderStackParamList } from '../../navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type binderScreenProp = NativeStackNavigationProp<BinderStackParamList, 'BindersHome'>;


export const BinderScreen = () => {

  const { binders } = useUserDataContext();
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

  const { getAllBindersApi } = useGetAllBindersByAccountId();

  return (
    <SafeAreaView>
      <ScrollView style={{height:'100%'}}>
        <StandardButton fontSize={'text-lg'} color={'red'} onPress={()=>getAllBindersApi()}>update</StandardButton>
        {binders.map((binder,index)=>{
          return(<BinderItem key={index} binderOwner={binder}/>);
        })}
      </ScrollView>
    </SafeAreaView>
  );
};


