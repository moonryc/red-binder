import React, { useCallback, useMemo, useState } from 'react';

import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useCustomTheme } from '../../../hooks';
import { IMedication } from '../../../types';

interface props {
  actionType:'refill'|'upcoming'|'missed'|'taken'
  medicationName:string,
  medication?:IMedication
  setOpenModel:Function
  setModalData:Function //TODO: ADD MORE IN THE FUTURE SUCH AS MISSED DOSAGES ETC
}

/**
 * Handles how to return a medication action depending on the actionType
 * @param actionType
 * @param medication
 * @param medicationName
 * @param setOpenModel
 * @param setModalData
 * @constructor
 */
const MedicationActions:React.FC<props> = ({actionType,medication,medicationName,setOpenModel,setModalData}) => {
  const [isPressed, setIsPressed] = useState<boolean>(false);
  const colors = useCustomTheme();
  const styles = useMemo(()=>StyleSheet.create({
    container: {
      display:'flex',
      justifyContent:'center',
      flexDirection: 'row',
      marginTop: 10,
      marginBottom: 10,
      // marginRight:50,
      // marginLeft:10,
      paddingLeft:15,
      paddingRight:15,
      paddingTop:15,
      paddingBottom:15,
      borderRadius: 9999,
      backgroundColor: isPressed ? colors.primaryLight:colors.primaryDark,
      width:'100%'
    },
    text:{
      color:colors.text,
      textAlign:'center',
    }
  }),[colors.primaryDark, colors.primaryLight, colors.text, isPressed]) ;

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

  return(<></>);
};

export default MedicationActions;
