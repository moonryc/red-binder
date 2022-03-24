import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MasterContextProvider from '../context/MasterContextProvider';
import { QueryClient, QueryClientProvider } from 'react-query';

function MyApp({ Component, pageProps }: AppProps) {
  const theme = createTheme();
const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <MasterContextProvider>
        <Component {...pageProps} />
      </MasterContextProvider>
    </ThemeProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
