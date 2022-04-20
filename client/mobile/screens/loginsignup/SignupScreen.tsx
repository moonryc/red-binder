import React, { useEffect, useState } from 'react';
import { ActivityIndicator, SafeAreaView, View,Text } from 'react-native';
import { StandardInput } from '../../components/inputs/StandardInput';
import { StandardButton } from '../../components/buttons/StandardButton';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LoginStackParamList } from '../../navigation';
import { useMutation } from '@apollo/client';
import { CREATE_ACCOUNT } from '../../utils/apis';
import { apolloErrorHandler } from '../../utils';
import AuthServices from '../../utils/AuthServices';
import { useApplicationContext } from '../../context/GlobalState';
import { TOGGLE_LOGIN } from '../../context/actions';

type signupScreenProp = NativeStackNavigationProp<LoginStackParamList,
  'Signup'>;

const useVerifyPassword = (password: string, verifyPassword: string, setFormError: (value: string) => void) => {
  useEffect(() => {
    if (verifyPassword !== password) {
      setFormError('Error passwords do not match');
    } else {
      setFormError('');
    }
  }, [password, verifyPassword]);
};



export const SignupScreen = () => {

  const {dispatch}=useApplicationContext();
  const [signUp,{error,loading}] = useMutation(CREATE_ACCOUNT);

  const navigation = useNavigation<signupScreenProp>();

  const [signupBody, setSignupBody] = useState({
    username: '',
    email: '',
    password: '',
    verifyPassword: ''
  });
  const { username, email, password, verifyPassword } = signupBody;
  const [formError, setFormError] = useState<string>('');

  const onTextChange = (text: string, value: 'username' | 'password' | 'verifyPassword' | 'email') => {
    setSignupBody((prevState) => ({ ...prevState, [value]: text }));
  };

  useVerifyPassword(password,verifyPassword,setFormError);

  const onSubmit = async() => {
    if (formError) {
      return;
    }

    try{
      const { data } = await signUp({ variables: signupBody });
      await AuthServices.saveJwtToken(data.createAccount.token);
      dispatch(TOGGLE_LOGIN);
    }catch (e) {
      if(error){
        console.log('error');
        apolloErrorHandler(error);
      }
      console.log(e);

    }

  };


  return (
    <SafeAreaView>
      <View>
        <StandardInput
          fontSize={'text-lg'}
          placeholder={'Username'}
          value={username}
          onChangeText={(text: string) => onTextChange(text, 'username')}
        />
        <StandardInput
          fontSize={'text-lg'}
          placeholder={'Email'}
          value={email}
          onChangeText={(text: string) => onTextChange(text, 'email')}
        />
        <StandardInput
          fontSize={'text-lg'}
          secureTextEntry={true}
          placeholder={'Password'}
          value={password}
          onChangeText={(text: string) => onTextChange(text, 'password')}
        />
        <StandardInput
          fontSize={'text-lg'}
          secureTextEntry={true}
          placeholder={'Verify Password'}
          value={verifyPassword}
          onChangeText={(text: string) => onTextChange(text, 'verifyPassword')}
        />
        <StandardButton
          disabled={loading}
          onPress={() => onSubmit()}
          fontSize={'text-lg'}
          color={'red'}
        >
          {loading ? (
            <ActivityIndicator animating={loading} size={'large'} />
          ) : (
            'Signup'
          )}
        </StandardButton>
        <Text>{error && ('there was and error')}</Text>
      </View>
    </SafeAreaView>
  );
};


