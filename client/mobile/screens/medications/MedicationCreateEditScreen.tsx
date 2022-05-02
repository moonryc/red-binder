import React, { useCallback, useReducer } from 'react';
import { NativeSyntheticEvent, NativeTouchEvent, Platform, Pressable, Text, TextInput, View } from 'react-native';
import { StandardInput } from '../../components/inputs/StandardInput';
import { StandardButton } from '../../components/buttons/StandardButton';
import { useRoute } from '@react-navigation/native';
import { IMedication } from '../../types';
import { useMutation } from '@apollo/client';
import { CREATE_MEDICATION, DELETE_MEDICATION, GET_ALL_BINDERS, UPDATE_MEDICATION } from '../../utils/apis';
import { apolloErrorHandler } from '../../utils';
import { useApplicationContext } from '../../context/GlobalState';
import CustomScrollableView from '../../components/misc/CustomScrollableView';
import { useCustomTheme, useSimpleNavigation } from '../../hooks';
import { useMedicationCreateEditScreenStyles } from '../screen-styles/medications/useMedicationCreateEditScreenStyles';
import CustomPicker from '../../components/custom-picker/CustomPicker';
import CustomPickerItem from '../../components/custom-picker/CustomPickerItem';
import AndroidDatePicker from '../../components/custom-date-picker/AndroidDatePicker';
import IosDatePicker from '../../components/custom-date-picker/IosDatePicker';


const dosageTypes = ['mg', 'tablet', 'drops', 'grams', 'milliLiter', 'Liter'];

interface IinitialState extends IMedication {
  isPickerOpen:boolean,
  isDatePickerOpen:boolean
}


interface reducerAction {
  type:'name'| 'bottleDosageAmount'|
'bottleDosageMeasurement'|
'nextRefill'|
'notes'|
'togglePicker'| 'toggleDatePicker',
  value?: string|Date
}



const reducer = (state: IinitialState, {type,value}: reducerAction): IinitialState => {
  switch (type) {
  case 'name':
    return { ...state, name: value as string };
  case 'bottleDosageAmount':
    return { ...state, bottle_dosage_amount: value as string };
  case 'bottleDosageMeasurement':
    return { ...state, bottle_dosage_measurement: value as string, isPickerOpen:false };
  case 'nextRefill':
    return { ...state, next_refill: value as Date };
  case 'notes':
    return { ...state, notes: value as string };
  case 'togglePicker':
    return { ...state, isPickerOpen: !state.isPickerOpen };
  case 'toggleDatePicker':
    return { ...state, isDatePickerOpen: !state.isDatePickerOpen };
  default:
    throw state;
  }
};


