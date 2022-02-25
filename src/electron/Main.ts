import 'reflect-metadata';
import { app, BrowserWindow, ipcMain, Menu } from 'electron';
import log from 'electron-log';
import isDev from 'electron-is-dev';
import updater from 'update-electron-app';

import { Connection, createConnection } from 'typeorm';
import { Event } from '../electron/contracts/Event';
import Factory from './database/factory';
import { entityMap } from './database/EntityMap';
import RepositoryBase from './database/repository/RepositoryBase';
import TitleRepository from './database/repository/TitleRepository';
import BorrowRepository from './database/repository/BorrowRepository';
import TitlePublisherRepository from './database/repository/TitlePublisherRepository';
import UserRepository from './database/repository/UserRepository';
import PersonRepository from './database/repository/PersonRepository';
import I18nAdapter from './infra/i18n/i18nAdapter';
import Resources from './infra/resources/Resources';
import LibrarianWindow from './LibrarianWindow';
import DefaultMenu from './infra/menu/DefaultMenu';
import { AppEvent } from '../common/AppEvent';
import NativeMenuActionHandlers from './infra/menu/NativeMenuActionHandler';
import RepositoryFactory from './infra/db/factories/RepositoryFactory';
import ListenerFactory from './infra/listen/factories/ListenerFactory';

export default class Main {
  private connection: Connection;
  private adapter = new I18nAdapter();
  private resources = new Resources();

  public async initialize(): Promise<void> {
    if (!isDev && process.platform !== 'linux') {
      updater({
        logger: log,
      });
    }
    this.handleWindowsShortcuts();
    this.setIpcMainListeners();
    await this.setListeners();
  }

  protected async setConnection(): Promise<void> {
    try {
      this.connection = await createConnection({
        type: 'sqlite',
        migrationsRun: true,
        migrations: this.resources.getMigrationPath(),
        logging: isDev,
        logger: 'simple-console',
        database: this.resources.getDatabasePath(),
        entities: entityMap.map((entity) => entity.value),
      });
    } catch (err) {
      log.error(err);
      app.on('ready', () => app.quit());
    }
  }

  protected async setListeners(): Promise<void> {
    app.on('ready', async () => {
      LibrarianWindow.build(this.resources);

      await this.adapter.initialize(this.resources.getSelectedLanguage());
      await this.adapter.load(this.resources.getLanguages());

      this.adapter.onLoaded();
      this.adapter.onLanguageChanged((language: string) => {
        const win = BrowserWindow.getFocusedWindow();
        if (win) {
          win.webContents.send(AppEvent.languageChange, {
            language,
            namespace: 'common',
            resource: this.adapter.getResource(language),
          });
        }
      });

      const handler = new NativeMenuActionHandlers(this.resources);

      const menu = new DefaultMenu(this.adapter, this.resources, handler);
      Menu.setApplicationMenu(
        Menu.buildFromTemplate(await menu.buildTemplate())
      );

      await this.setConnection();
      await this.loadListeners();
    });

    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
        app.quit();
      }
    });

    app.on('activate', async () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        // await this.createWindow();
      }
    });
  }

  private getRepository(entity: string): RepositoryBase {
    return Factory.make(this.connection, entity);
  }

  private getCustomRepository(entity: string, repository: any): any {
    return Factory.customMake(this.connection, entity, repository);
  }

  protected async loadListeners(): Promise<void> {
    const repositoryFactory = new RepositoryFactory(this.connection);
    const listenerFactory = new ListenerFactory(repositoryFactory);

    const availableListeners = listenerFactory.getAvailableListeners();

    const listeners = availableListeners.map((name) => {
      const instance = listenerFactory.make(name);
      return { name, instance };
    });

    listeners.map((listener) => {
      ipcMain.on(listener.name, async (event, content: Event[]) => {
        await listener.instance.handler(event, content);
      });
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

    ipcMain.on('globalSearch', async (event) => {
      try {
        event.returnValue = [];
      } catch (err) {
        log.error(err);
      }
    });
  }

  public setIpcMainListeners(): void {
    ipcMain.on(AppEvent.getInitialTranslations, async (event) => {
      event.returnValue = await this.adapter.loadAditional(
        this.resources.getLanguages()
      );
    });

    ipcMain.on(AppEvent.getTheme, (_event, content) => {
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
