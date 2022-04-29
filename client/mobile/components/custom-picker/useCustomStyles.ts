import { ThemeColors } from '../../types';
import { StyleSheet } from 'react-native';

export const useCustomStyles = (colors:ThemeColors) => {
  return StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      width: '80%',
      height:'50%',
      margin: 20,
      backgroundColor: colors.background,
      borderRadius: 20,
      padding: 35,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    pickerItem:{
      paddingVertical:10,

      borderColor:colors.text,
      borderBottomWidth:1,
    },
    pickerText: {
      fontWeight:'bold',
      fontSize:17,
      textAlign: 'center',
    },
    pickerHeader:{
      borderColor:colors.text,
      borderBottomWidth:1,
      width:'100%',
      paddingBottom:10
    }


  } as const);
};