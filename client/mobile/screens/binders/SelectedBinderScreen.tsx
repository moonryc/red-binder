import React, { useLayoutEffect, useMemo, useState } from 'react';
import fallbackImage from '../../assets/icon.png';
import { Image, SafeAreaView, ScrollView, View } from 'react-native';
import { StandardButton } from '../../components/buttons/StandardButton';
import { useTailwind } from 'tailwind-rn';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BinderStackParamList } from '../../navigation';
import CustomScrollableView from '../../components/misc/CustomScrollableView';
import { useSimpleNavigation } from '../../hooks';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type binderScreenProp = NativeStackNavigationProp<BinderStackParamList, 'SelectedBinder'>;

export const SelectedBinderScreen = () => {


  const {params} =useRoute();
  //@ts-ignore
  const { image,_id,color} = params;
  const { navigate } = useSimpleNavigation(params);

  const tailwind = useTailwind();
  const styles = useMemo(()=>({
    binderContainer: {
      display:'flex',
      flex:1,

      alignItems:'center'
    },
    buttonsContainer:{
      justifyContent:'space-between',
    },
    binderIcon: {...tailwind('flex rounded-full justify-center'), width:100, height:100, borderRadius:100/2 },
  } as const),[tailwind] );

  //TODO: Not Within Scope of work currently
  const goToMedicalHistory =()=> navigate('BinderMedicalHistory');
  const goToMedications = ()=>navigate('BinderMedications');
  //TODO: Not Within Scope of work currently
  const goToMedicalInteractions = ()=>navigate('BinderInteractions');
  const goToEditBinder = ()=>navigate('EditBinder');

  return (
    <CustomScrollableView>
      <View style={styles.binderContainer}>
        {image ===null && <MaterialCommunityIcons name={'account-circle-outline'} color={color} size={100}/>}
        {image !== null && <Image
          style={styles.binderIcon}
          source={{uri:image?`data:image/png;base64,${image}`:fallbackImage}}/>
        }
      </View>
      <View style={styles.buttonsContainer}>
        {/*TODO: Not Within Scope of work currently*/}
        {/*<StandardButton onPress={goToMedicalHistory}>*/}
        {/*    Medical History*/}
        {/*</StandardButton>*/}
        <StandardButton onPress={goToMedications}>
        Medications
        </StandardButton>
        {/*TODO: Not Within Scope of work currently*/}
        {/*<StandardButton onPress={goToMedicalInteractions}>*/}
        {/*  Medical Interactions*/}
        {/*</StandardButton>*/}
        <StandardButton onPress={goToEditBinder}>
        Edit Binder
        </StandardButton>
      </View>

    </CustomScrollableView>
  );
};


