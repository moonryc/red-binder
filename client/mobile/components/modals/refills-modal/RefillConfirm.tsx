import { IMedication } from '../../../types';
import React from 'react';
import { Text } from 'react-native';
import { format } from 'date-fns';
import { StandardButton } from '../../buttons/StandardButton';

interface IConfirmScreenProps {
  medication: IMedication,
  newDate: Date,
  dispatch: Function,
  handleUpdateSubmit():void,
  loading: boolean
}


const RefillConfirm:React.FC<IConfirmScreenProps> = React.memo(function ConfirmScreen({
  medication,
  newDate,
  dispatch,
  handleUpdateSubmit,
  loading
}){
  return(
    <>
      <Text> Next refill for {medication?.name}</Text>
      <Text>{medication?.bottle_dosage_amount} {medication?.bottle_dosage_measurement} will be on</Text>
      <Text> {format(newDate,'dd/MM/yyyy')}</Text>
      <StandardButton onPress={handleUpdateSubmit}>{loading? 'loading..':'Submit'}</StandardButton>
      <StandardButton onPress={()=>dispatch({type:'toggleShowConfirmUpdateScreen'})}>Cancel</StandardButton>
    </>
  );
});


export default RefillConfirm;