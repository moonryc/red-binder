import React, { useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BinderStackParamList, CalendarStackParamList } from '../../navigation';
import { useApplicationContext } from '../../context/GlobalState';
import { UPDATE_SELECTED_BINDER_INDEX } from '../../context/actions';

interface IBinderItem {
  binderOwner:{
    image:string,
    name:string,
    color:string,
    _id:string
  },
  binderIndex:number
}

type binderScreenProp = NativeStackNavigationProp<BinderStackParamList, 'SelectedBinder'>;

export const BinderItem:React.FC<IBinderItem> = ({binderOwner:{image,name,color,_id},binderIndex}) => {
  const {dispatch} = useApplicationContext();
  const navigation = useNavigation<binderScreenProp>();
  const [isPressed, setIsPressed] = useState<boolean>(false);
  const tailwind = useTailwind();
  const styles = {
    container: tailwind(`flex items-center flex-row my-2 mx-4 px-8 py-6 rounded-full ${isPressed ? 'bg-sky-400' : 'bg-sky-500'}`),
    binderIcon: {...tailwind('rounded-full'), width:50, height:50 },
    text: tailwind('flex-1 text-xl ml-4')
  } as const ;



  const onPress = () => {
    dispatch({type:UPDATE_SELECTED_BINDER_INDEX,value:binderIndex});
    navigation.navigate('SelectedBinder', {_id, image,name});
  };

  return (
    <Pressable onPressIn={()=>setIsPressed(true)} onPressOut={()=>setIsPressed(false)} onPress={()=> onPress()}>
      <View style={styles.container}>
        <Image
          style={styles.binderIcon}
          source={{uri:image.uri}}/>
        <Text style={styles.text} numberOfLines={1}>
          {name}
        </Text>
      </View>
    </Pressable>
  );
};


