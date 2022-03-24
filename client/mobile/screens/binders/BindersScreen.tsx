import React, { useCallback } from 'react';

import { ScrollView } from 'react-native';
import { BinderItem } from '../../components/list-items/BinderItem';

const binders=['John','George', 'Ringo', 'Paul'];


// eslint-disable-next-line no-unused-vars
export const BinderScreen = ({navigation}:any) => {

  const selectBinder = useCallback(
    () => {
      navigation.navigate('Selected Binder');
    }, [navigation]);


  return (
    <ScrollView>

      {binders.map((person,index)=>{
        return(<BinderItem key={index} binderOwner={person} onPress={selectBinder}/>);
      })}

    </ScrollView>

  );
};


