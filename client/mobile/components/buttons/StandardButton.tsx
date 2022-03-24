import React, { useState } from 'react';

import { Pressable, Text, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';

interface IStandardButton {
  onPress?:()=>void,
  children:any,
  fontSize:'text-xs'|'text-sm'|'text-base'|'text-lg'|'text-xl'|'text-2xl'|'text-3xl'|'text-4xl'|'text-5xl'|'text-6xl'|'text-7xl'|'text-8xl'|'text-9xl'
  color:string
}


export const StandardButton:React.FC<IStandardButton> = ({children,onPress=()=>null, fontSize}) => {
  const [isPressed, setIsPressed] = useState<boolean>(false);

  const tailwind = useTailwind();
  const styles = {
    container: tailwind(`flex justify-center flex-row my-2 mx-4 px-8 py-6 rounded-full ${isPressed ? 'bg-sky-400' : 'bg-sky-500'}`),
    text: tailwind(`${fontSize} text-center`)
  } as const ;


  return (
    <Pressable onPressIn={()=>setIsPressed(true)} onPressOut={()=>setIsPressed(false)} onPress={()=>onPress()}>
      <View style={styles.container}>
        <Text style={styles.text}>
          {children}
        </Text>
      </View>
    </Pressable>
  );
};


