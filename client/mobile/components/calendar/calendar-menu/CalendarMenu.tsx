import React, { useEffect, useState } from 'react';

import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useCustomTheme } from '../../../hooks';
import { useApplicationContext } from '../../../context/GlobalState';
import { isSameDay } from 'date-fns';
import { IMedication } from '../../../types';
import MedicationActions from '../medication-actions/MedicationActions';
import RefillModal from '../../modals/refills-modal/RefillModal';



const CalendarMenu = () => {

  const colors= useCustomTheme();
  const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      // marginTop: 22,
      marginHorizontal:15,
      marginBottom:15,
    },
    modalView: {
      margin: 20,
      backgroundColor: colors.paper,
      borderRadius: 20,
      // padding: 15,
      alignItems: 'center',
      shadowColor: colors.paperShadow,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      height:'100%',
      width:'100%'
    },
  });
  const {state:{selectedDate, arrayOfMedications}} = useApplicationContext();
  const [refillMedications, setRefillMedications] = useState<IMedication[]>(arrayOfMedications.filter(medication=>isSameDay(medication.next_refill as Date,selectedDate)));
  const [isRefillModalOpen, setIsRefillModalOpen] = useState(false);
  const [modalData, setModalData] = useState<IMedication|undefined>(undefined);


  useEffect(()=>{
    setRefillMedications(arrayOfMedications.filter(medication=>isSameDay(medication.next_refill as Date,selectedDate)));
  },[arrayOfMedications, selectedDate]);

  return (
    <>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text>
            {selectedDate && selectedDate.toDateString()}
          </Text>
          <ScrollView>
            {refillMedications.map(medication=>(
              <MedicationActions key={medication._id} actionType={'refill'} medicationName={medication.name} medication={medication} setOpenModel={setIsRefillModalOpen} setModalData={setModalData}/>
            ))}
          </ScrollView>

        </View>
      </View>
      <RefillModal isRefillOpen={isRefillModalOpen} setIsRefillOpen={setIsRefillModalOpen} medication={modalData} setModalData={setModalData}/>
    </>
  );
};

export default CalendarMenu;
