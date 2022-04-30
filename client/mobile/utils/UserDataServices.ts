// use this to decode a token and get the user's information out of it
import decode from 'jwt-decode';
import * as SecureStore from 'expo-secure-store';

class UserDataServices{


  async getThemePreference(): Promise<'light'|'dark'|'default'| null>{
    // Retrieves the user token from localStorage
    return await SecureStore.getItemAsync('UserTheme') as 'light'|'dark'|'default'| null;
  }

  async saveThemePreference(themePreference: 'light'|'dark'|'default'):Promise<void>{
    // Saves user token to localStorage
    switch(themePreference){
    case 'light':
      await SecureStore.setItemAsync('UserTheme', 'light');
      break;
    case 'dark':
      await SecureStore.setItemAsync('UserTheme', 'dark');
      break;
    case 'default':
      await SecureStore.setItemAsync('UserTheme', 'default');
      break;
    default:
      break;
    }
  }

  async logout(){
    // Clear user token and profile data from localStorage
    await SecureStore.deleteItemAsync('UserTheme');
  }
}


export default new UserDataServices();