import React, { useCallback, useLayoutEffect } from 'react';
import { Button, SafeAreaView, ScrollView } from 'react-native';
import { BinderItem } from '../../components/list-items';
import { useUserDataContext } from '../../context/AllContextProvider';

// const binders=['John','George', 'Ringo', 'Paul'];


// eslint-disable-next-line no-unused-vars
export const BinderScreen = ({navigation}:any) => {

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => {
          navigation.navigate('Create Binder');
        }} title="New Binder" />
      ),
    });
  }, [navigation]);


  const { binders } = useUserDataContext();

  const selectBinder = useCallback(
    () => {
      navigation.navigate('Selected Binder');
    }, [navigation]);






  return (
    <SafeAreaView>
      <ScrollView style={{height:'100%'}}>
        {binders.map((binder,index)=>{
          return(<BinderItem key={index} binderOwner={binder.name} onPress={selectBinder}/>);
        })}
      </ScrollView>
    </SafeAreaView>
  );
};


