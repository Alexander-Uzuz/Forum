import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(Backend)
  .init({
    fallbackLng: "ru",
    supportedLngs:["en","ru"],
    debug:false,
    detection:{
        order: ["localStorage","cookie"],
        caches:["localStorage","cookie"],
    },
    interpolation:{
        escapeValue:false
    }
  });

export default i18n;
