import React,{Suspense} from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./assets/styles/globalStyles";
import { theme } from "./assets/styles/theme";
import { BrowserRouter } from "react-router-dom";
import { store } from "./core/redux/store";
import { Provider } from "react-redux";
import 'core/i18n/i18n';


ReactDOM.render(
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <Provider store={store}>
          <Suspense fallback={<div>Loading...</div>}>
          <App />
          </Suspense>
        </Provider>
      </BrowserRouter>
    </ThemeProvider>,
  document.getElementById("root")
);


