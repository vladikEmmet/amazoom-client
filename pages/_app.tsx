import '@/assets/styles/globals.scss'
import { TypeComponentAuthProps } from '@/providers/authProvider/auth-page.types';
import AuthProvider from '@/providers/authProvider/AuthProvider';
import { persistor, store } from '@/store/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function App({ Component, pageProps }: AppProps & TypeComponentAuthProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AuthProvider Component={{isOnlyUser: Component.isOnlyUser, isOnlyAdmin: Component.isOnlyAdmin}}>
            <Component {...pageProps} />
          </AuthProvider>
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  )
}
