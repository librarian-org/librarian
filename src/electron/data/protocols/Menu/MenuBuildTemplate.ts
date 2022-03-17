import { MenuItemConstructorOptions } from 'electron';
export interface MenuBuildTemplate {
  buildTemplate(): Promise<MenuItemConstructorOptions[]>;
}
