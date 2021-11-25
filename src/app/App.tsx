import React, { useCallback, useEffect } from 'react';
import { DefaultTheme, ThemeProvider } from 'styled-components';
import LanguageSelector from './components/I18n/LanguageSelector';
import usePersistedState from './hooks/usePersistedState';

import GlobalStyle from './styles/global';
import light from './styles/themes/light';
import dark from './styles/themes/dark';
import Header from './components/Header';
import Content from './components/Content';
import Card from './components/Card';
import Button from './components/Button';
import Input from './components/Input';
import { FiAlignJustify } from 'react-icons/fi';

const App: React.FC = () => {
  const [theme, setTheme] = usePersistedState<DefaultTheme>(
    '@librarian:theme',
    light
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
      <Header>
        <LanguageSelector />
      </Header>
      <Content>
        <Card title="home.message">
          <Input
            name="input"
            icon={FiAlignJustify}
            label="Input"
            placeholder="Type something here..."
           />
          <br /><br />
          <Button>Default</Button>
          <Button color="primary">Primary</Button>
          <Button color="secondary">Secondary</Button>
        </Card>
      </Content>
      <GlobalStyle />
    </ThemeProvider>
  );
};

export default App;
