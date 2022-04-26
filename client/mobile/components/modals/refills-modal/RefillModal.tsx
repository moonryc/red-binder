import React, { useCallback, useEffect, useReducer } from 'react';

import { Modal, Platform, Text, View } from 'react-native';
import { StandardButton } from '../../buttons/StandardButton';
import { IMedication } from '../../../types';
import { useMutation } from '@apollo/client';
import { GET_ALL_BINDERS, UPDATE_REFILL_DATE } from '../../../utils/apis';
import DateTimePicker from '@react-native-community/datetimepicker';
import { apolloErrorHandler } from '../../../utils';
import { addDays, format, formatISO } from 'date-fns';
import { Picker } from '@react-native-picker/picker';
import { useCustomTheme } from '../../../hooks';
import { useCustomStyles } from './useCustomStyles';


interface props {
  isRefillOpen:boolean
  setIsRefillOpen:Function,
  medication?:IMedication,
  setModalData:Function
}



interface IintialState {
  isDatePickerOpen:boolean,
  showConfirmUpdateScreen:boolean,
  newDate:Date,
  pickerSelection:number|'custom',
}

const initialState:IintialState = {
  isDatePickerOpen:false,
  showConfirmUpdateScreen:false,
  newDate:new Date(),
  pickerSelection:1
};

interface Iaction {
  type:'toggleDatePicker'|'toggleShowConfirmUpdateScreen'|'updateNewDate'|'updatePickerSelection',
  value?:any
}

const reducer = (state:IintialState,{type,value}:Iaction) => {
  switch (type) {
  case 'toggleDatePicker':
    const {isDatePickerOpen} = state;
    return {...state, isDatePickerOpen: !isDatePickerOpen};
  case 'toggleShowConfirmUpdateScreen':
    return {...state, showConfirmUpdateScreen: !state.showConfirmUpdateScreen};
  case 'updateNewDate':
    return {...state, newDate: value, isDatePickerOpen: false};
  case 'updatePickerSelection':
    if(value === 'custom'){
      return {...state, isDatePickerOpen: true, pickerSelection:value};
    }
    return {...state, pickerSelection:value, isDatePickerOpen: false,newDate:addDays(new Date(),value)};
  default:
    return state;
  }
};


const refillDaysOptionsAndroid = [1,5,15,30,60,90,'custom'];
const refillDaysOptionsIos = [1,5,15,30,60,90];



const RefillModal:React.FC<props> = ({isRefillOpen,setIsRefillOpen, medication,setModalData}) => {

  const colors = useCustomTheme();
  const styles = useCustomStyles(colors);

  const [updateRefill,{error, loading,reset}] = useMutation(UPDATE_REFILL_DATE,{
    refetchQueries:[GET_ALL_BINDERS]
  });
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isDatePickerOpen, newDate, showConfirmUpdateScreen, pickerSelection} = state;
  const closeModal = useCallback(()=> {
    setIsRefillOpen(false);
    setModalData(undefined);
    reset();
  },[reset, setIsRefillOpen, setModalData]);
  const handleUpdateSubmit = useCallback(async () => {
    try{
      const {data} = await updateRefill({variables:{medicationId:medication?._id, nextRefill: newDate}});
      dispatch({type:'toggleShowConfirmUpdateScreen'});
      closeModal();
    }catch (e) {
      if(error){
        apolloErrorHandler(error);
      }
      console.log(e);
    }
  },[closeModal, error, medication?._id, newDate, updateRefill]);


  useEffect(()=>{
    console.log(newDate, formatISO(newDate));
  });

  const onDateSelect = (_:any,newDate?:Date) => {
    if(newDate){
      dispatch({type:'updateNewDate', value:newDate});
      dispatch({type:'toggleShowConfirmUpdateScreen'});
    }
  };

  const MyDateTimePicker= ()=> (
    <>
      <DateTimePicker
        testID="dateTimePicker"
        value={newDate}
        mode={'date'}
        style={{height:30,flex:1,width:'100%'}}
        is24Hour={true}
        onChange={onDateSelect}
      />
    </>
  );

  const MyPicker = ()=>(
    <>
      <Picker selectedValue={pickerSelection}
        onValueChange={(itemValue) => dispatch({ type: 'updatePickerSelection', value: itemValue })}>
        {refillDaysOptionsAndroid.map((itemValue, index) => (
          <Picker.Item key={index} label={`${itemValue} days`} value={itemValue} />
        ))}
      </Picker>
    </>
  );

  const AndroidPicker = ()=>(
    <>
      {Platform.OS ==='android' &&(<>
        <MyPicker/>
        {isDatePickerOpen && <MyDateTimePicker/>}
      </>)}
    </>
  );

  const IosPicker = ()=>(
    <>
      {Platform.OS === 'ios' &&(<>
        <MyPicker/>
        {isDatePickerOpen &&<View style={{display:'flex',flex:0, flexDirection:'row', width:'100%', alignItems:'center'}}>
          <Text style={{ flex: 1 }}>Custom:</Text>
          <MyDateTimePicker/>
        </View>}
      </>)}
    </>
  );

  const AskToRefill = () => (
    <>
      { medication &&(
        <View style={{flex:0, height:'auto', justifyContent:'center'}}>
          <Text style={styles.modalText}>{`${medication.owner}'s`} {medication.name}</Text>
          <Text style={styles.modalText}>Dosage: {medication.bottle_dosage_amount} {medication.bottle_dosage_measurement}</Text>
          <Text style={styles.modalText}>Remind me to refill</Text>
          <AndroidPicker/>
          <IosPicker/>
          <Text style={styles.modalText}>from now</Text>
          <StandardButton onPress={()=>dispatch({type:'toggleShowConfirmUpdateScreen'})}>Update</StandardButton>
          <StandardButton onPress={closeModal}>Cancel</StandardButton>
        </View>)}
    </>
  );



  const ConfirmScreen = () => (
    <>
      <Text> Next refill for {medication?.name}</Text>
      <Text>{medication?.bottle_dosage_amount} {medication?.bottle_dosage_measurement} will be on</Text>
      <Text> {format(newDate,'dd/mm/yyyy')}</Text>
      <StandardButton onPress={handleUpdateSubmit}>{loading? 'loading..':'Submit'}</StandardButton>
      <StandardButton onPress={()=>dispatch({type:'toggleShowConfirmUpdateScreen'})}>Cancel</StandardButton>
    </>
  );


  return (
    <Modal style={styles.centeredView} animationType={'slide'} transparent={true} visible={isRefillOpen} onRequestClose={closeModal}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {!showConfirmUpdateScreen && <AskToRefill/>}
          {showConfirmUpdateScreen && <ConfirmScreen/>}
        </View>
      </View>
    </Modal>
  );
};



export default React.memo(RefillModal);
