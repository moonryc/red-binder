import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { Navigation } from './navigation';
import { TailwindProvider } from 'tailwind-rn';
import utilities from './tailwind.json';
import AllContextProvider from './context/AllContextProvider';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

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


