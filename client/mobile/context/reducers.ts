import {useReducer} from 'react';
import { TOGGLE_LOGIN,TOGGLE_THEME, UPDATE_BINDERS, UPDATE_SELECTED_BINDER_INDEX } from './actions';

//TODO
export const reducer = (state:any, action:any) => {
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
    // if it's none of these actions, do not update state at all and keep things the same!
  default:
    return state;
  }
};
//TODO
export const useApplicationReducer = (initialState:any) => {
  return useReducer(reducer, initialState);
};