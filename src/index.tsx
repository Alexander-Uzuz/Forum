import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./assets/styles/globalStyles";
import { theme } from "./assets/styles/theme";
import { BrowserRouter } from "react-router-dom";
import { store } from "./core/redux/store";
import { Provider } from "react-redux";
import 'core/i18n/i18n';

// import i18n from 'i18next';
// import {initReactI18next} from 'react-i18next';
// import LanguageDetector from 'i18next-browser-languagedetector';
// import Backend from 'i18next-http-backend';

// i18n
// .use(initReactI18next)
// .use(LanguageDetector)
// .use(Backend)
// .init({
//   debug:true,
//   fallbackLng:"en",
//   interpolation:{
//     escapeValue:false
//   }
// })

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
