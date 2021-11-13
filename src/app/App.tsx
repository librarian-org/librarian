import React from 'react';
import Translator from './components/i18n/Translator';

const App: React.FC = () => {
    return (
        <div><Translator path="home.message" /></div>
    )
}

export default App;
