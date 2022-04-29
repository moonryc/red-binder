import { Stream } from 'stream';
import { Schema } from 'mongoose';



export interface IFile {
  createReadStream:()=>Stream,
  filename:string,
  mimetype:string,
  encoding:string
}

export type IUpload = Promise<IFile>


export interface IMedication {
  name:string
  bottle_dosage_amount:number
  bottle_dosage_measurement:string
  next_refill:Date
  notes?:string
}

export interface IBinder{
  name: string,
  color: string,
  image: string,
  birthDate: Date,
  medications?: IMedication[],
}


export interface AccountBody {
  _id:string,
  username:string,
  email:string,
  binders?:IBinder[]
}
