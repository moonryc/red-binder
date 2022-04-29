import { useNavigation, useRoute } from '@react-navigation/native';
import { useLayoutEffect } from 'react';

type typeDestination = 'BindersHome'
  | 'CreateMedication'
  | 'SelectedMedication'
  | 'CreateBinder'
  | 'SelectedBinder'
  | 'EditBinder'
  | 'BinderMedications'
  | 'BinderInteractions'
  | 'BinderMedicalHistory'
  | 'CalendarHome'
  | 'SettingsHome'
| 'CreateMedicalHistory'

interface IParams{
  name?:string|null,
  headerRight?:Function,
}

export const useSimpleNavigation = ({ name }:IParams={name:null}, headerRight?:Function) => {

  const navigation = useNavigation();
  useLayoutEffect(() => {
    if (name) {
      navigation.setOptions({ title: name ? name : 'Null'});
    }
    navigation.setOptions({headerRight:()=>headerRight?.()});
  }, [navigation, name, headerRight]);
  const navigate = (destination:typeDestination, headerTitle:string|undefined=undefined,params:object={}) => {
    if(headerTitle){
      //@ts-ignore
      return navigation.navigate(destination, {...params,name:headerTitle });
    }
    //@ts-ignore
    navigation.navigate(destination, {...params});
  };
  return {navigation,navigate};
};




