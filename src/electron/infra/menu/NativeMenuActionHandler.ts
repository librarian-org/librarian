import { app, BrowserWindow, MenuItem, shell } from 'electron';
import { MenuActionHandler } from '../../data/protocols/Menu/MenuActionHandler';
import { Actions } from '../../../common/Actions';
import { AppEvent } from '../../../common/AppEvent';
import Resource from '../../data/protocols/Resource/Resource';

const actionCreate = {
  action: Actions.create,
};

type ElectronWindow = BrowserWindow | undefined;

export default class NativeMenuActionHandlers implements MenuActionHandler {
  constructor(private resources: Resource) {
    this.about = this.about.bind(this);
  }

  public newBorrow(_menuItem: MenuItem, win: ElectronWindow): void {
    if (win) {
      win.webContents.send(AppEvent.borrowTab, actionCreate);
    }
  }

  public newPerson(_menuItem: MenuItem, win: ElectronWindow): void {
    if (win) {
      win.webContents.send(AppEvent.personTab, actionCreate);
    }
  }

  public newTitle(_menuItem: MenuItem, win: ElectronWindow): void {
    if (win) {
      win.webContents.send(AppEvent.titleTab, actionCreate);
    }
  }

  public quickSearch(_menuItem: MenuItem, win: ElectronWindow): void {
    if (win) {
      win.webContents.send(AppEvent.quickSearch);
    }
  }

  closeTab(_menuItem: MenuItem, win: ElectronWindow): void {
    if (win) {
      win.webContents.send(AppEvent.closeCurrentTab);
    }
  }

  settings(_menuItem: MenuItem, win: ElectronWindow): void {
    if (win) {
      win.webContents.send(AppEvent.settingsTab);
    }
  }

  quit(): void {
    app.quit();
  }

  save(_menuItem: MenuItem, win: ElectronWindow): void {
    if (win) {
      win.webContents.send(AppEvent.save);
    }
  }

  undo(_menuItem: MenuItem, win: ElectronWindow): void {
    if (win) {
      win.webContents.undo();
    }
  }

  redo(_menuItem: MenuItem, win: ElectronWindow): void {
    if (win) {
      win.webContents.redo();
    }
  }

  cut(_menuItem: MenuItem, win: ElectronWindow): void {
    if (win) {
      win.webContents.cut();
    }
  }

  copy(_menuItem: MenuItem, win: ElectronWindow): void {
    if (win) {
      win.webContents.copy();
    }
  }

  paste(_menuItem: MenuItem, win: ElectronWindow): void {
    if (win) {
      win.webContents.paste();
    }
  }

  selectAll(_menuItem: MenuItem, win: ElectronWindow): void {
    if (win) {
      win.webContents.selectAll();
    }
  }

  darkTheme(_menuItem: MenuItem, win: ElectronWindow): void {
    if (win) {
      win.webContents.send(AppEvent.setTheme);
    }
  }

  reload(_menuItem: MenuItem, win: ElectronWindow): void {
    win.webContents.reload();
  }

  forceReload(_menuItem: MenuItem, win: ElectronWindow): void {
    if (win) {
      win.webContents.reloadIgnoringCache();
    }
  }

  toggleDevTools(_menuItem: MenuItem, win: ElectronWindow): void {
    if (win) {
      win.webContents.toggleDevTools();
    }
  }

  resetZoom(_menuItem: MenuItem, win: ElectronWindow): void {
    if (win) win.webContents.zoomLevel = 0;
  }

  zoomIn(_menuItem: MenuItem, win: ElectronWindow): void {
    if (win) win.webContents.zoomLevel = win.webContents.zoomLevel + 0.5;
  }

  zoomOut(_menuItem: MenuItem, win: ElectronWindow): void {
    if (win) win.webContents.zoomLevel = win.webContents.zoomLevel - 0.5;
  }

  fullScreen(_menuItem: MenuItem, win: ElectronWindow): void {
    if (win) win.setFullScreen(!win.isFullScreen());
  }

  minimize(_menuItem: MenuItem, win: ElectronWindow): void {
    if (win) win.minimize();
  }

  close(): void {
    app.quit();
  }

  documentation(): void {
    shell.openExternal('https://librarian-org.gitbook.io/librarian/');
  }

  reportIssue(): void {
    shell.openExternal('https://github.com/librarian-org/librarian/issues/new');
  }

  website(): void {
    shell.openExternal('https://librarian-org.github.io/');
  }

  public about(): void {
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
      iconPath: this.resources.getIcon(),
    });
    app.showAboutPanel();
  }
}
