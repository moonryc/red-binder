import React from 'react';

import { TextInput, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';

interface IStandardButton {
  [x:string]:any
  fontSize:'text-xs'|'text-sm'|'text-base'|'text-lg'|'text-xl'|'text-2xl'|'text-3xl'|'text-4xl'|'text-5xl'|'text-6xl'|'text-7xl'|'text-8xl'|'text-9xl'
}


export const StandardInput:React.FC<IStandardButton> = ({fontSize,...props}) => {


  const tailwind = useTailwind();
  const styles = {
    container: { ...tailwind(`flex flex-row my-2 mx-4 px-8 rounded-full bg-sky-500 ${fontSize}`), paddingVertical:10 },
    input:{borderBottomWidth:1, width:'100%'}
  } as const ;


  return (
    <View style={styles.container}>
      <View style={styles.input}>
        <TextInput {...props} />
      </View>
    </View>
  );
};


