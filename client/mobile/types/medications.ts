export interface IMedication {
  _id?:string
  name: string,
  bottle_dosage_amount: number|string,
  bottle_dosage_measurement: string,
  next_refill: Date|string,
  notes: string|null|undefined
}