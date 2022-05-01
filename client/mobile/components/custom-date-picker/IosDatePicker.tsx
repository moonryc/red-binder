import React, { useCallback, useEffect, useMemo, useReducer } from 'react';

import { Platform, Pressable, Text, View } from 'react-native';
import { useCustomTheme } from '../../hooks';
import CustomPicker from '../custom-picker/CustomPicker';
import { getDate, getDaysInMonth, getMonth, getYear } from 'date-fns';
import CustomPickerItem from '../custom-picker/CustomPickerItem';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IosDateOption from './IosDateOption';

interface props {
  updateDate:Function,
  initialDate: Date
}

interface IinitialState {
  isDayPickerOpen:boolean
  isMonthPickerOpen:boolean
  isYearPickerOpen:boolean
  month:number,
  day:number,
  year:number
}

interface IAction{
  type:'updateMonth'|'updateDay'|'updateYear'|'toggleMonth'|'toggleDay'|'toggleYear',
  value?:number|string
}

const months = ['january', 'febuary', 'march', 'april', 'may', 'june', 'july', 'august','september', 'october', 'november', 'december'];
const years = Array.from({ length:getYear(new Date())-1899},(_,i)=>i+1900 ).reverse();

const reducer = (state:IinitialState,{type,value}:IAction):IinitialState => {
  switch (type) {
  case 'toggleDay':
    return {...state, isDayPickerOpen:!state.isDayPickerOpen};
  case 'toggleMonth':
    return {...state, isMonthPickerOpen:!state.isMonthPickerOpen};
  case 'toggleYear':
    return {...state, isYearPickerOpen:!state.isYearPickerOpen};
  case 'updateDay':
    return {...state, day:value as number, isDayPickerOpen:false};
  case 'updateMonth':
    return {...state, month:months.indexOf(value as string)+1, isMonthPickerOpen:false};
  case 'updateYear':
    return {...state, year:value as number, isYearPickerOpen:false};
  default:
    return state;
  }
};






const IosDatePicker:React.FC<props> = ({updateDate,initialDate}) => {

  const initialState = {
    isDayPickerOpen:false,
    isMonthPickerOpen:false,
    isYearPickerOpen:false,
    month:getMonth(initialDate),
    day:getDate(initialDate),
    year:getYear(initialDate)
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const {day, year, month, isDayPickerOpen, isMonthPickerOpen, isYearPickerOpen} = state;

  useEffect(() => {
    updateDate(new Date(year,month,day));
  }, [day, year, month, updateDate]);



  const colors = useCustomTheme();

  const styles = useMemo(()=>({
    container:{
      display:'flex',
      flex:1,
      marginTop:20
    },
    iosDateOptionsContainer: {
      display:'flex',
      // justifyContent:'space-around',
      justifyContent:'space-between',
      flexDirection: 'row',
      alignItems:'center',
      // marginTop: 10,
      marginBottom: 10,
      marginRight:30,
      marginLeft:30,
      // paddingLeft:15,
      // paddingRight:15,
      // paddingTop:20,
      paddingBottom:20,
      borderRadius: 9999
      // backgroundColor: colors.primaryDark
    },
    text:{
      marginLeft:30,
      marginBottom:15,
      color:colors.primaryDark,
      textAlign:'left',
      fontWeight:'bold'
    },
  } as const),[colors.primaryDark, colors.text]) ;

  const toggleDay = useCallback(() => {
    dispatch({type:'toggleDay'});
  },[]);

  const updateDay = useCallback((value:string) => {
    dispatch({type:'updateDay',value: value as unknown as number});
  },[]);

  const toggleMonth = useCallback(
    () => {
      dispatch({type:'toggleMonth'});
    },[]
  );

  const updateMonth = (value:string) => {
    dispatch({type:'updateMonth',value: value as unknown as number});
  };

  const toggleYear = () => {
    dispatch({type:'toggleYear'});
  };

  const updateYear = (value:string) => {
    dispatch({type:'updateYear',value: value as unknown as number});
  };

  return (
    <>
      {Platform.OS === 'ios' &&
        <>
          <View style={styles.container}>

            <Text style={styles.text}>Birthdate:</Text>

            <View style={styles.iosDateOptionsContainer}>
              <IosDateOption toggleOption={toggleDay} value={day}/>
              <IosDateOption toggleOption={toggleMonth} value={month}/>
              <IosDateOption toggleOption={toggleYear} value={year}/>
            </View>

          </View>
          <CustomPicker isPickerOpen={isDayPickerOpen} closeCustomPicker={toggleDay} onSelectValue={updateDay} title={'Day'}>
            {Array.from({ length:getDaysInMonth(new Date(year, month - 1, day))},(_,i)=>i+1 ).map(day=>(
              <CustomPickerItem key={day} value={`${day}`}/>
            ))}
          </CustomPicker>
          <CustomPicker isPickerOpen={isMonthPickerOpen} closeCustomPicker={toggleMonth} onSelectValue={updateMonth} title={'Month'}>
            {months.map(month=>(
              <CustomPickerItem key={month} value={month}/>
            ))}
          </CustomPicker>
          <CustomPicker isPickerOpen={isYearPickerOpen} closeCustomPicker={toggleYear} onSelectValue={updateYear} title={'Year'}>
            {years.map(year=>(
              <CustomPickerItem key={year} value={`${year}`}/>
            ))}
          </CustomPicker>
        </>
      }
    </>
  );
};

export default IosDatePicker;
