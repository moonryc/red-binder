import { useEffect, useState } from 'react';
import { IBinders } from '../../types';
import { parseDate } from '../../utils/parseDate';
import { UPDATE_BINDERS } from '../../context/actions';

export const useParseDatesFromGetBinder = (bindersData:any,dispatch:Function) => {
  const [oldData,setOldData] = useState<IBinders[]>([]);

  useEffect(()=>{
    parseDatesAndUpdatebinders(bindersData, dispatch, oldData, setOldData).then();
  },[bindersData, dispatch, oldData]);
};


const parseDatesAndUpdatebinders = async (bindersData:any,dispatch:Function,oldData:any,setOldData:Function) => {
  if(bindersData?.getAllBindersByAccountId?.binders && bindersData?.getAllBindersByAccountId?.binders !== oldData){
    const stringifyData = JSON.stringify(bindersData?.getAllBindersByAccountId?.binders);
    const isDataIdentical = stringifyData===JSON.stringify(oldData);
    if(!isDataIdentical){
      let newBinderData:IBinders[] = JSON.parse(stringifyData);
      newBinderData = newBinderData.map((binder,index)=>{
        const {medications} = binder;
        const newMedications = medications.map((medication,index)=>{
          const {next_refill} = medication;
          return {
            ...medication,
            owner:binder.name,
            next_refill: parseDate(next_refill as string)
          };
        });
        return{
          ...binder,
          medications:newMedications
        };
      });
      setOldData(bindersData?.getAllBindersByAccountId?.binders);
      dispatch({type:UPDATE_BINDERS, value: newBinderData});
    }
  }
};