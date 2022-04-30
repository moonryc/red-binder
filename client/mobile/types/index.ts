export * from './medications';
export * from './binders';
export * from './theme';

export interface LoadingProcess{
  name:string,
  isReady:boolean
}

export enum LoadingProcessStatus{
  Waiting='WAITING',
  Loading='LOADING',
  isReady='READY'
}