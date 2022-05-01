import React, { useMemo } from 'react';

import { TextInput, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import { useCustomTheme } from '../../hooks';

interface IStandardButton {
  [x:string]:any,
  onPress?:Function,
  // onChangeText?(e:any):
  value?:string,
  containerStyle?:Object,
  editable?:boolean
  keyboardType?: 'default'|
  'number-pad'|
  'decimal-pad'|
  'numeric'|
  'email-address'|
  'phone-pad'|
  'url'
}


export const StandardInput:React.FC<IStandardButton> = ({containerStyle, fontSize,onPress,value, editable=true,...props}) => {


  const colors = useCustomTheme();
  const styles = useMemo(()=>({
    container: { display:'flex', flexDirection:'row', marginTop: 10,
      marginBottom: 10,
      marginRight:30,
      marginLeft:30,
      paddingLeft:15,
      paddingRight:15,
      paddingTop:10,
      paddingBottom:10,
      borderRadius: 9999,
      backgroundColor: colors.primaryDark,
    },
    input:{
      color:colors.text,
      paddingLeft:5,
      paddingBottom:5,
      width:'100%'
    }
  } as const),[colors.primaryDark, colors.text]);


  return (
    <View style={[styles.container,containerStyle]}>
      <TextInput editable={editable} selectTextOnFocus={editable} value={value} onPressIn={(e)=>onPress?.(e)} allowFontScaling={true} placeholderTextColor={colors.background} style={styles.input} underlineColorAndroid={styles.input.color} {...props} />
    </View>
  );
};


