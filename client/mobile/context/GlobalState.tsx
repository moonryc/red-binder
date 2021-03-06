import React, { createContext, ReducerAction, useContext, useEffect, useState } from 'react';
import {useApplicationReducer} from './reducers';
import { IBinders, IMedication } from '../types';
import AuthServices from '../utils/AuthServices';
import authServices from '../utils/AuthServices';
import { useUpdateArrayOfMedications } from '../hooks';
import { useQuery } from '@apollo/client';
import { GET_ALL_BINDERS } from '../utils/apis';
import { parseDate } from '../utils/parseDate';
import { IAction, TOGGLE_LOGIN, UPDATE_BINDERS } from './actions';
import { useParseDatesFromGetBinder } from '../hooks/api/useParseDatesFromGetBinder';

interface IApplicationContext {
  state:{
    isLoggedIn: boolean
    isLightTheme:boolean,
    themePreference: 'light'|'dark'|'default'| null
    binders:IBinders[]|null|[],
    selectedBinderIndex:number,
    arrayOfMedications:IMedication[],
    selectedDate:Date,
  },
  dispatch:(value: ReducerAction<(state: any, action: IAction) => (any | {isLightTheme: boolean, binders: any[], isLoggedIn: boolean, selectedBinderIndex: number, selectedBinder: null})>) => void
}


const ApplicationContext = createContext<IApplicationContext>({
  state: {
    isLoggedIn: false,
    isLightTheme: true,
    themePreference: 'default',
    binders: [],
    selectedBinderIndex: 0,
    arrayOfMedications: [],
    selectedDate:new Date(),
  },
  dispatch: (value: ReducerAction<(state: any, action: IAction) => (any | {isLightTheme: boolean, binders: any[], isLoggedIn: boolean, selectedBinderIndex: number, selectedBinder: null})>) => {}
});
const {Provider}=ApplicationContext;


export const ApplicationProvider = ({value=[],...props}) => {
  const [state,dispatch] = useApplicationReducer({
    isLoggedIn:false,
    isLightTheme:true,
    themePreference: 'default',
    binders:[],
    selectedBinderIndex:0,
    selectedBinder:null,
    arrayOfMedications:[],
    selectedDate:new Date(),
  });


  const {data:bindersData,error,loading,refetch}= useQuery(GET_ALL_BINDERS);

  //updates the global states that hold the array of all medication which is used for the calendar
  useUpdateArrayOfMedications(state.binders,dispatch);
  //Used To Fix some date oddities
  useParseDatesFromGetBinder(bindersData,dispatch);



  return <Provider value={{ state, dispatch }} {...props}/>;
};

export const useApplicationContext = () => useContext(ApplicationContext);

