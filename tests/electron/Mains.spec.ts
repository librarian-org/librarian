import Main from '@electron/Main';
import LibrarianWindow from '@electron/LibrarianWindow';
import Resource from '@electron/data/protocols/Resource/Resource';
import DefaultResources from '@electron/infra/resources/DefaultResources';

import I18nAdapter from '@electron/data/protocols/I18n/I18n';
import I18NextAdapter from '@electron/infra/i18n/I18NextAdapter';
import * as electron from 'electron';

jest.mock('electron');

let resources: Resource;
let i18nAdapter: I18nAdapter;
let appWindow: LibrarianWindow;

describe('Main', () => {
  beforeEach(() => {
    resources = new DefaultResources();
    i18nAdapter = new I18NextAdapter();
    // i18nAdapter.initialize();
    appWindow = new LibrarianWindow(resources);

    // jest.spyOn(electron.app, 'isPackaged', 'get').mockImplementation(() => {
    //   return false;
    // });
  });

  it('should check for updates', async () => {
    const actual = new Main(resources, i18nAdapter, appWindow);
    actual.initialize();
    console.log(actual);
  });

  // it('should connect to database', async () => {
  //   // const main = new Main();
  // });

  // it('should handle window shortcut', () => {
  //   //
  // });

  // it('should set ipcMain handlers', () => {
  //   //
  // });

  // it('should set listeners', async () => {
  //   //
  // });
});
