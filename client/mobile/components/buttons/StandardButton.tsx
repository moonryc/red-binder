import React, { useMemo, useState } from 'react';

import { Pressable, Text, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import { useTheme } from '@react-navigation/native';
import { CustomTheme } from '../../types';
import { useCustomTheme } from '../../hooks/useCustomTheme';

interface IStandardButton {
  onPress?:()=>void,
  children:any,
  fontSize:'text-xs'|'text-sm'|'text-base'|'text-lg'|'text-xl'|'text-2xl'|'text-3xl'|'text-4xl'|'text-5xl'|'text-6xl'|'text-7xl'|'text-8xl'|'text-9xl'
  color:string,
  disabled?:boolean
}


export const StandardButton:React.FC<IStandardButton> = ({children,onPress=()=>null, fontSize,disabled=false}) => {
  const [isPressed, setIsPressed] = useState<boolean>(false);

  const colors = useCustomTheme();


  const styles = useMemo(()=>({
    container: {
      display:'flex',
      justifyContent:'center',
      flexDirection: 'row',
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
    text:{
      color:colors.text,
      textAlign:'center',
    }
    //@ts-ignore
  } as const),[colors.primaryDark, colors.primaryLight, colors.text, isPressed]) ;


  return (
    <Pressable disabled={disabled} onPressIn={()=>setIsPressed(true)} onPressOut={()=>setIsPressed(false)} onPress={()=>onPress()}>
      <View style={styles.container}>
        <Text style={styles.text}>
          {children}
        </Text>
      </View>
    </Pressable>
  );
};


