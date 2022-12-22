import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ApolloProvider } from "@apollo/client";
import client from "./interceptor/connectGRaphql";
import { AppProvider } from "./context";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <HelmetProvider>
    <AppProvider>
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
    </AppProvider>
  </HelmetProvider>
);

reportWebVitals();
