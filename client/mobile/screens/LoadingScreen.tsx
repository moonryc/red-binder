import React, { useState } from 'react';

import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { LoadingProcessStatus } from '../types';

const styles = StyleSheet.create({

  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  }

});


interface props {
  loginStatus:LoadingProcessStatus|string
  loadingUserDataStatus:LoadingProcessStatus|string
}

const LoadingScreen:React.FC<props> = ({loginStatus,loadingUserDataStatus}) => {
  return (
    <View style={styles.container}>
      <Text>Red-Binder</Text>
      <ActivityIndicator color={'red'} animating={true} size={'large'} />
      {loginStatus === LoadingProcessStatus.Loading && <Text>For Existing UserData</Text>}
      {loadingUserDataStatus === LoadingProcessStatus.Loading && <Text>Loading Data and checking for updates</Text>}
    </View>
  );
};


export default LoadingScreen;