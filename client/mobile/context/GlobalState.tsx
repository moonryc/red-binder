import React, { createContext, useContext, useEffect, useState } from 'react';
import {useApplicationReducer} from './reducers';
import { IBinders, IMedication } from '../types';
import AuthServices from '../utils/AuthServices';
import authServices from '../utils/AuthServices';
import { useUpdateArrayOfMedications } from '../hooks';
import { useQuery } from '@apollo/client';
import { GET_ALL_BINDERS } from '../utils/apis';
import { parseDate } from '../utils/parseDate';
import { IAction, UPDATE_BINDERS } from './actions';
import { useParseDatesFromGetBinder } from '../hooks/api/useParseDatesFromGetBinder';

interface IApplicationContext {
  state:{
    isLoggedIn: boolean
    isLightTheme:boolean,
    binders:IBinders[]|null|[],
    selectedBinderIndex:number,
    arrayOfMedications:IMedication[]
  },
  dispatch(state:any,action:IAction):void
}

const ApplicationContext = createContext<IApplicationContext>({
  state: {
    isLoggedIn: false,
    isLightTheme: true,
    binders: [],
    selectedBinderIndex: 0,
    arrayOfMedications: []
  },
  dispatch: (state: any, action: IAction)=>{},
});
const {Provider}=ApplicationContext;

export const ApplicationProvider = ({value=[],...props}) => {
  const [state,dispatch] = useApplicationReducer({
    isLoggedIn:AuthServices.isLoggedIn(),
    isLightTheme:true,
    binders:[],
    selectedBinderIndex:0,
    selectedBinder:null,
    arrayOfMedications:[]
  });

  useUpdateArrayOfMedications(state.binders,dispatch);


  const {data:bindersData,error,loading}= useQuery(GET_ALL_BINDERS);
  useParseDatesFromGetBinder(bindersData,dispatch);



  return <Provider value={{ state, dispatch }} {...props}/>;
};

export const useApplicationContext = () => useContext(ApplicationContext);

