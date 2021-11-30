import { app, BrowserWindow, Notification, shell } from 'electron';
import { i18n } from 'i18next';
import path from 'path';
import { AppEvent } from '../common/AppEvent';
import fs from 'fs';

type Language = {
  code: string;
  name: string;
}

const getIcon = (): string => {
  return path.resolve(
      __dirname,
      '..',
      'renderer',
      'main_window',
      'assets',
      'images',
      'librarian.png'
    );
}

const writeLanguageFile = (language: string) => {
  fs.writeFile('./selected-language.json', JSON.stringify({ language }, null, 4 ), (err) => {
      if (err) {
        console.error(err);  return;
      }
      console.log('File has been created');
  });
}

const createMenuTemplate = async (
  mainWindow: BrowserWindow,
  i18n: i18n,
  languages: string[],
): Promise<Electron.MenuItemConstructorOptions[]> => {
  const template: Electron.MenuItemConstructorOptions[] = [];

  await Promise.all(
    languages.map(async item => {
        await i18n.loadLanguages(item);
      })
  );

  const data = Object.entries(i18n.services.resourceStore.data);
  const lngs: Language[] = data.map((item) => {
    const l = item[1].common as Language;
    return {code: l.code, name: l.name};
  });

  const languageMenu: Electron.MenuItemConstructorOptions[] = lngs.map((lang) => {
    return {
      label: i18n.t(lang.name),
      type: 'radio',
      checked: i18n.language === lang.code,
      click: () => {
        writeLanguageFile(lang.code);
        i18n.changeLanguage(lang.code);
      }
    }
  });

  const language = {
    label: i18n.t('menu.language'),
    submenu: languageMenu
  };

  template.push({
      label: i18n.t('menu.file.label'),
      submenu: [
        {
          label: i18n.t('menu.file.newBorrow'),
          accelerator: process.platform === 'darwin' ? 'Cmd+B' : 'Ctrl+B',
          click: async() => {
            if (mainWindow) {
              mainWindow.webContents.send(AppEvent.borrowTab);
            }
          }
        },
        {
          label: i18n.t('menu.file.newPerson'),
          accelerator: process.platform === 'darwin' ? 'Cmd+P' : 'Ctrl+P',
          click: async() => {
            if (mainWindow) {
              mainWindow.webContents.send(AppEvent.personTab);
            }
          }
        },
        {
          label: i18n.t('menu.file.newTitle'),
          accelerator: process.platform === 'darwin' ? 'Cmd+T' : 'Ctrl+T',
          click: async() => {
            if (mainWindow) {
              mainWindow.webContents.send(AppEvent.titleTab);
            }
          }
        },
        { type: 'separator' },
        {
          label: i18n.t('menu.file.quickSearch'),
          accelerator: process.platform === 'darwin' ? 'Cmd+F' : 'Ctrl+F',
          click: async() => {
            if (mainWindow) {
              mainWindow.webContents.send(AppEvent.quickSearch);
            }
          }
        },
        {
          label: i18n.t('menu.file.closeTab'),
          accelerator: process.platform === 'darwin' ? 'Cmd+K' : 'Ctrl+K',
          click: async() => {
            if (mainWindow) {
              mainWindow.webContents.send(AppEvent.closeCurrentTab);
            }
          }
        },
        { type: 'separator' },
        {
          label: i18n.t('menu.file.settings'),
          accelerator: process.platform === 'darwin' ? 'Cmd+G' : 'Ctrl+G',
          click: async() => {
            if (mainWindow) {
              mainWindow.webContents.send(AppEvent.settingsTab);
            }
          }
        },
        { type: 'separator' },
        { role: 'quit', label: i18n.t('menu.quit') },
      ],
  });

  template.push({
    label: i18n.t('menu.view'),
    submenu: [
      language,
      { type: 'separator' },
      {
        label: i18n.t('menu.darkTheme'),
        id: 'dark-theme',
        type: 'checkbox',
        click: async () => {
          if (mainWindow) {
            mainWindow.webContents.send(AppEvent.setTheme);
          }
        },
      },
      { type: 'separator' },
      { role: 'reload', label: i18n.t('menu.reload') },
      { role: 'forceReload', label: i18n.t('menu.forceReload') },
      { role: 'toggleDevTools', label: i18n.t('menu.toggleDevTools') },
      { type: 'separator' },
      { role: 'resetZoom', label: i18n.t('menu.resetZoom') },
      { role: 'zoomIn', label: i18n.t('menu.zoomIn') },
      { role: 'zoomOut', label: i18n.t('menu.zoomOut') },
      { type: 'separator' },
      { role: 'togglefullscreen', label: i18n.t('menu.fullScreen') },
    ],
  });


  template.push({
    label: i18n.t('menu.window'),
    submenu: [
      { role: 'minimize', label: i18n.t('menu.minimize') },
      { role: 'zoom', label: i18n.t('menu.zoom') },
      { role: 'close', label: i18n.t('menu.close') },
    ],
  });

  template.push({
      role: 'help',
      label: i18n.t('menu.help.label'),
      submenu: [
        {
          label: i18n.t('menu.help.documentation'),
          click: async () => {
            shell.openExternal('https://librarian-org.gitbook.io/librarian/');
          },
        },
        {
          label: i18n.t('menu.help.reportIssue'),
          click: async () => {
            shell.openExternal('https://github.com/librarian-org/librarian/issues/new');
          },
        },
        { type: 'separator' },
        {
          id: 'about-menu',
          label: i18n.t('menu.help.about'),
          click: async () => {
            app.setAboutPanelOptions({
              applicationName: 'Librarian',
              applicationVersion: app.getVersion(),
              copyright: 'Librarian Team',
              authors: ['Danilo Lutz', 'André Gava', 'All the amazing Github contributors'],
              website: 'https://github.com/librarian-org/librarian',
              iconPath: getIcon(),
            });
            app.showAboutPanel()
          },
        },
      ],
    });

  return template;
}

export default createMenuTemplate;
