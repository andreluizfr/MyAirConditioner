import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Query, QueryCache, QueryClient, QueryClientProvider } from 'react-query';
import toast from 'react-hot-toast';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error: any, query: Query) => {
      if (query.state.data !== undefined) {
        console.log("error while fetching: "+error.message);
        toast.error("error while fetching: "+error.message);
      } else {
        console.log("error while refetching: "+error.message);
        toast.error("error while refetching: "+error.message);
      }
    },
  }),
});

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);

