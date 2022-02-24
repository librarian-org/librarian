import 'reflect-metadata';
import {
  app,
  BrowserWindow,
  nativeImage,
  ipcMain,
  NativeImage,
  Menu,
} from 'electron';
import log from 'electron-log';
import isDev from 'electron-is-dev';
import updater from 'update-electron-app';
import path from 'path';
import createMenuTemplate from './Menu';

import { Connection, createConnection } from 'typeorm';
import { Event } from '../electron/contracts/Event';
import Factory from './database/factory';
import { AppEvent } from '../common/AppEvent';
import fs from 'fs';
import { entityMap } from './database/EntityMap';
import RepositoryBase from './database/repository/RepositoryBase';
import TitleRepository from './database/repository/TitleRepository';
import BorrowRepository from './database/repository/BorrowRepository';
import TitlePublisherRepository from './database/repository/TitlePublisherRepository';
import UserRepository from './database/repository/UserRepository';
import PersonRepository from './database/repository/PersonRepository';
import { I18nAdapter } from './infra/i18n/i18nAdapter';

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

export default class Main {
  private adapter = new I18nAdapter();
  private connection: Connection;

  public async initialize(): Promise<void> {
    if (!isDev && process.platform !== 'linux') {
      updater({
        logger: log,
      });
    }
    this.handleWindowsShortcuts();
    await this.setListeners();
    await this.setConnection();
    this.setIpcMainListeners();
  }

  private getDatabasePath(): string {
    const devPath = './database/database.sqlite';
    const prodPath = path.resolve(
      app.getPath('appData'),
      app.name,
      'database.sqlite'
    );
    return isDev ? devPath : prodPath;
  }

  private getMigrationPath(): string[] {
    return [
      path.resolve(
        __dirname,
        '..',
        'renderer',
        'main_window',
        'database',
        'migration',
        '*.js'
      ),
    ];
  }

