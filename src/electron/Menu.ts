import { BrowserWindow } from 'electron';

export default function createMenuTemplate(
  mainWindow: BrowserWindow,
): Electron.MenuItemConstructorOptions[] {
  const template: Electron.MenuItemConstructorOptions[] = [
    {
      label: 'Arquivo',
      submenu: [
        { role: 'quit', label: 'Sair' },
      ],
    },
    {
      label: 'Visualizar',
      submenu: [
        {
          label: 'Tema Escuro',
          id: 'dark-theme',
          type: 'checkbox',
          click: async () => {
            if (mainWindow) {
              mainWindow.webContents.send('set-theme');
            }
          },
        },
        { role: 'reload', label: 'Recarregar' },
        { role: 'forceReload', label: 'Forçar recarregamento' },
        { role: 'toggleDevTools', label: 'Alternar Ferramentas e dev' },
        { type: 'separator' },
        { role: 'resetZoom', label: 'Redefinir zoom' },
        { role: 'zoomIn', label: 'Ampliar' },
        { role: 'zoomOut', label: 'Reduzir' },
        { type: 'separator' },
        { role: 'togglefullscreen', label: 'Tela cheia' },
      ],
    },
    {
      label: 'Janela',
      submenu: [
        { role: 'minimize', label: 'Minimizar' },
        { role: 'zoom', label: 'Zoom' },
        { role: 'close', label: 'Fechar' },
      ],
    },
    {
      role: 'help',
      label: 'Ajuda',
      submenu: [
        {
          id: 'about-menu',
          label: 'Sobre',
          click: async () => {
            if (mainWindow) {
              mainWindow.webContents.send('about', true);
            }
          },
        },
      ],
    },
  ];

  return template;
}
