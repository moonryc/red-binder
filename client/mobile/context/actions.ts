export const TOGGLE_LOGIN = 'TOGGLE_LOGIN';
export const TOGGLE_THEME = 'TOGGLE_THEME';
export const UPDATE_BINDERS = 'UPDATE_BINDERS';
export const UPDATE_SELECTED_BINDER_INDEX = 'UPDATE_SELECTED_BINDER_INDEX';
export const LOGOUT = 'LOGOUT';
export const UPDATE_ALL_MEDICATIONS_ARRAY = 'UPDATE_ALL_MEDICATIONS_ARRAY';
export const SET_SELECTED_DAY = 'SET_SELECTED_DAY';
export const SET_THEME_PREFERENCE = 'SET_THEME_PREFERENCE';

export type IAction ={
  type:
  'TOGGLE_LOGIN' | 'TOGGLE_THEME'
  | 'UPDATE_BINDERS'
  | 'UPDATE_SELECTED_BINDER_INDEX'
  | 'LOGOUT'
  | 'UPDATE_ALL_MEDICATIONS_ARRAY'|'SET_SELECTED_DAY'| 'SET_THEME_PREFERENCE',
  value?:any
}