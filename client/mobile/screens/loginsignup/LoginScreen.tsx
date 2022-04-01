import React, { useState } from 'react';

import { ActivityIndicator, SafeAreaView, Text, View } from 'react-native';
import { StandardButton } from '../../components/buttons/StandardButton';
import { useLoginApi } from '../../hooks/api/useLoginApi';
import { useNavigation } from '@react-navigation/native';
import { StandardInput } from '../../components/inputs/StandardInput';
import { DEV_PASSWORD, DEV_USERNAME, NODE_ENV } from '@env';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LoginStackParamList } from '../../navigation';

type loginScreenProp = NativeStackNavigationProp<LoginStackParamList, 'Login'>;

export const LoginScreen = () => {

  const navigation = useNavigation<loginScreenProp>();
  const { loginApi,loading,error } = useLoginApi();
  const [loginBody, setLoginBody] = useState({ username: NODE_ENV ?DEV_USERNAME:'', password: NODE_ENV?DEV_PASSWORD:'' });
  const { username, password } = loginBody;

  const onTextChange = (text: string, value: 'username' | 'password') => {
    setLoginBody({ ...loginBody, [value]: text });
  };

  const signUp = () => {
    navigation.navigate('Signup');
  };

  return (
    <SafeAreaView>
      <View>
        <StandardInput fontSize={'text-lg'} placeholder={'Username'} value={username} onChangeText={(text:string) => onTextChange(text, 'username')}/>
        <StandardInput fontSize={'text-lg'} secureTextEntry={true} placeholder={'Password'} value={password}
          onChangeText={(text:string) => onTextChange(text, 'password')} />
        <StandardButton disabled={loading} onPress={() => loginApi({ variables: loginBody })} fontSize={'text-lg'}
          color={'red'}>{loading? <ActivityIndicator animating={loading} size={'large'}/>:'Login'}</StandardButton>
        <StandardButton onPress={() => signUp()} fontSize={'text-lg'} color={'red'}>Signup</StandardButton>
        <Text>{error ? `error : ${error}` : ''}</Text>
      </View>
    </SafeAreaView>
  );
};


