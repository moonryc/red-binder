import { useTheme } from '@react-navigation/native';
import { CustomTheme } from '../types';

export const useCustomTheme = () => {
  const {colors} =useTheme() as CustomTheme;
  return colors;
};