import React from 'react';

import { Modal, ScrollView, View,Text } from 'react-native';
import { useCustomTheme } from '../../hooks';
import { useCustomStyles } from './useCustomStyles';
import { StandardButton } from '../buttons/StandardButton';
import CustomScrollableView from '../misc/CustomScrollableView';


interface props {
  [x:string]:any
  isPickerOpen:boolean,
  closeCustomPicker:Function,
  onSelectValue:Function,
  title?:string
}

const CustomPicker:React.FC<props> = ({isPickerOpen,closeCustomPicker,onSelectValue,children,title}) => {

  const colors = useCustomTheme();
  const styles = useCustomStyles(colors);
  const childrenWithProps = React.Children.map(children,child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { onSelectValue });
    }
    return child;
  });

  return (
    <Modal style={styles.centeredView} animationType={'slide'} transparent={true} visible={isPickerOpen} onRequestClose={()=>closeCustomPicker()}>

      <View style={styles.centeredView}>

        <View style={styles.modalView}>
          {title && <Text style={[styles.pickerText]}>{title}</Text>}
          <View style={styles.pickerHeader}/>
          <ScrollView>
            {childrenWithProps}
          </ScrollView>
          <View style={styles.pickerHeader}/>
          <StandardButton onPress={()=>closeCustomPicker()}>Close</StandardButton>
        </View>

      </View>

    </Modal>
  );
};



export default React.memo(CustomPicker);
