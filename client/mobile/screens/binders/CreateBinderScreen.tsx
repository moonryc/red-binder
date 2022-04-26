import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Button,
  Image,
  NativeSyntheticEvent, NativeTouchEvent, Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { StandardButton } from '../../components/buttons/StandardButton';
import { useTailwind } from 'tailwind-rn';
import * as ImagePicker from 'expo-image-picker';
import fallbackImage from '../../assets/icon.png';
import { StandardInput } from '../../components/inputs/StandardInput';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BinderStackParamList } from '../../navigation';
import { useNavigation } from '@react-navigation/native';
import { useMutation } from '@apollo/client';
import { CREATE_BINDER, GET_ALL_BINDERS } from '../../utils/apis';
import { apolloErrorHandler } from '../../utils';
import CustomScrollableView from '../../components/misc/CustomScrollableView';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';

type binderScreenProp = NativeStackNavigationProp<BinderStackParamList, 'CreateBinder'>;

const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];


export const CreateBinderScreen = () => {

  const navigation = useNavigation<binderScreenProp>();

  const tailwind = useTailwind();
  const styles = {
    container: tailwind('flex items-center'),
    birthdayContainer: tailwind('flex items-center flex-col justify-center'),
    nameInput: { borderWidth: 1, height: 40, width: '30%', margin: 0, borderRadius: 15 },
    birthdayInput: { borderWidth: 1, height: 40, width: '30%', margin: 0 },
    binderIcon: { ...tailwind('flex rounded-full justify-center'), width: 100, height: 100 },
    text: tailwind('flex-1 text-xl ml-4')
  } as const;

  const [binderBody, setBinderBody] = useState({ name: '', color: colors[0], image: { uri: '', name: '', type: '' },birthDate:new Date() });

  const [submitBinderApi,{error,loading}]= useMutation(CREATE_BINDER,{
    refetchQueries:[GET_ALL_BINDERS]
  });

  const submitBinder = async () => {
    // await submitBinderApi({ variables: { ...binderBody,birthDate:new Date(birthDate.year,birthDate.month,birthDate.day),image:encodeURIComponent(binderBody.image)} });
    try{
      const {data}= await submitBinderApi({ variables: binderBody});

      console.log(data);

      if (error) {
        apolloErrorHandler(error);
        return;
      }
      setBinderBody({ name: '', color: colors[0], image: { uri: '', name: '', type: '' },birthDate: new Date() });
      navigation.navigate('BindersHome');
    }catch (e) {
      if(error){
        apolloErrorHandler(error);
      }
      console.log(e);
    }

  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });
    if (!result.cancelled) {
      // ImagePicker saves the taken photo to disk and returns a local URI to it
      let localUri = result.uri;
      let filename = localUri.split('/').pop();
      // Infer the type of the image
      if (filename) {
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : 'image';
        setBinderBody({ ...binderBody, image: { uri: localUri, name: filename, type } });
      }
    }
  };


  const [showDateTimePicker, setShowDateTimePicker] = useState(false);

  const onChange = (_:any, selectedDate:Date|undefined) => {
    setShowDateTimePicker(false);
    if(selectedDate === undefined){
      return;
    }
    setBinderBody(prevState => ({...prevState,birthDate: selectedDate}));
  };

  const showDatepicker = (e:NativeSyntheticEvent<NativeTouchEvent>) => {
    e.preventDefault();
    setShowDateTimePicker(true);
  };


  return (
    <CustomScrollableView>
      <View style={styles.container}>
        <Image
          style={styles.binderIcon}
          source={binderBody.image.uri ? { uri: binderBody.image.uri } : fallbackImage} />
      </View>
      <StandardButton fontSize={'text-lg'} color={'red'} onPress={() => pickImage()}>Set Binder Photo</StandardButton>
      <StandardInput placeholder={'Person\'s Name'}
        onChangeText={(text: string) => setBinderBody({ ...binderBody, name: text })} />
      <View>
        <View>
          <Pressable onPressIn={showDatepicker}>
            <StandardInput editable={false} selectTextOnFocus={false} value={`${binderBody.name ? binderBody.name+'\'s ':''}Birthday: ${format(binderBody.birthDate,'MM/dd/yyyy')} `}/>
          </Pressable>
        </View>
        {showDateTimePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={binderBody.birthDate}
            mode={'date'}
            onChange={onChange}
          />
        )}
      </View>
      <Picker selectedValue={binderBody.color}
        onValueChange={((itemValue) => setBinderBody({ ...binderBody, color: itemValue }))}>
        {colors.map((color, index) => {
          return <Picker.Item key={index} label={color} value={color} />;
        })}
      </Picker>
      <Text>{error ? `An error occurred please Try Again ${error.message}` : ''}</Text>
      <StandardButton fontSize={'text-lg'} color={'red'} onPress={() => submitBinder()}>
          Create Binder
        {loading && (<ActivityIndicator animating={loading} size={'large'} />)}
      </StandardButton>
    </CustomScrollableView>
  );
};


