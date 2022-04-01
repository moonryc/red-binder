import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { Navigation } from './navigation';
import { TailwindProvider } from 'tailwind-rn';
import utilities from './tailwind.json';
import AllContextProvider from './context/AllContextProvider';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import { getJWT } from './services';
import { setContext } from '@apollo/client/link/context';
import { SERVER_URL } from '@env';

const httpLink = createHttpLink({
  uri: SERVER_URL,
});

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = await getJWT();
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

export default function App() {

  // saveBinders([]);

  return (
    <ApolloProvider client={client}>
      <SafeAreaProvider>
        <AllContextProvider>
          <TailwindProvider utilities={utilities}>
            <StatusBar style='auto' />
            <Navigation />
          </TailwindProvider>
        </AllContextProvider>
      </SafeAreaProvider>
    </ApolloProvider>
  );
}


