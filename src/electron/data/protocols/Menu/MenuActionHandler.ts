import { BrowserWindow, MenuItem } from 'electron';

type ElectronWindow = BrowserWindow | undefined;

export interface MenuActionHandler {
  showDashboard: (menuItem: MenuItem, win: ElectronWindow) => void;
  newBorrow: (menuItem: MenuItem, win: ElectronWindow) => void;
  newPerson: (menuItem: MenuItem, win: ElectronWindow) => void;
  newTitle: (menuItem: MenuItem, win: ElectronWindow) => void;
  quickSearch: (menuItem: MenuItem, win: ElectronWindow) => void;
  closeTab: (menuItem: MenuItem, win: ElectronWindow) => void;
  settings: (menuItem: MenuItem, win: ElectronWindow) => void;
  quit: (menuItem: MenuItem, win: ElectronWindow) => void;
  save: (menuItem: MenuItem, win: ElectronWindow) => void;

  undo: (menuItem: MenuItem, win: ElectronWindow) => void;
  redo: (menuItem: MenuItem, win: ElectronWindow) => void;
  cut: (menuItem: MenuItem, win: ElectronWindow) => void;
  copy: (menuItem: MenuItem, win: ElectronWindow) => void;
  paste: (menuItem: MenuItem, win: ElectronWindow) => void;
  selectAll: (menuItem: MenuItem, win: ElectronWindow) => void;

  darkTheme: (menuItem: MenuItem, win: ElectronWindow) => void;
  reload: (menuItem: MenuItem, win: ElectronWindow) => void;
  forceReload: (menuItem: MenuItem, win: ElectronWindow) => void;
  toggleDevTools: (menuItem: MenuItem, win: ElectronWindow) => void;
  resetZoom: (menuItem: MenuItem, win: ElectronWindow) => void;
  zoomIn: (menuItem: MenuItem, win: ElectronWindow) => void;
  zoomOut: (menuItem: MenuItem, win: ElectronWindow) => void;
  fullScreen: (menuItem: MenuItem, win: ElectronWindow) => void;

  minimize: (menuItem: MenuItem, win: ElectronWindow) => void;
  close: (menuItem: MenuItem, win: ElectronWindow) => void;

  documentation: (menuItem: MenuItem, win: ElectronWindow) => void;
  reportIssue: (menuItem: MenuItem, win: ElectronWindow) => void;
  website: (menuItem: MenuItem, win: ElectronWindow) => void;
  showLogs: (menuItem: MenuItem, win: ElectronWindow) => void;
  about: (menuItem: MenuItem, win: ElectronWindow) => void;
}
