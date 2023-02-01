import { ApolloProvider } from '@apollo/client';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import client from './interceptor/connectGraphql';
import reportWebVitals from './reportWebVitals';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <HelmetProvider>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <ToastContainer
          position="bottom-center"
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <App />
      </ApolloProvider>
    </BrowserRouter>
  </HelmetProvider>
);

reportWebVitals();
