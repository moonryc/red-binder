export interface ICalendarDay {
  isFillerDay:boolean,
  date: Date
  isToday:boolean
  isRefill:boolean
  isMissedDosage:boolean
  onPress?:Function
}