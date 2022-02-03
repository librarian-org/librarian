import React, { useCallback, useEffect } from 'react';
import { DefaultTheme, ThemeProvider } from 'styled-components';
import usePersistedState from './hooks/usePersistedState';

import GlobalStyle from './styles/global';
import light from './styles/themes/light';
import dark from './styles/themes/dark';
import { AppEvent } from '../common/AppEvent';
import { HashRouter } from 'react-router-dom';
import Router from './router';
import { AuthProvider } from './hooks/auth';
import { ToastProvider } from './hooks/toast';

const App: React.FC = () => {
  const [theme, setTheme] = usePersistedState<DefaultTheme>(
    '@librarian:theme',
    light
  );

  useEffect(() => {
    window.api.send(AppEvent.getTheme, theme.title === 'dark');
  }, [theme.title]);

  const toggleTheme = useCallback(() => {
    setTheme(theme.title === 'light' ? dark : light);
  }, [setTheme, theme]);

  window.api.removeAllListeners(AppEvent.setTheme);
  window.api.once(AppEvent.setTheme, async () => {
    toggleTheme();
  });

  return (
    <ThemeProvider theme={theme}>
      <HashRouter>
        <ToastProvider>
          <AuthProvider>
            <Router />
          </AuthProvider>
        </ToastProvider>
      </HashRouter>
      <GlobalStyle />
    </ThemeProvider>
  );
};

export default App;
