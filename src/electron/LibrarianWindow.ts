import { BrowserWindow } from 'electron';
import isDev from 'electron-is-dev';
import Resource from './data/protocols/Resource/Resource';

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

export default class LibrarianWindow {
  private window: BrowserWindow | null;

  constructor(
    private resources: Resource
  ) {
    this.window = new BrowserWindow({
      icon: this.resources.getIcon(),
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

    this.window.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

    if (isDev) {
      this.window.webContents.openDevTools();
    }

    this.window.once('ready-to-show', () => {
      this.window.show();
    });
  }

  public static build(
    resources: Resource
  ): LibrarianWindow {
    return new LibrarianWindow(resources);
  }
}
