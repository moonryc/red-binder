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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useCustomTheme } from '../../hooks';

type binderScreenProp = NativeStackNavigationProp<BinderStackParamList, 'BindersHome'>;


export const BinderScreen = () => {

  const colors = useCustomTheme();
  const [fetchAllBinders,{error}] = useLazyQuery(GET_ALL_BINDERS);
  const { state:{binders}} = useApplicationContext();
  const navigation = useNavigation<binderScreenProp>();


  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <MaterialCommunityIcons name={'plus-circle-outline'} color={colors.primaryDark} size={26} onPress={()=>navigation.navigate('CreateBinder')}/>
      ),
    });
  }, [colors.primaryDark, navigation]);



  return (
    <CustomScrollableView>
      <StandardButton onPress={fetchAllBinders}>update</StandardButton>
      {binders && binders.length >0 && binders.map((binder,binderIndex)=>{
        return(<BinderItem key={binder._id} binderOwner={binder} binderIndex={binderIndex}/>);
      })}
    </CustomScrollableView>
  );
};


