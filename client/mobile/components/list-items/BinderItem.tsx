import React, { useMemo, useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BinderStackParamList, CalendarStackParamList } from '../../navigation';
import { useApplicationContext } from '../../context/GlobalState';
import { UPDATE_SELECTED_BINDER_INDEX } from '../../context/actions';
import { useCustomTheme, useSimpleNavigation } from '../../hooks';

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
  const [isPressed, setIsPressed] = useState<boolean>(false);
  const colors = useCustomTheme();
  const styles = useMemo(()=>({
    container: {
      display:'flex',
      justifyContent:'flex-start',
      flexDirection: 'row',
      alignItems:'center',
      marginTop: 10,
      marginBottom: 10,
      marginRight:30,
      marginLeft:30,
      paddingLeft:15,
      paddingRight:15,
      paddingTop:20,
      paddingBottom:20,
      borderRadius: 9999,
      backgroundColor: isPressed ? colors.primaryLight:colors.primaryDark
    },
    binderIcon: {width:50, height:50, borderRadius:50/2 },
    text: {
      marginLeft:10,
      color:colors.text,
      textAlign:'center',
    }
  } as const),[colors.primaryDark, colors.primaryLight, colors.text, isPressed]) ;
  const {params} = useRoute();
  const {navigate} = useSimpleNavigation(params);


  const onPress = () => {
    //@ts-ignore
    dispatch({type:UPDATE_SELECTED_BINDER_INDEX,value:binderIndex});
    navigate('SelectedBinder',name,{_id,image});
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


