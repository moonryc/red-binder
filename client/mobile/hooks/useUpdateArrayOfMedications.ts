import { IBinders, IMedication } from '../types';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { useApplicationContext } from '../context/GlobalState';
import { UPDATE_ALL_MEDICATIONS_ARRAY } from '../context/actions';

export const useUpdateArrayOfMedications = (binders: IBinders[]|[]|null,dispatch:Function) => {

  useEffect(() => {
    if (binders && binders.length > 0) {
      const tempArrayOfMedications:IMedication[]=[];
      for (const {medications, name} of binders) {
        for(const medication of medications){
          tempArrayOfMedications.push({...medication,owner:name });
        }
      }
      dispatch({type:UPDATE_ALL_MEDICATIONS_ARRAY,value:tempArrayOfMedications});
    }else{
      dispatch({type:UPDATE_ALL_MEDICATIONS_ARRAY,value:[]});
    }

  }, [binders, dispatch]);
};