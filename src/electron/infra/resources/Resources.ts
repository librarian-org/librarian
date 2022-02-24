import fs from 'fs';
import path from 'path';

import {
  ResourceGetIcon,
  ResourceGetLanguages,
  ResourceGetSelectedLanguages,
  ResourceWriteLanguageFile,
} from '../../data/protocols';

export default class Resources
  implements
    ResourceGetLanguages,
    ResourceGetSelectedLanguages,
    ResourceGetIcon,
    ResourceWriteLanguageFile
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
      JSON.stringify({ language }, null, 4),
      (err) => {
        if (err) {
          console.error(err);
          return;
        }
      }
    );
  }
}
