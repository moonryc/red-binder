import {useReducer} from 'react';
import {
  IAction,
  LOGOUT,
  TOGGLE_LOGIN,
  TOGGLE_THEME,
  UPDATE_ALL_MEDICATIONS_ARRAY,
  UPDATE_BINDERS,
  UPDATE_SELECTED_BINDER_INDEX,
  SET_SELECTED_DAY
} from './actions';
import AuthServices from '../utils/AuthServices';



export const reducer = (state:any, action:IAction) => {
  switch (action.type) {
  // if action type value is the value of `UPDATE_PRODUCTS`, return a new state object with an updated products array
  case TOGGLE_LOGIN:
    return {...state, isLoggedIn: !state.isLoggedIn};
  case TOGGLE_THEME:
    return {...state, isLightTheme: !state.isLightTheme};
  case UPDATE_BINDERS:
    return {...state, binders: action.value};
  case UPDATE_SELECTED_BINDER_INDEX:
    return {...state, selectedBinderIndex:action.value};
  case UPDATE_ALL_MEDICATIONS_ARRAY:
    return {...state, arrayOfMedications:action.value};
  case SET_SELECTED_DAY:
    return {...state, selectedDate:action.value};
  case LOGOUT:
    AuthServices.logout();
    const initial = {
      isLoggedIn:false,
      isLightTheme:true,
      binders:[],
      selectedBinderIndex:0,
      selectedBinder:null,
    };
    return {...initial};
    // if it's none of these actions, do not update state at all and keep things the same!
  default:
    return state;
  }
};
//TODO
export const useApplicationReducer = (initialState:any) => {
  return useReducer(reducer, initialState);
};