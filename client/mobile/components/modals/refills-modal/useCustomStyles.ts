import { Platform, StyleSheet } from 'react-native';
import { useMemo } from 'react';
import { ThemeColors } from '../../../types';

export const useCustomStyles = (colors:ThemeColors) => {

  return StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      width: '85%',

      margin: 20,
      backgroundColor: colors.background,
      borderRadius: 20,
      padding: Platform.OS === 'android' ? 35 : 0,
      paddingVertical:35,
      // alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },


  } as const);

};