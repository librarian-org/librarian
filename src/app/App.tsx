import React, { useCallback, useEffect } from 'react';
import { DefaultTheme, ThemeProvider } from 'styled-components';
import LanguageSelector from './components/I18n/LanguageSelector';
import Translator from './components/I18n/Translator';
import FormBook from './components/Book/FormBook';
import usePersistedState from './hooks/usePersistedState';

import GlobalStyle from './styles/global';
import light from './styles/themes/light';
import dark from './styles/themes/dark';

const App: React.FC = () => {
  const [theme, setTheme] = usePersistedState<DefaultTheme>(
    '@librarian:theme',
    light,
  );

  useEffect(() => {
    window.api.send('get-theme', theme.title === 'dark');
  }, [theme.title]);

  const toggleTheme = useCallback(() => {
    setTheme(theme.title === 'light' ? dark : light);
  }, [setTheme, theme]);

  window.api.removeAllListeners('set-theme');
  window.api.once('set-theme', async () => {
    toggleTheme();
  });


  return (
    <ThemeProvider theme={theme}>
      <header>
        <LanguageSelector />
      </header>
      <div>
        <Translator path="home.message" />
        <FormBook></FormBook>
      </div>
      <GlobalStyle />
    </ThemeProvider>
  )
}

export default App;
