import React from 'react';

import { Pressable, Text, View } from 'react-native';
import { useCustomTheme } from '../../hooks';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface props {
  toggleOption:Function
  value:string|number
}

const IosDateOption:React.FC<props> = ({toggleOption,value}) => {


  const colors = useCustomTheme();

  const dateOptionStyles = {
    pressable:{
      flex:1,
      // marginTop: 10,
      // marginBottom: 10,
      // marginRight:30,
      // marginLeft:30,
      paddingLeft:15,
      paddingRight:15,
      paddingTop:20,
      paddingBottom:20,
      borderRadius: 15,
      backgroundColor: colors.primaryDark,
      minWidth:75,
      maxWidth:75,
      alignItems:'center',
      flexDirection:'row',
      justifyContent:'center'
    },
    textOption:{
      color:colors.text,
    }
  }as const;

  return(
    <Pressable style={dateOptionStyles.pressable} onPress={()=>toggleOption()}>
      <Text style={dateOptionStyles.textOption} >{value}</Text>
      <MaterialCommunityIcons name={'menu-down'} color={colors.text} size={26}/>
    </Pressable>
  );

};

export default IosDateOption;
