declare module '*.png'
declare module '@env' {
  export const NODE_ENV:string;
  export const DEV_USERNAME: string;
  export const DEV_PASSWORD: string;
  export const SERVER_URL: string;
}