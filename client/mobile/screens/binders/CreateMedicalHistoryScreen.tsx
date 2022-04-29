import React, { useReducer } from 'react';
import CustomScrollableView from '../../components/misc/CustomScrollableView';
import { useSimpleNavigation } from '../../hooks';
import { StandardInput } from '../../components/inputs/StandardInput';

interface IInitialState{
  isCondition:boolean
  eventDate: Date
  title:string
  notes:string
}

const initialState:IInitialState = {
  isCondition:false,
  eventDate:new Date(),
  title:'',
  notes:''
};

interface IAction {
  type:'updateDate'|'updateTitle'|'updateNotes'
  value?:Date|string
}

const reducer = (state:any,{type,value}:IAction) => {
  switch (type) {
  case 'updateDate':
    return {...state, eventDate:value};
  case 'updateNotes':
    return {...state,notes:value};
  case 'updateTitle':
    return {...state, title:value};
  default:
    return state;
  }
};

const CreateMedicalHistoryScreen = () => {

  const [state, dispatch] = useReducer(reducer, initialState);
  const {eventDate, notes, title} = state;
  const { navigate,navigation } = useSimpleNavigation({name:'Create Medical History'});

  return (
    <CustomScrollableView>

      <StandardInput value={title} onChangeText={(string:string)=>dispatch({type:'updateTitle',value:string})}/>

    </CustomScrollableView>
  );
};

export default CreateMedicalHistoryScreen;
