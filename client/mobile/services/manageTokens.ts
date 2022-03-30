import * as SecureStore from 'expo-secure-store';

export const saveJWT = async (value: string) => {
  await SecureStore.setItemAsync('jwt', value);
};

export const getJWT = async (): Promise<string | false> => {
  let result = await SecureStore.getItemAsync('jwt');
  if (result) {
    return result;
  } else {
    return false;
  }
};