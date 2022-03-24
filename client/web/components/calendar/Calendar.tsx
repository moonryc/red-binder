import React from 'react';
import { Box } from '@mui/system';
import { Grid } from '@mui/material';


const centeredTextStyle = {
  position: "relative",
  left: "0",
  right: "0",
  textAlign: "center",
} as const;

const Calendar = () => {



  return (
    <div>
      Calendar
      <Box sx={{ overflow:'visible'}}>
        <br />
        <Grid container spacing={1} columns={7} sx={{display:'flex', alignContent:'center',justifyContent:'flex-start'}}>
          <Grid item xs={1} sx={{display:'flex',...centeredTextStyle, justifyContent:'center'}}>
            Sun
          </Grid>
          <Grid item xs={1} sx={{display:'flex',...centeredTextStyle, justifyContent:'center'}}>
            Mon
          </Grid>
          <Grid item xs={1} sx={{display:'flex',...centeredTextStyle, justifyContent:'center'}}>
            Tues
          </Grid>
          <Grid item xs={1} sx={{display:'flex',...centeredTextStyle, justifyContent:'center'}}>
            Wed
          </Grid>
          <Grid item xs={1} sx={{display:'flex',...centeredTextStyle, justifyContent:'center'}}>
            Thurs
          </Grid>
          <Grid item xs={1} sx={{display:'flex',...centeredTextStyle, justifyContent:'center'}}>
            Fri
          </Grid>
          <Grid item xs={1} sx={{display:'flex',...centeredTextStyle, justifyContent:'center'}}>
            Sat
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Calendar;
