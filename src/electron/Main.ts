import 'reflect-metadata';
import {
  app,
  BrowserWindow,
  nativeImage,
  ipcMain,
  NativeImage,
  Menu,
} from 'electron';
import { i18n } from 'i18next';
import path from 'path';
import Bootstrap from './Bootstrap';
import createMenuTemplate from './Menu';

import { Connection, createConnection } from 'typeorm';
import { Book } from './database/models/book.schema';
import { User } from './database/models/user.schema';
import { Event } from '../electron/contracts/Event';
import Maker from './database/factory/maker';

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

export default class Main {
  private bootstrap = new Bootstrap();
  private translations: i18n;
  private connection: Connection;

  public async start(): Promise<void> {
    this.handleWindowsShortcuts();
    await this.setListeners();
    await this.setConnection();
    this.setIpcMainListeners();
  }

  protected async setConnection(): Promise<void> {
    this.connection = await createConnection({
      type: 'sqlite',
      synchronize: true,
      logging: true,
      logger: 'simple-console',
      database: './src/database/database.sqlite',
      entities: [Book, User],
    });
  }

  protected async setListeners(): Promise<void> {
    app.on('ready', async () => {
      await this.createWindow();
    });

    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
        app.quit();
      }
    });

    app.on('activate', async () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        await this.createWindow();
      }
    });
  }

  protected async createWindow(): Promise<void> {
    ipcMain.on('create', async (event, content: Event[]) => {
      const repository = Maker.make(this.connection, content[0].entity);
      event.returnValue = await repository.create(content[0].value);
    });

    ipcMain.on('update', async (event, content: Event[]) => {
      const repository = Maker.make(this.connection, content[0].entity);
      event.returnValue = await repository.update(content[0].value);
    });

    ipcMain.on('delete', async (event, content: Event[]) => {
      const repository = Maker.make(this.connection, content[0].entity);
      event.returnValue = await repository.delete(content[0].value);
    });

    ipcMain.on('read', async (event, content: Event[]) => {
      const repository = Maker.make(this.connection, content[0].entity);
      event.returnValue = await repository.read(content[0].value);
    });

    ipcMain.on('list', async (event, content: Event[]) => {
      const repository = Maker.make(this.connection, content[0].entity);
      event.returnValue = await repository.list(content[0].value);
    });

    const mainWindow = new BrowserWindow({
      icon: this.getIcon(),
      height: 600,
      width: 800,
      show: false,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      },
    });

    mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

    mainWindow.webContents.openDevTools();

    mainWindow.once('ready-to-show', () => {
      mainWindow.show();
    });

    await this.handleTranslations(mainWindow);
  }

  protected getIcon(): NativeImage {
    return nativeImage.createFromPath(
      path.resolve(
        __dirname,
        '..',
        'renderer',
        'main_window',
        'assets',
        'images',
        'librarian.png'
      )
    );
  }

  protected async handleTranslations(window: BrowserWindow): Promise<void> {
    this.translations = await this.bootstrap.startI18n();

    Menu.setApplicationMenu(
      Menu.buildFromTemplate(
        await createMenuTemplate(
          window,
          this.translations,
          this.bootstrap.getLanguages()
        )
      )
    );

    this.translations.on('loaded', () => {
      this.translations.changeLanguage('en-US');
      this.translations.off('loaded');
    });

    this.translations.on('languageChanged', (lng: string) => {
      window.webContents.send('language-changed', {
        language: lng,
        namespace: 'common',
        resource: this.translations.getResourceBundle(lng, 'common'),
      });
    });
  }

  protected setIpcMainListeners(): void {
    ipcMain.on('get-initial-translations', async (event) => {
      let initial: any;
      await Promise.all(
        this.bootstrap.getLanguages().map(async (item) => {
          await this.translations.loadLanguages(item, () => {
            const lang = {
              [item]: {
                common: this.translations.getResourceBundle(item, 'common'),
              },
            };
            initial = { ...initial, ...lang };
          });
        })
      );
      event.returnValue = initial;
    });

    ipcMain.on('get-theme', (event, content) => {
      const menu = Menu.getApplicationMenu();
      menu.getMenuItemById('dark-theme').checked = content as boolean;
    });
  }

  protected handleWindowsShortcuts(): void {
    // Handle creating/removing shortcuts on Windows when installing/uninstalling.
    if (require('electron-squirrel-startup')) {
      // eslint-disable-line global-require
      app.quit();
    }
  }
}
