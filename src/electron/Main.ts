import 'reflect-metadata';
import { app, BrowserWindow, ipcMain, IpcMainEvent, Menu } from 'electron';
import log from 'electron-log';
import isDev from 'electron-is-dev';
import updater from 'update-electron-app';

import { Connection, createConnection, EntitySchema } from 'typeorm';
import { Event } from '../electron/contracts/Event';
import DefaultResources from './infra/resources/DefaultResources';
import LibrarianWindow from './LibrarianWindow';
import DefaultMenu from './infra/menu/DefaultMenu';
import { AppEvent } from '../common/AppEvent';

import NativeMenuActionHandlers from './infra/menu/NativeMenuActionHandler';
import RepositoryFactory from './infra/db/factories/RepositoryFactory';
import ListenersConfigs from './infra/listeners/ListenersConfigs';
import I18NextAdapter from './infra/i18n/I18NextAdapter';
import I18nAdapter from './data/protocols/I18n/I18n';
import Resource from './data/protocols/Resource/Resource';
import EntitiesConfigs from './database/EntitiesConfigs';
import { Repository } from './data/protocols';

export default class Main {
  private connection: Connection;
  private adapter: I18nAdapter = new I18NextAdapter();
  private resources: Resource = new DefaultResources();

  public async initialize(): Promise<void> {
    if (!isDev && process.platform !== 'linux') {
      updater({
        logger: log,
      });
    }
    this.handleWindowsShortcuts();
    this.setIpcMainListeners();
    await this.setMainListeners();
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
        entities: EntitiesConfigs.getEntities() as EntitySchema[],
      });
    } catch (err) {
      log.error(err);
      app.on('ready', () => app.quit());
    }
  }

  protected async setMainListeners(): Promise<void> {
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
      await this.setCustomListeners();
    });

    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
        app.quit();
      }
    });

    app.on('activate', async () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        LibrarianWindow.build(this.resources);
      }
    });
  }

  protected async setCustomListeners(): Promise<void> {
    const repositoryFactory = new RepositoryFactory(this.connection);

    const listeners = ListenersConfigs.getListeners();

    listeners.map((listener) => {
      ipcMain.on(
        listener.listenerName,
        async (event: IpcMainEvent, content: Event[]) => {
          try {
            let repository: Repository;
            if (content[0] === undefined) {
              repository = repositoryFactory.make(listener.repositoryName);
              event.returnValue = await repository.execute();
              return;
            }

            const { value, entity } = content[0];
            repository = repositoryFactory.make(
              listener.repositoryName,
              entity
            );
            event.returnValue = await repository.execute(value);
          } catch (err) {
            log.error(err);
          }
        }
      );
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