export const MedicationCreateEditScreen = () => {

  const {state:{binders,selectedBinderIndex}} = useApplicationContext();
  const colors = useCustomTheme();
  const styles = useMedicationCreateEditScreenStyles(colors);
  const {params}:any = useRoute();
  let initialState: IinitialState = {
    name: '',
    bottle_dosage_amount: '',
    bottle_dosage_measurement: dosageTypes[0],
    next_refill: new Date(),
    notes: '',
    isPickerOpen:false,
    isDatePickerOpen:false
  };
  let edit = false;

  if(params?.medication){
    initialState = {
      ...initialState,
      ...params.medication,
      bottle_dosage_amount: JSON.stringify(params.medication.bottle_dosage_amount),
      next_refill: new Date(params.medication.next_refill),
      medicationId:params.id};
    edit = true;
  }

  const {navigate}= useSimpleNavigation(params);

  const [ createMedicationApi, {loading:createLoading, error:createError }] = useMutation(CREATE_MEDICATION,{
    refetchQueries:[GET_ALL_BINDERS]
  });
  const [updateMedication,{error:updateError,loading:updateLoading}] = useMutation(UPDATE_MEDICATION,{
    refetchQueries:[GET_ALL_BINDERS]
  });
  const [deleteMedication,{error:deleteError,loading:deleteLoading}] = useMutation(DELETE_MEDICATION,{
    refetchQueries:[GET_ALL_BINDERS]
  });

  const [state, dispatch] = useReducer(reducer, initialState);
  const { name, bottle_dosage_amount, bottle_dosage_measurement, next_refill, notes,isPickerOpen,isDatePickerOpen } = state;

  const handleCreateMedication = useCallback(async () => {
    try{
      if(!binders){
        return;
      }
      const binderId = binders[selectedBinderIndex]._id;
      const {data}= await createMedicationApi({
        variables: {
          ...state,
          bottle_dosage_amount: parseFloat(bottle_dosage_amount as string),
          binderId
        }
      });
      navigate('BinderMedications','Medications');
    }catch (e) {
      if(createError){
        console.log('error');
        apolloErrorHandler(createError);
      }
      console.log(e);
    }
  }, [binders, bottle_dosage_amount, createError, createMedicationApi, navigate, selectedBinderIndex, state]);
  const handleUpdateMedication = useCallback(async () => {
    try{
      const {data}= await updateMedication({
        variables: {
          ...state,
          bottle_dosage_amount: parseFloat(state.bottle_dosage_amount as string),
          medicationId: params.id
        }
      });
      navigate('BinderMedications','Medications');
    }catch (e) {
      if(updateError){
        console.log('error');
        apolloErrorHandler(updateError);
      }
      console.log(e);
    }
  }, [updateError, navigate, params.id, state, updateMedication]);
  const handleDeleteMedication = useCallback(async () => {
    try{
      const {data}= await deleteMedication({
        variables: {
          medicationId: params.id
        }
      });
      navigate('BinderMedications','Medications');
    }catch (e) {
      if(deleteError){
        console.log('error');
        apolloErrorHandler(deleteError);
      }
      console.log(e);
    }
  }, [deleteMedication, params.id, navigate, deleteError]);

  const dateUpdate = useCallback((selectedDate:Date|undefined|null):void => {
    if(Platform.OS==='android'){
      dispatch({type:'toggleDatePicker'});
    }
    if(selectedDate){
      dispatch({ type: 'nextRefill', value: selectedDate });
    }
  },[]);
  const showDatePicker = useCallback((event: NativeSyntheticEvent<NativeTouchEvent>) => {
    dispatch({type:'toggleDatePicker'});
  },[]);
  const handleTogglePicker = useCallback(
    () => {
      dispatch({type:'togglePicker'});
    },[]
  );
  const handlePickerChange = useCallback((value:string) => {
    dispatch({type:'bottleDosageMeasurement',value});
  }, []);


  return (
    <CustomScrollableView>
      <StandardInput placeholder={'Medication Name'} value={name}
        onChangeText={(text: string) => dispatch({ type: 'name', value: text })} />
      <View style={styles.dosageMeasurementContainer}>
        <View style={styles.containerUnderline}>
          <TextInput placeholderTextColor={colors.background} style={styles.input} onChangeText={(text:string) => dispatch({ type: 'bottleDosageAmount', value: text})}
            placeholder={'Bottle Dosage'} value={bottle_dosage_amount as string} keyboardType={'number-pad'}
          />
          <Pressable style={styles.pressable} onPress={()=>handleTogglePicker()}>
            <Text style={styles.dosageMeasurement}>{bottle_dosage_measurement}</Text>
          </Pressable>
        </View>
      </View>
      {Platform.OS === 'android' && <AndroidDatePicker
        prefix={'Next Refill: '}
        isDatePickerOpen={isDatePickerOpen}
        dateValue={next_refill as Date}
        toggleDatePicker={showDatePicker}
        updateDate={dateUpdate}/>}
      {Platform.OS === 'ios' && <IosDatePicker title={'Next Refill:'} updateDate={dateUpdate} initialDate={next_refill as Date}/>}
      <StandardInput multiline={true} placeholder={'Notes'} value={notes as string}
        onChangeText={(text: string) => dispatch({ type:'notes', value: text })} />
      {!edit &&(<StandardButton disabled={createLoading} loading={createLoading}
        onPress={handleCreateMedication}>
        ADD MEDICATION
      </StandardButton>)}
      {edit &&(<>
        <StandardButton disabled={updateLoading} loading={updateLoading} onPress={handleUpdateMedication}>UPDATE MEDICATION</StandardButton>
        <StandardButton disabled={updateLoading} loading={updateLoading} onPress={handleDeleteMedication}>DELETE</StandardButton>
      </>)
      }
      {createError && (<Text style={{ textAlign: 'center' }}>{createError.message}</Text>)}
      {updateError && (<Text style={{ textAlign: 'center' }}>{updateError.message}</Text>)}
      {deleteError && (<Text style={{ textAlign: 'center' }}>{deleteError.message}</Text>)}
      <CustomPicker isPickerOpen={isPickerOpen} closeCustomPicker={handleTogglePicker} onSelectValue={handlePickerChange} title={'Dosage Type'}>
        {dosageTypes.map((color, index) => (
          <CustomPickerItem key={index} value={color}/>
        ))}
      </CustomPicker>
    </CustomScrollableView>
  );
};


