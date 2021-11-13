import React from 'react';
import I18n from './components/I18n/I18n';
import Translator from './components/I18n/Translator';

const App: React.FC = () => {
    return (
        <>
        <header>
          <I18n />
        </header>
        <div>
          <Translator path="home.message" />
        </div>
      </>
    )
}

export default App;
