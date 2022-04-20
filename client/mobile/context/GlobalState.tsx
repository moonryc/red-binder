import React, {createContext,useContext} from 'react';
import {useApplicationReducer} from './reducers';
import { IBinders, IMedication } from '../types';
import AuthServices from '../utils/AuthServices';
import authServices from '../utils/AuthServices';

interface IApplicationContext {
  state:{
    isLoggedIn: boolean
    isLightTheme:boolean,
    binders:IBinders[]|null|[],
    selectedBinderIndex:number,
  },
  dispatch:Function
}

const ApplicationContext = createContext<IApplicationContext>({
  state:{
    isLoggedIn:false,
    isLightTheme:true,
    binders:[],
    selectedBinderIndex:0,
  },
  dispatch:()=>{}
});
const {Provider}=ApplicationContext;

export const ApplicationProvider = ({value=[],...props}) => {
  const [state,dispatch] = useApplicationReducer({
    isLoggedIn:AuthServices.isLoggedIn(),
    isLightTheme:true,
    binders:[],
    selectedBinderIndex:0,
    selectedBinder:null,
  });


  console.log(state);
  return <Provider value={{ state, dispatch }} {...props}/>;
};

export const useApplicationContext = () => useContext(ApplicationContext);

