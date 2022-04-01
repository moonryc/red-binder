import React from 'react';

import { SafeAreaView, Text, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TodaysInfoStackParamList } from '../../navigation';
import { useNavigation } from '@react-navigation/native';

type todaysInfoScreenProp = NativeStackNavigationProp<TodaysInfoStackParamList, 'TodayHome'>;

const upcomingArray = [
  {
    medicationName: 'Advil 500mg 12:00pm',
    color: 'red'
  },
  {
    medicationName: 'Melatonin 500mg 12:00pm',
    color: 'green'
  },
  {
    medicationName: 'Advil 500mg 12:00pm',
    color: 'yellow'
  },
  {
    medicationName: 'Tea 500mg 12:00pm',
    color: 'purple'
  }
];

interface ISectionHeader {
  title: string;
}

const SectionHeader: React.FC<ISectionHeader> = ({title}) => {

  const navigation = useNavigation<todaysInfoScreenProp>();

  const tailwind = useTailwind();
  const styles = {
    container: tailwind('flex w-full flex-row-reverse'),
    positionRight: tailwind('items-center w-80  my-2 px-8 py-6 bg-sky-500 rounded-tl-full rounded-bl-full'),
    text: tailwind('flex-1 text-xl')
  } as const;

  return (
    <View style={styles.container}>
      <View style={styles.positionRight}>
        <Text style={styles.text}>
          {title}
        </Text>
      </View>
    </View>
  );
};

interface props {
  children:JSX.Element
}

const Section:React.FC<props> = ({ children }) => {



  const tailwind = useTailwind();
  const styles = {
    flexItem: tailwind('bg-sky-500 rounded-lg flex-1 mx-4 my-4'),
    text: tailwind('text-center text-xl')
  } as const;


  return (
    <View style={{ ...styles.flexItem }}>
      <Text style={styles.text}>
        {children}
      </Text>
    </View>
  );
};

export const TodaysInfoScreen = () => {

  const tailwind = useTailwind();
  const styles = {
    container: tailwind('flex w-full h-full flex-1'),
    subContainer: tailwind('flex flex-row w-full flex-1'),
  } as const;


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subContainer}>
        <Section>UPCOMING</Section>
        <Section>MISSED</Section>
      </View>
      <View style={styles.subContainer}>
        <Section>TAKEN</Section>
        <Section>REFILLS</Section>
      </View>
    </SafeAreaView>
  );
};


