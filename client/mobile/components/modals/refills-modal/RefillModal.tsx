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
import CustomPicker from '../../custom-picker/CustomPicker';
import CustomPickerItem from '../../custom-picker/CustomPickerItem';
import AndroidDatePicker from '../../custom-date-picker/AndroidDatePicker';
import IosDatePicker from '../../custom-date-picker/IosDatePicker';
import RefillConfirm from './RefillConfirm';
import RefillPrompt from './RefillPrompt';


interface props {
  isRefillOpen: boolean
  setIsRefillOpen: Function,
  medication?: IMedication,
  setModalData: Function,
}

interface IintialState {
  isDatePickerOpen: boolean,
  showConfirmUpdateScreen: boolean,
  newDate: Date,
}

const initialState: IintialState = {
  isDatePickerOpen: false,
  showConfirmUpdateScreen: false,
  newDate: new Date()
};

interface Iaction {
  type: 'toggleDatePicker' | 'toggleShowConfirmUpdateScreen' | 'updateNewDate';
  value?: any;
}


const reducer = (state: IintialState, { type, value }: Iaction) => {
  switch (type) {
  case 'toggleDatePicker':
    return { ...state, isDatePickerOpen: !state.isDatePickerOpen };
  case 'toggleShowConfirmUpdateScreen':
    return { ...state, showConfirmUpdateScreen: !state.showConfirmUpdateScreen };
  case 'updateNewDate':
    return { ...state, newDate: value as Date, isDatePickerOpen: !state.isDatePickerOpen };
  default:
    return state;
  }
};

const RefillModal: React.FC<props> = ({ isRefillOpen, setIsRefillOpen, medication, setModalData }) => {

  const colors = useCustomTheme();
  const styles = useCustomStyles(colors);

  const [updateRefill, { error, loading, reset }] = useMutation(UPDATE_REFILL_DATE, {
    refetchQueries: [GET_ALL_BINDERS]
  });
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isDatePickerOpen, newDate, showConfirmUpdateScreen } = state;
  const closeModal = useCallback(() => {
    setIsRefillOpen(false);
    setModalData(undefined);
    reset();
  }, [reset, setIsRefillOpen, setModalData]);
  const handleUpdateSubmit = useCallback(async () => {
    try {
      const { data } = await updateRefill({ variables: { medicationId: medication?._id, nextRefill: newDate } });
      dispatch({ type: 'toggleShowConfirmUpdateScreen' });
      closeModal();
    } catch (e) {
      if (error) {
        apolloErrorHandler(error);
      }
      console.log(e);
    }
  }, [closeModal, error, medication?._id, newDate, updateRefill]);

  const toggleDatePicker = useCallback(() => {
    dispatch({ type: 'toggleDatePicker' });
  },
  []
  );

  const updateDateHandler = useCallback((value: Date | undefined | null): void => {
    if (value) {
      dispatch({ type: 'updateNewDate', value });
      if (Platform.OS === 'android') {
        dispatch({ type: 'toggleShowConfirmUpdateScreen' });
      }
    }
  }, []);

  const toggleConfirm = useCallback(() => {
    dispatch({ type: 'toggleShowConfirmUpdateScreen' });
  }, []);


  return (
    <Modal style={styles.centeredView} animationType={'slide'} transparent={true} visible={isRefillOpen}
      onRequestClose={closeModal}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {!showConfirmUpdateScreen &&
            <RefillPrompt medication={medication as IMedication} newDate={newDate} toggleDatePicker={toggleDatePicker}
              isDatePickerOpen={isDatePickerOpen} closeModal={closeModal} toggleConfirm={toggleConfirm}
              updateDateHandler={updateDateHandler} />}
          {showConfirmUpdateScreen && <RefillConfirm handleUpdateSubmit={handleUpdateSubmit} newDate={newDate}
            medication={medication as IMedication} dispatch={dispatch}
            loading={loading} />}
        </View>
      </View>
    </Modal>
  );
};


export default React.memo(RefillModal);
