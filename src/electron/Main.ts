import { app, BrowserWindow, nativeImage, ipcMain, NativeImage } from 'electron';
import { i18n } from 'i18next';
import path from 'path';
import Bootstrap from './Bootstrap';

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

export default class Main {
  private bootstrap = new Bootstrap();
  private translations: i18n;

  public async start(): Promise<void> {
    this.handleWindowsShortcuts();
    await this.setListeners();
    this.setIpcMainListeners();
  }

  protected async setListeners(): Promise<void> {
    app.on('ready', async() => { await this.createWindow() });

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
    const mainWindow = new BrowserWindow({
      icon: this.getIcon(),
      height: 600,
      width: 800,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      }
    });

    mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

    mainWindow.webContents.openDevTools();

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

    this.translations.on('loaded', () => {
      console.log('loaded PASSOU');
      this.translations.changeLanguage('en-US');
      this.translations.off('loaded');
    });

    this.translations.on('languageChanged', (lng: string) => {
      console.log('languageChanged', lng);
      window.webContents.send('language-changed', {
        language: lng,
        namespace: 'common',
        resource: this.translations.getResourceBundle(lng, 'common'),
      });
    });
  }

  protected setIpcMainListeners(): void {
    ipcMain.on('get-initial-translations', (event) => {
      this.translations.loadLanguages('en-US', () => {
        const initial = {
          'en-US': {
            'translation': this.translations.getResourceBundle('en-US', 'common')
          }
        };
        console.log('eI18n222', initial);
        event.returnValue = initial;
      });
    });
  }

  protected handleWindowsShortcuts(): void {
    // Handle creating/removing shortcuts on Windows when installing/uninstalling.
    if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
      app.quit();
    }
  }
}
