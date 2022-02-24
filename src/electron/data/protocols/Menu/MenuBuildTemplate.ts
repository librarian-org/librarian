import { BrowserWindow, MenuItemConstructorOptions } from 'electron';
import Resources from '../../../infra/resources/Resources';
import I18nAdapter from '../../../infra/i18n/i18nAdapter';

export interface MenuBuildTemplate {
  buildTemplate(
    mainWindow: BrowserWindow,
    i18nAdapter: I18nAdapter,
    resources: Resources
  ): Promise<MenuItemConstructorOptions[]>;
}
