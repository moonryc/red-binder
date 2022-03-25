import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { Navigation } from './navigation';
import { TailwindProvider } from 'tailwind-rn';
import utilities from './tailwind.json';
import AllContextProvider from './context/AllContextProvider';
import { SafeAreaProvider } from 'react-native-safe-area-context';


export default function App() {
  return (
    <SafeAreaProvider>
      <AllContextProvider>
        <TailwindProvider utilities={utilities}>
          <StatusBar style="auto" />
          <Navigation/>
        </TailwindProvider>
      </AllContextProvider>
    </SafeAreaProvider>
  );
}


