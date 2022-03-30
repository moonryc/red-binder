import React, { useState } from 'react';

import { SafeAreaView, ScrollView, TextInput,Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useMutation } from '@apollo/client';
import { CREATE_BINDER } from '../../services';
import { StandardButton } from '../../components/buttons/StandardButton';

const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];


export const CreateBinderScreen = ({ navigation }) => {

  const [binderBody, setBinderBody] = useState({ name: '', color: colors[0] });

  const [submitBinderApi, { error, loading, data }] = useMutation(CREATE_BINDER);

  const submitBinder = async () => {
    await submitBinderApi({ variables: binderBody });
    if (error) {
      return;
    }
    navigation.navigate('Binders');
  };

  return (
    <SafeAreaView>
      <ScrollView style={{ height: '100%' }}>
        <TextInput placeholder={'Person\'s Name'}
          onChangeText={(text) => setBinderBody({ ...binderBody, name: text })} />
        <Picker selectedValue={binderBody.color}
          onValueChange={((itemValue) => setBinderBody({ ...binderBody, color: itemValue }))}>
          {colors.map((color, index) => {
            return <Picker.Item key={index} label={color} value={color} />;
          })}
        </Picker>
        <Text>{error ? 'An error occurred please Try Again' : ''}</Text>
        <StandardButton fontSize={'text-lg'} color={'red'} onPress={() => submitBinder()}>Create Binder</StandardButton>
      </ScrollView>
    </SafeAreaView>
  );
};


