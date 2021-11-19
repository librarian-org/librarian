import i18n, { InitOptions, Resource } from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

const languages: Resource = window.api.sendSync('get-initial-translations', {}) as Resource;

const i18nConfig: InitOptions = {
  saveMissing: true,
  fallbackLng: 'en-US',
  ns: ['common'],
  defaultNS: 'common',
  resources: languages,
  react: {
    wait: false,
    useSuspense : true,
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init(i18nConfig);

export default i18n;
