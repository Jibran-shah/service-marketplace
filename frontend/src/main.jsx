import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./app/App";
import ReactQueryProvider from "./app/ReactQueryProvider";

import { Provider } from "react-redux";
import { store } from "./store/store";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme/theme";
import "./global.styles.css"


ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ReactQueryProvider>
      <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
          <App />

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
          draggable
        />
      </ThemeProvider>
      </BrowserRouter>
    </ReactQueryProvider>
  </Provider>
);