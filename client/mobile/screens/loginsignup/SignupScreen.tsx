import React, { useState } from 'react';
import { ActivityIndicator, SafeAreaView, Text, View } from 'react-native';
import { StandardInput } from '../../components/inputs/StandardInput';
import { StandardButton } from '../../components/buttons/StandardButton';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LoginStackParamList } from '../../navigation';
import { useSignup } from '../../hooks/api/useSignup';

type signupScreenProp = NativeStackNavigationProp<LoginStackParamList, 'Signup'>;

export const SignupScreen = () => {

  const navigation = useNavigation<signupScreenProp>();
  const {signUpApi,data,loading,error}= useSignup();

  const [signupBody, setSignupBody] = useState({username:'',email:'',password:'',verifyPassword:''});
  const {username,email,password,verifyPassword} = signupBody;

  const onTextChange = (text: string, value: 'username' | 'password'|'verifyPassword'|'email') => {
    setSignupBody(prevState => ({ ...prevState, [value]: text }));
  };

  return (
    <SafeAreaView>
      <View>
        <StandardInput fontSize={'text-lg'} placeholder={'Username'} value={username} onChangeText={(text:string) => onTextChange(text, 'username')}/>
        <StandardInput fontSize={'text-lg'} placeholder={'Email'} value={password}
          onChangeText={(text:string) => onTextChange(text, 'email')} />
        <StandardInput fontSize={'text-lg'} secureTextEntry={true} placeholder={'Password'} value={password}
          onChangeText={(text:string) => onTextChange(text, 'password')} />
        <StandardInput fontSize={'text-lg'} secureTextEntry={true} placeholder={'Verify Password'} value={password}
          onChangeText={(text:string) => onTextChange(text, 'verifyPassword')} />
        <StandardButton disabled={loading} onPress={() => signUpApi({ variables: signupBody })} fontSize={'text-lg'}
          color={'red'}>{loading? <ActivityIndicator animating={loading} size={'large'}/>:'Login'}</StandardButton>
      </View>
    </SafeAreaView>
  );
};


