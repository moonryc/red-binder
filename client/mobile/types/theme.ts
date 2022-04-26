import { Theme } from '@react-navigation/native';





export interface ThemeColors {
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

  paper:string,
  paperShadow:string
  calendarText:string,

  refill:string
  refillPressed:string
}

export type CustomTheme = {
  colors: ThemeColors
} & Theme