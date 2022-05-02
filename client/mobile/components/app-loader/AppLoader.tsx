import { every } from 'lodash';
import React, { useEffect, useState } from 'react';
import { LoadingProcess } from '../../types';



interface props{
  [x:string]:any
  mandatoryProcesses?:LoadingProcess[]
  minimumLoadingTime?:number
  loadingComponent:React.ReactElement
}


const AppLoader:React.FC<props> = React.memo(function AppLoader({mandatoryProcesses, loadingComponent, minimumLoadingTime, children}){

  const [minimumDurationPassed, setMinimumDurationPassed] = useState<boolean>((minimumLoadingTime||0)<=0);

  useEffect(() => {
    if(minimumLoadingTime){
      setTimeout(()=>setMinimumDurationPassed(true),minimumLoadingTime);
    }
  }, [minimumLoadingTime]);


  return (
    <>
      {every(mandatoryProcesses, 'isReady') && minimumDurationPassed ? children : loadingComponent}
    </>
  );
});

export default AppLoader;
