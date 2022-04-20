import { useNavigation } from '@react-navigation/native';



export const useSimpleNavigation = (navigation:any ,destination:string, headerTitle:string,params:object={}) => {

  const navigate = () => {
    navigation.navigate(destination, {...params,headerTitle });
  };

  return {navigate};
};