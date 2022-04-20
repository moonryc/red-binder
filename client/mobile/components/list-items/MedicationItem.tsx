import React, { useState } from 'react';

import { Image, Pressable, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTailwind } from 'tailwind-rn';
import { IMedication } from '../../types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BinderStackParamList } from '../../navigation';

interface props {
  medication:IMedication
}

type medicationListScreenProp = NativeStackNavigationProp<BinderStackParamList, 'SelectedBinder'>;

const MedicationItem:React.FC<props> = ({medication}) => {

  const navigation = useNavigation<medicationListScreenProp>();
  const [isPressed, setIsPressed] = useState<boolean>(false);
  const tailwind = useTailwind();
  const styles = {
    container: tailwind(`flex items-center flex-row my-2 mx-4 px-8 py-6 rounded-full ${isPressed ? 'bg-sky-400' : 'bg-sky-500'}`),
    binderIcon: {...tailwind('rounded-full'), width:50, height:50 },
    text: tailwind('flex-1 text-xl ml-4')
  } as const ;



  const onPress = () => {
    navigation.navigate('SelectedMedication', {medication});
  };



  return (
    <Pressable onPressIn={()=>setIsPressed(true)} onPressOut={()=>setIsPressed(false)} onPress={()=> onPress()}>
      <View style={styles.container}>
        <Text style={styles.text} numberOfLines={1}>
          {medication.name}
        </Text>
      </View>
    </Pressable>
  );
};

export default MedicationItem;
