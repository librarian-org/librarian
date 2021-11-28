import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { I18nextProvider } from 'react-i18next';
import App from './App';
import i18next from './i18n';
import AppEventHandler from './util/AppEventHandler';

new AppEventHandler(i18next);

ReactDOM.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next} defaultNS='common'>
      <Suspense fallback={<div>Loading ... </div>}>
        <App />
      </Suspense>
    </I18nextProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
