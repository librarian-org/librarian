import 'reflect-metadata';
import {
  app,
  BrowserWindow,
  nativeImage,
  ipcMain,
  NativeImage,
  Menu,
} from 'electron';
import isDev from 'electron-is-dev';
import updater from 'update-electron-app';
import { i18n } from 'i18next';
import path from 'path';
import Bootstrap from './Bootstrap';
import createMenuTemplate from './Menu';

import { Connection, createConnection } from 'typeorm';
import { Event } from '../electron/contracts/Event';
import Factory from './database/factory';
import { AppEvent } from '../common/AppEvent';
import fs from 'fs';
import { entityMap } from './database/EntityMap';
import RepositoryBase from './database/repository/RepositoryBase';
import TitleRepository from './database/repository/TitleRepository';

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

export default class Main {
  private bootstrap = new Bootstrap();
  private translations: i18n;
  private connection: Connection;

  public async start(): Promise<void> {
    if (!isDev) {
      updater();
    }
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
      entities: entityMap.map((entity) => entity.value),
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

  private getRepository(entity: string): RepositoryBase {
    return Factory.make(this.connection, entity);
  }

  private getCustomRepository(entity: string, repository: any): any {
    return Factory.customMake(this.connection, entity, repository);
  }

  protected async createWindow(): Promise<void> {
    ipcMain.on('create', async (event, content: Event[]) => {
      const { value, entity } = content[0];
      event.returnValue = await this.getRepository(entity).create(value);
    });

    ipcMain.on('update', async (event, content: Event[]) => {
      const { value, entity } = content[0];
      event.returnValue = await this.getRepository(entity).update(value);
    });

    ipcMain.on('softDelete', async (event, content: Event[]) => {
      const { value, entity } = content[0];
      event.returnValue = await this.getRepository(entity).softDelete(value);
    });

    ipcMain.on('delete', async (event, content: Event[]) => {
      const { value, entity } = content[0];
      event.returnValue = await this.getRepository(entity).delete(value);
    });

    ipcMain.on('read', async (event, content: Event[]) => {
      const { value, entity } = content[0];
      event.returnValue = await this.getRepository(entity).read(value);
    });

    ipcMain.on('list', async (event, content: Event[]) => {
      const { value, entity } = content[0];
      event.returnValue = await this.getRepository(entity).list(value);
    });

    ipcMain.on('listTitle', async (event, content: Event[]) => {
      const { value, entity } = content[0];
      event.returnValue = await this.getCustomRepository(
        entity,
        TitleRepository
      ).listTitle(value);
    });

    ipcMain.on('globalSearch', async (event, content: Event[]) => {
      event.returnValue = [];
    });

    const mainWindow = new BrowserWindow({
      icon: this.getIcon(),
      minWidth: 800,
      minHeight: 600,
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

  protected getSelectedLanguage(): string {
    try {
      const rawdata = fs.readFileSync('./selected-language.json');
      const language: { language: string } = JSON.parse(rawdata.toString());
      return language.language;
    } catch (err) {
      return 'en-US';
    }
  }

  protected async handleTranslations(window: BrowserWindow): Promise<void> {
    this.translations = await this.bootstrap.startI18n(
      this.getSelectedLanguage()
    );

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
      window.webContents.send(AppEvent.languageChange, {
        language: lng,
        namespace: 'common',
        resource: this.translations.getResourceBundle(lng, 'common'),
      });
    });
  }

  protected setIpcMainListeners(): void {
    ipcMain.on(AppEvent.getInitialTranslations, async (event) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

    ipcMain.on(AppEvent.getTheme, (event, content) => {
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
