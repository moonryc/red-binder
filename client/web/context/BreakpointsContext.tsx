import React, { createContext, useEffect } from 'react';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';


const breakpointContext = createContext({
  xs:false,
  sm:false,
  md:false,
  lg:false,
  xl:false
})

export const BreakpointsContext:React.FC = ({children}) => {

  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.up('xs'));
  const sm = useMediaQuery(theme.breakpoints.up('sm'));
  const md = useMediaQuery(theme.breakpoints.up('md'));
  const lg = useMediaQuery(theme.breakpoints.up('lg'));
  const xl = useMediaQuery(theme.breakpoints.up('xl'));

  useEffect(() => {
    console.log('xs', xs);
    console.log('sm', sm);
    console.log('md', md);
    console.log('lg', lg);
    console.log('xl', xl);
  }, [xs, sm, md, lg, xl]);

  return (
    <breakpointContext.Provider value={{xs,sm,md,lg,xl}}>
      {children}
    </breakpointContext.Provider>
  );
};

export default BreakpointsContext;
