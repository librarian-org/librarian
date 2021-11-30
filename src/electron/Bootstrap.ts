import I18n, { i18n, InitOptions } from 'i18next';
import Backend from 'i18next-fs-backend';
import path from 'path';
import fs from 'fs';

export default class Bootstrap {
  private languages: string[] = [];

  constructor() {
    this.setLanguages();
  }

  public async startI18n(language: string): Promise<i18n> {
    const folder = path.resolve(
      __dirname,
      '..',
      'renderer',
      'main_window',
      'locales'
    );

    const i18nextOptions: InitOptions = {
      backend: {
        loadPath: `${folder}/{{lng}}/{{ns}}.json`,
        addPath: `${folder}/{{lng}}/{{ns}}.missing.json`,
        jsonIndent: 2,
      },
      lng: language,
      interpolation: {
        escapeValue: false,
      },
      saveMissing: true,
      fallbackLng: 'en-US',
      react: {
        wait: false,
      },
      ns: ['common'],
      defaultNS: 'common',
    };

    await I18n.use(Backend).init(i18nextOptions);

    return I18n;
  }

  private setLanguages(): void {
    const folder = path.resolve(
      __dirname,
      '..',
      'renderer',
      'main_window',
      'locales'
    );

    const langs = fs.readdirSync(folder);
    this.languages.push(...langs);
  }

  public getLanguages(): string[] {
    return this.languages;
  }
}
