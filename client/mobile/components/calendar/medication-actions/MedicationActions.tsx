import React, { useCallback, useMemo, useState } from 'react';

import { Pressable, Text, View } from 'react-native';
import { useCustomTheme } from '../../../hooks';
import { IMedication } from '../../../types';

interface props {
  actionType:'refill'|'upcoming'|'missed'|'taken'
  medicationName:string,
  medication?:IMedication
  setOpenModel:Function
  setModalData:Function //TODO: ADD MORE IN THE FUTURE SUCH AS MISSED DOSAGES ETC
}


const MedicationActions:React.FC<props> = ({actionType,medication,medicationName,setOpenModel,setModalData}) => {
  const [isPressed, setIsPressed] = useState<boolean>(false);
  const colors = useCustomTheme();
  const styles = useMemo(()=>({
    container: {
      display:'flex',
      justifyContent:'center',
      flexDirection: 'row',
      marginTop: 10,
      marginBottom: 10,
      // marginRight:30,
      // marginLeft:30,
      paddingLeft:15,
      paddingRight:15,
      paddingTop:20,
      paddingBottom:20,
      borderRadius: 9999,
      backgroundColor: isPressed ? colors.primaryLight:colors.primaryDark,
      width:'100%'
    },
    text:{
      color:colors.text,
      textAlign:'center',
    }
    //@ts-ignore
  } as const),[colors.primaryDark, colors.primaryLight, colors.text, isPressed]) ;

  const handleOpenRefillModel = useCallback(() => {
    setModalData(medication);
    setOpenModel(true);
  },[medication, setModalData, setOpenModel]);

  if(actionType === 'refill'){
    return (
      <Pressable onPressIn={()=>setIsPressed(true)} onPressOut={()=>setIsPressed(false)} onPress={handleOpenRefillModel}>
        <View style={styles.container}>
          <Text style={styles.text}>
            {medicationName}
          </Text>
        </View>
      </Pressable>
    );
  }

  if(actionType === 'upcoming'){
    return (
      <Pressable onPressIn={()=>setIsPressed(true)} onPressOut={()=>setIsPressed(false)} onPress={handleOpenRefillModel}>
        <View style={styles.container}>
          <Text style={styles.text}>
            {medicationName}
          </Text>
        </View>
      </Pressable>
    );
  }

  if(actionType === 'missed'){
    return (
      <Pressable onPressIn={()=>setIsPressed(true)} onPressOut={()=>setIsPressed(false)} onPress={handleOpenRefillModel}>
        <View style={styles.container}>
          <Text style={styles.text}>
            {medicationName}
          </Text>
        </View>
      </Pressable>
    );
  }

  if(actionType === 'taken'){
    return (
      <Pressable onPressIn={()=>setIsPressed(true)} onPressOut={()=>setIsPressed(false)} onPress={handleOpenRefillModel}>
        <View style={styles.container}>
          <Text style={styles.text}>
            {medicationName}
          </Text>
        </View>
      </Pressable>
    );
  }

};

export default MedicationActions;
