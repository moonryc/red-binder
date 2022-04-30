import React, { useCallback, useEffect, useMemo, useReducer, useRef } from 'react';
import { Image, NativeSyntheticEvent, NativeTouchEvent, Platform, Text, View } from 'react-native';
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
import { ReactNativeFile } from 'apollo-upload-client';
import { manipulateAsync } from 'expo-image-manipulator';
// @ts-ignore
import * as mime from 'react-native-mime-types';
import { ItemValue } from '@react-native-picker/picker/typings/Picker';
import CustomPicker from '../../components/custom-picker/CustomPicker';
import CustomPickerItem from '../../components/custom-picker/CustomPickerItem';
import AndroidDatePicker from '../../components/custom-date-picker/AndroidDatePicker';
import IosDatePicker from '../../components/custom-date-picker/IosDatePicker';

type binderScreenProp = NativeStackNavigationProp<BinderStackParamList, 'CreateBinder'>;

const launchCameraCommon = async () => {
  return await ImagePicker.launchCameraAsync({
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });
};




const maxWidth = 1200;
const maxHeight = 1200;

// Width > maxWidth of 1200 then resize width to 1200
export const manipImage = async (uri: any, width: number, height: number) => {
  const resWidth = width > maxWidth ? maxWidth : width;
  const resHeight = height > maxHeight ? maxHeight : height;
  let res =
    width > height
      ? await manipulateAsync(uri, [{ resize: { width: resWidth } }], {
        compress: 1,
        base64: true,
      })
      : await manipulateAsync(uri, [{ resize: { height: resHeight } }], {
        compress: 1,
        base64: true,
      });

  // alert('Raw: ' + width + ' x ' + height);
  // alert('Capped: ' + resWidth + ' x ' + resHeight);
  // alert('Resized: ' + res.width + ' x ' + res.height);
  return res;
};


const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
function generateRNFile(uri:any, name:any) {
  return uri ? new ReactNativeFile({
    uri,
    type: mime.lookup(uri) || 'image',
    name,
  }) : null;
}

interface IInitialState {
  name:string,
  color:string,
  image:string|null,
  birthDate: Date,
  isDatePickerOpen:boolean,
  isColorPickerOpen:boolean
}

const initialState:IInitialState = {
  name:'',
  color:colors[0],
  image:null,
  birthDate: new Date(),
  isDatePickerOpen:false,
  isColorPickerOpen:false
};

interface IAction {
  type:'updateName'|'updateColor'|'updateImage'|'updateBirthDate'|'toggleDatePicker'|'toggleColorPicker',
  value?:string|null|Date|ReactNativeFile,
}

const reducer = (state:IInitialState,{type,value}:IAction):IInitialState => {
  console.log('type : ' + type);
  switch (type) {
  case 'updateName':
    return { ...state, name: value as string};
  case 'updateColor':
    console.log(value);
    return { ...state, color: value as string, isColorPickerOpen: false};
  case 'updateImage':
    return { ...state, image: value as string};
  case 'updateBirthDate':
    if(Platform.OS==='android'){
      return {...state, birthDate:value as Date, isDatePickerOpen:!state.isDatePickerOpen};
    }
    return {...state, birthDate:value as Date};
  case 'toggleDatePicker':
    if(Platform.OS ==='android'){
      return {...state, isDatePickerOpen:!state.isDatePickerOpen};
    }
    return state;
  case 'toggleColorPicker':
    return {...state, isColorPickerOpen:!state.isColorPickerOpen};
  default:
    return state;
  }
};


