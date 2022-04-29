import React from 'react';

import { Platform, Pressable, Text, View } from 'react-native';
import { StandardInput } from '../inputs/StandardInput';
import { format } from 'date-fns';
import DateTimePicker from '@react-native-community/datetimepicker';

interface props {
  isDatePickerOpen:boolean,
  dateValue:Date,
  toggleDatePicker:Function,
  updateDate(_:any,newDate:Date|undefined):void
}

const AndroidDatePicker:React.FC<props> = ({isDatePickerOpen,dateValue,toggleDatePicker,updateDate}) => {
  return (
    <>
      {Platform.OS === 'android' && <View>
        <Pressable onPressIn={()=>toggleDatePicker()}>
          <StandardInput editable={false} selectTextOnFocus={false} value={`Birthday: ${format(dateValue,'dd/MM/yyyy')} `}/>
        </Pressable>
      </View>
      }
      {Platform.OS === 'android' && isDatePickerOpen && <DateTimePicker
        testID="dateTimePicker"
        value={dateValue}
        mode={'date'}
        onChange={updateDate}
      />}
    </>
  );
};

export default React.memo(AndroidDatePicker);
