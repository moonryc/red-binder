export interface IMedication {
  _id?:string
  name: string,
  bottleDosageAmount: string,
  bottleDosageMeasurement: string,
  nextRefill: Date,
  notes: string|null|undefined
}