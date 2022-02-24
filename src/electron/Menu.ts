import {
  app,
  BrowserWindow,
  shell,
  MenuItemConstructorOptions,
} from 'electron';
import path from 'path';
import { AppEvent } from '../common/AppEvent';
import fs from 'fs';
import { Actions } from '../common/Actions';
import I18nAdapter from './infra/i18n/i18nAdapter';

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
};

const writeLanguageFile = (language: string) => {
  fs.writeFile(
    './selected-language.json',
    JSON.stringify({ language }, null, 4),
    (err) => {
      if (err) {
        console.error(err);
        return;
      }
    }
  );
};

const createMenuTemplate = async (
  mainWindow: BrowserWindow,
  i18nAdapter: I18nAdapter
): Promise<MenuItemConstructorOptions[]> => {
  const template: MenuItemConstructorOptions[] = [];

  const langs = await i18nAdapter.getLanguages();

  const languageMenu: MenuItemConstructorOptions[] = langs.map((lang) => {
    return {
      label: i18nAdapter.translate(lang.name),
      type: 'radio',
      checked: i18nAdapter.currentLanguage() === lang.code,
      enabled: i18nAdapter.currentLanguage() !== lang.code,
      click: () => {
        writeLanguageFile(lang.code);
        i18nAdapter.changeLanguage(lang.code);
      },
    };
  });

  const language = {
    label: i18nAdapter.translate('menu.language'),
    submenu: languageMenu,
  };

  const actionCreate = {
    action: Actions.create,
  };

  template.push({
    label: i18nAdapter.translate('menu.file.label'),
    submenu: [
      {
        label: i18nAdapter.translate('menu.file.newBorrow'),
        accelerator: process.platform === 'darwin' ? 'Cmd+B' : 'Ctrl+B',
        click: async () => {
          if (mainWindow) {
            mainWindow.webContents.send(AppEvent.borrowTab, actionCreate);
          }
        },
      },
      {
        label: i18nAdapter.translate('menu.file.newPerson'),
        accelerator: process.platform === 'darwin' ? 'Cmd+P' : 'Ctrl+P',
        click: async () => {
          if (mainWindow) {
            mainWindow.webContents.send(AppEvent.personTab, actionCreate);
          }
        },
      },
      {
        label: i18nAdapter.translate('menu.file.newTitle'),
        accelerator: process.platform === 'darwin' ? 'Cmd+T' : 'Ctrl+T',
        click: async () => {
          if (mainWindow) {
            mainWindow.webContents.send(AppEvent.titleTab, actionCreate);
          }
        },
      },
      { type: 'separator' },
      {
        label: i18nAdapter.translate('menu.file.quickSearch'),
        accelerator: process.platform === 'darwin' ? 'Cmd+F' : 'Ctrl+F',
        click: async () => {
          if (mainWindow) {
            mainWindow.webContents.send(AppEvent.quickSearch);
          }
        },
      },
      {
        label: i18nAdapter.translate('menu.file.closeTab'),
        accelerator: process.platform === 'darwin' ? 'Cmd+K' : 'Ctrl+K',
        click: async () => {
          if (mainWindow) {
            mainWindow.webContents.send(AppEvent.closeCurrentTab);
          }
        },
      },
      { type: 'separator' },
      {
        label: i18nAdapter.translate('menu.file.settings'),
        accelerator: process.platform === 'darwin' ? 'Cmd+G' : 'Ctrl+G',
        click: async () => {
          if (mainWindow) {
            mainWindow.webContents.send(AppEvent.settingsTab);
          }
        },
      },
      { type: 'separator' },
      { role: 'quit', label: i18nAdapter.translate('menu.quit') },
    ],
  });

  template.push({
    label: i18nAdapter.translate('menu.edit.label'),
    submenu: [
      {
        label: i18nAdapter.translate('menu.edit.undo'),
        accelerator: process.platform === 'darwin' ? 'Cmd+Z' : 'Ctrl+Z',
        click: async () => {
          if (mainWindow) {
            mainWindow.webContents.undo();
          }
        },
      },
      {
        label: i18nAdapter.translate('menu.edit.redo'),
        accelerator:
          process.platform === 'darwin' ? 'Cmd+Option+Z' : 'Ctrl+Shift+Z',
        click: async () => {
          if (mainWindow) {
            mainWindow.webContents.redo();
          }
        },
      },
      { type: 'separator' },
      {
        label: i18nAdapter.translate('menu.edit.cut'),
        accelerator: process.platform === 'darwin' ? 'Cmd+X' : 'Ctrl+X',
        click: async () => {
          if (mainWindow) {
            mainWindow.webContents.cut();
          }
        },
      },
      {
        label: i18nAdapter.translate('menu.edit.copy'),
        accelerator: process.platform === 'darwin' ? 'Cmd+C' : 'Ctrl+C',
        click: async () => {
          if (mainWindow) {
            mainWindow.webContents.copy();
          }
        },
      },
      {
        label: i18nAdapter.translate('menu.edit.paste'),
        accelerator: process.platform === 'darwin' ? 'Cmd+V' : 'Ctrl+V',
        click: async () => {
          if (mainWindow) {
            mainWindow.webContents.paste();
          }
        },
      },
      { type: 'separator' },
      {
        label: i18nAdapter.translate('menu.edit.selectAll'),
        accelerator: process.platform === 'darwin' ? 'Cmd+A' : 'Ctrl+A',
        click: async () => {
          if (mainWindow) {
            mainWindow.webContents.selectAll();
          }
        },
      },
    ],
  });

  template.push({
    label: i18nAdapter.translate('menu.view'),
    submenu: [
      language,
      { type: 'separator' },
      {
        label: i18nAdapter.translate('menu.darkTheme'),
        id: 'dark-theme',
        type: 'checkbox',
        click: async () => {
          if (mainWindow) {
            mainWindow.webContents.send(AppEvent.setTheme);
          }
        },
      },
      { type: 'separator' },
      { role: 'reload', label: i18nAdapter.translate('menu.reload') },
      { role: 'forceReload', label: i18nAdapter.translate('menu.forceReload') },
      {
        role: 'toggleDevTools',
        label: i18nAdapter.translate('menu.toggleDevTools'),
      },
      { type: 'separator' },
      { role: 'resetZoom', label: i18nAdapter.translate('menu.resetZoom') },
      { role: 'zoomIn', label: i18nAdapter.translate('menu.zoomIn') },
      { role: 'zoomOut', label: i18nAdapter.translate('menu.zoomOut') },
      { type: 'separator' },
      {
        role: 'togglefullscreen',
        label: i18nAdapter.translate('menu.fullScreen'),
      },
    ],
  });

  template.push({
    label: i18nAdapter.translate('menu.window'),
    submenu: [
      { role: 'minimize', label: i18nAdapter.translate('menu.minimize') },
      { role: 'zoom', label: i18nAdapter.translate('menu.zoom') },
      { role: 'close', label: i18nAdapter.translate('menu.close') },
    ],
  });

  template.push({
    role: 'help',
    label: i18nAdapter.translate('menu.help.label'),
    submenu: [
      {
        label: i18nAdapter.translate('menu.help.documentation'),
        click: async () => {
          shell.openExternal('https://librarian-org.gitbook.io/librarian/');
        },
      },
      {
        label: i18nAdapter.translate('menu.help.reportIssue'),
        click: async () => {
          shell.openExternal(
            'https://github.com/librarian-org/librarian/issues/new'
          );
        },
      },
      {
        label: i18nAdapter.translate('menu.help.website'),
        click: async () => {
          shell.openExternal('https://librarian-org.github.io/');
        },
      },
      { type: 'separator' },
      {
        id: 'about-menu',
        label: i18nAdapter.translate('menu.help.about'),
        click: async () => {
          app.setAboutPanelOptions({
            applicationName: 'Librarian',
            applicationVersion: app.getVersion(),
            copyright: 'Librarian Team',
            authors: [
              'Danilo Lutz',
              'André Gava',
              'All the amazing Github contributors',
            ],
            website: 'https://github.com/librarian-org/librarian',
            iconPath: getIcon(),
          });
          app.showAboutPanel();
        },
      },
    ],
  });

  return template;
};

export default createMenuTemplate;
