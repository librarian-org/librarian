import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { I18nextProvider } from 'react-i18next';
import App from './App';
import i18n from './i18n';

interface Message {
  language: string;
  namespace: string;
  resource: unknown;
}

window.api.on('language-changed', (event, message: Message) => {
  if (!i18n.hasResourceBundle(message.language, message.namespace)) {
    i18n.addResourceBundle(message.language, message.namespace, message.resource);
  }

  i18n.changeLanguage(message.language);
});

ReactDOM.render(
  <React.StrictMode>
    {/* <I18nextProvider i18n={i18n}> */}
    <I18nextProvider i18n={i18n} defaultNS='common'>
      <Suspense fallback={<div>Loading ... </div>}>
        <App />
      </Suspense>
    </I18nextProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
