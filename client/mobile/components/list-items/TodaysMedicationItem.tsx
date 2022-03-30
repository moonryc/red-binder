import React, { useState } from 'react';

import { Pressable, Text, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface ITodaysMedicationItem {
  color:string
  medicationName:string
  onPress?:()=>void,
}

export const TodaysMedicationItem:React.FC<ITodaysMedicationItem> = ({onPress=()=>null,color,medicationName}) => {

  const [isPressed, setIsPressed] = useState<boolean>(false);

  const tailwind = useTailwind();
  const styles = {
    container: tailwind(`flex items-center flex-row my-2 w-80 px-8 py-6 rounded-tr-full rounded-br-full ${isPressed ? 'bg-sky-400' : 'bg-sky-500'}`),
    text: tailwind('flex-1 text-xl ml-4')
  } as const ;


  return (
    <Pressable onPressIn={()=>setIsPressed(true)} onPressOut={()=>setIsPressed(false)} onPress={()=> onPress()}>
      <View style={styles.container}>
        <MaterialCommunityIcons name={'pill'} color={color} size={26} />
        <Text style={styles.text} numberOfLines={1}>
          {medicationName}
        </Text>
      </View>
    </Pressable>
  );
};


