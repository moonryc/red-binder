import React from 'react';

import { Pressable, Text, View } from 'react-native';
import { useCustomTheme } from '../../hooks';
import { useCustomStyles } from './useCustomStyles';
import { StandardButton } from '../buttons/StandardButton';

interface props {
  [x:string]:any
  value: string,
}

const CustomPickerItem: React.FC<props> = ({ value,...props }) => {

  const colors = useCustomTheme();
  const styles = useCustomStyles(colors);
  return (
    <Pressable style={styles.pickerItem} onPress={()=>props?.onSelectValue?.(value)}>
      <Text style={styles.pickerText}>
        {value}
      </Text>
    </Pressable>
  );
};

export default CustomPickerItem;