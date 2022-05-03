// use this to decode a token and get the user's information out of it
import decode from 'jwt-decode';
import * as SecureStore from 'expo-secure-store';

class AuthService{
  // get user data
  getMessage(){
    // TODO
    //@ts-ignore
    return decode(this.getToken() as string);
  }

  // check if token is expired
  isTokenExpired(token: string){
    try {
      const decoded: { exp: Date } = decode(token);
      const { exp }:any = decoded;
      const experation = exp as unknown as number;
      const now:number = Date.now()/1000 as number;
      if (exp < now) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  }

  // check if user's logged in
  async isLoggedIn(){
    // Checks if there is a saved token and it's still valid
    const token = await this.getToken();
    if(!token){
      return false;
    }
    const isExpired = this.isTokenExpired(token);
    console.log('token: ' + token);
    console.log('isExpired: ' + isExpired);

    if(token && !isExpired){
      return true;
    }
    return false;
  }



  async getToken(): Promise<string | null>{
    // Retrieves the user token from localStorage
    return await SecureStore.getItemAsync('jwt');
  }

  async saveJwtToken(idToken: string){
    // Saves user token to localStorage
    await SecureStore.setItemAsync('jwt', idToken);
  }

  async logout(){
    // Clear user token and profile data from localStorage
    await SecureStore.deleteItemAsync('jwt');
  }
}


export default new AuthService();