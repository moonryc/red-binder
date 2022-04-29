// import './wdyr';
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { Navigation } from './navigation';
import { TailwindProvider } from 'tailwind-rn';
import utilities from './tailwind.json';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { ApplicationProvider } from './context/GlobalState';
import AuthServices from './utils/AuthServices';
import { onError } from '@apollo/client/link/error';

import { createUploadLink } from 'apollo-upload-client';
// const httpLink = createHttpLink({
//   uri: 'http://192.168.1.4:3001/graphql',
//   // uri: SERVER_URL,
// });

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = await AuthServices.getToken();
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  };
});

// const uploadLink = createUploadLink({uri:'http://192.168.1.4:3001/graphql'});
const uploadLink = createUploadLink({uri:'http://192.168.1.4:3001/graphql'});
// const errorLink = onError(({ graphQLErrors }) => {
//   if (graphQLErrors) {
//     graphQLErrors.map(({ message }) => console.log(message));
//   }
// });

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );
  }

  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

const client = new ApolloClient({

  // link: authLink.concat(uploadLink),
  // link: authLink.concat(httpLink),
  // @ts-ignore
  link: authLink.concat(errorLink).concat(uploadLink),
  cache: new InMemoryCache()
});

export default function App() {

  // saveBinders([]);

  return (
    <ApolloProvider client={client}>
      <SafeAreaProvider>
        <ApplicationProvider>
          <TailwindProvider utilities={utilities}>
            <StatusBar style='auto' />
            <Navigation />
          </TailwindProvider>
        </ApplicationProvider>
      </SafeAreaProvider>
    </ApolloProvider>
  );
}


