import React from 'react';
import LanguageSelector from './components/I18n/LanguageSelector';
import Translator from './components/I18n/Translator';

const App: React.FC = () => {
    return (
      <>
        <header>
          <LanguageSelector />
        </header>
        <div>
          <Translator path="code" />
        </div>
      </>
    )
}

export default App;
