import { IMedication } from './medications';

export interface IBinders{
  _id:string
  name: string
  color: string
  image: any
  birthDate: Date
  medications: IMedication[]
  dosages: any
  scheduled_dosages: any
}