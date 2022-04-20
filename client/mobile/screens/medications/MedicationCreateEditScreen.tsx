import React, { useReducer, useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ActivityIndicator, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { StandardInput } from '../../components/inputs/StandardInput';
import { Picker } from '@react-native-picker/picker';
import { StandardButton } from '../../components/buttons/StandardButton';
import { format } from 'date-fns';
import { useTailwind } from 'tailwind-rn';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BinderStackParamList } from '../../navigation';
import { useNavigation } from '@react-navigation/native';
import { IMedication } from '../../types';
import { useMutation } from '@apollo/client';
import { CREATE_MEDICATION, GET_ALL_BINDERS } from '../../utils/apis';
import { apolloErrorHandler } from '../../utils';
import { useApplicationContext } from '../../context/GlobalState';
import CustomScrollableView from '../../components/misc/CustomScrollableView';

type binderScreenProp = NativeStackNavigationProp<BinderStackParamList, 'CreateBinder'>;

const dosageTypes = ['mg', 'tablet', 'drops', 'grams', 'milliLiter', 'Liter'];

const initialState: IMedication = {
  name: '',
  bottle_dosage_amount: '',
  bottle_dosage_measurement: dosageTypes[0],
  next_refill: new Date(),
  notes: ''
};

type reducerAction =
  | { property: 'name'; value: string }
  | { property: 'bottleDosageAmount', value: string }
  | { property: 'bottleDosageMeasurement', value: string }
  | { property: 'nextRefill', value: Date }
  | { property: 'notes', value: string }

const reducer = (state: IMedication, action: reducerAction): IMedication => {
  const { property, value } = action;
  switch (property) {
  case 'name':
    return { ...state, name: value };
  case 'bottleDosageAmount':
    return { ...state, bottle_dosage_amount: value };
  case 'bottleDosageMeasurement':
    return { ...state, bottle_dosage_measurement: value };
  case 'nextRefill':
    return { ...state, next_refill: value };
  case 'notes':
    return { ...state, notes: value };
  default:
    throw new Error();
  }
};


export const MedicationCreateEditScreen = () => {

  const {state:{binders,selectedBinderIndex}} = useApplicationContext();
  const navigation = useNavigation<binderScreenProp>();

  const tailwind = useTailwind();

  const styles = {
    dosageMeasurementContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'

    },
    dosageMeasurementPicker: {
      ...tailwind('flex justify-center flex-row my-2 mx-4 px-8 py-6 rounded-full bg-sky-500'),
      width: '60%'
    }
  } as const;

  const [ createMedicationApi, {loading, error }] = useMutation(CREATE_MEDICATION,{
    refetchQueries:[GET_ALL_BINDERS]
  });


  const [medication, dispatch] = useReducer(reducer, initialState);
  const { name, bottle_dosage_amount, bottle_dosage_measurement, next_refill, notes } = medication;
  const [show, setShow] = useState(false);

  const onChange = (_:any,selectedDate:Date|undefined|null):void => {
    setShow(false);
    if(selectedDate){
      dispatch({ property: 'nextRefill', value: selectedDate });
    }
  };
  const showDatePicker = () => {
    setShow(true);
  };

  const handleCreateMedication = async () => {
    try{
      if(!binders){
        return;
      }
      const binderId = binders[selectedBinderIndex]._id;
      const {data}= await createMedicationApi({
        variables: {
          ...medication,
          bottle_dosage_amount: parseFloat(bottle_dosage_amount as string),
          binderId
        }
      });
      navigation.navigate('BinderMedications');
      console.log(data);
    }catch (e) {
      if(error){
        console.log('error');
        apolloErrorHandler(error);
      }
      console.log('e=');
      console.log(e);
    }
  };


  return (
    <CustomScrollableView>
      <StandardInput fontSize={'text-lg'} placeholder={'Medication Name'} value={name}
        onChangeText={(text: string) => dispatch({ property: 'name', value: text })} />
      <StandardInput fontSize={'text-lg'} placeholder={'Bottle Dosage'} value={bottle_dosage_amount}
        onChangeText={(text: string) => dispatch({ property: 'bottleDosageAmount', value: text })} />
      <View style={styles.dosageMeasurementContainer}>

        <Picker style={styles.dosageMeasurementPicker} selectedValue={bottle_dosage_measurement}
          onValueChange={((itemValue) => dispatch({
            property: 'bottleDosageMeasurement',
            value: itemValue
          }))}>
          {dosageTypes.map((color, index) => {
            return <Picker.Item key={index} label={color} value={color} />;
          })}
        </Picker>

      </View>
      <Text style={{ textAlign: 'center' }}>{format(next_refill, 'dd/MM/yyyy')}</Text>
      {show && (<DateTimePicker value={next_refill}
        mode={'date'}
        is24Hour={true}
        onChange={onChange} />)}
      <StandardButton fontSize={'text-lg'} color={'red'} onPress={showDatePicker}>Set Next Refill
          Date</StandardButton>
      <StandardInput fontSize={'text-lg'} placeholder={'Notes'} value={notes}
        onChangeText={(text: string) => dispatch({ property: 'notes', value: text })} />
      <StandardButton fontSize={'text-lg'} color={'red'} disabled={loading}
        onPress={handleCreateMedication}>
        {loading ? (<ActivityIndicator animating={true} color='#ff0000' size={'large'} />) : 'ADD MEDICATION'}
      </StandardButton>
      {error && (<Text style={{ textAlign: 'center' }}>{error.message}</Text>)}
    </CustomScrollableView>
  );
};