  protected async setConnection(): Promise<void> {
    try {
      this.connection = await createConnection({
        type: 'sqlite',
        migrationsRun: true,
        migrations: this.getMigrationPath(),
        logging: isDev,
        logger: 'simple-console',
        database: this.getDatabasePath(),
        entities: entityMap.map((entity) => entity.value),
      });
    } catch (err) {
      log.error(err);
      app.on('ready', () => app.quit());
    }
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
      try {
        const { value, entity } = content[0];
        event.returnValue = await this.getRepository(entity).create(value);
      } catch (err) {
        log.error(err);
      }
    });

    ipcMain.on('update', async (event, content: Event[]) => {
      try {
        const { value, entity } = content[0];
        event.returnValue = await this.getRepository(entity).update(value);
      } catch (err) {
        log.error(err);
      }
    });

    ipcMain.on('softDelete', async (event, content: Event[]) => {
      try {
        const { value, entity } = content[0];
        event.returnValue = await this.getRepository(entity).softDelete(value);
      } catch (err) {
        log.error(err);
      }
    });

    ipcMain.on('delete', async (event, content: Event[]) => {
      try {
        const { value, entity } = content[0];
        event.returnValue = await this.getRepository(entity).delete(value);
      } catch (err) {
        log.error(err);
      }
    });

    ipcMain.on('read', async (event, content: Event[]) => {
      try {
        const { value, entity } = content[0];
        event.returnValue = await this.getRepository(entity).read(value);
      } catch (err) {
        log.error(err);
      }
    });

    ipcMain.on('list', async (event, content: Event[]) => {
      try {
        const { value, entity } = content[0];
        event.returnValue = await this.getRepository(entity).list(value);
      } catch (err) {
        log.error(err);
      }
    });

    ipcMain.on('listTitle', async (event, content: Event[]) => {
      try {
        const { value, entity } = content[0];
        event.returnValue = await this.getCustomRepository(
          entity,
          TitleRepository
        ).listTitle(value);
      } catch (err) {
        log.error(err);
      }
    });

    ipcMain.on('readTitle', async (event, content: Event[]) => {
      try {
        const { value, entity } = content[0];
        event.returnValue = await this.getCustomRepository(
          entity,
          TitleRepository
        ).read(value);
      } catch (err) {
        log.error(err);
      }
    });

    ipcMain.on('listPerson', async (event, content: Event[]) => {
      try {
        const { value, entity } = content[0];
        event.returnValue = await this.getCustomRepository(
          entity,
          PersonRepository
        ).listPerson(value);
      } catch (err) {
        log.error(err);
      }
    });

    ipcMain.on('readPerson', async (event, content: Event[]) => {
      try {
        const { value, entity } = content[0];
        event.returnValue = await this.getCustomRepository(
          entity,
          PersonRepository
        ).read(value);
      } catch (err) {
        log.error(err);
      }
    });

    ipcMain.on('listBorrow', async (event, content: Event[]) => {
      try {
        const { value, entity } = content[0];
        event.returnValue = await this.getCustomRepository(
          entity,
          BorrowRepository
        ).list(value);
      } catch (err) {
        log.error(err);
      }
    });

    ipcMain.on('readBorrow', async (event, content: Event[]) => {
      try {
        const { value, entity } = content[0];
        event.returnValue = await this.getCustomRepository(
          entity,
          BorrowRepository
        ).read(value);
      } catch (err) {
        log.error(err);
      }
    });

    ipcMain.on('readReservation', async (event, content: Event[]) => {
      try {
        const { value, entity } = content[0];
        event.returnValue = await this.getCustomRepository(
          entity,
          BorrowRepository
        ).readReservation(value);
      } catch (err) {
        log.error(err);
      }
    });

    ipcMain.on('updateRenovation', async (event, content: Event[]) => {
      try {
        const { value, entity } = content[0];
        event.returnValue = await this.getCustomRepository(
          entity,
          BorrowRepository
        ).updateRenovation(value);
      } catch (err) {
        log.error(err);
      }
    });

    ipcMain.on('returns', async (event, content: Event[]) => {
      try {
        const { value, entity } = content[0];
        event.returnValue = await this.getCustomRepository(
          entity,
          BorrowRepository
        ).returns(value);
      } catch (err) {
        log.error(err);
      }
    });

    ipcMain.on('borrowByReservation', async (event, content: Event[]) => {
      try {
        const { value, entity } = content[0];
        event.returnValue = await this.getCustomRepository(
          entity,
          BorrowRepository
        ).borrowByReservation(value);
      } catch (err) {
        log.error(err);
      }
    });

    ipcMain.on('userLogin', async (event, content: Event[]) => {
      try {
        const { value, entity } = content[0];
        event.returnValue = await this.getCustomRepository(
          entity,
          UserRepository
        ).login(value);
      } catch (err) {
        log.error(err);
      }
    });

    ipcMain.on('userCreate', async (event, content: Event[]) => {
      try {
        const { value, entity } = content[0];
        event.returnValue = await this.getCustomRepository(
          entity,
          UserRepository
        ).create(value);
      } catch (err) {
        log.error(err);
      }
    });

    ipcMain.on('userUpdate', async (event, content: Event[]) => {
      try {
        const { value, entity } = content[0];
        event.returnValue = await this.getCustomRepository(
          entity,
          UserRepository
        ).update(value);
      } catch (err) {
        log.error(err);
      }
    });

    ipcMain.on('changePassword', async (event, content: Event[]) => {
      try {
        const { value, entity } = content[0];
        event.returnValue = await this.getCustomRepository(
          entity,
          UserRepository
        ).changePassword(value);
      } catch (err) {
        log.error(err);
      }
    });

    ipcMain.on('listEdition', async (event, content: Event[]) => {
      try {
        const { value, entity } = content[0];
        event.returnValue = await this.getCustomRepository(
          entity,
          TitlePublisherRepository
        ).listTitle(value);
      } catch (err) {
        log.error(err);
      }
    });

    ipcMain.on('globalSearch', async (event, content: Event[]) => {
      try {
        event.returnValue = [];
      } catch (err) {
        log.error(err);
      }
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

    if (isDev) {
      mainWindow.webContents.openDevTools();
    }

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

  private getLanguages(): string[] {
    const folder = path.resolve(
      __dirname,
      '..',
      'renderer',
      'main_window',
      'locales'
    );

    const langs = fs.readdirSync(folder);
    return langs;
  }

  protected async handleTranslations(window: BrowserWindow): Promise<void> {
    await this.adapter.initialize(this.getSelectedLanguage());
    await this.adapter.load(this.getLanguages());

    Menu.setApplicationMenu(
      Menu.buildFromTemplate(await createMenuTemplate(window, this.adapter))
    );

    this.adapter.onLoaded();

    this.adapter.onLanguageChanged((language: string) => {
      window.webContents.send(AppEvent.languageChange, {
        language,
        namespace: 'common',
        resource: this.adapter.getResource(language),
      });
    });
  }

  protected setIpcMainListeners(): void {
    ipcMain.on(AppEvent.getInitialTranslations, async (event) => {
      event.returnValue = await this.adapter.loadAditional(
        this.getLanguages()
      );
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
