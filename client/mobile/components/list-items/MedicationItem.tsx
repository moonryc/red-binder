import React, { useMemo, useState } from 'react';

import { Pressable, Text, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import { useCustomTheme } from '../../hooks';

interface props {
  medicationName:string
  onPress?:Function,
}



const MedicationItem:React.FC<props> = ({medicationName,onPress}) => {

  const colors = useCustomTheme();
  const [isPressed, setIsPressed] = useState<boolean>(false);
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
      display:'flex',
      flex:1,
      color:colors.text,
    }
  } as const),[colors.primaryDark, colors.primaryLight, colors.text, isPressed]) ;

  return (
    <Pressable onPressIn={()=>setIsPressed(true)} onPressOut={()=>setIsPressed(false)} onPress={()=> onPress?.()}>
      <View style={styles.container}>
        <Text style={styles.text} numberOfLines={1}>
          {medicationName}
        </Text>
      </View>
    </Pressable>
  );
};

export default MedicationItem;
