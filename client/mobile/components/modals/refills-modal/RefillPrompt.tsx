import { Platform, Text, View } from 'react-native';
import AndroidDatePicker from '../../custom-date-picker/AndroidDatePicker';
import IosDatePicker from '../../custom-date-picker/IosDatePicker';
import { StandardButton } from '../../buttons/StandardButton';
import React from 'react';
import { IMedication } from '../../../types';
import { useCustomTheme } from '../../../hooks';
import { useCustomStyles } from './useCustomStyles';

interface props {
  medication:IMedication,
  isDatePickerOpen:boolean
  toggleDatePicker:Function
  newDate:Date,
  updateDateHandler(date:Date|undefined|null):void
  toggleConfirm():void,
  closeModal():void
}


const RefillPrompt:React.FC<props> = ({medication,isDatePickerOpen,toggleConfirm, toggleDatePicker, updateDateHandler, newDate,closeModal}) => {

  const colors = useCustomTheme();
  const styles = useCustomStyles(colors);
  return(<>
    { medication &&(
      <View style={{flex:0, height:'auto', justifyContent:'center'}}>
        <Text style={styles.modalText}>{`${medication.owner}'s`} {medication.name}</Text>
        <Text style={styles.modalText}>Dosage: {medication.bottle_dosage_amount} {medication.bottle_dosage_measurement}</Text>
        <Text style={styles.modalText}>Remind me to refill</Text>

        {Platform.OS === 'android' && (<AndroidDatePicker
          isDatePickerOpen={isDatePickerOpen}
          toggleDatePicker={toggleDatePicker}
          dateValue={newDate}
          prefix={'Next Refill: '}
          updateDate={updateDateHandler}/>)}
        {Platform.OS === 'ios' && (<IosDatePicker updateDate={updateDateHandler} title={''}/>)}
        <Text style={styles.modalText}>from now</Text>
        {Platform.OS === 'ios' && (<StandardButton onPress={toggleConfirm}>Update</StandardButton>)}
        <StandardButton onPress={closeModal}>Cancel</StandardButton>
      </View>)}
  </>);
};


export default React.memo(RefillPrompt);