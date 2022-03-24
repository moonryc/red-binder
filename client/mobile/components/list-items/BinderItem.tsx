import React, { useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';

interface IBinderItem {

  onPress?:()=>void,
  binderOwner:string,
}


export const BinderItem:React.FC<IBinderItem> = ({onPress=()=>null,binderOwner}) => {

  const [isPressed, setIsPressed] = useState<boolean>(false);

  const tailwind = useTailwind();
  const styles = {
    container: tailwind(`flex items-center flex-row my-2 mx-4 px-8 py-6 rounded-full ${isPressed ? 'bg-sky-400' : 'bg-sky-500'}`),
    binderIcon: {...tailwind('rounded-full'), width:50, height:50 },
    text: tailwind('flex-1 text-xl ml-4')
  } as const ;


  return (
    <Pressable onPressIn={()=>setIsPressed(true)} onPressOut={()=>setIsPressed(false)} onPress={()=> onPress()}>
      <View style={styles.container}>
        <Image
          style={styles.binderIcon}
          source={require('../../assets/icon.png')}/>
        <Text style={styles.text} numberOfLines={1}>
          {binderOwner}
        </Text>
      </View>
    </Pressable>
  );
};


