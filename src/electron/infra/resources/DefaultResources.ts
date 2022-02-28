import { app } from 'electron';
import fs from 'fs';
import path from 'path';
import isDev from 'electron-is-dev';
import Resource from '../../data/protocols/Resource/Resource';


export default class DefaultResources
  implements
    Resource
{
  public getLanguages(): string[] {
    const folder = path.resolve(
      __dirname,
      '..',
      'renderer',
      'main_window',
      'locales'
    );

    const langs = fs.readdirSync(folder);
    return langs;
  }

  public getSelectedLanguage(): string {
    try {
      const rawdata = fs.readFileSync('./selected-language.json');
      const language: { language: string } = JSON.parse(rawdata.toString());
      return language.language;
    } catch (err) {
      return 'en-US';
    }
  }

  public getIcon(): string {
    return path.resolve(
      __dirname,
      '..',
      'renderer',
      'main_window',
      'assets',
      'images',
      'librarian.png'
    );
  }

  public writeLanguageFile(language: string): void {
    fs.writeFile(
      './selected-language.json',
      JSON.stringify({ language }, null, 2),
      (err) => {
        if (err) {
          console.error(err);
          return;
        }
      }
    );
  }

  public getDatabasePath(): string {
    const devPath = './database/database.sqlite';
    const prodPath = path.resolve(
      app.getPath('appData'),
      app.name,
      'database.sqlite'
    );
    return isDev ? devPath : prodPath;
  }

  public getMigrationPath(): string[] {
    return [
      path.resolve(
        __dirname,
        '..',
        'renderer',
        'main_window',
        'database',
        'migration',
        '*.js'
      ),
    ];
  }
}
