import React, { useState } from 'react';

import { SafeAreaView, TextInput, View } from 'react-native';
import { StandardButton } from '../../components/buttons/StandardButton';
import { useMainStoreContext } from '../../context/AllContextProvider';

export const LoginScreen = ({navigation}) => {

  const { loginApi} =useMainStoreContext();

  const [loginBody, setLoginBody] = useState({username:'tittiestitties',password:'TittiesTitties1!'});
  const {username,password} = loginBody;

  const onTextChange = (text:string, value:'username'|'password') => {
    setLoginBody({...loginBody, [value]:text});
  };

  const signUp = () => {
    navigation.navigate('Signup');
  };

  return (
    <SafeAreaView>
      <View>
        <TextInput placeholder={'Username'} value={username} onChangeText={(text)=>onTextChange(text,'username')}/>
        <TextInput secureTextEntry={true} placeholder={'Password'} value={password} onChangeText={(text)=>onTextChange(text,'password')}/>
        <StandardButton onPress={()=>loginApi({variables:loginBody})} fontSize={'text-lg'} color={'red'}>Login</StandardButton>
        <StandardButton onPress={()=>signUp()} fontSize={'text-lg'} color={'red'}>Signup</StandardButton>
      </View>
    </SafeAreaView>
  );
};


