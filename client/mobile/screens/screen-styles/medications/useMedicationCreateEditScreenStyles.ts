import { ThemeColors } from '../../../types';
import { StyleSheet } from 'react-native';

export const useMedicationCreateEditScreenStyles = (colors:ThemeColors) => {
  return StyleSheet.create({
    dosageMeasurementContainer: {
      // marginBottom: 10,
      marginRight:30,
      marginLeft:30,
      paddingLeft:15,
      paddingRight:15,
      // paddingTop:10,
      paddingBottom:10,
      borderRadius: 9999,
      backgroundColor: colors.primaryDark
    },
    containerUnderline:{
      display:'flex', flexDirection:'row', marginTop: 10,
      borderBottomWidth:1,
      justifyContent:'space-between',
      alignItems:'center',
      marginHorizontal:5,
      borderColor:colors.text,
    },
    input:{
      flex:6,
      color:colors.text,
      // paddingLeft:5,
      paddingBottom:5,
      width:'70%',
    },
    dosageMeasurement: {
      color:colors.text,
      // display:'flex',
      // width:'auto',
      // flex:0,
      // justifyContent:'center',
      // flexDirection:'row',
      // width: 'auto'
      // height:10
    },
    notes:{

    },
    pressable:{
      display:'flex',
      flexDirection:'row',
      alignItems:'center',
      paddingBottom:5
    }
  } as const);
};