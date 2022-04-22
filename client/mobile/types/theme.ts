import { Theme } from '@react-navigation/native';

export type CustomTheme = {
  colors: {
    primary: string,
    primaryLight: string,
    primaryDark: string,
    primaryBar:string,
    text: string,


    secondary: string,
    secondaryLight: string,
    secondaryDark: string,



    background: string,
    card: string,
    border: string,
    notification: string,


    refill:string
    refillPressed:string
  }
} & Theme
