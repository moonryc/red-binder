import React, { useState } from 'react';

import { ActivityIndicator, SafeAreaView, Text, View } from 'react-native';
import { StandardButton } from '../../components/buttons/StandardButton';

import { useNavigation } from '@react-navigation/native';
import { StandardInput } from '../../components/inputs/StandardInput';
import { DEV_PASSWORD, DEV_USERNAME, NODE_ENV } from '@env';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LoginStackParamList } from '../../navigation';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../../utils/apis';
import { apolloErrorHandler } from '../../utils';
import AuthServices from '../../utils/AuthServices';
import { useApplicationContext } from '../../context/GlobalState';
import { TOGGLE_LOGIN } from '../../context/actions';

type loginScreenProp = NativeStackNavigationProp<LoginStackParamList, 'Login'>;

export const LoginScreen = () => {

  const {dispatch} = useApplicationContext();

  const navigation = useNavigation<loginScreenProp>();
  const [ loginApi, { loading, error } ] = useMutation(LOGIN);
  const [loginBody, setLoginBody] = useState({ username: process.env.REACT_APP_NODE_ENV ?process.env.REACT_APP_DEV_USERNAME:'', password: process.env.REACT_APP_NODE_ENV?process.env.REACT_APP_DEV_PASSWORD:'' });
  const { username, password } = loginBody;

  const onTextChange = (text: string, value: 'username' | 'password') => {
    setLoginBody({ ...loginBody, [value]: text });
  };

  const signUp = () => {
    navigation.navigate('Signup');
  };

  const onSubmit = async () => {
    try{
      const {data} = await loginApi({ variables: loginBody });
      console.log(data);
      await AuthServices.saveJwtToken(data.login.token);
      dispatch({ type:TOGGLE_LOGIN });
    }catch (e) {
      console.log(e);
      if(error){
        apolloErrorHandler(error);
      }
    }
  };

  return (
    <SafeAreaView>
      <View>
        <StandardInput fontSize={'text-lg'} placeholder={'Username'} value={username} onChangeText={(text:string) => onTextChange(text, 'username')}/>
        <StandardInput fontSize={'text-lg'} secureTextEntry={true} placeholder={'Password'} value={password}
          onChangeText={(text:string) => onTextChange(text, 'password')} />
        <StandardButton disabled={loading} onPress={onSubmit} fontSize={'text-lg'}
          color={'red'}>{loading? <ActivityIndicator animating={loading} size={'large'}/>:'Login'}</StandardButton>
        <StandardButton onPress={() => signUp()} fontSize={'text-lg'} color={'red'}>Signup</StandardButton>
        <Text>{error ? `error : ${error}` : ''}</Text>
      </View>
    </SafeAreaView>
  );
};


