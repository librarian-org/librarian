import { MenuItemConstructorOptions } from 'electron';
import I18nAdapter from '../../data/protocols/I18n/I18n';
import { MenuActionHandler, MenuBuildTemplate } from '../../data/protocols';

import Resource from '../../data/protocols/Resource/Resource';

export default class DefaultMenu implements MenuBuildTemplate {
  constructor(
    private i18nAdapter: I18nAdapter,
    private resources: Resource,
    private actionHandler: MenuActionHandler
  ) {}

  private buildFileMenu(): MenuItemConstructorOptions[] {
    return [
      {
        label: this.i18nAdapter.translate('menu.file.label'),
        submenu: [
          {
            label: this.i18nAdapter.translate('menu.file.newBorrow'),
            accelerator: 'Ctrl+B',
            click: this.actionHandler.newBorrow,
          },
          {
            label: this.i18nAdapter.translate('menu.file.newPerson'),
            accelerator: 'Ctrl+P',
            click: this.actionHandler.newPerson,
          },
          {
            label: this.i18nAdapter.translate('menu.file.newTitle'),
            accelerator: 'Ctrl+T',
            click: this.actionHandler.newTitle,
          },
          { type: 'separator' },
          {
            label: this.i18nAdapter.translate('menu.file.quickSearch'),
            accelerator: 'Ctrl+F',
            click: this.actionHandler.quickSearch,
          },
          {
            label: this.i18nAdapter.translate('menu.file.closeTab'),
            accelerator: 'Ctrl+K',
            click: this.actionHandler.closeTab,
          },
          { type: 'separator' },
          {
            label: this.i18nAdapter.translate('menu.file.settings'),
            accelerator: 'Ctrl+G',
            click: this.actionHandler.settings,
          },
          { type: 'separator' },
          { role: 'quit', label: this.i18nAdapter.translate('menu.quit') },
        ],
      },
    ];
  }

  private buildEditMenu(): MenuItemConstructorOptions[] {
    return [
      {
        label: this.i18nAdapter.translate('menu.edit.label'),
        submenu: [
          {
            label: this.i18nAdapter.translate('menu.edit.undo'),
            accelerator: 'Ctrl+Z',
            click: this.actionHandler.undo,
          },
          {
            label: this.i18nAdapter.translate('menu.edit.redo'),
            accelerator: 'Ctrl+Shift+Z',
            click: this.actionHandler.redo,
          },
          { type: 'separator' },
          {
            label: this.i18nAdapter.translate('menu.edit.cut'),
            accelerator: 'Ctrl+X',
            click: this.actionHandler.cut,
          },
          {
            label: this.i18nAdapter.translate('menu.edit.copy'),
            accelerator: 'Ctrl+C',
            click: this.actionHandler.copy,
          },
          {
            label: this.i18nAdapter.translate('menu.edit.paste'),
            accelerator: 'Ctrl+V',
            click: this.actionHandler.paste,
          },
          { type: 'separator' },
          {
            label: this.i18nAdapter.translate('menu.edit.selectAll'),
            accelerator: 'Ctrl+A',
            click: this.actionHandler.selectAll,
          },
        ],
      },
    ];
  }

  private async buildLanguageMenu(): Promise<MenuItemConstructorOptions> {
    const langs = await this.i18nAdapter.getLanguages();

    const languageMenu: MenuItemConstructorOptions[] = langs.map((lang) => {
      return {
        label: this.i18nAdapter.translate(lang.name),
        type: 'radio',
        checked: this.i18nAdapter.currentLanguage() === lang.code,
        enabled: this.i18nAdapter.currentLanguage() !== lang.code,
        click: async () => {
          this.resources.writeLanguageFile(lang.code);
          await this.i18nAdapter.changeLanguage(lang.code);
        },
      };
    });

    return {
      label: this.i18nAdapter.translate('menu.language'),
      submenu: languageMenu,
    };
  }

  private async buildViewMenu(): Promise<MenuItemConstructorOptions[]> {
    const languageMenu = await this.buildLanguageMenu();
    return [
      {
        label: this.i18nAdapter.translate('menu.view'),
        submenu: [
          languageMenu,
          { type: 'separator' },
          {
            label: this.i18nAdapter.translate('menu.darkTheme'),
            id: 'dark-theme',
            type: 'checkbox',
            click: this.actionHandler.darkTheme,
          },
          { type: 'separator' },
          {
            label: this.i18nAdapter.translate('menu.reload'),
            accelerator: 'Control+R',
            click: this.actionHandler.reload,
          },
          {
            label: this.i18nAdapter.translate('menu.forceReload'),
            accelerator: 'Control+Shift+R',
            click: this.actionHandler.forceReload,
          },
          {
            label: this.i18nAdapter.translate('menu.toggleDevTools'),
            click: this.actionHandler.toggleDevTools,
          },
          { type: 'separator' },
          {
            label: this.i18nAdapter.translate('menu.resetZoom'),
            accelerator: 'Control+0',
            click: this.actionHandler.resetZoom,
          },
          {
            label: this.i18nAdapter.translate('menu.zoomIn'),
            accelerator: 'Control+=',
            click: this.actionHandler.zoomIn,
          },
          {
            label: this.i18nAdapter.translate('menu.zoomOut'),
            accelerator: 'Control+-',
            click: this.actionHandler.zoomOut,
          },
          { type: 'separator' },
          {
            label: this.i18nAdapter.translate('menu.fullScreen'),
            accelerator: 'F11',
            click: this.actionHandler.fullScreen,
          },
        ],
      },
    ];
  }

  private buildWindowMenu(): MenuItemConstructorOptions[] {
    return [
      {
        label: this.i18nAdapter.translate('menu.window'),
        submenu: [
          {
            label: this.i18nAdapter.translate('menu.minimize'),
            click: this.actionHandler.minimize,
          },
          {
            label: this.i18nAdapter.translate('menu.close'),
            click: this.actionHandler.close,
          },
        ],
      },
    ];
  }

  private buildHelpMenu(): MenuItemConstructorOptions[] {
    return [
      {
        role: 'help',
        label: this.i18nAdapter.translate('menu.help.label'),
        submenu: [
          {
            label: this.i18nAdapter.translate('menu.help.documentation'),
            click: this.actionHandler.documentation,
          },
          {
            label: this.i18nAdapter.translate('menu.help.reportIssue'),
            click: this.actionHandler.reportIssue,
          },
          {
            label: this.i18nAdapter.translate('menu.help.website'),
            click: this.actionHandler.website,
          },
          { type: 'separator' },
          {
            id: 'about-menu',
            label: this.i18nAdapter.translate('menu.help.about'),
            click: this.actionHandler.about,
          },
        ],
      },
    ];
  }

  public async buildTemplate(): Promise<MenuItemConstructorOptions[]> {
    const appMenu: MenuItemConstructorOptions[] = [];

    appMenu.push(...this.buildFileMenu());
    appMenu.push(...this.buildEditMenu());
    const viewMenu = await this.buildViewMenu();
    appMenu.push(...viewMenu);
    appMenu.push(...this.buildWindowMenu());
    appMenu.push(...this.buildHelpMenu());

    return appMenu;
  }
}
