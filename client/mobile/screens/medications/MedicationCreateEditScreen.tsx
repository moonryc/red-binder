import React, { useCallback, useMemo, useReducer, useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  ActivityIndicator,
  NativeSyntheticEvent,
  NativeTouchEvent, Pressable,
  SafeAreaView,
  ScrollView,
  Text, TextInput,
  View
} from 'react-native';
import { StandardInput } from '../../components/inputs/StandardInput';
import { Picker } from '@react-native-picker/picker';
import { StandardButton } from '../../components/buttons/StandardButton';
import { format } from 'date-fns';
import { useTailwind } from 'tailwind-rn';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BinderStackParamList } from '../../navigation';
import { useNavigation, useRoute } from '@react-navigation/native';
import { IMedication } from '../../types';
import { useMutation } from '@apollo/client';
import { CREATE_MEDICATION, GET_ALL_BINDERS } from '../../utils/apis';
import { apolloErrorHandler } from '../../utils';
import { useApplicationContext } from '../../context/GlobalState';
import CustomScrollableView from '../../components/misc/CustomScrollableView';
import { useCustomTheme, useSimpleNavigation } from '../../hooks';
import { useMedicationCreateEditScreenStyles } from '../screen-styles/medications/useMedicationCreateEditScreenStyles';
import CustomPicker from '../../components/custom-picker/CustomPicker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomPickerItem from '../../components/custom-picker/CustomPickerItem';

type binderScreenProp = NativeStackNavigationProp<BinderStackParamList, 'CreateBinder'>;

const dosageTypes = ['mg', 'tablet', 'drops', 'grams', 'milliLiter', 'Liter'];

interface IinitialState extends IMedication {
  isPickerOpen:boolean
}

const initialState: IinitialState = {
  name: '',
  bottle_dosage_amount: '',
  bottle_dosage_measurement: dosageTypes[0],
  next_refill: new Date(),
  notes: '',
  isPickerOpen:false
};

interface reducerAction {
  type:'name'| 'bottleDosageAmount'|
'bottleDosageMeasurement'|
'nextRefill'|
'notes'|
'togglePicker',
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
  default:
    throw state;
  }
};


export const MedicationCreateEditScreen = () => {

  const {state:{binders,selectedBinderIndex}} = useApplicationContext();
  const colors = useCustomTheme();
  const styles = useMedicationCreateEditScreenStyles(colors);
  const {params} = useRoute();
  const {navigate}= useSimpleNavigation(params);

  const [ createMedicationApi, {loading, error }] = useMutation(CREATE_MEDICATION,{
    refetchQueries:[GET_ALL_BINDERS]
  });
  const [state, dispatch] = useReducer(reducer, initialState);
  const { name, bottle_dosage_amount, bottle_dosage_measurement, next_refill, notes,isPickerOpen } = state;
  const [show, setShow] = useState(false);

  const onChange = (_:any,selectedDate:Date|undefined|null):void => {
    setShow(false);
    if(selectedDate){
      dispatch({ type: 'nextRefill', value: selectedDate });
    }
  };
  const showDatePicker = useCallback((event: NativeSyntheticEvent<NativeTouchEvent>) => {
    event.preventDefault();
    setShow(true);
  },[]);

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
      if(error){
        console.log('error');
        apolloErrorHandler(error);
      }
      console.log(e);
    }
  }, [binders, bottle_dosage_amount, createMedicationApi, error, navigate, selectedBinderIndex, state]);

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
            <MaterialCommunityIcons name={'menu-down'} color={colors.text} size={26}/>
          </Pressable>
        </View>
      </View>
      <StandardInput onPress={showDatePicker} value={`Next Refill: ${format(next_refill as Date, 'dd/MM/yyyy')}`}/>
      <StandardInput multiline={true} placeholder={'Notes'} value={notes}
        onChangeText={(text: string) => dispatch({ type:'notes', value: text })} />
      <StandardButton disabled={loading}
        onPress={handleCreateMedication}>
        {loading ? (<ActivityIndicator animating={true} color='#ff0000' size={'large'} />) : 'ADD MEDICATION'}
      </StandardButton>
      {error && (<Text style={{ textAlign: 'center' }}>{error.message}</Text>)}
      {show && (<DateTimePicker value={next_refill as Date}
        mode={'date'}
        is24Hour={true}
        onChange={onChange} />)}
      <CustomPicker isPickerOpen={isPickerOpen} closeCustomPicker={handleTogglePicker} onSelectValue={handlePickerChange} title={'Dosage Type'}>
        {dosageTypes.map((color, index) => (
          <CustomPickerItem key={index} value={color}/>
        ))}
      </CustomPicker>
    </CustomScrollableView>
  );
};


