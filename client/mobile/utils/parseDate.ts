import { parseISO, toDate } from 'date-fns';

export const parseDate = (date:string):Date => {
  return toDate(parseInt(date));
};