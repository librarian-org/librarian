import { BrowserWindow, MenuItemConstructorOptions } from 'electron';
import Resources from '../../../infra/resources/DefaultResources';
import I18nAdapter from '../I18n/I18n';

export interface MenuBuildTemplate {
  buildTemplate(
    mainWindow: BrowserWindow,
    i18nAdapter: I18nAdapter,
    resources: Resources
  ): Promise<MenuItemConstructorOptions[]>;
}
