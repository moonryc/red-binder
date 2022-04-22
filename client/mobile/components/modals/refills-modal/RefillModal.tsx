import React from 'react';

import { Modal, Text, View, StyleSheet, Pressable } from 'react-native';
import { StandardButton } from '../../buttons/StandardButton';


interface props {
  isRefillOpen:boolean
  setIsRefillOpen:Function
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});


const RefillModal:React.FC<props> = ({isRefillOpen,setIsRefillOpen}) => {


  const closeModal = () => {
    setIsRefillOpen(false);
  };

  return (
    <Modal style={styles.centeredView} animationType={'slide'} transparent={true} visible={isRefillOpen} onRequestClose={closeModal}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Hello World!</Text>
          <StandardButton fontSize={'text-lg'} color={'red'} onPress={closeModal}>Close</StandardButton>
        </View>
      </View>
    </Modal>
  );
};



export default RefillModal;
