import * as SecureStore from 'expo-secure-store';

export const saveBinders = async (value: []|[object]) => {
  const binders = JSON.stringify(value);
  await SecureStore.setItemAsync('binders', binders);
};

export const loadBinders = async (): Promise<[object]|[]> => {
  let result = await SecureStore.getItemAsync('binders');
  if (result) {
    return JSON.parse(result);
  } else {
    return [];
  }
};