export const CreateBinderScreen = () => {

  const navigation = useNavigation<binderScreenProp>();

  const tailwind = useTailwind();
  const styles = useMemo(()=>({
    container: tailwind('flex items-center'),
    birthdayContainer: tailwind('flex items-center flex-col justify-center'),
    nameInput: { borderWidth: 1, height: 40, width: '30%', margin: 0, borderRadius: 15 },
    birthdayInput: { borderWidth: 1, height: 40, width: '30%', margin: 0 },
    binderIcon: { ...tailwind('flex rounded-full justify-center'), width: 100, height: 100 },
    text: tailwind('flex-1 text-xl ml-4')
  }) as const,[tailwind]);

  const isMountedRef = useRef(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  const {color, image, birthDate, isDatePickerOpen,name, isColorPickerOpen} = state;
  const [submitBinderApi,{error,loading,reset}]= useMutation(CREATE_BINDER,{
    refetchQueries:[GET_ALL_BINDERS]
  });

  useEffect(()=>{
    console.log(state);
  },[state]);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const onColorChange = useCallback((itemValue:ItemValue)=>{
    if(!isMountedRef.current){
      return;
    }
    dispatch({ type: 'updateColor', value: itemValue as string });
  },[isMountedRef]);

  const submitBinder = useCallback(async () => {
    try{
      reset();
      const file = generateRNFile(image,`picture-${Date.now()}`);
      const {data}= await submitBinderApi({ variables: {name,color,image:file,birthDate}});
      if(error){
        console.log('THIS IS AN ERROR ' + error);
      }
      reset();
      navigation.navigate('BindersHome');
    }catch (e) {
      if(error){
        apolloErrorHandler(error);
      }
      console.log(e);
    }
  },[reset, image, submitBinderApi, name, color, birthDate, error, navigation]);

  const pickImage = useCallback(async () => {
    // let result = await launchCameraCommon();
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1
    });
    if(result.cancelled){
      return false;
    }

    const maniRes = await manipImage(result.uri, result.width, result.height);
    if(!maniRes.base64){
      return false;
    }
    let temp = maniRes;
    const fileSize = maniRes.base64 ? maniRes.base64.length * (3/4)-2 :0;
    // alert('size: '+ fileSize);

    if(fileSize>2000000){
      alert('Exceeds 2mb');
      temp = await manipulateAsync(result.uri, [{resize:{height:800}}],
        {
          compress:(1-2000000/(maniRes.base64.length * (3/4)-2)),
          base64:true
        }
      );
      const fileSize = maniRes.base64 ? maniRes.base64.length * (3 / 4) - 2 : 0;
      // alert('New Dim: ' + temp.width + 'x ' + temp.height);
      // alert('New Size: ' + fileSize);
    }
    // ImagePicker saves the taken photo to disk and returns a local URI to it
    let localUri = result.uri;
    let filename = localUri.split('/').pop();
    // Infer the type of the image
    alert('New Size: ' + fileSize);
    if (filename) {
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : 'image';
      dispatch({type:'updateImage', value: temp.uri });
    }

  },[]);

  const updateAndroidBirthdate = useCallback((_:any, selectedDate:Date|undefined) => {
    console.log('update android birthdate ran');
    if(selectedDate === undefined){
      dispatch({type:'toggleDatePicker'});
      return;
    }
    dispatch({type:'updateBirthDate',value: selectedDate});
  },[]);

  const updateIosBirthdate = useCallback((_:any, selectedDate:Date|undefined) => {
    console.log('update Ios birthdate ran');
    if(selectedDate === undefined){
      return;
    }
    dispatch({type:'updateBirthDate',value: selectedDate});
  },[]);

  const showDatepicker = useCallback((e:NativeSyntheticEvent<NativeTouchEvent>) => {
    console.log('show datepicker ran');
    // e.preventDefault();
    dispatch({type:'toggleDatePicker'});
  },[]);

  const toggleColorPicker = useCallback(
    () => {
      dispatch({type:'toggleColorPicker'});
    },[]);

  useEffect(() => {
    console.log(state);
  }, [state]);



  return (
    <CustomScrollableView>
      <View style={styles.container}>
        <Image
          style={styles.binderIcon}
          source={image ? { uri: image } : fallbackImage}></Image>
      </View>
      <StandardButton onPress={() => pickImage()}>Set Binder Photo</StandardButton>
      <StandardInput placeholder={'Person\'s Name'}
        onChangeText={(text: string) => dispatch({ type:'updateName',value: text })} />
      <StandardButton onPress={toggleColorPicker}>Favorite Color: {color}</StandardButton>
      <AndroidDatePicker
        isDatePickerOpen={isDatePickerOpen}
        dateValue={birthDate}
        toggleDatePicker={showDatepicker}
        updateDate={updateAndroidBirthdate} />
      {Platform.OS === 'ios' && <IosDatePicker updateBirthdate={updateIosBirthdate}/>}
      <CustomPicker isPickerOpen={isColorPickerOpen} closeCustomPicker={toggleColorPicker} title={'Colors'} onSelectValue={onColorChange}>
        {colors.map((color,index)=>(
          <CustomPickerItem value={color} key={index}/>
        ))}
      </CustomPicker>

      <Text>{error ? `An error occurred please Try Again ${error.message}` : ''}</Text>
      <StandardButton loading={loading} onPress={() => submitBinder()}>
          Create Binder
      </StandardButton>
    </CustomScrollableView>
  );
};


